import Link from 'next/link';
import Image from 'next/image';
import { PROJECTS } from '@/lib/data/content';
import { Breadcrumbs } from '@/components/ui/fields';
import { SectionHeader, Badge } from '@/components/ui/primitives';
import { CtaBanner } from '@/components/layout/conversion';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({ title: 'Projects', description: 'Project gallery spanning residential, commercial and retail glazing. Sample entries to be replaced with verified work.', path: '/projects' });

export default function ProjectsPage() {
  return (
    <>
      <div className="container-x py-10">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Projects' }]} />
        <SectionHeader eyebrow="Projects" title="Project gallery" intro="Filter by type. Entries are clearly labelled samples until verified Masaai Glassmart projects are supplied." />
        <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <li key={p.slug}>
              <Link href={`/projects/${p.slug}`} className="block overflow-hidden rounded-[4px] border border-ink-200 bg-white shadow-surface transition-transform hover:scale-[1.02]">
                <span className="relative block aspect-[16/10]"><Image src={p.images[0]} alt={p.name} fill sizes="33vw" loading="lazy" className="object-cover" /></span>
                <span className="block p-5">
                  <Badge tone="neutral">{p.type} • Sample</Badge>
                  <span className="mt-2 block font-display font-bold">{p.name}</span>
                  <span className="mt-1 block text-sm text-ink-600">{p.scope}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <CtaBanner />
    </>
  );
}
