import { motion } from 'framer-motion';
import { useAudit } from '../../context/AuditContext';

interface QuizNavButtonsProps {
  onSubmit: () => void;
  canAdvance: boolean;
}

export default function QuizNavButtons({ onSubmit, canAdvance }: QuizNavButtonsProps) {
  const { prevStage, nextStage, isFirstStage, isLastStage, state } = useAudit();

  return (
    <div className="flex items-center justify-between mt-8 gap-4">
      {!isFirstStage ? (
        <motion.button
          type="button"
          onClick={prevStage}
          className="flex items-center gap-2 px-5 py-3 rounded-xl glass text-slate-300 hover:text-white transition-colors min-h-[44px]"
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Back
        </motion.button>
      ) : (
        <div />
      )}

      {isLastStage ? (
        <motion.button
          type="button"
          onClick={onSubmit}
          disabled={!canAdvance || state.isSubmitting}
          className="flex items-center gap-2 px-6 py-3 rounded-xl btn-primary text-white font-medium disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px]"
          whileHover={canAdvance ? { scale: 1.02 } : undefined}
          whileTap={canAdvance ? { scale: 0.97 } : undefined}
        >
          {state.isSubmitting ? (
            <>
              <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
              Calculating...
            </>
          ) : (
            <>
              Get My AI Score
              <span className="material-symbols-outlined text-lg">auto_awesome</span>
            </>
          )}
        </motion.button>
      ) : (
        <motion.button
          type="button"
          onClick={nextStage}
          disabled={!canAdvance}
          className="flex items-center gap-2 px-6 py-3 rounded-xl btn-primary text-white font-medium disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px]"
          whileHover={canAdvance ? { scale: 1.02 } : undefined}
          whileTap={canAdvance ? { scale: 0.97 } : undefined}
        >
          Next
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </motion.button>
      )}
    </div>
  );
}
