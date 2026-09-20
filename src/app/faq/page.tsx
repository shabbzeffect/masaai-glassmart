import { FAQS } from '@/lib/data/content';
import { Breadcrumbs } from '@/components/ui/fields';
import { Accordion } from '@/components/ui/accordion';
import { SectionHeader } from '@/components/ui/primitives';
import { CtaBanner } from '@/components/layout/conversion';
import { pageMetadata, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo';

export const metadata = pageMetadata({ title: 'FAQ', description: 'Answers on quotations, glass types, measurement, lead times, repairs and service areas.', path: '/faq' });

export default function FaqPage() {
  return (
    <>
      <div className="container-x max-w-4xl py-10">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'FAQ', url: '/faq' }])) }} />
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]} />
        <SectionHeader eyebrow="Help" title="Frequently asked questions" intro="Straight answers. For project-specific advice, request a quote with photos and sizes." />
        <div className="mt-8"><Accordion items={FAQS} /></div>
      </div>
      <CtaBanner />
    </>
  );
}
