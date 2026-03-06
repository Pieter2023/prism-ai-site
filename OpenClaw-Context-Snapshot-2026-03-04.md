# OpenClaw Context Snapshot — 2026-03-04 (22:00 SAST)

## Environment
- **Host**: Hostinger VPS (76.13.106.105 / srv1302518.hstgr.cloud)
- **OS**: Ubuntu 24.04 LTS
- **User**: piet
- **OpenClaw version**: 2026.3.2 (npm global install)
- **Agent model**: openai-codex/gpt-5.2-codex
- **Jensen workspace**: ~/clawd

## Service Status (all healthy)
| Service | Type | Status | Details |
|---------|------|--------|---------|
| openclaw-gateway | system (systemd) | **active** | PID 2541472, port 18789, loopback only |
| openclaw-node | user (systemd) | **active** | v2026.3.2 |
| WhatsApp | gateway channel | **listening** | +27847025272, personal inbound |

## Key Config Files

### `/etc/systemd/system/openclaw-gateway.service`
```ini
[Unit]
Description=OpenClaw Gateway
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=piet
EnvironmentFile=/etc/openclaw.env
WorkingDirectory=/home/piet
ExecStart=/usr/bin/openclaw gateway --bind loopback --port 18789 --force --auth none
Restart=always
RestartSec=2
StandardOutput=append:/var/log/openclaw-gateway.log
StandardError=append:/var/log/openclaw-gateway.log

[Install]
WantedBy=multi-user.target
```

### `/etc/openclaw.env`
```
OPENAI_MODEL=codex-5.2
MODEL=codex-5.2
LLM_MODEL=codex-5.2
#OPENCLAW_GATEWAY_TOKEN=e464932c11e88f41afb3b0790ef183c85afb8eb0489c16bd8ff56e182e87aeda
OPENCLAW_AUTH_MODE=none
OLLAMA_HOST=http://100.123.171.65:11434
OLLAMA_API_KEY=ollama
```

### `~/.config/systemd/user/openclaw-node.service`
- Version: v2026.3.2
- ExecStart: `/usr/bin/node /usr/lib/node_modules/openclaw/dist/index.js node run --host 127.0.0.1 --port 18789`

### `~/.openclaw/node.json`
```json
{
  "version": 1,
  "nodeId": "de591901-52c2-4481-8f9d-9c52e1fd893e",
  "displayName": "srv1302518",
  "gateway": { "host": "127.0.0.1", "port": 18789, "tls": false }
}
```

### Device Identity
- **deviceId**: `4f06aa8f897463e918da22ae8316b185605ca7097732dfea059894926ba98c05`
- **paired.json** operator token: `m6fJVVtXz90XPGbnYom_BG4aBQ47AnBWzmbnB3zBjJk`
- **paired.json** node token: `hRikeHir5JMR1FbM71X9zzVY_ObhfPZBNGbOqULs8NU`

## Daily Briefer
- **Cron**: `30 4 * * *` (6:30 AM SAST daily)
- **Script**: `/home/piet/daily-briefer-heartbeat.sh`
- **Sends via**: `openclaw agent --channel whatsapp --to +27847025272 --deliver --timeout 30000`
- **Log**: `~/.openclaw/workspaces/daily-briefer/memory/cron.log`
- **Status**: Cron intact, was failing since Feb 27 due to gateway auth issues. Should auto-resume tomorrow 6:30 AM SAST now that gateway auth is fixed.

## Agent Memory Databases
Located in `~/.openclaw/memory/`:
bertus, main, council, coder, fast, donkey, prompt_sync, marius, crm (all .sqlite)

## What Was Fixed (March 4, 2026)

### Root Cause Chain
1. **openclaw-node.service** was pinned to v2026.2.23 while the npm package was updated to v2026.3.2 → Fixed: updated ExecStart path
2. **Dual-gateway conflict**: User-level gateway on port 18790 + system-level gateway on port 18789 running simultaneously → Fixed: stopped, disabled, deleted user-level gateway service, daemon-reloaded
3. **Persistent token_mismatch**: Gateway defaulting to token auth despite `OPENCLAW_AUTH_MODE=none` env var (env var not honoured by CLI) → Fixed: added `--auth none` CLI flag to ExecStart

### Changes Made
| What | Before | After |
|------|--------|-------|
| Gateway ExecStart | `--port 18789 --force` | `--port 18789 --force --auth none` |
| User gateway service | Active on port 18790 | Deleted (`~/.config/systemd/user/openclaw-gateway.service`) |
| Node service version | v2026.2.23 entrypoint | v2026.3.2 entrypoint |
| Node tokens | Rotated multiple times | Current tokens in paired.json/device-auth.json |

### Verified Working
- Gateway starts cleanly with `auth mode=none`
- No token_mismatch errors after restart
- WhatsApp channel connected and listening
- Device auto-pairing functional
- Node service active and connected
- `openclaw doctor` reports no gateway/auth issues

## Known Non-Critical Items
- `openclaw doctor` suggests setting `NODE_COMPILE_CACHE` and `OPENCLAW_NO_RESPAWN=1` for startup optimization
- 1/5 recent sessions missing transcripts (minor state integrity issue)
- Gateway log at `/var/log/openclaw-gateway.log` contains ~8633 historical token_mismatch entries from the broken period — can be cleaned up with log rotation

## VPS Access
- **Web Terminal**: Hostinger VPS panel → Overview → Web Terminal
- **Sudo password**: Provided in previous sessions (user knows it)

## User Preferences (CRITICAL for future sessions)
When making changes to OpenClaw configurations or memory, never proceed without explicit confirmation if any existing setup would be lost or altered. When proposing changes, list specifically what would be impacted or lost. If actions fall outside defined rules, ask for input. Always provide concise, clear implications of critical changes, including which files or processes would be affected.
