# Search Console Indexing Push - 2026-07-27

## Objective

Push North & Pearl's highest-priority commercial and organic launch URLs through Google Search Console discovery/indexing workflow.

## Current Status

- Search Console property access was previously verified for `northandpearl.com`.
- GA4 is linked to the Search Console property.
- Shopify sitemap is live at `https://northandpearl.com/sitemap.xml`.
- `robots.txt` is live and references the Shopify sitemap.
- Homepage was previously confirmed indexed in Search Console.
- Some commercial URLs were previously requested for indexing.

## Execution Update

Search Console browser access was restored in the Codex in-app browser for the `northandpearl.com` domain property under `falgunitank31@gmail.com`.

Manual URL Inspection results:

| URL | Search Console Result | Action Taken |
|---|---|---|
| `https://northandpearl.com/blogs/gift-guide/best-personalized-jewelry-gifts-for-her` | URL is on Google | Request indexing submitted successfully |
| `https://northandpearl.com/blogs/gift-guide/how-to-choose-a-name-necklace` | URL is not on Google | Blocked by Google CAPTCHA before the request-indexing action could be completed |

Sitemap status in Search Console:

| Sitemap | Type | Submitted | Last read | Status | Discovered pages |
|---|---|---|---|---|---:|
| `https://northandpearl.com/sitemap.xml` | Sitemap index | Jul 27, 2026 | Jul 27, 2026 | Success | 149 |

Important constraint: Google does not provide a general public API to request indexing for standard ecommerce/blog URLs. For normal Shopify pages, the real paths are:

1. Submit and maintain a sitemap in Search Console.
2. Use the URL Inspection tool's request-indexing action for individual URLs.
3. Ensure internal links, canonical tags, indexable responses, and sitemap references are correct so Google can crawl naturally.

## URLs Verified As Ready For Search Console Inspection

All URLs below returned HTTP 200, had self-referencing canonical URLs, and did not expose a noindex robots meta tag in the checked HTML.

| Priority | URL | Status | Canonical | Robots |
|---:|---|---:|---|---|
| 1 | `https://northandpearl.com/` | 200 | Self | Indexable by default |
| 2 | `https://northandpearl.com/collections/gifts` | 200 | Self | Indexable by default |
| 3 | `https://northandpearl.com/collections/name-necklaces` | 200 | Self | Indexable by default |
| 4 | `https://northandpearl.com/collections/initial-necklaces` | 200 | Self | Indexable by default |
| 5 | `https://northandpearl.com/collections/birthstone-jewelry` | 200 | Self | Indexable by default |
| 6 | `https://northandpearl.com/blogs/gift-guide/best-personalized-jewelry-gifts-for-her` | 200 | Self | Indexable by default |
| 7 | `https://northandpearl.com/blogs/gift-guide/how-to-choose-a-name-necklace` | 200 | Self | Indexable by default |
| 8 | `https://northandpearl.com/blogs/gift-guide/birthstone-jewelry-gift-guide` | 200 | Self | Indexable by default |
| 9 | `https://northandpearl.com/blogs/gift-guide/jewelry-gifts-for-mom` | 200 | Self | Indexable by default |
| 10 | `https://northandpearl.com/blogs/gift-guide/bridesmaid-jewelry-gift-ideas` | 200 | Self | Indexable by default |
| 11 | `https://northandpearl.com/blogs/gift-guide/anniversary-jewelry-gift-guide` | 200 | Self | Indexable by default |
| 12 | `https://northandpearl.com/blogs/gift-guide/best-jewelry-gifts-under-100` | 200 | Self | Indexable by default |
| 13 | `https://northandpearl.com/blogs/gift-guide/personalized-jewelry-for-couples` | 200 | Self | Indexable by default |
| 14 | `https://northandpearl.com/blogs/gift-guide/birthday-jewelry-gift-ideas` | 200 | Self | Indexable by default |
| 15 | `https://northandpearl.com/blogs/gift-guide/how-to-layer-necklaces` | 200 | Self | Indexable by default |

## Sitemap / Robots Validation

| URL | Status | Content Type | Result |
|---|---:|---|---|
| `https://northandpearl.com/sitemap.xml` | 200 | `application/xml; charset=utf-8` | Shopify sitemap index reachable |
| `https://northandpearl.com/robots.txt` | 200 | `text/plain; charset=utf-8` | Robots file reachable and includes crawl/discovery directives |

## Next UI Action

Google CAPTCHA blocked the second URL Inspection request. The owner may complete the CAPTCHA manually in Search Console, then the remaining URL Inspection queue can continue.

Remaining priority queue:

1. `https://northandpearl.com/blogs/gift-guide/how-to-choose-a-name-necklace`
2. `https://northandpearl.com/blogs/gift-guide/birthstone-jewelry-gift-guide`
3. `https://northandpearl.com/blogs/gift-guide/jewelry-gifts-for-mom`
4. `https://northandpearl.com/blogs/gift-guide/bridesmaid-jewelry-gift-ideas`
5. `https://northandpearl.com/blogs/gift-guide/anniversary-jewelry-gift-guide`
6. `https://northandpearl.com/blogs/gift-guide/best-jewelry-gifts-under-100`
7. `https://northandpearl.com/blogs/gift-guide/personalized-jewelry-for-couples`
8. `https://northandpearl.com/blogs/gift-guide/birthday-jewelry-gift-ideas`
9. `https://northandpearl.com/blogs/gift-guide/how-to-layer-necklaces`
10. `https://northandpearl.com/collections/gifts`
11. `https://northandpearl.com/collections/name-necklaces`
12. `https://northandpearl.com/collections/initial-necklaces`
13. `https://northandpearl.com/collections/birthstone-jewelry`

## Risk Notes

- Do not claim these URLs are indexed until Search Console confirms it.
- Do not use deprecated Google sitemap ping endpoints as a substitute for Search Console.
- Do not use the Google Indexing API for these standard ecommerce/blog pages; that API is not the general indexing request path for Shopify catalog/content URLs.

## Agents

- Faraday: indexing priority and organic launch URLs.
- Rawls: Search Console / GA4 verification.
- Tesla: technical indexability checks.
- Lead Orchestrator: blocker handling and source-of-truth reporting.
