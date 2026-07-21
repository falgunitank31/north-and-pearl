# Organic Marketing Sprint Report

Date: 2026-07-20

Role: Organic Growth Director.

Scope: ecommerce SEO, AEO, GEO, AI-search optimization, content architecture, Shopify SEO planning, internal linking, organic Pinterest, organic Shopping readiness, and organic conversion support.

Out of scope: paid ads, paid media, SMS, paid influencer campaigns, Shopify publishing, app installs, account settings, payment settings, customer settings, domain settings, and unsupported product/material/legal/shipping claims.

## Context

- Active catalog cleanup is complete per user context.
- Active catalog contains 42 products per `reports/product-seo-catalog-audit.md`.
- Product SEO audit reports no script-detected issues.
- 12 one-image products were drafted and should remain out of active acquisition focus until image/source verification is complete.

## Sprint Package Completed

- Built claim-safe collection copy execution plan for the 12 priority active collections.
- Drafted collection intro copy, bottom SEO copy, FAQ blocks, internal links, and implementation checklist.
- Created organic Pinterest board strategy, pin templates, destination URL map, first 30 pin concepts, workflow, and measurement plan.
- Created a 30-day organic launch calendar.
- Created first 5 detailed organic content briefs.
- Created internal-linking execution checklist covering homepage, collections, guides, and products.

## Files Changed

- `content/seo/collection-copy-execution-plan.md`
- `content/seo/organic-pinterest-plan.md`
- `content/seo/30-day-organic-launch-calendar.md`
- `content/blogs/content-briefs.md`
- `content/seo/internal-linking-execution-checklist.md`
- `reports/organic-marketing-sprint-2026-07-20.md`

## Safe Theme Or Content Implementation Recommended Next

Do not publish without orchestration. The safest next implementation path is content/admin work rather than theme code:

1. Add homepage SEO title and meta description in Shopify admin if still missing.
2. Update collection descriptions for Gifts, Best Sellers, Necklaces, Bracelets, Mother's Collection, Wedding & Bridesmaids, Birthstone Jewelry, Name Necklaces, Initial Necklaces, Couple Jewelry, Rings, and Earrings.
3. Add visible FAQ blocks to Gifts, Best Sellers, Necklaces, Bracelets, Mother's Collection, Wedding & Bridesmaids, Birthstone Jewelry, Name Necklaces, and Initial Necklaces before adding FAQ schema.
4. Expand AI Brand Information with approved internal links to priority collections and support pages.
5. Add guide links from collections after each guide is ready or published.

Theme-code recommendations for later coordination:

- Consider a reusable collection FAQ section if existing Shopify sections cannot add visible, collection-specific FAQ blocks cleanly.
- Consider CollectionPage schema only after visible collection copy and FAQs are stable.
- Align duplicate Organization schema and brand naming only with theme owner approval.

## Claim Safety Review

The sprint package uses conservative language:

- `birthstone-inspired` instead of verified stone claims.
- `opal-style`, `crystal-style`, `pearl-style`, and visual-style language where needed.
- `curated edit` instead of unverified best-seller status.
- `where supported` and `review product details` for personalization.
- No delivery guarantees, review claims, material claims, or product performance claims were added.

## Validation

- `git diff --check` passed.
- Restricted-claim scan completed. Restricted terms appear only in claim-safety guardrails, avoid lists, or direct FAQ answers that say not to assume those claims.
- No Shopify CLI, admin mutation, theme deployment, publishing, app install, paid channel action, or customer/account/domain/payment setting change was run.
- An untracked `scripts/apply-organic-collection-copy.mjs` file exists in the working tree and appears designed to update Shopify collection copy through the Shopify CLI. It was inspected but not executed or modified as part of this sprint.

## Risks And Missing Information

- Supplier-verified materials, stones, finishes, sizing, care limits, allergy/safety claims, and durability facts remain UNKNOWN.
- Shopify admin implementation state for collection descriptions and homepage metadata is UNKNOWN.
- Search Console, Pinterest, analytics, ranking, traffic, revenue, and conversion data remain UNKNOWN.
- Product image source verification and rights should remain part of product operations.
- Wedding timing, shipping timelines, return rules, and packaging promises need owner/policy confirmation before stronger claims.
