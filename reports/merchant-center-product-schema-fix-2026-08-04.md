# Merchant Center Product Schema Fix - 2026-08-04

Owner: Tesla with Faraday, Pareto, Lovelace, and Lead Orchestrator review.

## Issue

Merchant Center/Rich Results surfaced two product structured-data warnings:

- Missing field `hasMerchantReturnPolicy` in `offers`.
- Missing field `shippingDetails` in `offers`.

The warnings were shown for 12 product URLs.

## Cause

The product page used Shopify/Dawn native `product | structured_data`, which did not include North & Pearl's Merchant Center shipping and return-policy offer fields.

## Change Implemented

Replaced the native PDP product structured-data output in `sections/main-product.liquid` with a controlled North & Pearl Product JSON-LD block.

Added:

- `offers.shippingDetails`
  - US shipping destination.
  - Free U.S. shipping rate of `0.00 USD`, matching the current Shipping Policy page.
  - Shipping policy URL.
- `offers.hasMerchantReturnPolicy`
  - US applicable country.
  - `MerchantReturnUnspecified`, avoiding an unsupported return-window promise because personalized/custom and standard item return eligibility differ.
  - Returns & Exchanges policy URL.

## Safety Notes

- No new material, waterproof, tarnish-free, hypoallergenic, warranty, review, or delivery-time claims were introduced.
- No return window was invented.
- No Shopify product records, orders, customers, checkout, billing, tax, or domain settings were changed.

## Validation

- Theme Check passed: 277 files inspected, 0 offenses.
- Live theme `189441802424` was pushed successfully.
- Live validation URL:
  - https://northandpearl.com/products/north-pearl-initial-shell-necklace
- Rendered live HTML validation:
  - HTTP 200 with browser-like user agent.
  - 6 JSON-LD blocks found.
  - 0 JSON parse errors.
  - 1 Product block found.
  - Product `offers.shippingDetails`: present.
  - Product `offers.hasMerchantReturnPolicy`: present.

## Expected Merchant Center Behavior

Merchant Center may not clear the warnings immediately. Google needs to recrawl/reprocess affected product URLs. If warnings persist after recrawl, use Merchant Center's validation/start-fix workflow or request recrawl for sampled affected URLs in Search Console.
