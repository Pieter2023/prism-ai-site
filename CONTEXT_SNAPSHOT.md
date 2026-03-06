# Prism AI — Comprehensive Context Snapshot
**Date:** March 6, 2026
**Purpose:** Copy-paste this into a new Claude thread to resume work with full context.

---

## 1. INFRASTRUCTURE

### VPS (Hostinger)
- **Host:** srv1302518.hstgr.cloud (IP: 76.13.106.105)
- **OS:** Ubuntu 24.04 LTS
- **User:** piet
- **SSH:** Accessible via Hostinger web terminal
- **OpenClaw base:** `/home/piet/.openclaw/`
- **Working dir:** `/home/piet/clawd/`

### Netlify
- **Site ID:** `ee68ab64-0860-4f37-944a-17db10977bb0`
- **Auth Token:** `nfp_JbipTiGyy4BCA5aU9x55XcgMpbx2VkQ8ebe6`
- **Domain:** prismaiservices.ca
- **Deploy command:**
  ```bash
  NETLIFY_AUTH_TOKEN=nfp_JbipTiGyy4BCA5aU9x55XcgMpbx2VkQ8ebe6 npx netlify-cli deploy --prod --dir=dist --site=ee68ab64-0860-4f37-944a-17db10977bb0
  ```

### ElevenLabs
- **Voice Agent ID:** `agent_6201kh58b848ewbrym1s94zc7s98`
- Updated with current terminology and pricing (March 2026)

### Stripe
- **Credentials:** `/home/piet/.openclaw/credentials/stripe.env`
- All 4 products updated with Kelowna BC branding and current pricing (March 2026)

---

## 2. OPENCLAW AGENTS

**Location:** `/home/piet/.openclaw/agents/`

| Agent | Purpose | Notes |
|-------|---------|-------|
| `blog-writer` | Writes SEO/GEO blog posts | OpenRouter Auto API, contextWindow: 200000, maxTokens: 8192 |
| `prism-seo` | Programmatic SEO & site management | Manages Astro blog, pSEO strategy |
| `bertus` | — | — |
| `coder` | — | — |
| `council` | — | — |
| `donkey` | — | — |
| `fast` | — | — |
| `main` | — | — |
| `marius` | — | — |
| `prompt_sync` | — | — |
| `xbot` | — | — |

Each agent has: `agent/` (auth.json, auth-profiles.json, models.json) + `sessions/`

### blog-writer API Key (OpenRouter)
```
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
```

---

## 3. OPENCLAW WORKSPACES

**Location:** `/home/piet/.openclaw/workspaces/`

Workspaces: `blog-writer`, `coder`, `council`, `crm`, `daily-briefer`, `donkey`, `fast`, `main`, `marius`, `prism-seo`, `prompt_sync`, `xbot`

### Key HEARTBEAT Files

#### prism-seo HEARTBEAT.md (`/home/piet/.openclaw/workspaces/prism-seo/HEARTBEAT.md`)
Contains:
- GEO optimization strategy
- Content Template Rules
- Internal Linking Rules
- Skill Interaction Pattern: DATA FETCH → AUDIT → CONTENT
- Weekly reporting format
- **APPENDED (March 2026):** "PRICING & POSITIONING UPDATE" section with terminology rules, current pricing structure, key messaging, blog content guidelines for pSEO & GEO

#### blog-writer HEARTBEAT.md (`/home/piet/.openclaw/workspaces/blog-writer/HEARTBEAT.md`)
**Created from scratch March 2026.** Contains:
- Brand identity: Prism AI, Kelowna BC, tagline "Automate the Chaos"
- Target audience: Canadian SMBs (5–200 employees)
- Critical terminology rules (see Section 7 below)
- Full pricing structure for CTAs
- Content structure template: frontmatter → At a Glance → Quick Answer (GEO) → FAQ → CTA → Sources
- SEO & GEO strategy guidelines (pSEO targets, GEO framing, internal linking)
- Publishing workflow: Astro markdown → build → deploy

#### daily-briefer HEARTBEAT.md (`/home/piet/.openclaw/workspaces/daily-briefer/HEARTBEAT.md`)
- Cron: **6:30 AM Vancouver time (14:30 UTC)**

---

## 4. WEBSITE ARCHITECTURE

### Stack
- **Framework:** Vite + React 19 + TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** framer-motion
- **Routing:** react-router-dom
- **Hosting:** Netlify (SPA mode with `/* → /index.html` redirect)
- **Build:** `tsc -b && vite build` → outputs to `dist/`

### Source Location (local workspace)
All website source is in the user's selected folder (Prism Ai).

### App Structure (`src/App.tsx`)
```tsx
// Lazy-loaded components
const Process = lazy(() => import('./components/Process'));
const UseCases = lazy(() => import('./components/UseCases'));
const FAQ = lazy(() => import('./components/FAQ'));
const Pricing = lazy(() => import('./components/Pricing'));
const Blog = lazy(() => import('./components/Blog'));
const Contact = lazy(() => import('./components/Contact'));
const AuditPage = lazy(() => import('./pages/AuditPage'));

// HomePage renders: Hero → Process → UseCases → Pricing → Blog → FAQ → Contact
// Routes: / (HomePage), /audit (AuditPage), /audit/results/:id (AuditPage)
```

### Navigation (`src/components/Navbar.tsx`)
```tsx
const navLinks = [
  { name: 'How It Works', href: '#process' },
  { name: 'Use Cases', href: '#use-cases' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Blog', href: '#blog' },
  { name: 'FAQ', href: '#faq' },
  { name: 'AI Audit', href: '/audit', isRoute: true, badge: 'Free' },
];
```

### Components (`src/components/`)
Benefits.tsx, Blog.tsx, Contact.tsx, Differentiators.tsx, FAQ.tsx, Hero.tsx, Navbar.tsx, Pricing.tsx, Process.tsx, Services.tsx, UseCases.tsx, audit/

### Netlify Functions (`netlify/functions/`)
- `create-checkout.ts` — Stripe checkout session creation
- `send-delivery-invoice.ts` — Delivery invoice emails
- `stripe-webhook.ts` — Stripe webhook handler
- `submit-audit.ts` — AI audit form submission

### netlify.toml
```toml
[build]
  command = "npm run build"
  publish = "dist"
  functions = "netlify/functions"

[functions]
  node_bundler = "esbuild"
  external_node_modules = ["@neondatabase/serverless"]

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Key Dependencies (package.json)
```json
{
  "dependencies": {
    "@stripe/stripe-js": "^8.7.0",
    "@tailwindcss/vite": "^4.1.18",
    "framer-motion": "^12.34.0",
    "lucide-react": "^0.563.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^7.13.0",
    "uuid": "^13.0.0"
  }
}
```

---

## 5. BLOG SYSTEM (Astro — separate from React SPA)

### Architecture
- Blog posts are Astro markdown files managed by the `prism-seo` agent
- Location on VPS: `/home/piet/.openclaw/workspaces/prism-seo/site/src/content/blog/`
- Built to static HTML, served at `prismaiservices.ca/blog/`
- The React SPA has a `Blog.tsx` component that showcases 3 featured post cards linking to `/blog/[slug]/`

### Current Blog Posts
1. `ai-voice-agents-replacing-hold-music.md`
2. `ai-voicebot-trends-2026.md` — ⚠️ still uses old "voicebot" terminology
3. `ai-voicebot-playbook-2026.md` — ⚠️ still uses old "voicebot" terminology
4. `stop-losing-leads-while-you-sleep.md`

**Note:** HEARTBEAT updates ensure all NEW content uses correct terminology. Existing posts with "voicebot" in titles/content have not been retroactively updated yet.

---

## 6. CURRENT PRICING STRUCTURE

### Project Packages
| Package | Price |
|---------|-------|
| AI Voice Agent | From $4,500 |
| Workflow Automation | From $7,500 |
| Custom AI Build | Custom Quote |

### Monthly Retainers
| Retainer | Price |
|----------|-------|
| Essential Care | $497/mo |
| Priority Ops | $997/mo |

### Billing Notes
- Third-party costs (telephony, AI API usage) billed separately at cost — no markup
- CTA: "Book a Free Strategy Call"

---

## 7. CRITICAL TERMINOLOGY RULES

These rules apply across ALL platforms — website, blog, agents, voice agent, marketing:

| ❌ NEVER Use | ✅ Use Instead |
|-------------|---------------|
| voicebot | AI receptionist, AI voice agent, voice agent |
| South African English (e.g., "colour", "organisation") | Canadian English (color, organization) |
| hello@prism-ai.com | pieter@prismaiservices.ca |
| "free 4-week pilot" | "Book a Free Strategy Call" |

### Brand Identity
- **Company:** Prism AI
- **Domain:** prismaiservices.ca
- **Location:** Kelowna, BC, Canada
- **Tagline:** "Automate the Chaos"
- **Target:** Canadian SMBs (5–200 employees)
- **Contact email:** pieter@prismaiservices.ca

---

## 8. SEO & GEO STRATEGY

### Programmatic SEO (pSEO)
- Target pattern: `[industry] + AI automation + Canada/Kelowna`
- Long-tail keywords for underserved verticals
- Astro blog builds static HTML for fast indexing

### Generative Engine Optimization (GEO)
- Content structured so AI assistants (ChatGPT, Perplexity, Gemini) surface Prism AI
- Every blog post includes a "Quick Answer" block for AI citation
- FAQ sections with schema markup
- Sources section for authority signals

### Content Structure Template (blog posts)
1. Frontmatter (title, description, date, tags)
2. "At a Glance" summary
3. "Quick Answer" block (for GEO — AI-citeable)
4. Main content with H2/H3 structure
5. FAQ section (3-5 questions)
6. CTA ("Book a Free Strategy Call")
7. Sources

---

## 9. PHASE 3 PLAN (Pending — Vertical Industry Pages)

A plan exists for Phase 3 work: creating 5 hand-crafted industry-specific pages targeting underserved Kelowna verticals. This plan was designed before the React migration and references Astro pages — **it needs to be adapted for the current React architecture**.

### Planned Industry Pages
1. `/industries/wineries-tourism` — AI for Okanagan Wineries & Tourism
2. `/industries/trades-contractors` — AI for Kelowna Trades & Contractors
3. `/industries/real-estate` — AI for Okanagan Real Estate
4. `/industries/healthcare-dental` — AI for Kelowna Healthcare & Dental
5. `/industries/hospitality` — AI for Okanagan Hotels & Restaurants

### Also Planned
- Industries hub page (`/industries/`)
- "Free 4-Week Pilot" section on homepage (but note: current terminology uses "Book a Free Strategy Call" instead)
- Remove legacy pages: `/products`, `/scorecard`, `/audit/` quiz pages
- Update navigation and footer

**Status:** Not started. Plan file at `.claude/plans/starry-noodling-ritchie.md`

---

## 10. KNOWN ISSUES / TODO

1. **Old blog posts still use "voicebot" terminology** — `ai-voicebot-trends-2026.md` and `ai-voicebot-playbook-2026.md` need title/content updates
2. **Phase 3 plan references Astro** — needs adapting for React SPA architecture
3. **Blog.tsx featured cards** — currently hardcoded with 3 posts; should be dynamic if more posts are added
4. **Astro blog vs React SPA** — two separate systems serving the same domain; blog at `/blog/` is Astro, everything else is React SPA via Netlify

---

## 11. DEPLOYMENT WORKFLOW

### React SPA (main site)
```bash
# Local: build
npm run build

# Deploy to Netlify
NETLIFY_AUTH_TOKEN=nfp_JbipTiGyy4BCA5aU9x55XcgMpbx2VkQ8ebe6 \
npx netlify-cli deploy --prod --dir=dist \
--site=ee68ab64-0860-4f37-944a-17db10977bb0
```

### Astro Blog (managed by prism-seo agent on VPS)
- Blog source: `/home/piet/.openclaw/workspaces/prism-seo/site/`
- Built and deployed separately by the prism-seo agent

### VPS File Transfer Method
When transferring files from Claude to VPS, use the paste.rs method:
1. Upload content to paste.rs
2. `curl` it down on VPS
3. Apply via `git am` or direct file placement

---

## 12. USER PREFERENCES

- **CRITICAL:** When making changes to OpenClaw configurations or memory, NEVER proceed without explicit confirmation if any existing setup would be lost or altered
- When proposing changes, list specifically what would be impacted or lost
- If actions fall outside defined rules, ask for input
- Always provide concise, clear implications of critical changes, including which files or processes would be affected

---

## 13. RECENT CHANGES LOG (March 2026)

| Change | Platform | Status |
|--------|----------|--------|
| Full pricing overhaul (3 packages + 2 retainers) | Website | ✅ Deployed |
| Terminology: voicebot → AI receptionist/voice agent | All platforms | ✅ Done |
| Blog section restored to React SPA | Website | ✅ Deployed |
| Email fixed: hello@prism-ai.com → pieter@prismaiservices.ca | Website (Contact.tsx) | ✅ Deployed |
| Voice agent prompt updated | ElevenLabs | ✅ Done |
| All 4 Stripe products updated | Stripe | ✅ Done |
| prism-seo HEARTBEAT.md updated | OpenClaw VPS | ✅ Done |
| blog-writer HEARTBEAT.md created | OpenClaw VPS | ✅ Done |
| South African English removed from prism-seo | OpenClaw VPS | ✅ Done |
| Daily briefer cron fixed to 6:30 AM Vancouver | OpenClaw VPS | ✅ Done |
| Old blog posts retroactively updated | Astro blog | ❌ Not done |
| Phase 3 industry pages | Website | ❌ Not started |
