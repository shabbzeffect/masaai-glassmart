import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '@/lib/data/content';
import { Breadcrumbs } from '@/components/ui/fields';
import { SectionHeader } from '@/components/ui/primitives';
import { CtaBanner } from '@/components/layout/conversion';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({ title: 'Services', description: 'Glass cutting, site surveys, shower and balustrade installation, aluminium fabrication, repairs and commercial project supply.', path: '/services' });

export default function ServicesPage() {
  return (
    <>
      <div className="container-x py-10">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Services' }]} />
        <SectionHeader eyebrow="Services" title="Measured, supplied and installed properly" intro="Supply-only or supply-and-installation. Every service page lists scope, process, safety notes and a quote CTA." />
        <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className="group block h-full overflow-hidden rounded-[4px] border border-ink-200 bg-white shadow-surface transition-transform duration-200 hover:scale-[1.02]">
                <span className="relative block aspect-[16/9] bg-ink-50"><Image src={s.image} alt={s.name} fill sizes="(max-width:768px)100vw,33vw" loading="lazy" className="object-cover" /></span>
                <span className="block p-5">
                  <span className="block font-display text-lg font-bold group-hover:text-brand-700">{s.name}</span>
                  <span className="mt-1 block text-sm text-ink-600">{s.summary}</span>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-brand-700">View service <ArrowRight size={14} aria-hidden /></span>
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
