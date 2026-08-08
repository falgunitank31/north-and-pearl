# Order Goal Homepage Occasion Grid Polish - 2026-08-08

## Goal Context

The active order goals still show the first verified funnel gap:

- 1 GA4 session
- 0 product views
- 0 add-to-carts
- 0 checkout starts
- 0 purchases

After adding direct product-entry rails to the homepage and gift-guide pages, Kuhn/Tesla reviewed the homepage merchandising presentation for click friction.

## Problem Found

The homepage "Make the moment easy to shop." section had 8 valid occasion cards, but the desktop layout forced a 5-column grid. That created an unbalanced 5 + 3 layout with visible empty space, making the section feel unfinished and reducing confidence in the shopping path.

## Change Implemented

- Removed the inline 5-column override from `sections/north-pearl-homepage.liquid`.
- Updated `assets/north-pearl-homepage.css` so the occasion grid uses 4 columns on desktop, 2 columns on tablet, and 1 column on mobile.
- Kept all existing real collection-backed occasion cards and links.
- Did not add fake offers, fake reviews, unsupported product claims, or hardcoded product data.

## Agent Roles

- Pareto: identified the merchandising issue as a product-discovery friction point for the active order goals.
- Kuhn: validated the 4 + 4 desktop layout as more balanced and premium.
- Tesla: implemented the Liquid/CSS cleanup and pushed the safe theme change.
- Rawls: refreshed GA4 order-goal progress before the change.

## Validation

- GA4 order-goal refresh before deployment: 1 session, 0 product views, 0 add-to-carts, 0 checkout starts, 0 purchases.
- Theme Check: 286 files inspected, 0 offenses.
- Pushed to live theme: `189441802424`.
- Live homepage validation:
  - Homepage returned HTTP 200.
  - "Make the moment easy to shop." heading present.
  - "Shop a piece now." direct-product rail present.
  - 8 `np-occasion-card` entries present.
  - Live homepage CSS contains `repeat(4,minmax(0,1fr))`.
  - Live homepage CSS no longer contains the old `repeat(5` occasion grid rule.

## Next Measurement

Continue monitoring whether the homepage and guide product-entry changes move the funnel from sessions into:

- product views
- add-to-carts
- checkout starts
- purchases

Do not judge the change until meaningful visitor volume exists.
