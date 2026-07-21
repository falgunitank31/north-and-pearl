# Alibaba Image Source Verification

Date: 2026-07-20

Scope: 12 active North & Pearl products flagged in `reports/product-seo-catalog-audit.md` for low image count.

Constraint: Do not expand product media unless the exact Alibaba listing or exact same-product image set is verified. Similar jewelry images are not acceptable.

## Method

- Inspected repository scripts and reports for Alibaba source URLs, CDN image URLs, source IDs, and product handles.
- Checked the current low-image product audit in `reports/product-seo-catalog-audit.md` and `reports/product-seo-catalog-audit.csv`.
- Used existing exact Alibaba CDN image fingerprints from:
  - `scripts/add-alibaba-product-media.mjs`
  - `scripts/upgrade-thumbnail-product-media.mjs`
  - `scripts/fix-letter-charm-media-quality.mjs`
- Queried Alibaba public search API by product phrase and checked returned data for the exact CDN fingerprints.
- No Shopify mutations were made.

## Findings

The repository contains exact Alibaba CDN image URLs for the current single product image on all 12 products. The repository does not contain durable Alibaba product detail URLs or Alibaba product IDs for these 12 older products.

The public Alibaba search API did not return matching image fingerprints for these products during this verification pass. Because of that, none of the products are safe to expand with additional images yet.

## Status Key

- `VERIFIED_SOURCE_FOUND`: exact Alibaba product URL or exact same-product image set found; safe to expand images.
- `PARTIAL_SOURCE_FOUND`: current Alibaba image source found, but exact product listing or additional same-product image set is not verified.
- `SOURCE_UNKNOWN`: no reliable current image source found.
- `REPLACE_RECOMMENDED`: product should be replaced by a better verified Alibaba candidate instead of patched.

## Product Verification Table

| Product | Handle | Status | Current Verified Image URL | Recommended Next Action |
|---|---|---|---|---|
| North & Pearl Birthstone Name Necklace | `north-pearl-birthstone-name-necklace` | `PARTIAL_SOURCE_FOUND` | `https://s.alicdn.com/@sc04/kf/Ha70708512f184cc38834bb31484131acZ.png` | Do not expand yet. Find exact Alibaba product listing or replace with a verified personalized/birthstone necklace candidate that has 3+ exact images. |
| North & Pearl Classic Tennis Bracelet | `north-pearl-classic-tennis-bracelet` | `PARTIAL_SOURCE_FOUND` | `https://s.alicdn.com/@sc04/kf/H316e0d6799a64c4da0ac1938bad05579v.jpg` | Do not expand yet. Find exact source listing or replace with verified tennis bracelet candidate with multiple product images. |
| North & Pearl Emerald Statement Ring | `north-pearl-emerald-statement-ring` | `PARTIAL_SOURCE_FOUND` | `https://s.alicdn.com/@sc04/kf/H84b98c8b24744de3a66d8ac9dfc5bc14Q.jpg` | Do not expand yet. Treat stone/material copy as unverified. Prefer replacement if exact source cannot be recovered. |
| North & Pearl Geometric Drop Earrings | `north-pearl-geometric-drop-earrings` | `PARTIAL_SOURCE_FOUND` | `https://s.alicdn.com/@sc04/kf/Haddf3955b3094ad9bc260e6bf1a849d66.jpg` | Do not expand yet. Find exact source listing or replace with a verified earring candidate. |
| North & Pearl Heart Bangle Bracelet | `north-pearl-heart-bangle-bracelet` | `PARTIAL_SOURCE_FOUND` | `https://s.alicdn.com/@sc04/kf/Hd56e87334c404b7d84c354dcb308d649N.jpg` | Do not expand yet. Find exact source listing or replace with a verified heart bangle candidate. |
| North & Pearl Letter Charm Bracelet | `north-pearl-letter-charm-bracelet` | `PARTIAL_SOURCE_FOUND` | `https://s.alicdn.com/@sc04/kf/H419e89e8f2894feea05004ed7a73111az.png` | Do not expand yet. This current full-size image is verified from prior thumbnail recovery, but no additional matching image set is verified. |
| North & Pearl Minimal Water Drop Necklace | `north-pearl-minimal-water-drop-necklace` | `PARTIAL_SOURCE_FOUND` | `https://s.alicdn.com/@sc04/kf/H2b743cbc422c4c2d8dc5882a5bd868c5R.jpg` | Do not expand yet. Find exact source listing or replace with a verified water-drop necklace candidate. |
| North & Pearl Moissanite Gift Ring | `north-pearl-moissanite-gift-ring` | `PARTIAL_SOURCE_FOUND` | `https://s.alicdn.com/@sc04/kf/H1a6a4f9a9a1648348e3102541a9822f2T.jpg` | Do not expand yet. Avoid moissanite claims unless supplier documents confirm them. Replacement is preferred if exact listing remains unrecoverable. |
| North & Pearl Pearl Collarbone Necklace | `north-pearl-pearl-collarbone-necklace` | `PARTIAL_SOURCE_FOUND` | `https://s.alicdn.com/@sc04/kf/Hcd831284a57343479fc0a44bbb3ad2acW.jpg` | Do not expand yet. Avoid pearl-material claims unless confirmed. Find exact source listing or replace. |
| North & Pearl Square Zircon Jewelry Set | `north-pearl-square-zircon-jewelry-set` | `PARTIAL_SOURCE_FOUND` | `https://s.alicdn.com/@sc04/kf/H57347201ea43439ab63ac5acc67e02d0E.jpg` | Do not expand yet. Avoid zircon/material claims unless confirmed. Find exact source listing or replace. |
| North & Pearl Stackable Gold Bracelet | `north-pearl-stackable-gold-bracelet` | `PARTIAL_SOURCE_FOUND` | `https://s.alicdn.com/@sc04/kf/H9b306b51a3f142e298997f1681bf3675d.jpg` | Do not expand yet. Avoid finish claims. Find exact source listing or replace with verified stackable bracelet candidate. |
| North & Pearl Teardrop Birthstone Necklace | `north-pearl-teardrop-birthstone-necklace` | `PARTIAL_SOURCE_FOUND` | `https://s.alicdn.com/@sc04/kf/H819cdeb4f8df475197741874653d3c05k.jpg` | Do not expand yet. Find exact source listing or replace with a verified birthstone-inspired pendant candidate. |

## Proposed Media Update Map

No expansion media should be applied yet. The only verified media for each product is its current single image.

Use `reports/alibaba-proposed-media-map.json` as a machine-readable map of current verified single-image sources and blocked expansion status.

## Recommended Next Action

1. Do not add additional images to these 12 products from visual similarity.
2. Attempt exact-source recovery with Alibaba product-detail URLs from browser history, owner-saved links, or supplier/product IDs if available.
3. If exact source is not recoverable, replace the weakest products with new Alibaba candidates selected through the newer source-ID pipeline in `scripts/expand-alibaba-catalog-to-100.mjs`.
4. For future products, require tags/metafields at creation time:
   - `source-alibaba`
   - `alibaba-source-{productId}`
   - source product URL
   - source title
   - source image URLs
   - last verification date
5. Only publish products with at least 3 exact same-product images unless the product is intentionally allowed as a temporary single-image item.
