# Lead Traffic And Orders Summary - 2026-07-29

## Executive Summary

North & Pearl is not yet showing verified order momentum in the available project records.

The latest verified GA4 baseline, checked from the GA4 UI on July 28, 2026, shows that tracking is working but traffic is still very low:

- Active users: 9
- New users: 9
- Sessions: 23
- Events: 394
- Key events: 0
- Visible acquisition source: Direct only
- Organic sessions: Unknown / not visible yet

Because there is no second verified GA4 or Shopify Analytics datapoint for the same reporting window, traffic increase cannot be honestly calculated yet.

## Order Status

Verified order count is unknown from the current project environment.

Lovelace attempted a safe order-read query, but Shopify returned:

`Access denied for orders field.`

No customer information was returned or stored.

Order-source mapping is therefore blocked until safe `read_orders` access is restored. Product-source traceability work continued so that when an order appears, the team can identify the Alibaba source where available.

## What Has Improved For Traffic And Conversion

Faraday and the team completed commercial foundation work that should help organic acquisition once Google processes the pages:

- Created and exposed 6 buyer-intent collections:
  - Personalized Jewelry
  - Jewelry Gifts for Her
  - Gifts Under $50
  - Gifts Under $100
  - Birthday Jewelry Gifts
  - Anniversary Gifts
- Added these collections into navigation and internal links.
- Updated guide/article CTAs toward product collections.
- Verified 208 active products for Merchant Center readiness with identifier caveat.
- Verified 208/208 active product pages passed storefront QA in available reports.
- Verified cart-add flow passed in storefront QA.

## Current Commercial Risk

- Search Console had 0 total web search clicks and only 2 indexed pages as of the July 27 UI review.
- Organic traffic is not yet visible in the latest GA4 Home overview.
- No verified purchases, revenue, conversion rate, AOV, or add-to-cart rate are available in the repository reports.
- 17 active products are missing durable Alibaba source tags, creating fulfillment lookup risk if one of those products sells.
- Shopify order read access is blocked by missing order scope.

## Traffic Increase Answer

Traffic increase: Unknown / not yet provable.

Reason: the latest verified traffic baseline is 23 sessions over the visible GA4 last-7-days view, but there is no newer verified comparable GA4 or Shopify Analytics datapoint in the project records.

Orders: Not verified.

Reason: Shopify order read access is blocked, and no verified order/revenue export is available in the repository.

## Next Required Work

1. Re-open GA4 and record sessions, users, traffic source, product views, add-to-cart, checkout, purchase, and revenue for the current date range.
2. Re-check Search Console performance and indexing for the six buyer-intent collections.
3. Restore safe Shopify `read_orders` scope if order-source mapping should be automated.
4. Continue Faraday commercial SEO work on collection indexing, metadata, and internal links.
5. Continue Gauss/Curie source recovery for the 17 active products missing durable source tags.

## Reporting Rule

No traffic lift, revenue lift, conversion lift, or order momentum should be claimed until verified by GA4, Shopify Analytics, Search Console, or Merchant Center for comparable date ranges.
