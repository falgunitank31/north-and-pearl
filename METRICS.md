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
