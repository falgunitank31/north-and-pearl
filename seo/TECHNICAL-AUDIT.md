# Faraday Technical SEO Audit

Date: July 27, 2026

## Verified Strengths

- Homepage is indexable.
- Canonical tag exists in `layout/theme.liquid`.
- Live sampled pages returned HTTP 200 after schema deployment.
- Critical SEO content is server-rendered enough for homepage detection.
- Shopify Theme Check passed after the schema update.

## Findings

| Priority | Finding | Status | Action |
|---|---|---|---|
| P1 | WebPage schema missing from toolkit schema audit | Fixed | Added a global WebPage JSON-LD block in `snippets/north-pearl-schema.liquid`. |
| P1 | Sitemap audit reported many 429 URLs | Needs slower validation | Treated as crawl-rate behavior, not confirmed broken pages. Existing live product QA passed 118/118 active products. |
| P2 | Performance baseline is heuristic-only and flags LCP/INP | Scheduled | Use PageSpeed/CrUX once API credentials exist; meanwhile continue image and script hygiene. |
| P3 | IndexNow support not detected | Scheduled | Consider only after Google foundation and Merchant Center are stable. |

## Validation

- Theme Check: 197 files inspected, no offenses found.
- Live raw HTML validation: sampled homepage, collection, PDP, and AI Brand Information pages include one WebPage schema block and no Liquid errors.
