# Organic Measurement QA - 2026-07-23

Owners: Faraday + Rawls  
Scope: verify current organic priorities and measurement readiness from available repo reports/scripts.  
Constraint: report only. No Shopify mutation. No performance, traffic, ranking, revenue, or feed-status data is fabricated.

## Executive Readiness

North & Pearl has a clear organic priority stack, but measurement is not yet ready for performance claims.

- Organic priority is commercially focused: gift-intent collections, personalized jewelry guides, clean product SEO, free-listing readiness, and internal links from guides to revenue pages.
- GA4 infrastructure is present in the theme through `assets/north-pearl-ga4.js` and `layout/theme.liquid`, using measurement ID `G-14KCZE935H`.
- GA4 reporting readiness is still unverified. The repo proves the loader exists; it does not prove ecommerce events, attribution, revenue, or consent-mode behavior are reporting correctly.
- Search Console ownership was reported as owner-ready, but direct Search Console data was not available in the current reports.
- Merchant Center product-readiness audits show active products are broadly ready with an identifier caveat, but account-side settings and product reprocessing still require verification.
- Product/catalog denominators conflict across reports: some 2026-07-23 evidence says 77 active products; other reports from the same day reference 92 active products. Rawls should reconcile active product count before creating any KPI baseline.

## Evidence Reviewed

- `reports/faraday-organic-execution-2026-07-23.md`
- `reports/ops-data-readiness-2026-07-23.md`
- `reports/gauss-catalog-quality-gate-2026-07-23.md`
- `reports/batch-2-catalog-organic-growth-2026-07-23.md`
- `reports/product-seo-catalog-audit.md`
- `reports/merchant-center-readiness-2026-07-22.md`
- `reports/search-console-readiness-2026-07-21.md`
- `reports/lovelace-merchant-center-shipping-blocker-2026-07-22.md`
- `reports/faraday-daily-marketing-2026-07-22.md`
- `analytics/measurement-plan.md`
- `analytics/event-taxonomy.md`
- `seo/organic-kpi-plan.md`
- `seo/internal-linking-plan.md`
- `content/seo/internal-linking-execution-checklist.md`
- `assets/north-pearl-ga4.js`
- `layout/theme.liquid`
- `scripts/inspect-draft-products.mjs`

## Current Organic Priorities

1. Protect and improve indexable commercial pages for gift and personalization intent.
2. Strengthen guide-to-collection and collection-to-guide links for the commercial cluster.
3. Keep product titles, handles, meta fields, descriptions, image quality, and claims clean enough for Google organic results and free listings.
4. Avoid unsupported anchors and product claims: no waterproof, tarnish-free, hypoallergenic, sterling silver, gold vermeil, real gemstone, guaranteed delivery, bestseller, certification, or shipping-speed claims unless verified.
5. Establish verified measurement before reporting results.

## Priority Revenue Pages

These pages should receive the next organic/internal-link QA because they map most directly to gift, personalization, and purchase intent:

| Priority | URL path | Revenue role | Next QA |
| ---: | --- | --- | --- |
| 1 | `/collections/gifts` | Main gift-intent hub | Confirm collection is live, populated, linked from homepage/guides, and reciprocal guide links exist. |
| 2 | `/collections/name-necklaces` | High-intent personalized jewelry | Confirm links from name-necklace guides, gifts, initial necklaces, birthstone jewelry, and couple jewelry. |
| 3 | `/collections/initial-necklaces` | Personalized entry point | Confirm links from gifts, name necklaces, mother's collection, wedding/bridesmaids, and personalized guide. |
| 4 | `/collections/birthstone-jewelry` | Gift and milestone intent | Confirm links from gifts, mothers, name necklaces, rings, care guide, and birthstone guide. |
| 5 | `/collections/mothers-collection` | Seasonal and evergreen gift intent | Confirm links from gifts, birthstone jewelry, name necklaces, initial necklaces, and care guide. |
| 6 | `/collections/wedding-bridesmaids` | Occasion and multi-item gift intent | Confirm links from gifts, initial necklaces, necklaces, bracelets, earrings, and shipping policy. |
| 7 | `/collections/couple-jewelry` | Anniversary and relationship gifting | Confirm links from gifts, name necklaces, necklaces, bracelets, and anniversary guide. |
| 8 | `/collections/best-sellers` | Trust/commercial hub | Use only with non-performance anchor language unless sales data verifies bestseller claims. |
| 9 | `/pages/personalized-jewelry-guide` | Education to conversion bridge | Link to name necklaces, initial necklaces, birthstone jewelry, and gifts. |
| 10 | `/pages/jewelry-care-guide` | Trust and post-click support | Link from product pages and collection pages where care reduces purchase risk. |

## Internal-Linking Fixes

Highest-priority fixes from the available internal-linking plans:

1. Confirm homepage links to Gifts, Best Sellers, Necklaces, Bracelets, Rings, Earrings, Mother's Collection, Wedding & Bridesmaids, Name Necklaces, Initial Necklaces, Birthstone Jewelry, Couple Jewelry, Personalized Jewelry Guide, and Jewelry Care Guide.
2. Add or verify collection-to-guide links:
   - Gifts -> Best Personalized Jewelry Gifts for Her.
   - Name Necklaces -> How to Choose a Name Necklace.
   - Birthstone Jewelry -> Birthstone Jewelry Gift Guide.
   - Mother's Collection -> Jewelry Gifts for Mom.
   - Wedding & Bridesmaids -> Bridesmaid Jewelry Gift Ideas.
   - Couple Jewelry -> Anniversary Jewelry Gift Guide.
3. Add or verify guide-to-collection links early enough in each article to be useful, especially from the 10 commercial gift guides refreshed on 2026-07-23.
4. Add product-page support links to primary collection, Gifts where relevant, Jewelry Care, FAQ, and related products.
5. Link the AI Brand Information page to About, FAQ, Care, Shipping, Returns, and core commercial collections.
6. QA every new link for destination status, mobile readability, accurate anchor text, and avoidance of unsupported claims.

## Search Console Next Checks

Status from available evidence: owner-side property access was reported, but direct Search Console performance/indexing data was not available in Codex reports.

Next checks:

1. Confirm the active property is `northandpearl.com` domain property or `https://northandpearl.com/` URL-prefix property.
2. Confirm owner access under the correct Google account.
3. Submit or verify `https://northandpearl.com/sitemap.xml`.
4. Inspect priority URLs:
   - `https://northandpearl.com/`
   - `https://northandpearl.com/collections/gifts`
   - `https://northandpearl.com/collections/name-necklaces`
   - `https://northandpearl.com/collections/initial-necklaces`
   - `https://northandpearl.com/collections/birthstone-jewelry`
   - `https://northandpearl.com/collections/mothers-collection`
   - `https://northandpearl.com/collections/wedding-bridesmaids`
   - `https://northandpearl.com/collections/couple-jewelry`
   - `https://northandpearl.com/blogs/gift-guide/best-personalized-jewelry-gifts-for-her`
   - `https://northandpearl.com/blogs/gift-guide/how-to-choose-a-name-necklace`
   - `https://northandpearl.com/blogs/gift-guide/jewelry-gifts-for-mom`
   - `https://northandpearl.com/pages/ai-brand-information`
5. Request indexing only for ready pages that Search Console reports as not indexed.
6. Pull the first baseline only after access is confirmed: indexed pages, impressions, clicks, CTR, average position, top queries, top pages, discovered-not-indexed URLs, crawl errors, and mobile usability issues.

## GA4 And Shopify Analytics Next Checks

Status from available evidence: GA4 loader exists, but end-to-end measurement remains unverified.

Verified repo-side facts:

- `assets/north-pearl-ga4.js` loads Google tag script for `G-14KCZE935H`.
- `layout/theme.liquid` includes the GA4 asset.
- `layout/theme.liquid` also dispatches Shopify Standard Events page-view instrumentation.
- `analytics/event-taxonomy.md` remains draft-only and requires owner/Data Agent approval before custom event implementation.

Next checks:

1. Confirm the GA4 property for `G-14KCZE935H` belongs to North & Pearl.
2. Confirm Shopify's customer privacy/consent settings match the tracking plan.
3. Confirm GA4 DebugView or Realtime receives page views from live storefront traffic.
4. Confirm ecommerce funnel events are received and mapped: product view, add to cart, cart view, begin checkout, purchase, revenue, and email signup where applicable.
5. Confirm Shopify Analytics can report sessions, product views, add-to-cart, checkout starts, purchases, and revenue.
6. Confirm channel grouping separates organic search, direct, referral, paid, social, and email traffic.
7. Confirm duplicate page-view risk is acceptable or resolved, given both a custom GA4 loader and Shopify/web-pixel references have been reported.
8. Do not report organic revenue, conversion rate, guide-assisted behavior, or order impact until GA4 and Shopify Analytics baselines are verified.

## Merchant Center Next Checks

Status from available evidence: local product-readiness checks are mostly clean except identifiers; account-side state still needs verification.

Known evidence:

- `reports/merchant-center-readiness-2026-07-22.md` shows 77 active products audited, 77 ready with identifier caveat, 0 needs review, and `identifier-gap: 77`.
- `reports/batch-2-catalog-organic-growth-2026-07-23.md` and `reports/gauss-catalog-quality-gate-2026-07-23.md` reference 92 active products and 92 identifier caveats.
- `reports/lovelace-merchant-center-shipping-blocker-2026-07-22.md` says the missing-shipping blocker was resolved in Merchant Center on 2026-07-22 and may need 24-72 hours for reprocessing.

Next checks:

1. Reconcile the active product denominator: 77 versus 92.
2. Re-run the Merchant Center readiness script with a date-current filename before using it as a baseline.
3. Confirm Merchant Center domain claim and verification for `northandpearl.com`.
4. Confirm `Products > Needs attention` after the 24-72 hour reprocessing window for the prior missing-shipping issue affecting 42 products.
5. Confirm shipping, returns, tax, and business identity settings directly in Merchant Center.
6. Confirm Google & YouTube Shopify sales channel ownership and feed status.
7. Decide truthful identifier strategy for private-label/resale jewelry: use real GTIN/MPN/SKU only where verified; otherwise do not invent identifiers.
8. Confirm free-listing traffic can be separated from paid traffic before Faraday reports Google organic Shopping results.

## Drafted Product Issues

The draft-inspection script targets:

- `north-pearl-flower-nail-bangle`
- `north-pearl-heart-keepsake-necklace`

Latest Faraday report states both are now `ACTIVE`, not draft, with storefront URLs, price, availability, SEO title/description, and 6 images each.

Organic QA issues:

1. Workflow language should change from "drafted products" to "draft-to-active transition" for these products so newly active items are not missed by QA.
2. Confirm collection assignment in Shopify admin before linking these products from guides, collections, homepage modules, or product recommendations.
3. Keep claims conservative until supplier documentation or samples verify materials, finish, sizing, durability, stones, allergy-related claims, packaging, and fulfillment details.
4. Recommended link fit, only after collection membership is confirmed:
   - Heart Keepsake Necklace: Gifts, Mother's Collection, Couple Jewelry, and heart-product related paths.
   - Flower Nail Bangle: Gifts, Mother's Collection, Wedding & Bridesmaids, bracelet paths, and floral-product related paths.

Products Gauss says should remain draft until exact source or 3+ exact same-product replacement images are verified:

| Product | Handle |
| --- | --- |
| North & Pearl Birth-Month Name Necklace | `north-pearl-birthstone-name-necklace` |
| North & Pearl Classic Tennis Bracelet | `north-pearl-classic-tennis-bracelet` |
| North & Pearl Green Accent Statement Ring | `north-pearl-emerald-statement-ring` |
| North & Pearl Geometric Drop Earrings | `north-pearl-geometric-drop-earrings` |
| North & Pearl Heart Bangle Bracelet | `north-pearl-heart-bangle-bracelet` |
| North & Pearl Letter Charm Bracelet | `north-pearl-letter-charm-bracelet` |
| North & Pearl Minimal Water Drop Necklace | `north-pearl-minimal-water-drop-necklace` |
| North & Pearl Brilliant Gift Ring | `north-pearl-moissanite-gift-ring` |
| North & Pearl Bead Collarbone Necklace | `north-pearl-pearl-collarbone-necklace` |
| North & Pearl Square Sparkle Jewelry Set | `north-pearl-square-zircon-jewelry-set` |
| North & Pearl Stackable Warm Bracelet | `north-pearl-stackable-gold-bracelet` |
| North & Pearl Teardrop Birthstone Necklace | `north-pearl-teardrop-birthstone-necklace` |

## Product SEO And Claim Issues

Latest product SEO audit reviewed in this QA:

- Products audited: 77.
- Issue type: `claim-review-needed`.
- Products flagged: 9.
- Lowest score: 88.

Products needing supplier-backed claim review:

- North & Pearl Chunky Bead Bracelet
- North & Pearl Color Accent Cuff
- North & Pearl Iridescent Pendant Necklace
- North & Pearl Sparkle Accent Bracelet
- North & Pearl Sparkle Halo Bracelet
- North & Pearl Sparkle Link Bracelet
- North & Pearl Sparkle Pulse Bracelet
- North & Pearl Sparkle Row Bracelet
- North & Pearl Warm Bead Stretch Bracelet

Action: keep these pages active only under conservative copy controls. Do not strengthen material, stone, finish, sizing, durability, allergy, waterproof, tarnish, ethical, sustainable, warranty, certification, or shipping claims without evidence.

## Measurement Blockers

- Search Console data is not available in the repo evidence.
- GA4 has a loader, but real event collection and revenue attribution are not verified.
- Shopify Analytics access and funnel reporting are not verified.
- Merchant Center account-side product status is not fully verified after shipping-policy reprocessing.
- Product denominator conflicts across reports: 77 versus 92 active products.
- Merchant Center readiness script still writes to `reports/merchant-center-readiness-2026-07-22.md`, which can obscure current-date evidence.
- Organic guide and collection URL status differs by request method/environment: 2026-07-22 reports showed HTTP 200 for homepage/sitemap/collections; 2026-07-23 command-level checks saw 403 for homepage/sitemap/collections but 200 for several guide URLs. Treat this as browser-style QA required, not proof of outage.

## Rawls Reporting Rule

Until the next checks are complete, acceptable language is:

- "GA4/Search Console verification is pending."
- "Merchant Center reprocessing is pending."
- "Organic performance baseline has not been established."
- "No traffic, ranking, conversion, or revenue lift can be claimed yet."

Do not report organic sessions, clicks, rankings, conversion rate, revenue, free-listing performance, guide-assisted revenue, or order impact without source, date range, and export/report evidence.

## Next 72 Hours

| Owner | Priority | Deliverable |
| --- | --- | --- |
| Rawls | Reconcile active product count across Shopify/product audits. | Single baseline denominator with source/date. |
| Rawls | Verify GA4 and Shopify Analytics ecommerce reporting. | First measurement-readiness note, not performance claims. |
| Rawls + Faraday | Verify Search Console property, sitemap, and priority URL indexing. | Indexed/pages/queries baseline when available. |
| Faraday | QA guide-to-collection and collection-to-guide links for priority revenue pages. | Internal-linking fix list with URLs and anchors. |
| Faraday + Gauss | Confirm collection assignment for Heart Keepsake Necklace and Flower Nail Bangle. | Product-to-collection mapping before links go live. |
| Lovelace + Rawls | Recheck Merchant Center account after reprocessing. | Needs-attention count and shipping/returns/tax/business identity status. |
| Tesla | Browser-style QA for homepage, sitemap, and priority collection URLs. | Method-specific status to resolve 403/200 discrepancy. |

