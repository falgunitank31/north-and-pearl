# Faraday Daily Task Board

Purpose: keep the organic marketing lane visible and execution-focused.

## Active Daily Tasks

| Priority | Status | Task | Owner | Evidence |
| --- | --- | --- | --- | --- |
| Critical | Active | Run daily live storefront and sitemap checks | Faraday | Daily report |
| Critical | Active | Maintain guide-to-collection internal links | Faraday + Tesla | Collection page checks |
| High | Active | Build Pinterest organic distribution drafts | Faraday + Kuhn | Draft pin copy |
| High | Active | Refresh one revenue page or guide each week | Faraday | SEO change log |
| High | Active | Route product/category gaps to Gauss | Faraday + Gauss | Handoff notes |
| High | Active | Route UX and visual trust issues to Kuhn | Faraday + Kuhn | CRO notes |
| Medium | Active | Coordinate KPI verification with Rawls | Faraday + Rawls | Analytics notes |
| Medium | Active | Keep Search Console action list current | Faraday + Rawls | Search Console report |

## This Week Focus

- Gifts collection.
- Name Necklaces collection.
- Initial Necklaces collection.
- Birthstone Jewelry collection.
- Mother's Collection.
- Wedding & Bridesmaids.
- Published gift-guide cluster.

## 2026-07-23 Execution Notes

- Report completed: `reports/faraday-organic-execution-2026-07-23.md`.
- Active product SEO audit refreshed: 77 active products audited; 9 conservative `claim-review-needed` flags remain.
- Merchant Center readiness refreshed through the existing script: 77 active products ready with identifier caveat; 0 need review; `identifier-gap` remains the account/feed strategy issue.
- Draft-product watch items are now active: `north-pearl-heart-keepsake-necklace` and `north-pearl-flower-nail-bangle`.
- Guide URL checks returned `200` for four gift-guide articles; homepage, sitemap, and collection `HEAD` checks returned `403` from this environment and need browser-style QA before any availability conclusion.
- Next Faraday priorities: Pinterest draft batch for 10 guide articles, collection assignment confirmation for the two newly active watch products, guide-to-collection reciprocal links, Search Console baseline, and Merchant Center free-listing measurement path.

## 2026-07-24 Execution Notes

- Report completed: `reports/faraday-daily-marketing-2026-07-24.md`.
- Direct `curl -I -L` checks returned `200` for the homepage, sitemap, Gifts, Name Necklaces, Initial Necklaces, Birthstone Jewelry, Mother's Collection, Wedding & Bridesmaids, Couple Jewelry, and the primary personalized jewelry gifts guide.
- Live homepage source includes Google site verification meta and Shopify Google pixel configuration for `G-14KCZE935H`. Analytics collection and Search Console metrics remain UNKNOWN until Rawls verifies account data.
- Created organic Pinterest draft batch: `content/seo/organic-pinterest-drafts-2026-07-24.md`.
- Next Faraday priorities: confirm remaining guide URLs, map collection-to-guide reciprocal links, verify Pinterest account readiness without publishing, and route active product collection assignments to Gauss before product-specific guide links.

## 2026-07-27 Execution Notes

- Report updated: `reports/faraday-daily-marketing-2026-07-27.md`.
- Browser-style live checks returned `200` for the homepage, sitemap, robots.txt, Gifts, Name Necklaces, Birthstone Jewelry, the published personalized jewelry gifts guide, AI Brand Information page, and `north-pearl-initial-shell-necklace`.
- Live customer-facing source checks found canonical URLs and Shopify Google pixel configuration on checked homepage, collection, guide, page, and product URLs.
- Created organic Pinterest draft batch: `content/seo/organic-pinterest-drafts-2026-07-27.md`.
- Tightened shared collection-guide product-detail language to avoid leaning on unverified production/shipping timing.
- Updated and verified the ten-article Shopify Gift Guide cluster:
  - Best Personalized Jewelry Gifts for Her
  - How to Choose a Name Necklace
  - Birthstone Jewelry Gift Guide
  - Jewelry Gifts for Mom
  - Bridesmaid Jewelry Gift Ideas
  - Anniversary Jewelry Gift Guide
  - Best Jewelry Gifts Under $100
  - Personalized Jewelry for Couples
  - Birthday Jewelry Gift Ideas
  - How to Layer Necklaces
- Rawls verified GA4 access, GA4/Search Console linking, GA4 Realtime receipt, and product `view_item` tracking. `add_to_cart` event receipt needs a delayed recheck.
- Marketing launch execution report created: `reports/faraday-marketing-launch-execution-2026-07-27.md`.
- Added reciprocal guide links to 12 live collections and verified tested collection pages remain product-first.
- Search Console indexing queue prepared: `reports/search-console-indexing-push-2026-07-27.md`.
- Verified 15 priority URLs are live, canonical, and indexable by default before Search Console URL Inspection.
- Next Faraday priorities: add live guide URLs to the Search Console inspection queue, re-check GA4 `add_to_cart`, polish top active product images, and use GA4/Search Console data only after verified data exists.

## Daily Completion Rule

Faraday must leave a dated report in `reports/`. If a live check or API call is blocked, the report must still state what was attempted, what failed, and the next recovery action.
