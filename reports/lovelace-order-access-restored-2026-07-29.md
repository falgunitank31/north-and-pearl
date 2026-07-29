# Lovelace Order Access Restored - 2026-07-29

## Result

Shopify order-read access is now working through the CLI store auth token.

Safe verification query result:

- Status: `ORDER_ACCESS_OK`
- Orders visible: `0`
- Customer PII requested: no
- Payment data requested: no

## What This Unlocks

Lovelace can now monitor recent orders and prepare an order-source table that maps ordered products to:

- product title
- handle
- variant/options
- quantity
- SKU where available
- source tags such as `alibaba-source-*`

## Current Order State

No orders are currently visible from the safe recent-orders query.

## Remaining Order Operations Risk

Order access is restored, but source traceability is still not perfect:

- 17 active products were previously identified with source-risk concerns.
- 9 active products still need stronger source-reference recovery from the latest source-image opportunity audit.

## Next Action

Continue daily Lovelace order-source monitoring. When an order appears, generate a buying table without customer PII and identify the Alibaba source URL/source ID where available.
