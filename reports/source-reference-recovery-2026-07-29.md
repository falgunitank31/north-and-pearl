# Source Reference Recovery Queue - 2026-07-29

Owner: Gauss + Curie + Lovelace  
Purpose: identify active products that need stronger Alibaba/source traceability before source-image upgrades or order fulfillment.

## Summary

- Active products checked: 208
- Active products below preferred media standard: 115
- Below-preferred products missing usable source-reference tags: 9
- Missing-source products with a recoverable repo source ID: 5
- Missing-source products requiring exact Alibaba URL/source recovery: 4
- Active products missing any source-reference tag: 17

## Decision

Do not add source tags or replace product media until the exact same Alibaba listing or supplier asset is confirmed against the visible Shopify product. This prevents a customer order from being mapped to the wrong supplier item.

## Recoverable Source IDs - Confirm Before Tagging

| Product | Handle | Media | Recovered Source ID | Required Check |
|---|---|---|---|---|
| North & Pearl Flower Nail Bangle | `north-pearl-flower-nail-bangle` | ACCEPTABLE_TEMP, 6 images, 800x800 min | `1601234622131` | Confirm current listing image, title/type, available variants, sample availability, and shipping. |
| North & Pearl Sparkle Pulse Bracelet | `north-pearl-sparkle-pulse-bracelet` | ACCEPTABLE_TEMP, 6 images, 800x800 min | `1601403752183` | Confirm current listing image, title/type, available variants, sample availability, and shipping. |
| North & Pearl Mixed Charm Bangle | `north-pearl-mixed-charm-bangle` | ACCEPTABLE_TEMP, 6 images, 800x800 min | `1601120166205` | Confirm current listing image, title/type, available variants, sample availability, and shipping. |
| North & Pearl Dainty Flower Necklace | `north-pearl-dainty-flower-necklace` | ACCEPTABLE_TEMP, 6 images, 800x800 min | `1601469797456` | Confirm current listing image, title/type, available variants, sample availability, and shipping. |
| North & Pearl V Water Drop Jewelry Set | `north-pearl-v-water-drop-jewelry-set` | ACCEPTABLE_TEMP, 6 images, 800x800 min | `1600828902618` | Confirm current listing image, title/type, available variants, sample availability, and shipping. |

## Exact Source URL Required

| Product | Handle | Media | Current Action |
|---|---|---|---|
| North & Pearl Iridescent Pendant Necklace | `north-pearl-iridescent-pendant-necklace` | ACCEPTABLE_TEMP, 3 images, 1000x1000 min | Recover exact Alibaba URL/source ID or replace with a verified sourced product before fulfillment. |
| North & Pearl Initial Shell Necklace | `north-pearl-initial-shell-necklace` | ACCEPTABLE_TEMP, 6 images, 800x800 min | Recover exact Alibaba URL/source ID or replace with a verified sourced product before fulfillment. |
| North & Pearl Sparkle Accent Bracelet | `north-pearl-sparkle-accent-bracelet` | ACCEPTABLE_TEMP, 6 images, 800x800 min | Recover exact Alibaba URL/source ID or replace with a verified sourced product before fulfillment. |
| North & Pearl Bridal Water Drop Set | `north-pearl-bridal-water-drop-set` | ACCEPTABLE_TEMP, 6 images, 800x800 min | Recover exact Alibaba URL/source ID or replace with a verified sourced product before fulfillment. |

## Agent Actions

- Gauss: prioritize the products in this queue before adding more active products with weak traceability.
- Curie: verify exact supplier/listing match and classify source evidence as VERIFIED, SUPPLIER CLAIM, ESTIMATE, INFERENCE, or UNKNOWN.
- Kuhn: only approve image upgrades that show the same product accurately; do not improve images in ways that change size, finish, chain thickness, stone color, or included components.
- Lovelace: when orders appear, use confirmed source tags/URLs only for buying instructions.
- Tesla: write source tags/metafields only after Gauss/Curie confirmation.
