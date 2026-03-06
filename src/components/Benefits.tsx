import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { openVoicebot } from '../utils/voicebot';
import { useIsTouchDevice } from '../utils/useIsTouchDevice';

const benefits = [
  {
    icon: 'schedule',
    title: 'Save Thousands of Hours',
    desc: 'Reclaim the most valuable asset: your team\'s time. Automate repetition and focus on what matters.',
    stat: '10,000+',
    statLabel: 'Hours Saved Monthly',
    gradient: 'from-primary to-blue-600',
  },
  {
    icon: 'verified',
    title: 'Drastically Reduce Errors',
    desc: 'Eliminate the human-error factor in data entry and routine decision making with AI precision.',
    stat: '99.9%',
    statLabel: 'Accuracy Rate',
    gradient: 'from-accent to-cyan-600',
  },
  {
    icon: 'leaderboard',
    title: 'Data-Driven Decisions',
    desc: 'Stop guessing. Use real-time AI modeling to drive your core strategy with confidence.',
    stat: '3x',
    statLabel: 'Faster Insights',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    icon: 'workspace_premium',
    title: 'Premium Bespoke Service',
    desc: 'We don\'t do generic. Every line of code is optimized for your brand and business goals.',
    stat: '100%',
    statLabel: 'Custom Solutions',
    gradient: 'from-emerald-500 to-green-600',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const Benefits: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isTouch = useIsTouchDevice();

  return (
    <section
      className="py-32 px-6 relative overflow-hidden"
      id="benefits"
      ref={ref}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-10"
          >
            {/* Header */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-primary mb-6"
              >
                <span className="material-symbols-outlined text-primary text-sm">lightbulb</span>
                <span className="text-primary text-xs font-bold uppercase tracking-widest">
                  Key Benefits
                </span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter">
                Why Settle for
                <br />
                <span className="gradient-text">Manual?</span>
              </h2>
            </div>

            {/* Benefits List */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="space-y-6"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  {...(!isTouch && { whileHover: { x: 10, transition: { duration: 0.2 } } })}
                  className="group flex items-start gap-5 p-4 rounded-2xl hover:bg-white/[0.02] transition-colors cursor-default"
                >
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${benefit.gradient.includes('primary') ? '#135bec20' : benefit.gradient.includes('accent') ? '#06b6d420' : benefit.gradient.includes('violet') ? '#8b5cf620' : '#10b98120'}, transparent)`,
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    <span
                      className={`material-symbols-outlined text-2xl bg-gradient-to-r ${benefit.gradient} bg-clip-text`}
                      style={{
                        fontVariationSettings: "'FILL' 1",
                        color: benefit.gradient.includes('primary')
                          ? '#135bec'
                          : benefit.gradient.includes('accent')
                          ? '#06b6d4'
                          : benefit.gradient.includes('violet')
                          ? '#8b5cf6'
                          : '#10b981',
                      }}
                    >
                      {benefit.icon}
                    </span>
                  </motion.div>

                  {/* Content */}
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-white text-lg font-bold group-hover:text-white transition-colors">
                        {benefit.title}
                      </h4>
                      <span className="text-xs font-black bg-gradient-to-r ${benefit.gradient} text-white px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        {benefit.stat}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                      {benefit.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px -10px rgba(19, 91, 236, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                onClick={openVoicebot}
                className="btn-primary text-white px-8 py-4 rounded-xl font-bold glow-soft flex items-center gap-2"
              >
                <span className="material-symbols-outlined">mic</span>
                Start Automating
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            {/* Main Visual Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="glass-card rounded-3xl p-2 relative"
            >
              <div className="aspect-square rounded-2xl relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-violet-500/10">
                {/* Grid Background */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
                    backgroundSize: '30px 30px',
                  }}
                />

                {/* Central Animation - static on mobile for performance */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {isTouch ? (
                    <div className="w-64 h-64 rounded-full border border-dashed border-white/10 flex items-center justify-center">
                      <div className="w-48 h-48 rounded-full border border-primary/20 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl shadow-primary/50">
                          <span className="material-symbols-outlined text-4xl text-white">auto_awesome</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                      className="w-64 h-64 rounded-full border border-dashed border-white/10 flex items-center justify-center"
                    >
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        className="w-48 h-48 rounded-full border border-primary/20 flex items-center justify-center"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl shadow-primary/50"
                        >
                          <span className="material-symbols-outlined text-4xl text-white">auto_awesome</span>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  )}
                </div>

                {/* Floating Stats Cards - static on mobile for performance */}
                <div className="absolute top-8 left-8 glass p-4 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-lg">trending_up</span>
                    </div>
                    <div>
                      <p className="text-white text-sm font-bold">+127%</p>
                      <p className="text-slate-500 text-xs">Efficiency</p>
                    </div>
                  </div>
                </div>

                <div className="absolute top-8 right-8 glass p-4 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-lg">schedule</span>
                    </div>
                    <div>
                      <p className="text-white text-sm font-bold">-85%</p>
                      <p className="text-slate-500 text-xs">Processing Time</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 glass p-4 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-lg">neurology</span>
                    </div>
                    <div>
                      <p className="text-white text-sm font-bold">AI Powered</p>
                      <p className="text-slate-500 text-xs">24/7 Automation</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Decorative Elements - static for performance */}
            <div className="absolute -top-10 -right-10 w-40 h-40 border border-white/5 rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 border border-primary/10 rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
