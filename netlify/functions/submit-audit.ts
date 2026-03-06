import type { Context } from '@netlify/functions';
import { getDb } from './_shared/db.js';
import { calculateScoresServer, suggestTierServer, identifyOpportunities } from './_shared/scoring.js';
import { TIER_PRICES } from './_shared/types.js';
import { sendAdminNotification, sendUserConfirmation } from './_shared/email.js';

export default async function handler(req: Request, _context: Context) {
  // GET: fetch submission status by id
  if (req.method === 'GET') {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    if (!id) {
      return new Response(JSON.stringify({ error: 'Missing id parameter' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sql = getDb();
    const rows = await sql`
      SELECT status, suggested_tier, total_price, deposit_amount, delivery_amount
      FROM audit_submissions WHERE id = ${id}
    `;

    if (rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Submission not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const row = rows[0];
    return new Response(JSON.stringify({
      status: row.status,
      tier: row.suggested_tier,
      totalPrice: row.total_price,
      depositAmount: row.deposit_amount,
      deliveryAmount: row.delivery_amount,
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // POST: submit new audit
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await req.json();
    const { responses, contactName, contactEmail, contactPhone, companyName } = body;

    if (!responses || !contactName || !contactEmail) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(contactEmail)) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Server-side score calculation (never trust client)
    const { overallScore, categoryScores } = calculateScoresServer(responses);
    const suggestedTier = suggestTierServer(responses, overallScore);
    const pricing = TIER_PRICES[suggestedTier];
    const opportunities = identifyOpportunities(responses);

    // Store in database
    const sql = getDb();
    const rows = await sql`
      INSERT INTO audit_submissions (
        contact_name, contact_email, contact_phone, company_name,
        responses, overall_score, category_scores, opportunities,
        suggested_tier, total_price, deposit_amount, delivery_amount
      ) VALUES (
        ${contactName}, ${contactEmail}, ${contactPhone || null}, ${companyName || null},
        ${JSON.stringify(responses)}, ${overallScore}, ${JSON.stringify(categoryScores)}, ${JSON.stringify(opportunities)},
        ${suggestedTier}, ${pricing.total}, ${pricing.deposit}, ${pricing.delivery}
      ) RETURNING id
    `;

    const submissionId = rows[0].id;

    // Send emails (non-blocking)
    Promise.all([
      sendAdminNotification({
        submissionId,
        contactName,
        contactEmail,
        companyName: companyName || null,
        overallScore,
        suggestedTier,
        totalPrice: pricing.total,
        categoryScores,
        opportunities,
        responses,
      }),
      sendUserConfirmation({
        contactEmail,
        contactName,
        overallScore,
        suggestedTier,
        opportunities,
      }),
    ]).catch(err => console.error('Email send error:', err));

    return new Response(JSON.stringify({
      submissionId,
      overallScore,
      categoryScores,
      suggestedTier,
      totalPrice: pricing.total,
      depositAmount: pricing.deposit,
      opportunities,
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Submit audit error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
