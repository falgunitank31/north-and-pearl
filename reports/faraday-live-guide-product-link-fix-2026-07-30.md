# Faraday Live Guide Product Link Fix - 2026-07-30

Owner: Faraday with Lead Orchestrator, Tesla, Kuhn, Gauss, Rawls, Lovelace, and Curie review.

## Issue

The weekly buyer-intent guide `Meaningful Jewelry Gifts to Shop This Week` was updated by the qualified-traffic sprint after guide-to-product links were added. That publish sequence removed the direct product links from the weekly guide body.

## Why It Mattered

- SEO/AEO/GEO: the guide needed clear crawlable paths into commercial product pages.
- CRO: visitors landing on the guide needed direct product options, not only collection-level paths.
- Merchandising: Faraday's buyer-intent content should support Gauss's strongest launch products.
- Trust: no unsupported material, durability, rating, review, or scarcity claims were introduced.

## Change Implemented

- Updated `scripts/execute-qualified-traffic-sprint.mjs` so the weekly guide now includes a permanent `Featured pieces to start with` section.
- Product links added to the weekly guide:
  - `/products/north-pearl-initial-shell-necklace`
  - `/products/north-pearl-heart-keepsake-necklace`
  - `/products/north-pearl-polished-link-bracelet`

## Validation

- Shopify Admin API validation confirms:
  - `meaningful-jewelry-gifts-to-shop-this-week`: 3 direct product links.
  - `best-jewelry-gifts-under-100`: 3 direct product links.
  - `anniversary-jewelry-gift-guide`: 3 direct product links.
  - `birthday-jewelry-gift-ideas`: 3 direct product links.
- Product SEO audit: 208 active products clean.
- Merchant readiness audit: 208 active products ready with identifier caveat, 0 needing review.
- Shopify Theme Check: 243 files inspected, 0 offenses.

## Temporary Limitation

Public HTTP storefront validation returned Shopify `429` rate-limit responses after repeated automated QA. Admin API content validation was used for this guide-link check to avoid further throttling.

## Next Monitoring

Rawls and Faraday should monitor GA4 campaign traffic for `order_growth_july_2026`, guide landing-page engagement, collection click-through, product views, add-to-cart activity, checkout starts, and purchases.
