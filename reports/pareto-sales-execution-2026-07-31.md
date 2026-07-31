# Pareto Sales Execution - 2026-07-31

Owner: Pareto with Lead Orchestrator, Tesla, Kuhn, Gauss, Faraday, Rawls, Lovelace, and Curie.

## What Was Inspected

- `AGENTS.md`, `SPRINT.md`, `BACKLOG.md`, `METRICS.md`, `EXPERIMENTS.md`, `DECISIONS.md`, and `RISKS.md`.
- Homepage merchandising and buyer-intent routing.
- Cart page and cart drawer recovery paths.
- Active commercial collection sizes and sample prices.
- Shopify product purchasability and sampled unit cost fields.
- Shopify Discount API access state.
- Initial competitor sales patterns across AJLuxe, Mejuri, Oak & Luna, and Gorjana.

## Problems Identified

- Homepage “Shop Personalized Jewelry” intent routed to Name Necklaces instead of the broader `personalized-jewelry` collection.
- Empty cart drawer recovery used generic browsing instead of high-intent gift/personalized paths.
- Shopify product unit costs are missing, so discount and bundle-pricing economics cannot be verified.
- Discount API access is blocked by missing `read_discounts`, so active discounts cannot be audited by API yet.
- Traffic/order data remains too low for statistical conclusions.

## Changes Made

- Added Pareto as the sales and revenue-growth responsibility lane in `AGENTS.md`.
- Created the `sales/` operating system files.
- Updated homepage secondary CTA and Personalized category card to route to `personalized-jewelry`.
- Updated empty cart drawer recovery links to:
  - Gifts for Her
  - Gifts Under $100
  - Personalized Jewelry
- Added commercial guardrails blocking discounts, bundle pricing, free-shipping threshold changes, and gift-with-purchase until margin inputs exist.

## Baseline

- Active products: 208.
- Available for sale: 208/208.
- Personalized Jewelry: 72 products.
- Gifts Under $50: 40 products.
- Gifts Under $100: 80 products.
- Jewelry Gifts for Her: 64 products.
- Best Sellers / Featured Jewelry: 12 products.
- Safe visible orders: 0.
- Search Console latest verified: 1 impression, 0 clicks.
- GA4 organic latest verified: 0 rows.

## QA

- Theme Check: 243 files inspected, 0 offenses.
- JSON syntax validation: `templates/index.json` and `templates/cart.json` passed.
- Live cart page validation: `/cart` returned 200 and contained the new Gifts for Her and Gifts Under $100 recovery paths.
- Homepage public validation was rate-limited by Shopify `429`; pushed theme JSON confirms the routing change and live verification should be retried after throttle clears.

## Blocked

- Discount audit requires `read_discounts`.
- Promotions and bundle pricing require verified unit cost, landed cost, packaging, payment, shipping subsidy, and margin guardrails.
- Order-performance optimization requires meaningful traffic and purchase-event visibility.

## Next Pareto Priorities

1. Build non-discount bundle merchandising concepts for existing products.
2. Monitor personalized-routing and empty-cart recovery once traffic exists.
3. Work with Gauss/Curie to recover cost inputs for commercial guardrails.
4. Work with Rawls to verify add-to-cart, checkout-start, and purchase measurement.
