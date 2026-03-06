import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface BlogPost {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  category: string;
  readTime: string;
  icon: string;
}

const blogPosts: BlogPost[] = [
  {
    title: 'AI Voice Agents Are Replacing Hold Music — Here\'s What That Means for Your Business',
    excerpt:
      'The shift from hold music to instant AI response is happening now across every Canadian industry. Businesses that adopt early gain a measurable competitive advantage.',
    slug: 'ai-voice-agents-replacing-hold-music',
    date: 'Mar 4, 2026',
    category: 'AI Voice Agents',
    readTime: '6 min read',
    icon: 'record_voice_over',
  },
  {
    title: 'AI Receptionist Trends 2026: What Canadian Service Businesses Need to Know',
    excerpt:
      'From after-hours lead capture to multilingual call handling, these are the AI receptionist trends reshaping how Canadian SMBs operate in 2026.',
    slug: 'ai-voicebot-trends-2026',
    date: 'Mar 3, 2026',
    category: 'Industry Trends',
    readTime: '7 min read',
    icon: 'trending_up',
  },
  {
    title: 'Stop Losing Leads While You Sleep',
    excerpt:
      'Every missed after-hours call is a lost opportunity. Learn how AI-powered lead capture keeps your pipeline full 24/7 — even when your team clocks out.',
    slug: 'stop-losing-leads-while-you-sleep',
    date: 'Mar 2, 2026',
    category: 'Lead Capture',
    readTime: '5 min read',
    icon: 'notifications_active',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

export default function Blog() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="blog" className="py-24 sm:py-32 relative" ref={ref}>
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6">
            <span className="material-symbols-outlined text-base">auto_stories</span>
            Insights &amp; Guides
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Latest from the{' '}
            <span className="gradient-text">Blog</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Practical insights on AI automation, lead capture, and workflow optimization for Canadian service businesses.
          </p>
        </motion.div>

        {/* Blog Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {blogPosts.map((post) => (
            <motion.a
              key={post.slug}
              href={`/blog/${post.slug}/`}
              variants={cardVariants}
              className="group relative glass-card rounded-2xl p-6 border border-white/5 hover:border-primary/30 transition-all duration-500 flex flex-col"
            >
              {/* Category & Date */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  <span className="material-symbols-outlined text-sm">{post.icon}</span>
                  {post.category}
                </span>
                <span className="text-xs text-slate-500">{post.date}</span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300 leading-snug">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                {post.excerpt}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  {post.readTime}
                </span>
                <span className="text-primary text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                  Read more
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.a>
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="/blog/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/10 hover:border-primary/30 text-slate-300 hover:text-white transition-all duration-300 text-sm font-semibold group"
          >
            View all articles
            <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform duration-300">
              arrow_forward
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
