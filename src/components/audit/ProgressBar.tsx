import { motion } from 'framer-motion';
import { useAudit } from '../../context/AuditContext';
import { stages } from '../../data/auditQuestions';

export default function ProgressBar() {
  const { state, stageIndex, totalStages } = useAudit();
  const progress = ((stageIndex + 1) / totalStages) * 100;
  const currentStageData = stages.find(s => s.id === state.currentStage);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {currentStageData && (
            <span className="material-symbols-outlined text-primary text-xl">
              {currentStageData.icon}
            </span>
          )}
          <span className="text-sm font-medium text-slate-300">
            {currentStageData?.title}
          </span>
        </div>
        <span className="text-xs text-slate-500">
          {stageIndex + 1} of {totalStages}
        </span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  );
}
