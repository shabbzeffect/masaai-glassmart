import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { SERVICES } from '@/lib/data/content';
import { Breadcrumbs } from '@/components/ui/fields';
import { Accordion } from '@/components/ui/accordion';
import { CtaBanner } from '@/components/layout/conversion';
import { pageMetadata, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const s = SERVICES.find((x) => x.slug === params.slug);
  if (!s) return {};
  return pageMetadata({ title: s.name, description: s.summary, path: `/services/${s.slug}`, image: s.image });
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const s = SERVICES.find((x) => x.slug === params.slug);
  if (!s) notFound();
  return (
    <>
      <div className="container-x py-10">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: s.name, url: `/services/${s.slug}` }])) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(s.faqs)) }} />
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: s.name }]} />
        <div className="mt-4 grid gap-8 lg:grid-cols-2">
          <div>
            <h1>{s.name}</h1>
            <p className="mt-3 text-lg text-ink-600">{s.summary}</p>
            <p className="mt-4 text-ink-700">{s.description}</p>
            <div className="mt-6 flex flex-wrap gap-3 no-print">
              <Link href={`/request-a-quote?product=${encodeURIComponent(s.name)}`} className="inline-flex h-12 items-center rounded-[4px] bg-brand-600 px-6 font-bold text-white hover:bg-brand-700">Request this service</Link>
              <Link href="/services" className="inline-flex h-12 items-center rounded-[4px] border border-ink-200 px-6 font-bold hover:border-ink-950">All services</Link>
            </div>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] border border-ink-200">
            <Image src={s.image} alt={s.name} fill sizes="(max-width:1024px)100vw,50vw" className="object-cover" loading="lazy" />
          </div>
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-xl">Ideal for</h2>
            <ul className="mt-2 list-disc pl-5 text-ink-700">{s.idealFor.map((x) => <li key={x}>{x}</li>)}</ul>
            <h2 className="mt-6 text-xl">Scope of work</h2>
            <ul className="mt-2 list-disc pl-5 text-ink-700">{s.scope.map((x) => <li key={x}>{x}</li>)}</ul>
            <h2 className="mt-6 text-xl">Quality & safety</h2>
            <ul className="mt-2 list-disc pl-5 text-ink-700">{s.safety.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
          <div>
            <h2 className="text-xl">Process</h2>
            <ol className="mt-3 grid gap-3">
              {s.process.map((p, i) => (
                <li key={p.title} className="rounded-[4px] border border-ink-200 p-4">
                  <p className="font-bold">{i + 1}. {p.title}</p>
                  <p className="mt-1 text-sm text-ink-600">{p.detail}</p>
                </li>
              ))}
            </ol>
            <h2 className="mt-6 text-xl">FAQs</h2>
            <div className="mt-3"><Accordion items={s.faqs} /></div>
          </div>
        </div>
      </div>
      <CtaBanner />
    </>
  );
}
