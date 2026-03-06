import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { openVoicebot } from '../utils/voicebot';

const faqs = [
  {
    q: 'How much does it cost?',
    a: 'We use fixed-fee pricing based on scope — no hourly billing surprises. AI Receptionist projects start from $4,500 CAD, and Workflow Automation projects start from $7,500 CAD. Every project includes discovery, design, build, and 30 days of post-launch support. Third-party usage costs (telephony, AI APIs) are billed separately at cost.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'AI Receptionist builds typically take 2-3 weeks. Workflow Automation projects run 3-6 weeks. Custom AI integrations vary based on complexity. We confirm timelines upfront after a free strategy call.',
  },
  {
    q: 'What happens after the AI audit?',
    a: 'You receive a detailed AI Blueprint with your readiness score, top automation opportunities, ROI projections, and recommended tools. Our team then walks you through the findings in a 1-on-1 strategy session — completely free.',
  },
  {
    q: 'Do you offer ongoing support after launch?',
    a: 'Every project includes 30 days of post-launch support. After that, our management retainers (starting at $497/month) cover monitoring, minor updates, and priority support to keep your AI systems running smoothly.',
  },
  {
    q: 'Can you work with our existing tools?',
    a: 'Yes. We integrate with CRMs, ERPs, calendars, phone systems, databases, and custom APIs. During discovery, we map all connections to ensure everything works seamlessly with your current stack.',
  },
];

const FAQ: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 px-6 relative overflow-hidden" id="faq" ref={ref}>
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
            Common <span className="gradient-text">Questions</span>
          </h2>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + index * 0.08 }}
              className="glass-card rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left group"
              >
                <span className="text-white font-semibold text-base pr-4 group-hover:text-primary transition-colors">
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="material-symbols-outlined text-slate-400 shrink-0"
                >
                  expand_more
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-slate-400 leading-relaxed text-sm">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-10"
        >
          <p className="text-slate-500 text-sm mb-4">Have a different question?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openVoicebot}
            className="glass text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-white/5 transition-all inline-flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-accent text-lg">mic</span>
            Ask Our AI
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
