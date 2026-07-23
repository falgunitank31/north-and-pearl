# Gauss Catalog Quality Gate - 2026-07-23

Owner: Gauss  
Scope: Active North & Pearl product catalog quality gate  
Constraint: Audit/report only. No Shopify mutations. No product additions.

## Evidence Reviewed

- `content/products/gauss-daily-catalog-inventory-sop.md`
- `content/products/gauss-catalog-operating-rhythm.md`
- `content/products/product-image-acceptance-checklist.md`
- `AGENTS.md`
- `reports/product-seo-catalog-audit.md`
- `reports/product-seo-catalog-audit.csv`
- `reports/catalog-media-qa-incident-2026-07-22.md`
- `reports/catalog-claim-safety-cleanup-2026-07-22.md`
- `reports/alibaba-image-source-verification.md`
- `reports/alibaba-proposed-media-map.json`
- `reports/batch-2-catalog-organic-growth-2026-07-23.md`
- `reports/merchant-center-readiness-2026-07-22.md`

## Active Catalog Risks

- Active catalog count is 92 products in the latest local product SEO audit.
- The local SEO audit found 12 active products with `claim-review-needed`. This appears intentionally conservative because those product descriptions state that stronger material, stone, finish, sizing, or durability claims require supplier/sample confirmation.
- Merchant Center readiness shows 92 products ready with an identifier caveat and 92 `identifier-gap` issues. Do not invent GTINs, MPNs, materials, certifications, or supplier facts.
- Media risk remains the highest-quality gate risk. The 2026-07-22 media incident proved that image count and dimensions alone are insufficient; visible product media must be checked for supplier branding, third-party card copy, unsupported claim overlays, watermarks, packaging implications, and inaccurate product representation.
- Source risk remains unresolved for older one-image products that were drafted after partial source recovery. These products should not be used as evidence for new product activation standards.
- Alibaba facts remain supplier-claim level unless North & Pearl has exact supplier documentation, owner approval, and/or sample verification for the exact product.

## Products That Should Remain Draft Until Image Replacement

Evidence basis: `reports/alibaba-image-source-verification.md`, `reports/alibaba-proposed-media-map.json`, and `reports/gauss-catalog-change-log-2026-07-22.json`. Each item has only partial source recovery or lacks verified additional same-product image sets.

| Product | Handle | Gate Status |
|---|---|---|
| North & Pearl Birth-Month Name Necklace | `north-pearl-birthstone-name-necklace` | Keep draft until exact listing or 3+ exact same-product replacement images are verified. |
| North & Pearl Classic Tennis Bracelet | `north-pearl-classic-tennis-bracelet` | Keep draft until exact listing or 3+ exact same-product replacement images are verified. |
| North & Pearl Green Accent Statement Ring | `north-pearl-emerald-statement-ring` | Keep draft until exact listing or 3+ exact same-product replacement images are verified. |
| North & Pearl Geometric Drop Earrings | `north-pearl-geometric-drop-earrings` | Keep draft until exact listing or 3+ exact same-product replacement images are verified. |
| North & Pearl Heart Bangle Bracelet | `north-pearl-heart-bangle-bracelet` | Keep draft until exact listing or 3+ exact same-product replacement images are verified. |
| North & Pearl Letter Charm Bracelet | `north-pearl-letter-charm-bracelet` | Keep draft until exact listing or 3+ exact same-product replacement images are verified. |
| North & Pearl Minimal Water Drop Necklace | `north-pearl-minimal-water-drop-necklace` | Keep draft until exact listing or 3+ exact same-product replacement images are verified. |
| North & Pearl Brilliant Gift Ring | `north-pearl-moissanite-gift-ring` | Keep draft until exact listing or 3+ exact same-product replacement images are verified. |
| North & Pearl Bead Collarbone Necklace | `north-pearl-pearl-collarbone-necklace` | Keep draft until exact listing or 3+ exact same-product replacement images are verified. |
| North & Pearl Square Sparkle Jewelry Set | `north-pearl-square-zircon-jewelry-set` | Keep draft until exact listing or 3+ exact same-product replacement images are verified. |
| North & Pearl Stackable Warm Bracelet | `north-pearl-stackable-gold-bracelet` | Keep draft until exact listing or 3+ exact same-product replacement images are verified. |
| North & Pearl Teardrop Birthstone Necklace | `north-pearl-teardrop-birthstone-necklace` | Keep draft until exact listing or 3+ exact same-product replacement images are verified. |

## Exact Product Activation Checklist

A product may move to `ACTIVE` only when every item below passes:

1. Source URL is recorded and the supplier listing is visible.
2. Source status is classified as `VERIFIED_ACTIVE` or, where facts are supplier-only, `SUPPLIER_CLAIM` with conservative copy.
3. Supplier name, source title, source URL, source product ID, source image URLs, and access/verification date are recorded.
4. Product type, category, variants/options, price, compare-at price, and collection assignments are complete.
5. At least one variant is available for sale.
6. Product copy is original, clear, and claim-safe.
7. No unsupported claims are made for sterling silver, gold vermeil, solid gold, moissanite, natural gemstone, waterproof, tarnish-free, hypoallergenic, nickel-free, lead-free, cadmium-free, handmade, ethical, sustainable, packaging, certificates, delivery speed, warranty, or durability.
8. Product has at least 3 accurate usable images; preferred target is 5-6 images for jewelry products and gift sets.
9. Each image is at least 700 x 700 px; preferred size is 1000 x 1000 px or larger.
10. First image clearly shows the actual product being sold and is suitable for product cards.
11. Gallery images do not contain supplier logos, marketplace badges, watermarks, third-party brand names, unsupported claim overlays, foreign-language spec cards as primary imagery, or unconfirmed packaging/certificates.
12. Images do not materially misrepresent chain thickness, stone/accent size, finish, color, pendant shape, bracelet width, scale, variants, or included accessories.
13. Media alt text follows the North & Pearl product image format and avoids unsupported material or gemstone terms.
14. Kuhn approves image accuracy, first-image quality, visual order, and brand fit.
15. Tesla confirms product page rendering, collection card crop, gallery thumbnails, mobile rendering, alt text, and add-to-cart path.
16. After activation, run product SEO audit, product media quality audit, live storefront QA, and cart/add-to-cart QA.

## Required Source Fields For Any New Alibaba Product

Record these before activation; keep the product draft if any required source evidence is missing:

- North & Pearl product title and handle.
- Alibaba source product ID.
- Exact Alibaba source URL.
- Alibaba source title.
- Supplier/company name.
- Supplier profile signals available at sourcing time, such as years, rating, review count, MOQ, and visible sold/order signals.
- Source price text and pricing date.
- Availability/stock/customization visibility status.
- Product type and intended collections.
- Variant/options data visible from the source listing.
- All source image URLs selected for Shopify, in intended order.
- Image count and minimum image dimensions.
- Source verification date and reviewer.
- Claim status: `claim-status-unverified` unless documentation and owner approval exist for the exact product.
- Sample status, usually `sample-status-not-ordered` until confirmed otherwise.
- Tags: `source-alibaba`, `alibaba-source-{sourceId}`, source/status tags, category tags, and personalization tags where applicable.
- Notes for any supplier-only facts that must stay out of customer-facing copy until verified.

## Gauss -> Kuhn -> Tesla Handoff Rule

No Alibaba-sourced product may move to `ACTIVE` until all three approvals pass in order:

1. Gauss confirms source URL, supplier listing, product category, pricing, image URLs, and inventory/availability status.
2. Kuhn confirms images are accurate, premium enough, free of supplier branding/watermarks/unsupported claim overlays, and ordered correctly for collection and product pages.
3. Tesla confirms the Shopify product page, collection card, gallery thumbnails, mobile rendering, alt text, and add-to-cart path render correctly.

If any check fails, the product remains `DRAFT`.

## Current Gate Decision

The active catalog can remain live under conservative claim controls, but product activation should remain gated by visual media review and exact source evidence. The 12 listed draft products should stay draft until clean replacement media and exact source evidence are verified. No new Alibaba product should be activated from image count, supplier title, or search result data alone.
