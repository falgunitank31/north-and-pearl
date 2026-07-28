# North & Pearl Agent Command Center

Open `docs/agent-command-center.html` in a browser to view the current agent operating dashboard.

Regenerate it with:

```bash
node scripts/generate-agent-command-center.mjs
```

## Status Meanings

- `Working`: the agent has an active schedule and produced today’s expected report.
- `Scheduled Today`: the agent has an active schedule, but its run time has not passed yet.
- `Needs Update`: the agent has an active schedule, its run time has passed, and today’s expected report is missing.
- `No Report Yet`: the agent is scheduled, but no historical report exists yet.
- `Not Scheduled`: the automation is missing or inactive.

## Active Daily Agents

- Faraday: organic growth, SEO/AEO/GEO, traffic and order paths.
- Gauss: product catalog growth, category balance, Alibaba/source traceability.
- Tesla: Shopify storefront QA and technical health.
- Rawls: analytics, KPI reporting, traffic and funnel diagnosis.
- Lovelace: operations and order-to-source mapping.
- Lead Orchestrator: daily ecommerce coordination and sprint control.

## Order Source Requirement

Lovelace and Gauss must preserve source traceability so when an order arrives, the owner can identify the correct Alibaba/source URL or source ID before purchasing stock for fulfillment. The monitor must not expose customer PII.
