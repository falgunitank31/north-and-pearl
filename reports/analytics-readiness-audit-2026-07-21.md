# Analytics Readiness Audit - 2026-07-21

Owner: Bohr

Goal: make sure North & Pearl can measure traffic, product discovery, add-to-cart, checkout starts, orders, and revenue before scaling marketing.

## Current Status

Performance impact is UNKNOWN.

No traffic, ranking, conversion, or order improvement should be reported until analytics sources are verified.

## What Appears Present

- Shopify storefront includes Shopify web pixels / analytics infrastructure.
- Storefront HTML exposes Shopify's standard page-view event handling.
- Product/cart QA scripts can verify storefront functionality, but they do not replace analytics reporting.

## Required Data Sources

- Shopify Analytics.
- Google Analytics 4.
- Google Search Console.
- Bing Webmaster Tools.
- Microsoft Clarity, only after privacy/consent review.
- Google Merchant Center free listings.
- Pinterest analytics, once organic Pinterest is active.

## Required Baseline Metrics

Bohr should record the first verified baseline for:

- sessions by channel
- organic sessions
- direct sessions
- referral sessions
- top landing pages
- collection views
- product views
- add-to-cart rate
- checkout starts
- purchases
- revenue
- email signups
- Search Console impressions
- Search Console clicks
- indexed page count
- top queries

## Measurement Risks

- Without Search Console, Faraday cannot verify query impressions or clicks.
- Without GA4 or verified Shopify analytics access, order-readiness work cannot be tied to traffic or conversion lift.
- Without event taxonomy, Kuhn/Gauss/Tesla cannot reliably know whether design, catalog, or technical changes improve conversion.
- Without privacy review, Clarity or custom tracking should not be installed.

## Bohr Next Actions

1. Confirm whether GA4 is connected to Shopify.
2. Confirm whether Search Console is verified for `https://northandpearl.com`.
3. Submit Shopify sitemap in Search Console if not already submitted.
4. Confirm Bing Webmaster Tools verification.
5. Confirm Shopify analytics access and baseline reporting.
6. Confirm whether Microsoft Clarity is approved for use.
7. Define weekly reporting format for Faraday, Kuhn, Gauss, Tesla, and Wegener.
8. Document event taxonomy for product view, collection view, add-to-cart, checkout start, purchase, search, and email signup.
9. Create the first weekly baseline report once data is available.
10. Flag any tracking implementation that requires Tesla support.
