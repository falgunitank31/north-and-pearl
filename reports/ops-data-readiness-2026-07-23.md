# Operations And Data Readiness - 2026-07-23

Owners: Lovelace + Rawls  
Scope: operational QA, product activation governance, Merchant Center readiness, GA4/Search Console verification, and daily monitoring rhythm.  
Constraint: no Shopify mutation and no tracking/script implementation were performed for this report.

## Executive Status

North & Pearl is closer to order readiness, but launch scaling should remain gated by two controls:

- Operational promises must match verified fulfillment, shipping, returns, and support capacity.
- Performance claims must wait until GA4, Shopify Analytics, Search Console, and Merchant Center data sources are verified.

Current readiness judgment:

- Product/catalog activation: conditionally ready only for products that pass source, image, claim, variant, page-rendering, and add-to-cart checks.
- Merchant Center: shipping blocker was resolved in Merchant Center on 2026-07-22, but Google may need 24-72 hours to reprocess affected products.
- Analytics: not ready for performance reporting until GA4 and Search Console are confirmed.
- Customer trust: core policy pages have improved language, but owner decisions are still needed for support email, response window, return window, final shipping promise, and fulfillment workflow.

## Product Activation SOP

Purpose: prevent products from going live before they are operationally supportable, visually trustworthy, and measurable.

### Activation Gate

A product may be active only when all of the following are true:

- Source URL exists and the product/source listing is classified as `VERIFIED_ACTIVE` or acceptable `SUPPLIER_CLAIM`.
- Product type, category, price, variant availability, and collection assignments are clear.
- Title and description are claim-safe and do not invent material, stone, allergy, waterproof, tarnish, warranty, shipping, certification, or review claims.
- First image clearly shows the exact product being sold.
- Gallery has at least three usable product images unless the owner explicitly approves a narrower product-media exception.
- No supplier logo, marketplace badge, watermark, unrelated brand card, unsupported claim overlay, or foreign-language spec card appears as the primary selling image.
- Storefront product page renders cleanly on desktop and mobile.
- Add-to-cart works for at least one available variant.
- Product does not conflict with published policy pages, support macros, or Merchant Center feed expectations.

### Hold As Draft

Keep the product in draft if any of these are true:

- Source status is `UNKNOWN` or `SOURCE_RISK`.
- Primary media shows another brand, supplier packaging, claim overlays, watermarks, or misleading accessories.
- Product has fewer than three acceptable images and no owner-approved exception.
- Materials, personalization capability, size, finish, stone, or included items are unclear.
- Product is out of stock or has no available variant.
- Shipping/return/support implications are unclear for that product type.

### Activation Workflow

1. Gauss verifies source evidence, variants, category fit, price, and product facts.
2. Kuhn approves visual presentation of the first image and gallery quality.
3. Tesla verifies storefront rendering, product schema stability, search/discovery behavior, and add-to-cart.
4. Lovelace checks operational implications: shipping language, return eligibility, personalization support, and customer-service macro coverage.
5. Rawls confirms measurement visibility: product views, add-to-cart, checkout starts, and purchases are reportable through approved analytics sources.
6. Owner approves any exception involving thin media, unusual fulfillment needs, unclear return treatment, or higher customer-support risk.

## Merchant Center Shipping And Policy Checklist

### Current Known State

- Merchant Center shipping policy was marked complete on 2026-07-22.
- Previous blocker: `Missing shipping information`, affecting 42 products.
- Conservative U.S. shipping policy in use:
  - Destination: United States.
  - Products: all products.
  - Shipping cost: free / $0.00.
  - Handling time: 3-7 business days.
  - Transit time: 5-10 business days.
  - Displayed delivery estimate: 8-17 business days.
  - Cutoff timezone: Eastern Standard Time, New York.
- Product audit showed 92 active products ready with an identifier caveat.
- Known feed issue type: `identifier-gap` for barcode/GTIN and SKU. Do not invent GTINs or manufacturer identifiers.

### Daily Verification

- Recheck Merchant Center `Products > Needs attention` after the 24-72 hour reprocessing window.
- Confirm the missing-shipping issue count decreases or clears.
- Confirm `northandpearl.com` remains claimed and verified.
- Confirm return settings are configured in Merchant Center using owner-approved business rules.
- Confirm tax/business identity settings are complete and consistent with Shopify.
- Confirm Google & YouTube Shopify sales channel is connected or intentionally deferred.
- Confirm product feed does not include unsupported GTINs, MPNs, material claims, certification claims, or shipping claims.
- Confirm active product landing pages are available and match feed titles, prices, availability, and imagery.

### Escalation Rules

- If shipping errors remain after 72 hours, inspect account shipping service, affected product destinations, and product-level shipping attributes.
- If identifier warnings become disapprovals, choose a truthful identifier strategy: use real supplier/manufacturer identifiers where available or configure private-label items without invented identifiers.
- If Google flags policy, returns, or misrepresentation issues, pause promotion until Lovelace and the owner reconcile Merchant Center settings, Shopify policy pages, and product copy.

## GA4 And Search Console Verification Checklist

No traffic, ranking, conversion, or order-lift claims should be reported until this checklist is complete.

### GA4 / Shopify Analytics

- Confirm a GA4 property exists for North & Pearl.
- Confirm GA4 is connected to Shopify through an approved integration path.
- Confirm Shopify Customer Privacy settings match the tracking and consent plan.
- Confirm Shopify Analytics access can report sessions, product views, add-to-cart, checkout starts, purchases, revenue, and email signups.
- Confirm GA4 receives ecommerce events from live storefront traffic.
- Confirm reporting views separate organic, direct, referral, paid, social, and email traffic where available.
- Confirm no Microsoft Clarity or custom tracking is installed unless privacy review and owner approval are complete.

### Search Console

- Confirm the active property is either `northandpearl.com` domain property or `https://northandpearl.com/` URL-prefix property.
- Confirm owner access under the appropriate Google account.
- Submit or verify `https://northandpearl.com/sitemap.xml`.
- Inspect priority URLs:
  - `https://northandpearl.com/`
  - `https://northandpearl.com/collections/gifts`
  - `https://northandpearl.com/collections/name-necklaces`
  - `https://northandpearl.com/collections/initial-necklaces`
  - `https://northandpearl.com/collections/birthstone-jewelry`
  - `https://northandpearl.com/collections/mothers-collection`
  - `https://northandpearl.com/collections/wedding-bridesmaids`
  - `https://northandpearl.com/blogs/gift-guide/best-personalized-jewelry-gifts-for-her`
  - `https://northandpearl.com/blogs/gift-guide/how-to-choose-a-name-necklace`
  - `https://northandpearl.com/blogs/gift-guide/jewelry-gifts-for-mom`
  - `https://northandpearl.com/pages/ai-brand-information`
- Request indexing only for ready priority pages that Search Console reports as not indexed.
- Record first baseline: impressions, clicks, CTR, average position, top queries, top pages, indexed page count, discovered-not-indexed pages, crawl errors, and mobile usability issues.

### Event Taxonomy Readiness

Draft events already identified:

- `view_homepage`
- `view_collection`
- `view_product`
- `select_personalization_option`
- `add_to_cart`
- `view_cart`
- `begin_checkout`
- `email_signup`
- `search`
- `filter_collection`

Status: taxonomy remains draft. Do not implement custom events until owner approval, privacy review, and technical owner review are complete.

## Daily Monitoring Rhythm

### Morning QA

- Check Merchant Center `Needs attention`, account warnings, shipping status, returns settings, and product feed health.
- Check Shopify Analytics and GA4 connection status, but do not report performance lift until baselines are verified.
- Check Search Console coverage for priority pages and sitemap status.
- Review new or recently activated products for source, image, claim, variant, and add-to-cart readiness.

### Midday Customer Trust Review

- Scan support inbox once official support email is confirmed.
- Tag questions by type: shipping, order status, personalization, returns, material/allergy, damaged/incorrect item, and product detail.
- Update owner action log for any repeated confusion or policy gap.
- Keep responses aligned with approved support macros and avoid delivery/material promises not backed by verified data.

### Afternoon Commerce QA

- Spot-check product pages with recent catalog changes.
- Confirm active collection pages still show relevant, purchasable products.
- Confirm cart, checkout handoff, policy links, FAQ, shipping, returns, contact, and track-order pages remain reachable.
- Reconcile any Merchant Center product issues with active Shopify product status.

### End-Of-Day Readiness Note

- Record changes in active product count, Merchant Center issue count, Search Console status, analytics connection status, and customer trust blockers.
- List owner decisions needed before broader marketing distribution.
- Send handoffs:
  - Lovelace: shipping, returns, support, fulfillment, policy alignment.
  - Rawls: data source verification and baseline reporting.
  - Gauss: source/media/product activation issues.
  - Kuhn: product-card and gallery presentation issues.
  - Tesla: storefront, schema, cart, and tracking implementation issues.
  - Faraday: organic promotion timing once Merchant Center and measurement gates clear.

## Customer Trust Blockers

High-priority blockers before confident scaling:

- Official support email is not confirmed in the operating docs.
- Target customer-service response window is not confirmed.
- Final standard-item return window is not confirmed.
- Personalized/custom return treatment needs owner/legal confirmation before being treated as final policy.
- Fulfillment source, production windows, carrier handoff, QC process, and exception handling remain draft.
- Free U.S. shipping appears aligned with current messaging and Merchant Center setup, but owner should confirm it applies to all orders without minimum.
- Packaging and gift-presentation promises are not confirmed and should not be used in marketing copy.
- Product media QA recently found supplier-branded and claim-risk images; activation must remain strict.
- Analytics and Search Console data access are not yet verified, so marketing performance should not be narrated as proven.

## Owner Action Items

1. Confirm the official North & Pearl support email.
2. Approve the target support response time for customer-facing pages and macros.
3. Confirm whether free U.S. shipping applies to all orders with no minimum.
4. Approve the conservative launch shipping promise or provide verified fulfillment data for another promise.
5. Confirm production and handling windows by product type, especially personalized items.
6. Confirm standard-item return window and final personalized/custom-item return rules.
7. Approve final shipping, returns, FAQ, contact, and track-order policy language for launch.
8. Confirm Merchant Center return settings, tax/business identity settings, and Google & YouTube sales channel ownership.
9. Decide product identifier strategy for private-label jewelry: real identifiers where available; no invented GTINs.
10. Confirm GA4 property, Shopify Analytics access, and Search Console access.
11. Approve or reject Microsoft Clarity after privacy/consent review.
12. Approve the event taxonomy before any custom analytics implementation.
13. Approve whether products with fewer than three clean images may ever be active, and under what exception rule.
14. Assign one daily owner or operator to record the end-of-day readiness note until launch stabilization.

## Rawls Reporting Rule

Until data sources are verified, the only acceptable analytics language is operational status:

- Say: "GA4/Search Console verification is pending."
- Say: "Merchant Center reprocessing is pending."
- Say: "No performance lift can be claimed yet."
- Do not say: traffic improved, ranking improved, conversion improved, products are gaining search visibility, or orders improved unless the verified source and date range are attached.

## Lovelace Operating Rule

Until owner/legal/fulfillment decisions are final, customer-facing promises must remain conservative:

- Do not promise exact delivery dates.
- Do not promise universal returns on personalized items.
- Do not promise waterproof, tarnish-free, hypoallergenic, nickel-free, sterling silver, gold plated, or similar claims unless product-specific documentation supports them.
- Do not promise gift packaging or premium packaging until packaging rules are confirmed.
- Do not activate products whose images or copy create expectations support cannot honor.

## Next 24 Hours

- Recheck Merchant Center for shipping issue reprocessing after the 2026-07-22 fix.
- Verify GA4 connection and Search Console property/sitemap status.
- Pull the first baseline only after GA4, Shopify Analytics, and Search Console are confirmed.
- Have the owner resolve the trust blockers above before Faraday expands promotion.
- Keep all new products in draft unless they pass the product activation SOP.
