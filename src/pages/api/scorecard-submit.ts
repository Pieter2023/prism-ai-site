export const prerender = false;
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) return new Response(JSON.stringify({ error: 'Email not configured' }), { status: 500 });

    const answerRows = Object.entries(data.answers || {}).map(([key, val]) =>
      `<tr><td style="padding:6px 12px;font-weight:bold;background:#f5f5f5;width:200px;text-transform:capitalize">${key.replace(/_/g,' ')}</td><td style="padding:6px 12px">${val}</td></tr>`
    ).join('');

    const gradeColor = { A: '#10B981', B: '#6C3CE1', C: '#F59E0B', D: '#EF4444' }[data.grade] || '#6C3CE1';

    const emailBody = `
<h2>New AI Readiness Scorecard Submission</h2>
<p><strong>Submitted:</strong> ${new Date().toLocaleString('en-CA', { timeZone: 'America/Vancouver' })} (PT)</p>

<h3>Contact Details</h3>
<table style="border-collapse:collapse;width:100%">
  <tr><td style="padding:6px 12px;font-weight:bold;background:#f5f5f5;width:180px">Name</td><td style="padding:6px 12px">${data.name || '—'}</td></tr>
  <tr><td style="padding:6px 12px;font-weight:bold;background:#f5f5f5">Company</td><td style="padding:6px 12px">${data.company || '—'}</td></tr>
  <tr><td style="padding:6px 12px;font-weight:bold;background:#f5f5f5">Email</td><td style="padding:6px 12px"><a href="mailto:${data.email}">${data.email || '—'}</a></td></tr>
</table>

<h3>Score</h3>
<table style="border-collapse:collapse;width:100%">
  <tr><td style="padding:6px 12px;font-weight:bold;background:#f5f5f5;width:180px">Grade</td><td style="padding:6px 12px"><strong style="color:${gradeColor};font-size:1.2em">${data.grade} — ${data.label}</strong></td></tr>
  <tr><td style="padding:6px 12px;font-weight:bold;background:#f5f5f5">Score</td><td style="padding:6px 12px"><strong>${data.pct}% AI Readiness</strong></td></tr>
  <tr><td style="padding:6px 12px;font-weight:bold;background:#f5f5f5">Priority Area</td><td style="padding:6px 12px">${data.priority || '—'}</td></tr>
</table>

<h3>Answers</h3>
<table style="border-collapse:collapse;width:100%">${answerRows}</table>

<br/>
<p style="color:#6C3CE1;font-weight:bold">→ Reply directly to this email to follow up with ${data.name}.</p>
<p style="font-size:0.85em;color:#999">Prism AI · prismaiservices.netlify.app/scorecard</p>
    `.trim();

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'PRISM AI Scorecard <onboarding@resend.dev>',
        to: ['pieterhouseofrealtors@gmail.com'],
        reply_to: data.email,
        subject: `📊 Scorecard: ${data.name} @ ${data.company} — ${data.grade} (${data.pct}%)`,
        html: emailBody,
      }),
    });

    if (!res.ok) return new Response(JSON.stringify({ error: 'Email failed' }), { status: 500 });
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
};
