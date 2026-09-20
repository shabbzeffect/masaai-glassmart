import { NextRequest, NextResponse } from 'next/server';
import { PRODUCTS, PRODUCT_CATEGORIES } from '@/lib/data/products';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const search = (searchParams.get('search') ?? '').toLowerCase();
  const availability = searchParams.get('availability');

  let items = [...PRODUCTS];
  if (category) items = items.filter((p) => p.categorySlug === category);
  if (availability) items = items.filter((p) => p.availability === availability);
  if (search) {
    items = items.filter((p) =>
      `${p.name} ${p.summary} ${p.category} ${p.sku}`.toLowerCase().includes(search),
    );
  }
  return NextResponse.json({ items, categories: PRODUCT_CATEGORIES, total: items.length });
}
