# Rawls Measurement Readiness Review

Date: 2026-07-27
Store: North & Pearl
Domain: https://northandpearl.com

## Work Completed

- Audited the live storefront analytics implementation.
- Confirmed Shopify's Google & YouTube web pixel is configured with GA4 measurement ID `G-14KCZE935H`.
- Confirmed Shopify's Google pixel configuration includes ecommerce events:
  - `page_view`
  - `search`
  - `view_item_list`
  - `view_item`
  - `add_to_cart`
  - `remove_from_cart`
  - `view_cart`
  - `begin_checkout`
  - `add_shipping_info`
  - `add_payment_info`
  - `purchase`
- Found a duplicate measurement risk: the theme also loaded a custom GA4 script through `assets/north-pearl-ga4.js`.
- Removed the custom theme-level GA4 script include from `layout/theme.liquid` so Shopify's pixel remains the primary GA4/ecommerce event source.

## Why This Matters

Duplicate GA4 loaders can inflate page views, distort engagement metrics, and make marketing decisions unreliable. For North & Pearl's next-month order goal, clean measurement is more valuable than simply having more tracking code.

## Verification

- Theme Check passed after the change.
- Live homepage source no longer includes the `north-pearl-ga4.js` script.
- Live homepage source still includes Shopify's web pixel manager and `G-14KCZE935H`.
- Live homepage source still includes Shopify's ecommerce event mapping for GA4.
- GA4 Realtime received a live QA visit to `https://northandpearl.com/?np_qa=rawls_realtime_2026_07_27`.
- GA4 Search Console integration was created between Search Console property `northandpearl.com` and web stream `northandpearl` / `https://northandpearl.com`.

## Current Measurement Status

| Area | Status | Notes |
|---|---|---|
| GA4 tag presence | Verified | Shopify Google pixel includes `G-14KCZE935H`. |
| Duplicate theme GA loader | Fixed | Removed custom `north-pearl-ga4.js` include. |
| Ecommerce event mapping | Verified in source | Shopify pixel configuration includes key ecommerce events. |
| GA4 Realtime receipt | Verified | GA4 showed 1 active user in the last 30 minutes after a live QA visit. |
| GA4/Search Console link | Verified | Linked on July 27, 2026 by `falgunitank31@gmail.com`; stream ID `15298806606`. |
| Purchase event receipt | Not verified | Requires test order or real order data; do not fabricate. |
| Shopify Analytics baseline | Not verified | Requires Shopify analytics review over real date ranges. |
| Search Console | Partially verified | Access works; homepage indexed; sitemap submitted; most commercial URLs are still early discovery. |
| Merchant Center products | Verified | 118 approved, 0 limited, 0 not approved, 0 under review. |

## Remaining Measurement Tasks

1. Trigger a product view and add-to-cart event and verify whether GA4 receives them.
2. Confirm Shopify Analytics can report sessions, product views, add-to-cart, checkout starts, purchases, and revenue.
3. Re-check Search Console sitemap status after Google retries the submitted sitemap.
4. Record first baseline only after verified data is available. Do not invent traffic, conversion, revenue, or ranking numbers.

## Agents Involved

- Rawls: measurement quality and reporting reliability.
- Tesla: theme implementation and duplicate-script cleanup.
- Faraday: organic marketing impact and Search Console priority alignment.
- Lead Orchestrator: sequencing and risk control.

## Risk Notes

- Do not install Microsoft Clarity or any new tracking tool until privacy/consent handling is reviewed.
- Do not add custom event scripts while Shopify's Google pixel is already handling ecommerce events.
- Do not report marketing success until GA4/Search Console/Shopify Analytics data is verified with dates and sources.
