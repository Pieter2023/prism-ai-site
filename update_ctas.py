#!/usr/bin/env python3
"""Update Prism AI site: CTAs → AI voicebot call + How It Works section"""
import os

BASE = os.path.expanduser('~/prism-ai-site/src')

# ============================================================
# 1. BaseLayout.astro — Nav CTA, Footer link, global JS
# ============================================================
path = os.path.join(BASE, 'layouts/BaseLayout.astro')
with open(path, 'r') as f:
    content = f.read()

# Nav: "Get Started" → "Talk to AI" with onclick
content = content.replace(
    '<a href="/#contact" class="btn-primary btn-sm">Get Started</a>',
    '<a href="/#talk-to-ai" class="btn-primary btn-sm" onclick="if(window.startAICall){event.preventDefault();startAICall();}">Talk to AI</a>'
)

# Footer: "Contact" → "Talk to AI"
content = content.replace(
    '<a href="/#contact">Contact</a>',
    '<a href="/#talk-to-ai" onclick="if(window.startAICall){event.preventDefault();startAICall();}">Talk to AI</a>'
)

# Add global startAICall() JS + widget trigger right after the elevenlabs widget element
widget_line = '    <elevenlabs-convai agent-id="agent_6201kh58b848ewbrym1s94zc7s98"></elevenlabs-convai>'
js_block = '''    <elevenlabs-convai agent-id="agent_6201kh58b848ewbrym1s94zc7s98"></elevenlabs-convai>
    <script>
    function startAICall() {
      var section = document.getElementById('talk-to-ai');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      setTimeout(function() {
        var widget = document.querySelector('elevenlabs-convai');
        if (!widget) return;
        try {
          if (widget.shadowRoot) {
            var btns = widget.shadowRoot.querySelectorAll('button');
            for (var i = 0; i < btns.length; i++) {
              var txt = btns[i].textContent.toLowerCase();
              if (txt.indexOf('start') !== -1 || txt.indexOf('call') !== -1) {
                btns[i].click();
                return;
              }
            }
            if (btns.length > 0) btns[0].click();
          } else {
            widget.click();
          }
        } catch(e) {
          widget.click();
        }
      }, 600);
    }
    window.startAICall = startAICall;
    </script>'''
content = content.replace(widget_line, js_block)

with open(path, 'w') as f:
    f.write(content)
print(f"[OK] BaseLayout.astro updated")

# ============================================================
# 2. index.astro — Hero CTAs + replace bottom CTA with How It Works
# ============================================================
path = os.path.join(BASE, 'pages/index.astro')
with open(path, 'r') as f:
    content = f.read()

# Hero primary CTA
content = content.replace(
    '<a href="#contact" class="btn-primary">Get Your Free Consultation</a>',
    '<a href="#talk-to-ai" class="btn-primary" onclick="if(window.startAICall){event.preventDefault();startAICall();}">Talk to Our AI Concierge</a>'
)

# Bottom CTA section → How It Works
old_cta = '''<!-- CTA -->
<section id="contact" class="cta-home">
  <div class="container">
    <div class="cta-card-home">
      <h2>Ready to Automate the Chaos?</h2>
      <p>Book a free 30-minute consultation. We'll map your biggest time sinks and show you exactly how AI can fix them.</p>
      <a href="https://calendly.com" class="btn-primary">Get Your Free Consultation</a>
    </div>
  </div>
</section>'''

new_section = '''<!-- How It Works — AI Call Process -->
<section id="talk-to-ai" class="how-it-works-section">
  <div class="container">
    <h2 class="section-title">Talk to Our AI &mdash; It's That Easy</h2>
    <p class="section-sub">No forms. No waiting. No phone tag. Just click and talk.</p>
    <div class="steps-grid">
      <div class="step-card">
        <div class="step-number">1</div>
        <h3>Click &ldquo;Start a Call&rdquo;</h3>
        <p>Your browser connects instantly &mdash; no downloads, no sign-ups, no phone number needed.</p>
      </div>
      <div class="step-card">
        <div class="step-number">2</div>
        <h3>Tell Our AI What You Need</h3>
        <p>Our AI concierge asks smart follow-up questions to understand your business, pain points, and goals.</p>
      </div>
      <div class="step-card">
        <div class="step-number">3</div>
        <h3>Get Your Custom Plan</h3>
        <p>We email you a tailored summary with recommendations, pricing guidance, and next steps &mdash; within minutes.</p>
      </div>
    </div>
    <div class="ai-call-cta">
      <div class="ai-call-card">
        <div class="ai-call-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </div>
        <h3>Ready to see how AI can transform your business?</h3>
        <p>Our AI concierge is available 24/7. The call takes 2&ndash;3 minutes and you'll have a clear picture of what's possible.</p>
        <button class="btn-primary btn-lg" onclick="startAICall();">
          Start Your Free AI Call
        </button>
        <span class="cta-note">Free &bull; 2&ndash;3 minutes &bull; No commitment</span>
      </div>
    </div>
  </div>
</section>'''

content = content.replace(old_cta, new_section)

# Add CSS for the new How It Works section before the last </style>
how_it_works_css = """
.how-it-works-section { padding: 5rem 0; }
.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}
.step-card {
  text-align: center;
  padding: 2rem 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: rgba(108, 60, 225, 0.05);
  transition: transform 0.2s, border-color 0.2s;
}
.step-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-primary-light);
}
.step-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: white;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
}
.step-card h3 { font-size: 1.15rem; margin-bottom: 0.75rem; }
.step-card p { color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.6; }
.ai-call-cta { margin-top: 3rem; }
.ai-call-card {
  text-align: center;
  background: linear-gradient(135deg, rgba(108, 60, 225, 0.15), rgba(6, 182, 212, 0.1));
  border: 1px solid rgba(108, 60, 225, 0.3);
  border-radius: var(--radius);
  padding: 3rem 2rem;
  max-width: 600px;
  margin: 0 auto;
}
.ai-call-icon { color: var(--color-primary-light); margin-bottom: 1.5rem; }
.ai-call-card h3 { font-size: 1.5rem; margin-bottom: 1rem; }
.ai-call-card p {
  color: var(--color-text-muted);
  font-size: 1.05rem;
  margin-bottom: 2rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}
.btn-lg {
  font-size: 1.15rem;
  padding: 1rem 2.5rem;
  cursor: pointer;
  animation: pulse-glow 2s ease-in-out infinite;
}
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(108, 60, 225, 0.4); }
  50% { box-shadow: 0 0 20px 4px rgba(108, 60, 225, 0.3); }
}
.cta-note {
  display: block;
  margin-top: 1rem;
  font-size: 0.85rem;
  color: var(--color-text-muted);
}
"""

# Also remove old .cta-home styles and replace
content = content.replace('.cta-home { padding: 5rem 0; }', '.cta-home { padding: 5rem 0; }' )

last_style = content.rfind('</style>')
if last_style != -1:
    content = content[:last_style] + how_it_works_css + content[last_style:]

with open(path, 'w') as f:
    f.write(content)
print(f"[OK] index.astro updated")

# ============================================================
# 3. Hero.astro — default ctaLink + onclick
# ============================================================
path = os.path.join(BASE, 'components/Hero.astro')
with open(path, 'r') as f:
    content = f.read()

content = content.replace(
    "ctaLink = '#contact'",
    "ctaLink = '#talk-to-ai'"
)
content = content.replace(
    '<a href={ctaLink} class="btn-primary">{ctaText}</a>',
    '<a href={ctaLink} class="btn-primary" onclick="if(window.startAICall){event.preventDefault();startAICall();}">{ctaText}</a>'
)

with open(path, 'w') as f:
    f.write(content)
print(f"[OK] Hero.astro updated")

# ============================================================
# 4. services/[...slug].astro — calendly CTA 