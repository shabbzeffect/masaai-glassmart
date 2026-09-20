import Link from 'next/link';
import { RESOURCES } from '@/lib/data/content';
import { Breadcrumbs } from '@/components/ui/fields';
import { SectionHeader, Badge } from '@/components/ui/primitives';
import { pageMetadata } from '@/lib/seo';
import { formatDate } from '@/lib/utils';

export const metadata = pageMetadata({ title: 'Resources & Insights', description: 'Guides on safety glass, thickness, showers, partitions, maintenance and getting an accurate quotation.', path: '/resources' });

export default function ResourcesPage() {
  return (
    <div className="container-x py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Resources' }]} />
      <SectionHeader eyebrow="Learn" title="Resources & insights" intro="Practical, jargon-light guides. General guidance — confirm final specifications for your project." />
      <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {RESOURCES.map((r) => (
          <li key={r.slug} className="flex flex-col rounded-[4px] border border-ink-200 bg-white p-6 shadow-surface">
            <div className="flex flex-wrap gap-2">{r.tags.map((t) => <Badge key={t} tone="brand">{t}</Badge>)}</div>
            <h2 className="mt-3 text-lg leading-snug"><Link href={`/resources/${r.slug}`} className="hover:text-brand-700 hover:underline">{r.title}</Link></h2>
            <p className="mt-2 flex-1 text-sm text-ink-600">{r.excerpt}</p>
            <p className="mt-3 text-xs text-ink-500">{r.author} • {formatDate(r.date)} • {r.readTime}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
