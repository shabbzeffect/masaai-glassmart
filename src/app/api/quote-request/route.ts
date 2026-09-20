import { NextRequest, NextResponse } from 'next/server';
import { quoteSchema } from '@/lib/quote-schema';
import { generateEnquiryRef } from '@/lib/utils';

const hits = new Map<string, number[]>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length <= 10;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please try again shortly.' }, { status: 429 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }
  if (body && typeof body === 'object' && (body as Record<string, unknown>).honeypot) {
    return NextResponse.json({ error: 'Spam detected.' }, { status: 400 });
  }
  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Please review the highlighted fields.', issues: parsed.error.flatten() }, { status: 422 });
  }
  const ref = generateEnquiryRef();
  const d = parsed.data;

  // Delivery abstraction: logs in dev, uses env-configured provider in prod.
  // Connect a CRM/email provider (Resend, SendGrid, etc.) via QUOTE_NOTIFY_EMAIL / RESEND_API_KEY.
  const notifyTo = process.env.QUOTE_NOTIFY_EMAIL ?? process.env.SALES_EMAIL;
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[quote ${ref}] to=${notifyTo ?? '(not configured)'}`, {
      name: d.name,
      email: d.email,
      title: d.title,
      projectType: d.projectType,
    });
  } else if (notifyTo) {
    // TODO: send via configured provider. Never log PII in production.
    console.log(`[quote ${ref}] queued for ${notifyTo}`);
  }

  return NextResponse.json({ ok: true, ref, message: 'Quote request received.' }, { status: 200 });
}
