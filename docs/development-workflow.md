# Development Workflow

## Phase 0 Workflow

1. Confirm repository access.
2. Establish governance files.
3. Define branch and worktree strategy.
4. Confirm Shopify development theme strategy.
5. Confirm approval workflow.
6. Do not write production theme code until approved.

## Branch Strategy

- `main`: stable approved source.
- `develop`: integration branch for approved work.
- `agent/website-architect`: storefront implementation.
- `agent/seo-ai`: SEO, schema, AI-ready content requirements.
- `agent/product-catalog`: product data and merchandising structure.
- `agent/brand`: brand system and design direction.
- `agent/operations`: policies and operational SOPs.
- `agent/data`: analytics and measurement planning.
- `agent/marketing`: campaign and launch strategy.
- `agent/supplier`: sourcing and supplier research.

## Worktree Strategy

Each specialist agent should use a separate Git worktree when supported. Agents must not edit the same file at the same time.

## Review Flow

1. Agent works on isolated branch/worktree.
2. Agent documents changes, dependencies, and risks.
3. Lead Orchestrator reviews conflicts and readiness.
4. Owner approval is requested for production-impacting changes.
5. Approved work merges into `develop`.
6. Stable, reviewed work merges into `main`.

## Shopify Theme Flow

1. Build theme changes in Git.
2. Connect to unpublished Shopify development theme only.
3. Preview and QA.
4. Publish only after separate launch approval.
