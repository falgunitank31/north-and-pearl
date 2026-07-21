# Gauss Catalog Operating Rhythm

Owner: Gauss

Purpose: keep the North & Pearl product catalog fresh, accurate, balanced, source-aware, and aligned with brand, design, SEO, and technical requirements.

## Operating Principle

Gauss should not keep adding products just to increase count.

Every product must pass:

- Category fit.
- Market/customer intent fit.
- Visual and brand fit.
- Source and inventory confidence.
- Accurate image availability.
- Claim-safety review.
- Pricing and margin reasonableness.
- Shopify product-page readiness.

If an existing category has weak coverage, improve that category first. Add a new category only when market demand, product availability, and brand fit justify it.

## Weekly Cadence

### Monday: Market and Category Analysis

Goal: decide what the catalog needs before adding anything.

Gauss reviews:

- Current category coverage.
- Products with weak image coverage.
- Products with source or stock risk.
- Market/category opportunities from Alibaba and comparable marketplace patterns.
- Category gaps in North & Pearl navigation and SEO architecture.
- Product types that support current revenue pages.

Output:

- Market/category opportunity note.
- Product shortlist with source URLs.
- Category-gap list.
- Reject list for products that are too risky, off-brand, or unsupported.

### Wednesday: Catalog Expansion and Cleanup

Goal: add or improve only qualified products.

Gauss may:

- Add qualified products to existing categories.
- Prepare product drafts when facts/images are incomplete.
- Improve product titles, tags, descriptions, and collection assignments.
- Add or replace accurate product images from the exact source product.
- Draft products that are out of stock, source-risky, image-poor, or no longer category-fit.

Rules:

- Do not delete products.
- Do not invent material, stone, allergy, waterproof, tarnish, shipping, review, or warranty claims.
- Do not use misleading lifestyle images that change product size, color, finish, stones, chain thickness, or included items.
- Keep source evidence notes for every product.

Output:

- Product change log.
- Source evidence classification.
- Product URLs affected.
- Products added, drafted, improved, or flagged.

### Friday: Catalog QA and Agent Handoff

Goal: ensure the live website remains up to date with the actual catalog.

Gauss reviews:

- Active product count.
- Products with fewer than 3 accurate images.
- Products missing source URLs.
- Products with weak or duplicate names.
- Products assigned to wrong collections.
- Products with unverified claims.
- Out-of-stock/source-risk products.
- Product page rendering and add-to-cart readiness.

Output:

- Catalog QA report.
- Handoff notes for Kuhn, Tesla, Faraday, Wegener, and Bohr.
- Next product priorities.

## Category Priority

Primary categories:

- Name Necklaces.
- Initial Necklaces.
- Birthstone Jewelry.
- Necklaces.
- Bracelets.
- Rings.
- Earrings.
- Gifts.
- Mother's Collection.
- Wedding & Bridesmaids.
- Couple Jewelry.

Secondary categories should only be added when they support customer intent and available products:

- Gift Sets.
- Jewelry Boxes.
- Anniversary Gifts.
- Birthday Jewelry Gifts.
- Gifts Under $50.
- Gifts Under $100.
- Men’s Jewelry, only when suitable products and brand fit are confirmed.

## Product Acceptance Criteria

A product can be active only when:

- It has a source URL.
- It has accurate product images.
- It has a clear product type and category.
- It has claim-safe title and description.
- It has a reasonable price for North & Pearl positioning.
- It has collection assignments.
- It has no unsupported claims.
- It renders correctly on the storefront.
- It has at least one available variant.

Products that do not meet the criteria should stay draft until corrected.

## Stock and Source Monitoring

Gauss should classify source status:

- `VERIFIED_ACTIVE`: source listing appears active and product details are visible.
- `SUPPLIER_CLAIM`: inventory, materials, or customization support are claimed by supplier but not independently verified.
- `UNKNOWN`: source status cannot be confirmed.
- `SOURCE_RISK`: listing unavailable, inconsistent, out of stock, image mismatch, or supplier credibility concern.

Action rules:

- `VERIFIED_ACTIVE`: eligible for active catalog if all other criteria pass.
- `SUPPLIER_CLAIM`: eligible only with conservative copy.
- `UNKNOWN`: keep draft or flag for owner review.
- `SOURCE_RISK`: draft product or replace with a qualified alternative.

## Agent Communication Rules

### Coordinate with Kuhn

When:

- Product images are accurate but visually weak.
- Category presentation needs design support.
- Product naming needs brand-style review.
- Product-card or product-gallery presentation affects conversion.

Gauss provides:

- Product URL.
- Source URL.
- Image concerns.
- Brand-fit concern.
- Recommended design action.

### Coordinate with Tesla

When:

- Shopify API/CLI product updates fail.
- Product pages do not render correctly.
- Add-to-cart fails.
- Product media sync has errors.
- Theme templates need technical support.
- Automation scripts need debugging.

Gauss provides:

- Product handle.
- Shopify product ID if available.
- Error output.
- Reproduction steps.
- Expected behavior.

### Coordinate with Faraday

When:

- A category has search opportunity but lacks products.
- Product naming affects SEO.
- Collection architecture needs expansion or consolidation.
- Product additions require new internal links.

### Coordinate with Wegener

When:

- Product claims affect shipping, returns, care, fulfillment, warranty, customization, or customer support.
- Product sourcing changes could affect operations.

### Coordinate with Bohr

When:

- Product performance data is needed before keeping, featuring, drafting, or replacing products.
- Product/category reporting is needed.

## Current Automation

An active Codex automation named `North & Pearl Gauss Product Catalog and Market Review` runs Monday, Wednesday, and Friday at 10:00 AM.

The automation should follow this file and the global claim-safety rules in `AGENTS.md`.
