import Link from 'next/link';
import { Search } from 'lucide-react';
import { PRODUCTS } from '@/lib/data/products';

export default function NotFound() {
  return (
    <div className="container-x max-w-2xl py-16 text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-brand-700">404</p>
      <h1 className="mt-2">Page not found</h1>
      <p className="mt-2 text-ink-600">The page moved or never existed. Try popular destinations below.</p>
      <form action="/products" method="GET" className="mx-auto mt-6 flex max-w-md gap-2" role="search">
        <label htmlFor="nf-search" className="sr-only">Search products</label>
        <div className="relative flex-1">
          <Search size={16} aria-hidden className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input id="nf-search" name="search" placeholder="Search products…" className="h-11 w-full rounded-[4px] border border-ink-200 pl-9 pr-3" />
        </div>
        <button className="h-11 rounded-[4px] bg-ink-950 px-5 font-bold text-white">Search</button>
      </form>
      <ul className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
        {PRODUCTS.slice(0, 4).map((p) => (
          <li key={p.slug}><Link href={`/products/${p.categorySlug}/${p.slug}`} className="rounded-full border border-ink-200 px-3 py-1.5 font-semibold hover:border-brand-600">{p.name}</Link></li>
        ))}
      </ul>
      <div className="mt-6 flex justify-center gap-3">
        <Link href="/" className="inline-flex h-11 items-center rounded-[4px] bg-brand-600 px-5 font-bold text-white">Home</Link>
        <Link href="/contact" className="inline-flex h-11 items-center rounded-[4px] border border-ink-200 px-5 font-bold">Contact</Link>
      </div>
    </div>
  );
}
