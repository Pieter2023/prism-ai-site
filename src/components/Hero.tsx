import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { openVoicebot } from '../utils/voicebot';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen-safe flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Clean background - single centered gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto w-full px-6 relative z-10">
        {/* Centered content */}
        <div className="text-center mb-14">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-primary mb-10"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="text-accent text-xs font-bold uppercase tracking-widest">
              AI Automation for Growing Businesses
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.95] text-white mb-8"
          >
            Your team is wasting hours on
            <br />
            <span className="gradient-text">work AI can do.</span>
          </motion.h1>

          {/* Value prop */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            We audit your operations, find what&apos;s slowing you down, and build
            custom AI systems that save your team{' '}
            <span className="text-white font-medium">hours every week</span>.
          </motion.p>
        </div>

        {/* Choose your path label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="text-center text-sm text-slate-500 font-medium uppercase tracking-widest mb-6"
        >
          Choose how to get started
        </motion.p>

        {/* Two Path Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="grid md:grid-cols-2 gap-5 mb-16"
        >
          {/* Quiz Path */}
          <Link to="/audit" className="group block">
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-2xl p-7 md:p-8 h-full transition-all duration-300 relative overflow-hidden hover:border-primary/30"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-xl">auto_awesome</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-white font-bold text-lg">Free AI Audit</span>
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-primary/20 text-primary-light border border-primary/30 rounded-full leading-tight">
                      5 min
                    </span>
                  </div>
                </div>

                <p className="text-slate-400 leading-relaxed mb-5 text-[15px]">
                  Answer a few questions about your business and get an instant
                  AI readiness score with personalized automation opportunities.
                </p>

                <ul className="space-y-2 mb-6">
                  {['Instant readiness score', 'Top automation opportunities', 'Personalized recommendations'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                      <span className="material-symbols-outlined text-accent text-base">check_circle</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all">
                  Start Free Audit
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Voice Path */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            onClick={openVoicebot}
            className="glass-card rounded-2xl p-7 md:p-8 cursor-pointer group transition-all duration-300 relative overflow-hidden hover:border-accent/30"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-accent text-xl">mic</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-white font-bold text-lg">AI Advisor</span>
                  <span className="relative flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-bold uppercase bg-accent/20 text-accent border border-accent/30 rounded-full leading-tight">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute h-full w-full rounded-full bg-accent opacity-75" />
                      <span className="relative rounded-full h-1.5 w-1.5 bg-accent" />
                    </span>
                    Live
                  </span>
                </div>
              </div>

              <p className="text-slate-400 leading-relaxed mb-5 text-[15px]">
                Prefer a conversation? Our AI advisor asks about your business and
                our team responds with a tailored proposal within 24 hours.
              </p>

              <div className="space-y-1.5 mb-6">
                <p className="text-[11px] text-slate-500 uppercase tracking-widest font-bold mb-2">
                  Try asking
                </p>
                {[
                  '"How can AI help my restaurant?"',
                  '"What would automation cost for a small team?"',
                  '"I spend hours on invoicing every week"',
                ].map((q) => (
                  <div key={q} className="flex items-center gap-2 text-sm text-slate-400">
                    <span className="material-symbols-outlined text-accent/40 text-sm">chevron_right</span>
                    <span className="italic">{q}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-accent font-bold text-sm group-hover:gap-3 transition-all">
                Talk to AI Advisor
                <span className="material-symbols-outlined text-lg">mic</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Trust Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-slate-500"
        >
          {[
            { icon: 'payments', text: 'Fixed-fee pricing' },
            { icon: 'schedule', text: 'Proposals in 24 hours' },
            { icon: 'tune', text: '100% custom built' },
            { icon: 'lock', text: 'No commitment required' },
          ].map(({ icon, text }) => (
            <span key={text} className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary/50 text-base">{icon}</span>
              {text}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0f1a] to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
