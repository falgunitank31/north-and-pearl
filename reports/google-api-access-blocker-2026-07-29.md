# Google API Access Blocker - 2026-07-29

Owner: Rawls + Faraday  
Scope: GA4, Search Console, PageSpeed Insights, CrUX, URL inspection, sitemap/indexing API visibility.

## Status

Google API access is still blocked locally.

The Codex SEO Google auth check returned:

- Tier: `-1`
- Description: no credentials configured
- PageSpeed Insights: unavailable
- CrUX: unavailable
- Search Console API: unavailable
- GA4 Data API: unavailable
- Indexing API: unavailable

No Google API key, OAuth token, service account path, GA4 property ID, or Search Console property is currently configured in the local Codex SEO config path.

## Local Prep Completed

Created secure local config directory:

`/Users/yagneshtank/.config/codex-seo`

Created non-secret example config:

`/Users/yagneshtank/.config/codex-seo/google-api.example.json`

Created project verifier:

`scripts/verify-google-access.mjs`

Current verifier result:

- Config directory exists
- Example config exists
- Real config does not exist yet
- Toolkit status remains `BLOCKED`

## Required Local Config

Expected config file:

`/Users/yagneshtank/.config/codex-seo/google-api.json`

Expected shape:

```json
{
  "service_account_path": "/secure/local/path/to/service-account.json",
  "api_key": "GOOGLE_API_KEY",
  "default_property": "sc-domain:northandpearl.com",
  "ga4_property_id": "properties/GA4_PROPERTY_ID"
}
```

Do not paste API keys or service-account JSON into chat.

## Safe Setup Options

1. Service account path: place the service-account JSON somewhere local and reference it in `google-api.json`.
2. OAuth path: run the toolkit OAuth flow locally with a downloaded Google OAuth client file.
3. Manual export fallback: export GA4/Search Console reports from the Google UI and place them in `analytics/exports/`.

## What Remains Blocked

- Exact traffic increase reporting
- Current organic clicks/impressions from Search Console
- Query and landing-page analysis from Search Console
- GA4 funnel and event trend reporting through the local toolkit
- PageSpeed/CrUX API-backed performance baselines

## What Is Not Blocked

- Shopify storefront QA
- Theme Check
- Product/catalog QA
- Merchant-readiness audits
- SEO metadata and schema improvements
- Buyer-intent collection/content work
- Source-reference recovery queue work

## Next Action

Rawls/Faraday should retry:

```bash
node scripts/verify-google-access.mjs
```

after the local config file exists.
