# Order Goal Homepage Product Entry Diversification - August 8, 2026

## Problem

The first homepage product-entry rail was tied to Gifts Under $100. Live validation showed the first product links were dominated by similar heart-necklace variants, which made the store feel narrower than the actual catalog and reduced the clarity of product choices.

Verified before signal:

- Homepage returned HTTP 200.
- The "Shop a piece now" area rendered product links.
- First visible product handles were heavily repetitive heart-necklace variants.
- GA4 goal progress still showed 2 sessions, 0 product clicks, and 0 product views.

## Change

Kuhn/Gauss/Pareto/Tesla shifted the homepage product-entry rail toward broader product discovery:

- Updated the homepage section to prefer one product from each core category: necklaces, bracelets, rings, and earrings.
- Updated the homepage template source collection from Gifts Under $100 to Best Sellers as the fallback/full-edit path.
- Kept all products sourced from existing Shopify collections; no product IDs, fake products, fake discounts, or unsupported claims were introduced.

## Live Validation

Production URL checked:

`https://northandpearl.com/?npcheck=bestsellerrail`

Result:

- Homepage returned HTML successfully.
- "Shop a piece now" was present.
- The full-edit link points to `/collections/best-sellers`.
- First product-entry handles include:
  - `north-pearl-personalized-nameplate-necklace`
  - `north-pearl-sparkle-bracelet-8259`
  - `north-pearl-signature-ring-7015`
  - `north-pearl-letter-earrings-5006`

## QA

- Shopify Theme Check: passed with 289 files inspected and 0 offenses.
- Live theme `189441802424` received:
  - `sections/north-pearl-homepage.liquid`
  - `templates/index.json`

## Goal Impact

This targets the current first funnel gap:

Session -> product click -> product view

Next Rawls check should watch whether `select_item` moves above 0 before `view_item`.
