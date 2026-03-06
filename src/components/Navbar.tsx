import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { openVoicebot } from '../utils/voicebot';

interface NavLink {
  name: string;
  href: string;
  isRoute?: boolean;
  badge?: string;
}

const navLinks: NavLink[] = [
  { name: 'How It Works', href: '#process' },
  { name: 'Use Cases', href: '#use-cases' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Blog', href: '#blog' },
  { name: 'FAQ', href: '#faq' },
  { name: 'AI Audit', href: '/audit', isRoute: true, badge: 'Free' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleNavClick = useCallback((e: React.MouseEvent, link: NavLink) => {
    if (link.isRoute) return; // Let Link handle it

    e.preventDefault();
    setIsOpen(false);

    if (location.pathname === '/') {
      // On home page, scroll to section
      const el = document.querySelector(link.href);
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // On other pages, navigate to home + hash
      navigate('/' + link.href);
    }
  }, [location.pathname, navigate]);

  // Handle hash scroll after navigation from other pages
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 w-full z-50 px-4 sm:px-6 py-4 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div
        className={`max-w-5xl mx-auto flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 ${
          scrolled
            ? 'glass shadow-2xl shadow-primary/5'
            : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2.5 cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogoClick}
        >
          <div className="relative">
            <div className="size-9 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
              <span className="material-symbols-outlined text-xl">deployed_code</span>
            </div>
            <div className="absolute inset-0 bg-primary rounded-xl blur-xl opacity-40" />
          </div>
          <span className="text-lg font-black tracking-tight text-white uppercase">
            Prism<span className="gradient-text">AI</span>
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link, index) => (
            link.isRoute ? (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <Link
                  to={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors group inline-flex items-center gap-1.5"
                >
                  {link.name}
                  {link.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase bg-accent/15 text-accent border border-accent/25 rounded-full leading-none">
                      {link.badge}
                    </span>
                  )}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-4/5 transition-all duration-300 rounded-full" />
                </Link>
              </motion.div>
            ) : (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className="relative px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors group"
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-4/5 transition-all duration-300 rounded-full" />
              </motion.a>
            )
          ))}
        </div>

        {/* CTA Button - opens voicebot */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 40px -10px rgba(19, 91, 236, 0.5)' }}
          whileTap={{ scale: 0.95 }}
          onClick={openVoicebot}
          className="hidden md:flex btn-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all glow-soft items-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">mic</span>
          Talk to AI
        </motion.button>

        {/* Mobile Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="md:hidden text-white p-2 rounded-xl glass"
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="material-symbols-outlined"
          >
            {isOpen ? 'close' : 'menu'}
          </motion.span>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay - tap to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 md:hidden"
              onClick={() => setIsOpen(false)}
              onTouchEnd={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute top-24 left-4 right-4 glass-card rounded-2xl p-6 shadow-2xl z-40 md:hidden border border-white/10"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  link.isRoute ? (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index }}
                    >
                      <Link
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-lg font-medium text-slate-300 active:text-white active:bg-white/5 px-4 py-3 rounded-xl transition-all flex items-center justify-between"
                      >
                        <span className="flex items-center gap-2">
                          {link.name}
                          {link.badge && (
                            <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase bg-accent/15 text-accent border border-accent/25 rounded-full leading-none">
                              {link.badge}
                            </span>
                          )}
                        </span>
                        <span className="material-symbols-outlined text-primary">
                          arrow_forward
                        </span>
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index }}
                      onClick={(e) => handleNavClick(e, link)}
                      className="text-lg font-medium text-slate-300 active:text-white active:bg-white/5 px-4 py-3 rounded-xl transition-all flex items-center justify-between"
                    >
                      {link.name}
                      <span className="material-symbols-outlined text-primary">
                        arrow_forward
                      </span>
                    </motion.a>
                  )
                ))}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  onClick={() => { setIsOpen(false); openVoicebot(); }}
                  className="btn-primary text-white px-5 py-4 rounded-xl text-base font-bold mt-4 w-full glow-soft flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">mic</span>
                  Talk to AI
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
