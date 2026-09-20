import Link from 'next/link';
import Image from 'next/image';
import { SOLUTIONS } from '@/lib/data/content';
import { Breadcrumbs } from '@/components/ui/fields';
import { SectionHeader } from '@/components/ui/primitives';
import { CtaBanner } from '@/components/layout/conversion';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({ title: 'Solutions', description: 'Solutions for homeowners, contractors, architects, trade buyers and commercial clients.', path: '/solutions' });

export default function SolutionsPage() {
  return (
    <>
      <div className="container-x py-10">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Solutions' }]} />
        <SectionHeader eyebrow="Solutions" title="Solutions by customer type" intro="Start from your role — we tailor glass, hardware and installation scope to it." />
        <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((s) => (
            <li key={s.slug} className="overflow-hidden rounded-[4px] border border-ink-200 bg-white shadow-surface">
              <Link href={`/solutions/${s.slug}`} className="block">
                <span className="relative block aspect-[16/9]"><Image src={s.image} alt={s.name} fill sizes="33vw" loading="lazy" className="object-cover" /></span>
                <span className="block p-5">
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-700">{s.audience}</span>
                  <span className="mt-1 block font-display text-lg font-bold">{s.name}</span>
                  <span className="mt-1 block text-sm text-ink-600">{s.summary}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <CtaBanner />
    </>
  );
}
