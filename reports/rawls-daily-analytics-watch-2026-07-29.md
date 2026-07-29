# Rawls Daily Analytics Watch - 2026-07-29

Owner: Rawls
Store: North & Pearl
Domain: https://northandpearl.com
Run time: 2026-07-29 12:32 CDT

## Executive Measurement Position

North & Pearl has verified measurement plumbing and guarded-green storefront/catalog readiness, but it does not yet have enough verified traffic or order data to judge progress toward next month's order goal.

Data confidence is LOW DATA CONFIDENCE for performance outcomes because the latest visible GA4 baseline is very small and Shopify order/revenue data is not accessible in this repository. Do not report revenue, conversion rate, AOV, organic growth, or order momentum until those metrics are visible from GA4, Shopify Analytics, Search Console, or Merchant Center with date ranges.

## Visible Metrics

| Area | Metric | Status | Latest verified value | Source |
| --- | --- | --- | --- | --- |
| GA4 setup | Measurement ID | VERIFIED | `G-14KCZE935H` | `METRICS.md`; `reports/rawls-measurement-readiness-2026-07-27.md` |
| GA4 setup | Shopify web pixel ecommerce event mapping | VERIFIED | `page_view`, `search`, `view_item_list`, `view_item`, `add_to_cart`, `remove_from_cart`, `view_cart`, `begin_checkout`, `add_shipping_info`, `add_payment_info`, `purchase` mapped in source | `reports/rawls-measurement-readiness-2026-07-27.md` |
| GA4 traffic | Active users, last 7 days visible Home overview | VERIFIED | 9 active users | `reports/faraday-traffic-visibility-check-2026-07-28.md` |
| GA4 traffic | New users, last 7 days visible Home overview | VERIFIED | 9 new users | `reports/faraday-traffic-visibility-check-2026-07-28.md` |
| GA4 traffic | Sessions, last 7 days visible Home overview | VERIFIED | 23 sessions | `reports/faraday-traffic-visibility-check-2026-07-28.md` |
| GA4 traffic | Event count, last 7 days visible Home overview | VERIFIED | 394 events | `reports/faraday-traffic-visibility-check-2026-07-28.md` |
| GA4 traffic | Key events, last 7 days visible Home overview | VERIFIED | 0 key events | `reports/faraday-traffic-visibility-check-2026-07-28.md` |
| GA4 source/medium | First user source/medium | VERIFIED | `(direct) / (none)` only in visible overview | `reports/faraday-traffic-visibility-check-2026-07-28.md` |
| GA4 source/medium | Session source/medium | VERIFIED | `(direct) / (none)` only in visible overview | `reports/faraday-traffic-visibility-check-2026-07-28.md` |
| GA4 organic traffic | Organic sessions | UNKNOWN | Not visible in the latest GA4 Home overview | `reports/faraday-traffic-visibility-check-2026-07-28.md` |
| GA4 pages | Visible page-view leaders | VERIFIED | Homepage 72; Name Necklaces collection 23; Initial Shell Necklace PDP 19; Gifts collection 18; Iridescent Pendant Necklace PDP 8; Jewelry Gifts for Her guide 7; Checkout 5 | `reports/faraday-traffic-visibility-check-2026-07-28.md` |
| GA4 events | Visible event leaders | VERIFIED | `page_view` 193; `user_engagement` 97; `scroll` 32; `session_start` 23; `view_item` 20; `first_visit` 9; `form_start` 6 | `reports/faraday-traffic-visibility-check-2026-07-28.md` |
| Search Console | Web search clicks | VERIFIED | 0 total web search clicks as of July 27 UI review | `reports/google-search-merchant-validation-2026-07-27.md` |
| Search Console | Indexed pages | VERIFIED | 2 indexed pages as of July 27 UI review | `reports/google-search-merchant-validation-2026-07-27.md` |
| Search Console | Not indexed pages | VERIFIED | 0 not-indexed pages as of July 27 UI review | `reports/google-search-merchant-validation-2026-07-27.md` |
| Search Console | Priority indexing requests | VERIFIED | P0/P1 commercial URLs inspected and indexing/recrawl requests submitted July 28 | `reports/search-console-indexing-2026-07-28.md` |
| Buyer-intent collections | New commercial collections | VERIFIED | 6 created July 28 with active products and metadata | `reports/faraday-buyer-intent-collections-2026-07-28.md` |
| Buyer-intent collections | Collection product counts | VERIFIED | Personalized Jewelry 72; Jewelry Gifts for Her 64; Gifts Under 50 40; Gifts Under 100 80; Birthday Jewelry Gifts 56; Anniversary Gifts 56 | `reports/faraday-buyer-intent-collections-2026-07-28.md` |
| Product readiness | Active products audited | VERIFIED | 208 | `reports/merchant-center-readiness-2026-07-29.csv` |
| Product readiness | Ready with identifier caveat | VERIFIED | 208 | `reports/merchant-center-readiness-2026-07-29.csv` |
| Product readiness | Needs review | VERIFIED | 0 | `reports/merchant-center-readiness-2026-07-29.csv` |
| Product readiness | Identifier gap | VERIFIED | 208 products missing barcode/GTIN and SKU | `reports/merchant-center-readiness-2026-07-29.csv` |
| Storefront QA | Active PDP pass rate | VERIFIED | 208/208 active product pages passed | `reports/live-storefront-qa-2026-07-28.csv` |
| Storefront QA | Cart add test | VERIFIED | PASS | `reports/live-storefront-qa-2026-07-28.md` |
| Repo activity | Recent documentation/theme progress | VERIFIED | 16 commits since 2026-07-28 00:00 local time on current branch | `git log --since='2026-07-28 00:00'` |

## Unavailable Metrics

| Metric | Status | Reason |
| --- | --- | --- |
| Shopify Analytics sessions | UNKNOWN | No Shopify Analytics UI/API export visible in this run. Shopify CLI was not already installed locally, and the routine forbids tool installation. |
| Shopify product views | UNKNOWN | Not accessible in repository artifacts beyond GA4 visible `view_item` count. |
| Shopify collection views | UNKNOWN | Not accessible as a Shopify Analytics export. GA4 page-view leaders include selected collections only. |
| Add-to-cart count/rate | UNKNOWN | GA4 source maps `add_to_cart`, but visible GA4 baseline did not verify processed add-to-cart count. Storefront cart-add QA passed. |
| Checkout starts | UNKNOWN | GA4 source maps `begin_checkout`; visible page leaders show Checkout page 5 views, but checkout-start event count is not verified. |
| Purchases | UNKNOWN | Purchase event mapping exists; no verified purchase count in repository. |
| Revenue | UNKNOWN | No verified order/revenue source available. |
| Average order value | UNKNOWN | Requires verified revenue and order count. |
| Conversion rate | UNKNOWN | Requires verified sessions and purchases for the same date range. |
| Merchant Center free-listing traffic | UNKNOWN | Merchant Center account-side traffic/export not visible. |
| New buyer-intent collection impressions/clicks | UNKNOWN | Collections were created July 28 and need Search Console/GA4 data after indexing and traffic accumulation. |

## Funnel Diagnosis

Current bottleneck: no verified acquisition volume.

- No impressions / low discovery: VERIFIED risk. Search Console showed 0 total web search clicks and only 2 indexed pages on July 27, before the July 28 priority indexing push.
- Low CTR: UNKNOWN. Search Console impressions and CTR by query/page are not visible.
- Low product views: LOW DATA CONFIDENCE. GA4 showed 20 `view_item` events in the visible last-7-days Home overview, but sample size is too small to diagnose PDP demand.
- Low add-to-cart: UNKNOWN. Storefront cart add works, but processed add-to-cart analytics are not verified.
- Cart friction: No current script-detected cart blocker. The latest live storefront QA cart-add test passed.
- Checkout drop-off: UNKNOWN. GA4 page leaders show 5 Checkout views, but checkout starts, purchase count, and checkout completion are not verified.
- No orders: UNKNOWN. The repository has no verified Shopify order or revenue baseline.

## Buyer-Intent Collection Watch

Monitor these new commercial landing pages once Search Console and GA4 data are available:

- `/collections/personalized-jewelry`
- `/collections/jewelry-gifts-for-her`
- `/collections/gifts-under-50`
- `/collections/gifts-under-100`
- `/collections/birthday-jewelry-gifts`
- `/collections/anniversary-gifts`

Measurement rule: treat the first meaningful evaluation window as 7-14 days after indexing and visible traffic for each URL. Until then, use UNKNOWN for impressions/clicks/CTR and LOW DATA CONFIDENCE for any GA4 page or product-view signals.

## Agent Handoffs

- Faraday: continue indexing and internal-link work for the six buyer-intent collections; send Rawls Search Console page/query data when impressions appear.
- Gauss: maintain catalog fact discipline and resolve identifier strategy with truthful supplier/manufacturer data where available; do not invent GTINs or SKUs.
- Kuhn: prioritize visual review for products receiving early collection/PDP traffic once Rawls can identify high-view, low-add-to-cart pages.
- Tesla: re-check processed GA4 event visibility for `add_to_cart`, `begin_checkout`, and `purchase` without adding duplicate scripts.
- Lovelace: finalize shipping, return, support, fulfillment, and personalization rules before Merchant Center policy language is strengthened.
- Curie: continue claim-safety review for product facts, materials, certifications, durability, and supplier-origin media before larger traffic pushes.

## Next Measurement Actions

1. Re-open GA4 and record the same date range for sessions, users, source/medium, page views, `view_item`, `add_to_cart`, `begin_checkout`, `purchase`, revenue, and key events.
2. Re-check Search Console Performance for the six buyer-intent collections, P0 collection URLs, and top PDPs. Use UNKNOWN where impressions remain absent.
3. Confirm whether Shopify Analytics can expose online store sessions, product views, add-to-cart, checkout starts, purchases, revenue, conversion rate, and AOV.
4. Verify processed ecommerce events after real activity or an owner-approved test order; do not create a test order without approval.
5. Keep Merchant Center account-side readiness on watch for domain, shipping, returns, tax/business identity, and feed identifier strategy.

## Run Limitations

- No customer PII was accessed or exposed.
- No analytics settings were changed.
- No tools were installed.
- `npx --no-install @shopify/cli --version` confirmed Shopify CLI was not already available locally for this Rawls execution, so no additional Shopify-admin refresh scripts were run by Rawls today.
