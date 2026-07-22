# Lovelace Merchant Center Shipping Blocker - 2026-07-22

Owner: Lovelace

Issue: Google Merchant Center shows `Missing shipping information` for products.

## Status

- Merchant Center screenshot shows 42 products affected.
- Shopify has 92 active products after today's Gauss catalog sprint.
- This likely means Merchant Center has an older or partially processed product feed.
- The blocker is account-level shipping setup, not product-page SEO copy.

## Why It Matters

Google requires shipping cost and delivery time information for products shown in free listings and Shopping surfaces. Products can remain disapproved or receive reduced visibility until shipping is configured.

## Recommended Account-Level Setup

Use account-level shipping in Merchant Center rather than product-level overrides for the first launch catalog.

Owner must confirm the exact values before saving because these settings become customer-facing expectations.

Suggested conservative launch policy, if the owner is willing to honor it:

- Destination: United States
- Products: All products
- Shipping service name: Standard U.S. Shipping
- Shipping cost: Free / $0.00
- Handling time: 3-7 business days
- Transit time: 5-10 business days
- Total displayed delivery estimate: approximately 8-17 business days

Do not configure faster timelines until supplier production, inventory position, fulfillment handoff, and carrier performance are confirmed.

## Owner Action Required

In Google Merchant Center:

1. Go to `Products & store`.
2. Open `Shipping and returns`.
3. Select `Shipping policies`.
4. Click `Add shipping policy`.
5. Choose `Shipping for online products`.
6. Set country to `United States`.
7. Apply to `All products`.
8. Add delivery time and shipping cost.
9. Save.
10. Wait 24-72 hours for Google to reprocess product eligibility.

## Agent Responsibilities

- Lovelace: own shipping, return, and customer expectation accuracy.
- Faraday: monitor Merchant Center visibility and avoid promoting products until product feed blockers are cleared.
- Gauss: do not add shipping claims to product data unless confirmed.
- Tesla: verify product pages, structured data, and feed readiness after Merchant Center settings are saved.
- Rawls: monitor free listing traffic after approval.

## Risk

Do not invent a shipping speed purely to clear Merchant Center. The setting must be something North & Pearl can actually honor.

