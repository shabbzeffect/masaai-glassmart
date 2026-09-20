'use client';
import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Breadcrumbs } from '@/components/ui/fields';
import { EmptyState, Badge } from '@/components/ui/primitives';

interface Result { type: string; title: string; href: string; snippet: string }

export default function SearchClient() {
  const params = useSearchParams();
  const q = params.get('q') ?? '';
  const [results, setResults] = React.useState<Result[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!q) { setResults([]); return; }
    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(q)}`)
      .then((r) => r.json())
      .then((j) => setResults(j.results ?? []))
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <div className="container-x py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Search' }]} />
      <h1 className="mt-3">Search</h1>
      <form action="/search" method="GET" role="search" className="mt-4 flex max-w-xl gap-2">
        <label htmlFor="sq" className="sr-only">Search the site</label>
        <input id="sq" name="q" defaultValue={q} placeholder="Glass, showers, partitions…" className="h-11 flex-1 rounded-[4px] border border-ink-200 px-3" />
        <button className="h-11 rounded-[4px] bg-ink-950 px-5 font-bold text-white">Search</button>
      </form>
      {loading && <p className="mt-6" aria-live="polite">Searching…</p>}
      {!loading && q && results.length === 0 && (
        <div className="mt-6"><EmptyState title={`No results for “${q}”`} body="Try “glass”, “shower”, “partition” or “hinge”." /></div>
      )}
      <ul className="mt-6 grid gap-3">
        {results.map((r) => (
          <li key={r.href} className="rounded-[4px] border border-ink-200 p-4">
            <Badge tone="brand">{r.type}</Badge>
            <Link href={r.href} className="mt-1 block font-bold text-ink-950 hover:text-brand-700 hover:underline">{r.title}</Link>
            <p className="text-sm text-ink-600">{r.snippet}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
