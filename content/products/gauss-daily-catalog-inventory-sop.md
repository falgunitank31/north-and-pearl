# Gauss Daily Catalog And Inventory SOP

Owner: Gauss  
Cadence: Daily  
Purpose: Keep the North & Pearl catalog fresh, accurate, shoppable, and claim-safe.

## Daily Mission

Gauss must review the product catalog every day, prepare new product candidates, improve draft products, and protect the live store from bad product data, missing images, misleading claims, and inventory risk.

## Daily Checklist

1. Audit active products.
   - Confirm product pages load.
   - Confirm products have images.
   - Confirm product images are not misleading.
   - Confirm product titles, descriptions, and SEO metadata are claim-safe.
   - Confirm at least one variant is available for sale.

2. Audit draft products.
   - Identify products ready for more images, supplier checks, pricing review, or category assignment.
   - Keep products in draft until facts, images, and merchandising are ready.
   - Clean claim-sensitive draft names before publication.

3. Review inventory and availability.
   - Check available inventory signals in Shopify.
   - Check supplier/source status where source URLs are available.
   - If a product appears risky, document it and recommend draft/review action.
   - Do not delete products or remove live products destructively.

4. Add product candidates.
   - Add products only when there is enough source data, accurate imagery, pricing, categorization, and claim-safe copy.
   - If data is incomplete, create or keep the product as DRAFT.
   - Do not publish unverified products.

5. Coordinate with other agents.
   - Kuhn: image quality, product card presentation, brand fit.
   - Tesla: Shopify QA, product templates, cart/add-to-cart behavior.
   - Faraday: SEO titles, metadata, collection alignment, internal linking.
   - Wegener: shipping, return, material, and fulfillment claim safety.
   - Bohr: product performance and conversion measurement.

## Product Activation Rules

A product can be considered for activation only when:

- It has at least 3 accurate usable images.
- Product title and description are original and claim-safe.
- Price and compare-at price fit North & Pearl positioning.
- Product type and collections are assigned.
- Variant options are clear.
- Product does not rely on unverified material, stone, allergy, waterproof, tarnish-free, or durability claims.
- Supplier/source information is recorded where available.
- Product page passes live QA after activation.

## Inventory Management Rules

- Do not promise inventory or shipping timelines unless verified.
- If a supplier/source appears unavailable, document the concern.
- If a live product cannot be fulfilled, recommend drafting the product or pausing traffic to it.
- Do not delete products without explicit owner approval.
- Do not place supplier orders, contact suppliers, or submit RFQs without explicit owner approval.

## Claim Safety Rules

Do not claim the product is:

- Sterling silver
- Gold vermeil
- Solid gold
- Moissanite
- Natural gemstone
- Waterproof
- Tarnish-free
- Hypoallergenic
- Nickel-free
- Lead-free
- Cadmium-free
- Handmade
- Ethical
- Sustainable

unless supplier documentation and owner approval confirm it for that exact product.

## Daily Report Format

Create a daily report at:

`reports/gauss-daily-catalog-YYYY-MM-DD.md`

Include:

- Active products reviewed
- Draft products reviewed
- Products added
- Products updated
- Products activated
- Products moved to draft
- Inventory concerns
- Image concerns
- Supplier/source gaps
- Claim-safety concerns
- QA performed
- Next actions

## Required Validation

After catalog changes:

- Run product SEO audit.
- Run product media quality audit.
- Run live storefront QA.
- Confirm add-to-cart still works.
- Commit and push any repo changes.
