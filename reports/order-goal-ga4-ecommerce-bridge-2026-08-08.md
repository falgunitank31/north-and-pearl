# Order Goal GA4 Ecommerce Bridge — August 8, 2026

## Why This Was Needed

Rawls refreshed the August 8 order-goal GA4 report and found 2 sessions, 1 user, 1 page view, and 0 recorded `view_item`, `add_to_cart`, `begin_checkout`, or `purchase` events. The storefront already had Shopify standard events and the Shopify Google pixel, but the order-goal report needs GA4 ecommerce event names to measure funnel progress.

## Changes Implemented

- Added `assets/north-pearl-ga4-ecommerce.js`.
- Added a product-page JSON payload in `sections/main-product.liquid` using verified Shopify product, selected variant, price, and currency data.
- Included the ecommerce bridge in `layout/theme.liquid`.
- Removed the stale homepage `repeat(5)` occasion-grid override from `layout/theme.liquid`.
- Repushed `assets/north-pearl-homepage.css` so the live homepage keeps the balanced 4-column occasion grid.

## Event Coverage

- `view_item`: fires once per PDP load when a product analytics payload exists.
- `add_to_cart`: fires from the existing product-form cart update event after a successful add.
- `begin_checkout`: fires when a cart checkout button is clicked and reads the current cart safely from `/cart.js`.
- `purchase`: not added in theme code. Purchase tracking should remain owned by Shopify checkout/customer events and GA4, not a theme-side invented event.

## Safety Notes

- The bridge does not load another GA4 script.
- The bridge only calls `window.gtag` if the existing Google tag is already available.
- No customer data, order data, payment settings, checkout settings, discounts, or product claims were changed.

## Validation

- Theme Check: passed, 286 files inspected, 0 offenses.
- JavaScript syntax check: `node --check assets/north-pearl-ga4-ecommerce.js` passed.
- Live PDP: `https://northandpearl.com/products/north-pearl-initial-shell-necklace` returned 200, rendered the bridge asset, and rendered parseable product analytics JSON:
  - product: `North & Pearl Initial Shell Necklace`
  - variant: `Default Title`
  - price: `59.0`
  - currency: `USD`
- Live homepage CSS: verified `assets/north-pearl-homepage.css` contains the 4-column occasion-grid rule and no `repeat(5)` grid rule.

## Follow-Up

GA4 ecommerce events are not instant in standard reports. Rawls should re-run the order-goal progress script after fresh PDP/add-to-cart activity appears in GA4, then compare product views, add-to-carts, checkout starts, and purchases against the 7-day and 30-day goals.
