# Order Goal Product Click Measurement - August 8, 2026

## Purpose

The current verified funnel shows sessions but no `view_item` events. Before making another storefront layout change, Rawls/Pareto need to know whether visitors are clicking product links and not reaching PDPs, or whether they are not clicking products at all.

## Change Implemented

Tesla/Rawls added lightweight GA4 `select_item` tracking to `assets/north-pearl-ga4-ecommerce.js`.

The event fires when a shopper clicks a storefront link containing `/products/`.

Captured fields:

- `item_id`: product URL path
- `item_name`: visible link/card text when available
- `item_category`: `Product click`
- `item_list_name`: nearest labelled section or page title

## Why This Matters

This adds the missing middle step between:

Session -> product click -> product page view -> add to cart -> checkout -> order

If `select_item` increases but `view_item` remains zero, the issue is likely PDP navigation/event firing. If both remain zero, the issue is likely product-entry visibility, traffic quality, or landing-page intent.

## Validation

- `node --check assets/north-pearl-ga4-ecommerce.js`: passed.
- Shopify Theme Check: passed with 289 files inspected and 0 offenses.
- Live asset validation: production product page includes `north-pearl-ga4-ecommerce.js`, and the live asset contains both `select_item` and `bindProductClicks`.

## Risk

Low. This does not change checkout, pricing, customer data, product claims, or visible storefront layout.

## Next Measurement

Rawls should include `select_item` in the daily order-goal check. If sessions continue but `select_item` remains zero, the next action should be sharper product-entry merchandising above the fold and/or traffic-source quality improvement.
