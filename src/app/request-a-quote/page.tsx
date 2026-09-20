import { Suspense } from 'react';
import { QuoteForm } from '@/components/forms/quote-form';
import { Breadcrumbs } from '@/components/ui/fields';
import { pageMetadata } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const metadata = pageMetadata({ title: 'Request a Quote', description: 'Request a detailed quotation for glass, hardware, aluminium systems and installation. Multi-step form with autosave.', path: '/request-a-quote' });

export default function QuotePage() {
  return (
    <div className="container-x max-w-3xl py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Request a Quote' }]} />
      <h1 className="mt-3">Request a Quote</h1>
      <p className="mt-2 text-lg text-ink-600">
        Step-by-step, autosaved as you go. Prefer to talk? Call {SITE.contact.primaryPhone} or message us on WhatsApp.
      </p>
      <div className="mt-8 rounded-[4px] border border-ink-200 bg-white p-5 sm:p-8 shadow-surface">
        <Suspense fallback={<p>Loading form…</p>}>
          <QuoteForm />
        </Suspense>
      </div>
    </div>
  );
}
