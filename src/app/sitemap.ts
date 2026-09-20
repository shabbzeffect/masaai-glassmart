import type { MetadataRoute } from 'next';
import { PRODUCTS, PRODUCT_CATEGORIES } from '@/lib/data/products';
import { SERVICES, SOLUTIONS, PROJECTS, RESOURCES } from '@/lib/data/content';

const base = process.env.NEXT_PUBLIC_SITE_URL?.startsWith('http')
  ? process.env.NEXT_PUBLIC_SITE_URL
  : 'https://masaai-glassmart.example.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const statics = ['', '/products', '/services', '/solutions', '/projects', '/about', '/resources', '/faq', '/request-a-quote', '/contact', '/privacy', '/terms', '/cookies'];
  const urls: MetadataRoute.Sitemap = statics.map((p) => ({ url: `${base}${p || '/'}`, lastModified: new Date(), changeFrequency: 'weekly', priority: p === '' ? 1 : 0.7 }));
  PRODUCT_CATEGORIES.forEach((c) => urls.push({ url: `${base}/products/${c.slug}`, lastModified: new Date() }));
  PRODUCTS.forEach((p) => urls.push({ url: `${base}/products/${p.categorySlug}/${p.slug}`, lastModified: new Date() }));
  SERVICES.forEach((s) => urls.push({ url: `${base}/services/${s.slug}`, lastModified: new Date() }));
  SOLUTIONS.forEach((s) => urls.push({ url: `${base}/solutions/${s.slug}`, lastModified: new Date() }));
  PROJECTS.forEach((p) => urls.push({ url: `${base}/projects/${p.slug}`, lastModified: new Date() }));
  RESOURCES.forEach((r) => urls.push({ url: `${base}/resources/${r.slug}`, lastModified: new Date() }));
  return urls;
}
