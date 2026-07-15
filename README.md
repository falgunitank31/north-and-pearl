# North & Pearl

Official Shopify website project for North & Pearl, a premium personalized jewelry and meaningful gifting brand.

## Project Status

Phase 0 is active: access, tooling, repository workflow, project governance, and launch planning.

No live Shopify theme changes, domain changes, app installs, or publication actions are approved from this repository.

## Approved Workflow Direction

The preferred architecture is:

Codex agents -> isolated Git branches/worktrees -> GitHub repository -> Shopify GitHub integration -> unpublished development theme -> owner review -> publication only after explicit approval.

## Safety Rules

- Do not modify the live Shopify theme.
- Do not publish anything.
- Do not connect or change the production domain.
- Do not install Shopify apps without approval.
- Do not store passwords, API keys, tokens, payment information, or customer information.
- Do not copy competitor content, code, images, product names, policies, layouts, or branding.
- Do not make unsupported product, material, shipping, or fulfillment claims.
- Keep Shopify theme files at the repository root if Shopify GitHub integration is used.

## Repository Areas

- `docs/`: project governance, architecture, workflow, task board, decisions, risks, and launch planning.
- `brand/`: brand system, voice, visual direction, photography, and packaging direction.
- `content/`: product, collection, page, blog, policy, and SEO content planning.
- `research/`: competitor, supplier, market, and customer-insight research.
- `analytics/`: measurement plan, event taxonomy, and KPI framework.
- `operations/`: customer service, fulfillment, shipping, and returns SOPs.
