# North & Pearl Brand And Creative Audit

Date: 2026-07-21
Owner lens: Curie, Brand & Creative
Scope: `brand/`, `content/`, `reports/`, and available Shopify theme files. No live Shopify changes were made.

## Executive Read

North & Pearl has a strong early brand foundation: elegant, warm, premium, gift-focused, and appropriately cautious about product claims. The written system is directionally consistent across brand strategy, design, voice, photography, packaging, SEO, and product planning.

The largest creative gaps are executional: the storefront still carries inherited Dawn/theme cues, the homepage relies on CSS illustration rather than product photography, product naming is inconsistent between draft catalog and active product reports, and several existing products have weak or unverified media sources. Before broader marketing, North & Pearl needs tighter visual proof, a cleaner naming system, and a launch-ready asset standard.

## Current Brand Consistency Issues

1. Theme identity still leaks through internal configuration and comments.
   - `config/settings_data.json` uses `Dawn` as the current preset.
   - `config/settings_schema.json` still lists the theme name as `Dawn`.
   - `assets/standard-actions-override.js` includes Dawn-specific implementation language.
   - This is mostly internal, but it signals an unfinished brand transformation and can confuse future collaborators.

2. Logo documentation and assets are mostly aligned, but usage should be verified in rendered theme.
   - `brand/logo-system.md` references primary, light, and mark assets.
   - Assets exist: `north-pearl-logo.svg`, `north-pearl-logo-light.svg`, and `north-pearl-mark.svg`.
   - Next QA should confirm header, footer, favicon/social avatar, packaging mockups, and mobile header contrast.

3. Homepage copy is on-brand, but the visual layer feels placeholder-like.
   - `sections/north-pearl-homepage.liquid` uses illustrated product cards, drawn pendants/rings, and a packaging block.
   - For jewelry, shoppers need real product scale, finish, sparkle, clasp/detail, and gift presentation before they trust the brand.

4. Product naming is split between clean product-first drafts and brand-prefixed active catalog reporting.
   - Draft catalog examples: `Custom Name Necklace`, `Initial Pendant Necklace`, `Birthstone Name Necklace`.
   - Active SEO audit examples: `North & Pearl Crystal Row Bracelet`, `North & Pearl Crystal Pulse Bracelet`, `North & Pearl Crystal Link Bracelet`.
   - Storefront product titles should not usually include `North & Pearl`; reserve brand for SEO titles/meta where useful.

5. Some product names are too generic or too similar.
   - Several bracelet names rely on repeated descriptors like `Crystal`, `Heart`, `Flower`, `Modern`, and `Polished`.
   - This creates a premium-brand issue and a catalog navigation issue: products feel interchangeable instead of emotionally distinct.

6. Claim discipline is strong but creates visible draft friction.
   - Product drafts repeatedly state that materials are pending supplier confirmation.
   - This is correct internally, but customer-facing PDPs should eventually replace repeated placeholder warnings with approved product facts or cleaner interim wording.

7. Collection architecture is commercially sound but needs stronger editorial hierarchy.
   - Core collections cover gift intent well: gifts, mothers, wedding/bridesmaids, couple jewelry, name necklaces, initials, birthstone.
   - The collection system needs clear rules for hero imagery, intro voice, tile order, and cross-links so it feels curated rather than SEO-assembled.

8. Packaging direction is premium but still conceptual.
   - `brand/packaging-direction.md` lists ivory box, champagne foil, pouch, insert card, care card, and optional gift message.
   - No final packaging SKU, supplier, insert copy, photography, or fulfillment standard is documented yet.

9. Photography standards are right but underdeveloped.
   - `brand/photography-direction.md` correctly calls for ivory backgrounds, model shots, packaging close-ups, personalization details, gifting moments, and scale references.
   - It needs shot ratios, crop rules, minimum image counts, lighting rules, retouching rules, and marketplace/supplier-image acceptance criteria.

10. Product-media provenance is a launch risk.
   - `reports/alibaba-image-source-verification.md` found 12 active products where only the current single image source is partially verified and additional same-product media is blocked.
   - Similar images should not be used. Products with weak source provenance should be replaced or re-shot before major traffic acquisition.

## Logo And Visual Recommendations

- Use the primary dark wordmark on ivory and soft-white backgrounds.
- Use the light wordmark only on matte black or similarly dark, high-contrast surfaces.
- Use the mark for favicon, social avatar, box seals, pouch tags, packing-slip accents, and very small mobile contexts.
- Keep logo clearspace equal to at least the height of the pearl/star mark.
- Avoid script pairings, glow effects, shadows, foil simulations in UI, stretched marks, or low-contrast taupe/gold logo placement.
- Create a small logo QA checklist: header desktop, header mobile, footer, password page, email header, order notification, package insert, gift card, social avatar, favicon.

## Color And Typography Recommendations

- Keep the current palette: matte black, ivory, soft white, champagne gold, warm taupe, restrained line colors.
- Champagne gold should be an accent for rules, hover states, icons, seals, and small highlights, not a dominant background.
- Use serif headings for emotion and premium cues; keep body copy clean and highly readable.
- Avoid heavy uppercase blocks except short utility labels and announcement text.
- Use the existing 4-8px radius direction; do not drift into overly rounded modern SaaS styling.
- Add a formal token table for color, type scale, spacing, radius, border, and shadow usage.

## Product Naming Rules

Storefront product names should follow this hierarchy:

1. Product-first, not brand-first.
2. Specific enough to distinguish the item.
3. Emotionally elegant, but not ornate.
4. No unsupported material, stone, plating, durability, allergy, or sourcing claims.
5. No competitor-like naming patterns or copied collection concepts.
6. Avoid repeated near-synonyms across similar SKUs.

Recommended formula:

`Descriptor + Motif/Personalization + Product Type`

Examples:

- `Custom Name Necklace`
- `Initial Pendant Necklace`
- `Birthstone-Inspired Name Necklace`
- `Engraved Heart Necklace`
- `Coordinates Bar Necklace`
- `Floral Charm Bracelet`
- `Teardrop Pendant Necklace`
- `Pearl-Style Collarbone Necklace`

Use `North & Pearl` in SEO titles, email subject context, packaging, and brand mentions, not as the visible prefix for every product card.

Avoid until confirmed:

- `Moissanite`
- `Zircon`
- `Gold`
- `Sterling Silver`
- `18K`
- `Waterproof`
- `Tarnish-Free`
- `Hypoallergenic`
- `Nickel-Free`
- `Pearl` when implying real pearl material rather than style

## Collection Naming Standards

Collections should be simple, shopper-intent-led, and emotionally useful.

Approved direction:

- `Name Necklaces`
- `Initial Jewelry`
- `Birthstone-Inspired Jewelry`
- `Couple Jewelry`
- `Bracelets`
- `Rings`
- `Earrings`
- `Gift Edit`
- `Mother's Collection`
- `Wedding & Bridesmaids`
- `Gift Cards`

Use `Gift Edit` when the page is curated. Use `Gifts` when the page is functional/navigation-led. Do not call anything `Best Sellers` until performance data supports it; use `Curated Favorites` or `Editor's Edit` as an interim label.

## Photography Direction

Minimum product media standard:

- 1 clean ivory-background primary image.
- 1 angled detail image showing surface, setting, engraving area, clasp, charm, or personalization.
- 1 scale image on model, hand, neckline, wrist, or ear.
- 1 gift-context image with box, pouch, insert, ribbon, or card once packaging is confirmed.
- 1 variant or finish image when variants exist.
- 1 short video or motion asset for hero products when possible.

Art direction:

- Bright natural light or soft studio light.
- Warm highlights, neutral shadows, no harsh blue-gray cast.
- Ivory, soft white, warm stone, satin, linen, and subtle reflection surfaces.
- Hands, necklines, and styling should feel polished but approachable.
- Crops must leave enough space for Shopify square cards, PDP gallery zoom, Pinterest pins, and email modules.

Do not use:

- Competitor images.
- Visually similar replacement images without exact source verification.
- Heavy filters, dark moody crops, noisy supplier backgrounds, fake sparkle effects, or misleading scale.
- Crops where personalization is unreadable.

## Packaging Direction

Recommended packaging system:

- Ivory rigid jewelry box or drawer box.
- Champagne gold foil or debossed North & Pearl mark.
- Soft pouch or protective insert.
- Minimal care card with approved care language only.
- Gift message card with restrained typography.
- Packing insert that reinforces the promise: `Crafted for life's meaningful moments.`

Packaging must remain claim-safe:

- Do not promise gift box inclusion unless operationally confirmed.
- Do not imply luxury materials, sustainability, recycled content, waterproofing, tarnish resistance, or hypoallergenic qualities unless verified.
- Define packaging variants before photography so the website does not promise more than fulfillment can deliver.

## Creative Standards

- Lead with meaning, memory, gifting, and everyday wearability.
- Keep product detail copy clear and concrete.
- Use `birthstone-inspired` until stone authenticity is confirmed.
- Use `pearl-style` or `pearl-inspired` until pearl materials are confirmed.
- Use `gold-tone` only if supplier documentation supports finish appearance and it does not imply precious metal content.
- Every published PDP needs: product name, meaningful short description, personalization guidance where relevant, confirmed material/finish details or claim-safe placeholder, care note, gifting note, image set, SEO title, meta description, and FAQ.
- Every collection page needs: clear H1, short original intro, shopper-intent merchandising, related collection links, and below-grid support copy.
- Every marketing asset should include one concrete shopper reason: birthday, anniversary, mother, bridesmaid, partner, self-gift, milestone, memory, initials, name, date, coordinate, or birth-month detail.

## Risks

- Trust risk: real product photography is not yet strong enough to support a premium jewelry promise.
- Claim risk: active and planned products include names that could imply unverified materials or stones.
- Catalog risk: similar product names weaken perceived curation and may create duplicate/thin SEO intent.
- Source risk: some active media cannot be expanded safely without exact supplier/listing verification.
- Packaging risk: gift-ready positioning could overpromise if packaging operations are not finalized.
- Brand drift risk: Dawn/internal theme artifacts and placeholder visuals can keep the site feeling like a customized template.
- Review/proof risk: customer-review areas correctly avoid fake reviews, but the brand needs alternative proof points until verified reviews exist.

## First 10 Creative Tasks

1. Rename customer-facing active product titles to remove routine `North & Pearl` prefixes and reduce similar-name collisions.
2. Create a product naming matrix for all active and draft products with approved names, claim flags, and SEO title variants.
3. Audit all visible product names for material/stone implication risk: moissanite, zircon, pearl, gold, birthstone, crystal, gemstone.
4. Replace homepage CSS jewelry illustrations with real product, packaging, or approved generated placeholder imagery that clearly reads as jewelry.
5. Define a minimum PDP media standard and mark each active product as pass, partial pass, replace, or reshoot.
6. Build packaging creative specs: box color, logo placement, insert card copy, care card copy, gift message card, and photo requirements.
7. Create a collection hero standard for `Gift Edit`, `Mother's Collection`, `Wedding & Bridesmaids`, `Name Necklaces`, and `Initial Jewelry`.
8. Produce a logo usage QA sheet for website, email, social, packaging, favicon, and mobile header.
9. Rewrite placeholder material language into two tiers: internal supplier-pending notes and customer-facing claim-safe product copy.
10. Create a 30-day social creative direction board: gift occasions, personalization close-ups, packaging moments, customer education, and seasonal gift prompts.

## Coordination Notes

- Work with Kuhn to replace placeholder homepage visuals and remove template identity leaks from the theme.
- Work with Faraday to align blog, email, and social copy with product naming and claim language.
- Work with Gauss to prioritize PDP image remediation and catalog title cleanup.
- Work with Wegener before final packaging copy, package-inclusion promises, shipping language, or care-card claims are published.
