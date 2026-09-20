import { notFound } from 'next/navigation';
import Link from 'next/link';
import { RESOURCES } from '@/lib/data/content';
import { Breadcrumbs } from '@/components/ui/fields';
import { Badge } from '@/components/ui/primitives';
import { CtaBanner } from '@/components/layout/conversion';
import { pageMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { formatDate } from '@/lib/utils';

export function generateStaticParams() {
  return RESOURCES.map((r) => ({ slug: r.slug }));
}
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const r = RESOURCES.find((x) => x.slug === params.slug);
  if (!r) return {};
  return pageMetadata({ title: r.title, description: r.excerpt, path: `/resources/${r.slug}` });
}

export default function ResourcePage({ params }: { params: { slug: string } }) {
  const r = RESOURCES.find((x) => x.slug === params.slug);
  if (!r) notFound();
  const related = RESOURCES.filter((x) => x.slug !== r.slug).slice(0, 2);
  return (
    <>
      <article className="container-x max-w-3xl py-10">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'Resources', url: '/resources' }, { name: r.title, url: `/resources/${r.slug}` }])) }} />
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Resources', href: '/resources' }, { label: r.title }]} />
        <div className="mt-4 flex flex-wrap gap-2">{r.tags.map((t) => <Badge key={t} tone="brand">{t}</Badge>)}</div>
        <h1 className="mt-3">{r.title}</h1>
        <p className="mt-2 text-sm text-ink-500">{r.author} • {formatDate(r.date)} • {r.readTime}</p>
        <div className="mt-6 grid gap-4 text-[17px] leading-relaxed text-ink-800">
          {r.body.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <div className="mt-8 flex flex-wrap gap-3 no-print">
          <Link href="/request-a-quote" className="inline-flex h-11 items-center rounded-[4px] bg-brand-600 px-5 font-bold text-white">Discuss your project</Link>
          <Link href="/resources" className="inline-flex h-11 items-center rounded-[4px] border border-ink-200 px-5 font-bold">All guides</Link>
        </div>
        {related.length > 0 && (
          <aside aria-label="Related guides" className="mt-10 border-t border-ink-200 pt-6">
            <h2 className="text-xl">Related guides</h2>
            <ul className="mt-3 grid gap-3">
              {related.map((x) => (
                <li key={x.slug}><Link href={`/resources/${x.slug}`} className="font-bold text-brand-700 hover:underline">{x.title}</Link><p className="text-sm text-ink-600">{x.excerpt}</p></li>
              ))}
            </ul>
          </aside>
        )}
      </article>
      <CtaBanner />
    </>
  );
}
