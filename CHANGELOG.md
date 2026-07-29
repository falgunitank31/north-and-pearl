# Changelog

## July 29, 2026

- Added the Lead Traffic and Orders Summary to separate verified performance facts from assumptions: latest verified GA4 baseline remains 23 sessions, 9 users, Direct-only acquisition, 394 events, and 0 key events; no traffic increase, order count, revenue, conversion rate, or AOV can be claimed from the current project records.
- Completed an urgent execution pass across Rawls, Lovelace, Faraday, Gauss, Kuhn, and Tesla: product SEO remains 208/208 clean, Merchant readiness remains 208/208 ready with identifier caveat, Theme Check passed with no offenses, main menu audit passed, safe order-read scope is still blocked, and Google API access is still unconfigured locally.
- Hardened `scripts/live-storefront-qa.mjs` so transient fetch/network failures retry instead of crashing full-catalog QA, then re-ran live QA successfully: 208/208 product pages passed and cart add passed.
- Upgraded the Agent Command Center into an interactive local dashboard with search, working/resting/blocked filters, blocker cards, and persistent generator support; verified at `http://localhost:8787/docs/agent-command-center.html`.
- Restored Shopify order-read access through CLI store auth; safe non-PII recent-orders query now returns `ORDER_ACCESS_OK` with 0 visible orders.
- Verified the remaining Google blocker is local credential configuration, not Shopify: Codex SEO still has no local API key, OAuth token, service-account path, GA4 property ID, or Search Console property configured.
- Prepared the local Google access scaffold: secure config directory, non-secret example file, and `scripts/verify-google-access.mjs` verifier.
- Added a repeatable source-reference recovery queue for active catalog blockers: 208 active products checked, 115 below preferred media standard, 9 below-preferred products missing usable source-reference tags, 5 recoverable IDs needing exact-match confirmation, and 4 exact Alibaba URLs required.
- Refreshed the Agent Command Center so the blocker cards and agent report evidence show today's Google/source recovery state.
- Added order-growth buyer-intent shortcuts to the homepage and collection heroes, then pushed the safe theme update to live theme `189441802424` after Theme Check passed.

## July 28, 2026

- Expanded the live catalog from 118 to 208 active products after Gauss launch-review gating.
- Curated Gifts from 156 products to 56 active gift-intent products.
- Curated New Arrivals from 222 products to 64 active launch-ready products.
- Rebalanced Best Sellers as a 12-product curated launch edit.
- Removed exact duplicate active product titles across 20 duplicate-title groups.
- Polished generic active product titles flagged by Faraday's product SEO audit.
- Revalidated Merchant Center readiness: 208 active products ready with identifier caveat, 0 needing review.
- Revalidated live storefront QA: 208/208 active product pages passed and add-to-cart passed.
- Added featured images to all 13 populated commercial collections and updated homepage category/occasion cards to prefer collection imagery.
- Pushed the homepage collection-image logic to live theme `189441802424` after Theme Check passed with no offenses.
- Upgraded collection-page UX with stronger editorial hero styling, collection metadata, quicklinks, and a commerce reassurance bar above the product grid.
- Revalidated priority collection pages, main menu structure, Merchant readiness, product SEO audit, and full live storefront QA after collection-page changes.
- Improved reusable product-card styling across merchandising surfaces with refined media wells, cleaner hierarchy, tighter mobile spacing, and restrained highlight chips.
- Re-ran Theme Check and full live storefront QA after product-card polish; all 208 active product pages passed and cart add passed.
- Requested Search Console indexing for the homepage and four priority commercial collection URLs; continued requests are waiting on Google reCAPTCHA verification.
- Completed the priority Search Console indexing batch, including the primary gift guide fresh recrawl after correcting the homepage blog URL.
- Synced media alt text for 93 active products and updated product cards to render Shopify media alt text for cleaner image SEO and accessibility.
- Revalidated product SEO, Merchant readiness, source-image queue, Theme Check, and full live storefront QA after media/alt polish.
- Repaired the source/image/catalog mismatch for Alibaba source `1601721496131`: renamed the live product to North & Pearl Personalized Nameplate Necklace, changed product type to Necklace, removed it from Bracelets, added it to Necklaces, refreshed media alt text, and preserved redirects from the old handles.
- Verified GA4 traffic visibility in the `northandpearl` property: GA4 shows low last-7-days traffic, Direct-only acquisition, and 0 realtime users at inspection time.
- Created six populated Faraday buyer-intent collections for organic acquisition and order paths: Personalized Jewelry, Jewelry Gifts for Her, Gifts Under $50, Gifts Under $100, Birthday Jewelry Gifts, and Anniversary Gifts.
- Updated the main menu to expose the new buyer-intent paths under Personalized and Gifts while keeping empty collections out of navigation.
- Added representative collection images across all 19 targeted populated commercial collections after the buyer-intent buildout.
- Refreshed five commercial guide articles so informational traffic has clearer paths into the new buyer-intent product collections.
- Revalidated product SEO and Merchant Center readiness after the buyer-intent collection buildout.
- Updated homepage and collection guide links to route shoppers into the new buyer-intent product grids; Theme Check passed and the update was pushed to live theme `189441802424`.
- Completed the Lead Orchestrator daily ecommerce coordination pass for July 28, 2026, with an 82/100 order-readiness score, no verified P0s, and P1 focus on measurement verification, Search Console indexing, Merchant Center/account setup, operations decisions, and claim-safe source discipline.

## July 27, 2026

- Installed Codex SEO `v1.9.6-codex.5` as Faraday's subordinate SEO toolkit without replacing North & Pearl governance.
- Ran the first Codex SEO baseline audit for `https://northandpearl.com`.
- Added global WebPage JSON-LD schema to improve page-level structured data coverage.
- Documented Faraday baseline, technical audit, ecommerce audit, search opportunities, GSC access state, GEO/AEO audit, drift baseline, and action queue.

## 2026-07-24

- Added permanent cross-functional ecommerce quality rules for North & Pearl.
- Added standards and audit/report scaffolding for product publication, claims, merchandising, personalization, mobile UX, SEO/AEO/GEO, AI brand information, release validation, and remediation governance.
