# North & Pearl Commercial Guardrails

Owner: Pareto with Lead Orchestrator, Gauss, Curie, Lovelace, Rawls, Kuhn, Tesla, and Faraday.

## Current Status

- Data confidence: LOW. North & Pearl has very limited verified traffic and no visible order history in the project records.
- Active products: 208.
- Purchasability: 208/208 active products have at least one Shopify Admin API `availableForSale` variant as of 2026-07-31.
- Unit cost data: not available in sampled Shopify variants as of 2026-07-31.
- Discount API access: blocked by missing `read_discounts` scope as of 2026-07-31.
- Verified gross margin: unknown.
- Offer launch status: BLOCKED_FOR_COST_DATA.

## Offer Launch Gate

No bundle, discount, gift-with-purchase, free-shipping threshold, automatic discount, price-reduction campaign, or savings message may launch until Pareto, Gauss, Curie, Lovelace, Rawls, and the Lead Orchestrator can verify the economics.

Every proposed offer must include the following fields before launch:

| Field | Required Status |
| --- | --- |
| Product selling price | VERIFIED |
| Supplier unit product cost | VERIFIED or SUPPLIER CLAIM with source link |
| Personalization cost, when applicable | VERIFIED or SUPPLIER CLAIM with source link |
| Packaging or gift-box cost | VERIFIED or SUPPLIER CLAIM with source link |
| Freight allocation per unit | VERIFIED or documented ESTIMATE |
| Duty/import allowance | VERIFIED or documented ESTIMATE |
| Payment-processing allowance | VERIFIED or documented ESTIMATE |
| Return/defect allowance | VERIFIED or documented ESTIMATE |
| Inspection/quality-control allowance | VERIFIED or documented ESTIMATE |
| Minimum acceptable contribution margin | VERIFIED owner/business rule |
| Eligible products and exclusions | VERIFIED |
| Operational fulfillment impact | VERIFIED by Lovelace |

Allowed status labels are VERIFIED, SUPPLIER CLAIM, ESTIMATE, INFERENCE, and UNKNOWN. Any required field marked UNKNOWN blocks the offer.

## Current Offer Decision

- Bundle pricing: BLOCKED_FOR_COST_DATA.
- Percentage or dollar-off discounts: BLOCKED_FOR_COST_DATA.
- Free-shipping threshold changes: BLOCKED_FOR_COST_DATA and blocked by shipping-cost confirmation.
- Gift-with-purchase: BLOCKED_FOR_COST_DATA and blocked by product/packaging/fulfillment confirmation.
- Compare-at or savings-driven campaign messaging: BLOCKED until pricing policy and margin rules are verified.
- Non-discount merchandising paths: ALLOWED when product facts and claims remain accurate.
- Cross-sell and gift-edit presentation without a price incentive: ALLOWED when products are active, purchasable, and accurately represented.

## Allowed Without Additional Owner Approval

- Improve product discovery.
- Improve gift and personalized shopping paths.
- Improve collection merchandising.
- Improve safe product positioning.
- Improve cart recovery links and non-discount checkout confidence.
- Create bundle concepts without launching discounts.
- Create tracked campaign links and measurement plans.
- Remove or correct misleading offer language.

## Blocked Until Cost/Margin Data Exists

- Percentage discounts.
- Dollar-off discounts.
- Buy-more-save-more incentives.
- Gift-with-purchase offers.
- Free shipping threshold changes.
- Permanent price reductions.
- Bundle pricing.
- Any promotion that changes contribution margin.

## Minimum Data Needed Before Promotion Launch

- Product selling price.
- Verified product cost.
- Personalization cost when applicable.
- Packaging cost.
- Freight allocation per unit.
- Duty/import allowance.
- Inspection or quality-control allowance.
- Payment-processing allowance.
- Shipping subsidy or cost.
- Expected return/refund allowance.
- Supplier lead time and availability.
- Minimum acceptable contribution margin.

## Current Commercial Position

North & Pearl should grow orders first through clear gift paths, stronger product discovery, buyer-intent collections, and trust-building product pages, not aggressive discounting.
