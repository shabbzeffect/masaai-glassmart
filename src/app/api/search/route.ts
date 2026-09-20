import { NextRequest, NextResponse } from 'next/server';
import { PRODUCTS } from '@/lib/data/products';
import { SERVICES, SOLUTIONS, PROJECTS, RESOURCES, FAQS } from '@/lib/data/content';

export async function GET(req: NextRequest) {
  const q = (new URL(req.url).searchParams.get('q') ?? '').toLowerCase().trim();
  if (!q) return NextResponse.json({ results: [] });
  const results: { type: string; title: string; href: string; snippet: string }[] = [];
  PRODUCTS.forEach((p) =>
    (`${p.name} ${p.summary} ${p.category}`.toLowerCase().includes(q)) &&
    results.push({ type: 'Product', title: p.name, href: `/products/${p.categorySlug}/${p.slug}`, snippet: p.summary }),
  );
  SERVICES.forEach((s) =>
    (`${s.name} ${s.summary}`.toLowerCase().includes(q)) &&
    results.push({ type: 'Service', title: s.name, href: `/services/${s.slug}`, snippet: s.summary }),
  );
  SOLUTIONS.forEach((s) =>
    (`${s.name} ${s.summary}`.toLowerCase().includes(q)) &&
    results.push({ type: 'Solution', title: s.name, href: `/solutions/${s.slug}`, snippet: s.summary }),
  );
  PROJECTS.forEach((p) =>
    (`${p.name} ${p.scope}`.toLowerCase().includes(q)) &&
    results.push({ type: 'Project', title: p.name, href: `/projects/${p.slug}`, snippet: p.scope }),
  );
  RESOURCES.forEach((r) =>
    (`${r.title} ${r.excerpt}`.toLowerCase().includes(q)) &&
    results.push({ type: 'Resource', title: r.title, href: `/resources/${r.slug}`, snippet: r.excerpt }),
  );
  FAQS.forEach((f) =>
    (f.q.toLowerCase().includes(q)) &&
    results.push({ type: 'FAQ', title: f.q, href: '/faq', snippet: f.a.slice(0, 140) }),
  );
  return NextResponse.json({ results: results.slice(0, 20), total: results.length });
}
