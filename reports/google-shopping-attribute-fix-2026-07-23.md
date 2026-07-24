# Google Shopping Attribute Fix

Date: 2026-07-23  
Owner: Lead Orchestrator / Gauss / Tesla  
Store: North & Pearl

## Issue

Merchant Center showed 34 products as `Limited` because they were missing:

- Age group
- Color
- Gender

Merchant Center no longer showed the previous shipping blocker.

## Fix Applied

Added Google Shopping channel metafields in Shopify for active products using the `mm-google-shopping` namespace.

Fields added or normalized:

- `age_group`: `adult`
- `gender`: `female`
- `color`: visible feed-safe color such as `Gold`, `Gold, Clear`, `Gold, White`, or `Gold, Multicolor`
- `condition`: `new`
- `custom_product`: `true`
- `google_product_category`: `188`

No unsupported product/material claims were added.

## Products Updated

The retryable update completed on the 34 products currently visible in Merchant Center.

## Verification

Sampled active product metafields after the update and confirmed the new Google Shopping values are present, including:

- North & Pearl Iridescent Pendant Necklace
- North & Pearl Initial Shell Necklace
- North & Pearl Heart Keepsake Necklace
- North & Pearl Flower Nail Bangle
- North & Pearl Color Accent Cuff

## Notes

- Merchant Center may need time to reprocess the feed before warnings clear.
- The count mismatch was investigated after the first attribute update.
- Root cause: 36 active Shopify products were not published to the `Google & YouTube` publication.
- Those 36 products were published to `Google & YouTube`.
- Follow-up verification confirmed all 70 active products are now published to `Google & YouTube` and have `age_group`, `color`, and `gender` metafields.

## Follow-Up Verification

Shopify-side status after fixes:

- Active North & Pearl products: 70.
- Active products published to Google & YouTube: 70.
- Active products with Google age group: 70.
- Active products with Google color: 70.
- Active products with Google gender: 70.

Merchant Center may still show 34 temporarily until the Google & YouTube channel syncs and Merchant Center reprocesses the new product publication state.
