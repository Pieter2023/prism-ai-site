import type { Context } from '@netlify/functions';
import { getDb } from './_shared/db.js';
import { getStripe } from './_shared/stripe.js';

export default async function handler(req: Request, _context: Context) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { submissionId, paymentType } = await req.json();

    if (!submissionId || !['deposit', 'delivery'].includes(paymentType)) {
      return new Response(JSON.stringify({ error: 'Invalid request' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sql = getDb();
    const rows = await sql`
      SELECT id, contact_email, contact_name, suggested_tier, total_price, deposit_amount, delivery_amount, status
      FROM audit_submissions WHERE id = ${submissionId}
    `;

    if (rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Submission not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const submission = rows[0];
    const amount = paymentType === 'deposit'
      ? submission.deposit_amount
      : submission.delivery_amount;

    const tierLabel = (submission.suggested_tier as string).charAt(0).toUpperCase() + (submission.suggested_tier as string).slice(1);
    const appUrl = process.env.VITE_APP_URL || 'https://prismaiservices.netlify.app';

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: submission.contact_email as string,
      line_items: [{
        price_data: {
          currency: 'cad',
          product_data: {
            name: `AI Blueprint — ${tierLabel} (${paymentType === 'deposit' ? 'Deposit' : 'Final Payment'})`,
            description: paymentType === 'deposit'
              ? `50% deposit for your ${tierLabel} AI Blueprint audit`
              : `Remaining 50% for your ${tierLabel} AI Blueprint delivery`,
          },
          unit_amount: (amount as number) * 100, // Stripe expects cents
        },
        quantity: 1,
      }],
      metadata: {
        submissionId: submissionId as string,
        paymentType,
      },
      success_url: `${appUrl}/audit/results/${submissionId}?payment=success&type=${paymentType}`,
      cancel_url: `${appUrl}/audit/results/${submissionId}?payment=cancelled`,
    });

    // Store checkout ID
    if (paymentType === 'deposit') {
      await sql`UPDATE audit_submissions SET deposit_checkout_id = ${session.id}, updated_at = NOW() WHERE id = ${submissionId}`;
    } else {
      await sql`UPDATE audit_submissions SET delivery_checkout_id = ${session.id}, updated_at = NOW() WHERE id = ${submissionId}`;
    }

    if (!session.url) {
      return new Response(JSON.stringify({ error: 'Failed to generate checkout URL' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ sessionUrl: session.url }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Create checkout error:', err);
    return new Response(JSON.stringify({ error: 'Failed to create checkout session' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
