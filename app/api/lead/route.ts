import { NextResponse } from 'next/server';

/**
 * Receives AURA Scan, contact and career submissions.
 *
 * Delivery: if LEAD_WEBHOOK_URL is set (Zapier, Make, Google Apps Script,
 * Slack, a CRM…), the validated lead is forwarded there as JSON. Otherwise
 * it is written to the server log so nothing is lost during development.
 */

const TYPES = new Set(['aura', 'contact', 'career']);
const str = (v: unknown, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  // Honeypot: real users never fill the hidden "website" field.
  if (str(body.website)) return NextResponse.json({ ok: true });

  const type = str(body.type, 20);
  const name = str(body.name, 100);
  const phone = str(body.phone, 20);
  const email = str(body.email, 120);

  const errors: string[] = [];
  if (!TYPES.has(type)) errors.push('type');
  if (name.length < 2) errors.push('name');
  if (!/^[+\d][\d\s-]{7,15}$/.test(phone)) errors.push('phone');
  if (email && !/^\S+@\S+\.\S+$/.test(email)) errors.push('email');
  if (errors.length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const lead = {
    type,
    name,
    phone,
    email,
    business: str(body.business, 120),
    city: str(body.city, 80),
    role: str(body.role, 80),
    message: str(body.message, 4000),
    profile: type === 'aura' ? body.profile : undefined,
    answers: type === 'aura' ? body.answers : undefined,
    scores: type === 'aura' ? body.scores : undefined,
    health: type === 'aura' && typeof body.health === 'number' ? body.health : undefined,
    receivedAt: new Date().toISOString(),
  };

  const hook = process.env.LEAD_WEBHOOK_URL;
  if (hook) {
    try {
      const res = await fetch(hook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead) });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (err) {
      console.error('[lead] webhook delivery failed', err);
      return NextResponse.json({ ok: false, error: 'Delivery failed' }, { status: 502 });
    }
  } else {
    console.info('[lead] received (set LEAD_WEBHOOK_URL to forward):', JSON.stringify(lead));
  }

  return NextResponse.json({ ok: true });
}
