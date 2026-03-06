const BASE = '/api';

async function request<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Network error' }));
    throw new Error(err.error || `Request failed (${res.status})`);
  }
  return res.json();
}

export interface SubmitAuditPayload {
  responses: Record<string, unknown>;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  companyName?: string;
}

export interface SubmitAuditResponse {
  submissionId: string;
  overallScore: number;
  categoryScores: Array<{
    category: string;
    score: number;
    maxScore: number;
    percentage: number;
  }>;
  suggestedTier: 'core' | 'growth' | 'enterprise';
  totalPrice: number;
  depositAmount: number;
  opportunities: Array<{
    title: string;
    description: string;
    impact: 'high' | 'medium' | 'low';
    department: string;
  }>;
}

export interface CreateCheckoutResponse {
  sessionUrl: string;
}

export function submitAudit(data: SubmitAuditPayload): Promise<SubmitAuditResponse> {
  return request<SubmitAuditResponse>('/submit-audit', data);
}

export function createCheckout(submissionId: string, paymentType: 'deposit' | 'delivery'): Promise<CreateCheckoutResponse> {
  return request<CreateCheckoutResponse>('/create-checkout', { submissionId, paymentType });
}

export async function fetchSubmissionStatus(id: string): Promise<{ status: string; tier: string; totalPrice: number; depositAmount: number; deliveryAmount: number }> {
  const res = await fetch(`${BASE}/submit-audit?id=${id}`);
  if (!res.ok) throw new Error('Submission not found');
  return res.json();
}
