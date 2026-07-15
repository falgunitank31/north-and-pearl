# Architecture

## Recommended Architecture

Option A is the selected target architecture:

Codex App agents -> isolated Git worktrees -> private GitHub repository -> Shopify GitHub integration -> unpublished Shopify development theme -> owner review -> publication only after approval.

## Rationale

This workflow provides the best balance of safety, collaboration, rollback, and Shopify compatibility. It keeps GitHub as the source of truth, allows specialist agents to work in isolation, and protects the live Shopify storefront until final approval.

## Shopify Theme Layout

If Shopify GitHub integration is used, Shopify theme files must remain at the repository root:

- `assets/`
- `config/`
- `layout/`
- `locales/`
- `sections/`
- `snippets/`
- `templates/`

Project planning and non-theme assets live in supporting folders:

- `docs/`
- `brand/`
- `content/`
- `research/`
- `analytics/`
- `operations/`

## Deployment Boundary

No commit or branch should be connected directly to a live published Shopify theme during build. Shopify should connect to an unpublished development theme until launch approval.
