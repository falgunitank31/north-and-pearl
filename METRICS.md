# North & Pearl Metrics

## Weekly KPI Review

- Sessions
- Organic sessions
- Search Console impressions
- Search Console clicks
- CTR
- Indexed pages
- Product views
- Collection views
- Add to carts
- Checkout starts
- Purchases
- Conversion rate
- Revenue
- Average order value
- Top landing pages
- Top products
- Weak products
- Mobile vs desktop performance

## Current Baseline Status

- August 5 sales/reviews guardrail pass: no bundle, discount, threshold, or gift-with-purchase offer is live or authorized without verified product-level economics. PDP review sections are live, but review/rating count remains 0/unknown until real customer feedback is collected through Shopify metafields or an approved review app. No fake `aggregateRating` schema was added.
- August 4 first-order activation pass: fresh Search Console snapshot remains 6 impressions and 0 clicks; GA4 organic remains 0 sessions. Active campaign switched to `order_growth_august_2026`; the 72-hour activation kit was created for qualified visitor distribution.
- August 4 daily monitor: Search Console shows 6 impressions, 0 clicks, and 0% CTR for 2026-07-07 to 2026-08-01. GA4 organic remains 0 sessions and 0 organic top pages for 2026-07-07 to 2026-08-03. Safe Shopify order monitor returned 0 visible orders.
- August 4 URL Inspection: 9 of 11 monitored URLs are submitted and indexed. The two August 3 buyer-intent posts `Birthstone-Inspired Jewelry Gifts for Mom` and `Jewelry Gifts Under $100` are discovered/currently not indexed; no URL is unknown to Google after the retry. Faraday added cross-links among the three buyer-intent posts and the weekly gift guide, then resubmitted root/blog sitemaps.
- August 4 storefront/catalog monitor: Merchant readiness remains 208/208 active products ready with identifier caveat and 0 needing review. Theme Check passed with 272 files inspected and 0 offenses. Live storefront QA passed 208/208 product pages and cart add passed.
- August 4 no-orders response: visible orders remain 0, so Pareto/Kuhn/Tesla shifted the live homepage toward commercial gift paths (`Gifts Under $100`, `Jewelry Gifts for Her`, `Anniversary Gifts`, and the weekly gift guide). This improves first-order routing but does not create traffic by itself.
- August 3 daily monitor: Search Console shows 5 impressions, 0 clicks, and 0% CTR for 2026-07-06 to 2026-07-31. GA4 organic remains 0 sessions and 0 organic top pages for 2026-07-06 to 2026-08-02.
- August 3 URL Inspection: all eight monitored URLs are now Submitted and indexed: Personalized Jewelry, Jewelry Gifts for Her, Gifts Under $50, Gifts Under $100, Birthday Jewelry Gifts, Anniversary Gifts, weekly gift guide, and Initial Shell Necklace.
- August 3 sitemap fix: removed the incorrect non-parameterized collection sitemap submission that returned 400, then submitted the correct Shopify collection sitemap URL with 24 web URLs and 19 image URLs. The correct collection sitemap now shows 0 errors and 0 warnings.
- August 4 indexing response: Search Console API inspection shows 9 of 11 monitored priority URLs submitted/indexed and 2 newer guide URLs discovered/currently not indexed (`Birthstone-Inspired Jewelry Gifts for Mom`, `Jewelry Gifts Under $100`). Root, blog, product, and collection sitemaps were resubmitted successfully at 2026-08-04T20:47Z and show 0 errors/0 warnings. The pending state is Google selection/processing, not a verified robots/noindex/canonical blocker.
- August 3 order-source monitor: safe Shopify order query succeeded and returned 0 visible orders.
- August 3 storefront/catalog monitor: product SEO remains clean, Merchant readiness remains 208/208 active products ready with identifier caveat and 0 needing review, Theme Check passed with 260 files inspected and 0 offenses, live storefront QA passed 208/208 product pages, and cart add passed.
- August 3 Faraday execution: strengthened Name Necklaces and Birthstone Jewelry collection SEO/content from verified Search Console signals. Live QA confirmed both pages return 200, products remain before guide copy, internal guide/collection links are present, and no unsupported product/material claims were detected.
- August 3 Faraday marketing push: published three live buyer-intent Gift Guide posts (`Best Name Necklace Gifts for Her`, `Birthstone-Inspired Jewelry Gifts for Mom`, and `Jewelry Gifts Under $100`), created UTM campaign `indexed_page_push_august_2026`, resubmitted root/blog sitemaps, and validated all three post URLs return 200. Fresh Google snapshot remains 5 Search Console impressions, 0 clicks, and 0 GA4 organic sessions for the current reporting windows; the three new posts are currently `URL is unknown to Google` because they were just published.
- August 2 daily monitor: Search Console shows 5 impressions, 0 clicks, and 0% CTR for 2026-07-05 to 2026-07-30. This is an increase from the prior 1-impression baseline, but there is still no verified organic traffic or order lift.
- August 2 GA4 organic monitor: 0 organic sessions and 0 organic top pages for 2026-07-05 to 2026-08-01.
- August 2 URL Inspection: Initial Shell Necklace is indexed; the weekly gift guide is discovered/currently not indexed; Personalized Jewelry, Jewelry Gifts for Her, Gifts Under $50, Gifts Under $100, Birthday Jewelry Gifts, and Anniversary Gifts are still unknown to Google. No URL Inspection blocked/error status was detected.
- August 2 sitemap action: root, collection, blog, and product sitemaps were resubmitted through Search Console API; all submissions succeeded.
- August 2 indexing-support action: added a live footer discovery rail linking to six buyer-intent collections and the weekly gift guide; live homepage HTML confirms all seven links are present.
- August 2 follow-up indexing-support action: expanded the homepage starter rail with Gifts Under $100, Birthday Jewelry Gifts, and Anniversary Gifts; live homepage HTML confirms the links are present.
- August 2 source-traceability update: Initial Shell Necklace received internal source tags from the owner-supplied Alibaba source ID `1600468137956`. Source-reference recovery improved to 8 below-preferred products missing source tags, 3 exact-source URLs required, and 16 active products missing any source tag. No customer-facing supplier language was added.
- August 2 source-traceability blocker: five recoverable Alibaba candidate IDs could not be verified because Alibaba returned protected/empty product metadata responses. No source tags were added for those products until exact listings are confirmed.
- August 2 collection discovery action: collection hero fast-shopping cards now include Featured Jewelry, Gifts for Her, Under $100, Birthday Gifts, and Anniversary Gifts, supporting shoppers and crawler discovery without moving long SEO copy above products.
- August 2 order-source monitor: safe Shopify order query succeeded and returned 0 visible orders.
- August 2 storefront/catalog monitor: product SEO audit remains clean, Merchant readiness remains 208/208 active products ready with identifier caveat and 0 needing review, Theme Check passed with 260 files inspected and 0 offenses, and targeted live URL checks returned 200.
- July 31 purchasability check: Shopify Admin API audited 208 active products and confirmed 208/208 have at least one `availableForSale` variant. Quantity is not visible because inventory tracking is disabled on active variants; positive tracked inventory is 0, but purchase availability is not blocked.
- July 31 Pareto baseline: active products remain sellable, Shopify sampled unit costs are missing, discount API access is blocked by missing `read_discounts`, and safe sales work is limited to non-discount merchandising, routing, cart recovery, and offer planning until margin guardrails exist.
- Search Console sitemap: submitted and successful as of July 27, 2026.
- Sitemap discovered pages: 149.
- GA4 tag: `G-14KCZE935H`.
- GA4 live-source validation: detected in Shopify web pixel configuration on `https://northandpearl.com` on July 28, 2026.
- GA4 visible traffic baseline checked July 28, 2026: 9 active users, 9 new users, 23 sessions, 394 events, 0 key events, and 0 active users in the last 30 minutes for the visible last-7-days GA4 Home overview.
- GA4 visible acquisition baseline checked July 28, 2026: traffic shown as Direct only, with `(direct) / (none)` as first user and session source/medium. Organic traffic is not visible yet in the GA4 Home overview.
- Merchant/product readiness: 208 active products ready with identifier caveat and 0 products needing review in the latest repository audit.
- Live storefront QA: 208/208 active product pages passed and cart add passed in the latest QA run.
- Commercial organic landing-page baseline: six new buyer-intent collections were created on July 28, 2026. Treat first meaningful evaluation window as 7-14 days after Search Console indexing and GA4 traffic are visible for those URLs.
- Buyer-intent collection URLs to monitor: `/collections/personalized-jewelry`, `/collections/jewelry-gifts-for-her`, `/collections/gifts-under-50`, `/collections/gifts-under-100`, `/collections/birthday-jewelry-gifts`, `/collections/anniversary-gifts`.
- Revenue/order baseline: not recorded in this repository yet.
- Lead order-readiness score: 82/100 as of July 28, 2026. Storefront/catalog/conversion paths are guarded-green; traffic, Merchant Center/account setup, purchase-event verification, and final operations decisions remain gating items.
- Source-image polish baseline: 115 of 208 active products are below the preferred media standard; 106 have source-reference tags and 9 are missing usable source-reference tags in the latest source-image audit.
- Google API baseline: Codex SEO Tier 0 is configured locally as of July 29, 2026. PageSpeed Insights works. CrUX origin queries for `https://northandpearl.com` returned no public phone or desktop field data, indicating insufficient real Chrome-user traffic for CrUX reporting.
- Google API access update: GA4 Data API works for property `properties/546565745` as of July 29, 2026, but organic reports currently return zero rows. Search Console API authenticates, but the service account sees zero Search Console properties until it is added inside Search Console Users and permissions.
- Search Console API baseline after access: property `sc-domain:northandpearl.com` is visible with `siteFullUser` permission. Last 28-day API report shows 1 impression, 0 clicks, 0% CTR, and no quick wins yet. Priority URL inspection shows homepage, Name Necklaces, and Best Sellers indexed; Jewelry Gifts for Her, Gifts Under $50, the new gift guide, and Initial Shell Necklace are not fully indexed yet.
- July 30 API monitor: Codex SEO Tier 2 remains ready. Search Console still shows 1 impression, 0 clicks, 0% CTR for the `north pearl` query and homepage row. GA4 organic report returns 0 rows. Priority buyer-intent URLs inspected on July 30 remain neutral/not fully indexed, so the current growth bottleneck is Google discovery and traffic maturity rather than measurement access.
- July 30 sitemap monitor: root, collection, and blog sitemaps all show 0 errors and 0 warnings in Search Console API.
- July 30 order-source monitor: Shopify safe order query returned `ORDER_ACCESS_OK` with 0 visible orders and no customer PII requested.
- July 30 storefront/catalog monitor: product SEO audit remains 208/208 clean, Merchant readiness remains 208 active products ready with identifier caveat and 0 needing review, Theme Check passed with 228 files inspected and 0 offenses. Live HTTP QA was temporarily rate-limited by Shopify after a full-catalog crawl attempt.
- July 30 Commercial Gift Traffic Sprint: UTM campaign `order_growth_july_2026` created for warm-audience and organic social pushes. Rawls should monitor GA4 campaign traffic, guide landing-page engagement, collection views, product views, add-to-cart, checkout starts, and orders.
- July 30 Faraday traffic-change check after the commercial sprint: verified increase is 0 so far. Search Console remains 1 impression and 0 clicks; GA4 organic and organic top-page reports return 0 rows. Traffic probability improved through better commercial links and UTM-ready distribution assets, but measurable traffic still depends on Google indexing or external sharing. Report: `reports/faraday-traffic-chance-before-after-2026-07-30.md`.
- July 30 order-growth activation kit: `content/seo/order-growth-7-day-activation-kit-2026-07-30.md` provides the immediate 7-day tracked campaign links, daily post copy, short-video scripts, and warm-audience outreach message for qualified visitor generation.
- July 30 operating pass update: Google API Tier 2 remains ready; Search Console remains 1 impression and 0 clicks; GA4 organic remains 0 sessions; sitemaps have 0 errors and 0 warnings but remain pending; seven priority buyer-intent URLs are unknown to Google and Initial Shell Necklace is discovered/currently not indexed; Shopify safe orders remain 0 visible orders; Theme Check found 0 offenses across 234 files; targeted live QA returned 200 for homepage, key collections, PDP, guide, cart, and search.
- July 30 product sitemap submission: Faraday submitted the Shopify product sitemap and root sitemap through Search Console API. Product sitemap contains 209 URLs, is pending, and shows 0 errors / 0 warnings after submission. Report: `reports/faraday-product-sitemap-submission-2026-07-30.md`.
- July 31 daily monitor: Google access is Tier 2; Search Console shows 1 impression, 0 clicks, and 0% CTR for 2026-07-03 to 2026-07-28; GA4 organic shows 0 sessions and 0 organic top pages for 2026-07-03 to 2026-07-30; safe Shopify order query shows 0 visible orders.
- July 31 URL Inspection: Initial Shell Necklace is indexed; weekly gift guide is discovered/currently not indexed; Personalized Jewelry, Jewelry Gifts for Her, Gifts Under $50, Gifts Under $100, Birthday Jewelry Gifts, and Anniversary Gifts are unknown to Google. No robots/canonical/mobile error was detected in the retrieved URL Inspection data.
- July 31 sitemap action: root, collection, and blog sitemaps were submitted through Search Console API; current sitemap status shows 0 errors and 0 warnings, with root/product/collection sitemaps pending.
- July 31 indexing-support action: buyer-intent internal links were strengthened from PDP support, guide-link, and collection-guide surfaces. This is a crawl/discovery support action, not evidence that rankings, traffic, or indexing improved yet.
- July 30 guide-link validation: Shopify Admin API confirms the weekly gift guide and three high-intent commercial guides each contain 3 direct product links after the traffic-sprint publish fix. Public HTTP storefront validation is temporarily limited by Shopify 429 throttling, so Admin API content validation is the current source of truth for this check.

## Rawls Daily Watch - July 29, 2026

- Data confidence: LOW DATA CONFIDENCE for performance outcomes. The latest visible GA4 baseline is small, and Shopify order/revenue data is not accessible in this repository.
- Traffic/order goal status: UNKNOWN. There is not enough verified traffic, purchase, revenue, or AOV data to judge next-month order momentum.
- Latest verified GA4 traffic baseline remains the July 28, 2026 visible Home overview: 9 active users, 9 new users, 23 sessions, 394 events, and 0 key events over the visible last-7-days view.
- Latest verified acquisition baseline remains Direct only: `(direct) / (none)` for first user and session source/medium. Organic traffic is not visible yet in the GA4 Home overview.
- Latest verified page/event signals remain low sample size: homepage 72 views, Name Necklaces collection 23 views, Initial Shell Necklace PDP 19 views, Gifts collection 18 views, Checkout 5 views, and 20 visible `view_item` events.
- Shopify Analytics sessions, product views, collection views, add-to-cart, checkout starts, purchases, revenue, conversion rate, and AOV are UNKNOWN until a verified Shopify Analytics export or UI review is available.
- Buyer-intent collection impressions/clicks/CTR are UNKNOWN. The six buyer-intent collections were created on July 28, 2026 and need Search Console/GA4 data after indexing and traffic accumulation.
- Storefront/catalog readiness remains verified from repository audits: 208/208 active product pages passed live QA on July 28, 2026; cart add passed on July 28, 2026; the July 29, 2026 Merchant Center readiness report shows 208 active products ready with identifier caveat and 0 products needing review.
- Today's report: `reports/rawls-daily-analytics-watch-2026-07-29.md`.
- Owner-facing traffic/orders summary: `reports/lead-traffic-orders-summary-2026-07-29.md`.

## August 4 Full Indexation Sprint

- Built full Shopify sitemap inventory: 261 URLs total.
  - 209 product sitemap URLs.
  - 24 collection URLs.
  - 17 blog URLs.
  - 10 page URLs.
  - 1 agentic discovery URL.
- Ran priority URL Inspection for 59 commercial/support URLs.
  - Submitted and indexed: 36.
  - Discovered - currently not indexed: 8.
  - URL is unknown to Google: 15.
  - Verified crawl/index blockers: 0 in inspected priority set.
- Resubmitted root, blog, product, and collection sitemaps through Search Console API.
- Added live footer discovery links to strengthen crawl paths for pending pages, support pages, and guide URLs.
- Live homepage validation confirms the new links render.

Indexing caveat: Google does not provide an API to force ordinary Shopify ecommerce pages into the index. The safe path is sitemap submission, internal-link strengthening, stronger unique content, external discovery, and repeated URL Inspection monitoring.

## August 5 Indexing-Phase Dashboard

- Google API access remains Tier 2: Search Console, URL Inspection, sitemaps, and GA4 organic reporting are available.
- GSC sitemap status: root sitemap successfully processed with 251 submitted web URLs and 227 submitted image URLs; current sitemap counters still show 0 indexed, 0 errors, and 0 warnings.
- Priority URL Inspection batch: 50 commercial URLs inspected.
  - Submitted and indexed: 27.
  - Discovered - currently not indexed: 2.
  - Crawled - currently not indexed: 1.
  - URL is unknown to Google: 20.
- Key interpretation: primary commercial collections are mostly indexed; product-level discovery is the current weakness, especially product URLs with 0 referring URLs reported by URL Inspection.
- Product readiness: 208 active products passed the product SEO/image audit; Merchant readiness remains 208 active products ready with identifier caveat and 0 needing review.
- Search Console performance for the current 28-day API window: 6 impressions, 0 clicks, 0% CTR.
- GA4 organic for the current 28-day API window: 0 organic sessions and 0 top organic pages.
- Live indexing-support change: homepage now contains a compact Featured Pieces rail linking directly to priority product URLs that were unknown/discovered/crawled-not-indexed in URL Inspection.
- Reports:
  - `reports/indexing-phase-dashboard-2026-08-05.md`
  - `reports/indexing-phase-url-dashboard-2026-08-05.csv`
  - `reports/faraday-indexing-tier1-inspection-2026-08-05.json`
