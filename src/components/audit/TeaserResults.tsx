import { motion } from 'framer-motion';
import ScoreGauge from './ScoreGauge';
import type { SubmissionResult } from '../../context/AuditContext';

const tierLabels = {
  core: 'AI Receptionist & Lead Capture',
  growth: 'Workflow Automation & Follow-Up',
  enterprise: 'Custom AI Systems & Integrations',
};

const impactColors = {
  high: 'text-green-400 bg-green-400/10 border-green-400/20',
  medium: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  low: 'text-slate-400 bg-slate-400/10 border-slate-400/20',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

interface TeaserResultsProps {
  result: SubmissionResult;
  onCheckout: () => void;
  isRedirecting: boolean;
}

export default function TeaserResults({ result, onCheckout, isRedirecting }: TeaserResultsProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-2xl mx-auto"
    >
      <motion.div variants={itemVariants} className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Your AI Readiness Score</h1>
        <p className="text-slate-400">Here's a preview of what we found</p>
      </motion.div>

      <motion.div variants={itemVariants} className="flex justify-center mb-8">
        <ScoreGauge score={result.overallScore} size={200} />
      </motion.div>

      {/* Category breakdown */}
      <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Category Scores</h3>
        <div className="space-y-3">
          {result.categoryScores.map(cat => (
            <div key={cat.category}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-300 capitalize">{cat.category.replace('-', ' ')}</span>
                <span className="text-white font-medium">{cat.percentage}%</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${cat.percentage}%` }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Top opportunities */}
      <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          <span className="material-symbols-outlined text-primary align-middle mr-2">auto_awesome</span>
          Top AI Opportunities
        </h3>
        <div className="space-y-3">
          {result.opportunities.slice(0, 3).map((opp, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/2 border border-white/5">
              <span className={`text-xs font-medium px-2 py-1 rounded-full border ${impactColors[opp.impact]}`}>
                {opp.impact}
              </span>
              <div>
                <p className="text-sm font-medium text-white">{opp.title}</p>
                <p className="text-xs text-slate-400 mt-0.5">{opp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div variants={itemVariants} className="glass-primary rounded-2xl p-6 text-center">
        <h3 className="text-lg font-semibold text-white mb-2">
          Unlock Your Full AI Blueprint
        </h3>
        <p className="text-sm text-slate-300 mb-1">
          Recommended tier: <span className="text-primary font-semibold">{tierLabels[result.suggestedTier]}</span>
        </p>
        <p className="text-2xl font-bold gradient-text mb-1">
          ${result.totalPrice.toLocaleString()} CAD
        </p>
        <p className="text-xs text-slate-400 mb-4">
          50/50 split — ${result.depositAmount.toLocaleString()} deposit now, rest on delivery
        </p>
        <p className="text-xs text-slate-500 mb-4 max-w-md mx-auto">
          Your full blueprint includes a detailed automation roadmap, ROI projections, tool recommendations, and a 1-on-1 strategy session with our AI consultants.
        </p>
        <motion.button
          onClick={onCheckout}
          disabled={isRedirecting}
          className="btn-primary px-8 py-3 rounded-xl text-white font-medium min-h-[44px] disabled:opacity-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          {isRedirecting ? (
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
              Redirecting to payment...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Pay ${result.depositAmount.toLocaleString()} Deposit
              <span className="material-symbols-outlined text-lg">lock</span>
            </span>
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
