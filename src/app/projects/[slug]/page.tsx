import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PROJECTS } from '@/lib/data/content';
import { Breadcrumbs, SpecTable } from '@/components/ui/fields';
import { Badge } from '@/components/ui/primitives';
import { CtaBanner } from '@/components/layout/conversion';
import { pageMetadata } from '@/lib/seo';
import { formatDate } from '@/lib/utils';

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const p = PROJECTS.find((x) => x.slug === params.slug);
  if (!p) return {};
  return pageMetadata({ title: p.name, description: p.scope, path: `/projects/${p.slug}`, image: p.images[0] });
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const p = PROJECTS.find((x) => x.slug === params.slug);
  if (!p) notFound();
  return (
    <>
      <div className="container-x py-10">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Projects', href: '/projects' }, { label: p.name }]} />
        <Badge tone="copper">Sample entry — replace with verified project</Badge>
        <h1 className="mt-2 max-w-3xl">{p.name}</h1>
        <p className="mt-2 text-ink-600">{p.type} • {p.location} • {formatDate(p.date)}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {p.images.map((src, i) => (
            <div key={i} className="relative aspect-[16/10] overflow-hidden rounded-[4px] border border-ink-200">
              <Image src={src} alt={`${p.name} — image ${i + 1}`} fill sizes="50vw" loading={i === 0 ? undefined : 'lazy'} priority={i === 0} className="object-cover" />
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="grid gap-5">
            <div><h2 className="text-xl">Challenge</h2><p className="mt-1 text-ink-700">{p.challenge}</p></div>
            <div><h2 className="text-xl">Solution</h2><p className="mt-1 text-ink-700">{p.solution}</p></div>
            <div><h2 className="text-xl">Outcome</h2><p className="mt-1 text-ink-700">{p.outcome}</p></div>
          </div>
          <div>
            <h2 className="text-xl">Project details</h2>
            <div className="mt-3"><SpecTable rows={[
              { label: 'Scope', value: p.scope },
              { label: 'Materials', value: p.materials.join(', ') },
              { label: 'Services', value: p.services.join(', ') },
              { label: 'Client type', value: p.type },
            ]} /></div>
            <div className="mt-6 flex gap-3 no-print">
              <Link href="/request-a-quote" className="inline-flex h-12 items-center rounded-[4px] bg-brand-600 px-6 font-bold text-white">Start similar project</Link>
              <Link href="/projects" className="inline-flex h-12 items-center rounded-[4px] border border-ink-200 px-6 font-bold">All projects</Link>
            </div>
          </div>
        </div>
      </div>
      <CtaBanner />
    </>
  );
}
