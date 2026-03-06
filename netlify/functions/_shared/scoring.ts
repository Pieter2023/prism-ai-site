import type { CategoryScore, Opportunity } from './types.js';

// Mirror of question definitions for server-side scoring
interface QuestionDef {
  id: string;
  category: string;
  type: 'single' | 'multi' | 'scale' | 'text';
  maxScore: number;
  options?: Array<{ value: string; score: number }>;
  condition?: (responses: Record<string, unknown>) => boolean;
}

const questions: QuestionDef[] = [
  // Stage 1
  { id: 'industry', category: 'readiness', type: 'single', maxScore: 10, options: [
    { value: 'professional-services', score: 8 }, { value: 'healthcare', score: 7 }, { value: 'real-estate', score: 9 },
    { value: 'retail', score: 8 }, { value: 'construction', score: 6 }, { value: 'finance', score: 9 },
    { value: 'hospitality', score: 7 }, { value: 'manufacturing', score: 7 }, { value: 'technology', score: 10 }, { value: 'other', score: 7 },
  ]},
  { id: 'company-size', category: 'readiness', type: 'single', maxScore: 10, options: [
    { value: '1-10', score: 4 }, { value: '11-50', score: 6 }, { value: '51-200', score: 8 }, { value: '201-500', score: 9 }, { value: '500+', score: 10 },
  ]},
  { id: 'departments', category: 'operations', type: 'multi', maxScore: 15, options: [
    { value: 'sales', score: 3 }, { value: 'marketing', score: 3 }, { value: 'support', score: 3 },
    { value: 'finance', score: 3 }, { value: 'hr', score: 3 }, { value: 'operations', score: 3 },
    { value: 'it', score: 3 }, { value: 'executive', score: 2 },
  ]},
  { id: 'annual-revenue', category: 'readiness', type: 'single', maxScore: 10, options: [
    { value: 'under-500k', score: 3 }, { value: '500k-2m', score: 5 }, { value: '2m-10m', score: 7 },
    { value: '10m-50m', score: 9 }, { value: '50m+', score: 10 },
  ]},
  // Stage 2
  { id: 'current-tools', category: 'technology', type: 'multi', maxScore: 12, options: [
    { value: 'crm', score: 3 }, { value: 'pm', score: 3 }, { value: 'accounting', score: 2 },
    { value: 'email-marketing', score: 2 }, { value: 'spreadsheets', score: 1 }, { value: 'custom', score: 3 }, { value: 'erp', score: 4 },
  ]},
  { id: 'pain-points', category: 'operations', type: 'multi', maxScore: 14, options: [
    { value: 'data-entry', score: 4 }, { value: 'slow-response', score: 3 }, { value: 'inconsistent', score: 3 },
    { value: 'scaling', score: 4 }, { value: 'reports', score: 3 }, { value: 'lead-followup', score: 4 },
  ]},
  { id: 'manual-hours', category: 'operations', type: 'single', maxScore: 10, options: [
    { value: 'under-5', score: 2 }, { value: '5-15', score: 5 }, { value: '15-30', score: 8 },
    { value: '30-50', score: 9 }, { value: '50+', score: 10 },
  ]},
  { id: 'process-documentation', category: 'operations', type: 'single', maxScore: 10, options: [
    { value: 'none', score: 3 }, { value: 'informal', score: 5 }, { value: 'outdated', score: 6 },
    { value: 'documented', score: 9 }, { value: 'full-sops', score: 10 },
  ]},
  // Stage 3
  { id: 'cloud-adoption', category: 'technology', type: 'single', maxScore: 10, options: [
    { value: 'on-premise', score: 2 }, { value: 'hybrid', score: 5 }, { value: 'mostly-cloud', score: 8 }, { value: 'cloud-native', score: 10 },
  ]},
  { id: 'api-integrations', category: 'technology', type: 'single', maxScore: 10, options: [
    { value: 'none', score: 2 }, { value: 'few', score: 4 }, { value: 'several', score: 7 }, { value: 'fully-connected', score: 10 },
  ]},
  { id: 'it-support', category: 'technology', type: 'single', maxScore: 10, options: [
    { value: 'none', score: 3 }, { value: 'outsourced', score: 5 }, { value: 'small-team', score: 7 }, { value: 'dedicated', score: 10 },
  ]},
  { id: 'tech-satisfaction', category: 'technology', type: 'scale', maxScore: 10 },
  // Stage 4
  { id: 'ai-usage', category: 'ai-maturity', type: 'single', maxScore: 10, options: [
    { value: 'never', score: 2 }, { value: 'explored', score: 5 }, { value: 'some-workflows', score: 7 }, { value: 'integrated', score: 10 },
  ]},
  { id: 'ai-tools', category: 'ai-maturity', type: 'multi', maxScore: 10, options: [
    { value: 'llm', score: 2 }, { value: 'writing', score: 2 }, { value: 'analytics', score: 3 },
    { value: 'chatbots', score: 3 }, { value: 'coding', score: 3 }, { value: 'none', score: 0 },
  ]},
  { id: 'ai-comfort', category: 'ai-maturity', type: 'scale', maxScore: 10 },
  { id: 'data-quality', category: 'ai-maturity', type: 'single', maxScore: 10, options: [
    { value: 'chaotic', score: 2 }, { value: 'messy', score: 4 }, { value: 'organized', score: 7 }, { value: 'clean', score: 10 },
  ]},
  // Stage 5 (conditional department deep-dives)
  { id: 'dept-sales-tasks', category: 'operations' as const, type: 'multi' as const, maxScore: 10, options: [
    { value: 'lead-scoring', score: 3 }, { value: 'followup', score: 3 }, { value: 'crm-entry', score: 3 }, { value: 'proposals', score: 3 }, { value: 'reporting', score: 2 },
  ], condition: (r: Record<string, unknown>) => Array.isArray(r['departments']) && (r['departments'] as string[]).includes('sales') },
  { id: 'dept-marketing-tasks', category: 'operations' as const, type: 'multi' as const, maxScore: 10, options: [
    { value: 'content', score: 3 }, { value: 'social', score: 3 }, { value: 'campaigns', score: 3 }, { value: 'analytics', score: 2 }, { value: 'seo', score: 2 },
  ], condition: (r: Record<string, unknown>) => Array.isArray(r['departments']) && (r['departments'] as string[]).includes('marketing') },
  { id: 'dept-support-tasks', category: 'operations' as const, type: 'multi' as const, maxScore: 10, options: [
    { value: 'repetitive', score: 4 }, { value: 'routing', score: 3 }, { value: 'after-hours', score: 3 }, { value: 'followups', score: 3 }, { value: 'kb', score: 2 },
  ], condition: (r: Record<string, unknown>) => Array.isArray(r['departments']) && (r['departments'] as string[]).includes('support') },
  { id: 'dept-finance-tasks', category: 'operations' as const, type: 'multi' as const, maxScore: 10, options: [
    { value: 'invoicing', score: 3 }, { value: 'expenses', score: 3 }, { value: 'reporting', score: 3 }, { value: 'payroll', score: 2 }, { value: 'forecasting', score: 3 },
  ], condition: (r: Record<string, unknown>) => Array.isArray(r['departments']) && (r['departments'] as string[]).includes('finance') },
  { id: 'dept-hr-tasks', category: 'operations' as const, type: 'multi' as const, maxScore: 10, options: [
    { value: 'screening', score: 3 }, { value: 'scheduling', score: 3 }, { value: 'onboarding', score: 3 }, { value: 'inquiries', score: 2 }, { value: 'reviews', score: 2 },
  ], condition: (r: Record<string, unknown>) => Array.isArray(r['departments']) && (r['departments'] as string[]).includes('hr') },
  { id: 'dept-operations-tasks', category: 'operations' as const, type: 'multi' as const, maxScore: 10, options: [
    { value: 'inventory', score: 3 }, { value: 'orders', score: 3 }, { value: 'scheduling', score: 3 }, { value: 'vendors', score: 2 }, { value: 'qc', score: 2 },
  ], condition: (r: Record<string, unknown>) => Array.isArray(r['departments']) && (r['departments'] as string[]).includes('operations') },
  // Stage 6
  { id: 'top-priorities', category: 'strategy', type: 'multi', maxScore: 12, options: [
    { value: 'reduce-costs', score: 3 }, { value: 'customer-experience', score: 3 }, { value: 'scale', score: 3 },
    { value: 'decisions', score: 3 }, { value: 'competitive', score: 3 }, { value: 'free-team', score: 3 },
  ]},
  { id: 'timeline', category: 'strategy', type: 'single', maxScore: 10, options: [
    { value: 'asap', score: 10 }, { value: '1-3m', score: 8 }, { value: '3-6m', score: 6 },
    { value: '6-12m', score: 4 }, { value: 'exploring', score: 2 },
  ]},
  { id: 'budget-range', category: 'strategy', type: 'single', maxScore: 10, options: [
    { value: 'under-5k', score: 3 }, { value: '5k-15k', score: 5 }, { value: '15k-50k', score: 7 },
    { value: '50k-150k', score: 9 }, { value: '150k+', score: 10 },
  ]},
  { id: 'roi-expectation', category: 'strategy', type: 'single', maxScore: 10, options: [
    { value: '2x-12m', score: 6 }, { value: '3x-12m', score: 8 }, { value: '5x-24m', score: 9 },
    { value: 'efficiency', score: 5 }, { value: 'any', score: 4 },
  ]},
];

export function calculateScoresServer(responses: Record<string, unknown>): {
  overallScore: number;
  categoryScores: CategoryScore[];
} {
  const categoryMap = new Map<string, { score: number; maxScore: number }>();

  for (const q of questions) {
    if (q.maxScore === 0) continue;
    if (q.condition && !q.condition(responses)) continue;

    const answer = responses[q.id];
    if (answer === undefined || answer === null) continue;

    const existing = categoryMap.get(q.category) || { score: 0, maxScore: 0 };
    existing.maxScore += q.maxScore;

    if (q.type === 'single' && q.options) {
      const opt = q.options.find(o => o.value === answer);
      if (opt) existing.score += opt.score;
    } else if (q.type === 'multi' && q.options && Array.isArray(answer)) {
      let multiScore = 0;
      for (const val of answer) {
        const opt = q.options.find(o => o.value === val);
        if (opt) multiScore += opt.score;
      }
      existing.score += Math.min(multiScore, q.maxScore);
    } else if (q.type === 'scale' && typeof answer === 'number') {
      existing.score += Math.min(answer, q.maxScore);
    }

    categoryMap.set(q.category, existing);
  }

  const categoryScores: CategoryScore[] = [];
  let totalScore = 0;
  let totalMax = 0;

  for (const [category, data] of categoryMap) {
    const percentage = data.maxScore > 0 ? Math.round((data.score / data.maxScore) * 100) : 0;
    categoryScores.push({ category, score: data.score, maxScore: data.maxScore, percentage });
    totalScore += data.score;
    totalMax += data.maxScore;
  }

  const overallScore = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0;
  return { overallScore, categoryScores };
}

export function suggestTierServer(responses: Record<string, unknown>, overallScore: number): 'core' | 'growth' | 'enterprise' {
  const companySize = responses['company-size'] as string | undefined;
  const departments = responses['departments'] as string[] | undefined;
  const deptCount = departments?.length || 0;

  if (['201-500', '500+'].includes(companySize || '') || deptCount >= 5 || overallScore >= 75) {
    return 'enterprise';
  }
  if (['51-200'].includes(companySize || '') || deptCount >= 3 || overallScore >= 45) {
    return 'growth';
  }
  return 'core';
}

export function identifyOpportunities(responses: Record<string, unknown>): Opportunity[] {
  const opps: Opportunity[] = [];

  // Check pain points for high-impact opportunities
  const painPoints = (responses['pain-points'] as string[]) || [];
  const departments = (responses['departments'] as string[]) || [];
  const manualHours = responses['manual-hours'] as string;
  const aiUsage = responses['ai-usage'] as string;

  if (painPoints.includes('data-entry') || ['30-50', '50+'].includes(manualHours)) {
    opps.push({
      title: 'Automated Data Entry & Processing',
      description: 'AI-powered document processing and data extraction could eliminate 60-80% of manual data entry across your operations.',
      impact: 'high',
      department: 'operations',
    });
  }

  if (painPoints.includes('slow-response') || departments.includes('support')) {
    opps.push({
      title: 'AI-Powered Customer Support',
      description: 'An AI voice agent and chatbot system could handle 70% of routine inquiries 24/7, reducing response times from hours to seconds.',
      impact: 'high',
      department: 'support',
    });
  }

  if (painPoints.includes('lead-followup') || departments.includes('sales')) {
    opps.push({
      title: 'Intelligent Lead Nurturing',
      description: 'Automated lead scoring, follow-up sequences, and CRM updates could increase conversion rates by 25-40%.',
      impact: 'high',
      department: 'sales',
    });
  }

  if (departments.includes('marketing')) {
    opps.push({
      title: 'AI Content & Campaign Automation',
      description: 'AI-generated content, social media scheduling, and personalized email campaigns could 3x your marketing output.',
      impact: 'medium',
      department: 'marketing',
    });
  }

  if (painPoints.includes('reports') || departments.includes('finance')) {
    opps.push({
      title: 'Automated Reporting & Analytics',
      description: 'Real-time AI dashboards and automated report generation could save 10+ hours per week on manual reporting.',
      impact: 'medium',
      department: 'finance',
    });
  }

  if (painPoints.includes('scaling')) {
    opps.push({
      title: 'Scalable Process Automation',
      description: 'End-to-end workflow automation could enable 2-3x growth without proportionally increasing headcount.',
      impact: 'high',
      department: 'operations',
    });
  }

  if (aiUsage === 'never' || aiUsage === 'explored') {
    opps.push({
      title: 'AI Quick Wins Program',
      description: 'Low-risk, high-reward AI tools that deliver immediate value — typically ROI within 30 days.',
      impact: 'medium',
      department: 'executive',
    });
  }

  if (departments.includes('hr')) {
    opps.push({
      title: 'AI-Assisted Recruitment',
      description: 'Automated resume screening, interview scheduling, and candidate communication could cut hiring time by 50%.',
      impact: 'medium',
      department: 'hr',
    });
  }

  // Return top opportunities sorted by impact
  const impactOrder = { high: 0, medium: 1, low: 2 };
  return opps.sort((a, b) => impactOrder[a.impact] - impactOrder[b.impact]).slice(0, 5);
}
