import { Suspense } from 'react';
import { ProductExplorer } from '@/components/products/product-explorer';
import { Breadcrumbs } from '@/components/ui/fields';
import { pageMetadata, breadcrumbJsonLd } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Products',
  description: 'Browse architectural glass, aluminium systems, hardware and fittings. Filter by category and availability — request pricing on every item.',
  path: '/products',
});

export default function ProductsPage() {
  return (
    <div className="container-x py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'Products', url: '/products' }])) }} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Products' }]} />
      <h1 className="mt-3">Products</h1>
      <p className="mt-2 max-w-3xl text-lg text-ink-600">
        Glass, architectural systems and hardware with clear availability labels. Prices on request — share sizes for an accurate quotation.
      </p>
      <div className="mt-8">
        <Suspense fallback={<p>Loading products…</p>}>
          <ProductExplorer />
        </Suspense>
      </div>
    </div>
  );
}
