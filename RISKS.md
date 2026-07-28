# North & Pearl Risks

## July 27, 2026 - Faraday Toolkit Integration

- Codex SEO Google/Search Console/GA4 APIs are installed but not credentialed; do not invent performance, indexation, query, or ranking data.
- Codex SEO premium PDF report generation is degraded because WeasyPrint cannot load local macOS `libgobject`; use Markdown/JSON artifacts until system libraries are available.
- Codex SEO sitemap crawl can trigger Shopify rate limiting at larger check limits; verify suspected broken URLs individually before treating 429 responses as real storefront failures.
- Shopify CLI theme push updates live theme files, but public storefront HTML can continue serving a cached render for a short window; verify customer-facing source after cache refresh before closing SEO/meta defects.
- Public product content mutation for `north-and-pearl.myshopify.com` is not currently authenticated through Shopify CLI Admin API; do not assume product-record fixes applied to `q4ydix-w1.myshopify.com` affect the public storefront.

## Active Risks

- Product images sourced from supplier listings may vary in quality and must stay accurate to the actual product.
- Material and quality claims remain limited until supplier documentation is verified.
- Merchant Center free listings may be blocked if shipping, return, or product attributes are incomplete.
- Early traffic data will be noisy; major redesign decisions should not overreact to very low session counts.
- Excessive product additions without visual QA can weaken premium brand perception.
- Universal compare-at pricing can weaken trust if marketing frames it as an active discount without a documented pricing policy.

## Controls

- Keep claim-safe language unless verified.
- Run product visual QA before prioritizing products in merchandising.
- Maintain Search Console sitemap and URL inspection queue.
- Record major changes with reason, date, risk, and validation.
- Do not expose sale badges, discount claims, urgency claims, or savings language unless an approved promotion/pricing decision exists.
