'use client';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactInput } from '@/lib/quote-schema';
import { Field, inputCls } from '@/components/ui/fields';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/primitives';
import { track } from '@/lib/analytics';

export function ContactForm() {
  const [status, setStatus] = React.useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [ref, setRef] = React.useState('');
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(contactSchema) as any,
    defaultValues: { honeypot: '' } as unknown as ContactInput,
  });

  async function onSubmit(data: ContactInput) {
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Failed');
      setRef(json.ref);
      setStatus('done');
      track('contact_submitted');
      reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return <Alert tone="success" title={`Message received — ${ref}`}>Thank you. We will respond during business hours. For urgent matters, please call or WhatsApp.</Alert>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5" aria-label="Contact form">
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" {...register('honeypot')} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="cf-name" error={errors.name?.message} required>
          <input id="cf-name" className={inputCls(!!errors.name)} autoComplete="name" {...register('name')} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'cf-name-error' : undefined} />
        </Field>
        <Field label="Email" htmlFor="cf-email" error={errors.email?.message} required>
          <input id="cf-email" type="email" className={inputCls(!!errors.email)} autoComplete="email" {...register('email')} aria-invalid={!!errors.email} />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone (optional)" htmlFor="cf-phone" error={errors.phone?.message}>
          <input id="cf-phone" type="tel" className={inputCls(!!errors.phone)} autoComplete="tel" {...register('phone')} />
        </Field>
        <Field label="Department" htmlFor="cf-dept">
          <select id="cf-dept" className={inputCls(false)} {...register('department')} defaultValue="General">
            <option>General</option><option>Sales / Quotations</option><option>Installations</option><option>Repairs</option><option>Commercial projects</option>
          </select>
        </Field>
      </div>
      <Field label="Subject" htmlFor="cf-subject" error={errors.subject?.message} required>
        <input id="cf-subject" className={inputCls(!!errors.subject)} {...register('subject')} />
      </Field>
      <Field label="Message" htmlFor="cf-message" error={errors.message?.message} required>
        <textarea id="cf-message" rows={5} className={inputCls(!!errors.message).replace('h-11', 'min-h-[120px] py-3')} {...register('message')} />
      </Field>
      <label className="flex items-start gap-3 text-sm">
        <input type="checkbox" className="mt-1 h-5 w-5" {...register('privacyConsent')} />
        <span>I consent to my details being used to respond to this enquiry. See Privacy Policy. *</span>
      </label>
      {errors.privacyConsent && <p role="alert" className="text-sm font-medium text-red-700">{errors.privacyConsent.message}</p>}
      {status === 'error' && <Alert tone="error" title="Could not send">Please try again or contact us by phone/WhatsApp.</Alert>}
      <div>
        <Button type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send message'}</Button>
      </div>
      <p aria-live="polite" className="sr-only">{status === 'sending' ? 'Sending' : ''}</p>
    </form>
  );
}
