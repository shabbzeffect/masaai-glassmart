import { describe, it, expect } from 'vitest';
import { PRODUCTS } from '@/lib/data/products';

function filterProducts(search: string) {
  const q = search.toLowerCase();
  return PRODUCTS.filter((p) => `${p.name} ${p.summary} ${p.category}`.toLowerCase().includes(q));
}

describe('product search/filter', () => {
  it('finds shower products', () => {
    expect(filterProducts('shower').length).toBeGreaterThan(0);
  });
  it('returns empty for nonsense', () => {
    expect(filterProducts('zzz-no-match-zzz').length).toBe(0);
  });
  it('every product has required fields and no prices', () => {
    for (const p of PRODUCTS) {
      expect(p.name.length).toBeGreaterThan(2);
      expect(p.slug.length).toBeGreaterThan(2);
      expect(p.availability).toBeTruthy();
      expect(JSON.stringify(p)).not.toMatch(/\$\s?\d|KES\s?\d/i);
    }
  });
});
