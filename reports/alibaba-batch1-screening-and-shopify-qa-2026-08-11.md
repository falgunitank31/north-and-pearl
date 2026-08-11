# Alibaba Batch 1 Screening + Shopify QA — August 11, 2026

## Summary

- Batch candidates reviewed: 17
- Exact Alibaba URLs recorded: 17
- Image/IP screened: 3
- Approved and published: 2
- Held: 15
- RED rejected: 0

## Published Products

| Candidate | Shopify product | Handle | Product ID | Price | Status |
|---|---|---|---|---:|---|
| B1-001 | North & Pearl Double Heart Birth Month Ring | `north-pearl-double-heart-birth-month-ring` | `gid://shopify/Product/10521726877880` | `$59.00` | Active + published |
| B1-002 | North & Pearl Personalized Birth Month Name Ring | `north-pearl-personalized-birth-month-name-ring` | `gid://shopify/Product/10521727008952` | `$64.00` | Active + published |

Live URLs:

- https://northandpearl.com/products/north-pearl-double-heart-birth-month-ring
- https://northandpearl.com/products/north-pearl-personalized-birth-month-name-ring

## Product QA Results

| Check | B1-001 | B1-002 |
|---|---|---|
| Title | Pass | Pass |
| Description | Pass, claim-safe | Pass, claim-safe |
| Images | 6 images, 1001px originals | 6 images, 1254-1600px originals |
| Variants | Default purchasable variant, adjustable style | Default purchasable variant, personalization field captures name/size/month |
| Price | `$59.00` | `$64.00` |
| Compare-at price | None | None |
| Collections | Rings, Birthstone Jewelry, Gifts, Birthday, Under $100, New Arrivals | Rings, Birthstone Jewelry, Personalized Jewelry, Gifts, Birthday, Under $100, New Arrivals |
| Exact Alibaba source mapping | Pass | Pass |
| Internal supplier metafields | Pass | Pass |
| PDP render | Pass | Pass |
| Add to Cart | Pass | Pass |
| Cart properties | Pass | Pass |

Admin copy verification passed for both products after removing public sourcing language. Storefront cache reflected the cleaned copy immediately for B1-002. B1-001 still served the prior paragraph on one public HTML fetch at the end of QA, while Shopify Admin already showed the corrected copy; treat B1-001 as a short cache-lag watch item, not a product-record issue.

## Source And Claim Controls

Both published products use public copy that avoids unsupported claims for:

- sterling silver / 925 silver
- CZ or gemstone authenticity
- waterproof
- tarnish-free
- hypoallergenic
- nickel-free / lead-free / cadmium-free
- durability guarantees

Public copy uses neutral language such as "birth-month inspired color accent" and visible design descriptors.

## Held Products

### B1-003 — Held

The images are visually attractive and no obvious third-party trademark issue was seen, but supplier image panels include unsupported performance and promise claims such as waterproof/tarnish-free/stainless/promise-style messaging. It remains held until a claim-safe asset set or verified documentation exists.

### B1-004 through B1-017 — Held

These candidates retain exact Alibaba URLs, but the mandatory image/IP screen could not be completed because Alibaba returned CAPTCHA/protection pages for direct listing access and the search API did not expose matching image data.

Highest-priority held candidates to revisit when access clears:

- B1-010 coordinates necklace
- B1-016 personalized initial earrings
- B1-008 half-moon coordinates necklace
- B1-013 family multi-name necklace

## Files Updated

- `scripts/create-aug11-batch1-approved-products.mjs`
- `docs/sourcing/aug11-batch1-gate-register.csv`
- `docs/sourcing/ALIBABA_PRODUCT_SOURCE_MASTER.md`
- `docs/sourcing/alibaba-product-source-master.csv`
- `docs/sourcing/SOURCING_DASHBOARD_AUG11.md`
- `reports/alibaba-batch1-live-matches-2026-08-11.json`
- `reports/alibaba-batch1-shopify-create-2026-08-11.json`
- `reports/alibaba-batch1-shopify-qa-2026-08-11.json`
- `reports/alibaba-batch1-original-contact-sheet-2026-08-11.jpg`
- `reports/alibaba-batch1-original-images-2026-08-11/`

## Next Discovery Work

Continue expansion with candidates that expose enough image data through accessible source paths. Prioritize earrings, rings, birth-month styles, coordinates, family/multi-name pieces, and differentiated giftable items. Do not publish products that cannot pass visual/IP, claim, duplicate, source-map, and PDP-quality gates.

An initial Batch 2 API-visible discovery attempt ran on August 11 across birthstone rings, initial earrings, coordinates necklaces, zodiac jewelry, family-name necklaces, and huggie earrings. Alibaba returned HTML/protection responses instead of JSON for all six targeted searches, so no Batch 2 candidates were promoted from that pass.
