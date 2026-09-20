export type Availability = 'In stock' | 'Made to order' | 'Available on request' | 'Contact for availability';

export interface Product {
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  summary: string;
  description: string;
  features: string[];
  applications: string[];
  thicknesses?: string[];
  finishes?: string[];
  material?: string;
  safetyNotes?: string;
  availability: Availability;
  sku: string;
  image: string;
  related?: string[];
}

export interface ProductCategory {
  name: string;
  slug: string;
  group: 'Glass' | 'Architectural Systems' | 'Hardware & Fittings';
  summary: string;
  description: string;
  image: string;
}

export interface Service {
  name: string;
  slug: string;
  summary: string;
  description: string;
  idealFor: string[];
  scope: string[];
  process: { title: string; detail: string }[];
  safety: string[];
  faqs: { q: string; a: string }[];
  image: string;
  relatedProducts?: string[];
}

export interface Solution {
  name: string;
  slug: string;
  audience: string;
  summary: string;
  description: string;
  offers: string[];
  image: string;
}

export interface Project {
  name: string;
  slug: string;
  type: string;
  location: string;
  scope: string;
  materials: string[];
  services: string[];
  challenge: string;
  solution: string;
  outcome: string;
  date: string;
  images: string[];
}

export interface Resource {
  title: string;
  slug: string;
  excerpt: string;
  body: string[];
  author: string;
  date: string;
  readTime: string;
  tags: string[];
}

export interface Faq {
  q: string;
  a: string;
  category: string;
}
