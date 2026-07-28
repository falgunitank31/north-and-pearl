# North & Pearl Backlog

## P0

- None currently verified.

## P1

- Monitor Merchant Center readiness issues that block free listings, including shipping/returns/feed attribute validation.
- Confirm all customer-facing material, shipping, return, and quality claims remain verified or neutral.
- Monitor compare-at pricing trust: all active products currently have compare-at data, but live theme checks show no visible sale labels or sale-price blocks on sampled collection/PDP pages.
- Continue daily Gauss catalog hygiene now that the active catalog is 208 products: watch product image quality, duplicate naming, low-quality source imagery, channel readiness, and curated collection size.

## P2

- Monitor Gifts curation after traffic begins; current Gifts collection was narrowed from 156 products to 56 active gift-intent products on July 28, 2026.
- Monitor New Arrivals curation after traffic begins; current New Arrivals collection was narrowed from 222 products to 64 active launch-ready products on July 28, 2026.
- Review the 90-product live expansion by category after 7-14 days of traffic; demote or revise products with weak views/add-to-carts once data is meaningful.
- Review the 10 held products from the Gauss next-100 batch; only activate if source-price risk, image count, and visual QA issues are resolved.
- Replace exact-source imagery for active products still marked acceptable temporary where higher-resolution same-product supplier images are available and source pages can be accessed without CAPTCHA/protection; top Alibaba source IDs still returned protection pages with no extractable media on July 28, 2026.
- Re-score Best Sellers once real Shopify sales, add-to-cart, and product-view data is meaningful; current collection is a curated launch edit.

## P3

- Monitor Search Console coverage after the July 28, 2026 priority indexing batch; homepage, Best Sellers, Gifts, New Arrivals, Name Necklaces, Necklaces, AI Brand Information, Bracelets, Rings, Earrings, and the primary gift guide were requested.
- Enrich Faraday baseline with Search Console/GA4/PageSpeed API data once Codex SEO Google credentials are configured.
- Add more refined collection image standards once final product photography is available; all 13 populated commercial collections currently have representative collection images from live product media.
- Build repeatable weekly reporting and experiment review cadence.
- Expand organic content only where a commercial page and product path exist.
- Continue lightweight live title/meta validation in small batches to avoid Shopify 429 rate limiting.
- Public product content mutation through Shopify Admin API remains unavailable for `north-and-pearl.myshopify.com`; use theme-level safeguards and owner-assisted auth when product-record mutation is required.

## Blocked / Needs Owner

- Paid tools, ads, supplier contact, inventory/sample purchases, legal policy finalization, and any unverified material claims require owner approval.
- Alibaba direct product-page fetching for media replacement is currently blocked by protection responses; exact-source media replacement should resume only when source pages render normally in browser, owner supplies product image URLs, supplier provides assets, or final photography is available.
- Public store product-record mutation through Shopify CLI is blocked until `shopify store auth --store north-and-pearl.myshopify.com` is completed with Admin API scopes. Theme CLI push remains available.
