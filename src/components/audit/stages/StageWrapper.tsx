import { motion } from 'framer-motion';
import { useAudit } from '../../../context/AuditContext';
import { getStageQuestions, stages } from '../../../data/auditQuestions';
import QuestionRenderer from './QuestionRenderer';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

interface StageWrapperProps {
  stageId: number;
}

export default function StageWrapper({ stageId }: StageWrapperProps) {
  const { state } = useAudit();
  const stageData = stages.find(s => s.id === stageId);
  const stageQuestions = getStageQuestions(stageId, state.responses);

  if (stageQuestions.length === 0) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {stageData && (
        <motion.div
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
          className="mb-6"
        >
          <h2 className="text-xl font-bold text-white">{stageData.title}</h2>
          <p className="text-sm text-slate-400 mt-1">{stageData.description}</p>
        </motion.div>
      )}
      {stageQuestions.map(q => (
        <QuestionRenderer key={q.id} question={q} />
      ))}
    </motion.div>
  );
}
