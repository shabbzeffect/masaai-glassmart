import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({ title: 'Thank You', description: 'Your enquiry was received.', path: '/thank-you' });

export default function ThankYouPage() {
  return (
    <div className="container-x max-w-2xl py-16 text-center">
      <CheckCircle2 size={48} aria-hidden className="mx-auto text-emerald-600" />
      <h1 className="mt-4">Thank you</h1>
      <p className="mt-2 text-lg text-ink-600">Your enquiry was received. We will respond during business hours.</p>
      <div className="mt-6 flex justify-center gap-3 no-print">
        <Link href="/products" className="inline-flex h-11 items-center rounded-[4px] border border-ink-200 px-5 font-bold">Browse products</Link>
        <Link href="/" className="inline-flex h-11 items-center rounded-[4px] bg-ink-950 px-5 font-bold text-white">Home</Link>
      </div>
    </div>
  );
}
