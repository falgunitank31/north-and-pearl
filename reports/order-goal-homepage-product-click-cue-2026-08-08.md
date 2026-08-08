# Order Goal Homepage Product Click Cue - August 8, 2026

## Problem

The active order goals still show 2 sessions with 0 product clicks and 0 product views. The current funnel gap remains session -> product click.

## Change

Tesla/Kuhn/Pareto added a visible `View piece` cue to homepage product-entry cards. This makes the intended product-click action clearer without adding discounts, urgency, unsupported claims, or changing checkout.

## Validation

- Shopify Theme Check passed with 289 files inspected and 0 offenses.
- Pushed to live Shopify theme `189441802424`.
- Remote Shopify theme pull confirms:
  - `sections/north-pearl-homepage.liquid` contains `View piece`.
  - `assets/north-pearl-homepage.css` contains `.np-index-edit__card em` styling.

## Public Storefront Cache

Immediate public homepage checks still returned cached HTML for the newest homepage-section markup. The public HTML does show the Best Sellers source update, but not yet the hero picks or `View piece` cue at the time of this report.

## Next Measurement

Monitor GA4 `select_item`.

- If `select_item` stays 0 after cache refresh and more sessions, keep prioritizing product-entry clarity and qualified traffic.
- If `select_item` rises while `view_item` stays 0, inspect PDP navigation/event flow.
