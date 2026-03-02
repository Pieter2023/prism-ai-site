export const prerender = false;
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: 'Email not configured' }), { status: 500 });
    }

    const emailBody = `
<h2>New AI Business Audit Submission</h2>
<p><strong>Submitted:</strong> ${new Date().toLocaleString('en-CA', { timeZone: 'America/Vancouver' })} (PT)</p>

<h3>Contact Details</h3>
<table style="border-collapse:collapse;width:100%">
  <tr><td style="padding:6px 12px;font-weight:bold;background:#f5f5f5;width:180px">Name</td><td style="padding:6px 12px">${data.name || '—'}</td></tr>
  <tr><td style="padding:6px 12px;font-weight:bold;background:#f5f5f5">Company</td><td style="padding:6px 12px">${data.company || '—'}</td></tr>
  <tr><td style="padding:6px 12px;font-weight:bold;background:#f5f5f5">Email</td><td style="padding:6px 12px"><a href="mailto:${data.email}">${data.email || '—'}</a></td></tr>
  <tr><td style="padding:6px 12px;font-weight:bold;background:#f5f5f5">Role</td><td style="padding:6px 12px">${data.role || '—'}</td></tr>
  <tr><td style="padding:6px 12px;font-weight:bold;background:#f5f5f5">Industry</td><td style="padding:6px 12px">${data.industry || '—'}</td></tr>
  <tr><td style="padding:6px 12px;font-weight:bold;background:#f5f5f5">Team Size</td><td style="padding:6px 12px">${data.team_size || '—'}</td></tr>
</table>

<h3>Operations</h3>
<table style="border-collapse:collapse;width:100%">
  <tr><td style="padding:6px 12px;font-weight:bold;background:#f5f5f5;width:180px">Business Description</td><td style="padding:6px 12px">${data.business_description || '—'}</td></tr>
  <tr><td style="padding:6px 12px;font-weight:bold;background:#f5f5f5">Top Manual Tasks</td><td style="padding:6px 12px;white-space:pre-wrap">${data.manual_tasks || '—'}</td></tr>
  <tr><td style="padding:6px 12px;font-weight:bold;background:#f5f5f5">Hours/Week on Manual Work</td><td style="padding:6px 12px">${data.manual_hours || '—'}</td></tr>
  <tr><td style="padding:6px 12px;font-weight:bold;background:#f5f5f5">Biggest Bottleneck</td><td style="padding:6px 12px">${data.bottleneck || '—'}</td></tr>
</table>

<h3>Tech Stack</h3>
<table style="border-collapse:collapse;width:100%">
  <tr><td style="padding:6px 12px;font-weight:bold;background:#f5f5f5;width:180px">CRM</td><td style="padding:6px 12px">${data.crm || '—'}</td></tr>
  <tr><td style="padding:6px 12px;font-weight:bold;background:#f5f5f5">Communication Tools</td><td style="padding:6px 12px">${data.comms || '—'}</td></tr>
  <tr><td style="padding:6px 12px;font-weight:bold;background:#f5f5f5">Task Management</td><td style="padding:6px 12px">${data.task_mgmt || '—'}</td></tr>
  <tr><td style="padding:6px 12px;font-weight:bold;background:#f5f5f5">Accounting</td><td style="padding:6px 12px">${data.accounting || '—'}</td></tr>
  <tr><td style="padding:6px 12px;font-weight:bold;background:#f5f5f5">Tech Comfort Level</td><td style="padding:6px 12px">${data.tech_comfort || '—'}</td></tr>
</table>

<h3>AI Readiness</h3>
<table style="border-collapse:collapse;width:100%">
  <tr><td style="padding:6px 12px;font-weight:bold;background:#f5f5f5;width:180px">AI Experience</td><td style="padding:6px 12px">${data.ai_experience || '—'}</td></tr>
  <tr><td style="padding:6px 12px;font-weight:bold;background:#f5f5f5">AI Tools Used</td><td style="padding:6px 12px">${data.ai_tools_used || '—'}</td></tr>
  <tr><td style="padding:6px 12px;font-weight:bold;background:#f5f5f5">Main AI Concern</td><td style="padding:6px 12px">${data.ai_concern || '—'}</td></tr>
  <tr><td style="padding:6px 12px;font-weight:bold;background:#f5f5f5">Success Vision (6 months)</td><td style="padding:6px 12px">${data.success_vision || '—'}</td></tr>
</table>

<h3>Goals & Budget</h3>
<table style="border-collapse:collapse;width:100%">
  <tr><td style="padding:6px 12px;font-weight:bold;background:#f5f5f5;width:180px">Priority Area</td><td style="padding:6px 12px">${data.priority_area || '—'}</td></tr>
  <tr><td style="padding:6px 12px;font-weight:bold;background:#f5f5f5">Timeline</td><td style="padding:6px 12px">${data.timeline || '—'}</td></tr>
  <tr><td style="padding:6px 12px;font-weight:bold;background:#f5f5f5">Budget Range</td><td style="padding:6px 12px"><strong>${data.budget || '—'}</strong></td></tr>
  <tr><td style="padding:6px 12px;font-weight:bold;background:#f5f5f5">Additional Notes</td><td style="padding:6px 12px">${data.additional_info || '—'}</td></tr>
</table>

<br/>
<p style="color:#6C3CE1;font-weight:bold">→ Reply directly to this email to respond to ${data.name}.</p>
<p style="font-size:0.85em;color:#999">Prism AI · prismaiservices.ca</p>
    `.trim();

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'PRISM AI Audit <onboarding@resend.dev>',
        to: ['pieterhouseofrealtors@gmail.com'],
        reply_to: data.email,
        subject: `🎯 New AI Audit Submission — ${data.company || data.name} (${data.budget || 'budget TBC'})`,
        html: emailBody,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Resend error:', err);
      return new Response(JSON.stringify({ error: 'Email failed' }), { status: 500 });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });

  } catch (err) {
    console.error('Audit submit error:', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
};
