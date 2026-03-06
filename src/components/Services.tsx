import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { openVoicebot } from '../utils/voicebot';
import { useIsTouchDevice } from '../utils/useIsTouchDevice';

const services = [
  {
    icon: 'schema',
    title: 'Workflow Automation',
    desc: 'Transform messy, fragmented processes into lean, automated sequences that work while you sleep.',
    gradient: 'from-primary/20 to-blue-600/10',
    accent: '#135bec',
    features: ['Process Mapping', 'Auto-Execution', 'Error Handling'],
  },
  {
    icon: 'insights',
    title: 'Data Insights',
    desc: 'Turn raw, unstructured data into beautiful, human-friendly insights via custom real-time dashboards.',
    gradient: 'from-accent/20 to-cyan-600/10',
    accent: '#06b6d4',
    features: ['Live Dashboards', 'Predictive Analytics', 'Custom Reports'],
  },
  {
    icon: 'construction',
    title: 'Custom AI Tools',
    desc: 'Beyond basic chatbots. We build tailored AI engines specific to your proprietary business logic.',
    gradient: 'from-violet-500/20 to-purple-600/10',
    accent: '#8b5cf6',
    features: ['LLM Integration', 'Fine-tuning', 'API Development'],
  },
  {
    icon: 'settings_voice',
    title: 'AI Receptionist & Voice Agents',
    desc: 'Natural sounding AI that handles calls, qualifies leads, books appointments, and provides 24/7 support.',
    gradient: 'from-emerald-500/20 to-green-600/10',
    accent: '#10b981',
    features: ['AI Voice Agents', 'Lead Qualification', 'Multi-language'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const Services: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isTouch = useIsTouchDevice();

  return (
    <section className="py-32 px-6 relative overflow-hidden" id="services" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20"
        >
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-primary mb-6"
            >
              <span className="material-symbols-outlined text-primary text-sm">diamond</span>
              <span className="text-primary text-xs font-bold uppercase tracking-widest">
                Core Capabilities
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter">
              Engineered for
              <br />
              <span className="gradient-text">Efficiency</span>
            </h2>
          </div>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-md text-lg"
          >
            Our specialized AI toolsets are custom-built to integrate seamlessly into your existing
            stack, delivering immediate value.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              {...(!isTouch && { whileHover: { y: -8, transition: { duration: 0.3 } } })}
              className="group relative glass-card rounded-3xl p-8 overflow-hidden cursor-default"
            >
              {/* Hover Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Border Glow on Hover */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${service.accent}20, transparent 50%)`,
                }}
              />

              <div className="relative z-10">
                {/* Icon & Title Row */}
                <div className="flex items-start justify-between mb-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="size-16 rounded-2xl flex items-center justify-center transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${service.accent}20, ${service.accent}05)`,
                      border: `1px solid ${service.accent}30`,
                    }}
                  >
                    <span
                      className="material-symbols-outlined text-3xl"
                      style={{ color: service.accent }}
                    >
                      {service.icon}
                    </span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <span className="material-symbols-outlined text-white">arrow_outward</span>
                  </motion.div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-400 leading-relaxed mb-6 group-hover:text-slate-300 transition-colors">
                  {service.desc}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-xs font-medium text-slate-400 glass"
                      style={{
                        borderColor: `${service.accent}20`,
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Bottom Accent Line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 rounded-full"
                  style={{ backgroundColor: service.accent }}
                  initial={{ width: '0%' }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-500 mb-6">
            Not sure where to start? Get a free AI readiness score in minutes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/audit">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-white px-8 py-4 rounded-xl text-sm font-bold transition-all inline-flex items-center gap-2 glow-soft"
              >
                <span className="material-symbols-outlined">auto_awesome</span>
                Free AI Audit
              </motion.div>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openVoicebot}
              className="glass text-white px-8 py-4 rounded-xl text-sm font-bold transition-all hover:bg-white/5 inline-flex items-center gap-2"
            >
              <span className="material-symbols-outlined">mic</span>
              Discuss Your Project
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
