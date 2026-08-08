# Order Goal Collection Product Jump - 2026-08-08

## Goal Context

The active order-goal funnel refresh now shows:

- 2 GA4 sessions
- 0 product views
- 0 add-to-carts
- 0 checkout starts
- 0 purchases

The measured gap remains session-to-product-view.

## Change Implemented

Added a compact "Start with these pieces" product-jump strip to populated collection heroes.

The strip:

- Uses each collection's own first available image-ready products.
- Shows up to 3 product links with thumbnail, title, and price.
- Adds direct PDP paths before the main product grid without hiding the grid below long copy.
- Uses live Shopify product data and does not hardcode product IDs.
- Avoids fake reviews, fake discounts, fake scarcity, and unsupported product/material/shipping claims.

## Agent Roles

- Pareto: prioritized the session-to-product-view gap.
- Faraday: supported crawl/internal-link strengthening into PDPs from commercial collection pages.
- Gauss: supplied live collection product data through Shopify.
- Kuhn: kept the strip compact and shoppable without making the collection hero feel crowded.
- Tesla: implemented and pushed the theme update.
- Rawls: refreshed GA4 order-goal progress before implementation.

## Validation

- Theme Check: 286 files inspected, 0 offenses.
- Pushed to live theme: `189441802424`.
- Live sampled collection validation:
  - `https://northandpearl.com/collections/gifts-under-100`: HTTP 200, product-jump present, 3 jump items.
  - `https://northandpearl.com/collections/jewelry-gifts-for-her`: HTTP 200, product-jump present, 3 jump items.
  - `https://northandpearl.com/collections/personalized-jewelry`: HTTP 200, product-jump present, 3 jump items.
  - `https://northandpearl.com/collections/name-necklaces`: HTTP 200, product-jump present, 3 jump items.
- Live CSS validation confirms `np-collection-product-jump` styles are served.

## Next Measurement

Monitor whether collection visitors begin generating:

- `view_item`
- `add_to_cart`
- `begin_checkout`
- `purchase`

Because traffic volume is still extremely low, keep data confidence low until more sessions arrive.
