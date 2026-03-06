export type QuestionType = 'single' | 'multi' | 'scale' | 'text';
export type ScoreCategory = 'technology' | 'operations' | 'ai-maturity' | 'strategy' | 'readiness';

export interface QuestionOption {
  label: string;
  value: string;
  score: number;
}

export interface Question {
  id: string;
  stage: number;
  category: ScoreCategory;
  text: string;
  type: QuestionType;
  options?: QuestionOption[];
  min?: number;
  max?: number;
  scaleLabels?: [string, string];
  maxScore: number;
  placeholder?: string;
  condition?: (responses: Record<string, unknown>) => boolean;
}

export interface Stage {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export const stages: Stage[] = [
  { id: 1, title: 'Business Profile', description: 'Tell us about your company', icon: 'corporate_fare' },
  { id: 2, title: 'Current Operations', description: 'How your business runs today', icon: 'settings' },
  { id: 3, title: 'Technology Readiness', description: 'Your tech infrastructure', icon: 'cloud' },
  { id: 4, title: 'AI Maturity', description: 'Your AI experience so far', icon: 'smart_toy' },
  { id: 5, title: 'Department Deep-Dive', description: 'Department-specific assessment', icon: 'account_tree' },
  { id: 6, title: 'Priority & Goals', description: 'What you want to achieve', icon: 'flag' },
  { id: 7, title: 'Contact Details', description: 'How we\'ll deliver your results', icon: 'person' },
];

export const questions: Question[] = [
  // ── Stage 1: Business Profile ──
  {
    id: 'industry',
    stage: 1,
    category: 'readiness',
    text: 'What industry is your business in?',
    type: 'single',
    options: [
      { label: 'Professional Services', value: 'professional-services', score: 8 },
      { label: 'Healthcare', value: 'healthcare', score: 7 },
      { label: 'Real Estate', value: 'real-estate', score: 9 },
      { label: 'Retail / E-commerce', value: 'retail', score: 8 },
      { label: 'Construction / Trades', value: 'construction', score: 6 },
      { label: 'Finance / Insurance', value: 'finance', score: 9 },
      { label: 'Hospitality / Food', value: 'hospitality', score: 7 },
      { label: 'Manufacturing', value: 'manufacturing', score: 7 },
      { label: 'Technology / SaaS', value: 'technology', score: 10 },
      { label: 'Other', value: 'other', score: 7 },
    ],
    maxScore: 10,
  },
  {
    id: 'company-size',
    stage: 1,
    category: 'readiness',
    text: 'How many employees does your company have?',
    type: 'single',
    options: [
      { label: '1–10 (Startup/Small)', value: '1-10', score: 4 },
      { label: '11–50 (Growing)', value: '11-50', score: 6 },
      { label: '51–200 (Mid-size)', value: '51-200', score: 8 },
      { label: '201–500 (Large)', value: '201-500', score: 9 },
      { label: '500+ (Enterprise)', value: '500+', score: 10 },
    ],
    maxScore: 10,
  },
  {
    id: 'departments',
    stage: 1,
    category: 'operations',
    text: 'Which departments could benefit from AI automation?',
    type: 'multi',
    options: [
      { label: 'Sales & CRM', value: 'sales', score: 3 },
      { label: 'Marketing & Content', value: 'marketing', score: 3 },
      { label: 'Customer Support', value: 'support', score: 3 },
      { label: 'Finance & Accounting', value: 'finance', score: 3 },
      { label: 'HR & Recruitment', value: 'hr', score: 3 },
      { label: 'Operations & Logistics', value: 'operations', score: 3 },
      { label: 'IT & Development', value: 'it', score: 3 },
      { label: 'Executive / Strategy', value: 'executive', score: 2 },
    ],
    maxScore: 15,
  },
  {
    id: 'annual-revenue',
    stage: 1,
    category: 'readiness',
    text: 'What is your approximate annual revenue (CAD)?',
    type: 'single',
    options: [
      { label: 'Under $500K', value: 'under-500k', score: 3 },
      { label: '$500K – $2M', value: '500k-2m', score: 5 },
      { label: '$2M – $10M', value: '2m-10m', score: 7 },
      { label: '$10M – $50M', value: '10m-50m', score: 9 },
      { label: '$50M+', value: '50m+', score: 10 },
    ],
    maxScore: 10,
  },

  // ── Stage 2: Current Operations ──
  {
    id: 'current-tools',
    stage: 2,
    category: 'technology',
    text: 'Which tools does your team currently rely on?',
    type: 'multi',
    options: [
      { label: 'CRM (Salesforce, HubSpot, etc.)', value: 'crm', score: 3 },
      { label: 'Project Management (Asana, Monday, etc.)', value: 'pm', score: 3 },
      { label: 'Accounting (QuickBooks, Xero, etc.)', value: 'accounting', score: 2 },
      { label: 'Email Marketing (Mailchimp, etc.)', value: 'email-marketing', score: 2 },
      { label: 'Spreadsheets (Excel, Google Sheets)', value: 'spreadsheets', score: 1 },
      { label: 'Custom / Industry Software', value: 'custom', score: 3 },
      { label: 'ERP System', value: 'erp', score: 4 },
    ],
    maxScore: 12,
  },
  {
    id: 'pain-points',
    stage: 2,
    category: 'operations',
    text: 'What are your biggest operational pain points?',
    type: 'multi',
    options: [
      { label: 'Too much manual data entry', value: 'data-entry', score: 4 },
      { label: 'Slow response times to customers', value: 'slow-response', score: 3 },
      { label: 'Inconsistent processes across teams', value: 'inconsistent', score: 3 },
      { label: 'Difficulty scaling without hiring', value: 'scaling', score: 4 },
      { label: 'Report generation takes too long', value: 'reports', score: 3 },
      { label: 'Lead follow-up falls through cracks', value: 'lead-followup', score: 4 },
    ],
    maxScore: 14,
  },
  {
    id: 'manual-hours',
    stage: 2,
    category: 'operations',
    text: 'How many hours per week does your team spend on repetitive manual tasks?',
    type: 'single',
    options: [
      { label: 'Under 5 hours', value: 'under-5', score: 2 },
      { label: '5–15 hours', value: '5-15', score: 5 },
      { label: '15–30 hours', value: '15-30', score: 8 },
      { label: '30–50 hours', value: '30-50', score: 9 },
      { label: '50+ hours', value: '50+', score: 10 },
    ],
    maxScore: 10,
  },
  {
    id: 'process-documentation',
    stage: 2,
    category: 'operations',
    text: 'How well-documented are your business processes?',
    type: 'single',
    options: [
      { label: 'Not documented at all', value: 'none', score: 3 },
      { label: 'Some informal documentation', value: 'informal', score: 5 },
      { label: 'Documented but outdated', value: 'outdated', score: 6 },
      { label: 'Well-documented and current', value: 'documented', score: 9 },
      { label: 'Fully documented with SOPs', value: 'full-sops', score: 10 },
    ],
    maxScore: 10,
  },

  // ── Stage 3: Technology Readiness ──
  {
    id: 'cloud-adoption',
    stage: 3,
    category: 'technology',
    text: 'How would you describe your cloud adoption?',
    type: 'single',
    options: [
      { label: 'Mostly on-premise / local', value: 'on-premise', score: 2 },
      { label: 'Some cloud, some local', value: 'hybrid', score: 5 },
      { label: 'Mostly cloud-based', value: 'mostly-cloud', score: 8 },
      { label: 'Fully cloud-native', value: 'cloud-native', score: 10 },
    ],
    maxScore: 10,
  },
  {
    id: 'api-integrations',
    stage: 3,
    category: 'technology',
    text: 'Do your current tools integrate with each other (via APIs, Zapier, etc.)?',
    type: 'single',
    options: [
      { label: 'No integrations — everything is siloed', value: 'none', score: 2 },
      { label: 'A few manual connections', value: 'few', score: 4 },
      { label: 'Several automated integrations', value: 'several', score: 7 },
      { label: 'Fully connected tech stack', value: 'fully-connected', score: 10 },
    ],
    maxScore: 10,
  },
  {
    id: 'it-support',
    stage: 3,
    category: 'technology',
    text: 'Do you have dedicated IT support or a technical team?',
    type: 'single',
    options: [
      { label: 'No — the owner handles everything', value: 'none', score: 3 },
      { label: 'Outsourced IT support', value: 'outsourced', score: 5 },
      { label: 'Small internal IT team', value: 'small-team', score: 7 },
      { label: 'Dedicated technical department', value: 'dedicated', score: 10 },
    ],
    maxScore: 10,
  },
  {
    id: 'tech-satisfaction',
    stage: 3,
    category: 'technology',
    text: 'How satisfied are you with your current technology stack?',
    type: 'scale',
    min: 1,
    max: 10,
    scaleLabels: ['Very Frustrated', 'Extremely Satisfied'],
    maxScore: 10,
  },

  // ── Stage 4: AI Maturity ──
  {
    id: 'ai-usage',
    stage: 4,
    category: 'ai-maturity',
    text: 'Has your business used any AI tools?',
    type: 'single',
    options: [
      { label: 'Never — AI is completely new to us', value: 'never', score: 2 },
      { label: 'Explored informally (ChatGPT, etc.)', value: 'explored', score: 5 },
      { label: 'Using AI in a few workflows', value: 'some-workflows', score: 7 },
      { label: 'AI is integrated into daily operations', value: 'integrated', score: 10 },
    ],
    maxScore: 10,
  },
  {
    id: 'ai-tools',
    stage: 4,
    category: 'ai-maturity',
    text: 'Which AI tools has your team experimented with?',
    type: 'multi',
    options: [
      { label: 'ChatGPT / Claude / Gemini', value: 'llm', score: 2 },
      { label: 'AI writing tools (Jasper, Copy.ai)', value: 'writing', score: 2 },
      { label: 'AI analytics / BI tools', value: 'analytics', score: 3 },
      { label: 'AI chatbots for customer support', value: 'chatbots', score: 3 },
      { label: 'AI coding assistants', value: 'coding', score: 3 },
      { label: 'None of the above', value: 'none', score: 0 },
    ],
    maxScore: 10,
  },
  {
    id: 'ai-comfort',
    stage: 4,
    category: 'ai-maturity',
    text: 'How comfortable is your leadership team with adopting AI?',
    type: 'scale',
    min: 1,
    max: 10,
    scaleLabels: ['Very Hesitant', 'Fully On Board'],
    maxScore: 10,
  },
  {
    id: 'data-quality',
    stage: 4,
    category: 'ai-maturity',
    text: 'How would you rate the quality and organization of your business data?',
    type: 'single',
    options: [
      { label: 'Chaotic — data is everywhere', value: 'chaotic', score: 2 },
      { label: 'Messy but mostly accessible', value: 'messy', score: 4 },
      { label: 'Reasonably organized', value: 'organized', score: 7 },
      { label: 'Clean, centralized, and structured', value: 'clean', score: 10 },
    ],
    maxScore: 10,
  },

  // ── Stage 5: Department Deep-Dive (conditional) ──
  {
    id: 'dept-sales-tasks',
    stage: 5,
    category: 'operations',
    text: 'Sales & CRM: Which tasks consume the most time?',
    type: 'multi',
    options: [
      { label: 'Lead qualification & scoring', value: 'lead-scoring', score: 3 },
      { label: 'Follow-up emails & sequences', value: 'followup', score: 3 },
      { label: 'CRM data entry & updates', value: 'crm-entry', score: 3 },
      { label: 'Proposal & quote generation', value: 'proposals', score: 3 },
      { label: 'Pipeline reporting', value: 'reporting', score: 2 },
    ],
    maxScore: 10,
    condition: (r) => Array.isArray(r['departments']) && (r['departments'] as string[]).includes('sales'),
  },
  {
    id: 'dept-marketing-tasks',
    stage: 5,
    category: 'operations',
    text: 'Marketing & Content: Which tasks consume the most time?',
    type: 'multi',
    options: [
      { label: 'Content creation & copywriting', value: 'content', score: 3 },
      { label: 'Social media management', value: 'social', score: 3 },
      { label: 'Email campaign management', value: 'campaigns', score: 3 },
      { label: 'Analytics & reporting', value: 'analytics', score: 2 },
      { label: 'SEO & keyword research', value: 'seo', score: 2 },
    ],
    maxScore: 10,
    condition: (r) => Array.isArray(r['departments']) && (r['departments'] as string[]).includes('marketing'),
  },
  {
    id: 'dept-support-tasks',
    stage: 5,
    category: 'operations',
    text: 'Customer Support: Which tasks consume the most time?',
    type: 'multi',
    options: [
      { label: 'Answering repetitive questions', value: 'repetitive', score: 4 },
      { label: 'Ticket routing & triage', value: 'routing', score: 3 },
      { label: 'After-hours support coverage', value: 'after-hours', score: 3 },
      { label: 'Customer follow-ups', value: 'followups', score: 3 },
      { label: 'Knowledge base maintenance', value: 'kb', score: 2 },
    ],
    maxScore: 10,
    condition: (r) => Array.isArray(r['departments']) && (r['departments'] as string[]).includes('support'),
  },
  {
    id: 'dept-finance-tasks',
    stage: 5,
    category: 'operations',
    text: 'Finance & Accounting: Which tasks consume the most time?',
    type: 'multi',
    options: [
      { label: 'Invoice processing & AP/AR', value: 'invoicing', score: 3 },
      { label: 'Expense tracking & categorization', value: 'expenses', score: 3 },
      { label: 'Financial reporting', value: 'reporting', score: 3 },
      { label: 'Payroll processing', value: 'payroll', score: 2 },
      { label: 'Budget forecasting', value: 'forecasting', score: 3 },
    ],
    maxScore: 10,
    condition: (r) => Array.isArray(r['departments']) && (r['departments'] as string[]).includes('finance'),
  },
  {
    id: 'dept-hr-tasks',
    stage: 5,
    category: 'operations',
    text: 'HR & Recruitment: Which tasks consume the most time?',
    type: 'multi',
    options: [
      { label: 'Resume screening & shortlisting', value: 'screening', score: 3 },
      { label: 'Interview scheduling', value: 'scheduling', score: 3 },
      { label: 'Onboarding paperwork', value: 'onboarding', score: 3 },
      { label: 'Employee inquiries & policies', value: 'inquiries', score: 2 },
      { label: 'Performance review management', value: 'reviews', score: 2 },
    ],
    maxScore: 10,
    condition: (r) => Array.isArray(r['departments']) && (r['departments'] as string[]).includes('hr'),
  },
  {
    id: 'dept-operations-tasks',
    stage: 5,
    category: 'operations',
    text: 'Operations & Logistics: Which tasks consume the most time?',
    type: 'multi',
    options: [
      { label: 'Inventory management', value: 'inventory', score: 3 },
      { label: 'Order processing & tracking', value: 'orders', score: 3 },
      { label: 'Scheduling & dispatch', value: 'scheduling', score: 3 },
      { label: 'Vendor management', value: 'vendors', score: 2 },
      { label: 'Quality control reporting', value: 'qc', score: 2 },
    ],
    maxScore: 10,
    condition: (r) => Array.isArray(r['departments']) && (r['departments'] as string[]).includes('operations'),
  },

  // ── Stage 6: Priority & Goals ──
  {
    id: 'top-priorities',
    stage: 6,
    category: 'strategy',
    text: 'What are your top priorities for AI automation?',
    type: 'multi',
    options: [
      { label: 'Reduce operational costs', value: 'reduce-costs', score: 3 },
      { label: 'Improve customer experience', value: 'customer-experience', score: 3 },
      { label: 'Scale without proportionally hiring', value: 'scale', score: 3 },
      { label: 'Speed up decision-making', value: 'decisions', score: 3 },
      { label: 'Gain competitive advantage', value: 'competitive', score: 3 },
      { label: 'Free up team for higher-value work', value: 'free-team', score: 3 },
    ],
    maxScore: 12,
  },
  {
    id: 'timeline',
    stage: 6,
    category: 'strategy',
    text: 'What is your ideal timeline for implementing AI solutions?',
    type: 'single',
    options: [
      { label: 'ASAP — within 1 month', value: 'asap', score: 10 },
      { label: '1–3 months', value: '1-3m', score: 8 },
      { label: '3–6 months', value: '3-6m', score: 6 },
      { label: '6–12 months', value: '6-12m', score: 4 },
      { label: 'Just exploring for now', value: 'exploring', score: 2 },
    ],
    maxScore: 10,
  },
  {
    id: 'budget-range',
    stage: 6,
    category: 'strategy',
    text: 'What budget range are you considering for AI implementation (CAD)?',
    type: 'single',
    options: [
      { label: 'Under $5,000', value: 'under-5k', score: 3 },
      { label: '$5,000 – $15,000', value: '5k-15k', score: 5 },
      { label: '$15,000 – $50,000', value: '15k-50k', score: 7 },
      { label: '$50,000 – $150,000', value: '50k-150k', score: 9 },
      { label: '$150,000+', value: '150k+', score: 10 },
    ],
    maxScore: 10,
  },
  {
    id: 'roi-expectation',
    stage: 6,
    category: 'strategy',
    text: 'What ROI would make this investment worthwhile?',
    type: 'single',
    options: [
      { label: '2× return within 12 months', value: '2x-12m', score: 6 },
      { label: '3× return within 12 months', value: '3x-12m', score: 8 },
      { label: '5× return within 24 months', value: '5x-24m', score: 9 },
      { label: 'Hard to quantify — looking for efficiency', value: 'efficiency', score: 5 },
      { label: 'Any measurable improvement', value: 'any', score: 4 },
    ],
    maxScore: 10,
  },

  // ── Stage 7: Contact Details (no scoring) ──
  {
    id: 'contact-name',
    stage: 7,
    category: 'readiness',
    text: 'Your full name',
    type: 'text',
    placeholder: 'John Smith',
    maxScore: 0,
  },
  {
    id: 'contact-email',
    stage: 7,
    category: 'readiness',
    text: 'Your business email',
    type: 'text',
    placeholder: 'john@company.com',
    maxScore: 0,
  },
  {
    id: 'contact-phone',
    stage: 7,
    category: 'readiness',
    text: 'Phone number (optional)',
    type: 'text',
    placeholder: '+1 (555) 000-0000',
    maxScore: 0,
  },
  {
    id: 'company-name',
    stage: 7,
    category: 'readiness',
    text: 'Company name',
    type: 'text',
    placeholder: 'Acme Corp',
    maxScore: 0,
  },
];

// Helper to get questions for a specific stage, applying conditions
export function getStageQuestions(stage: number, responses: Record<string, unknown>): Question[] {
  return questions.filter(q => {
    if (q.stage !== stage) return false;
    if (q.condition && !q.condition(responses)) return false;
    return true;
  });
}

// Check if stage 5 should be shown
export function shouldShowDepartmentDeepDive(responses: Record<string, unknown>): boolean {
  const departments = responses['departments'] as string[] | undefined;
  const companySize = responses['company-size'] as string | undefined;
  const smallSizes = ['1-10'];
  return (
    Array.isArray(departments) &&
    departments.length >= 2 &&
    !!companySize &&
    !smallSizes.includes(companySize)
  );
}

// Get the active stages based on responses
export function getActiveStages(responses: Record<string, unknown>): number[] {
  const base = [1, 2, 3, 4];
  if (shouldShowDepartmentDeepDive(responses)) {
    base.push(5);
  }
  base.push(6, 7);
  return base;
}
