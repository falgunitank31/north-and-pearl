# Order Goal Product-Entry Improvement - 2026-08-08

## Goal Context

The active 7-day and 30-day order goals showed the first verified funnel gap:

- 1 GA4 session
- 0 product views
- 0 add-to-carts
- 0 checkout starts
- 0 purchases

This indicates the next safe conversion task is moving visitors from landing pages into product pages.

## Change Implemented

Added a compact homepage product-entry rail immediately after the "Start here" shopping-intent links:

- Kicker: Ready to choose
- Heading: Shop a piece now.
- Source: the homepage's configured featured collection
- Items: first 4 products with image, title, price, and direct PDP link
- CTA: View the full edit

The section is dynamic and uses the configured collection instead of hardcoded product IDs.

## Agent Roles

- Pareto: identified the session-to-product-view funnel gap.
- Kuhn: kept the change compact and product-led rather than adding more copy.
- Gauss: used existing launch-ready products from the featured collection.
- Tesla: implemented and pushed the theme change.
- Rawls: refreshed GA4 goal-window metrics after the change.

## Validation

- Theme Check: 286 files inspected, 0 offenses.
- Pushed to live theme: `189441802424`.
- Live homepage validation:
  - `Shop a piece now`: present
  - `Ready to choose`: present
  - `View the full edit`: present
  - `np-index-edit__card`: present
- GA4 goal-window refresh still shows 1 session and 0 product views at the time of validation; this is expected until new visitors use the updated page.

## Next Measurement

Monitor whether the new direct-product rail increases:

- Product views
- Add-to-carts
- Checkout starts
- Orders

Do not judge the change until there is meaningful visitor volume.
