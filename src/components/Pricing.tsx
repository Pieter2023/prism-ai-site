import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { openVoicebot } from '../utils/voicebot';
import { useIsTouchDevice } from '../utils/useIsTouchDevice';

const projectPackages = [
  {
    name: 'AI Receptionist & Lead Capture',
    price: 'From $4,500',
    desc: 'A 24/7 AI voice agent that answers calls, qualifies leads, and books appointments — so your team never misses an opportunity.',
    icon: 'call',
    color: '#135bec',
    includes: [
      'Custom-trained AI voice agent',
      'Call routing & lead qualification logic',
      'CRM / calendar integration',
      'Branded voice & personality',
      '30 days post-launch support',
    ],
    idealFor: 'Businesses losing leads to missed calls or after-hours inquiries.',
  },
  {
    name: 'Workflow Automation & Follow-Up',
    price: 'From $7,500',
    desc: 'End-to-end automation of your repetitive workflows — from lead follow-up sequences to invoicing, reporting, and internal ops.',
    icon: 'schema',
    color: '#8b5cf6',
    popular: true,
    includes: [
      'Process mapping & automation design',
      'Multi-step workflow builds (Zapier, Make, or custom)',
      'Email / SMS follow-up sequences',
      'Dashboard & reporting setup',
      '30 days post-launch support',
    ],
    idealFor: 'Teams spending hours on manual data entry, follow-ups, or reporting.',
  },
  {
    name: 'Custom AI Systems & Integrations',
    price: 'Custom Quote',
    desc: 'For businesses that need something beyond templates — custom AI tools, proprietary integrations, and multi-system automation.',
    icon: 'construction',
    color: '#06b6d4',
    includes: [
      'Custom AI model fine-tuning',
      'Proprietary API integrations',
      'Multi-system data orchestration',
      'Advanced analytics & reporting',
      '30 days post-launch support',
    ],
    idealFor: 'Companies with complex operations, legacy systems, or unique AI needs.',
  },
];

const retainers = [
  {
    name: 'Essential Care',
    price: '$497',
    period: '/month',
    desc: 'Keep your AI systems running smoothly with proactive monitoring, minor updates, and priority support.',
    icon: 'shield',
    color: '#135bec',
    includes: [
      'System monitoring & uptime checks',
      'Minor adjustments & prompt tuning',
      'Monthly performance report',
      'Email support (48h response)',
    ],
  },
  {
    name: 'Priority Ops',
    price: '$997',
    period: '/month',
    desc: 'Dedicated AI operations support — ongoing optimization, new workflow builds, and strategic guidance.',
    icon: 'bolt',
    color: '#8b5cf6',
    includes: [
      'Everything in Essential Care',
      'Priority support (24h response)',
      'Monthly strategy call',
      'New workflow / integration builds (up to 8 hrs)',
      'Quarterly AI roadmap review',
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
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
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const Pricing: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isTouch = useIsTouchDevice();

  return (
    <section className="py-24 md:py-32 px-6 relative overflow-hidden" id="pricing" ref={ref}>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
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
            <span className="material-symbols-outlined text-primary text-sm">payments</span>
            <span className="text-primary text-xs font-bold uppercase tracking-widest">
              Transparent Pricing
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter mb-6">
            Fixed-fee projects.
            <br />
            <span className="gradient-text">No surprises.</span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            Every project includes discovery, design, build, and 30 days of post-launch support.
            Third-party usage costs (telephony, AI APIs) are billed separately at cost.
          </motion.p>
        </motion.div>

        {/* Project Packages */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16"
        >
          {projectPackages.map((pkg) => (
            <motion.div
              key={pkg.name}
              variants={itemVariants}
              {...(!isTouch && { whileHover: { y: -6, transition: { duration: 0.3 } } })}
              className={`relative glass-card rounded-2xl p-7 flex flex-col ${
                pkg.popular ? 'border-primary/30 ring-1 ring-primary/20' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 text-[10px] font-bold uppercase bg-primary text-white rounded-full shadow-lg shadow-primary/30">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{
                  background: `linear-gradient(135deg, ${pkg.color}20, ${pkg.color}05)`,
                  border: `1px solid ${pkg.color}30`,
                }}
              >
                <span
                  className="material-symbols-outlined text-2xl"
                  style={{ color: pkg.color }}
                >
                  {pkg.icon}
                </span>
              </div>

              {/* Name & Price */}
              <h3 className="text-lg font-bold text-white mb-1">{pkg.name}</h3>
              <p className="text-2xl font-black gradient-text mb-3">{pkg.price}</p>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">{pkg.desc}</p>

              {/* Includes */}
              <div className="flex-grow">
                <p className="text-[11px] text-slate-500 uppercase tracking-widest font-bold mb-3">
                  What&apos;s Included
                </p>
                <ul className="space-y-2 mb-5">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="material-symbols-outlined text-accent text-base mt-0.5 shrink-0">check_circle</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ideal For */}
              <div className="pt-4 border-t border-white/5">
                <p className="text-xs text-slate-500">
                  <span className="font-semibold text-slate-400">Ideal for:</span> {pkg.idealFor}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Management Retainers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Ongoing <span className="gradient-text">Management</span>
            </h3>
            <p className="text-slate-400 text-sm mt-2 max-w-lg mx-auto">
              After launch, keep your AI systems optimized and evolving with a management retainer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {retainers.map((ret) => (
              <motion.div
                key={ret.name}
                variants={itemVariants}
                {...(!isTouch && { whileHover: { y: -4, transition: { duration: 0.3 } } })}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${ret.color}20, ${ret.color}05)`,
                      border: `1px solid ${ret.color}30`,
                    }}
                  >
                    <span
                      className="material-symbols-outlined text-xl"
                      style={{ color: ret.color }}
                    >
                      {ret.icon}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{ret.name}</h4>
                    <p className="text-xl font-black gradient-text leading-none">
                      {ret.price}<span className="text-sm text-slate-500 font-medium">{ret.period}</span>
                    </p>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{ret.desc}</p>
                <ul className="space-y-1.5">
                  {ret.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="material-symbols-outlined text-accent text-sm mt-0.5 shrink-0">check</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Fine Print & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          {/* Usage cost note */}
          <div className="glass rounded-xl px-5 py-3 inline-flex items-center gap-2 mb-8 text-sm text-slate-400">
            <span className="material-symbols-outlined text-primary/60 text-base">info</span>
            Third-party costs (telephony minutes, AI API usage) are billed separately at cost — no markup.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px -10px rgba(19, 91, 236, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={openVoicebot}
              className="btn-primary text-white px-8 py-4 rounded-xl text-sm font-bold glow-soft inline-flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">mic</span>
              Book a Free Strategy Call
            </motion.button>
          </div>

          <p className="text-slate-500 text-xs mt-4">
            Not sure which package fits? Start with a free strategy call — we&apos;ll scope it together.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
