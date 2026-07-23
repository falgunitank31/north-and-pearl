# North & Pearl Catalog Media QA Incident

Date: 2026-07-22
Owner: Lead Orchestrator
Agents: Gauss, Kuhn, Tesla

## Trigger

The live product `north-pearl-minimal-pendant-necklace` was reported because the product page looked unacceptable. The product had six media records, but the first image showed another brand's necklace card and was not suitable for North & Pearl.

## Root Cause

The previous media audit checked whether images existed and whether image dimensions were large enough. It did not visually inspect for:

- Supplier branding
- Third-party logos
- Packaging/card copy from another brand
- Unsupported material or quality claim overlays
- Foreign-language specification graphics
- Poor first-image customer presentation

## Immediate Fix Applied

The product below was changed from `ACTIVE` to `DRAFT`:

- `North & Pearl Minimal Pendant Necklace`
- Handle: `north-pearl-minimal-pendant-necklace`
- Reason: supplier/third-party branded product-card imagery
- Storefront verification: product URL now returns `404`, which is expected for a drafted product

## Additional Active Products Drafted

The following active products were also drafted after a visual contact-sheet audit because the primary imagery included supplier branding, third-party logos, unrelated card copy, unsupported claim overlays, or other brand-safety concerns:

- `north-pearl-smooth-band-ring`
- `north-pearl-double-heart-pendant`
- `north-pearl-linear-sparkle-bracelet`
- `north-pearl-heart-drop-necklace`
- `north-pearl-sparkle-bead-bracelet`
- `north-pearl-signature-necklace`
- `north-pearl-letter-necklace`
- `north-pearl-letter-necklace-5321`
- `north-pearl-sparkle-necklace`
- `north-pearl-initial-necklace-5109`
- `north-pearl-letter-necklace-1851`
- `north-pearl-initial-necklace-8711`
- `north-pearl-sparkle-necklace-4446`
- `north-pearl-chain-necklace-4276`

## New Catalog Activation Rule

Gauss must not activate a product unless its visible storefront media passes all checks below:

- The first image clearly shows the actual product being sold.
- No supplier logo, manufacturer logo, marketplace badge, watermark, or unrelated brand name is visible.
- No unsupported claims are visible in the image, including hypoallergenic, waterproof, nickel-free, sterling silver, 18K, gold plated, or similar claims unless verified and approved.
- No foreign-language specification card is used as the primary product image.
- No packaging or product card implies a different brand.
- Product appearance is accurate and does not overpromise chain thickness, stone size, finish, or included accessories.
- Gallery contains at least three usable product images, unless the product is intentionally held as draft for sourcing review.

## Follow-Up

Gauss should source clean, accurate replacement media from the exact supplier listings before reactivating any drafted product. Kuhn should approve the visual presentation for first images. Tesla should keep the storefront gallery layout stable, but product activation is blocked by media quality until replacement assets are clean.
