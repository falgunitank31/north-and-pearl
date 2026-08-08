# Order Goal Hero Product Picks - August 8, 2026

## Problem

The verified order-goal funnel still shows:

- 2 sessions
- 0 product clicks
- 0 product views
- 0 add-to-carts
- 0 checkout starts
- 0 orders

The first measurable bottleneck remains session -> product click.

## Change

Tesla/Kuhn/Pareto added a compact homepage hero "Popular picks" row with direct links to real PDPs from core product categories:

- Necklaces
- Bracelets
- Rings

The goal is to give landing-page visitors product-level choices before they scroll.

No product claims, discounts, pricing, checkout settings, customer data, or legal/policy settings were changed.

## Validation

- Shopify Theme Check passed with 289 files inspected and 0 offenses.
- Pushed to live Shopify theme `189441802424`.
- Remote Shopify theme pull confirms the live theme files contain:
  - `sections/north-pearl-homepage.liquid`: `.np-hero-picks` and `Popular picks`
  - `assets/north-pearl-homepage.css`: `.np-hero-picks` styles

## Public Storefront Cache Note

Immediate public HTML checks on these domains still returned the prior cached homepage HTML:

- `https://q4ydix-w1.myshopify.com`
- `https://north-and-pearl.myshopify.com`
- `https://northandpearl.com`

This means the live theme files are updated, but the public storefront edge cache had not refreshed at the time of validation.

## Next Measurement

Rawls should continue monitoring `select_item`.

- If `select_item` remains 0 after the homepage cache refreshes and more sessions arrive, prioritize qualified traffic quality and stronger above-fold product prompts.
- If `select_item` rises but `view_item` stays 0, investigate PDP navigation or event firing.
