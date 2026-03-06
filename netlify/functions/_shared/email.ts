import { Resend } from 'resend';

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error('RESEND_API_KEY is not set');
    _resend = new Resend(key);
  }
  return _resend;
}

const FROM = process.env.EMAIL_FROM || 'Prism AI <onboarding@resend.dev>';

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export async function sendAdminNotification(data: {
  submissionId: string;
  contactName: string;
  contactEmail: string;
  companyName: string | null;
  overallScore: number;
  suggestedTier: string;
  totalPrice: number;
  categoryScores: Array<{ category: string; percentage: number }>;
  opportunities: Array<{ title: string; description: string; impact: string }>;
  responses: Record<string, unknown>;
}) {
  const adminEmail = process.env.AUDIT_NOTIFICATION_EMAIL;
  if (!adminEmail) return;

  const resend = getResend();
  await resend.emails.send({
    from: FROM,
    to: adminEmail,
    subject: `New AI Audit: ${data.contactName} (${data.companyName || 'No company'}) — Score: ${data.overallScore}/100`,
    html: `
      <h2>New AI Blueprint Audit Submission</h2>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Name</strong></td><td style="padding:8px;border:1px solid #ddd">${esc(data.contactName)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd">${esc(data.contactEmail)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Company</strong></td><td style="padding:8px;border:1px solid #ddd">${esc(data.companyName || '—')}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Score</strong></td><td style="padding:8px;border:1px solid #ddd">${data.overallScore}/100</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Tier</strong></td><td style="padding:8px;border:1px solid #ddd">${data.suggestedTier} ($${data.totalPrice.toLocaleString()} CAD)</td></tr>
      </table>
      <h3>Category Scores</h3>
      <ul>${data.categoryScores.map(c => `<li>${c.category}: ${c.percentage}%</li>`).join('')}</ul>
      <h3>Top Opportunities</h3>
      <ul>${data.opportunities.map(o => `<li><strong>[${o.impact}]</strong> ${o.title}: ${o.description}</li>`).join('')}</ul>
      <h3>Full Responses</h3>
      <pre style="background:#f5f5f5;padding:12px;border-radius:4px;overflow:auto;font-size:12px">${esc(JSON.stringify(data.responses, null, 2))}</pre>
      <p><a href="${process.env.VITE_APP_URL || 'https://prismaiservices.netlify.app'}">Prism AI Dashboard</a></p>
    `,
  });
}

export async function sendUserConfirmation(data: {
  contactEmail: string;
  contactName: string;
  overallScore: number;
  suggestedTier: string;
  opportunities: Array<{ title: string; description: string }>;
}) {
  const resend = getResend();
  await resend.emails.send({
    from: FROM,
    to: data.contactEmail,
    subject: `Your AI Readiness Score: ${data.overallScore}/100 — Prism AI`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#135bec">Your AI Readiness Score</h2>
        <p>Hi ${esc(data.contactName)},</p>
        <p>Thank you for completing the Prism AI Blueprint assessment. Here's your summary:</p>
        <div style="text-align:center;padding:20px">
          <div style="font-size:48px;font-weight:bold;color:#135bec">${data.overallScore}/100</div>
          <p>Recommended tier: <strong>${data.suggestedTier}</strong></p>
        </div>
        <h3>Your Top AI Opportunities:</h3>
        <ol>${data.opportunities.slice(0, 3).map(o => `<li><strong>${o.title}</strong><br/><span style="color:#666">${o.description}</span></li>`).join('')}</ol>
        <p>Want the full blueprint with detailed automation roadmap, ROI projections, and a 1-on-1 strategy session?</p>
        <p><a href="${process.env.VITE_APP_URL || 'https://prismaiservices.netlify.app'}/audit" style="display:inline-block;padding:12px 24px;background:#135bec;color:white;text-decoration:none;border-radius:8px;font-weight:600">Unlock Full Blueprint</a></p>
        <p style="color:#999;font-size:12px;margin-top:40px">Prism AI — Automate the Chaos<br/>This email was sent because you completed an AI readiness assessment at prismaiservices.netlify.app</p>
      </div>
    `,
  });
}

export async function sendDeliveryPaymentLink(data: {
  contactEmail: string;
  contactName: string;
  paymentUrl: string;
  deliveryAmount: number;
  tier: string;
}) {
  const resend = getResend();
  await resend.emails.send({
    from: FROM,
    to: data.contactEmail,
    subject: `Your AI Blueprint Is Ready — Final Payment | Prism AI`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#135bec">Your AI Blueprint Is Ready!</h2>
        <p>Hi ${esc(data.contactName)},</p>
        <p>Great news — your personalized AI Blueprint (${data.tier} tier) has been completed by our consulting team.</p>
        <p>To receive your full report and schedule your 1-on-1 strategy session, please complete the remaining balance:</p>
        <div style="text-align:center;padding:20px">
          <p style="font-size:24px;font-weight:bold">$${data.deliveryAmount.toLocaleString()} CAD</p>
          <a href="${data.paymentUrl}" style="display:inline-block;padding:14px 28px;background:#135bec;color:white;text-decoration:none;border-radius:8px;font-weight:600;font-size:16px">Complete Payment</a>
        </div>
        <p style="color:#999;font-size:12px;margin-top:40px">Prism AI — Automate the Chaos</p>
      </div>
    `,
  });
}
