import { Phone, Mail, MapPin, Clock, MessageCircle, Navigation } from 'lucide-react';
import { ContactForm } from '@/components/forms/contact-form';
import { Breadcrumbs } from '@/components/ui/fields';
import { SITE, telLink, mailLink, whatsappLink } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({ title: 'Contact & Showroom', description: 'Phone, email, WhatsApp, address, hours and contact form for Masaai Glassmart.', path: '/contact' });

export default function ContactPage() {
  return (
    <div className="container-x py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
      <h1 className="mt-3">Contact & showroom</h1>
      <p className="mt-2 max-w-3xl text-lg text-ink-600">Call, WhatsApp, email or visit. Share photos and sizes for the fastest quotation.</p>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="grid content-start gap-4">
          <ul className="grid gap-3 rounded-[4px] border border-ink-200 bg-white p-6">
            <li className="flex gap-3"><Phone size={18} aria-hidden className="mt-1 text-brand-700" /><div><p className="font-bold">Phone</p><a className="text-brand-700 font-semibold hover:underline" href={telLink(SITE.contact.primaryPhone)}>{SITE.contact.primaryPhone}</a><p className="text-sm text-ink-500">{SITE.contact.secondaryPhone}</p></div></li>
            <li className="flex gap-3"><MessageCircle size={18} aria-hidden className="mt-1 text-brand-700" /><div><p className="font-bold">WhatsApp</p><a className="font-semibold text-brand-700 hover:underline" target="_blank" rel="noreferrer" href={whatsappLink('Hello Masaai Glassmart, I have an enquiry.')}>{SITE.contact.whatsappDisplay}</a></div></li>
            <li className="flex gap-3"><Mail size={18} aria-hidden className="mt-1 text-brand-700" /><div><p className="font-bold">Email</p><a className="font-semibold text-brand-700 hover:underline" href={mailLink(SITE.contact.email)}>{SITE.contact.email}</a><p className="text-sm text-ink-500">Sales: {SITE.contact.salesEmail}</p></div></li>
            <li className="flex gap-3"><MapPin size={18} aria-hidden className="mt-1 text-brand-700" /><div><p className="font-bold">Address</p><p>{SITE.contact.address}, {SITE.contact.city}, {SITE.contact.country}</p><p className="text-sm text-ink-500">{SITE.contact.postalAddress}</p></div></li>
            <li className="flex gap-3"><Clock size={18} aria-hidden className="mt-1 text-brand-700" /><div><p className="font-bold">Hours</p><p>{SITE.contact.hours}</p></div></li>
          </ul>
          <div className="flex flex-wrap gap-3 no-print">
            <a href={SITE.contact.mapUrl.startsWith('[') ? 'https://maps.google.com' : SITE.contact.mapUrl} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center rounded-[4px] bg-ink-950 px-5 font-bold text-white"><Navigation size={16} aria-hidden className="mr-2" /> Directions</a>
            <a href="/request-a-quote" className="inline-flex h-11 items-center rounded-[4px] border border-ink-200 px-5 font-bold">Request a Quote</a>
          </div>
          <div className="overflow-hidden rounded-[4px] border border-ink-200 bg-ink-50 p-6 text-sm text-ink-600">
            <p className="font-bold text-ink-900">Map</p>
            <p className="mt-1">An embedded map is enabled once [MAP_URL] is replaced with a verified location. Until then, use Directions above (privacy-friendly link, no tracking embed).</p>
          </div>
        </div>
        <div className="rounded-[4px] border border-ink-200 bg-white p-6 shadow-surface">
          <h2 className="text-xl">Send a message</h2>
          <div className="mt-4"><ContactForm /></div>
        </div>
      </div>
    </div>
  );
}
