import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/quote-schema';
import { generateEnquiryRef } from '@/lib/utils';

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }
  if (body && typeof body === 'object' && (body as Record<string, unknown>).honeypot) {
    return NextResponse.json({ error: 'Spam detected.' }, { status: 400 });
  }
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Please review the highlighted fields.' }, { status: 422 });
  }
  const ref = generateEnquiryRef();
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[contact ${ref}]`, { name: parsed.data.name, subject: parsed.data.subject });
  }
  return NextResponse.json({ ok: true, ref }, { status: 200 });
}
