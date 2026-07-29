# North & Pearl Agent Command Center

Open `docs/agent-command-center.html` in a browser to view the current agent operating dashboard.

North & Pearl now uses one same-thread heartbeat instead of separate scheduled Codex chats. The named agents are responsibility lanes coordinated by the Lead Orchestrator inside the current thread.

Regenerate it with:

```bash
node scripts/generate-agent-command-center.mjs
```

## Status Meanings

- `Updated Today`: the lane has evidence from today’s report or execution.
- `Waiting In Thread`: the lane is covered by the same-thread heartbeat, but its latest report is older than today.
- `No Report Yet`: the agent is scheduled, but no historical report exists yet.
- `Not Scheduled`: the same-thread heartbeat is missing or inactive.

## Active Daily Agents

- Faraday: organic growth, SEO/AEO/GEO, traffic and order paths.
- Gauss: product catalog growth, category balance, Alibaba/source traceability.
- Tesla: Shopify storefront QA and technical health.
- Rawls: analytics, KPI reporting, traffic and funnel diagnosis.
- Lovelace: operations and order-to-source mapping.
- Kuhn: ecommerce design and brand visual QA.
- Curie: supplier/source evidence and claim safety.
- Lead Orchestrator: daily ecommerce coordination and sprint control.

## Order Source Requirement

Lovelace and Gauss must preserve source traceability so when an order arrives, the owner can identify the correct Alibaba/source URL or source ID before purchasing stock for fulfillment. The monitor must not expose customer PII.
