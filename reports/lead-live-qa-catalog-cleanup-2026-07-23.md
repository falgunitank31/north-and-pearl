# North & Pearl Lead QA + Catalog Cleanup

Date: 2026-07-23  
Owner: Lead Orchestrator  
Theme: North & Pearl Dev - Codex / active live storefront  
Scope: Live QA, catalog visual risk cleanup, organic measurement coordination

## Executive Summary

This batch focused on protecting customer trust before adding more products. The active catalog was reduced from the prior working count to 70 active products by drafting seven products with obvious visual-quality or supplier-branding issues.

No products were deleted. The changes are reversible by setting the drafted products back to ACTIVE after Kuhn visual approval and Tesla storefront QA.

## Products Drafted

The following products were moved from ACTIVE to DRAFT because they were not ready for customer-facing traffic:

| Product handle | Reason |
| --- | --- |
| `north-pearl-sculpted-curve-earrings` | Supplier-feed / collage-style image presentation; not premium enough for live storefront |
| `north-pearl-everyday-curve-earrings` | Supplier-feed / collage-style image presentation; not premium enough for live storefront |
| `north-pearl-sparkle-ring` | Primary media quality risk; not aligned with current product-page standard |
| `north-pearl-name-necklace-6687` | Supplier branding visible in media |
| `north-pearl-name-necklace-0523` | Supplier branding visible in media |
| `north-pearl-chain-necklace` | Supplier-feed / collage-style image presentation; not premium enough for live storefront |
| `north-pearl-letter-necklace-5856` | Supplier-feed / collage-style image presentation; not premium enough for live storefront |

## QA Performed

- Refreshed product SEO catalog audit after drafting risky products.
- Refreshed Merchant Center readiness audit after drafting risky products.
- Reviewed active product contact sheet for obvious visual issues.
- Ran live storefront QA through the existing script.
- Directly retested the two product handles that the live QA script flagged.
- Confirmed cart add flow through `/cart/add.js` in Tesla QA.
- Confirmed Shopify Theme Check remains clean in Tesla QA.

## Current Audit Results

- Active products audited: 70.
- Merchant Center product-data readiness: 70 ready with identifier caveat.
- Merchant Center account blocker still remains: shipping settings need to be completed in Google Merchant Center.
- Theme Check: passed with 0 offenses.
- Live QA script reported 75 of 77 products passing before the seven draft updates, with two transient product URL failures.
- Direct retest confirmed the two flagged handles rendered successfully with HTTP 200 and product-page essentials:
  - `north-pearl-initial-necklace-6130`
  - `north-pearl-clover-earrings`

## Agent Outputs

- Gauss/Kuhn catalog visual audit: `reports/catalog-visual-audit-2026-07-23.md`
- Tesla live storefront QA: `reports/live-storefront-qa-2026-07-23.md`
- Faraday/Rawls organic measurement QA: `reports/organic-measurement-qa-2026-07-23.md`

## Remaining Risks

- The catalog still needs a manual visual pass product by product before aggressively scaling to 100 active products.
- Some active products may technically pass image count and dimensions while still needing better image order, cropping, or styling judgment.
- Supplier material claims must remain neutral until verified documentation exists.
- Google Merchant Center shipping setup is account-side and must be finished before free listings can clear the current shipping issue.

## Next Priority

1. Gauss: source the next product batch, but keep new products in DRAFT until source links, image quality, and inventory signals are documented.
2. Kuhn: approve product primary image order and reject supplier-branded or low-trust media.
3. Tesla: QA product pages after each activation batch.
4. Faraday: continue organic revenue work on collection copy, product metadata, and gift-guide structure.
5. Rawls: validate GA4/Search Console/Merchant Center measurement once traffic begins.

