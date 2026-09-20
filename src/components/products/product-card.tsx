import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/lib/types';
import { Badge } from '@/components/ui/primitives';

export function ProductCard({ product }: { product: Product }) {
  const href = `/products/${product.categorySlug}/${product.slug}`;
  return (
    <article className="group flex flex-col overflow-hidden rounded-md border border-ink-200/90 bg-white shadow-surface transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-elevated hover:border-brand-700/40">
      <Link href={href} className="block focus-visible:outline-brand-700" aria-label={product.name} tabIndex={-1}>
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-ink-50 to-brand-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
            loading="lazy"
          />
          <span className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-ink-950/25 to-transparent" aria-hidden />
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge tone="brand">{product.category}</Badge>
          <Badge tone={product.availability === 'In stock' ? 'success' : 'neutral'}>{product.availability}</Badge>
        </div>
        <h3 className="text-[17px] font-bold leading-snug tracking-tight">
          <Link href={href} className="rounded-sm underline-offset-4 hover:text-brand-700 hover:underline focus-visible:outline-brand-700">
            {product.name}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-ink-600 line-clamp-2">{product.summary}</p>
        <div className="mt-auto flex items-center justify-between gap-2 border-t border-ink-100 pt-3">
          <span className="text-[13px] font-semibold uppercase tracking-wide text-ink-500">Request pricing</span>
          <Link
            href={`/request-a-quote?product=${encodeURIComponent(product.slug)}`}
            className="inline-flex min-h-[44px] items-center gap-1 rounded-[4px] px-2 text-sm font-bold text-brand-700 hover:bg-brand-50 hover:underline"
            aria-label={`Get a quote for ${product.name}`}
          >
            Get quote <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}
