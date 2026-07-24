# North & Pearl Commerce Trust Polish - 2026-07-24

Storefront: https://northandpearl.com
Theme: `189441802424`

## Scope Inspected

- Homepage product cards.
- Collection product cards.
- Product-page price presentation.
- Collection SEO and description fields.
- Active product compare-at pricing exposure.
- Active product gallery/image-size trust surfaces.

## Problems Identified

- Every active product had compare-at pricing, causing universal sale badges to appear and weakening premium trust.
- Four collections had missing SEO or thin descriptions.
- Two active products have limited galleries.
- Twenty-three active products have at least one product image below the preferred 800px threshold.

## Changes Made

- Removed visible sale badge rendering from product cards while preserving sold-out badges.
- Removed visible PDP sale badge rendering while preserving sold-out badges.
- Kept product price and compare-at data intact for now; pricing policy still needs business review.
- Updated SEO/descriptions for `new-arrivals`, `sale`, `mens-jewelry`, and `frontpage`.
- Added a reusable commerce trust audit script.
- Improved live storefront QA backoff/retry behavior to avoid false failures from temporary Shopify 503 responses.

## Agents Involved

- Lead Orchestrator: priority and release control.
- Kuhn: premium visual trust and discount-presentation review.
- Faraday: collection SEO and search intent.
- Gauss: catalog merchandising and product-gallery risk.
- Tesla: Liquid implementation, script updates, Shopify deployment.
- Lovelace: kept promotional language restrained and non-misleading.
- Rawls: QA evidence and audit reporting.

## Validation

- Theme Check: 190 files inspected, 0 offenses.
- Customer-domain smoke checks:
  - Homepage: no visible sale badge, one H1, no supplier/internal claim leakage.
  - Name Necklaces collection: no visible sale badge, one H1, no supplier/internal claim leakage.
  - PDP: no visible sale badge, one H1, no supplier/internal claim leakage.
- Live storefront QA: 118/118 active product pages passed.
- Cart add test: PASS.
- Commerce trust audit: collection issues cleared.

## Remaining Work

- Decide whether compare-at prices should remain on every product or be limited to verified promotions.
- Continue visual QA for limited galleries and images below the preferred 800px threshold.
- Merchant Center shipping and returns should remain monitored inside Merchant Center.
