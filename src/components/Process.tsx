import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { openVoicebot } from '../utils/voicebot';

const steps = [
  {
    number: '01',
    title: 'Tell Us About Your Business',
    desc: 'Take our 5-minute AI audit quiz or chat with our AI advisor. We learn about your operations, pain points, and goals.',
    icon: 'edit_note',
    color: '#135bec',
  },
  {
    number: '02',
    title: 'Get Your AI Readiness Score',
    desc: 'Receive an instant score showing where AI can make the biggest impact, plus your top automation opportunities ranked by ROI.',
    icon: 'insights',
    color: '#06b6d4',
  },
  {
    number: '03',
    title: 'Receive Your Custom Roadmap',
    desc: 'Our team reviews your results and delivers a detailed AI automation blueprint with ROI projections and recommended next steps.',
    icon: 'rocket_launch',
    color: '#8b5cf6',
  },
];

const Process: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 md:py-32 px-6 relative overflow-hidden" id="process" ref={ref}>
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-primary mb-6"
          >
            <span className="material-symbols-outlined text-primary text-sm">route</span>
            <span className="text-primary text-xs font-bold uppercase tracking-widest">
              How It Works
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter">
            Three steps to your
            <br />
            <span className="gradient-text">AI roadmap</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.2 + index * 0.15,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94] as const,
              }}
              className="relative"
            >
              <div className="glass-card rounded-2xl p-7 h-full relative overflow-hidden">
                {/* Ghost number */}
                <div className="absolute -top-2 -right-2 text-[80px] font-black text-white/[0.03] leading-none select-none">
                  {step.number}
                </div>

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: `linear-gradient(135deg, ${step.color}20, ${step.color}05)`,
                    border: `1px solid ${step.color}30`,
                  }}
                >
                  <span
                    className="material-symbols-outlined text-2xl"
                    style={{ color: step.color }}
                  >
                    {step.icon}
                  </span>
                </div>

                {/* Step label */}
                <span
                  className="text-xs font-black uppercase tracking-wider mb-2 block"
                  style={{ color: step.color }}
                >
                  Step {step.number}
                </span>

                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </div>

              {/* Connecting arrow (desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-3 z-20 items-center">
                  <span className="material-symbols-outlined text-white/10 text-lg">
                    chevron_right
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-14"
        >
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/audit">
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px -10px rgba(19, 91, 236, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-white px-7 py-3.5 rounded-xl text-sm font-bold glow-soft inline-flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">auto_awesome</span>
                Start the Free Audit
              </motion.div>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openVoicebot}
              className="glass text-white px-7 py-3.5 rounded-xl text-sm font-bold hover:bg-white/5 transition-all inline-flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">mic</span>
              Or Talk to AI
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
