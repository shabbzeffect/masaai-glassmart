import type { Metadata } from 'next';
import { SITE } from '@/lib/site';

const base = !SITE.url || SITE.url.startsWith('[') ? 'https://masaai-glassmart.example.com' : SITE.url;

export function pageMetadata(opts: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = `${base}${opts.path ?? ''}`;
  return {
    title: `${opts.title} | ${SITE.name}`,
    description: opts.description,
    metadataBase: new URL(base),
    alternates: { canonical: url },
    openGraph: {
      title: `${opts.title} | ${SITE.name}`,
      description: opts.description,
      url,
      siteName: SITE.name,
      type: 'website',
      images: opts.image ? [{ url: opts.image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${opts.title} | ${SITE.name}`,
      description: opts.description,
      images: opts.image ? [opts.image] : undefined,
    },
  };
}

export function orgJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: base,
    description: SITE.description,
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${base}${it.url}`,
    })),
  };
}

export function productJsonLd(p: { name: string; description: string; image: string; sku: string; category: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description,
    image: p.image,
    sku: p.sku,
    category: p.category,
    brand: { '@type': 'Brand', name: SITE.name },
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
