# Memory — Prism AI
**Last updated:** April 27, 2026 — OpenClaw + xbot wound down. Website is the only live system.

## Me
Pieter van der Walt, founder of Prism AI Services. Kelowna, BC. "Automate the Chaos."
Contact: pieter@prismaiservices.ca | pieter@houseofrealtors.co.za | WhatsApp +27847025272

## Live Systems
| System | What it is | Where |
|--------|-----------|-------|
| **prismaiservices.ca** | Marketing site — Vite + React SPA, dark editorial theme | Netlify, auto-deploys on `main` push |
| **GitHub repo** | Source of truth for the marketing site | github.com/Pieter2023/prism-ai-site |
| **VPS** | Hostinger Ubuntu 24.04 — srv1302518.hstgr.cloud (76.13.106.105). Idle as of Apr 27 2026 — formerly hosted OpenClaw agents (now decommissioned). | — |

## Service Tiers (locked)
### Website Building (live at /websites)
| Tier | Price (CAD) | Timeline |
|------|-------------|----------|
| Essential | **$4,500** | 2 weeks |
| Professional | **$7,500** | 3–4 weeks |
| Premium | **$10,000–$12,500** | 4–6 weeks |
| Care plan | **$350 / month** | Ongoing, cancel anytime |

### AI Automation (live at /pricing)
| Tier | Price (CAD) | Timeline |
|------|-------------|----------|
| AI Receptionist | **$4,500** | 2–3 weeks |
| Workflow Automation | **$7,500** | 3–6 weeks |
| Custom AI System | Quoted | Scoped together |

## Brand
- **Glyph:** Prism ring — six spectrum wedges (violet → indigo → cyan → green → amber → rose) around a hollow centre. Lives at `src/components/PrismLogo.tsx`. Inline SVG, scales to favicons + OG card.
- **Favicon:** `public/favicon.svg` + 32px / 180px PNGs.
- **OG card:** `public/og-default.svg`.
- **Type:** Geist (sans), Instrument Serif (display italic), Geist Mono.
- **Accent:** `#3b5cff` (`--accent` / `--spec-indigo`).
- **External profiles still pending glyph update:** GBP photo, LinkedIn company avatar.

## Repo Quick Reference
| Path | Purpose |
|------|---------|
| `src/App.tsx` | Routes |
| `src/components/Navbar.tsx` | Top nav (Services, Websites, Pricing, Blog, About, Audit, Contact) |
| `src/components/Footer.tsx` | Footer |
| `src/components/PrismLogo.tsx` | Brand glyph + wordmark |
| `src/pages/LandingPage.tsx` | Homepage |
| `src/pages/WebsitesPage.tsx` | /websites — Website Building service brochure |
| `src/pages/PricingPage.tsx` | /pricing — AI Automation tiers + Websites callout |
| `src/index.css` | Design system + page-scoped CSS (`.websites-page` block) |
| `index.html` | SEO meta + JSON-LD ProfessionalService |
| `public/sitemap.xml` | Sitemap (priority 0.9 on /websites) |
| `public/robots.txt` | Points to sitemap |
| `netlify.toml` | Build config + SPA catch-all redirect |

## Local Dev
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc -b && vite build → dist/
```
Push to `main` → Netlify auto-deploys.

## Critical Rules
- **Website tiers locked:** Essential **$4,500** / Professional **$7,500** / Premium **$10,000–$12,500 CAD**. Care plan **$350/mo**. Don't quote elsewhere without confirming.
- **Brand glyph is the prism ring** (six spectrum wedges + ink-0 hole). Triangle PrismLogo retired Apr 27 2026.
- **Canadian English only** (colour, not color).
- **Email:** pieter@prismaiservices.ca (never hello@prism-ai.com).
- **CTA wording:** "Book a Free Strategy Call" (never "free 4-week pilot").
- **CSS scoping for /websites:** All page-specific styles are nested under `.websites-page` in `src/index.css`. Don't introduce bare `.tier-grid` / `.process-grid` rules globally — those are already used by `PricingPage.tsx` and `landing/Process.tsx` with their own inline styles.

## Decommissioned (Apr 27 2026)
The following are no longer in use for Prism AI. Don't propose them in future sessions; don't assume they're available.
- **OpenClaw** — agent platform on the VPS. All Prism AI agents (xbot, blog-writer, daily-briefer, image workflow) wound down.
- **X / Twitter (@AutoClaw_AI)** — developer account cancelled. No more automated posting; outcomes weren't worth it.
- **xbot v2** — signal-first posting strategy, image workflow, content bank — all dormant.
- **blog-writer** — no longer auto-publishing Tuesday posts. Existing posts on the blog remain live.
- **daily-briefer** — no more 6 AM PST WhatsApp briefings.
- **WhatsApp gateway / 440 recovery / openclaw-gateway.service / xurl / xsearch.py** — historical only.

VPS files at the repo root (`xbot-v2/`, `xbot-image-workflow.py`, `test-image-workflow.sh`, `oc-fix.sh`, `memory/`, `CONTEXT_SNAPSHOT*.md`) are gitignored — they live on disk but aren't part of the deployed site.

## Preferences
- Confirm before any change that alters existing setup
- List specifically what would be impacted/lost before any destructive change
- Concise implications for critical changes
- Ask if outside defined rules
