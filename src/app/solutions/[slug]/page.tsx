import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { SOLUTIONS } from '@/lib/data/content';
import { Breadcrumbs } from '@/components/ui/fields';
import { CtaBanner } from '@/components/layout/conversion';
import { pageMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const s = SOLUTIONS.find((x) => x.slug === params.slug);
  if (!s) return {};
  return pageMetadata({ title: `${s.name} solutions`, description: s.summary, path: `/solutions/${s.slug}` });
}

export default function SolutionPage({ params }: { params: { slug: string } }) {
  const s = SOLUTIONS.find((x) => x.slug === params.slug);
  if (!s) notFound();
  return (
    <>
      <div className="container-x py-10">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Solutions', href: '/solutions' }, { label: s.name }]} />
        <div className="mt-4 grid gap-8 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-brand-700">{s.audience}</p>
            <h1 className="mt-1">{s.name}</h1>
            <p className="mt-3 text-lg text-ink-600">{s.summary}</p>
            <p className="mt-4 text-ink-700">{s.description}</p>
            <h2 className="mt-6 text-xl">What we provide</h2>
            <ul className="mt-2 list-disc pl-5 text-ink-700">{s.offers.map((o) => <li key={o}>{o}</li>)}</ul>
            <div className="mt-6 flex gap-3 no-print">
              <Link href="/request-a-quote" className="inline-flex h-12 items-center rounded-[4px] bg-brand-600 px-6 font-bold text-white hover:bg-brand-700">Request a Quote</Link>
              <Link href="/products" className="inline-flex h-12 items-center rounded-[4px] border border-ink-200 px-6 font-bold">Browse products</Link>
            </div>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] border border-ink-200">
            <Image src={s.image} alt={s.name} fill sizes="50vw" className="object-cover" loading="lazy" />
          </div>
        </div>
      </div>
      <CtaBanner />
    </>
  );
}
