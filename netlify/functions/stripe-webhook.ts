import type { Context } from '@netlify/functions';
import { getDb } from './_shared/db.js';
import { getStripe } from './_shared/stripe.js';

export default async function handler(req: Request, _context: Context) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const stripe = getStripe();
  const sig = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return new Response('Missing signature or webhook secret', { status: 400 });
  }

  let event;
  try {
    const body = await req.text();
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return new Response('Invalid signature', { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const submissionId = session.metadata?.submissionId;
    const paymentType = session.metadata?.paymentType;

    if (!submissionId || !paymentType) {
      console.error('Missing metadata on checkout session:', session.id);
      return new Response('OK', { status: 200 });
    }

    const sql = getDb();

    if (paymentType === 'deposit') {
      await sql`
        UPDATE audit_submissions
        SET status = 'deposit_paid',
            deposit_payment_intent = ${session.payment_intent as string},
            deposit_paid_at = NOW(),
            updated_at = NOW()
        WHERE id = ${submissionId}
      `;
    } else if (paymentType === 'delivery') {
      await sql`
        UPDATE audit_submissions
        SET status = 'completed',
            delivery_payment_intent = ${session.payment_intent as string},
            completed_at = NOW(),
            updated_at = NOW()
        WHERE id = ${submissionId}
      `;
    }

    console.log(`Payment ${paymentType} completed for submission ${submissionId}`);
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
