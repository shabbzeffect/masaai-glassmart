import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { SITE, telLink, mailLink } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="no-print bg-ink-950 text-slate-300" aria-label="Footer">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl font-bold text-white">Masaai Glassmart</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">Precision • Strength • Clarity</p>
          <p className="mt-4 text-sm leading-relaxed">{SITE.description}</p>
          <ul className="mt-5 grid gap-2 text-sm">
            <li className="flex items-start gap-2"><Phone size={15} aria-hidden className="mt-0.5 shrink-0" /><a className="hover:text-white hover:underline" href={telLink(SITE.contact.primaryPhone)}>{SITE.contact.primaryPhone}</a></li>
            <li className="flex items-start gap-2"><Mail size={15} aria-hidden className="mt-0.5 shrink-0" /><a className="hover:text-white hover:underline" href={mailLink(SITE.contact.email)}>{SITE.contact.email}</a></li>
            <li className="flex items-start gap-2"><MapPin size={15} aria-hidden className="mt-0.5 shrink-0" /><span>{SITE.contact.address}, {SITE.contact.city}, {SITE.contact.country}</span></li>
            <li className="flex items-start gap-2"><Clock size={15} aria-hidden className="mt-0.5 shrink-0" /><span>{SITE.contact.hours}</span></li>
          </ul>
        </div>
        <nav aria-label="Products">
          <p className="font-bold text-white">Products</p>
          <ul className="mt-4 grid gap-2 text-sm">
            <li><Link className="hover:text-white hover:underline" href="/products/clear-float-glass">Clear Float Glass</Link></li>
            <li><Link className="hover:text-white hover:underline" href="/products/toughened-glass">Toughened Glass</Link></li>
            <li><Link className="hover:text-white hover:underline" href="/products/laminated-safety-glass">Laminated Glass</Link></li>
            <li><Link className="hover:text-white hover:underline" href="/products/shower-enclosures">Shower Enclosures</Link></li>
            <li><Link className="hover:text-white hover:underline" href="/products/balustrades-staircase-glazing">Balustrades</Link></li>
            <li><Link className="hover:text-white hover:underline" href="/products">All products</Link></li>
          </ul>
        </nav>
        <nav aria-label="Company">
          <p className="font-bold text-white">Company</p>
          <ul className="mt-4 grid gap-2 text-sm">
            <li><Link className="hover:text-white hover:underline" href="/services">Services</Link></li>
            <li><Link className="hover:text-white hover:underline" href="/solutions">Solutions</Link></li>
            <li><Link className="hover:text-white hover:underline" href="/projects">Projects</Link></li>
            <li><Link className="hover:text-white hover:underline" href="/resources">Resources</Link></li>
            <li><Link className="hover:text-white hover:underline" href="/faq">FAQ</Link></li>
            <li><Link className="hover:text-white hover:underline" href="/about">About</Link></li>
            <li><Link className="hover:text-white hover:underline" href="/contact">Contact</Link></li>
          </ul>
        </nav>
        <div>
          <p className="font-bold text-white">Get a quotation</p>
          <p className="mt-4 text-sm">Share sizes, photos or drawings — we confirm specification before pricing.</p>
          <div className="mt-4 grid gap-2">
            <Link href="/request-a-quote" className="inline-flex h-11 items-center justify-center rounded-[4px] bg-brand-600 font-bold text-white hover:bg-brand-500">Request a Quote</Link>
            <Link href="/contact" className="inline-flex h-11 items-center justify-center rounded-[4px] border border-slate-600 font-bold text-white hover:border-white">Contact & Showroom</Link>
          </div>
          <nav aria-label="Legal" className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
            <Link href="/privacy" className="hover:text-white hover:underline">Privacy</Link>
            <Link href="/terms" className="hover:text-white hover:underline">Terms</Link>
            <Link href="/cookies" className="hover:text-white hover:underline">Cookies</Link>
            <Link href="/faq" className="hover:text-white hover:underline">FAQ</Link>
          </nav>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-1 py-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>Technical content is general guidance — confirm final specifications for your project.</p>
        </div>
      </div>
    </footer>
  );
}
