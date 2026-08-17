# Maxwell Three-Blog Publication Monitor - 2026-08-17

## Publication Status

Published through Shopify Admin API into the `Gift Guide` blog.

| Article | URL | Shopify Article ID | Primary Keyword | Day-0 Live Status | Day-0 GSC Status |
|---|---|---|---|---|---|
| Engraved-Look Necklace Gift Guide: How to Choose a Meaningful Piece | https://northandpearl.com/blogs/gift-guide/engraved-necklace-gift-guide | `gid://shopify/Article/646935740600` | engraved necklace | Admin updated; public cache/translation layer still showing older title/body at time of QA | URL is unknown to Google |
| Initial Bracelet Gift Guide: How to Choose a Ready-to-Order Letter Bracelet | https://northandpearl.com/blogs/gift-guide/initial-bracelet-gift-guide | `gid://shopify/Article/646935773368` | initial bracelet | Admin updated; public cache/translation layer still showing older title/body at time of QA | URL is unknown to Google |
| Birth Flower Necklace Guide: Meaning, Months, and Gift Ideas | https://northandpearl.com/blogs/gift-guide/birth-flower-necklace-guide | `gid://shopify/Article/646935806136` | birth flower necklace | 200, canonical self-referencing, indexable HTML | URL is unknown to Google |

## Live QA

- Verified all three URLs return HTTP 200.
- Verified canonical links point to the live article URLs.
- Verified no `noindex` directive detected in rendered HTML.
- Verified article sections render with `Shop the Story`, related guides, and FAQ sections.
- Upgraded all three articles after publication to include a featured hero image, image-led editorial opener, live product-card module, product pricing, and article-specific shopping CTA.
- Verified rendered HTML now includes `np-editorial-visual` and `np-shop-story--products` on all three article URLs.
- Verified the upgraded article pages render product images and multiple live `/products/` links.
- Corrected source-authored birth flower bracelet links to the canonical `/products/north-pearl-birth-flower-accent-bracelet` path. The older `/products/north-pearl-personalized-name-birth-flower-bracelet` path still returns 200 through Shopify redirect behavior when emitted by existing collection/product objects.
- Removed internal planning text before final republish.
- Verified no public `Alibaba`, `supplier`, or `draft-not-published` language in the final rendered pages.
- Pushed `assets/blog-editorial.css` to the live theme so the editorial opener and Shop the Story product cards render with the intended premium layout.
- August 17 follow-up: corrected the three guides away from personalized/custom-order positioning and into ready-to-order gift positioning, matching the current North & Pearl merchandising direction.
- August 17 follow-up: fixed the article hero presentation so product images render contained inside a refined editorial frame instead of being cropped as a wide banner. Live CSS confirms `object-fit: contain !important` for article hero images.

## Current Blocker

Shopify Admin API readback confirms the Engraved and Initial Bracelet article records were updated with ready-to-order titles and body copy. Public storefront HTML still served older title/body strings during immediate QA.

Translation-layer inspection is currently blocked because the app lacks Shopify `read_translations` access:

`Access denied for translatableResource field. Required access: read_translations access scope.`

Recommended next fix: add `read_translations,write_translations`, reauthorize the Shopify app, inspect article translatable resources, and clear/update stale article translations if present.

## AJLuxe-Style Editorial Pattern Applied

This update does not copy AJLuxe copy, images, or layout. It applies the same ecommerce-content principles the owner requested:

- Visual-first article entry instead of text-only blog presentation.
- Clear journal metadata and answer-first introduction.
- Scannable tables, takeaways, FAQs, and related guide links.
- In-article product merchandising through `Shop the Story`.
- Product cards with image, name, price, relevance note, and CTA.
- Commercial paths into related North & Pearl products and collections.

## Search Console / Ranking Baseline

Search Console URL Inspection was run on 2026-08-17 after publication.

Current result for all three URLs: `URL is unknown to Google`.

Interpretation: this is normal for newly published URLs. It is not currently evidence of a robots, noindex, canonical, or page-fetch failure because Google has not crawled the pages yet.

No Indexing API request was made. Google states the Indexing API is intended for job posting and livestream/video broadcast style content, not normal ecommerce/blog URLs.

## Monitoring Plan

Maxwell + Faraday should monitor weekly until meaningful data exists:

| Check | Source | Timing | Success Signal |
|---|---|---|---|
| Discovery/indexing | GSC URL Inspection | 3-7 days, then weekly | Unknown -> Discovered/Crawled -> Indexed |
| Query impressions | GSC Search Analytics | Weekly after indexing | Impressions for target and long-tail queries |
| CTR and average position | GSC Search Analytics | Weekly after impressions appear | CTR above weak-snippet baseline; position movement into top 40, then top 20 |
| Landing sessions | GA4 | Weekly | Organic/article sessions appear |
| Product discovery | GA4 / Shopify where available | Weekly | Collection/product clicks from articles |
| SERP competitiveness | DataForSEO | Weekly or when budget allows | SERP movement and realistic content improvement opportunities |

## Watch Items

- Public cache still showed the older Initial Bracelet `<title>` immediately after the Shopify Admin title update. Admin output confirms the title is updated to `Initial Bracelet Gift Guide: How to Choose a Letter Bracelet`; re-check public HTML after Shopify cache refresh.
- Do not rewrite these articles for lack of rankings during the first few days. First milestone is discovery and crawl.
- Next safe improvement after discovery: add stronger live product-card modules if the theme supports article merchandising without awkward formatting.
