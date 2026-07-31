# North & Pearl Sales Experiments

Owner: Pareto with Rawls.

## Active Experiments

### 2026-07-31 - Personalized Routing Correction

- Problem: Homepage “Shop Personalized Jewelry” intent routed to Name Necklaces rather than the broader Personalized Jewelry collection.
- Evidence: `personalized-jewelry` has 72 products and matches the CTA intent more broadly than `name-necklaces`.
- Hypothesis: Routing personalized-intent shoppers to the broader collection will increase collection depth, product views, and add-to-cart opportunities.
- Change: Updated homepage secondary CTA and Personalized category card to use `personalized-jewelry`.
- Primary metric: Personalized Jewelry collection views.
- Secondary metrics: product clicks from collection, add-to-cart events, orders.
- Start date: 2026-07-31.
- Evaluation date: 2026-08-07, subject to traffic volume.
- Data confidence: LOW until meaningful traffic exists.

### 2026-07-31 - Empty Cart Recovery Paths

- Problem: Empty cart recovery sent shoppers to generic browsing.
- Hypothesis: Gift and budget-based recovery links will better match high-intent shoppers and recover more product discovery.
- Change: Cart drawer empty state now routes to Gifts for Her, Gifts Under $100, and Personalized Jewelry.
- Primary metric: clicks from empty cart recovery.
- Secondary metrics: collection views, product views, add-to-cart.
- Start date: 2026-07-31.
- Evaluation date: 2026-08-07, subject to traffic volume.
- Data confidence: LOW until meaningful traffic exists.
