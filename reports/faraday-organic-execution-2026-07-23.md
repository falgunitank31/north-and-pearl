# Faraday Organic Execution - 2026-07-23

Owner: Faraday, Organic Growth Director

Scope: organic marketing work only. No paid ads, no unsupported claims, and no fabricated performance data.

## Executive Summary

- Refreshed the active product SEO audit through Shopify CLI.
- Refreshed the Merchant Center organic readiness audit through Shopify CLI.
- Verified that four priority gift-guide URLs return `200` from this environment.
- Confirmed live `HEAD` checks for the homepage, sitemap, and collection URLs return `403` from this environment, so those need browser-style QA or owner-side verification before treating them as unavailable.
- Confirmed two products previously named in the draft-inspection workflow are now active products with live storefront URLs, complete SEO fields, prices, availability, and six images each.
- Kept all recommendations claim-safe: no invented GTINs, materials, certifications, allergy claims, water/tarnish claims, shipping promises, or performance metrics.

## Today’s Google Organic Priorities

1. Protect indexable commercial paths for gift intent:
   - `/collections/gifts`
   - `/collections/name-necklaces`
   - `/collections/initial-necklaces`
   - `/collections/birthstone-jewelry`
   - `/collections/mothers-collection`
   - `/collections/wedding-bridesmaids`
   - `/collections/couple-jewelry`
2. Push guide-to-collection authority from the published gift-guide cluster into those commercial pages.
3. Keep the active product catalog clean enough for Google organic results and free product listings: clear titles, accurate descriptions, complete meta fields, available variants, usable product images, and no unsupported product claims.
4. Prioritize Search Console verification next. Current impressions, clicks, queries, indexing coverage, and page-level performance are unknown in this run.

## Content And Gift Guide Actions

Verified guide URLs:

| URL | Check | Result |
| --- | --- | --- |
| `https://northandpearl.com/blogs/gift-guide/best-personalized-jewelry-gifts-for-her` | `HEAD` | `200` |
| `https://northandpearl.com/blogs/gift-guide/anniversary-jewelry-gift-guide` | `HEAD` | `200` |
| `https://northandpearl.com/blogs/gift-guide/best-jewelry-gifts-under-100` | `HEAD` | `200` |
| `https://northandpearl.com/blogs/gift-guide/how-to-layer-necklaces` | `HEAD` | `200` |

Next content actions:

1. Build organic Pinterest draft copy for the 10 commercial guide articles refreshed on 2026-07-23.
2. Add or verify reciprocal links from priority collections back to their matching guide articles.
3. Add Article schema and FAQ schema where visible FAQ/AEO content exists, starting with the five highest-intent gift guides.
4. Keep gift-guide product mentions general unless the product page itself verifies exact material, stone, plating, sizing, or fulfillment details.

## Product SEO Fixes Needed From Drafted/Product Status Changes

The draft-inspection script checked:

- `north-pearl-heart-keepsake-necklace`
- `north-pearl-flower-nail-bangle`

Current Shopify result: both are `ACTIVE`, not draft.

Observed readiness:

| Product | Status | Price | Available | Images | SEO Fields | Organic Action |
| --- | --- | ---: | --- | ---: | --- | --- |
| North & Pearl Heart Keepsake Necklace | Active | `$64.00` | yes | 6 | title + description present | Add to Gifts, Mother's Collection, Couple Jewelry, and heart-product internal-link paths where collection membership supports it. |
| North & Pearl Flower Nail Bangle | Active | `$59.00` | yes | 6 | title + description present | Add to Gifts, Mother's Collection, Bridesmaids, and bracelet internal-link paths where collection membership supports it. |

Fixes still needed:

1. Rename the workflow/checklist language from "drafted products" to "draft-to-active transition" for these products so future QA does not miss newly active items.
2. Confirm collection assignment in Shopify admin before linking these products from guides or collections.
3. Keep the existing cautious product copy until supplier samples or documentation verify materials, finish, sizing, durability, stones, or allergy-related facts.

## Product SEO Audit

Source: `reports/product-seo-catalog-audit.md`, refreshed 2026-07-23.

- Active products audited: 77
- Detected issue type: `claim-review-needed`
- Products flagged: 9
- Lowest score among active products: 88

Products needing supplier-backed claim review before stronger copy:

- North & Pearl Chunky Bead Bracelet
- North & Pearl Color Accent Cuff
- North & Pearl Iridescent Pendant Necklace
- North & Pearl Sparkle Accent Bracelet
- North & Pearl Sparkle Halo Bracelet
- North & Pearl Sparkle Link Bracelet
- North & Pearl Sparkle Pulse Bracelet
- North & Pearl Sparkle Row Bracelet
- North & Pearl Warm Bead Stretch Bracelet

Interpretation: these are conservative flags. They should remain claim-safe until supplier documentation supports more specific claims.

## Merchant Center Organic Readiness

Source: `reports/merchant-center-readiness-2026-07-22.md`, refreshed by the existing script on 2026-07-23 even though the script still writes to the 2026-07-22 filename.

- Active products audited: 77
- Ready with identifier caveat: 77
- Needs review: 0
- Issue count: `identifier-gap: 77`

Merchant Center organic readiness actions:

1. Do not invent GTINs, MPNs, SKUs, materials, stones, or certifications.
2. Use real supplier/manufacturer identifiers where available.
3. If exact identifiers are unavailable, align the Google & YouTube sales channel/feed setup around the correct private-label/resale identifier strategy.
4. Verify domain claim, return settings, tax settings, shipping settings, and business identity directly in Merchant Center.
5. After feed processing, have Rawls measure free-listing traffic separately from paid traffic.

## Internal Linking Priorities

Use the existing checklist in `content/seo/internal-linking-execution-checklist.md`.

Top priority paths:

1. Gift guides -> Gifts, Best Sellers, Name Necklaces, Initial Necklaces, Birthstone Jewelry, Mother's Collection, Wedding & Bridesmaids, Couple Jewelry.
2. Gifts collection -> Best Sellers, Necklaces, Bracelets, Rings, Earrings, Mother's Collection, Wedding & Bridesmaids, Couple Jewelry.
3. Name Necklaces -> Gifts, Initial Necklaces, Birthstone Jewelry, Couple Jewelry, Personalized Jewelry Guide.
4. Birthstone Jewelry -> Gifts, Mother's Collection, Name Necklaces, Rings, Jewelry Care.
5. Product pages -> primary collection, Gifts where relevant, Jewelry Care, FAQ, and related products.

Avoid unsupported anchor text such as `waterproof jewelry`, `tarnish-free jewelry`, `hypoallergenic earrings`, `sterling silver jewelry`, `gold vermeil jewelry`, `real gemstone jewelry`, `guaranteed delivery gifts`, or `best-selling jewelry` unless verified.

## Live URL Check Notes

`HEAD` checks from this environment:

- Guide URLs listed above: `200`.
- Homepage, sitemap, and priority collection URLs: `403`.

Interpretation: do not treat this as proof the pages are down. Yesterday's report recorded `200` checks for the homepage, sitemap, and priority collections, while today's command-level checks may be blocked by request method, bot protection, or edge rules. Recovery action: run browser-style QA or Shopify storefront preview verification for homepage, sitemap, and priority collection pages.

## Measurable Next Steps

| Date | Owner | Step | Measurement |
| --- | --- | --- | --- |
| 2026-07-24 | Faraday | Produce Pinterest organic draft batch for 10 guide articles. | 10 pin titles, descriptions, and destination URLs documented. |
| 2026-07-24 | Faraday + Tesla | Browser-check homepage, sitemap, and seven priority collection URLs. | HTTP/render status recorded with method noted. |
| 2026-07-24 | Faraday + Gauss | Confirm collection assignments for Heart Keepsake Necklace and Flower Nail Bangle. | Product-to-collection mapping recorded before guide/product linking. |
| 2026-07-25 | Tesla | Add Article/FAQ schema where visible guide content supports it. | Schema validation passes on selected guide templates. |
| 2026-07-25 | Rawls | Verify Search Console access and baseline. | Indexed pages, impressions, clicks, queries, and top pages reported without estimates. |
| 2026-07-25 | Rawls | Verify Merchant Center organic/free listing reporting path. | Free listing traffic source is measurable separately from paid ads. |

## Blockers And Unknowns

- Search Console data was not available in this run.
- GA4 organic sessions, revenue, conversion rate, and guide-assisted behavior were not available in this run.
- Merchant Center account-side setup status remains unknown outside the Shopify product readiness audit.
- The Merchant Center script should be updated to write a date-current report filename instead of overwriting `reports/merchant-center-readiness-2026-07-22.md`.
