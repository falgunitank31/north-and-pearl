# Return Policy Implementation - 2026-08-08

## Summary

Added a customer-facing return/refund policy to Shopify's native `REFUND_POLICY` legal policy and aligned the public `Returns & Exchanges` page.

## Policy Direction Used

- Personalized, engraved, custom-name, initial, birthstone, and made-to-order pieces are final sale unless damaged, defective, or incorrect.
- Standard, non-personalized items may be eligible for return within 14 days of delivery when unused, unworn, undamaged, and returned with original packaging.
- Customers must contact support before sending items back.
- Damaged, defective, or incorrect items should be reported within 7 days of delivery with order number and photos.
- Gift cards are non-returnable.
- Return shipping is customer-paid unless the item arrived damaged, defective, or incorrect.
- Approved refunds return to the original payment method after receipt and inspection.

## Shopify Surfaces Updated

- Native Shopify legal policy: `REFUND_POLICY`
- Public page: `/pages/returns-exchanges`
- Theme template section: `templates/page.returns-exchanges.json`

## Files Changed

- `scripts/apply-return-policy.mjs`
- `templates/page.returns-exchanges.json`
- `reports/return-policy-implementation-2026-08-08.md`

## Validation

- Confirmed Shopify Admin API reports `REFUND_POLICY` updated at `2026-08-08T15:41:35Z`.
- Confirmed live `/policies/refund-policy` renders the updated Return Policy headings and 14-day standard item wording.
- Confirmed live `/pages/returns-exchanges` renders the aligned Returns & Exchanges copy.
- Ran `shopify theme check`: 281 files inspected with no offenses found.

## Notes

This is a conservative launch policy based on existing project guidance. It should still be reviewed by the owner/legal advisor before being treated as final legal language.
