import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, FileText } from 'lucide-react';
import { getProduct, getCategory, PRODUCTS } from '@/lib/data/products';
import { Breadcrumbs, SpecTable } from '@/components/ui/fields';
import { Badge } from '@/components/ui/primitives';
import { PrintButton } from '@/components/ui/print-button';
import { ProductCard } from '@/components/products/product-card';
import { SITE, whatsappLink } from '@/lib/site';
import { pageMetadata, productJsonLd, breadcrumbJsonLd } from '@/lib/seo';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ category: p.categorySlug, slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { category: string; slug: string } }) {
  const p = getProduct(params.category, params.slug);
  if (!p) return {};
  return pageMetadata({ title: p.name, description: p.summary, path: `/products/${p.categorySlug}/${p.slug}`, image: p.image });
}

export default function ProductPage({ params }: { params: { category: string; slug: string } }) {
  const product = getProduct(params.category, params.slug);
  if (!product) notFound();
  const cat = getCategory(product.categorySlug);
  const related = (product.related ?? [])
    .map((s) => PRODUCTS.find((p) => p.slug === s))
    .filter(Boolean)
    .slice(0, 3);
  const fallbackRelated = PRODUCTS.filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug).slice(0, 3);
  const rel = related.length ? related : fallbackRelated;

  return (
    <div className="container-x py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd({ name: product.name, description: product.description, image: product.image, sku: product.sku, category: product.category })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'Products', url: '/products' }, { name: product.category, url: `/products/${product.categorySlug}` }, { name: product.name, url: `/products/${product.categorySlug}/${product.slug}` }])) }} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: product.category, href: `/products/${product.categorySlug}` }, { label: product.name }]} />

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] border border-ink-200 bg-ink-50">
            <Image src={product.image} alt={product.name} fill priority sizes="(max-width:1024px)100vw,50vw" className="object-cover" />
          </div>
          <p className="mt-2 text-xs text-ink-500">Representative image — final glass tint, hardware finish and detailing confirmed at quotation.</p>
        </div>
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge tone="brand">{product.category}</Badge>
            <Badge tone="neutral">{product.availability}</Badge>
            <Badge tone="neutral">{product.sku}</Badge>
          </div>
          <h1 className="mt-3">{product.name}</h1>
          <p className="mt-3 text-lg text-ink-600">{product.summary}</p>
          <p className="mt-4 text-ink-700">{product.description}</p>
          <div className="mt-6 flex flex-wrap gap-3 no-print">
            <Link href={`/request-a-quote?product=${encodeURIComponent(product.slug)}`} className="btn-transition inline-flex h-12 items-center rounded-[4px] bg-brand-600 px-6 font-bold text-white hover:bg-brand-700">
              <FileText size={17} aria-hidden className="mr-2" /> Add to Quote Request
            </Link>
            <a href={whatsappLink(`Hello ${SITE.name}, I am interested in ${product.name} (${product.sku}). Please advise pricing and availability.`)} target="_blank" rel="noreferrer" className="btn-transition inline-flex h-12 items-center rounded-[4px] border border-ink-200 px-6 font-bold hover:border-ink-950">
              <MessageCircle size={17} aria-hidden className="mr-2" /> WhatsApp Enquiry
            </a>
          </div>
          <p className="mt-3 text-sm font-semibold">Request pricing — no prices displayed until verified.</p>
          {product.features?.length > 0 && (
            <>
              <h2 className="mt-8 text-xl">Key features</h2>
              <ul className="mt-2 list-disc pl-5 text-ink-700">{product.features.map((f) => <li key={f}>{f}</li>)}</ul>
            </>
          )}
        </div>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-xl">Specifications</h2>
          <div className="mt-3">
            <SpecTable rows={[
              { label: 'Category', value: product.category },
              { label: 'Reference', value: product.sku },
              { label: 'Material', value: product.material ?? 'Confirm at quotation' },
              { label: 'Thicknesses', value: (product.thicknesses ?? []).join(', ') || 'Confirm at quotation' },
              { label: 'Finishes', value: (product.finishes ?? []).join(', ') || 'Confirm at quotation' },
              { label: 'Availability', value: product.availability },
            ]} />
          </div>
          {product.safetyNotes && (
            <div role="note" className="mt-4 rounded-[4px] border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
              <p className="font-bold">Safety & handling</p>
              <p className="mt-1">{product.safetyNotes}</p>
            </div>
          )}
        </div>
        <div>
          <h2 className="text-xl">Common applications</h2>
          <ul className="mt-3 list-disc pl-5 text-ink-700">{product.applications.map((a) => <li key={a}>{a}</li>)}</ul>
          <h2 className="mt-6 text-xl">Datasheet</h2>
          <p className="mt-2 text-sm text-ink-600">A project-specific datasheet is issued with your quotation. For now you can download a printable summary of this page.</p>
          <PrintButton />
          {cat && <p className="mt-4 text-sm"><Link href={`/products/${cat.slug}`} className="font-bold text-brand-700 hover:underline">← Back to {cat.name}</Link></p>}
        </div>
      </div>

      {rel.length > 0 && (
        <section aria-labelledby="rel" className="mt-14">
          <h2 id="rel">Related products</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rel.map((p) => p && <ProductCard key={p.slug} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
