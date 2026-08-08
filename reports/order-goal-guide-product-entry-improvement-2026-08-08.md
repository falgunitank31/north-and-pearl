# Order Goal Guide Product-Entry Improvement - 2026-08-08

## Goal Context

The August 8 order-goal funnel still shows:

- 1 session
- 0 product views
- 0 add-to-carts
- 0 checkout starts
- 0 purchases

After adding a homepage product-entry rail, the next safe improvement was to strengthen article/gift-guide landing pages. These pages are intended to receive qualified organic and shared traffic, so they need direct paths into product pages.

## Change Implemented

Updated the shared `north-pearl-guide-links` section to include a direct product rail above the existing collection links.

The new rail:

- Uses the section's configurable featured collection.
- Falls back to the populated `gifts-under-100` collection.
- Displays up to 4 real products with image, title, price, and direct product-page links.
- Adds responsive mobile styling and focus/hover states.
- Does not add fake discounts, reviews, scarcity, or unsupported claims.

## Validation

- Theme Check: 286 files inspected, 0 offenses.
- Pushed to live theme: `189441802424`.
- Live article validation:
  - `https://northandpearl.com/blogs/gift-guide/meaningful-jewelry-gifts-to-shop-this-week`: 4 guide product cards present.
  - `https://northandpearl.com/blogs/gift-guide/charm-bracelet-guide`: 4 guide product cards present.
- GA4 goal-window refresh after deployment: 1 session, 0 product views, 0 add-to-carts, 0 checkout starts, 0 purchases.

## Next Measurement

Monitor whether traffic entering gift-guide pages now produces:

- `view_item`
- `add_to_cart`
- `begin_checkout`
- `purchase`

Do not judge the change until meaningful visitor volume exists.
