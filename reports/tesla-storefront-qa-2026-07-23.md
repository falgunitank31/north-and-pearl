# Tesla Storefront QA - 2026-07-23

Scope: technical inspection after the thumbnail bug fix. Focus areas were product thumbnail rendering, gallery layout, header/menu alignment, product title spacing, mobile product page behavior, and collection cards. No Shopify push was performed.

## Summary

Overall risk is low-to-moderate. The product gallery is structurally intact and the custom North & Pearl thumbnail rail is scoped to `thumbnail_slider` product pages. I found one small, safe bug in the thumbnail/media alt rendering implementation and fixed it in the relevant gallery snippets.

## Code Changes Made

- `snippets/product-thumbnail.liquid`
  - Removed post-render `replace` filters from product media `image_tag` output.
  - Product media images now pass the intended generated alt text directly through `alt: np_media_alt`.

- `snippets/product-media-gallery.liquid`
  - Removed post-render `replace` filters from featured and non-featured thumbnail `image_tag` output.
  - Thumbnail images now pass generated alt text directly through `alt: np_featured_thumb_alt` / `alt: np_thumb_alt`.
  - Cleaned the thumbnail image tag argument indentation around `widths`, `id`, and `alt`.

Why: replacing text inside rendered HTML is brittle when stored alt text is blank, duplicated elsewhere in the tag, or escaped differently. Direct `image_tag` alt arguments are safer and preserve the thumbnail fix without changing layout.

## Findings

### Thumbnail Rendering

- Fixed: thumbnail and main media alt rendering no longer relies on string replacement after `image_tag` generation.
- Current thumbnail state is coherent:
  - Main media uses generated alt text in `snippets/product-thumbnail.liquid`.
  - Thumbnail buttons use generated labels and `aria-current` on the active thumbnail in `snippets/product-media-gallery.liquid`.
  - Active thumbnail styling targets `.product__media-wrapper .thumbnail[aria-current]`, matching the button attribute.

Residual risk: `hide_variants` still uses Dawn-style variant image filtering. If a product has all media attached to variants, the gallery intentionally reduces visible media; this is expected but should be checked on variant-heavy products before launch.

### Gallery Layout

- Desktop `thumbnail_slider` layout is a custom two-column grid: vertical thumbnails at `8.4rem` plus a main media column.
- The vertical thumbnail list has constrained height and scrolls on desktop, which protects against long media sets.
- Main product images are forced into a square, contain-fit presentation with padding, which is appropriate for jewelry and reduces cropping risk.

Residual risk: forcing `--ratio: 1 !important` in `assets/north-pearl.css` means all product media presents as square regardless of source aspect ratio. This is visually consistent, but live QA should confirm videos/models still feel acceptable if added later.

### Header/Menu Alignment

- Header layout has responsive safeguards:
  - Full desktop menu at wider breakpoints.
  - Drawer fallback between `990px` and `1199px`.
  - Custom brand nav scrolls horizontally on mobile.
- The custom `.np-brand-nav` is simple and unlikely to affect Dawn menu disclosure behavior.

Residual risk: the brand nav is hard-coded in `sections/header.liquid`, so collection handle changes can produce dead links unless navigation maintenance includes this file.

### Title Spacing

- Product title spacing is stable:
  - `.product__title` keeps Dawn margins.
  - `.product__title h1` uses a responsive clamp and tight line-height.
- No obvious overlap with price, subtitle, or form blocks was found in CSS.

Residual risk: very long personalized product titles can wrap into 3+ lines. The current typography will handle wrapping, but the above-the-fold product info block may become tall on mobile.

### Mobile Product Page

- Mobile gallery keeps Dawn horizontal slider behavior with thumbnails shown below.
- Product media removes side borders and radius on mobile, which intentionally lets the hero image span cleaner edge-to-edge.
- Thumbnail list uses fixed `6.8rem` thumbnails on tablet/mobile, preventing thumbnail shrink collapse.

Residual risk: because the main media list is wider than the viewport by design (`width: calc(100% + 4rem)` in Dawn CSS), live device testing should confirm there is no unwanted horizontal page scroll outside the slider.

### Collection Cards

- Collection/product cards use consistent card height, two-line title clamp, contain-fit images, and price pushed to the bottom.
- This reduces card jitter across mixed product title lengths and mixed media aspect ratios.

Residual risk: collection images inherit contain-fit padding. This is good for jewelry/product cutouts, but editorial collection images may appear too small if uploaded as wide lifestyle photos.

## Validation

- Passed: `git diff --check`
- Blocked: `shopify theme check`
  - `shopify` command is not installed in this shell.
- Blocked: `theme-check`
  - `theme-check` command is not installed in this shell.

## Files Reviewed

- `sections/main-product.liquid`
- `snippets/product-media-gallery.liquid`
- `snippets/product-thumbnail.liquid`
- `assets/media-gallery.js`
- `assets/section-main-product.css`
- `sections/header.liquid`
- `assets/base.css`
- `assets/north-pearl.css`
- `assets/component-card.css`
- `snippets/card-product.liquid`
- `snippets/card-collection.liquid`

## Deployment Note

No Shopify push was performed. Theme edits remain local and limited to product gallery thumbnail/media snippets.
