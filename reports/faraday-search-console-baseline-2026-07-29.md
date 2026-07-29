# Faraday Search Console Baseline — July 29, 2026

## Access Status

Search Console service-account access is verified.

- Property visible: `sc-domain:northandpearl.com`
- Permission level: `siteFullUser`
- Service account: `north-pearl-seo-analytics@north-and-pearl.iam.gserviceaccount.com`

## Search Performance

Last 28-day Search Console API report:

- Rows: 1
- Clicks: 0
- Impressions: 1
- CTR: 0%
- Position: 0 in the API totals
- Quick wins: none yet

Interpretation: North & Pearl is connected to Search Console, but Google has almost no measurable search demand/impression data yet.

## Sitemap Status

Submitted sitemap:

`https://northandpearl.com/sitemap.xml`

Status:

- Pending: false
- Sitemap index: true
- Warnings: 0
- Errors: 0
- Submitted web URLs: 149
- Indexed web URLs shown by sitemap report: 0
- Submitted images: 118
- Indexed images shown by sitemap report: 0

Interpretation: sitemap submission is technically clean, but indexing is still early/incomplete.

## URL Inspection Results

Priority URLs inspected:

| URL | Verdict | Coverage |
| --- | --- | --- |
| `https://northandpearl.com/` | PASS | Submitted and indexed |
| `https://northandpearl.com/collections/name-necklaces` | PASS | Submitted and indexed |
| `https://northandpearl.com/collections/best-sellers` | PASS | Submitted and indexed |
| `https://northandpearl.com/collections/jewelry-gifts-for-her` | NEUTRAL | URL is unknown to Google |
| `https://northandpearl.com/collections/gifts-under-50` | NEUTRAL | URL is unknown to Google |
| `https://northandpearl.com/blogs/gift-guide/meaningful-jewelry-gifts-to-shop-this-week` | NEUTRAL | URL is unknown to Google |
| `https://northandpearl.com/products/north-pearl-initial-shell-necklace` | NEUTRAL | Discovered - currently not indexed |

## Immediate Actions

- Keep homepage, Name Necklaces, and Best Sellers as indexed anchors for internal linking.
- Strengthen internal links from indexed pages into newer buyer-intent collections and priority PDPs. Completed first pass: indexed collection guide pages now link to Gifts Under $50 and the weekly gift guide. Completed second pass: homepage now links directly to the weekly gift guide.
- Confirmed all six buyer-intent collections are present in Shopify's collections sitemap and the weekly guide is present in Shopify's blog sitemap.
- Resubmitted `sitemap.xml`, `sitemap_collections_1.xml`, and `sitemap_blogs_1.xml` through the Search Console API.
- Monitor the unknown buyer-intent pages daily until Google crawls them.
- Do not rely on the Indexing API for normal ecommerce pages; Google's Indexing API is officially intended for JobPosting and BroadcastEvent/VideoObject use cases.

## Current Risk

Traffic is the main bottleneck, not measurement access. The store now has API-level visibility, but search demand has not yet accumulated.
