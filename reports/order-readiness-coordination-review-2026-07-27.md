# North & Pearl Order Readiness Coordination Review - 2026-07-27

Owner: Lead Orchestrator  
Operating source of truth: `docs/order-readiness-orchestration-plan.md`  
Goal: prepare North & Pearl to start generating orders next month through aligned product, website, marketing, operations, analytics, and technical execution.

## Executive Judgment

North & Pearl is conditionally close to order readiness on the shopper-facing storefront and active product path. Merchant Center product approval and Search Console access are now verified, but scaled order generation still depends on operational policy decisions, product-source confidence, and measurement baselines.

The active buying path has positive evidence: 118 active product pages passed live QA, product pages returned HTTP 200, active products had prices and available variants, and add-to-cart passed. The homepage and navigation were recently changed to be more product-forward, empty collection links were removed from the header, and guide-to-collection/internal-link work is in progress.

The main blockers are outside simple theme polish: Search Console has only discovered/indexed a small number of pages so far, Merchant Center still shows optional shipping/returns enhancement prompts even though product diagnostics are approved, owner decisions are still needed for final shipping, returns, support, fulfillment, and pricing policy, and product source/media risk still needs human review.

## Current Order-Readiness Scorecard

| Area | Owner | Current Status | Evidence | Order Readiness |
| --- | --- | --- | --- | --- |
| Storefront UX | Kuhn/Tesla | Mostly ready, needs visual/policy polish | Homepage redesign uses real product imagery, populated collection cards, Best Sellers/New Arrivals grids; navigation now commerce-focused; live smoke checks passed. | Green/yellow |
| Product catalog | Gauss | Conditionally ready for current active catalog | 118 active products audited; product SEO audit showed no script-detected issues; live PDP QA passed; 2 limited galleries and 23 image-size-review products remain. | Yellow |
| Organic traffic | Faraday | In progress, not yet performance-proven | P0/P1 Search Console URL list exists; sitemap was submitted; homepage, Best Sellers, Birthstone Jewelry, and top gift guide recrawl/indexing requests were confirmed; 12 commercial collections have contextual guide links. | Yellow |
| Analytics | Rawls | Partially verified, not performance-proven | GA4 loader exists with measurement ID `G-14KCZE935H`; Search Console access is verified; Search Console currently reports 0 clicks, 2 indexed pages, and 0 not-indexed pages. GA4 event receipt, ecommerce events, Shopify Analytics funnel data, and baselines still need review. | Yellow |
| Operations | Lovelace | Draft-ready, not launch-final | Shipping and returns pages are live but intentionally conservative. Merchant Center prioritized fixes are resolved, but optional shipping/return policy enhancements need exact business rules before configuration. | Yellow |
| Technical QA | Tesla | Storefront product/cart path currently passing | Theme Check passed in recent reports; 118/118 live PDP checks passed; `/cart/add.js` test passed; no failed product checks in latest storefront QA. | Green/yellow |

## Top Blockers To Orders

1. Search Console discovery is early. The property is verified and clean, but only 2 pages are indexed so far; sitemap processing initially showed `Couldn't fetch` even though the public sitemap returns HTTP 200.
2. Operations policy decisions are still unresolved. Support email, response window, return window, personalized/custom return treatment, fulfillment workflow, supplier production windows, QC, and exception handling need final owner/legal/fulfillment confirmation.
3. Product source and media assurance is not fully complete. Two active products have only 3 images, 23 have image-size-review flags, 12 older source-risk drafts should remain draft, and supplier claims remain unverified unless exact documentation exists.
4. Compare-at pricing policy is unresolved. All active products have compare-at pricing; visible sale badges were suppressed, but the underlying promotion/price policy still needs a business decision.
5. Measurement baselines are not performance-proven. GA4 code is present and Search Console access works, but event receipt, ecommerce event quality, Shopify funnel data, and baseline reporting still need Rawls review.

## Top 5 Tasks For Next Execution Window

1. Rawls + Tesla: verify GA4 Realtime/DebugView, Shopify Analytics funnel reporting, and ecommerce event receipt. Record only verification state and baseline availability, not performance claims.
2. Lovelace + owner: finalize support email, response window, shipping promise, standard/custom return rules, fulfillment workflow, QC procedure, and support escalation macros.
3. Faraday + Rawls: re-check Search Console sitemap processing and P0 URL status after Google has time to crawl the newly submitted sitemap and requested URLs.
4. Gauss + Kuhn: complete human visual/source QA for the two limited-gallery active products first, then the 23 image-size-review products; keep source-risk drafts inactive.
5. Owner + Faraday + Tesla + Lovelace: confirm Merchant Center/Google & YouTube sales channel account state: domain claim, shipping, returns, tax/business identity, feed identifier strategy, and unresolved needs-attention warnings.

## Agent Handoffs Needed

- Faraday -> Rawls: provide P0/P1 URL priority list and internal-linking changes so Rawls can verify index coverage and organic baseline.
- Faraday -> Kuhn: send the 10 Pinterest draft concepts for vertical creative review before any publishing or scheduling.
- Faraday -> Gauss: confirm collection membership before product-specific links for Heart Keepsake Necklace and Flower Nail Bangle are used in guides or merchandising.
- Gauss -> Kuhn: hand off the two limited-gallery active products and 23 image-size-review products for first-image order, scale accuracy, watermark/overlay, and premium-fit review.
- Gauss -> Lovelace: provide exact source, production, personalization, care, and fulfillment implications for products before operations language is strengthened.
- Kuhn -> Tesla: route any product gallery, PDP presentation, mobile UX, or collection merchandising implementation changes through theme QA.
- Tesla -> Rawls: verify whether the current GA4 loader, Shopify standard events, consent settings, and any web pixel paths create complete or duplicate event collection.
- Lovelace -> Faraday/Kuhn: approve or revise shipping, returns, care, personalization, support, and packaging wording before those claims appear in marketing or storefront trust surfaces.
- Rawls -> all agents: publish a measurement-readiness note with verified sources, date ranges, event coverage, and remaining data gaps.

## Risks Requiring Owner Attention

- Final operational promises are still unresolved: shipping timelines, production/dispatch, return eligibility, and personalized/custom treatment.
- Supplier-confirmed material, plating, stone, dimensions, safety, and durability documentation is not broadly available; do not strengthen claims.
- Merchant Center identifier strategy must remain truthful for private-label jewelry; no invented GTIN, MPN, certification, or manufacturer facts.
- Free U.S. shipping appears in storefront messaging, but exact Merchant Center shipping-service details should not be strengthened until the fulfillment rule is final.
- Compare-at pricing across all active products can weaken trust if it is not backed by a defensible pricing/promotion policy.
- Dedicated hero, collection, and packaging photography is still missing; current real-product fallback is acceptable but not final brand creative.
- Shopify GitHub integration and development theme governance remain listed as unknown in standing project docs.

## Readiness Position For Next Month

Do not scale traffic using performance claims yet. The current best path is to push organic discovery for already-live revenue paths while Google processes the sitemap, then finish measurement and operations gates. The storefront can support test shopping behavior based on current QA evidence, and Merchant Center product approval is now verified.
