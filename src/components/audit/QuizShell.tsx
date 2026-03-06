import { useCallback, useState } from 'react';
import { useAudit } from '../../context/AuditContext';
import { getStageQuestions } from '../../data/auditQuestions';
import { clearAuditProgress } from '../../utils/auditStorage';
import { submitAudit, createCheckout } from '../../utils/api';
import ProgressBar from './ProgressBar';
import ScoreGauge from './ScoreGauge';
import StageRenderer from './StageRenderer';
import QuizNavButtons from './QuizNavButtons';
import TeaserResults from './TeaserResults';

export default function QuizShell() {
  const { state, dispatch } = useAudit();
  const [error, setError] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const currentQuestions = getStageQuestions(state.currentStage, state.responses);

  // Check if user can proceed from current stage
  const canAdvance = currentQuestions.every(q => {
    if (q.type === 'text') {
      // Only name and email are required on contact stage
      if (q.id === 'contact-name' || q.id === 'contact-email') {
        return !!state.responses[q.id];
      }
      return true; // phone and company are optional
    }
    const val = state.responses[q.id];
    if (val === undefined || val === null) return false;
    if (Array.isArray(val) && val.length === 0) return false;
    return true;
  });

  const handleSubmit = useCallback(async () => {
    setError(null);
    dispatch({ type: 'SET_SUBMITTING', value: true });

    try {
      const result = await submitAudit({
        responses: state.responses,
        contactName: state.responses['contact-name'] as string,
        contactEmail: state.responses['contact-email'] as string,
        contactPhone: state.responses['contact-phone'] as string | undefined,
        companyName: state.responses['company-name'] as string | undefined,
      });

      dispatch({
        type: 'SET_SUBMITTED',
        submissionId: result.submissionId,
        result: {
          submissionId: result.submissionId,
          overallScore: result.overallScore,
          categoryScores: result.categoryScores,
          suggestedTier: result.suggestedTier,
          totalPrice: result.totalPrice,
          depositAmount: result.depositAmount,
          opportunities: result.opportunities,
        },
      });

      clearAuditProgress();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      dispatch({ type: 'SET_SUBMITTING', value: false });
    }
  }, [state.responses, dispatch]);

  const handleCheckout = useCallback(async () => {
    if (!state.submissionId) return;
    setIsRedirecting(true);
    setError(null);
    try {
      const { sessionUrl } = await createCheckout(state.submissionId, 'deposit');
      window.location.href = sessionUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not start checkout. Please try again.');
      setIsRedirecting(false);
    }
  }, [state.submissionId]);

  // Show results if submitted
  if (state.isSubmitted && state.submissionResult) {
    return (
      <TeaserResults
        result={state.submissionResult}
        onCheckout={handleCheckout}
        isRedirecting={isRedirecting}
      />
    );
  }

  // Submitting overlay
  if (state.isSubmitting) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
        </div>
        <p className="text-white font-medium">Calculating your AI readiness...</p>
        <p className="text-sm text-slate-400">This takes just a moment</p>
      </div>
    );
  }

  return (
    <div>
      {/* Top section: progress + gauge */}
      <div className="flex flex-col lg:flex-row lg:items-start gap-6 mb-8">
        <div className="flex-1">
          <ProgressBar />
        </div>
        <div className="hidden lg:flex flex-shrink-0">
          <ScoreGauge score={state.overallScore} size={120} />
        </div>
      </div>

      {/* Mobile gauge */}
      <div className="flex lg:hidden justify-center mb-6">
        <ScoreGauge score={state.overallScore} size={100} />
      </div>

      {/* Questions */}
      <div className="glass-card rounded-2xl p-6 sm:p-8">
        <StageRenderer />
        {error && (
          <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}
        <QuizNavButtons onSubmit={handleSubmit} canAdvance={canAdvance} />
      </div>
    </div>
  );
}
