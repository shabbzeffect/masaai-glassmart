import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Ruler, FileText, Truck, ShieldCheck, Phone, MessageCircle } from 'lucide-react';
import { SITE, whatsappLink, telLink } from '@/lib/site';
import { PRODUCT_CATEGORIES, PRODUCTS } from '@/lib/data/products';
import { SERVICES } from '@/lib/data/content';
import { PROJECTS, FAQS } from '@/lib/data/content';
import { SOLUTIONS } from '@/lib/data/content';
import { ProductCard } from '@/components/products/product-card';
import { SectionHeader, Badge } from '@/components/ui/primitives';
import { Accordion } from '@/components/ui/accordion';
import { Reveal } from '@/components/ui/reveal';
import { CtaBanner } from '@/components/layout/conversion';
import { pageMetadata, orgJsonLd, breadcrumbJsonLd } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Glass, Hardware & Architectural Solutions',
  description:
    'Masaai Glassmart — architectural glass, aluminium systems, hardware and installation support for homes and commercial projects. Request a detailed quotation.',
  path: '/',
});

const HERO_IMG = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1800&auto=format&fit=crop';

export default function HomePage() {
  const featured = PRODUCTS.slice(0, 6);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: 'Home', url: '/' }])) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-950 text-white" aria-labelledby="hero-title">
        <div className="absolute inset-0" aria-hidden>
          <Image src={HERO_IMG} alt="" fill priority sizes="100vw" className="object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/80 to-ink-950/20" />
        </div>
        <div className="container-x relative grid gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <Badge tone="brand" className="bg-white/10 !text-brand-100 border-white/20">Architectural glass • Hardware • Installation</Badge>
            <h1 id="hero-title" className="!text-white mt-4 text-balance">{SITE.heroHeadline}</h1>
            <p className="mt-4 max-w-xl text-lg text-slate-300">
              Architectural glass, aluminium systems, fittings and tools — with measurement, fabrication coordination and safety-conscious installation for homes and commercial sites.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/request-a-quote" className="btn-transition inline-flex h-12 items-center rounded-[4px] bg-amber-500 px-6 font-bold text-ink-950 hover:bg-amber-400">Request a Quote <ArrowRight size={18} aria-hidden className="ml-2" /></Link>
              <Link href="/products" className="btn-transition inline-flex h-12 items-center rounded-[4px] border border-slate-400 px-6 font-bold text-white hover:border-white">Explore Products</Link>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">
              <a href={telLink(SITE.contact.primaryPhone)} className="inline-flex items-center gap-1.5 hover:text-white"><Phone size={15} aria-hidden /> {SITE.contact.primaryPhone}</a>
              <a href={whatsappLink('Hello Masaai Glassmart, I would like a quotation.')} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-white"><MessageCircle size={15} aria-hidden /> WhatsApp us</a>
            </div>
            <p className="mt-6 text-xs uppercase tracking-widest text-slate-400">Detailed quotations • Appropriate material selection • Coordinated supply & installation</p>
          </div>
          <div className="hidden lg:block" aria-hidden>
            <div className="fine-grid rounded-[4px] border border-white/15 bg-white/5 p-6 backdrop-blur-[2px]">
              <dl className="grid gap-4 text-sm">
                {[
                  ['Supply + Install', 'Showers, partitions, shopfronts, balustrades, windows'],
                  ['Cut to size', 'Float, mirrors, toughened-stock with polished edges'],
                  ['Trade hardware', 'Patch fittings, hinges, locks, sliding gear, sealants'],
                  ['Project support', 'BOQs, site surveys, scheduled deliveries'],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-3 border-b border-white/10 pb-3 last:border-0 last:pb-0">
                    <ShieldCheck size={18} aria-hidden className="mt-0.5 shrink-0 text-brand-300" />
                    <div><dt className="font-bold text-white">{k}</dt><dd className="text-slate-300">{v}</dd></div>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section aria-label="Why work with us" className="border-b border-ink-200 bg-white">
        <div className="container-x grid gap-4 py-8 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ['Product guidance', 'Right glass + hardware for the job'],
            ['Custom quotations', 'Itemised, specification-led pricing'],
            ['Site measurement', 'For showers, balustrades & shopfronts'],
            ['Homes + commercial', 'Residential to institutional scope'],
            ['Installation support', 'Safety-conscious workmanship'],
          ].map(([t, d]) => (
            <div key={t} className="flex gap-3">
              <ShieldCheck size={20} aria-hidden className="mt-0.5 shrink-0 text-brand-700" />
              <div><p className="font-bold text-ink-950 text-[15px]">{t}</p><p className="text-sm text-ink-600">{d}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section aria-labelledby="cats" className="container-x py-14 sm:py-16">
        <Reveal>
          <SectionHeader eyebrow="Catalogue" title="Product categories" intro="Browse glass, architectural systems and hardware. Every item shows availability and a request-pricing CTA — no invented prices." />
        </Reveal>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCT_CATEGORIES.slice(0, 9).map((c) => (
            <li key={c.slug}>
              <Link href={`/products/${c.slug}`} className="group block overflow-hidden rounded-[4px] border border-ink-200 bg-white shadow-surface transition-transform duration-200 hover:scale-[1.02]">
                <span className="relative block aspect-[16/9] overflow-hidden bg-ink-50">
                  <Image src={c.image} alt={c.name} fill sizes="(max-width:768px)100vw,33vw" loading="lazy" className="object-cover" />
                  <span className="absolute left-3 top-3"><Badge tone="neutral">{c.group}</Badge></span>
                </span>
                <span className="block p-5">
                  <span className="block font-display text-lg font-bold text-ink-950 group-hover:text-brand-700">{c.name}</span>
                  <span className="mt-1 block text-sm text-ink-600 line-clamp-2">{c.summary}</span>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-brand-700">View range <ArrowRight size={15} aria-hidden /></span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6"><Link href="/products" className="font-bold text-brand-700 hover:underline">View all products →</Link></div>
      </section>

      {/* Solutions */}
      <section aria-labelledby="sol" className="bg-ink-50/60 border-y border-ink-200">
        <div className="container-x py-14">
          <SectionHeader eyebrow="Solutions" title="Built around your role" intro="Clear paths for homeowners, contractors, designers, trade buyers and facilities teams." />
          <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SOLUTIONS.map((s) => (
              <li key={s.slug} className="rounded-[4px] border border-ink-200 bg-white p-6 shadow-surface">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-700">{s.audience}</p>
                <h3 className="mt-1">{s.name}</h3>
                <p className="mt-2 text-[15px] text-ink-600">{s.summary}</p>
                <Link href={`/solutions/${s.slug}`} className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-700 hover:underline">Explore <ArrowRight size={15} aria-hidden /></Link>
              </li>
            ))}
            <li className="rounded-[4px] bg-ink-950 p-6 text-white">
              <h3 className="!text-white">Not sure where to start?</h3>
              <p className="mt-2 text-[15px] text-slate-300">Describe your space and goals — we will recommend glass, finishes and hardware.</p>
              <Link href="/request-a-quote" className="mt-4 inline-flex h-11 items-center rounded-[4px] bg-amber-500 px-5 font-bold text-ink-950 hover:bg-amber-400">Request a Quote</Link>
            </li>
          </ul>
        </div>
      </section>

      {/* Featured products */}
      <section aria-labelledby="feat" className="container-x py-14 sm:py-16">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeader eyebrow="Featured" title="Popular products & systems" />
            <Link href="/products" className="inline-flex min-h-[44px] items-center font-bold text-brand-700 hover:underline">Browse all →</Link>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      {/* Services */}
      <section aria-labelledby="srv" className="container-x pb-14">
        <SectionHeader eyebrow="Services" title="Measurement to handover" intro="Supply-only or supply-and-installation, scoped clearly in every quotation." />
        <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.slice(0, 4).map((s) => (
            <li key={s.slug} className="flex flex-col rounded-[4px] border border-ink-200 bg-white p-6 shadow-surface">
              <Ruler size={22} aria-hidden className="text-brand-700" />
              <h3 className="mt-3 text-base">{s.name}</h3>
              <p className="mt-2 flex-1 text-sm text-ink-600">{s.summary}</p>
              <Link href={`/services/${s.slug}`} className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-700 hover:underline">Learn more <ArrowRight size={14} aria-hidden /></Link>
            </li>
          ))}
        </ul>
        <div className="mt-6"><Link href="/services" className="font-bold text-brand-700 hover:underline">All services →</Link></div>
      </section>

      {/* Process */}
      <section aria-labelledby="proc" className="bg-white border-y border-ink-200">
        <div className="container-x py-14">
          <SectionHeader eyebrow="Process" title="From enquiry to handover" align="center" />
          <ol className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['1', 'Share requirements', 'Sizes, photos, drawings or BOQ via the quote form.'],
              ['2', 'Consultation / survey', 'We confirm materials and measure where needed.'],
              ['3', 'Review quotation', 'Itemised supply / installation pricing.'],
              ['4', 'Fabrication & install', 'Coordinated delivery, install and handover.'],
            ].map(([n, t, d]) => (
              <li key={n} className="rounded-[4px] border border-ink-200 p-5">
                <p className="font-display text-3xl font-bold text-brand-700">{n}</p>
                <p className="mt-1 font-bold">{t}</p>
                <p className="mt-1 text-sm text-ink-600">{d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/request-a-quote" className="inline-flex h-12 items-center rounded-[4px] bg-brand-600 px-6 font-bold text-white hover:bg-brand-700"><FileText size={17} aria-hidden className="mr-2" /> Start your request</Link>
            <Link href="/services/measurement-site-survey" className="inline-flex h-12 items-center rounded-[4px] border border-ink-200 px-6 font-bold hover:border-ink-950"><Truck size={17} aria-hidden className="mr-2" /> Site survey info</Link>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section aria-labelledby="proj" className="container-x py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader eyebrow="Work" title="Recent project types" intro="Sample entries — replace with verified Masaai Glassmart projects before launch." />
          <Link href="/projects" className="font-bold text-brand-700 hover:underline">All projects →</Link>
        </div>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {PROJECTS.slice(0, 3).map((p) => (
            <li key={p.slug}>
              <Link href={`/projects/${p.slug}`} className="group block overflow-hidden rounded-[4px] border border-ink-200 bg-white shadow-surface">
                <span className="relative block aspect-[16/10] bg-ink-50">
                  <Image src={p.images[0]} alt={p.name} fill sizes="(max-width:768px)100vw,33vw" loading="lazy" className="object-cover" />
                </span>
                <span className="block p-5">
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-700">{p.type} • Sample</span>
                  <span className="mt-1 block font-display font-bold text-ink-950">{p.name}</span>
                  <span className="mt-1 block text-sm text-ink-600">{p.scope}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ preview */}
      <section aria-labelledby="faqp" className="container-x pb-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <div>
            <SectionHeader eyebrow="FAQ" title="Common questions" intro="Straight answers on supply, measurement and safety glass." />
            <Link href="/faq" className="mt-4 inline-block font-bold text-brand-700 hover:underline">View all FAQs →</Link>
          </div>
          <Accordion items={FAQS.slice(0, 5).map((f) => ({ q: f.q, a: f.a }))} />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
