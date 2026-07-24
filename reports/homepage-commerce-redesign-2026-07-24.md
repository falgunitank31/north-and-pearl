# North & Pearl Homepage Commerce Redesign - 2026-07-24

## Catalog Audit

- Total North & Pearl products found: 154
- Active products found: 118
- Active products with usable images: 118
- Active products with prices: 118
- Active products available for sale: 118
- Collections found: 17
- Populated collections: 13
- Empty collections: 4
- Empty collections not featured on homepage: frontpage, mens-jewelry, gift-cards, sale

## Homepage Changes

- Replaced the abstract jewelry-art hero with a real product-image-driven hero using a configurable image picker and collection fallback.
- Added image-led category cards for populated collections.
- Added a high-position product grid for Best Sellers.
- Added a second product grid for New Arrivals.
- Added image-led gift-intent cards for populated occasion collections.
- Removed the oversized "Meaning first", "Clear details", and "Gift-ready feel" editorial blocks.
- Reduced the personalization process to a compact three-step section.
- Added a concise editorial story section and lightweight guide links below product merchandising.
- Kept newsletter signup restrained and non-discount-based.

## Product Merchandising

- Product grids use real Shopify product data, images, titles, pricing, compare-at pricing where present, and Dawn's existing quick-add behavior.
- No fake ratings, reviews, scarcity messaging, material claims, or invented product facts were added.
- Empty collections are not exposed in the new homepage merchandising cards.

## Technical Validation

- Shopify Theme Check: passed, 189 files inspected, 0 offenses.
- Live homepage HTTP check: 200.
- Render checks passed for commerce section, hero image, product cards, quick-add buttons, and absence of raw Liquid.

## Missing Inputs

- Collection images are missing in Shopify Admin, so the section falls back to first product imagery from each populated collection.
- Dedicated editorial hero and packaging photography should be added later through the theme editor when available.
- Verified reviews, material claims, and packaging-service specifics remain unavailable and were not added.

## Deployed Theme

- Theme: North & Pearl Dev - Codex
- Theme ID: 189441802424
- Storefront: https://northandpearl.com/
