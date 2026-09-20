'use client';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { quoteSchema, type QuoteInput } from '@/lib/quote-schema';
import { SITE } from '@/lib/site';
import { Field, inputCls } from '@/components/ui/fields';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/primitives';
import { track } from '@/lib/analytics';

const STEPS = ['Project type', 'Products', 'Details', 'Contact', 'Review'] as const;
const PROJECT_TYPES = ['Residential', 'Commercial', 'Contractor / Trade', 'Repair / Replacement', 'Supply only', 'Supply and installation', 'Other'] as const;
const CATEGORY_OPTIONS = [
  'Clear float glass', 'Toughened glass', 'Laminated glass', 'Tinted / solar-control', 'Frosted / patterned',
  'Mirrors', 'Shower enclosures', 'Office partitions', 'Shopfronts', 'Balustrades', 'Aluminium windows & doors',
  'Hinges / handles / locks', 'Patch fittings / floor springs', 'Sliding systems', 'Sealants / gaskets / accessories',
  'Installation', 'Repair / replacement', 'Technical consultation',
];

const KEY = 'mg-quote-draft-v1';

export function QuoteForm() {
  const params = useSearchParams();
  const [step, setStep] = React.useState(0);
  const [status, setStatus] = React.useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [serverError, setServerError] = React.useState('');
  const [ref, setRef] = React.useState('');

  const { register, handleSubmit, watch, setValue, getValues, trigger, formState: { errors } } = useForm<QuoteInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(quoteSchema) as any,
    defaultValues: {
      honeypot: '',
      projectType: 'Residential',
      categories: [],
      contactMethod: 'WhatsApp',
      needMeasurement: false,
      needDelivery: false,
      needInstallation: true,
      marketingConsent: false,
      timeframe: '',
      budget: '',
    } as unknown as QuoteInput,
  });

  // Prefill from ?product= and restore draft
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const draft = JSON.parse(raw);
        Object.entries(draft).forEach(([k, v]) => setValue(k as keyof QuoteInput, v as never));
      }
    } catch {}
    const prod = params.get('product');
    if (prod) {
      setValue('productRef', prod);
      const cur = getValues('categories') ?? [];
      if (!cur.length) setValue('categories', ['Toughened glass']);
    }
    track('quote_started');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Autosave
  const values = watch();
  React.useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(values));
    } catch {}
  }, [values]);

  async function next() {
    const map: Record<number, (keyof QuoteInput)[]> = {
      0: ['projectType'],
      1: ['categories'],
      2: ['title', 'description', 'location', 'timeframe'],
      3: ['name', 'email', 'phone', 'contactMethod', 'privacyConsent'],
    };
    const fields = map[step] ?? [];
    const ok = fields.length ? await trigger(fields) : true;
    if (ok) {
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
      track('quote_step', { step: STEPS[Math.min(step + 1, STEPS.length - 1)] });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  async function onSubmit(data: QuoteInput) {
    setStatus('sending');
    setServerError('');
    try {
      const res = await fetch('/api/quote-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Submission failed');
      setRef(json.ref);
      setStatus('done');
      track('quote_submitted');
      try {
        localStorage.removeItem(KEY);
      } catch {}
      window.location.hash = '#success';
    } catch (e) {
      setStatus('error');
      setServerError(e instanceof Error ? e.message : 'Submission failed');
    }
  }

  if (status === 'done') {
    return (
      <div id="success" className="grid gap-4">
        <Alert tone="success" title={`Request received — reference ${ref}`}>
          Thank you, {getValues('name')?.split(' ')[0] ?? 'there'}. We will review your requirements and respond during {SITE.contact.hours}. Keep your reference for follow-ups.
        </Alert>
        <div className="flex flex-wrap gap-3 no-print">
          <a href="/products" className="inline-flex h-11 items-center rounded-[4px] border border-ink-200 px-5 font-bold">Continue browsing</a>
          <a href="/contact" className="inline-flex h-11 items-center rounded-[4px] bg-ink-950 px-5 font-bold text-white">Contact us</a>
        </div>
      </div>
    );
  }

  const cats: string[] = (watch('categories') as string[]) ?? [];

  return (
    <div>
      <ol aria-label="Quote progress" className="no-print mb-8 flex flex-wrap gap-2">
        {STEPS.map((s, i) => (
          <li key={s} aria-current={i === step ? 'step' : undefined}
            className={`rounded-full border px-3 py-1 text-sm font-semibold ${i === step ? 'border-brand-600 bg-brand-600 text-white' : i < step ? 'border-brand-200 bg-brand-50 text-brand-900' : 'border-ink-200 text-ink-500'}`}>
            {i + 1}. {s}
          </li>
        ))}
      </ol>

      <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Request a quote">
        <input type="text" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" {...register('honeypot')} />

        {step === 0 && (
          <fieldset className="grid gap-4">
            <legend className="text-lg font-bold">What type of project is this?</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {PROJECT_TYPES.map((t) => (
                <label key={t} className="flex cursor-pointer items-center gap-3 rounded-[4px] border border-ink-200 px-4 py-3 has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50 min-h-[56px]">
                  <input type="radio" value={t} {...register('projectType')} className="h-5 w-5" />
                  <span className="font-medium">{t}</span>
                </label>
              ))}
            </div>
            {errors.projectType && <p role="alert" className="text-sm text-red-700">{errors.projectType.message}</p>}
          </fieldset>
        )}

        {step === 1 && (
          <fieldset className="grid gap-4">
            <legend className="text-lg font-bold">Which products or services do you need?</legend>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_OPTIONS.map((c) => {
                const checked = cats.includes(c);
                return (
                  <label key={c} className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold min-h-[40px] inline-flex items-center ${checked ? 'border-brand-600 bg-brand-600 text-white' : 'border-ink-200 hover:border-brand-600'}`}>
                    <input
                      type="checkbox"
                      value={c}
                      checked={checked}
                      onChange={(e) => {
                        const cur = new Set(getValues('categories') ?? []);
                        if (e.target.checked) cur.add(c);
                        else cur.delete(c);
                        setValue('categories', Array.from(cur), { shouldValidate: true });
                      }}
                      className="sr-only"
                    />
                    {c}
                  </label>
                );
              })}
            </div>
            {errors.categories && <p role="alert" className="text-sm text-red-700">{errors.categories.message}</p>}
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Product reference / SKU (optional)" htmlFor="q-ref">
                <input id="q-ref" className={inputCls(false)} placeholder="e.g. MG-TG-010 or shower 1200×2000" {...register('productRef')} />
              </Field>
              <Field label="Estimated quantity (optional)" htmlFor="q-qty">
                <input id="q-qty" className={inputCls(false)} placeholder="e.g. 3 panels" {...register('quantity')} />
              </Field>
              <Field label="Dimensions (optional)" htmlFor="q-dims" hint="Width × height in mm, e.g. 1200 × 2000">
                <input id="q-dims" className={inputCls(false)} {...register('dimensions')} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Thickness (if known)" htmlFor="q-thick">
                  <input id="q-thick" className={inputCls(false)} placeholder="e.g. 10mm" {...register('thickness')} />
                </Field>
                <Field label="Finish / colour" htmlFor="q-finish">
                  <input id="q-finish" className={inputCls(false)} placeholder="Clear, frosted…" {...register('finish')} />
                </Field>
              </div>
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <div className="grid gap-5">
            <Field label="Project title" htmlFor="q-title" error={errors.title?.message} required>
              <input id="q-title" className={inputCls(!!errors.title)} placeholder="e.g. Frameless shower + mirror, Kileleshwa" {...register('title')} />
            </Field>
            <Field label="Describe your requirements" htmlFor="q-desc" error={errors.description?.message} hint="Sizes, rooms, access, and anything unusual." required>
              <textarea id="q-desc" rows={5} className="w-full rounded-[4px] border border-ink-200 px-3 py-3 min-h-[120px]" {...register('description')} />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Site location" htmlFor="q-loc" error={errors.location?.message} required>
                <input id="q-loc" className={inputCls(!!errors.location)} placeholder="Estate / town" {...register('location')} />
              </Field>
              <Field label="Preferred timeframe" htmlFor="q-time" error={errors.timeframe?.message} required>
                <select id="q-time" className={inputCls(!!errors.timeframe)} {...register('timeframe')} defaultValue="">
                  <option value="" disabled>Select…</option>
                  {SITE.quote.timeframes.map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Budget range (optional)" htmlFor="q-budget">
                <select id="q-budget" className={inputCls(false)} {...register('budget')} defaultValue="">
                  <option value="">Prefer not to say</option>
                  {SITE.quote.budgets.map((b) => <option key={b}>{b}</option>)}
                </select>
              </Field>
              <fieldset className="grid gap-2">
                <legend className="text-sm font-semibold">Services needed</legend>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="h-5 w-5" {...register('needMeasurement')} /> Site measurement</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="h-5 w-5" {...register('needDelivery')} /> Delivery</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="h-5 w-5" {...register('needInstallation')} /> Installation</label>
              </fieldset>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" htmlFor="q-name" error={errors.name?.message} required>
                <input id="q-name" autoComplete="name" className={inputCls(!!errors.name)} {...register('name')} />
              </Field>
              <Field label="Company (optional)" htmlFor="q-co">
                <input id="q-co" autoComplete="organization" className={inputCls(false)} {...register('company')} />
              </Field>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Email" htmlFor="q-email" error={errors.email?.message} required>
                <input id="q-email" type="email" autoComplete="email" className={inputCls(!!errors.email)} {...register('email')} />
              </Field>
              <Field label="Phone" htmlFor="q-phone" error={errors.phone?.message} hint="Include country code if outside Kenya, e.g. +254…" required>
                <input id="q-phone" type="tel" autoComplete="tel" className={inputCls(!!errors.phone)} {...register('phone')} />
              </Field>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Preferred contact method" htmlFor="q-method">
                <select id="q-method" className={inputCls(false)} {...register('contactMethod')}>
                  <option>WhatsApp</option><option>Phone</option><option>Email</option>
                </select>
              </Field>
              <Field label="Best time to contact (optional)" htmlFor="q-best">
                <input id="q-best" className={inputCls(false)} placeholder="e.g. Weekdays 9–5" {...register('bestTime')} />
              </Field>
            </div>
            <label className="flex items-start gap-3 text-sm">
              <input type="checkbox" className="mt-1 h-5 w-5" {...register('privacyConsent')} />
              <span>I consent to my details being used to prepare and follow up this quotation. See Privacy Policy. *</span>
            </label>
            {errors.privacyConsent && <p role="alert" className="text-sm text-red-700">Privacy consent is required</p>}
            <label className="flex items-start gap-3 text-sm text-ink-600">
              <input type="checkbox" className="mt-1 h-5 w-5" {...register('marketingConsent')} />
              <span>Optional: send me occasional product updates (unchecked by default).</span>
            </label>
          </div>
        )}

        {step === 4 && (
          <div className="grid gap-4">
            <h3 className="text-lg font-bold">Review and submit</h3>
            <dl className="grid gap-2 rounded-[4px] border border-ink-200 bg-ink-50/50 p-5 text-sm">
              {[
                ['Project type', getValues('projectType')],
                ['Categories', (getValues('categories') ?? []).join(', ')],
                ['Title', getValues('title')],
                ['Location', getValues('location')],
                ['Timeframe', getValues('timeframe')],
                ['Name', getValues('name')],
                ['Email', getValues('email')],
                ['Phone', getValues('phone')],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-3 gap-2"><dt className="font-semibold text-ink-900">{k}</dt><dd className="col-span-2 text-ink-700">{String(v ?? '—')}</dd></div>
              ))}
            </dl>
            <p className="text-sm text-ink-600">File uploads (photos, drawings, BOQ) can be emailed after submission quoting your reference — secure upload storage requires credentials (see README).</p>
            {status === 'error' && <Alert tone="error" title="Submission failed">{serverError}</Alert>}
          </div>
        )}

        <div className="no-print mt-8 flex flex-wrap items-center justify-between gap-3">
          <Button type="button" variant="secondary" onClick={() => setStep((s) => Math.max(s - 1, 0))} disabled={step === 0}>Back</Button>
          <div className="flex gap-3">
            {step < STEPS.length - 1 ? (
              <Button type="button" onClick={next}>Continue</Button>
            ) : (
              <Button type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Submitting…' : 'Submit request'}</Button>
            )}
          </div>
        </div>
        <p aria-live="polite" className="sr-only">{status === 'sending' ? 'Submitting your request' : ''}</p>
      </form>
    </div>
  );
}
