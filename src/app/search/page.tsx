import { Suspense } from 'react';
import SearchClient from './search-client';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({ title: 'Search', description: 'Search products, services, projects, resources and FAQs.', path: '/search' });

export default function SearchPage() {
  return (
    <Suspense fallback={<p className="container-x py-10">Loading…</p>}>
      <SearchClient />
    </Suspense>
  );
}
