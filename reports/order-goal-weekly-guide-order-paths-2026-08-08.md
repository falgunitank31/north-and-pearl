# Weekly Guide Order Paths - 2026-08-08

Owner: Faraday with Pareto, Kuhn, Gauss, Tesla, Rawls, and Lead Orchestrator alignment.

## Problem

The active 7-day and 30-day order goals still show sessions without product clicks, product views, add-to-carts, checkout starts, or orders. The indexed weekly gift guide is intended to receive qualified traffic, but it did not expose the same clear `Shop this guide` buyer-decision block as the stronger guide articles.

## Change Implemented

Added a weekly-guide-specific Shopify Admin script: `scripts/apply-weekly-guide-order-paths.mjs`.

The script updates `Meaningful Jewelry Gifts to Shop This Week` with a safe, reversible order-path section containing:

- `Shop this guide` heading
- 4 active, image-ready product links selected from buyer-intent gift/personalized collections
- 4 collection links for birthday, gifts for her, gifts under $100, and personalized jewelry paths
- A short buyer checklist that avoids unsupported material, delivery, discount, or durability claims

## Validation

- Shopify Admin API mutation returned success for article `meaningful-jewelry-gifts-to-shop-this-week`.
- Admin API body verification confirms the saved article contains `Shop this guide` and `np-weekly-guide-order-path`.
- Immediate public storefront HTML still served the older cached body at validation time, while preserving existing product and collection links. Treat this as a Shopify/CDN render delay and recheck before making another edit.

## Goal Impact

This directly supports the current session-to-product-click/product-view gap by making the weekly guide more decisive for shoppers who land from organic, warm-audience, or shared traffic.

## Risk

Low. No URL, product data, price, discount, policy, checkout, supplier, or unsupported material claim was changed.
