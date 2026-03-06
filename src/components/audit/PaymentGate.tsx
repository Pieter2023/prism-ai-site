import { motion } from 'framer-motion';
import { useSearchParams, Link } from 'react-router-dom';

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

export default function PaymentGate() {
  const [searchParams] = useSearchParams();
  const payment = searchParams.get('payment');
  const paymentType = searchParams.get('type');

  if (payment === 'success' && paymentType === 'deposit') {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-lg mx-auto text-center py-12"
      >
        <motion.div variants={itemVariants}>
          <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-green-400 text-4xl">check_circle</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Thank You!</h1>
          <p className="text-slate-300 mb-6">
            Your deposit has been received. Our AI consultants will begin preparing your personalized blueprint within 2 business days.
          </p>
          <div className="glass-card rounded-2xl p-6 text-left mb-6">
            <h3 className="text-sm font-semibold text-white mb-3">What happens next:</h3>
            <ol className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">1.</span>
                We analyze your responses and business data
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">2.</span>
                We build your custom AI automation roadmap
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">3.</span>
                You receive a payment link for the remaining balance
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">4.</span>
                Full report + 1-on-1 strategy session delivered
              </li>
            </ol>
          </div>
          <Link to="/" className="text-primary hover:text-primary-light transition-colors text-sm">
            &larr; Back to home
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  if (payment === 'success' && paymentType === 'delivery') {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-lg mx-auto text-center py-12"
      >
        <motion.div variants={itemVariants}>
          <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-green-400 text-4xl">verified</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">All Set!</h1>
          <p className="text-slate-300 mb-6">
            Your final payment is confirmed. Your full AI Blueprint report will be delivered shortly, along with details for scheduling your strategy session.
          </p>
          <Link to="/" className="text-primary hover:text-primary-light transition-colors text-sm">
            &larr; Back to home
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  if (payment === 'cancelled') {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-lg mx-auto text-center py-12"
      >
        <motion.div variants={itemVariants}>
          <div className="w-20 h-20 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-yellow-400 text-4xl">info</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">No worries!</h1>
          <p className="text-slate-300 mb-6">
            Your payment was cancelled. Your score and results are still saved — you can come back anytime to complete the purchase.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              to="/audit"
              className="btn-primary px-6 py-3 rounded-xl text-white font-medium text-sm min-h-[44px]"
            >
              Try Again
            </Link>
            <Link to="/" className="text-primary hover:text-primary-light transition-colors text-sm">
              Back to home
            </Link>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-lg mx-auto text-center py-12">
      <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
        <span className="material-symbols-outlined text-slate-400 text-4xl">help_outline</span>
      </div>
      <h1 className="text-2xl font-bold text-white mb-3">Page Not Found</h1>
      <p className="text-slate-400 mb-6">This results link may have expired or is invalid.</p>
      <Link to="/audit" className="btn-primary px-6 py-3 rounded-xl text-white font-medium text-sm inline-block min-h-[44px]">
        Start New Assessment
      </Link>
    </div>
  );
}
