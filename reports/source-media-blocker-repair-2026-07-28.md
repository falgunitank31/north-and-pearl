# Source Media Blocker Repair - 2026-07-28

## Summary

Resolved one active source-media blocker by validating that Alibaba source `1601721496131` exposed necklace imagery while the Shopify product was incorrectly cataloged as a bracelet.

## Product Repaired

- Previous title: North & Pearl Layering Letter Bracelet
- Final title: North & Pearl Personalized Nameplate Necklace
- Final handle: `north-pearl-personalized-nameplate-necklace`
- Product type changed from Bracelet to Necklace
- Removed from collection: Bracelets
- Added to collection: Necklaces
- Existing correct source media retained
- Media alt text refreshed to match the corrected product title

## Redirects

All prior handles now point directly to the final live product URL:

- `/products/north-pearl-letter-bracelet`
- `/products/north-pearl-layering-name-necklace`
- `/products/north-pearl-custom-script-name-necklace`

Target:

- `/products/north-pearl-personalized-nameplate-necklace`

## Validation

- Product SEO audit: 208 active products, 0 detected issues after title correction.
- Merchant readiness audit: 208 active products ready with identifier caveat, 0 needing review.
- Theme Check: 198 files inspected with no offenses found.
- Live checks: final product URL returned 200 and rendered the corrected title. Shopify returned intermittent 429 responses on rapid redirect checks, so full storefront QA was also run.

## Guardrail

If recovered Alibaba media reveals that the Shopify product title/type/category does not match the visible item, repair the catalog truth first. Do not use mismatched images to make a product appear complete.
