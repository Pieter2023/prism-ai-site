import type { Context } from '@netlify/functions';
import { getDb } from './_shared/db.js';
import { getStripe } from './_shared/stripe.js';
import { sendDeliveryPaymentLink } from './_shared/email.js';

export default async function handler(req: Request, _context: Context) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Admin-only: verify bearer token
  const authHeader = req.headers.get('authorization');
  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey || authHeader !== `Bearer ${adminKey}`) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { submissionId } = await req.json();

    if (!submissionId) {
      return new Response(JSON.stringify({ error: 'Missing submissionId' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sql = getDb();
    const rows = await sql`
      SELECT id, contact_email, contact_name, suggested_tier, delivery_amount, status
      FROM audit_submissions WHERE id = ${submissionId}
    `;

    if (rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Submission not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const submission = rows[0];

    if (submission.status !== 'deposit_paid' && submission.status !== 'in_progress') {
      return new Response(JSON.stringify({ error: `Invalid status: ${submission.status}` }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const tierLabel = (submission.suggested_tier as string).charAt(0).toUpperCase() + (submission.suggested_tier as string).slice(1);
    const appUrl = process.env.VITE_APP_URL || 'https://prismaiservices.netlify.app';

    // Create Stripe checkout for delivery payment
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: submission.contact_email as string,
      line_items: [{
        price_data: {
          currency: 'cad',
          product_data: {
            name: `AI Blueprint — ${tierLabel} (Final Payment)`,
            description: `Remaining 50% for your ${tierLabel} AI Blueprint delivery`,
          },
          unit_amount: (submission.delivery_amount as number) * 100,
        },
        quantity: 1,
      }],
      metadata: {
        submissionId: submissionId as string,
        paymentType: 'delivery',
      },
      success_url: `${appUrl}/audit/results/${submissionId}?payment=success&type=delivery`,
      cancel_url: `${appUrl}/audit/results/${submissionId}?payment=cancelled`,
    });

    // Update status and store checkout ID
    await sql`
      UPDATE audit_submissions
      SET status = 'results_ready',
          delivery_checkout_id = ${session.id},
          results_ready_at = NOW(),
          updated_at = NOW()
      WHERE id = ${submissionId}
    `;

    // Send email with payment link
    await sendDeliveryPaymentLink({
      contactEmail: submission.contact_email as string,
      contactName: submission.contact_name as string,
      paymentUrl: session.url!,
      deliveryAmount: submission.delivery_amount as number,
      tier: tierLabel,
    });

    return new Response(JSON.stringify({
      success: true,
      checkoutUrl: session.url,
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Send delivery invoice error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
