'use client';
import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Mail, Clock, ChevronDown, Search, Moon, Sun } from 'lucide-react';
import { NAV } from '@/lib/navigation';
import { SITE, telLink, mailLink } from '@/lib/site';
import { track } from '@/lib/analytics';

function Wordmark() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Masaai Glassmart home">
      <span aria-hidden className="grid h-10 w-10 place-items-center rounded-[4px] bg-ink-950 text-white">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
          <path d="M4 20 L13 4 L22 20 Z" stroke="#7dd3d8" strokeWidth="2" fill="none" />
          <path d="M8.5 20 L13 11 L17.5 20" stroke="#c99355" strokeWidth="1.6" fill="none" />
          <line x1="4" y1="20.5" x2="22" y2="20.5" stroke="white" strokeWidth="2" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className="block font-display text-lg font-bold tracking-tight text-ink-950">Masaai Glassmart</span>
        <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-brand-700">Glass • Hardware • Systems</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [compact, setCompact] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setOpenMenu(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const toggleTheme = () => {
    const el = document.documentElement;
    const cur = el.getAttribute('data-theme');
    el.setAttribute('data-theme', cur === 'dark' ? 'light' : 'dark');
    try {
      localStorage.setItem('mg-theme', cur === 'dark' ? 'light' : 'dark');
    } catch {}
  };

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-brand-700 focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <div className="no-print bg-ink-950 text-sm text-slate-200">
        <div className="container-x flex flex-wrap items-center justify-between gap-2 py-1.5">
          <div className="flex flex-wrap items-center gap-4">
            <a href={telLink(SITE.contact.primaryPhone)} onClick={() => track('phone_clicked')} className="inline-flex items-center gap-1.5 hover:text-white min-h-[32px]">
              <Phone size={14} aria-hidden /> {SITE.contact.primaryPhone}
            </a>
            <a href={mailLink(SITE.contact.email)} onClick={() => track('email_clicked')} className="hidden sm:inline-flex items-center gap-1.5 hover:text-white">
              <Mail size={14} aria-hidden /> {SITE.contact.email}
            </a>
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-300">
              <Clock size={14} aria-hidden /> {SITE.contact.hours}
            </span>
          </div>
          <Link href="/request-a-quote" className="font-bold text-amber-400 hover:text-amber-300 hover:underline">
            Request a Quote →
          </Link>
        </div>
      </div>

      <header className={`no-print sticky top-0 z-50 border-b border-ink-200 bg-white/95 backdrop-blur ${compact ? 'shadow-surface' : ''}`}>
        <div className={`container-x flex items-center justify-between gap-4 ${compact ? 'py-2' : 'py-3'}`}>
          <Wordmark />
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => (
                <li key={item.label} className="relative" onMouseEnter={() => setOpenMenu(item.children ? item.label : null)} onMouseLeave={() => setOpenMenu(null)}>
                  <Link
                    href={item.href}
                    aria-haspopup={item.children ? 'true' : undefined}
                    aria-expanded={item.children ? openMenu === item.label : undefined}
                    onFocus={() => setOpenMenu(item.children ? item.label : null)}
                    className={`inline-flex items-center gap-1 rounded px-3 py-2 text-[15px] font-semibold min-h-[44px] ${pathname?.startsWith(item.href) ? 'text-brand-700' : 'text-ink-900 hover:text-brand-700'}`}
                  >
                    {item.label}
                    {item.children && <ChevronDown size={15} aria-hidden />}
                  </Link>
                  {item.children && openMenu === item.label && (
                    <div className="absolute left-0 top-full w-[520px] rounded-[4px] border border-ink-200 bg-white p-4 shadow-elevated">
                      <ul className="grid grid-cols-2 gap-1">
                        {item.children.map((c) => (
                          <li key={c.label}>
                            <Link href={c.href} className="block rounded px-3 py-2 hover:bg-ink-50">
                              <span className="block text-sm font-bold text-ink-950">{c.label}</span>
                              {c.desc && <span className="block text-xs text-ink-500">{c.desc}</span>}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/search" aria-label="Search the site" className="grid h-11 w-11 place-items-center rounded-[4px] border border-ink-300 text-ink-900 hover:border-brand-700 hover:text-brand-700">
              <Search size={18} aria-hidden />
            </Link>
            <button onClick={toggleTheme} aria-label="Toggle colour theme" className="grid h-11 w-11 place-items-center rounded-[4px] border border-ink-300 text-ink-900 hover:border-brand-700 hover:text-brand-700">
              <Moon size={18} aria-hidden className="dark:hidden" />
              <Sun size={18} aria-hidden className="hidden dark:block" />
            </button>
            <Link href="/request-a-quote" className="btn-transition hidden sm:inline-flex min-h-[44px] items-center rounded-[4px] bg-brand-700 px-5 py-2.5 text-[15px] font-bold text-white hover:bg-brand-600">
              Get a Quote
            </Link>
            <button onClick={() => setMobileOpen(true)} aria-label="Open menu" aria-expanded={mobileOpen} className="grid h-11 w-11 place-items-center rounded-[4px] border border-ink-300 lg:hidden">
              <Menu size={20} aria-hidden />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-[80] lg:hidden">
          <div className="absolute inset-0 bg-ink-950/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-white shadow-elevated">
            <div className="flex items-center justify-between border-b border-ink-200 p-4">
              <span className="font-display font-bold">Menu</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="grid h-11 w-11 place-items-center rounded border border-ink-200">
                <X size={20} aria-hidden />
              </button>
            </div>
            <nav aria-label="Mobile" className="flex-1 overflow-y-auto p-4">
              <ul className="grid gap-1">
                {NAV.map((n) => (
                  <li key={n.label}>
                    <Link href={n.href} className="block rounded px-3 py-3 font-bold text-ink-950 hover:bg-ink-50 min-h-[48px]">
                      {n.label}
                    </Link>
                    {n.children && (
                      <ul className="ml-3 grid gap-0.5 border-l-2 border-ink-100 pl-3">
                        {n.children.map((c) => (
                          <li key={c.label}>
                            <Link href={c.href} className="block rounded px-2 py-2 text-sm text-ink-700 hover:bg-ink-50">
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <div className="border-t border-ink-200 p-4 grid gap-2">
              <Link href="/request-a-quote" className="inline-flex h-12 items-center justify-center rounded-[4px] bg-brand-600 font-bold text-white">
                Request a Quote
              </Link>
              <a href={telLink(SITE.contact.primaryPhone)} className="inline-flex h-12 items-center justify-center rounded-[4px] border border-ink-200 font-bold">
                <Phone size={16} aria-hidden className="mr-2" /> {SITE.contact.primaryPhone}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
