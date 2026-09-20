import { Breadcrumbs } from '@/components/ui/fields';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({ title: 'Terms', description: 'Terms of use for the Masaai Glassmart website. Requires legal review.', path: '/terms' });

export default function TermsPage() {
  return (
    <div className="container-x max-w-3xl py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Terms' }]} />
      <h1 className="mt-3">Terms</h1>
      <p className="mt-2 text-sm text-ink-500">Template requiring legal review. Quotations, lead times and warranties are confirmed per project in writing.</p>
      <div className="mt-6 grid gap-4 text-ink-700">
        <p>Product availability, lead times and pricing are confirmed in written quotations. Website content is general guidance, not a specification or guarantee.</p>
        <p>Technical content does not replace project-specific review against applicable building requirements.</p>
        <p>Policies: [WARRANTY_POLICY] [DELIVERY_POLICY] [RETURN_POLICY] — replace before launch.</p>
      </div>
    </div>
  );
}
