import { useRef, type FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAudit } from '../../context/AuditContext';
import BusinessProfile from './stages/BusinessProfile';
import CurrentOperations from './stages/CurrentOperations';
import TechnologyReadiness from './stages/TechnologyReadiness';
import AIMaturity from './stages/AIMaturity';
import DepartmentDeepDive from './stages/DepartmentDeepDive';
import PriorityGoals from './stages/PriorityGoals';
import ContactCapture from './stages/ContactCapture';

const stageComponents: Record<number, FC> = {
  1: BusinessProfile,
  2: CurrentOperations,
  3: TechnologyReadiness,
  4: AIMaturity,
  5: DepartmentDeepDive,
  6: PriorityGoals,
  7: ContactCapture,
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

export default function StageRenderer() {
  const { state } = useAudit();
  const prevStageRef = useRef(state.currentStage);
  const direction = state.currentStage > prevStageRef.current ? 1 : -1;
  prevStageRef.current = state.currentStage;

  const Component = stageComponents[state.currentStage];
  if (!Component) return null;

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={state.currentStage}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          <Component />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
