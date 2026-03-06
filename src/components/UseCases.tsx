import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useIsTouchDevice } from '../utils/useIsTouchDevice';

const results = [
  {
    category: 'Operations',
    title: 'Automated Reporting',
    desc: 'Data aggregated into executive summaries, delivered automatically every morning.',
    icon: 'analytics',
    color: '#135bec',
    metric: '85%',
    metricLabel: 'time saved',
  },
  {
    category: 'Sales',
    title: 'AI Voice Agents',
    desc: 'Voice AI handling inbound leads, qualification, and appointment scheduling around the clock.',
    icon: 'record_voice_over',
    color: '#06b6d4',
    metric: '3x',
    metricLabel: 'lead conversion',
  },
  {
    category: 'Support',
    title: 'Smart Assistants',
    desc: 'Internal AI that searches your docs and handles routine employee questions instantly.',
    icon: 'support_agent',
    color: '#8b5cf6',
    metric: '60%',
    metricLabel: 'fewer tickets',
  },
  {
    category: 'Finance',
    title: 'Document Processing',
    desc: 'AI classification and processing of invoices, contracts, and legal documents at scale.',
    icon: 'description',
    color: '#10b981',
    metric: '99.7%',
    metricLabel: 'accuracy',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const UseCases: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isTouch = useIsTouchDevice();

  return (
    <section className="py-24 md:py-32 px-6 relative overflow-hidden" id="use-cases" ref={ref}>
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-primary mb-6"
          >
            <span className="material-symbols-outlined text-primary text-sm">cases</span>
            <span className="text-primary text-xs font-bold uppercase tracking-widest">
              What We Automate
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter">
            Real results across
            <br />
            <span className="gradient-text">every department</span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-xl mx-auto mt-6"
          >
            From operations to sales, here&apos;s what AI automation looks like in practice.
          </motion.p>
        </motion.div>

        {/* Results Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {results.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              {...(!isTouch && { whileHover: { y: -4, transition: { duration: 0.3 } } })}
              className="glass-card rounded-2xl p-6 group cursor-default"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: `${item.color}15`,
                      border: `1px solid ${item.color}25`,
                    }}
                  >
                    <span
                      className="material-symbols-outlined text-xl"
                      style={{ color: item.color }}
                    >
                      {item.icon}
                    </span>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {item.category}
                  </span>
                </div>
                <div className="text-right">
                  <span
                    className="text-2xl font-black leading-none"
                    style={{ color: item.color }}
                  >
                    {item.metric}
                  </span>
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">
                    {item.metricLabel}
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-white transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default UseCases;
