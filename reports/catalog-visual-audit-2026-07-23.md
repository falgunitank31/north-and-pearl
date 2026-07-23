# Catalog Visual Audit - 2026-07-23

Owners: Kuhn + Gauss  
Scope: North & Pearl catalog image/brand risk audit from current reports, with read-only Shopify media-status support where available.  
Constraint: No Shopify mutations. No unsupported visual claims.

## Evidence Used

- `reports/product-seo-catalog-audit.csv`
- `reports/product-seo-catalog-audit.md`
- `reports/merchant-center-readiness-2026-07-22.csv`
- `reports/merchant-center-readiness-2026-07-22.md`
- `reports/catalog-media-qa-incident-2026-07-22.md`
- `reports/kuhn-product-visual-standard-2026-07-23.md`
- `reports/gauss-catalog-quality-gate-2026-07-23.md`
- `reports/alibaba-image-source-verification.md`
- `reports/alibaba-proposed-media-map.json`
- Read-only run of `node scripts/audit-product-media-quality.mjs` on 2026-07-23. This queried Shopify media status/count/dimensions only; it did not mutate Shopify.

## Count Reconciliation

- `reports/merchant-center-readiness-2026-07-22.md` says 77 active products were audited.
- `reports/product-seo-catalog-audit.csv` and `reports/merchant-center-readiness-2026-07-22.csv` each contain 77 lines including the header, which means 76 product rows are present in each CSV.
- A read-only Shopify media query returned 100 North & Pearl products in its first page, including 77 `ACTIVE` and 23 `DRAFT` records.
- Because the CSV exports available in-repo list 76 product rows, this report treats those 76 rows as the auditable report-backed active-product detail set and flags the one-row discrepancy for follow-up. Do not treat this as proof that one active product is missing from Shopify; it is only a report export mismatch.

## Contact Sheet Feasibility

A thumbnail contact sheet was attempted in principle by running the existing media audit path. The available script returned product status, image count, dimensions, and a thumbnail-name heuristic, but it does not render or save visible thumbnails. I did not create a visual contact sheet in this pass. Therefore:

- Products are not visually approved from thumbnail inspection in this report.
- Products with no report-supported defect are listed as `Keep active; visual spot-check still recommended`.
- Any future activation or reactivation still requires Kuhn visual inspection against `reports/kuhn-product-visual-standard-2026-07-23.md`.

## Overall Decision

Keep the current active catalog live where existing reports show adequate image counts/dimensions and no documented visual defect. Do not draft active products from this report alone unless a visible image review finds supplier branding, competitor card copy, watermarks, unsupported claim overlays, unconfirmed packaging/certificates, marketplace UI, or inaccurate product representation.

Products already drafted for media/source risk should remain draft until replacement media is verified from exact sources and passes Kuhn/Tesla review.

## Active Products To Keep Active

Evidence basis: current CSV rows show at least 3 images, primary/minimum image dimensions at or above the 700 x 700 emergency floor, and no report-supported visual defect. `claim-review-needed` means copy/source claims remain conservative; it is not, by itself, a visual media replacement finding.

| Product | Handle | Type | Images | Min Size | Report Issue | Decision |
|---|---|---:|---:|---:|---|---|
| North & Pearl Chunky Bead Bracelet | `north-pearl-chunky-bead-bracelet` | Bracelet | 6 | 1000x1000 | claim-review-needed | Keep active; no report-supported visual defect. |
| North & Pearl Color Accent Cuff | `north-pearl-color-accent-cuff` | Bracelet | 6 | 1000x1000 | claim-review-needed | Keep active; no report-supported visual defect. |
| North & Pearl Iridescent Pendant Necklace | `north-pearl-iridescent-pendant-necklace` | Necklace | 3 | 1000x1000 | claim-review-needed | Keep active; no report-supported visual defect. |
| North & Pearl Sparkle Accent Bracelet | `north-pearl-sparkle-accent-bracelet` | Bracelet | 6 | 800x800 | claim-review-needed | Keep active; no report-supported visual defect. |
| North & Pearl Sparkle Halo Bracelet | `north-pearl-sparkle-halo-bracelet` | Bracelet | 6 | 800x800 | claim-review-needed | Keep active; no report-supported visual defect. |
| North & Pearl Sparkle Link Bracelet | `north-pearl-sparkle-link-bracelet` | Bracelet | 6 | 800x800 | claim-review-needed | Keep active; no report-supported visual defect. |
| North & Pearl Sparkle Pulse Bracelet | `north-pearl-sparkle-pulse-bracelet` | Bracelet | 6 | 800x800 | claim-review-needed | Keep active; no report-supported visual defect. |
| North & Pearl Sparkle Row Bracelet | `north-pearl-sparkle-row-bracelet` | Bracelet | 6 | 800x800 | claim-review-needed | Keep active; no report-supported visual defect. |
| North & Pearl Warm Bead Stretch Bracelet | `north-pearl-warm-bead-stretch-bracelet` | Bracelet | 6 | 900x900 | claim-review-needed | Keep active; no report-supported visual defect. |
| North & Pearl Bead Bracelet | `north-pearl-bead-bracelet` | Bracelet | 6 | 900x900 | none | Keep active; no report-supported visual defect. |
| North & Pearl Bead Earrings | `north-pearl-bead-earrings` | Earrings | 6 | 1200x1200 | none | Keep active; no report-supported visual defect. |
| North & Pearl Bead Jewelry Set | `north-pearl-bead-jewelry-set` | Gift Set | 6 | 1300x1300 | none | Keep active; no report-supported visual defect. |
| North & Pearl Bloom Charm Bracelet | `north-pearl-bloom-charm-bracelet` | Bracelet | 6 | 1500x1500 | none | Keep active; no report-supported visual defect. |
| North & Pearl Bridal Water Drop Set | `north-pearl-bridal-water-drop-set` | Gift Set | 6 | 800x800 | none | Keep active; no report-supported visual defect. |
| North & Pearl Classic Initial Necklace | `north-pearl-initial-necklace` | Necklace | 6 | 750x750 | none | Keep active; no report-supported visual defect. |
| North & Pearl Classic Name Necklace | `north-pearl-name-necklace` | Necklace | 6 | 1000x1000 | none | Keep active; no report-supported visual defect. |
| North & Pearl Clover Bracelet | `north-pearl-clover-bracelet` | Bracelet | 6 | 1000x1000 | none | Keep active; no report-supported visual defect. |
| North & Pearl Clover Charm Bracelet | `north-pearl-clover-charm-bracelet` | Bracelet | 5 | 1200x1200 | none | Keep active; no report-supported visual defect. |
| North & Pearl Clover Earrings | `north-pearl-clover-earrings` | Earrings | 6 | 743x743 | none | Keep active; no report-supported visual defect. |
| North & Pearl Custom Name Pendant | `north-pearl-name-necklace-1832` | Necklace | 6 | 900x900 | none | Keep active; no report-supported visual defect. |
| North & Pearl Custom Script Pendant | `north-pearl-name-necklace-2338` | Necklace | 6 | 1000x1000 | none | Keep active; no report-supported visual defect. |
| North & Pearl Dainty Flower Necklace | `north-pearl-dainty-flower-necklace` | Necklace | 6 | 800x800 | none | Keep active; no report-supported visual defect. |
| North & Pearl Dainty Initial Charm | `north-pearl-initial-necklace-6130` | Necklace | 3 | 800x800 | none | Keep active; no report-supported visual defect. |
| North & Pearl Dainty Letter Pendant | `north-pearl-letter-necklace-6404` | Necklace | 5 | 800x800 | none | Keep active; no report-supported visual defect. |
| North & Pearl Dainty Name Necklace | `north-pearl-name-necklace-6687` | Necklace | 6 | 714x857 | none | Keep active; no report-supported visual defect. |
| North & Pearl Dainty Sparkle Ring | `north-pearl-sparkle-ring` | Ring | 3 | 760x760 | none | Keep active; no report-supported visual defect. |
| North & Pearl Everyday Curve Earrings | `north-pearl-everyday-curve-earrings` | Earrings | 6 | 750x750 | none | Keep active; no report-supported visual defect. |
| North & Pearl Everyday Letter Necklace | `north-pearl-letter-necklace-0021` | Necklace | 6 | 1000x1000 | none | Keep active; no report-supported visual defect. |
| North & Pearl Everyday Link Bracelet | `north-pearl-signature-bracelet` | Bracelet | 6 | 1000x1000 | none | Keep active; no report-supported visual defect. |
| North & Pearl Everyday Name Necklace | `north-pearl-name-necklace-5330` | Necklace | 6 | 750x750 | none | Keep active; no report-supported visual defect. |
| North & Pearl Floating Name Necklace | `north-pearl-name-necklace-4075` | Necklace | 6 | 1000x1000 | none | Keep active; no report-supported visual defect. |
| North & Pearl Floral Accent Bracelet | `north-pearl-floral-accent-bracelet` | Bracelet | 6 | 1024x1024 | none | Keep active; no report-supported visual defect. |
| North & Pearl Flower Earrings | `north-pearl-flower-earrings` | Earrings | 6 | 800x800 | none | Keep active; no report-supported visual defect. |
| North & Pearl Flower Jewelry Set | `north-pearl-flower-jewelry-set` | Gift Set | 6 | 1000x1000 | none | Keep active; no report-supported visual defect. |
| North & Pearl Flower Nail Bangle | `north-pearl-flower-nail-bangle` | Bracelet | 6 | 800x800 | none | Keep active; no report-supported visual defect. |
| North & Pearl Framed Initial Necklace | `north-pearl-initial-necklace-6868` | Necklace | 6 | 800x800 | none | Keep active; no report-supported visual defect. |
| North & Pearl Garden Bloom Bracelet | `north-pearl-garden-bloom-bracelet` | Bracelet | 4 | 1000x1000 | none | Keep active; no report-supported visual defect. |
| North & Pearl Giftable Name Necklace | `north-pearl-name-necklace-6429` | Necklace | 6 | 794x794 | none | Keep active; no report-supported visual defect. |
| North & Pearl Heart Bracelet | `north-pearl-heart-bracelet` | Bracelet | 6 | 1024x1024 | none | Keep active; no report-supported visual defect. |
| North & Pearl Heart Charm Necklace | `north-pearl-heart-charm-necklace` | Necklace | 6 | 800x800 | none | Keep active; no report-supported visual defect. |
| North & Pearl Heart Earrings | `north-pearl-heart-earrings` | Earrings | 6 | 800x800 | none | Keep active; no report-supported visual defect. |
| North & Pearl Heart Jewelry Set | `north-pearl-heart-jewelry-set` | Gift Set | 6 | 1200x1200 | none | Keep active; no report-supported visual defect. |
| North & Pearl Heart Keepsake Necklace | `north-pearl-heart-keepsake-necklace` | Necklace | 6 | 1000x1000 | none | Keep active; no report-supported visual defect. |
| North & Pearl Heart Ring | `north-pearl-heart-ring` | Ring | 6 | 2000x2000 | none | Keep active; no report-supported visual defect. |
| North & Pearl Hollow Flower Bangle Set | `north-pearl-hollow-flower-bangle-set` | Bracelet | 6 | 1024x1024 | none | Keep active; no report-supported visual defect. |
| North & Pearl Initial Shell Necklace | `north-pearl-initial-shell-necklace` | Necklace | 6 | 800x800 | none | Keep active; no report-supported visual defect. |
| North & Pearl Layered Initial Necklace | `north-pearl-initial-necklace-1814` | Necklace | 6 | 700x700 | none | Keep active; no report-supported visual defect. |
| North & Pearl Layered Letter Necklace | `north-pearl-letter-necklace-5856` | Necklace | 4 | 750x750 | none | Keep active; no report-supported visual defect. |
| North & Pearl Minimal Letter Pendant | `north-pearl-letter-necklace-4171` | Necklace | 6 | 800x800 | none | Keep active; no report-supported visual defect. |
| North & Pearl Mixed Charm Bangle | `north-pearl-mixed-charm-bangle` | Bracelet | 6 | 800x800 | none | Keep active; no report-supported visual defect. |
| North & Pearl Modern Drop Earrings | `north-pearl-modern-drop-earrings` | Earrings | 6 | 1024x1024 | none | Keep active; no report-supported visual defect. |
| North & Pearl Modern Statement Ring | `north-pearl-modern-statement-ring` | Ring | 6 | 1000x1000 | none | Keep active; no report-supported visual defect. |
| North & Pearl Nameplate Necklace | `north-pearl-name-necklace-0523` | Necklace | 6 | 819x818 | none | Keep active; no report-supported visual defect. |
| North & Pearl Oval Link Bracelet | `north-pearl-chain-bracelet` | Bracelet | 6 | 950x950 | none | Keep active; no report-supported visual defect. |
| North & Pearl Petite Love Pendant | `north-pearl-heart-necklace-4710` | Necklace | 6 | 1000x1000 | none | Keep active; no report-supported visual defect. |
| North & Pearl Pink Heart Bow Bracelet | `north-pearl-pink-heart-bow-bracelet` | Bracelet | 6 | 1024x1024 | none | Keep active; no report-supported visual defect. |
| North & Pearl Polished Initial Pendant | `north-pearl-initial-necklace-6010` | Necklace | 6 | 2000x2000 | none | Keep active; no report-supported visual defect. |
| North & Pearl Polished Letter Necklace | `north-pearl-letter-necklace-9008` | Necklace | 5 | 741x800 | none | Keep active; no report-supported visual defect. |
| North & Pearl Polished Link Bracelet | `north-pearl-polished-link-bracelet` | Bracelet | 4 | 800x800 | none | Keep active; no report-supported visual defect. |
| North & Pearl Polished Name Necklace | `north-pearl-name-necklace-7262` | Necklace | 6 | 800x800 | none | Keep active; no report-supported visual defect. |
| North & Pearl Polished Sparkle Ring | `north-pearl-sparkle-ring-4269` | Ring | 6 | 800x800 | none | Keep active; no report-supported visual defect. |
| North & Pearl Refined Name Necklace | `north-pearl-name-necklace-1996` | Necklace | 6 | 929x929 | none | Keep active; no report-supported visual defect. |
| North & Pearl Script Name Necklace | `north-pearl-name-necklace-6152` | Necklace | 6 | 1000x1000 | none | Keep active; no report-supported visual defect. |
| North & Pearl Sculpted Curve Earrings | `north-pearl-sculpted-curve-earrings` | Earrings | 6 | 750x750 | none | Keep active; no report-supported visual defect. |
| North & Pearl Sculpted Heart Pendant | `north-pearl-heart-necklace` | Necklace | 6 | 800x800 | none | Keep active; no report-supported visual defect. |
| North & Pearl Sleek Flex Bracelet | `north-pearl-sleek-flex-bracelet` | Bracelet | 6 | 800x800 | none | Keep active; no report-supported visual defect. |
| North & Pearl Smooth Chain Necklace | `north-pearl-chain-necklace` | Necklace | 6 | 794x706 | none | Keep active; no report-supported visual defect. |
| North & Pearl Smooth Flex Bracelet | `north-pearl-smooth-flex-bracelet` | Bracelet | 6 | 800x800 | none | Keep active; no report-supported visual defect. |
| North & Pearl Smooth Layering Bracelet | `north-pearl-snake-chain-bracelet` | Bracelet | 6 | 800x800 | none | Keep active; no report-supported visual defect. |
| North & Pearl Sparkle Accent Necklace | `north-pearl-sparkle-necklace-5629` | Necklace | 6 | 800x800 | none | Keep active; no report-supported visual defect. |
| North & Pearl Sparkle Bracelet | `north-pearl-sparkle-bracelet` | Bracelet | 6 | 1200x1200 | none | Keep active; no report-supported visual defect. |
| North & Pearl Sparkle Drop Necklace | `north-pearl-sparkle-necklace-2894` | Necklace | 6 | 2000x2000 | none | Keep active; no report-supported visual defect. |
| North & Pearl Sweet Heart Keepsake Necklace | `north-pearl-heart-necklace-1947` | Necklace | 6 | 1458x1458 | none | Keep active; no report-supported visual defect. |
| North & Pearl Sweetheart Pendant Necklace | `north-pearl-sweetheart-pendant-necklace` | Necklace | 6 | 1000x1000 | none | Keep active; no report-supported visual defect. |
| North & Pearl Twine Band Ring | `north-pearl-twine-band-ring` | Ring | 6 | 1000x1000 | none | Keep active; no report-supported visual defect. |
| North & Pearl V Water Drop Jewelry Set | `north-pearl-v-water-drop-jewelry-set` | Gift Set | 6 | 800x800 | none | Keep active; no report-supported visual defect. |
| North & Pearl Water Drop Jewelry Set | `north-pearl-water-drop-jewelry-set` | Gift Set | 6 | 750x750 | none | Keep active; no report-supported visual defect. |

## Active Products With Claim/Source Caution

These 9 active rows should remain live under conservative copy controls, but stronger material, stone, finish, sizing, durability, or care claims require supplier documentation and/or sample verification before copy or image overlays imply them.

| Product | Handle | Reason | Next Requirement |
|---|---|---|---|
| North & Pearl Chunky Bead Bracelet | `north-pearl-chunky-bead-bracelet` | `claim-review-needed` in product SEO audit. | Keep images claim-neutral; verify material, bead composition, finish, sizing, and care details before stronger claims. |
| North & Pearl Color Accent Cuff | `north-pearl-color-accent-cuff` | `claim-review-needed` in product SEO audit. | Keep images claim-neutral; verify materials, stones/color accents, finish, sizing, and durability before stronger claims. |
| North & Pearl Iridescent Pendant Necklace | `north-pearl-iridescent-pendant-necklace` | `claim-review-needed` in product SEO audit. | Keep images claim-neutral; verify material, iridescent/stone details, finish, and chain measurements before stronger claims. |
| North & Pearl Sparkle Accent Bracelet | `north-pearl-sparkle-accent-bracelet` | `claim-review-needed` in product SEO audit. | Keep images claim-neutral; verify stone/accent, setting, material, finish, and sizing before stronger claims. |
| North & Pearl Sparkle Halo Bracelet | `north-pearl-sparkle-halo-bracelet` | `claim-review-needed` in product SEO audit. | Keep images claim-neutral; verify materials, stones/accent details, finish, and sizing before stronger claims. |
| North & Pearl Sparkle Link Bracelet | `north-pearl-sparkle-link-bracelet` | `claim-review-needed` in product SEO audit. | Keep images claim-neutral; verify stone/accent details, link construction, finish, material, and sizing before stronger claims. |
| North & Pearl Sparkle Pulse Bracelet | `north-pearl-sparkle-pulse-bracelet` | `claim-review-needed` in product SEO audit. | Keep images claim-neutral; verify materials, stones/accent details, finish, and sizing before stronger claims. |
| North & Pearl Sparkle Row Bracelet | `north-pearl-sparkle-row-bracelet` | `claim-review-needed` in product SEO audit. | Keep images claim-neutral; verify stone/accent, setting, finish, material, and sizing before stronger claims. |
| North & Pearl Warm Bead Stretch Bracelet | `north-pearl-warm-bead-stretch-bracelet` | `claim-review-needed` in product SEO audit. | Keep images claim-neutral; verify material, bead finish, stretch construction, and sizing before stronger claims. |

## Products To Draft Or Replace Media

No additional active product should be drafted from this report alone because no visible thumbnail contact sheet was completed and the current CSV/detail reports do not document a new active-product visual defect.

The following products are already documented as draft/media-risk items in current reports and should remain draft or receive replacement media before any reactivation.

### Draft Until Exact Source Or 3+ Exact Images Are Verified

Evidence: `reports/gauss-catalog-quality-gate-2026-07-23.md`, `reports/alibaba-image-source-verification.md`, and `reports/alibaba-proposed-media-map.json`.

| Product | Handle | Reason | Exact Next Media Requirement |
|---|---|---|---|
| North & Pearl Birth-Month Name Necklace | `north-pearl-birthstone-name-necklace` | Partial source recovery only; additional same-product image set not verified. | Find exact supplier product listing or replace with a verified same-product image set containing at least 3 usable images, preferred 5-6, with source URL, supplier name, image URLs, access date, and dimensions recorded. |
| North & Pearl Classic Tennis Bracelet | `north-pearl-classic-tennis-bracelet` | Partial source recovery only; additional same-product image set not verified. | Find exact supplier product listing or replace with a verified tennis bracelet candidate with at least 3 exact same-product images, preferred 5-6. |
| North & Pearl Green Accent Statement Ring | `north-pearl-emerald-statement-ring` | Partial source recovery only; additional same-product image set not verified. | Find exact source listing or replace media with at least 3 verified same-ring images showing hero, detail, and scale; avoid gemstone/material claims until documented. |
| North & Pearl Geometric Drop Earrings | `north-pearl-geometric-drop-earrings` | Partial source recovery only; additional same-product image set not verified. | Find exact source listing or replace media with at least 3 verified same-earring images showing pair/sold configuration, detail, and scale. |
| North & Pearl Heart Bangle Bracelet | `north-pearl-heart-bangle-bracelet` | Partial source recovery only; additional same-product image set not verified. | Find exact source listing or replace media with at least 3 verified same-bangle images showing closure/heart detail and wrist/display scale. |
| North & Pearl Letter Charm Bracelet | `north-pearl-letter-charm-bracelet` | Current full-size image source is recorded, but no additional matching image set is verified. | Keep draft until exact listing or 3+ exact same-product images are verified, including personalization/letter option imagery where relevant. |
| North & Pearl Minimal Water Drop Necklace | `north-pearl-minimal-water-drop-necklace` | Partial source recovery only; additional same-product image set not verified. | Find exact source listing or replace media with at least 3 verified same-necklace images showing pendant, chain, and scale. |
| North & Pearl Brilliant Gift Ring | `north-pearl-moissanite-gift-ring` | Partial source recovery only; additional same-product image set not verified; claim-sensitive title history. | Find exact source listing or replace media with at least 3 verified same-ring images; do not use moissanite, certificate, stone, or material claims unless exact documentation is approved. |
| North & Pearl Bead Collarbone Necklace | `north-pearl-pearl-collarbone-necklace` | Partial source recovery only; additional same-product image set not verified; claim-sensitive handle history. | Find exact source listing or replace media with at least 3 verified same-necklace images; do not imply genuine pearl/material facts without documentation. |
| North & Pearl Square Sparkle Jewelry Set | `north-pearl-square-zircon-jewelry-set` | Partial source recovery only; additional same-product image set not verified; claim-sensitive handle history. | Find exact source listing or replace media with at least 3 verified same-set images showing all included components; do not use zircon/material claims without documentation. |
| North & Pearl Stackable Warm Bracelet | `north-pearl-stackable-gold-bracelet` | Partial source recovery only; additional same-product image set not verified; claim-sensitive handle history. | Find exact source listing or replace media with at least 3 verified same-bracelet images; avoid gold/plating claims unless documented. |
| North & Pearl Teardrop Birthstone Necklace | `north-pearl-teardrop-birthstone-necklace` | Partial source recovery only; additional same-product image set not verified. | Find exact source listing or replace media with at least 3 verified same-necklace images; verify color/birth-month options before showing variant graphics. |

### Drafted After Visual Media Incident

Evidence: `reports/catalog-media-qa-incident-2026-07-22.md`. These products were drafted after a visual contact-sheet audit found supplier branding, third-party logos, unrelated card copy, unsupported claim overlays, or other brand-safety concerns. The incident report lists handles, not per-product screenshots, so this report does not assign more granular product-by-product visual defects.

| Handle | Exact Next Media Requirement |
|---|---|
| `north-pearl-minimal-pendant-necklace` | Replace all risky supplier/third-party card imagery. Reactivate only with a clean product-first hero plus detail and scale images, all free of other brand/card copy, logos, watermarks, unsupported claim overlays, and unconfirmed packaging. |
| `north-pearl-smooth-band-ring` | Replace risky media with exact same-ring images: clean hero, detail, and scale; no supplier branding or claim overlays. |
| `north-pearl-double-heart-pendant` | Replace risky media with exact same-pendant images: clean hero, pendant/chain detail, and neckline/display scale; no other brand card copy. |
| `north-pearl-linear-sparkle-bracelet` | Replace risky media with exact same-bracelet images: clean hero, sparkle/detail close-up, and wrist/display scale; no claim overlays. |
| `north-pearl-heart-drop-necklace` | Replace risky media with exact same-necklace images: clean hero, pendant/chain detail, and scale; no supplier or third-party branding. |
| `north-pearl-sparkle-bead-bracelet` | Replace risky media with exact same-bracelet images: clean hero, bead/detail close-up, and wrist/display scale; no unsupported material or quality overlays. |
| `north-pearl-signature-necklace` | Replace risky media with exact same-necklace images: clean hero, detail, and scale; no unrelated card copy or brand marks. |
| `north-pearl-letter-necklace` | Replace risky media with exact same-letter necklace images: clean hero, letter/personalization detail, and scale; variant/letter imagery only when accurate. |
| `north-pearl-letter-necklace-5321` | Replace risky media with exact same-letter necklace images: clean hero, letter/personalization detail, and scale; variant/letter imagery only when accurate. |
| `north-pearl-sparkle-necklace` | Replace risky media with exact same-necklace images: clean hero, sparkle/detail close-up, and scale; no claim overlays. |
| `north-pearl-initial-necklace-5109` | Replace risky media with exact same-initial necklace images: clean hero, initial detail, and scale; variant imagery only when accurate. |
| `north-pearl-letter-necklace-1851` | Replace risky media with exact same-letter necklace images: clean hero, letter detail, and scale; no supplier branding. |
| `north-pearl-initial-necklace-8711` | Replace risky media with exact same-initial necklace images: clean hero, initial detail, and scale; no supplier branding or claim overlays. |
| `north-pearl-sparkle-necklace-4446` | Replace risky media with exact same-necklace images: clean hero, sparkle/detail close-up, and scale; no unsupported stone/material claims. |
| `north-pearl-chain-necklace-4276` | Replace risky media with exact same-chain necklace images: clean hero, chain/detail view, and scale; no supplier or third-party brand marks. |

## Exact Next Media Requirements For Any Replacement

Every replacement set must meet these requirements before activation or reactivation:

1. Exact source evidence recorded: supplier/listing URL, supplier name, source title, source product ID where available, source image URLs, access date, and reviewer.
2. At least 3 accurate usable images per active product: clean hero, detail close-up, and scale image. Preferred target is 5-6 images.
3. Minimum image size is 700 x 700 px; preferred source size is 1000 x 1000 px or larger.
4. First image must be product-first, square-safe, clean, and suitable for collection cards.
5. No supplier logos, competitor branding, watermarks, marketplace UI, QR codes, SKU labels, pricing, shipping badges, or third-party product cards.
6. No unsupported image claims, including sterling silver, solid gold, gold vermeil, 18K, waterproof, tarnish-free, hypoallergenic, nickel-free, moissanite, natural gemstone, genuine pearl, recycled metal, certification, packaging, warranty, or delivery-speed promises unless exact documentation is approved.
7. No unconfirmed packaging, certificate, pouch, insert, ribbon, care card, or gift-box imagery unless Lovelace/operations confirms those exact inclusions.
8. Images must not misrepresent chain thickness, pendant size, stone/accent size, finish, color, ring width, bracelet closure, earring sold configuration, variants, or included accessories.
9. Alt text should use the safe format: `North & Pearl [Product Name] product image [number]`, avoiding unsupported material or gemstone terms.
10. Reactivation sequence: Gauss confirms source and image records, Kuhn approves visual accuracy/brand fit/order, Tesla confirms PDP/collection/mobile rendering and add-to-cart path.

## Follow-Up

- Re-run the product CSV export so the reported 77 active products produce 77 product rows, not 76.
- Generate a true thumbnail contact sheet from first images for all active products and inspect it visually against Kuhn's standard.
- Treat dimension/count audits as screening only. The 2026-07-22 incident proves that image count and size can pass while brand risk remains visible in the image itself.
