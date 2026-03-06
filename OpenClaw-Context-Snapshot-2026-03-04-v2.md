# OpenClaw Context Snapshot — 2026-03-04 v2
> **Generated:** 2026-03-04 ~23:00 UTC | **Use this in any new thread for full context**

---

## 1. VPS / Infrastructure

| Item | Value |
|------|-------|
| Host | `srv1302518.hstgr.cloud` |
| IP | `76.13.106.105` |
| OS | Ubuntu 24.04 LTS |
| User | `piet` |
| RAM | 7.8 Gi total · 1.4 Gi used · 6.3 Gi available |
| Swap | **0 B** (none configured) |
| Timezone | UTC on server; Pieter is SAST (UTC+2) |

---

## 2. OpenClaw Version & Services

### Version
```
OpenClaw 2026.3.2 (85377a2)
builtAt: 2026-03-03T04:36:41Z
/usr/lib/node_modules/openclaw/dist/build-info.json
```

### Services

| Service | Unit file | Port | Status |
|---------|-----------|------|--------|
| **Gateway** | `/etc/systemd/system/openclaw-gateway.service` | `18789` | ✅ active (since 22:19 UTC) |
| **Node** | `~/.config/systemd/user/openclaw-node.service` | — | ✅ active (since 22:48 UTC) |

**Gateway ExecStart (critical — do not change):**
```ini
ExecStart=/usr/bin/openclaw gateway --bind loopback --port 18789 --force --auth none
```
The `--auth none` flag is mandatory. The env var `OPENCLAW_AUTH_MODE=none` does NOT work — only the CLI flag is honoured.

### openclaw.json config note ⚠️
`~/.openclaw/openclaw.json` is configured to connect to `ws://127.0.0.1:18790` (the old user-level gateway, no longer running). All `openclaw agent` CLI invocations therefore fall back to **embedded mode** automatically. This is non-critical — everything works — but if you ever want agents to use the system gateway directly, update openclaw.json port to `18789`.

---

## 3. Agents (12 registered)

| Agent | Identity | Workspace | Model |
|-------|----------|-----------|-------|
| **main** (default) | Jensen | `~/clawd` | `openai-codex/gpt-5.2-codex` |
| council | Council | `~/.openclaw/workspaces/council` | `openai-codex/gpt-5.2-codex` |
| coder | Coder | `~/.openclaw/workspaces/coder` | `openai-codex/gpt-5.2-codex` |
| prompt_sync | Prompt Sync | `~/.openclaw/workspaces/prompt_sync` | `openai-codex/gpt-5.2-codex` |
| crm | CRM | `~/.openclaw/workspaces/crm` | `openai-codex/gpt-5.2` |
| fast | Fast | `~/.openclaw/workspaces/fast` | `openai-codex/gpt-5-mini` |
| marius | Marius | `~/.openclaw/workspaces/marius` | `openai-codex/gpt-5.3-codex` |
| bertus | Bertus | `~/.openclaw/workspaces/bertus` | `ollama/qwen2.5-coder:32b` |
| donkey | Donkey | `~/.openclaw/workspaces/donkey` | `ollama/qwen2.5-coder:32b` |
| **xbot** | — | `~/.openclaw/workspaces/xbot` | `openai-codex/gpt-5.2-codex` |
| **prism-seo** | Prism SEO Agent | `~/.openclaw/workspaces/prism-seo` | `openai-codex/gpt-5.3-codex` |
| **blog-writer** | — | `~/.openclaw/workspaces/blog-writer` | `openai-codex/gpt-5.2-codex` |

**Jensen's WhatsApp:** `+27847025272`
**Jensen's active session file:** `~/.openclaw/agents/main/sessions/d19f7aa6-d371-4066-954b-3f742c82ce62.jsonl`
(Created 2026-02-26, patched 2026-03-04 — see §6 for history)

---

## 4. Cron Jobs (piet's crontab)

| Schedule | UTC | SAST | Script | Status |
|----------|-----|------|--------|--------|
| `*/5 * * * *` | Every 5 min | Every 5 min | `openclaw-watchdog.sh` | Script dated Feb 20 |
| `*/30 * * * *` | Every 30 min | Every 30 min | `xbot-heartbeat.sh` | ✅ Completing (exit: 0) |
| `0 3 * * *` | 03:00 | 05:00 | `openclaw-backup.sh` | ✅ Ran today (176KB log) |
| `30 3 * * *` | 03:30 | 05:30 | `openclaw-github-sync.sh` | Not verified |
| `30 4 * * *` | 04:30 | **06:30** | `daily-briefer-heartbeat.sh` | ⏳ First post-fix run tonight |
| `0 8 * * *` | 08:00 | 10:00 | `prism-seo-heartbeat.sh` | No log yet (post-fix) |
| `0 9 * * 2` | 09:00 Tue | 11:00 Tue | `blog-writer-heartbeat.sh` | No log yet (next Tuesday) |
| `@reboot` | On boot | On boot | `start-stripe-webhook.sh` | Running |

---

## 5. How Each Heartbeat Script Works

### xbot-heartbeat.sh (`*/30 * * * *`)
- Sends autonomous HEARTBEAT message to xbot agent via `openclaw agent --agent xbot`
- Timeout: `120000` ms (120 seconds)
- Falls back to embedded mode (openclaw.json points to 18790)
- Log: `~/.openclaw/workspaces/xbot/memory/heartbeat.log`
- xbot has memory logs from 2026-02-24 through present
- **Last confirmed runs:** 22:00:01 and 22:30:01 UTC Mar 4 → exit: 0 ✅

### daily-briefer-heartbeat.sh (`30 4 * * *` = 6:30 AM SAST)
- **Pure shell script** — no separate "daily-briefer" agent exists
- Reads xbot's `queue.md` for Tier 2 / Tier 3 pending approval items
- Constructs message with: XBOT_BLOCK, PRISMSEO_BLOCK, BLOG_BLOCK (Tuesday-aware), QUEUE_SECTION
- Sends via: `openclaw agent --channel whatsapp --to +27847025272 --deliver --timeout 30000`
- Log: `~/.openclaw/workspaces/daily-briefer/memory/cron.log`
- **Status:** No runs yet since auth fix (04:30 UTC hasn't passed today)

### prism-seo-heartbeat.sh (`0 8 * * *` = 10:00 AM SAST)
- Triggers prism-seo agent, gpt-5.3-codex
- No log since auth fix was applied (runs after 22:19 UTC when fix took effect)

### blog-writer-heartbeat.sh (`0 9 * * 2` = Tuesdays 11 AM SAST)
- Tuesday-only. Next run: Tuesday 2026-03-10 at 09:00 UTC

### openclaw-backup.sh (`0 3 * * *` = 5:00 AM SAST)
- Daily backup to `~/backups/openclaw/`
- Last run: 2026-03-04 03:00 UTC → 176KB log ✅

---

## 6. History of Issues & Fixes Applied

### Fix 1 — Gateway auth (applied ~2026-03-03, prior session)
**Problem:** Gateway defaulted to token-based auth. 8,633 `token_mismatch` errors accumulated.
**Root cause:** Dual gateways — user-level (port 18790) AND system-level (port 18789) were both running, and neither had `--auth none`.
**Fix:** Added `--auth none` to system gateway ExecStart in `/etc/systemd/system/openclaw-gateway.service`. Stopped and disabled user-level gateway.
**Result:** Zero new `token_mismatch` errors since 22:19 UTC 2026-03-04. ✅

### Fix 2 — Jensen version string (applied 2026-03-04 this session)
**Problem:** Jensen was reporting `26.2.23 (b817600)` instead of `2026.3.2 (85377a2)`.
**Root cause:** Jensen's session file `d19f7aa6.jsonl` (created 2026-02-26) had **42 historical tool-result messages** containing the old version string from before the upgrade. These 42 in-context messages overrode any new instruction, including `CLAUDE.md`.
**Fix attempt 1:** Created `~/clawd/CLAUDE.md` with authoritative version — FAILED (42 contradicting messages too strong).
**Fix attempt 2:** Surgical `sed` replace on the session JSONL file:
```bash
# Backup first
cp d19f7aa6.jsonl d19f7aa6.jsonl.bak-2026-03-04

# Stop node, patch, restart
systemctl --user stop openclaw-node
sed -i 's/26\.2\.23/2026.3.2/g; s/b817600/85377a2/g' d19f7aa6.jsonl
systemctl --user start openclaw-node
```
Post-patch verification: `26.2.23` = 0 occurrences, `2026.3.2` = 44 occurrences ✅
**Result:** Jensen now correctly reports `2026.3.2`. Backup preserved at `d19f7aa6.jsonl.bak-2026-03-04`. ✅

---

## 7. Current Status Summary (as of 2026-03-04 ~23:00 UTC)

| Component | Status | Notes |
|-----------|--------|-------|
| openclaw-gateway | ✅ active | Port 18789, `--auth none`, no new auth errors |
| openclaw-node | ✅ active | v2026.3.2 confirmed |
| Jensen (main) | ✅ active | WhatsApp responding, version correct |
| xbot heartbeat | ✅ working | exit: 0 at 22:00 & 22:30 UTC |
| daily-briefer | ⏳ pending | First post-fix run at 04:30 UTC tonight |
| prism-seo | ⏳ pending | Runs 08:00 UTC daily |
| blog-writer | ⏳ pending | Runs Tuesdays 09:00 UTC |
| backup | ✅ ran today | 03:00 UTC, 176KB |
| Memory | ✅ healthy | 6.3Gi available |

---

## 8. Key File Paths

```
/etc/systemd/system/openclaw-gateway.service    ← system gateway (do not edit without care)
~/.config/systemd/user/openclaw-node.service    ← user node service
~/.openclaw/openclaw.json                        ← config (gateway port currently 18790 — cosmetic issue)
~/clawd/CLAUDE.md                               ← Jensen's version override guardrail
~/.openclaw/agents/main/sessions/d19f7aa6-d371-4066-954b-3f742c82ce62.jsonl  ← Jensen's active session
~/.openclaw/agents/main/sessions/d19f7aa6-*.jsonl.bak-2026-03-04             ← session backup
~/.openclaw/workspaces/xbot/memory/heartbeat.log ← xbot cron run log
~/.openclaw/workspaces/xbot/memory/queue.md      ← xbot Tier 2/3 approval queue
~/.openclaw/workspaces/daily-briefer/memory/cron.log ← daily briefer log
~/backups/openclaw/backup.log                   ← latest backup log (176KB, Mar 4)
/var/log/openclaw-gateway.log                   ← gateway log (auth errors, WhatsApp traffic)
```

---

## 9. Known Non-Critical Issues (no action required unless specified)

1. **openclaw.json port 18790** — Config points to old user gateway. Agents fall back to embedded mode. Works fine. Low priority to fix.
2. **No swap** — 0B swap configured. Currently 6.3Gi free RAM, so not an issue now. Worth adding swap if RAM usage grows (ollama models — bertus/donkey — are memory-heavy when loaded).
3. **Jensen long-running session** — d19f7aa6 has been active since Feb 26. If version/context drift recurs, patching the session or starting a fresh one is the remedy. Backup kept at `.bak-2026-03-04`.
4. **xbot "Killed" in last cron log** — The cron check showed a Killed error for xbot. This was from a pre-auth-fix run. Post-fix heartbeat runs (22:00, 22:30 UTC) completed exit: 0. Non-issue going forward.

---

## 10. Quick Diagnostic Commands

```bash
# Service health
systemctl is-active openclaw-gateway && systemctl --user is-active openclaw-node

# Version check
openclaw --version

# Last 20 gateway log lines (auth errors, WhatsApp activity)
tail -20 /var/log/openclaw-gateway.log

# xbot heartbeat recent runs
tail -10 ~/.openclaw/workspaces/xbot/memory/heartbeat.log

# Daily briefer log
tail -20 ~/.openclaw/workspaces/daily-briefer/memory/cron.log

# Crontab
crontab -l

# Memory
free -h

# Jensen session size
wc -l ~/.openclaw/agents/main/sessions/d19f7aa6*.jsonl
```

---

*Snapshot generated by Claude (Cowork) on 2026-03-04. For issues or questions: pieter@houseofrealtors.co.za*
