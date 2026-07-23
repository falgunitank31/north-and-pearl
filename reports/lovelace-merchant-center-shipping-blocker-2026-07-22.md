# Lovelace Merchant Center Shipping Blocker - 2026-07-22

Owner: Lovelace

Issue: Google Merchant Center shows `Missing shipping information` for products.

## Status

- Resolved in Google Merchant Center on 2026-07-22.
- Merchant Center previously showed 42 products affected.
- Shopify has 92 active products after today's Gauss catalog sprint.
- The blocker was account-level shipping setup, not product-page SEO copy.
- Google may still need 24-72 hours to reprocess product eligibility.

## Why It Matters

Google requires shipping cost and delivery time information for products shown in free listings and Shopping surfaces. Products can remain disapproved or receive reduced visibility until shipping is configured.

## Recommended Account-Level Setup

Use account-level shipping in Merchant Center rather than product-level overrides for the first launch catalog.

Configured conservative launch policy:

- Destination: United States
- Products: All products
- Shipping service name: Standard U.S. Shipping
- Shipping cost: Free / $0.00
- Handling time: 3-7 business days
- Transit time: 5-10 business days
- Total displayed delivery estimate: 8-17 business days
- Order cutoff timezone: Eastern Standard Time (New York)

Do not configure faster timelines until supplier production, inventory position, fulfillment handoff, and carrier performance are confirmed.

## Completed Account-Level Setup

Merchant Center now shows the policy as `Complete` under `Shipping policies`.

Next verification window:

1. Wait 24-72 hours for Google to reprocess product eligibility.
2. Recheck `Products > Needs attention`.
3. Confirm affected product count decreases or clears.
4. If the issue remains after reprocessing, inspect product-level feed attributes and destination eligibility.

## Agent Responsibilities

- Lovelace: own shipping, return, and customer expectation accuracy.
- Faraday: monitor Merchant Center visibility and avoid promoting products until product feed blockers are cleared.
- Gauss: do not add shipping claims to product data unless confirmed.
- Tesla: verify product pages, structured data, and feed readiness after Merchant Center settings are saved.
- Rawls: monitor free listing traffic after approval.

## Risk

Do not invent a shipping speed purely to clear Merchant Center. The setting must be something North & Pearl can actually honor.
