# Faraday Daily Monitor - 2026-08-03

## Google Credential Status

- Codex SEO Google toolkit tier: Tier 2, full API key + service account + GA4 access.
- Available capabilities verified: PageSpeed Insights, CrUX, CrUX History, Search Console, URL Inspection, sitemaps, Indexing API, GA4 organic reporting.
- Note: the Indexing API was not used for ordinary ecommerce URLs because Google officially limits it to JobPosting and BroadcastEvent/VideoObject use cases.

## Search Console Performance

Date range: 2026-07-06 to 2026-07-31.

- Clicks: 0
- Impressions: 5
- CTR: 0%
- Rows: 4
- Quick wins: 0

Visible query/page rows:

| Query | Page | Clicks | Impressions | Position |
| --- | --- | ---: | ---: | ---: |
| `birthstone gifts for mom not jewelry` | `/collections/birthstone-jewelry` | 0 | 1 | 63 |
| `north pearl` | `http://northandpearl.com/` | 0 | 2 | 7.5 |
| `north pearl` | `https://northandpearl.com/` | 0 | 1 | 4 |
| `pearl necklace with name` | `/collections/name-necklaces` | 0 | 1 | 44 |

## URL Inspection

All monitored URLs are now classified as Indexed.

| URL | Classification | Coverage | Last Crawl | Notes |
| --- | --- | --- | --- | --- |
| `/collections/personalized-jewelry` | Indexed | Submitted and indexed | 2026-08-03 01:50 UTC | Canonical matches, crawl mobile |
| `/collections/jewelry-gifts-for-her` | Indexed | Submitted and indexed | 2026-08-03 08:44 UTC | Canonical matches, crawl mobile |
| `/collections/gifts-under-50` | Indexed | Submitted and indexed | 2026-08-03 02:22 UTC | Canonical matches, crawl mobile |
| `/collections/gifts-under-100` | Indexed | Submitted and indexed | 2026-08-03 09:58 UTC | Canonical matches, crawl mobile |
| `/collections/birthday-jewelry-gifts` | Indexed | Submitted and indexed | 2026-08-03 10:12 UTC | Canonical matches, crawl mobile |
| `/collections/anniversary-gifts` | Indexed | Submitted and indexed | 2026-08-03 05:50 UTC | Canonical matches, crawl mobile |
| `/blogs/gift-guide/meaningful-jewelry-gifts-to-shop-this-week` | Indexed | Submitted and indexed | 2026-08-03 09:05 UTC | Canonical matches, crawl mobile |
| `/products/north-pearl-initial-shell-necklace` | Indexed | Submitted and indexed | 2026-07-30 21:12 UTC | Product snippets and Merchant listing warnings remain non-fatal |

## Sitemap Status

- Root sitemap: 0 errors, 0 warnings.
- Product sitemap: 209 web URLs submitted, 0 errors, 0 warnings.
- Blog sitemap: 14 web URLs submitted, 0 errors, 0 warnings.
- Collection sitemap: the previously submitted non-parameterized URL returned 400 and 1 error in Search Console. Faraday removed the bad submission and submitted the correct Shopify URL: `/sitemap_collections_1.xml?from=658300240056&to=659239338168`.
- Correct collection sitemap now shows 24 web URLs submitted, 19 image URLs submitted, 0 errors, and 0 warnings.

## Safe Actions Executed

1. Removed the bad collection sitemap submission that returned HTTP 400.
2. Submitted the correct Shopify collection sitemap URL through Search Console API.
3. Revalidated monitored buyer-intent URLs through URL Inspection.

## Next Faraday Focus

- Traffic is still the bottleneck: Search Console has impressions but no clicks, and GA4 organic remains 0 sessions.
- Continue monitoring impressions and queries now that the buyer-intent collection URLs are indexed.
- Use indexed collection and guide pages to strengthen commercial internal links, but avoid mass blog publishing until traffic and buyer behavior exist.
