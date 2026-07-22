# Catalog Claim Safety Cleanup - 2026-07-22

## Summary

Cleaned up active North & Pearl product naming, product copy, and image alt text to reduce unsupported material or gemstone claims while preserving product URLs and live shopping functionality.

## Completed

- Renamed claim-sensitive product titles to safer customer-facing names.
- Rewrote claim-sensitive product descriptions with neutral, verification-first language.
- Preserved existing product handles to avoid breaking indexed URLs and internal links.
- Updated product media alt text through Shopify Admin GraphQL for 27 active products.
- Added a reusable media-alt sync script for future catalog maintenance.
- Added theme-level fallback alt rendering for product cards and product media snippets.

## Products Cleaned

- North & Pearl Iridescent Pendant Necklace
- North & Pearl Color Accent Cuff
- North & Pearl Dainty Sparkle Bracelet
- North & Pearl Smooth Band Ring
- North & Pearl Sparkle Pulse Bracelet
- North & Pearl Warm Bead Stretch Bracelet
- North & Pearl Chunky Bead Bracelet
- North & Pearl Linear Sparkle Bracelet
- North & Pearl Sparkle Halo Bracelet
- North & Pearl Sparkle Row Bracelet
- North & Pearl Sparkle Link Bracelet
- North & Pearl Sparkle Bead Bracelet

## Validation

- Shopify Theme Check passed with 2 existing Dawn warnings:
  - `sections/main-product.liquid`: existing `continue` object warning
  - `snippets/quick-order-product-row.liquid`: existing orphaned Dawn snippet warning
- Product SEO audit passed for 42 active products.
- Live storefront QA passed for 42 active products.
- Cart add test passed.
- Shopify Admin GraphQL confirms updated media alt text for the previously stale product:
  - `North & Pearl Dainty Sparkle Bracelet product image 1`
  - through `North & Pearl Dainty Sparkle Bracelet product image 6`

## Notes

- Public storefront HTML may briefly show cached media alt values after Admin media updates. Shopify Admin data is now clean.
- Product handles containing older supplier-style terms were intentionally left unchanged to preserve URL continuity.
- No products, orders, customers, billing, checkout settings, or domain settings were deleted or modified.

## Remaining Verification Needed

- Supplier documentation for exact materials, plating, stone/crystal composition, nickel/lead/cadmium status, and durability claims.
- Owner review before any stronger quality, material, or compliance claim is published.
