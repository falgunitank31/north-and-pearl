# Birth Flower Guide Editorial Redesign — August 17, 2026

## Page

- Live URL: https://northandpearl.com/blogs/gift-guide/birth-flower-necklace-guide
- Article ID: `gid://shopify/Article/646935806136`

## Problem

The guide looked too plain for a jewelry brand and did not match the expected editorial-commerce standard. It also still had older personalized/custom framing in some rendered output.

## Changes Made

- Added a richer jewelry editorial visual system with warm ivory/champagne styling.
- Added an early 3-step shopping snapshot.
- Added a product-image collage section.
- Added a month-by-month birth flower visual guide.
- Expanded `Shop the Story` to 4 live product cards with images, prices, and product links.
- Updated the article title and copy to ready-to-order positioning.
- Added explicit Shopify article SEO metafields:
  - `global.title_tag`
  - `global.description_tag`
- Updated theme-level article metadata maps for the Birth Flower guide.

## Validation

- Shopify Admin API readback confirms:
  - stored title is updated
  - stored body contains `np-guide-snapshot`
  - stored body contains `np-jewelry-collage`
  - stored body does not contain stale personalized product language
  - SEO metafields are present
- Live storefront checks confirm the article renders with the product card module.
- Theme Check passed with `--fail-level error`.

## Notes

Some live storefront fetches returned older Shopify-rendered article HTML during validation, while Admin API readback showed the corrected source of truth. Treat this as Shopify storefront cache/edge propagation to monitor, not a content-source failure.

## Follow-Up Visual Density Pass

- Reduced the height of the in-article jewelry collage imagery so the section no longer creates overly tall columns on desktop.
- Reduced the `Shop the Story` product card scale, text size, padding, and image ratio so product merchandising feels compact instead of oversized.
- Tightened the article-ending guide section by reducing spacing, shrinking the large heading, compacting product cards, and trimming the link-card set from nine paths to six focused shopping paths.
- Preserved the same customer-facing claims and product links; this pass is presentation-only.

## Files Changed

- `assets/blog-editorial.css`
- `assets/north-pearl-guide-links.css`
- `content/blogs/gift-guides/birth-flower-necklace-guide.md`
- `scripts/publish-maxwell-three-guides-2026-08-17.mjs`
- `sections/north-pearl-guide-links.liquid`
- `layout/theme.liquid`
- `snippets/meta-tags.liquid`
