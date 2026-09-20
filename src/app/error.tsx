'use client';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="container-x max-w-2xl py-16 text-center">
      <h1>Something went wrong</h1>
      <p className="mt-2 text-ink-600">Please try again. If the problem persists, contact us by phone or WhatsApp.</p>
      <div className="mt-6 flex justify-center gap-3">
        <button onClick={reset} className="inline-flex h-11 items-center rounded-[4px] bg-ink-950 px-5 font-bold text-white">Try again</button>
        <Link href="/" className="inline-flex h-11 items-center rounded-[4px] border border-ink-200 px-5 font-bold">Home</Link>
      </div>
    </div>
  );
}
