# Masaai Glassmart — Glass, Hardware & Architectural Solutions

Premium B2B/B2C platform for architectural glass, aluminium systems, hardware and installation support. Built with Next.js 14 (App Router), TypeScript strict, Tailwind CSS, React Hook Form + Zod.

> Positioning: “Precision in glass. Strength in hardware. Clarity in solution.”

## Stack

- Next.js 14.2 + React 18 + TypeScript strict (`noUnusedLocals/Parameters`)
- Tailwind CSS 3.4 (brand tokens: `brand` teal, `copper` amber, `ink` charcoal)
- Fonts via `next/font/google`: Space Grotesk (display) + Inter (body)
- Icons: `lucide-react` — Framer Motion available for subtle use
- Forms: React Hook Form + Zod (client + server validation)
- Images: `next/image` (AVIF/WebP), Unsplash remote patterns for placeholders
- Tests: Vitest + Testing Library (unit), Playwright (e2e)
- Deploy: Vercel / standards-compliant Node host

## Quick start

```bash
npm install
cp .env.example .env.local   # fill values
npm run dev                  # http://localhost:3000
```

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` / `npm start` | Production build + serve |
| `npm run lint` | Next.js ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | Vitest unit tests |
| `npm run test:e2e` | Playwright critical flows |
| `npm audit` | Dependency audit |

## Environment variables

See `.env.example`. Key vars:

- `NEXT_PUBLIC_SITE_URL` — canonical URL (sitemap, metadata)
- `NEXT_PUBLIC_CURRENCY` — default `KES`
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` — enables privacy-friendly analytics script
- `QUOTE_NOTIFY_EMAIL` / `SALES_EMAIL` — where quote notifications go
- `RESEND_API_KEY` or SMTP vars — wire into `src/app/api/quote-request/route.ts`

Without email credentials the API logs safely in development and returns a reference number — see code comments for provider wiring (Resend/SendGrid/CRM).

## Business placeholders to replace

Central config: `src/lib/site.ts`. Search for `[` tokens:

`[PRIMARY_PHONE]` `[SECONDARY_PHONE]` `[WHATSAPP_NUMBER]` `[EMAIL_ADDRESS]` `[SALES_EMAIL]` `[PHYSICAL_ADDRESS]` `[CITY]` `[COUNTRY]` `[POSTAL_ADDRESS]` `[BUSINESS_HOURS]` `[SITE_URL]` `[MAP_URL]` `[COMPANY_REGISTRATION_DETAILS]` `[TAX_DETAILS]` `[SERVICE_AREAS]` `[WARRANTY_POLICY]` `[DELIVERY_POLICY]` `[RETURN_POLICY]` `[PRIVACY_CONTACT]` `[VERIFIED_CERTIFICATIONS]` `[VERIFIED_PARTNERS]` `[VERIFIED_TESTIMONIALS]`

Testimonials section is intentionally omitted until verified. Project entries are labelled “Sample”.

## Content model (CMS-ready)

Typed models in `src/lib/types.ts`; seed data in:

- `src/lib/data/products.ts` — categories + products (availability labels, no prices)
- `src/lib/data/content.ts` — services, solutions, projects, resources, FAQs
- `src/lib/navigation.ts` — header nav + mega menu
- `src/lib/seo.ts` — metadata + JSON-LD helpers
- `src/lib/site.ts` — all business details, WhatsApp/tel/mail helpers

To connect a CMS later: replace the `src/lib/data/*` imports with fetch calls (same types), add revalidation.

## Updating content

- Products: edit `PRODUCTS` / `PRODUCT_CATEGORIES` (slug, specs, `related`, `availability`).
- Services: edit `SERVICES` (scope, process, safety, FAQs).
- Projects: edit `PROJECTS` (anonymous labels until verified).
- Resources: edit `RESOURCES`.
- Images: replace Unsplash URLs with local `/public/images/*` + update `next.config.mjs` domains as needed. Keep ≥1200px, white/neutral backgrounds, descriptive `alt`.

## Email / storage / CMS / analytics / maps

- **Email:** implement provider in `api/quote-request` + `api/contact` (marked TODO). Sends business notification + customer confirmation; generates `MG-YYYYMMDD-XXXX` refs.
- **Storage:** file uploads are intentionally deferred — form notes ask users to email files post-submit quoting their ref. Validate type/size/signature server-side when enabling uploads; never execute uploads.
- **CMS:** types already match a headless CMS; add fetch + `revalidate`.
- **Analytics:** `src/lib/analytics.ts` — Plausible if `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` set, else `sendBeacon` fallback. No PII in events.
- **Maps:** Contact page uses a privacy-friendly directions link until `[MAP_URL]` is verified; avoid tracking embeds.

## Security

- Server-side Zod validation, honeypot + per-IP rate limiting on quote API.
- Secure headers + CSP in `next.config.mjs` (HSTS should be set at host/CDN for HTTPS).
- Secrets only in env; `.env.example` has no secrets. Run `npm audit` pre-release.

## Accessibility & performance

- Skip link, landmarks, focus-visible, keyboard mega-menu/drawers/dialogs, `aria-describedby` errors, reduced-motion support, 44px+ targets, spec tables with `<th scope>`, decorative images `alt=""`.
- Server components by default; client only for header, filters, forms, search. `next/image` responsive + lazy (hero `priority`), fonts `display:swap`, no heavy background video.

## Production launch checklist

1. Replace all `[PLACEHOLDERS]` in `src/lib/site.ts` + legal pages.
2. Set `NEXT_PUBLIC_SITE_URL` + verify sitemap/robots.
3. Wire email provider + test quote/contact end-to-end.
4. Replace sample projects + add verified testimonials (or keep hidden).
5. Add real OG image + favicon; compress imagery.
6. `npm run lint && npm run typecheck && npm run test && npm run build`.
7. Manual keyboard + mobile (320/375/768/1024/1440) + print check.
8. Legal review of Privacy/Terms/Cookies.
9. Configure host HTTPS/HSTS + analytics domain.
