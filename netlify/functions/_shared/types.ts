export interface AuditSubmission {
  id: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  company_name: string | null;
  responses: Record<string, unknown>;
  overall_score: number | null;
  category_scores: CategoryScore[];
  opportunities: Opportunity[];
  suggested_tier: 'core' | 'growth' | 'enterprise' | null;
  total_price: number | null;
  deposit_amount: number | null;
  delivery_amount: number | null;
  deposit_checkout_id: string | null;
  deposit_payment_intent: string | null;
  delivery_checkout_id: string | null;
  delivery_payment_intent: string | null;
  status: 'submitted' | 'deposit_paid' | 'in_progress' | 'results_ready' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface CategoryScore {
  category: string;
  score: number;
  maxScore: number;
  percentage: number;
}

export interface Opportunity {
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  department: string;
}

export const TIER_PRICES: Record<string, { total: number; deposit: number; delivery: number }> = {
  core:       { total: 2300,  deposit: 1150,  delivery: 1150 },
  growth:     { total: 4500,  deposit: 2250,  delivery: 2250 },
  enterprise: { total: 7500,  deposit: 3750,  delivery: 3750 },
};
