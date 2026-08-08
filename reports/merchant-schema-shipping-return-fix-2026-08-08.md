# Merchant Schema Shipping + Return Fix - 2026-08-08

## Issue

Google Search Console / rich-result inspection showed Merchant listings warnings on product pages:

- Missing field `deliveryTime`
- Invalid enum value in field `returnPolicyCategory`

Product snippet warnings for missing `review` and `aggregateRating` remain intentionally unresolved because North & Pearl does not yet have verified review/rating data.

## Changes Made

File changed:

- `sections/main-product.liquid`

Product `Offer` JSON-LD now includes:

- `shippingDetails.deliveryTime`
  - `handlingTime`: 0-14 days
  - `transitTime`: 2-14 days
  - Conservative broad ranges were used because the live shipping policy says timelines vary by product, carrier, destination, and personalization requirements.
- `hasMerchantReturnPolicy.returnPolicyCategory`
  - Changed from invalid/unsupported `https://schema.org/MerchantReturnUnspecified`
  - Changed to `https://schema.org/MerchantReturnFiniteReturnWindow`
- `merchantReturnDays`: 14
- `returnMethod`: `https://schema.org/ReturnByMail`
- `returnFees`: `https://schema.org/ReturnShippingFees`

## Policy Alignment

The return policy page states:

- Standard, non-personalized items may be eligible for return within 14 days of delivery when unused, unworn, undamaged, and returned with original packaging.
- Personalized, engraved, custom-name, initial, birthstone, and made-to-order pieces are final sale unless they arrive damaged, defective, or incorrect.
- Customers should contact support before sending anything back.

The schema links to:

- `https://northandpearl.com/pages/shipping-policy`
- `https://northandpearl.com/pages/returns-exchanges`

## Validation

- Theme Check: passed.
  - 284 files inspected.
  - 0 offenses found.
- Live JSON-LD validation:
  - `https://northandpearl.com/products/north-pearl-heart-keepsake-necklace`
  - `https://northandpearl.com/products/north-pearl-initial-shell-necklace`
  - Both rendered `deliveryTime` and corrected `returnPolicyCategory`.
- GSC URL Inspection still shows the previous warning on Heart Keepsake Necklace because the last Google crawl timestamp predates the deployed fix.

## Follow-Up

- Use Google Search Console's `Validate fix` for the Merchant listing issue.
- Do not add `review` or `aggregateRating` schema until real verified review data exists.
