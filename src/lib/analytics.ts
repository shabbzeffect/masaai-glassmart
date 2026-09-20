// Provider-agnostic, privacy-friendly analytics abstraction.
// No personal data is sent. Events are no-ops unless Plausible domain is configured.

type AnalyticsEvent =
  | 'quote_started'
  | 'quote_step'
  | 'quote_submitted'
  | 'contact_submitted'
  | 'product_viewed'
  | 'product_quote_clicked'
  | 'phone_clicked'
  | 'email_clicked'
  | 'whatsapp_clicked'
  | 'directions_clicked'
  | 'search_performed'
  | 'search_empty';

export function track(event: AnalyticsEvent, props?: Record<string, string | number>) {
  try {
    if (typeof window === 'undefined') return;
    // Plausible-compatible
    const plausible = (window as unknown as { plausible?: (e: string, o?: { props?: unknown }) => void }).plausible;
    if (typeof plausible === 'function') {
      plausible(event, { props });
      return;
    }
    // Beacon fallback (cookie-less page-view style, no PII)
    if (navigator.sendBeacon && process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
      const payload = JSON.stringify({ event, props, ts: Date.now(), path: window.location.pathname });
      navigator.sendBeacon(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, payload);
    }
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.debug('[analytics]', event, props ?? {});
    }
  } catch {
    /* never break UX for analytics */
  }
}
