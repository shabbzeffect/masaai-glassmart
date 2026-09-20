/**
 * Central site configuration.
 * All editable business details live here.
 * Unverified values use [PLACEHOLDER] tokens — easy to find and replace.
 */
export const SITE = {
  name: 'Masaai Glassmart',
  legalName: '[BUSINESS_LEGAL_NAME]',
  tagline: 'Precision in glass. Strength in hardware. Clarity in solution.',
  heroHeadline: 'Glass, Hardware and Architectural Solutions Built Around Your Project.',
  description:
    'Masaai Glassmart supplies architectural glass, aluminium systems, hardware and fittings, with measurement, fabrication coordination and professional installation support for homes and commercial projects.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? '[SITE_URL]',
  locale: 'en',
  currency: process.env.NEXT_PUBLIC_CURRENCY ?? 'KES',
  contact: {
    primaryPhone: '[PRIMARY_PHONE]',
    secondaryPhone: '[SECONDARY_PHONE]',
    whatsapp: '[WHATSAPP_NUMBER]',
    whatsappDisplay: '[WHATSAPP_NUMBER]',
    email: '[EMAIL_ADDRESS]',
    salesEmail: '[SALES_EMAIL]',
    address: '[PHYSICAL_ADDRESS]',
    city: '[CITY]',
    country: '[COUNTRY]',
    postalAddress: '[POSTAL_ADDRESS]',
    hours: '[BUSINESS_HOURS]',
    mapUrl: '[MAP_URL]',
    privacyContact: '[PRIVACY_CONTACT]',
  },
  social: {
    facebook: '[SOCIAL_LINKS_FACEBOOK]',
    instagram: '[SOCIAL_LINKS_INSTAGRAM]',
    x: '[SOCIAL_LINKS_X]',
    linkedin: '[SOCIAL_LINKS_LINKEDIN]',
    tiktok: '[SOCIAL_LINKS_TIKTOK]',
  },
  serviceAreas: '[SERVICE_AREAS]',
  policies: {
    warranty: '[WARRANTY_POLICY]',
    delivery: '[DELIVERY_POLICY]',
    returns: '[RETURN_POLICY]',
  },
  quote: {
    maxFileMB: 10,
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
    budgets: ['Under 50k', '50k – 200k', '200k – 1M', '1M+', 'Not sure yet'],
    timeframes: ['Urgent / ASAP', 'Within 2 weeks', 'Within 1 month', '1–3 months', 'Planning / flexible'],
  },
  features: {
    newsletter: false,
    adminPreview: false,
    analytics: (process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? '').length > 0,
  },
  placeholders: {
    list: [
      '[PRIMARY_PHONE]',
      '[WHATSAPP_NUMBER]',
      '[EMAIL_ADDRESS]',
      '[PHYSICAL_ADDRESS]',
      '[CITY]',
      '[COUNTRY]',
      '[BUSINESS_HOURS]',
      '[SITE_URL]',
      '[MAP_URL]',
    ],
  },
} as const;

export function isPlaceholder(value: string | undefined | null): boolean {
  if (!value) return true;
  return value.includes('[') && value.includes(']');
}

export function whatsappLink(message: string): string {
  const num = SITE.contact.whatsapp.replace(/[^0-9]/g, '');
  if (!num || num.includes('WHATSAPP')) {
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  }
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}

export function telLink(phone: string): string {
  if (isPlaceholder(phone)) return 'tel:+254000000000';
  return `tel:${phone.replace(/\s/g, '')}`;
}

export function mailLink(email: string): string {
  if (isPlaceholder(email)) return 'mailto:info@example.com';
  return `mailto:${email}`;
}
