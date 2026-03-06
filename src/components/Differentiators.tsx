import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useIsTouchDevice } from '../utils/useIsTouchDevice';

const differentiators = [
  {
    number: '01',
    title: 'Product-Owner Mindset',
    desc: 'We don\'t just take orders; we act as your technology partners, thinking deeply about your ROI and long-term product vision.',
    icon: 'psychology',
    gradient: 'from-primary to-blue-600',
  },
  {
    number: '02',
    title: 'Enterprise Reliability',
    desc: 'Every system we build is hardened for security and high-volume performance. We build tools that never take a day off.',
    icon: 'verified',
    gradient: 'from-accent to-cyan-600',
  },
  {
    number: '03',
    title: 'Unrivaled Velocity',
    desc: 'Our modular AI architecture allows us to go from concept to live production in weeks, not the typical software quarters.',
    icon: 'rocket_launch',
    gradient: 'from-violet-500 to-purple-600',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const Differentiators: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isTouch = useIsTouchDevice();

  return (
    <section
      className="py-32 px-6 relative overflow-hidden bg-gradient-to-b from-transparent via-white/[0.02] to-transparent"
      id="why-us"
      ref={ref}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Decorative Elements - static for performance */}
      <div className="absolute top-20 right-20 w-64 h-64 border border-white/5 rounded-full" />
      <div className="absolute bottom-20 left-20 w-48 h-48 border border-primary/10 rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-primary mb-6"
          >
            <span className="material-symbols-outlined text-primary text-sm">star</span>
            <span className="text-primary text-xs font-bold uppercase tracking-widest">
              Why Choose Us
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter">
            The <span className="gradient-text">Prism</span> Advantage
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {differentiators.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              {...(!isTouch && { whileHover: { y: -12, transition: { duration: 0.3 } } })}
              className="group relative"
            >
              {/* Card */}
              <div className="relative glass-card rounded-3xl p-8 h-full overflow-hidden">
                {/* Background Gradient on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                {/* Large Background Number */}
                <div className="absolute -top-4 -right-4 text-[120px] font-black text-white/[0.02] leading-none select-none">
                  {item.number}
                </div>

                <div className="relative z-10">
                  {/* Number & Icon */}
                  <div className="flex items-center justify-between mb-8">
                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      className={`text-5xl font-black bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent opacity-60 group-hover:opacity-100 transition-opacity`}
                    >
                      {item.number}
                    </motion.span>
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className="w-14 h-14 rounded-2xl glass flex items-center justify-center group-hover:bg-white/5 transition-colors"
                    >
                      <span className="material-symbols-outlined text-2xl text-slate-400 group-hover:text-white transition-colors">
                        {item.icon}
                      </span>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {item.desc}
                  </p>

                  {/* Bottom Accent */}
                  <div className="mt-8 flex items-center gap-2">
                    <motion.div
                      className={`h-0.5 bg-gradient-to-r ${item.gradient} rounded-full`}
                      initial={{ width: 0 }}
                      whileInView={{ width: 48 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                    />
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Learn more
                    </span>
                  </div>
                </div>

                {/* Corner Accent */}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-bl-full`}
                />
              </div>

              {/* Connecting Line (for desktop) */}
              {index < differentiators.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-white/10 to-transparent" />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '100%', label: 'Custom Built' },
            { value: '3x', label: 'Faster Delivery' },
            { value: 'Fixed', label: 'Fee Pricing' },
            { value: '24/7', label: 'Support Coverage' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              {...(!isTouch && { whileHover: { y: -5, scale: 1.02 } })}
              className="glass-card rounded-2xl p-6 text-center group cursor-default"
            >
              <motion.span
                initial={{ scale: 0.5, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 1 + index * 0.1, type: 'spring' }}
                className="text-3xl md:text-4xl font-black gradient-text block mb-2"
              >
                {stat.value}
              </motion.span>
              <span className="text-sm text-slate-500 group-hover:text-slate-400 transition-colors">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Differentiators;
