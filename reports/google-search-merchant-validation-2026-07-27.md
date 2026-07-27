# Google Search And Merchant Validation

Date: 2026-07-27
Store: North & Pearl
Domain: https://northandpearl.com

## Verified In Search Console

- Account access works for `northandpearl.com` domain property under `falgunitank31@gmail.com`.
- Overview shows `0 total web search clicks`.
- Overview shows `2 indexed pages`.
- Overview shows `0 not indexed pages`.
- Page indexing report last update: `7/23/26`.
- Page indexing report shows `Good job! No issues detected in the last 90 days`.
- Homepage inspection: `URL is on Google`, `Page is indexed`, and page is served over HTTPS.
- Homepage indexing request confirmed: `URL was added to a priority crawl queue`.
- Best Sellers indexing request confirmed.
- Birthstone Jewelry indexing request confirmed.
- Top gift guide indexing request confirmed.

## Sitemap Status

- Submitted sitemap in Search Console: `https://northandpearl.com/sitemap.xml`.
- Search Console accepted the submission but immediately displayed `Couldn't fetch`.
- Public verification shows sitemap is reachable:
  - HTTP status: `200`
  - Content type: `application/xml; charset=utf-8`
  - Robots.txt includes `Sitemap: https://northandpearl.com/sitemap.xml`
- Current interpretation: Google needs time to process or retry sitemap fetch. This is not a storefront availability failure.

## Priority URL Status

| URL | Search Console Status | Action |
|---|---|---|
| https://northandpearl.com/ | URL is on Google | Recrawl requested |
| https://northandpearl.com/collections/best-sellers | Not on Google | Indexing requested |
| https://northandpearl.com/collections/name-necklaces | Not on Google | Request did not confirm before UI throttling/transition |
| https://northandpearl.com/collections/gifts | Not on Google | Request did not confirm before UI throttling/transition |
| https://northandpearl.com/collections/initial-necklaces | Not on Google | Request did not confirm before UI throttling/transition |
| https://northandpearl.com/collections/birthstone-jewelry | Not on Google | Indexing requested |
| https://northandpearl.com/blogs/gift-guide/best-personalized-jewelry-gifts-for-her | Not on Google | Indexing requested |

## Verified In Merchant Center

- Merchant Center account opened: `North and Pearl`, account `5828122513`.
- Product diagnostics page shows: `Great, all your prioritized fixes are resolved`.
- Merchant overview shows:
  - Total products: `118`
  - Approved products: `118`
  - Limited products: `0`
  - Not approved products: `0`
  - Under review products: `0`
- The previous missing shipping information prioritized warning is resolved.

## Merchant Center Remaining Items

Merchant Center still shows optional growth/setup prompts:

- Add fastest shipping options.
- Show return policy to customers.
- Turn on automatic image improvements.
- Sign up for Google Customer Reviews.

These are not current product-approval blockers. Shipping and returns should not be strengthened in Merchant Center until exact business rules are confirmed, because the live policies are intentionally conservative and do not publish fixed delivery windows or a fixed standard return window.

## Live Storefront Technical Verification

- Homepage contains Google tag ID `G-14KCZE935H`.
- Homepage contains JSON-LD structured data.
- `robots.txt` allows public storefront crawling and declares the sitemap.
- `https://northandpearl.com/sitemap.xml` returns HTTP 200.

## Next Actions

1. Re-check Search Console sitemap status after Google has had processing time.
2. Re-inspect P0 collection URLs and request indexing where not yet confirmed.
3. Verify GA4 Realtime and ecommerce event receipt with Rawls.
4. Finalize shipping and returns business rules before configuring optional Merchant Center policy enhancements.
5. Continue organic internal linking and product visual QA while Google starts discovering more URLs.
