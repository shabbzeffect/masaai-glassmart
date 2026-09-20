import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Ruler, FileText, Truck } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/fields';
import { SectionHeader } from '@/components/ui/primitives';
import { CtaBanner } from '@/components/layout/conversion';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({ title: 'About', description: 'About Masaai Glassmart — a premium supplier and installation partner for architectural glass, hardware and building systems.', path: '/about' });

export default function AboutPage() {
  return (
    <>
      <div className="container-x py-10">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
        <div className="mt-4 grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h1>Precision in glass. Strength in hardware. Clarity in solution.</h1>
            <p className="mt-4 text-lg text-ink-600">
              Masaai Glassmart is a supplier and installation partner for architectural glass, aluminium systems, hardware and fittings — serving homeowners, contractors, designers and commercial clients.
            </p>
            <p className="mt-3 text-ink-700">
              We focus on verifiable service principles: detailed quotations, appropriate material selection, coordinated supply and installation, safety-conscious workmanship and clear communication.
            </p>
            <div className="mt-6 flex gap-3 no-print">
              <Link href="/request-a-quote" className="inline-flex h-12 items-center rounded-[4px] bg-brand-600 px-6 font-bold text-white">Request a Quote</Link>
              <Link href="/projects" className="inline-flex h-12 items-center rounded-[4px] border border-ink-200 px-6 font-bold">See project types</Link>
            </div>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] border border-ink-200">
            <Image src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop" alt="Architectural detailing and project coordination" fill sizes="50vw" className="object-cover" loading="lazy" />
          </div>
        </div>

        <div className="mt-14">
          <SectionHeader eyebrow="Principles" title="How we work" />
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Detailed quotations', 'Itemised, specification-led pricing — no vague lump sums.', FileText],
              ['Appropriate materials', 'Right glass build-up and hardware for exposure and use.', ShieldCheck],
              ['Coordinated delivery', 'Supply phasing and installation that respects programmes.', Truck],
              ['Measured accuracy', 'Site surveys where sizes must be exact.', Ruler],
            ].map(([t, d, Icon]) => {
              const I = Icon as typeof Ruler;
              return (
                <li key={t as string} className="rounded-[4px] border border-ink-200 p-5">
                  <I size={22} aria-hidden className="text-brand-700" />
                  <p className="mt-2 font-bold">{t as string}</p>
                  <p className="mt-1 text-sm text-ink-600">{d as string}</p>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-12 rounded-[4px] border border-amber-200 bg-amber-50 p-6 text-sm text-amber-950">
          <p className="font-bold">A note on credentials</p>
          <p className="mt-1">Certifications, partners, years in business and warranties are published only when verified. Placeholders: [VERIFIED_CERTIFICATIONS], [VERIFIED_PARTNERS], [WARRANTY_POLICY]. Testimonials remain hidden until verified — see [VERIFIED_TESTIMONIALS].</p>
        </div>
      </div>
      <CtaBanner />
    </>
  );
}
