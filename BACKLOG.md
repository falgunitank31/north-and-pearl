# North & Pearl Backlog

## P0

- None currently verified.

## P1

- Monitor Merchant Center readiness issues that block free listings, including shipping/returns/feed attribute validation.
- Confirm all customer-facing material, shipping, return, and quality claims remain verified or neutral.
- Monitor compare-at pricing trust: all active products currently have compare-at data, but live theme checks show no visible sale labels or sale-price blocks on sampled collection/PDP pages.
- Continue daily Gauss catalog hygiene now that the active catalog is 208 products: watch product image quality, duplicate naming, low-quality source imagery, channel readiness, and curated collection size.
- Faraday/Rawls must treat traffic generation as the current growth bottleneck: GA4 is receiving data, but the visible last-7-days overview shows Direct-only traffic and no visible organic channel yet.
- Google API key, service-account JSON, Search Console, and GA4 property `properties/546565745` are configured and verified. Current bottleneck is traffic/indexing maturity: Search Console still shows only 1 impression and 0 clicks in the July 30 API monitor.
- Monitor Search Console indexing for the six new buyer-intent collections after sitemap resubmission: Personalized Jewelry, Jewelry Gifts for Her, Gifts Under $50, Gifts Under $100, Birthday Jewelry Gifts, and Anniversary Gifts. July 30 inspection still shows priority buyer-intent URLs neutral/not fully indexed.
- Monitor Search Console product sitemap processing after the July 30 API submission; current product sitemap state is pending with 0 errors and 0 warnings.
- Strengthen internal discovery into pages currently unknown or not indexed by Google: Jewelry Gifts for Her, Gifts Under $50, the new gift guide, and Initial Shell Necklace PDP.
- Monitor the new buyer-intent collections for impressions, clicks, collection views, product clicks, add-to-cart activity, and revenue once Search Console/GA4 data accumulates.
- Re-run targeted live storefront QA after the temporary Shopify 429 rate-limit window clears; July 30 Theme Check and Admin/API checks passed, but live HTTP validation was rate-limited after full-catalog QA began.
- Avoid full-catalog live storefront crawling during the current Shopify throttle window; use targeted URL QA until repeated full crawls stop hanging.
- Rawls must verify `add_to_cart`, newsletter signup, checkout-start, and purchase event receipt from account-side reports or an approved test-order workflow before any conversion-performance claim.
- Rawls/Faraday must capture a fresh comparable GA4 and Search Console snapshot before reporting any traffic increase; latest verified baseline remains July 28 with 23 sessions, 9 users, Direct-only acquisition, and 0 key events.
- Faraday/Rawls must monitor the new `order_growth_july_2026` activation kit daily for UTM sessions, landing-page engagement, product views, add-to-cart, checkout starts, and purchases; no measurable traffic increase is verified yet.
- Lovelace and the owner must finalize shipping, returns, support, fulfillment, and personalized/custom order rules before paid acquisition or stronger operational copy.

## P2

- Monitor Gifts curation after traffic begins; current Gifts collection was narrowed from 156 products to 56 active gift-intent products on July 28, 2026.
- Monitor New Arrivals curation after traffic begins; current New Arrivals collection was narrowed from 222 products to 64 active launch-ready products on July 28, 2026.
- Review buyer-intent collection membership after 7-14 days of traffic; demote products with poor click/add-to-cart behavior and feature stronger products.
- Review the 90-product live expansion by category after 7-14 days of traffic; demote or revise products with weak views/add-to-carts once data is meaningful.
- Review the 10 held products from the Gauss next-100 batch; only activate if source-price risk, image count, and visual QA issues are resolved.
- Replace exact-source imagery for active products still marked acceptable temporary where higher-resolution same-product supplier images are available and source pages can be accessed without CAPTCHA/protection. If recovered source media reveals a catalog mismatch, repair title/type/collections before any image replacement.
- Recover source references for the 9 below-threshold active products missing usable source-reference tags before attempting media replacement; current queue is `reports/source-reference-recovery-2026-07-29.md` with 5 recoverable IDs needing confirmation and 4 exact Alibaba URLs required.
- Improve the 115 active products below preferred media standard as exact-source assets become available; current PDP QA passes, but image quality remains below premium target.
- Re-score Best Sellers once real Shopify sales, add-to-cart, and product-view data is meaningful; current collection is a curated launch edit.

## P3

- Monitor Search Console coverage after the July 28, 2026 priority indexing batch; homepage, Best Sellers, Gifts, New Arrivals, Name Necklaces, Necklaces, AI Brand Information, Bracelets, Rings, Earrings, and the primary gift guide were requested.
- Continue enriching Faraday/Rawls baselines with Search Console, GA4, and PageSpeed API data now that Codex SEO Google credentials are configured.
- Re-run product-page mobile PageSpeed for `north-pearl-initial-shell-necklace`; the immediate post-fix API retry timed out after the live HTML confirmed the image-priority deployment.
- Add more refined collection image standards once final product photography is available; all 13 populated commercial collections currently have representative collection images from live product media.
- Build repeatable weekly reporting and experiment review cadence.
- Expand organic content only where a commercial page and product path exist.
- Continue lightweight live title/meta validation in small batches to avoid Shopify 429 rate limiting.
- Public product content mutation through Shopify Admin API remains unavailable for `north-and-pearl.myshopify.com`; use theme-level safeguards and owner-assisted auth when product-record mutation is required.

## Blocked / Needs Owner

- Paid tools, ads, supplier contact, inventory/sample purchases, legal policy finalization, and any unverified material claims require owner approval.
- Alibaba direct product-page fetching for media replacement is partially blocked by protection responses; exact-source media replacement should resume only when source pages render normally in browser, owner supplies product image URLs, supplier provides assets, or final photography is available. One accessible source (`1601721496131`) exposed that the active product was miscategorized, and the live catalog record has been repaired.
- Shopify order-source monitoring is unblocked as of July 29, 2026; safe recent-orders query returned `ORDER_ACCESS_OK` with 0 visible orders.
