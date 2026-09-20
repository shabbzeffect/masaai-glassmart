'use client';
import * as React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { MessageCircle, Phone } from 'lucide-react';
import { SITE, whatsappLink, telLink } from '@/lib/site';
import { track } from '@/lib/analytics';

export function WhatsAppFloat() {
  const pathname = usePathname();
  const [hidden, setHidden] = React.useState(false);

  React.useEffect(() => {
    // Hide where it conflicts with forms or cookie controls
    setHidden(pathname === '/request-a-quote' || pathname === '/contact');
  }, [pathname]);

  if (hidden) return null;
  const msg = `Hello ${SITE.name}, I have an enquiry from ${pathname}. Please assist.`;
  return (
    <a
      href={whatsappLink(msg)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp about this page"
      onClick={() => track('whatsapp_clicked', { path: pathname ?? '/' })}
      className="no-print fixed bottom-20 right-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#1DA851] text-white shadow-elevated ring-2 ring-white/60 transition-transform duration-200 hover:scale-[1.04] focus-visible:outline-white sm:bottom-5 sm:right-5"
    >
      <MessageCircle size={26} aria-hidden />
    </a>
  );
}

/** Sticky mobile call/quote bar — prominent phone + WhatsApp on small screens, hidden on quote/contact to avoid conflicts. */
export function MobileCallBar() {
  const pathname = usePathname();
  if (pathname === '/request-a-quote' || pathname === '/contact') return null;
  return (
    <div className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-ink-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <div className="grid grid-cols-2 gap-2 p-2">
        <a
          href={telLink(SITE.contact.primaryPhone)}
          onClick={() => track('phone_clicked', { path: pathname ?? '/' })}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] border border-ink-300 text-[15px] font-bold text-ink-950"
        >
          <Phone size={17} aria-hidden /> Call
        </a>
        <Link
          href="/request-a-quote"
          className="inline-flex min-h-[48px] items-center justify-center rounded-[4px] bg-brand-700 text-[15px] font-bold text-white"
        >
          Request a Quote
        </Link>
      </div>
    </div>
  );
}

export function CtaBanner() {
  return (
    <section aria-labelledby="cta-title" className="no-print relative overflow-hidden bg-ink-950 text-white">
      <div aria-hidden className="absolute inset-0 opacity-[0.14]" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.35) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <div className="container-x relative flex flex-col items-start gap-6 py-12 lg:flex-row lg:items-center lg:justify-between lg:py-16">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-300">Detailed • Specification-led • No guesswork</p>
          <h2 id="cta-title" className="!text-white mt-2">Tell us about your project — get a detailed quotation.</h2>
          <p className="mt-2 max-w-xl text-slate-300">Share sizes, photos or a BOQ. We confirm materials, safety glass and installation scope before pricing.</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a href="/request-a-quote" className="btn-transition inline-flex min-h-[52px] items-center justify-center rounded-[4px] bg-amber-500 px-7 font-bold text-ink-950 hover:bg-amber-400">Request a Quote</a>
          <a href={telLink(SITE.contact.primaryPhone)} onClick={() => track('phone_clicked', { path: '/cta-banner' })} className="btn-transition inline-flex min-h-[52px] items-center justify-center rounded-[4px] border border-slate-400 px-7 font-bold text-white hover:border-white">Call {SITE.contact.primaryPhone}</a>
        </div>
      </div>
    </section>
  );
}
