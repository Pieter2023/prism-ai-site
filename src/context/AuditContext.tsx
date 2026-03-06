import { createContext, useContext, useReducer, useCallback, useEffect, type ReactNode } from 'react';
import { questions, getActiveStages } from '../data/auditQuestions';
import { loadAuditProgress, saveAuditProgress } from '../utils/auditStorage';

// ── Types ──

export interface CategoryScore {
  category: string;
  score: number;
  maxScore: number;
  percentage: number;
}

export interface AuditState {
  currentStage: number;
  responses: Record<string, unknown>;
  overallScore: number;
  categoryScores: CategoryScore[];
  activeStages: number[];
  suggestedTier: 'core' | 'growth' | 'enterprise';
  isSubmitting: boolean;
  isSubmitted: boolean;
  submissionId: string | null;
  submissionResult: SubmissionResult | null;
  hasRestoredProgress: boolean;
}

export interface SubmissionResult {
  submissionId: string;
  overallScore: number;
  categoryScores: CategoryScore[];
  suggestedTier: 'core' | 'growth' | 'enterprise';
  totalPrice: number;
  depositAmount: number;
  opportunities: Opportunity[];
}

export interface Opportunity {
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  department: string;
}

type AuditAction =
  | { type: 'SET_ANSWER'; questionId: string; value: unknown }
  | { type: 'SET_STAGE'; stage: number }
  | { type: 'NEXT_STAGE' }
  | { type: 'PREV_STAGE' }
  | { type: 'SET_SUBMITTING'; value: boolean }
  | { type: 'SET_SUBMITTED'; submissionId: string; result: SubmissionResult }
  | { type: 'RESTORE_PROGRESS'; state: Partial<AuditState> }
  | { type: 'RESET' };

// ── Scoring ──

function calculateScores(responses: Record<string, unknown>): { overall: number; categories: CategoryScore[] } {
  const categoryMap = new Map<string, { score: number; maxScore: number }>();

  for (const q of questions) {
    if (q.maxScore === 0) continue; // skip contact fields
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

  const categories: CategoryScore[] = [];
  let totalScore = 0;
  let totalMax = 0;

  for (const [category, data] of categoryMap) {
    const percentage = data.maxScore > 0 ? Math.round((data.score / data.maxScore) * 100) : 0;
    categories.push({ category, score: data.score, maxScore: data.maxScore, percentage });
    totalScore += data.score;
    totalMax += data.maxScore;
  }

  const overall = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0;
  return { overall, categories };
}

function suggestTier(responses: Record<string, unknown>, overallScore: number): 'core' | 'growth' | 'enterprise' {
  const companySize = responses['company-size'] as string | undefined;
  const departments = responses['departments'] as string[] | undefined;
  const deptCount = departments?.length || 0;

  const largeSizes = ['201-500', '500+'];
  const midSizes = ['51-200'];

  if (largeSizes.includes(companySize || '') || deptCount >= 5 || overallScore >= 75) {
    return 'enterprise';
  }
  if (midSizes.includes(companySize || '') || deptCount >= 3 || overallScore >= 45) {
    return 'growth';
  }
  return 'core';
}

// ── Reducer ──

const initialState: AuditState = {
  currentStage: 1,
  responses: {},
  overallScore: 0,
  categoryScores: [],
  activeStages: [1, 2, 3, 4, 6, 7],
  suggestedTier: 'core',
  isSubmitting: false,
  isSubmitted: false,
  submissionId: null,
  submissionResult: null,
  hasRestoredProgress: false,
};

function auditReducer(state: AuditState, action: AuditAction): AuditState {
  switch (action.type) {
    case 'SET_ANSWER': {
      const responses = { ...state.responses, [action.questionId]: action.value };
      const { overall, categories } = calculateScores(responses);
      const activeStages = getActiveStages(responses);
      const tier = suggestTier(responses, overall);
      return {
        ...state,
        responses,
        overallScore: overall,
        categoryScores: categories,
        activeStages,
        suggestedTier: tier,
      };
    }
    case 'SET_STAGE':
      return { ...state, currentStage: action.stage };
    case 'NEXT_STAGE': {
      const idx = state.activeStages.indexOf(state.currentStage);
      const next = state.activeStages[idx + 1];
      return next !== undefined ? { ...state, currentStage: next } : state;
    }
    case 'PREV_STAGE': {
      const idx = state.activeStages.indexOf(state.currentStage);
      const prev = state.activeStages[idx - 1];
      return prev !== undefined ? { ...state, currentStage: prev } : state;
    }
    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.value };
    case 'SET_SUBMITTED':
      return {
        ...state,
        isSubmitting: false,
        isSubmitted: true,
        submissionId: action.submissionId,
        submissionResult: action.result,
      };
    case 'RESTORE_PROGRESS':
      return { ...state, ...action.state, hasRestoredProgress: true };
    case 'RESET':
      return { ...initialState };
    default:
      return state;
  }
}

// ── Context ──

interface AuditContextType {
  state: AuditState;
  dispatch: React.Dispatch<AuditAction>;
  setAnswer: (questionId: string, value: unknown) => void;
  nextStage: () => void;
  prevStage: () => void;
  isFirstStage: boolean;
  isLastStage: boolean;
  stageIndex: number;
  totalStages: number;
}

const AuditContext = createContext<AuditContextType | null>(null);

export function AuditProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(auditReducer, initialState);

  // Restore saved progress on mount
  useEffect(() => {
    const saved = loadAuditProgress();
    if (saved) {
      dispatch({ type: 'RESTORE_PROGRESS', state: saved });
    }
  }, []);

  // Save progress on changes (debounced)
  useEffect(() => {
    if (Object.keys(state.responses).length === 0) return;
    const timer = setTimeout(() => {
      saveAuditProgress({
        currentStage: state.currentStage,
        responses: state.responses,
        overallScore: state.overallScore,
        categoryScores: state.categoryScores,
        activeStages: state.activeStages,
        suggestedTier: state.suggestedTier,
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [state.responses, state.currentStage, state.overallScore, state.categoryScores, state.activeStages, state.suggestedTier]);

  const setAnswer = useCallback((questionId: string, value: unknown) => {
    dispatch({ type: 'SET_ANSWER', questionId, value });
  }, []);

  const nextStage = useCallback(() => dispatch({ type: 'NEXT_STAGE' }), []);
  const prevStage = useCallback(() => dispatch({ type: 'PREV_STAGE' }), []);

  const stageIndex = state.activeStages.indexOf(state.currentStage);
  const isFirstStage = stageIndex === 0;
  const isLastStage = stageIndex === state.activeStages.length - 1;

  return (
    <AuditContext.Provider value={{
      state,
      dispatch,
      setAnswer,
      nextStage,
      prevStage,
      isFirstStage,
      isLastStage,
      stageIndex,
      totalStages: state.activeStages.length,
    }}>
      {children}
    </AuditContext.Provider>
  );
}

export function useAudit() {
  const ctx = useContext(AuditContext);
  if (!ctx) throw new Error('useAudit must be used inside AuditProvider');
  return ctx;
}
