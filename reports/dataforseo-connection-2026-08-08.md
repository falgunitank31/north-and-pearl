# DataForSEO Connection Report - 2026-08-08

## Status

`DATAFORSEO_CONNECTION = BLOCKED_PENDING_CREDENTIALS`

The official local DataForSEO MCP workflow is prepared for North & Pearl, but live connectivity cannot be validated until API credentials are added securely.

## What Was Configured

- MCP registration added to the active Codex config via `[mcp_servers.dataforseo]`.
- Local wrapper created at `~/.codex/bin/dataforseo-mcp.sh`.
- Wrapper reads credentials from secure environment variables or `~/.config/codex-seo/dataforseo.env`.
- DataForSEO field config installed at `~/.codex/skills/seo/dataforseo-field-config.json`.
- Non-secret credential template created at `~/.config/codex-seo/dataforseo.env.example`.
- Cost controls configured with the Codex SEO DataForSEO cost ledger.

## Security

No credentials were written to:

- Git.
- Shopify.
- Theme files.
- Project reports.
- `AGENTS.md`.
- `SPRINT.md`.
- `BACKLOG.md`.
- Chat output.

The current environment does not contain `DATAFORSEO_USERNAME` or `DATAFORSEO_PASSWORD`.

## Cost Controls

- Mode: threshold.
- Approval threshold: `$0.10`.
- Daily limit: `$2.00`.
- Current 7-day spend: `$0.00`.
- Current 7-day call count: `0`.

Every DataForSEO call must run cost estimation first and cost logging after successful completion.

## Validation

Validation performed:

- Wrapper executable exists.
- Codex config includes one DataForSEO MCP entry.
- Field config exists.
- Missing-credential behavior returns a nonzero exit and a clear setup-required message.
- No DataForSEO API call was made.

## Next Step

Add the DataForSEO API credentials securely, then restart/reload Codex so the MCP tools become available:

```bash
cp ~/.config/codex-seo/dataforseo.env.example ~/.config/codex-seo/dataforseo.env
chmod 600 ~/.config/codex-seo/dataforseo.env
```

Then edit `~/.config/codex-seo/dataforseo.env` with the DataForSEO API login and API password.

After reload, Faraday should run one low-cost connection test, log the cost, and begin the North & Pearl Organic Market Opportunity Baseline.

## First DataForSEO Project Queue

Project:

- `North & Pearl Organic Market Opportunity Baseline`

Scope:

- United States.
- English.
- Commercial jewelry demand.
- Search intent and keyword volume.
- SERP competitors.
- Product and collection opportunity mapping.
- Gift and seasonal query opportunities.

Guardrail:

- Map opportunities to existing North & Pearl products, collections, homepage, and gift guides first.
- Do not create new pages simply because keywords exist.
