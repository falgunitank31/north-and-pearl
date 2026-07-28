# Faraday Actions

Date: July 27, 2026

## Completed

- Reviewed `AgriciDaniel/codex-seo` installer, manifests, scripts, agents, dependencies, hooks, extensions, and credential behavior.
- Installed Codex SEO `v1.9.6-codex.5` as Faraday's subordinate toolkit.
- Repaired the toolkit virtual environment using Codex bundled Python 3.12 after the installer initially detected system Python 3.9.
- Installed core, Google, visual, report, and Playwright browser dependencies.
- Verified toolkit core and visual readiness.
- Ran baseline audit for `https://northandpearl.com`.
- Added global WebPage schema to the live theme.
- Validated live sampled pages for HTTP 200, WebPage schema presence, and no Liquid errors.
- Added theme-level sanitizers for product meta descriptions, OpenGraph/Twitter descriptions, WebPage schema descriptions, and visible PDP descriptions so internal supplier-review language is not rendered once Shopify serves the updated theme.
- Cleaned active product copy in the currently authenticated Admin API context and produced `reports/active-product-public-copy-cleanup-2026-07-27.md`.

## Blocked

- Search Console and GA4 API enrichment: no Codex SEO Google credential file or environment key is configured.
- DataForSEO enrichment: no credentials detected.
- Premium PDF report export: WeasyPrint lacks local macOS `libgobject` support.
- Public `north-and-pearl.myshopify.com` Admin API product mutation: Shopify CLI reports no stored app authentication for that store, while theme push remains authenticated.
- Public storefront cache/render refresh: `theme pull` confirms updated live theme files, but sampled public HTML still returned cached product meta/body content immediately after push.

## Next Queue

1. Audit and safely shorten long commercial titles/meta descriptions.
2. Continue image/source-quality work when exact source media can be verified.
3. Add answer blocks to guide/FAQ/AI brand pages only where useful and claim-safe.
4. Re-run SEO drift comparison after each meaningful storefront update.
