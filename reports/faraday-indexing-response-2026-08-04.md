# Faraday Indexing Response - 2026-08-04

## Trigger

Owner shared a Search Console URL Inspection screenshot showing:

- Page is not indexed: `Crawled - currently not indexed`
- Last crawl: August 4, 2026 at 2:22:20 PM
- Crawled as: Googlebot smartphone
- Crawl allowed: Yes
- Page fetch: Successful
- Referring page: None detected
- Sitemap: Temporary processing error

## Verified Findings

- Search Console API access is working for `sc-domain:northandpearl.com`.
- Root, blog, product, and collection sitemaps were resubmitted successfully through the Search Console API at 2026-08-04T20:47Z.
- Sitemap API status shows 0 errors and 0 warnings for root, blog, product, and collection sitemaps.
- URL Inspection batch result for 11 priority URLs:
  - 9 submitted/indexed.
  - 2 discovered/currently not indexed.
  - 0 crawl-blocked.
  - 0 canonical mismatch.
  - 0 robots-blocked.

## Indexed Priority URLs

- `https://northandpearl.com/collections/personalized-jewelry`
- `https://northandpearl.com/collections/jewelry-gifts-for-her`
- `https://northandpearl.com/collections/gifts-under-50`
- `https://northandpearl.com/collections/gifts-under-100`
- `https://northandpearl.com/collections/birthday-jewelry-gifts`
- `https://northandpearl.com/collections/anniversary-gifts`
- `https://northandpearl.com/blogs/gift-guide/meaningful-jewelry-gifts-to-shop-this-week`
- `https://northandpearl.com/blogs/gift-guide/best-name-necklace-gifts-for-her`
- `https://northandpearl.com/products/north-pearl-initial-shell-necklace`

## Not Yet Indexed

- `https://northandpearl.com/blogs/gift-guide/birthstone-inspired-jewelry-gifts-for-mom`
  - Coverage state: Discovered - currently not indexed.
  - Referring URLs reported: none.
- `https://northandpearl.com/blogs/gift-guide/jewelry-gifts-under-100`
  - Coverage state: Discovered - currently not indexed.
  - Referring URLs reported: blog sitemap.

## Actions Taken

- Resubmitted:
  - `https://northandpearl.com/sitemap.xml`
  - `https://northandpearl.com/sitemap_blogs_1.xml`
  - `https://northandpearl.com/sitemap_products_1.xml?from=10481785372856&to=10495792611512`
  - `https://northandpearl.com/sitemap_collections_1.xml?from=658300240056&to=659239338168`
- Refreshed the buyer-intent guide cluster with `scripts/execute-faraday-august-marketing-push.mjs`.
- Revalidated the two pending guide URLs:
  - Both return live HTML.
  - Both have self-referencing canonical URLs.
  - Both do not contain `noindex`.
  - Both include internal links to related guides and collections.

## Interpretation

This is not currently a robots, noindex, sitemap-error, or canonical blocker for the checked priority URLs. The issue is Google selection/processing and low site authority/traffic maturity. The two pending guides need stronger crawl signals, external discovery, and time.

The product URL Inspection report still shows stale Merchant listing warnings for `shippingDetails` and `hasMerchantReturnPolicy`, but the live product HTML now contains both fields after the August 4 product schema fix. Merchant Center validation should clear after Google recrawls the affected product pages.

## Next Faraday Actions

- Continue daily URL Inspection monitoring for the two pending guide URLs.
- Add more indexed-page links into the two pending guides when contextually useful.
- Improve SERP/SXO targeting for the guide titles and meta descriptions if they remain unindexed after several crawls.
- Build external authority and first-party distribution so Google sees demand and referring signals beyond the sitemap.
