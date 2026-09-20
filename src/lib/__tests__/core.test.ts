import { describe, it, expect } from 'vitest';
import { generateEnquiryRef, slugify, excerpt } from '@/lib/utils';
import { quoteSchema } from '@/lib/quote-schema';

describe('utils', () => {
  it('generates enquiry refs like MG-YYYYMMDD-XXXX', () => {
    expect(generateEnquiryRef()).toMatch(/^MG-\d{8}-[A-Z0-9]{4}$/);
  });
  it('slugifies', () => {
    expect(slugify('Toughened Glass 10mm')).toBe('toughened-glass-10mm');
  });
  it('excerpts', () => {
    expect(excerpt('hello world foo bar', 11).endsWith('…')).toBe(true);
  });
});

describe('quote schema', () => {
  const base = {
    honeypot: '',
    projectType: 'Residential',
    categories: ['Mirrors'],
    title: 'Bathroom mirror',
    description: 'Two bathroom mirrors 600x900 with polished edges',
    location: 'Kileleshwa',
    timeframe: 'Within 2 weeks',
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '+254700000000',
    contactMethod: 'WhatsApp',
    privacyConsent: true,
  };
  it('accepts valid input', () => {
    expect(quoteSchema.safeParse(base).success).toBe(true);
  });
  it('rejects missing consent', () => {
    const r = quoteSchema.safeParse({ ...base, privacyConsent: false });
    expect(r.success).toBe(false);
  });
  it('rejects honeypot', () => {
    const r = quoteSchema.safeParse({ ...base, honeypot: 'bot' });
    expect(r.success).toBe(false);
  });
  it('rejects bad email', () => {
    const r = quoteSchema.safeParse({ ...base, email: 'not-an-email' });
    expect(r.success).toBe(false);
  });
});
