# Lovelace Daily Order Source Monitor - 2026-07-29

Owner: Lovelace  
Automation: North & Pearl Lovelace Daily Order Source Monitor  
Run time: 2026-07-29 12:34:05 CDT  
Scope: Shopify order access check, active product source-map readiness, operational safety checks.  
PII rule: no customer names, emails, phone numbers, addresses, payment details, or notes were requested or recorded.

## Executive Status

Order visibility is blocked. Shopify authentication is available through `npx @shopify/cli@latest store execute`, and product records are readable, but the current app/user token does not have order scope. A safe recent-orders GraphQL query that requested only order name, timestamps, fulfillment status, product titles, variant/options, quantities, SKUs, handles, and tags failed with:

`Access denied for orders field.`

Because orders are not visible, no order-specific Alibaba buying table can be produced today. Source-map readiness work continued against the active product catalog.

## Shopify Access Check

| Area | Result | Operational Meaning | Next Action |
|---|---|---|---|
| Product catalog read | Available | Active product titles, handles, tags, variants, and metafields can be checked. | Continue source-map readiness checks. |
| Order read | Blocked | New orders cannot be identified from this environment. | Owner/Tesla must re-authorize Shopify Admin access with a scope that permits safe order reads, such as `read_orders`, if the owner approves. |
| Order PII handling | Safe | No customer PII was returned or stored. | Keep future order queries limited to order reference and line-item data only. |
| Alibaba page extraction | Blocked from automation | Prior Gauss/Curie check found Alibaba product pages returning protection/verification pages, not usable product media/source details. | Use owner-saved URLs, manual rendered Alibaba access, or supplier-approved assets for exact recovery. |

## Source-Order Action Table

No visible orders were available in this run.

| Order Ref | Product | Quantity | Variant/Options | SKU/Handle | Alibaba URL/Source ID | Confidence | Missing Info | Owner Action Needed |
|---|---|---:|---|---|---|---|---|---|
| Not available | Orders blocked by Shopify scope | 0 | Not available | Not available | Not available | None | `read_orders` access is blocked. | Re-authorize safe order-read access before Lovelace can map ordered items. |

## Active Catalog Source-Map Readiness

Checked 208 active Shopify products through the accessible product API.

| Metric | Count | Notes |
|---|---:|---|
| Active products checked | 208 | Product data read succeeded. |
| Active products with exactly one `alibaba-source-*` tag | 191 | These have a source ID usable as the first fulfillment trace key. |
| Active products with no `alibaba-source-*` tag | 17 | These become order-risk items if purchased before source recovery/tagging. |
| Active products with multiple source tags | 0 | No conflicting source IDs found in tags. |
| Source metafields found | 0 | Source traceability currently depends on tags and repo reports/scripts, not metafields. |

## Active Products Missing Shopify Source Tags

These products are active and single-variant with no SKU. If any appears in an order, the owner should not promise fulfillment until the source is recovered or manually confirmed.

| Product | Handle | Variant/Options | Source Status | Confidence | Missing Info | Owner/Gauss/Curie Action |
|---|---|---|---|---|---|---|
| North & Pearl Iridescent Pendant Necklace | `north-pearl-iridescent-pendant-necklace` | Default Title | Partial source image record only; prior handle `north-pearl-opal-pendant-necklace` has verified Alibaba CDN image, no durable product ID. | Low | Exact Alibaba product URL/source ID. | Recover exact listing or replace with verified source candidate before order fulfillment. |
| North & Pearl Initial Shell Necklace | `north-pearl-initial-shell-necklace` | Default Title | Launch script record exists, but no durable Alibaba source ID found in tags/metafields/reports. | Low | Exact Alibaba product URL/source ID and current source availability. | Gauss/Curie source recovery required before fulfillment. |
| North & Pearl Heart Keepsake Necklace | `north-pearl-heart-keepsake-necklace` | Default Title | Launch script record exists, but no durable Alibaba source ID found in tags/metafields/reports. | Low | Exact Alibaba product URL/source ID and current source availability. | Gauss/Curie source recovery required before fulfillment. |
| North & Pearl Flower Nail Bangle | `north-pearl-flower-nail-bangle` | Default Title | Recoverable from `scripts/add-alibaba-search-products.mjs`: source ID `1601234622131`. Missing Shopify source tag. | Medium | Confirm source page still matches item and add source tag/metafield. | Add `alibaba-source-1601234622131` after confirmation. |
| North & Pearl Color Accent Cuff | `north-pearl-color-accent-cuff` | Default Title | Prior handle `north-pearl-crystal-gemstone-cuff`; launch script record exists, but no durable Alibaba source ID found. | Low | Exact Alibaba product URL/source ID. | Recover exact listing; keep material/stone claims conservative. |
| North & Pearl Sparkle Accent Bracelet | `north-pearl-sparkle-accent-bracelet` | Default Title | Prior handle `north-pearl-zircon-bracelet`; launch script record exists, but no durable Alibaba source ID found. | Low | Exact Alibaba product URL/source ID. | Recover exact listing; avoid zircon/material claims unless documented. |
| North & Pearl Bridal Water Drop Set | `north-pearl-bridal-water-drop-set` | Default Title | Launch script record exists, but no durable Alibaba source ID found in tags/metafields/reports. | Low | Exact Alibaba product URL/source ID and set component verification. | Gauss/Curie source recovery required before fulfillment. |
| North & Pearl Hollow Flower Bangle Set | `north-pearl-hollow-flower-bangle-set` | Default Title | Recoverable from `scripts/add-alibaba-search-products.mjs`: source ID `1601599046429`. Missing Shopify source tag. | Medium | Confirm source page still matches item and add source tag/metafield. | Add `alibaba-source-1601599046429` after confirmation. |
| North & Pearl Sparkle Pulse Bracelet | `north-pearl-sparkle-pulse-bracelet` | Default Title | Prior handle `north-pearl-crystal-pulse-bracelet`; recoverable source ID `1601403752183`. Missing Shopify source tag. | Medium | Confirm source page still matches renamed item and add source tag/metafield. | Add `alibaba-source-1601403752183` after confirmation. |
| North & Pearl Mixed Charm Bangle | `north-pearl-mixed-charm-bangle` | Default Title | Recoverable from `scripts/add-alibaba-search-products.mjs`: source ID `1601120166205`. Missing Shopify source tag. | Medium | Confirm source page still matches item and add source tag/metafield. | Add `alibaba-source-1601120166205` after confirmation. |
| North & Pearl Pink Heart Bow Bracelet | `north-pearl-pink-heart-bow-bracelet` | Default Title | Recoverable from `scripts/add-alibaba-search-products.mjs`: source ID `1601426024495`. Missing Shopify source tag. | Medium | Confirm source page still matches item and add source tag/metafield. | Add `alibaba-source-1601426024495` after confirmation. |
| North & Pearl Dainty Flower Necklace | `north-pearl-dainty-flower-necklace` | Default Title | Recoverable from `scripts/add-alibaba-search-products.mjs`: source ID `1601469797456`. Missing Shopify source tag. | Medium | Confirm source page still matches item and add source tag/metafield. | Add `alibaba-source-1601469797456` after confirmation. |
| North & Pearl Clover Charm Bracelet | `north-pearl-clover-charm-bracelet` | Default Title | Recoverable from `scripts/add-alibaba-search-products.mjs`: source ID `1601536342028`. Missing Shopify source tag. | Medium | Confirm source page still matches item and add source tag/metafield. | Add `alibaba-source-1601536342028` after confirmation. |
| North & Pearl Twine Band Ring | `north-pearl-twine-band-ring` | Default Title | Recoverable from `scripts/add-alibaba-search-products.mjs`: source ID `1601427206777`. Missing Shopify source tag. | Medium | Confirm source page still matches item and add source tag/metafield. | Add `alibaba-source-1601427206777` after confirmation. |
| North & Pearl Warm Bead Stretch Bracelet | `north-pearl-warm-bead-stretch-bracelet` | Default Title | Prior handle `north-pearl-gold-bead-stretch-bracelet`; recoverable source ID `1601310111350`. Missing Shopify source tag. | Medium | Confirm source page still matches renamed item and add source tag/metafield. | Add `alibaba-source-1601310111350` after confirmation. |
| North & Pearl Chunky Bead Bracelet | `north-pearl-chunky-bead-bracelet` | Default Title | Prior handle `north-pearl-chunky-pearl-bracelet`; recoverable source ID `1601647883963`. Missing Shopify source tag. | Medium | Confirm source page still matches renamed item and add source tag/metafield. | Add `alibaba-source-1601647883963` after confirmation. |
| North & Pearl V Water Drop Jewelry Set | `north-pearl-v-water-drop-jewelry-set` | Default Title | Recoverable from `scripts/add-alibaba-search-products.mjs`: source ID `1600828902618`. Missing Shopify source tag. | Medium | Confirm source page still matches set components and add source tag/metafield. | Add `alibaba-source-1600828902618` after confirmation. |

## Operational Safety Check

Current operations language remains conservative and operationally safe:

- Shipping SOP uses verified Merchant Center account-level guidance only: free U.S. shipping, 3-7 business days handling, 5-10 business days transit, 8-17 business days displayed estimate.
- Returns SOP remains draft and avoids final legal promises; personalized/custom products are treated cautiously.
- Customer support macros avoid material, allergy, waterproof, tarnish-free, durability, and delivery overpromises.
- Fulfillment SOP remains draft and correctly depends on source, supplier, QC, packaging, and exception workflow confirmation.

Do not strengthen shipping, returns, material, warranty, or fulfillment language from today's evidence.

## Risks

| Risk | Severity | Why It Matters | Control |
|---|---|---|---|
| No order access | High | Lovelace cannot identify purchased products or build an order-specific buying table. | Owner/Tesla re-authorizes safe order-read scope. |
| 17 active products missing source tags | High | An order for these products could require manual recovery before purchase from source. | Gauss/Curie confirm exact source, then add source tag/metafield. |
| Alibaba automation blocked by protection pages | Medium | Source URLs/media cannot be verified through current automated requests. | Use manual browser rendering, owner-saved source URLs, or supplier-approved assets. |
| No SKUs on active products | Medium | Orders would map by handle/title and variant only, increasing traceability risk. | Add stable SKU/source conventions after source IDs are confirmed. |
| Source traceability stored mostly in tags | Medium | Tags are usable but less robust than structured metafields. | Add source metafields for source ID, URL, supplier/title, image URL, and verification date. |

## Next Actions

1. Owner/Tesla: approve and restore safe `read_orders` access if daily order-source monitoring should identify new orders.
2. Gauss/Curie: recover exact source IDs/URLs for the 6 low-confidence active products with no durable source ID: Iridescent Pendant Necklace, Initial Shell Necklace, Heart Keepsake Necklace, Color Accent Cuff, Sparkle Accent Bracelet, and Bridal Water Drop Set.
3. Gauss/Curie: manually confirm the 11 medium-confidence recoverable source IDs still match the current Shopify product images and item type.
4. Tesla/Gauss: after confirmation, write durable source traceability to Shopify tags and preferably product metafields.
5. Lovelace: when order access is restored, rerun this monitor and produce the order-specific source-buying table without PII.

