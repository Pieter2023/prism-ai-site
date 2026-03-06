# Deal Copilot

## What this project does

A lightweight consulting operations tool that helps freelancers and solo consultants price deals, guard scope, and generate client-ready emails. Four modules in a single-page tabbed interface:

1. **My Floor** — calculates a minimum sustainable hourly rate based on income goals, monthly overhead, tax/savings buffer, and billable hours per week. Persists settings in localStorage.
2. **Deal Check** — compares a proposed project fee against the floor rate and Canadian market benchmarks. Outputs a RED / AMBER / GREEN verdict with advice.
3. **Scope Guard** — auto-fills scope inclusions, exclusions, acceptance criteria, and a change-control clause based on the selected service type. Fully editable per deal.
4. **Send It** — generates copy-ready emails for four deal stages: first reply (sells paid discovery), proposal (three-tier options), change order, and monthly retainer pitch.

All pricing is in **CAD** with Canadian market benchmarks.

## Tech stack

- **Pure vanilla frontend** — HTML, CSS, JavaScript. No frameworks, no bundler, no build step.
- **Static hosting** — Netlify (config in `netlify.toml`, publish root is `.`).
- **No dependencies** — no `package.json`, no npm. Everything runs in the browser.
- **Fonts** — DM Sans via Google Fonts.

## File structure

```
.
├── index.html          # Single-page UI with 4-tab layout
├── app.js              # All application logic (~720 lines)
├── styles.css          # All styles (~570 lines), CSS custom properties
├── netlify.toml        # Netlify deploy config + security headers
├── .gitignore          # Ignores .netlify/
├── CLAUDE.md           # This file
└── .claude/
    ├── settings.json       # Claude Code env config
    └── settings.local.json # Local MCP server config
```

## Architecture notes

- `app.js` is a single self-contained script. No modules, no imports.
- All DOM element references are grabbed at the top of the file.
- Three form handlers: `floor-form` (submit), `deal-form` (submit), and `scope-form` (copy button).
- Tab navigation is driven by `data-tab` attributes and `data-goto` link buttons.
- `state` object holds floor rate, deal inputs, and verdict — carries data between tabs.
- Cache-busting is done via `?v=10` query strings on CSS and JS includes.
- Email generation is pure string concatenation (no templating library).
- localStorage key: `dealcopilot_floor`.

## Key constants

- `MARKET_DATA` — CAD price ranges for 4 service types (ai_platform, voicebot, automation, custom), each with freelancer/you/studio/monthly bands.
- `COMPLEXITY_MULTIPLIER` — low (0.75), medium (1.0), high (1.4).
- `SCOPE_TEMPLATES` — per-service-type default text for inclusions, exclusions, acceptance criteria.
- `CHANGE_ORDER_CLAUSE` — standard change-control language auto-filled for every deal.

## Key business logic

- `calculateFloor()` — `(targetIncome + yearlyOverhead) / (1 - taxRate) / (billableHours * 50)`. Uses 50 working weeks (2 weeks off).
- `checkDeal()` — computes implied hourly rate, fetches market ranges, determines verdict (RED / AMBER / GREEN), populates advice text.
- `getMarketRanges(serviceType, complexity)` — returns adjusted ranges by multiplying base `MARKET_DATA` by `COMPLEXITY_MULTIPLIER`.
- `updateScopeTemplates()` — fills scope textareas from `SCOPE_TEMPLATES` based on selected service type.
- `buildEmail(stage)` — generates subject + body for the selected deal stage. Uses deal state for client name, project summary, fee, tiers.
- Package tiers derived from proposed fee: Pilot (55%), Standard (100%), Premium (180%).
- Retainer tiers: Starter (max $500, 8% of fee), Growth (max $1000, 15%), Priority (max $2000, 25%).
- Discovery fee: `max($1,500, 15% of proposed fee)`.

## Verdict logic

- **RED** — proposed fee < 50% of market low, OR implied hourly < 85% of floor rate.
- **AMBER** — proposed fee < market low, OR implied hourly < floor rate.
- **GREEN** — everything else (healthy pricing).

## Design system

- CSS custom properties in `:root` — `--bg` (#f5f5f0), `--ink` (#1a1a1a), `--primary` (#0e6b62 teal), `--card` (white), `--line`, verdict colours (green/amber/red with background variants).
- Responsive breakpoint at 640px.
- Card-based layout for result and verdict sections.
- Tab bar with `.has-data` dot indicators showing which tabs have been filled.
- Verdict cards with coloured left border and tinted backgrounds.

## Coding conventions

- Vanilla JS only — no TypeScript, no JSX, no frameworks.
- Functions are standalone (not class-based).
- `fmt(n)` formats numbers as CAD currency via `Intl.NumberFormat("en-CA")`.
- Guard checks use `if (element)` before DOM writes.
- Semicolons used consistently.

## Deployment

- Push to the connected Git repo and Netlify auto-deploys.
- No build command needed — the publish directory is the project root.
- Security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy) are set in `netlify.toml`.

## When making changes

- Bump the `?v=` cache-buster on `styles.css` and `app.js` includes in `index.html` after changes.
- Test all four email stages after modifying `buildEmail()`.
- Verify CAD formatting after touching `fmt()`.
- Keep everything in a single HTML + single JS + single CSS file structure.
- Test tab navigation and `has-data` indicators after changing tab logic.
- Verify localStorage persistence of floor settings between page reloads.
