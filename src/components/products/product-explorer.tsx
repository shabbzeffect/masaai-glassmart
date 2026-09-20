'use client';
import * as React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { PRODUCTS, PRODUCT_CATEGORIES } from '@/lib/data/products';
import { ProductCard } from '@/components/products/product-card';
import { EmptyState } from '@/components/ui/primitives';
import { ButtonLink } from '@/components/ui/button';
import { track } from '@/lib/analytics';

export function ProductExplorer() {
  const params = useSearchParams();
  const router = useRouter();
  const [drawer, setDrawer] = React.useState(false);
  const searchRef = React.useRef<HTMLInputElement>(null);

  const search = params.get('search') ?? '';
  const group = params.get('group') ?? '';
  const category = params.get('category') ?? '';
  const availability = params.get('availability') ?? '';
  const [draft, setDraft] = React.useState(search);

  React.useEffect(() => setDraft(search), [search]);

  // Debounced search -> URL
  React.useEffect(() => {
    const t = setTimeout(() => {
      if (draft !== search) set('search', draft);
    }, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft]);

  function set(key: string, value: string) {
    const sp = new URLSearchParams(params.toString());
    if (value) sp.set(key, value);
    else sp.delete(key);
    router.replace(`/products?${sp.toString()}`, { scroll: false });
    if (key === 'search') {
      if (value) track('search_performed', { q: value });
    }
  }

  function clearAll() {
    router.replace('/products', { scroll: false });
    setDraft('');
  }

  let items = [...PRODUCTS];
  if (category) items = items.filter((p) => p.categorySlug === category);
  if (availability) items = items.filter((p) => p.availability === availability);
  if (group) items = items.filter((p) => PRODUCT_CATEGORIES.find((c) => c.slug === p.categorySlug)?.group === group);
  if (search) {
    const q = search.toLowerCase();
    items = items.filter((p) => `${p.name} ${p.summary} ${p.category} ${p.sku}`.toLowerCase().includes(q));
  }

  const activeChips = [
    search && { k: 'search', label: `"${search}"` },
    group && { k: 'group', label: group },
    category && { k: 'category', label: PRODUCT_CATEGORIES.find((c) => c.slug === category)?.name ?? category },
    availability && { k: 'availability', label: availability },
  ].filter(Boolean) as { k: string; label: string }[];

  const filters = (
    <div className="grid gap-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-widest text-ink-500">Group</p>
        <div className="mt-2 grid gap-1">
          {['', 'Glass', 'Architectural Systems', 'Hardware & Fittings'].map((g) => (
            <button key={g || 'all'} onClick={() => set('group', g)} aria-pressed={group === g}
              className={`rounded px-3 py-2 text-left text-sm font-medium min-h-[40px] ${group === g ? 'bg-ink-950 text-white' : 'hover:bg-ink-50'}`}>
              {g || 'All groups'}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm font-bold uppercase tracking-widest text-ink-500">Category</p>
        <div className="mt-2 grid max-h-64 gap-1 overflow-y-auto">
          <button onClick={() => set('category', '')} aria-pressed={!category} className={`rounded px-3 py-2 text-left text-sm min-h-[40px] ${!category ? 'bg-ink-950 text-white' : 'hover:bg-ink-50'}`}>All categories</button>
          {PRODUCT_CATEGORIES.map((c) => (
            <button key={c.slug} onClick={() => set('category', c.slug)} aria-pressed={category === c.slug}
              className={`rounded px-3 py-2 text-left text-sm min-h-[40px] ${category === c.slug ? 'bg-ink-950 text-white' : 'hover:bg-ink-50'}`}>
              {c.name}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm font-bold uppercase tracking-widest text-ink-500">Availability</p>
        <div className="mt-2 grid gap-1">
          {['', 'In stock', 'Made to order', 'Available on request', 'Contact for availability'].map((a) => (
            <button key={a || 'all'} onClick={() => set('availability', a)} aria-pressed={availability === a}
              className={`rounded px-3 py-2 text-left text-sm min-h-[40px] ${availability === a ? 'bg-ink-950 text-white' : 'hover:bg-ink-50'}`}>
              {a || 'Any availability'}
            </button>
          ))}
        </div>
      </div>
      {(group || category || availability || search) && (
        <button onClick={clearAll} className="rounded-[4px] border border-ink-200 px-4 py-2 text-sm font-bold hover:border-ink-950 min-h-[44px]">Clear filters</button>
      )}
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside aria-label="Filters" className="hidden lg:block">
        <div className="sticky top-32 rounded-[4px] border border-ink-200 bg-white p-5">{filters}</div>
      </aside>
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search size={17} aria-hidden className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
            <input
              ref={searchRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Search glass, hardware, SKU…"
              aria-label="Search products"
              className="h-11 w-full rounded-[4px] border border-ink-200 bg-white pl-10 pr-4 text-[15px]"
            />
          </div>
          <button onClick={() => setDrawer(true)} className="inline-flex h-11 items-center gap-2 rounded-[4px] border border-ink-200 px-4 font-bold lg:hidden">
            <SlidersHorizontal size={17} aria-hidden /> Filters
          </button>
          <p aria-live="polite" className="text-sm text-ink-600">{items.length} result{items.length === 1 ? '' : 's'}</p>
        </div>

        {activeChips.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2" aria-label="Active filters">
            {activeChips.map((c) => (
              <button key={c.k} onClick={() => { set(c.k, ''); if (c.k === 'search') setDraft(''); }}
                className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-sm font-semibold text-brand-900 min-h-[36px]">
                {c.label} <X size={14} aria-hidden />
                <span className="sr-only">Remove filter {c.label}</span>
              </button>
            ))}
          </div>
        )}

        {items.length === 0 ? (
          <div className="mt-6">
            <EmptyState
              title="No products match your filters"
              body="Try a broader term (e.g. “glass”, “shower”, “hinge”) or clear filters to browse the full range."
              action={<ButtonLink href="/products" variant="secondary" size="md">Clear all</ButtonLink>}
            />
          </div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        )}
      </div>

      {drawer && (
        <div role="dialog" aria-modal="true" aria-label="Product filters" className="fixed inset-0 z-[70] lg:hidden">
          <div className="absolute inset-0 bg-ink-950/50" onClick={() => setDrawer(false)} />
          <div className="absolute bottom-0 top-0 left-0 w-[86%] max-w-sm overflow-y-auto bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-bold">Filters</p>
              <button onClick={() => setDrawer(false)} aria-label="Close filters" className="grid h-11 w-11 place-items-center rounded border border-ink-200"><X size={18} aria-hidden /></button>
            </div>
            {filters}
            <button onClick={() => setDrawer(false)} className="mt-5 h-12 w-full rounded-[4px] bg-ink-950 font-bold text-white">Show {items.length} results</button>
          </div>
        </div>
      )}
    </div>
  );
}
