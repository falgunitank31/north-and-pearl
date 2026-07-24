# Merchant Center Readiness Audit - 2026-07-22

Owner: Faraday + Rawls + Tesla

Scope: active North & Pearl Shopify products and free Google product listing readiness.

## Summary

- Active products audited: 118
- Ready with identifier caveat: 118
- Needs review: 0
- Domain checked for product URLs: `https://northandpearl.com`

## Issue Counts

- identifier-gap: 118

## Interpretation

- `identifier-gap` means barcode/GTIN and SKU are missing. This is common for private-label/resale jewelry, but Google may ask for stronger identifiers or `identifier_exists = no` depending on feed setup.
- Products should not be pushed into Merchant Center with invented GTINs, MPNs, materials, certifications, or supplier facts.
- Shipping, returns, tax, and business identity should be configured directly in Merchant Center/Shopify admin by the owner or through the official Google & YouTube sales channel.

## High-Priority Next Actions

1. Connect or verify the official Google & YouTube Shopify sales channel.
2. Claim and verify `northandpearl.com` in Merchant Center.
3. Configure shipping and return settings in Merchant Center using verified business rules.
4. Decide feed identifier strategy for private-label jewelry: use real supplier/manufacturer identifiers where available; otherwise do not invent GTINs.
5. Review products with `description-thin`, `primary-image-small`, `missing-price`, or `not-available` if they appear in future audits.
6. Keep product titles clear, claim-safe, and aligned with the landing page.

## Agent Handoffs

- Faraday: align product titles/descriptions with commercial search intent without keyword stuffing.
- Gauss: collect supplier identifiers, exact source URLs, stock status, material docs, and product facts.
- Kuhn: review primary product images for Google Shopping visual quality.
- Tesla: keep product schema, landing pages, and feed-related theme output stable.
- Rawls: measure free listing traffic once Merchant Center is active.
- Lovelace: confirm shipping/return policy details before feed submission.
