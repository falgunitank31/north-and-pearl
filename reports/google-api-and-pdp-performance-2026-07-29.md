# Google API and PDP Performance Update — July 29, 2026

## Agents Involved

- Lead Orchestrator: prioritized the access and performance blocker.
- Faraday: enabled Google SEO toolkit Tier 0 reporting.
- Rawls: captured measurable PageSpeed baseline.
- Tesla: implemented the product-page image loading fix.
- Kuhn: validated the change supports premium PDP presentation without altering product truth.

## Access Status

- Google API key is stored locally at `/Users/yagneshtank/.config/codex-seo/google-api-key.txt`.
- Google SEO config exists at `/Users/yagneshtank/.config/codex-seo/google-api.json`.
- Codex SEO Google toolkit status: Tier 0 ready.
- Available now: PageSpeed Insights, Chrome UX Report, CrUX History.
- Still unavailable: Search Console API, URL Inspection API, Indexing API, and GA4 Data API.
- Remaining dependency: local service account JSON plus adding that service account to Search Console and GA4.

## Performance Baseline

Sampled pages:

- Homepage: `https://northandpearl.com`
- Name Necklaces collection: `https://northandpearl.com/collections/name-necklaces`
- Initial Shell Necklace PDP: `https://northandpearl.com/products/north-pearl-initial-shell-necklace`

Verified scores:

- Homepage mobile: Performance 90, Accessibility 97, SEO 100, LCP 3.5s.
- Homepage desktop: Performance 100, Accessibility 97, SEO 100, LCP 0.7s.
- Name Necklaces desktop: Performance 95, Accessibility 97, SEO 100, LCP 0.8s.
- Initial Shell PDP desktop: Performance 98, Accessibility 92, SEO 100, LCP 1.1s.
- Initial Shell PDP mobile before fix: Performance 66, Accessibility 92, SEO 100, LCP 9.2s.
- Name Necklaces mobile PageSpeed returned a transient Lighthouse error.

## CrUX Field Data

- CrUX origin query for `https://northandpearl.com` on phone returned `chrome ux report data not found`.
- CrUX origin query for `https://northandpearl.com` on desktop returned `chrome ux report data not found`.
- Interpretation: Google does not yet have enough public Chrome-user field data for the origin. Rawls should use PageSpeed lab data until traffic grows enough for CrUX reporting.

## Change Implemented

Tesla updated `snippets/product-thumbnail.liquid` so the first visible PDP media image:

- uses `fetchpriority="high"`;
- uses async decoding;
- caps Shopify responsive source candidates at 1346px instead of 1946px;
- keeps secondary media lazy-loaded.

This reduces unnecessary mobile image payload while preserving product image accuracy.

## Validation

- Theme Check passed: 206 files inspected, no offenses.
- Live theme `189441802424` was pushed successfully.
- Live PDP HTML validation confirmed:
  - `fetchpriority="high"` is present;
  - `1346w` responsive candidate is present;
  - `1946w` responsive candidate is no longer present.
- Google PageSpeed rerun after deployment timed out at the API level, so the before/after score still needs a later retry.

## Risks and Follow-Up

- Re-test PDP mobile PageSpeed later because the immediate API rerun timed out.
- Unlock Search Console and GA4 API access with a service account so Faraday/Rawls can measure query, landing-page, and conversion data directly.
- Continue using PageSpeed evidence to prioritize only real performance bottlenecks, not cosmetic churn.
