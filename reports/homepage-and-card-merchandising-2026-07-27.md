# Homepage And Card Merchandising Update

Date: 2026-07-27

## Completed

- Agents involved: Lead Orchestrator, Kuhn, Gauss, Faraday, Tesla.
- Curated Gifts collection from 154 products to 56 active gift-intent products.
- Expanded Best Sellers from 5 products to 12 curated launch products.
- Updated homepage wording from unverified best-seller language to safer curated merchandising language.
- Improved collection/homepage product-card image presentation by removing excess image padding and using a tighter commerce crop.

## Validation

- Theme Check: 190 files inspected, 0 offenses.
- Live homepage: 200 response, one H1, updated `Featured edit`, `Strong pieces to shop first.`, and `Shop Featured Jewelry` copy visible.
- Live Gifts collection: 200 response, one H1, product cards render.
- Live Best Sellers collection: 200 response, one H1.
- Live PDP sample: 200 response, one H1, no Liquid error detected.

## Risk

- Product-card images now crop more tightly on collection/homepage grids. PDP gallery images remain uncropped for product accuracy.
- Some active products remain `ACCEPTABLE_TEMP` because their exact source images are below the preferred 900px threshold.

## Rollback

- Revert `assets/north-pearl.css` for product-card image crop behavior.
- Remove newly added products from `best-sellers` or restore the previous five-product collection membership.
- Re-add products listed in `reports/gifts-merchandising-curation-2026-07-27.md` if the Gifts collection needs to return to the prior broad state.
