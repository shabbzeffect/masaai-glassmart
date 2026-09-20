import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getCategory, PRODUCTS, PRODUCT_CATEGORIES } from '@/lib/data/products';
import { ProductCard } from '@/components/products/product-card';
import { Breadcrumbs } from '@/components/ui/fields';
import { Badge } from '@/components/ui/primitives';
import { pageMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return PRODUCT_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: { category: string } }) {
  const cat = getCategory(params.category);
  if (!cat) return {};
  return pageMetadata({ title: cat.name, description: cat.description, path: `/products/${cat.slug}` });
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const cat = getCategory(params.category);
  if (!cat) notFound();
  const items = PRODUCTS.filter((p) => p.categorySlug === cat.slug);
  return (
    <div className="container-x py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: cat.name }]} />
      <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
        <div>
          <Badge tone="neutral">{cat.group}</Badge>
          <h1 className="mt-2">{cat.name}</h1>
          <p className="mt-3 max-w-3xl text-lg text-ink-600">{cat.description}</p>
          <p className="mt-3 text-sm text-ink-500">Availability varies per item — labels shown on each product. Request pricing for confirmed lead times.</p>
        </div>
        <div className="relative aspect-[16/9] overflow-hidden rounded-[4px] border border-ink-200">
          <Image src={cat.image} alt={cat.name} fill sizes="(max-width:1024px)100vw,320px" className="object-cover" loading="lazy" />
        </div>
      </div>
      {items.length === 0 ? (
        <p className="mt-10 text-ink-600">Items for this category are being prepared. <Link href="/request-a-quote" className="font-bold text-brand-700 hover:underline">Request availability →</Link></p>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      )}
    </div>
  );
}
