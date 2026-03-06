import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { openVoicebot } from '../utils/voicebot';

const Contact: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <footer className="relative overflow-hidden" id="contact" ref={ref}>
      {/* Final CTA Section */}
      <section className="py-24 md:py-32 px-6 relative">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter mb-6">
              Ready to see what AI
              <br />
              <span className="gradient-text">can do for you?</span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-lg max-w-xl mx-auto mb-10"
            >
              Start with our free AI audit or talk to our AI advisor.
              Either way, you&apos;ll get a custom proposal within 24 hours.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4 mb-12"
            >
              <Link to="/audit">
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: '0 0 60px -15px rgba(19, 91, 236, 0.6)' }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-white px-8 py-4 rounded-xl text-base font-bold glow-soft inline-flex items-center gap-2"
                >
                  <span className="material-symbols-outlined">auto_awesome</span>
                  Start Free AI Audit
                </motion.div>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openVoicebot}
                className="glass text-white px-8 py-4 rounded-xl text-base font-bold hover:bg-white/5 transition-all inline-flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-accent">mic</span>
                Talk to AI Advisor
              </motion.button>
            </motion.div>

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center gap-2"
            >
              <p className="text-slate-500 text-sm">Or call us directly</p>
              <a
                href="tel:+12367774093"
                className="text-xl md:text-2xl font-bold text-white hover:text-primary transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-primary">call</span>
                +1 236 777 4093
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* Compact Footer */}
      <div className="py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-lg">deployed_code</span>
            </div>
            <span className="text-lg font-black tracking-tight text-white uppercase">
              Prism<span className="gradient-text">AI</span>
            </span>
          </div>

          {/* Contact Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
            <a
              href="tel:+12367774093"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm text-primary/60">call</span>
              +1 236 777 4093
            </a>
            <a
              href="mailto:pieter@prismaiservices.ca"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm text-primary/60">mail</span>
              pieter@prismaiservices.ca
            </a>
            <button
              onClick={openVoicebot}
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm text-accent/60">mic</span>
              AI Assistant
            </button>
          </div>

          {/* Copyright */}
          <p className="text-slate-600 text-xs font-medium tracking-wider">
            &copy; {new Date().getFullYear()} Prism AI Solutions
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
