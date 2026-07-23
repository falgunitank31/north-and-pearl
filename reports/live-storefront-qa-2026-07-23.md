# Live Storefront QA - 2026-07-23

Role: Tesla, Shopify technical QA  
Storefront: https://northandpearl.com  
Scope: homepage, header/menu, collection grid, product page gallery, mobile risks, cart/add-to-cart. No Shopify push was performed.

## Executive Summary

Overall technical status is good. Theme Check passed with no offenses, the live add-to-cart endpoint accepted a real active product variant, and 75 of 77 active North & Pearl product pages passed the automated storefront checks.

The only live-blocking issues found are two active products whose live product URLs did not return HTTP 200. Their catalog records exist through Shopify Admin GraphQL, but storefront pages appear unavailable or unpublished at their handles, so the script could not validate product form, price, gallery, cart drawer script, or personalization fields on those pages.

No new code changes were made during this pass.

## Validation Run

- Passed: `git diff --check`
- Passed: `npx @shopify/cli@latest theme check`
  - 188 files inspected
  - 0 offenses found
- Passed with product URL exceptions: `node scripts/live-storefront-qa.mjs`
  - 77 active North & Pearl products checked
  - 75 product pages passed all scripted checks
  - 2 product pages failed because their storefront requests did not return HTTP 200
  - Cart add test passed through `/cart/add.js`

Direct local commands `shopify theme check` and `theme-check` were not available in this shell, so Theme Check was run through `npx @shopify/cli@latest`.

## Live Product Page Failures

These products should be reviewed in Shopify Admin for Online Store sales-channel publication, handle availability, redirects, or product visibility:

| Product | Handle | Script result | Failed checks |
| --- | --- | --- | --- |
| North & Pearl Dainty Initial Charm | `north-pearl-initial-necklace-6130` | FAIL | `http200`, `productForm`, `addButton`, `variantInput`, `thumbnailGallery`, `price`, `cartDrawerScript`, `personalizationFields` |
| North & Pearl Clover Earrings | `north-pearl-clover-earrings` | FAIL | `http200`, `productForm`, `addButton`, `variantInput`, `thumbnailGallery`, `price`, `cartDrawerScript` |

Because `http200` failed, the remaining failures are expected secondary failures from missing storefront HTML. This does not currently point to a Liquid or JavaScript defect.

## Cart / Add-to-Cart

Status: Pass.

The scripted cart test successfully posted variant `53774027391160` for `North & Pearl Iridescent Pendant Necklace` to `/cart/add.js` and received HTTP 200. The returned cart line included the QA line-item property, confirming AJAX add-to-cart accepts properties and the active variant can enter cart.

Code review notes:

- `snippets/buy-buttons.liquid` renders the hidden variant id input with class `product-variant-id`, matching Dawn product-form expectations.
- Personalized/custom products render line-item properties for personalization and a required spelling confirmation checkbox.
- Dynamic checkout is suppressed for products likely to need personalization review, which reduces the risk of bypassing required custom fields.
- `snippets/cart-drawer.liquid` displays non-private line-item properties, so entered personalization details should be visible in cart drawer line items.

## Product Gallery

Status: Pass, with two catalog-publication exceptions above.

Code review notes:

- `snippets/product-media-gallery.liquid` renders Dawn-compatible `media-gallery`, `GalleryViewer`, `GalleryThumbnails`, thumbnail buttons, `aria-current`, and media position metadata.
- `snippets/product-thumbnail.liquid` passes generated alt text directly through `image_tag`, avoiding brittle post-render replacement.
- Products with more than one image are expected to render the thumbnail slider; the live QA script confirmed this for all reachable multi-image products.
- Current square/contain presentation in `assets/north-pearl.css` is appropriate for jewelry product media and lowers cropping risk.

Residual risk: `hide_variants` still follows Dawn's variant-media hiding behavior. Variant-heavy products should be spot-checked visually after new media or variants are added.

## Header / Menu

Status: Pass.

Code review notes:

- `sections/header.liquid` retains Dawn's drawer, search, account, localization, and cart icon structure.
- `assets/north-pearl.css` includes desktop grid constraints and a narrower 990px-1280px breakpoint to reduce crowding.
- The custom `.np-brand-nav` uses horizontal overflow on smaller screens, which is safer than wrapping tightly packed category links.

Residual risk: `.np-brand-nav` links are hard-coded in the header. If collection handles change, those links need manual maintenance.

## Homepage

Status: Pass from code inspection.

Code review notes:

- `sections/north-pearl-homepage.liquid` provides a single semantic H1, clear CTA links, trust blocks, featured products, category links, editorial sections, and newsletter form.
- Featured products use the shared `card-product` snippet rather than a separate card implementation.
- `assets/north-pearl-homepage.css` includes breakpoint reductions from multi-column layouts to 2-column and then 1-column mobile layouts.

Mobile risk: the hero uses CSS-generated jewelry visuals rather than product imagery. That is acceptable technically, but final brand/UX QA should confirm it supports shopper confidence on the first viewport.

## Collection Grid

Status: Pass from code inspection.

Code review notes:

- `sections/main-collection-product-grid.liquid` uses Dawn pagination, filtering/sorting, loading overlay, and responsive product-grid classes.
- Empty collections include recovery CTAs to Best Sellers and Gifts.
- Product cards use `card-product` with controlled lazy loading after the first two items.
- `assets/north-pearl.css` normalizes card height, title clamping, price alignment, and contain-fit media for consistent jewelry grids.

Residual risk: contain-fit media is good for product cutouts, but editorial/lifestyle images may appear small inside square cards.

## Mobile Risks

No obvious code-level mobile blockers were found.

Watch items for device QA:

- Product gallery horizontal slider behavior should be tested on real mobile Safari after any major media/layout change.
- Very long personalized product titles can wrap into multiple lines; current CSS should handle this, but above-the-fold density may increase.
- Homepage hero visual cards are absolutely positioned; current mobile rules reduce widths and reset key offsets, but visual QA should confirm no clipping on narrow devices.

## Files Reviewed

- `sections/north-pearl-homepage.liquid`
- `assets/north-pearl-homepage.css`
- `sections/header.liquid`
- `sections/main-collection-product-grid.liquid`
- `assets/template-collection.css`
- `snippets/product-media-gallery.liquid`
- `snippets/product-thumbnail.liquid`
- `sections/main-product.liquid`
- `snippets/buy-buttons.liquid`
- `assets/product-form.js`
- `snippets/cart-drawer.liquid`
- `assets/north-pearl.css`

## Files Changed

- `reports/live-storefront-qa-2026-07-23.md`

No theme code was changed in this pass.
