import type { Context } from '@netlify/functions';
import { sendContactInquiry } from './_shared/email.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req: Request, _context: Context) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await req.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const company = typeof body.company === 'string' ? body.company.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Name, email, and message are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!EMAIL_RE.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Cap message length — anything above this is almost certainly spam.
    if (message.length > 4000) {
      return new Response(JSON.stringify({ error: 'Message too long.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await sendContactInquiry({
      name,
      email,
      company: company || null,
      message,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Contact send error:', err);
    return new Response(JSON.stringify({ error: 'Could not send your inquiry. Please email pieter@prismaiservices.ca directly.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
