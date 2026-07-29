# Google Service Account Setup — July 29, 2026

## Status

Local service account JSON is installed and secured at:

`/Users/yagneshtank/.config/codex-seo/google-service-account.json`

Service account email:

`north-pearl-seo-analytics@north-and-pearl.iam.gserviceaccount.com`

Codex SEO Google toolkit now detects Tier 2 credential readiness locally.

## Verified Locally

- PageSpeed Insights: available.
- CrUX: available.
- CrUX History: available.
- Search Console API client: credential-ready locally.
- URL Inspection / Indexing API client: credential-ready locally.
- GA4 Data API client: credential-ready locally.

## Remaining Account-Side Steps

### Search Console

The Search Console API returned a 403 permission error for:

`sc-domain:northandpearl.com`

The service account can authenticate to Search Console, but `sites.list` returns zero visible properties. This confirms the missing step is Search Console property access, not local credentials.

Add this service account email in Google Search Console:

`north-pearl-seo-analytics@north-and-pearl.iam.gserviceaccount.com`

Required access:

- Full user access is enough for Search Analytics and sitemaps.
- Owner access is preferred if URL Inspection and indexing workflows are expected.

### GA4

GA4 property ID is configured:

`properties/546565745`

GA4 API access works. Current organic reports return zero rows, which matches the low/Direct-only traffic baseline already visible in GA4.

## Validation Commands

After account-side access is granted:

```bash
node scripts/verify-google-access.mjs
python3 /Users/yagneshtank/.codex/skills/seo/scripts/gsc_query.py --property 'sc-domain:northandpearl.com' --json
python3 /Users/yagneshtank/.codex/skills/seo/scripts/gsc_query.py sitemaps --property 'sc-domain:northandpearl.com' --json
python3 /Users/yagneshtank/.codex/skills/seo/scripts/ga4_report.py --property properties/NUMERIC_PROPERTY_ID --json
```

## Risk

Do not commit or upload the JSON credential file. It is intentionally stored outside the repository.
