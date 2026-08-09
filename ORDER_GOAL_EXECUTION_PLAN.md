# North & Pearl Order Goal Execution Plan
**Integrated Strategic + Tactical Plan**  
**Owner:** Lead Orchestrator + Full Agent Team  
**Active:** Aug 10-Sept 7, 2026

---

## Executive Command

**Mission:** Hit 300 qualified visitors + 1 order by Aug 15 (7-day goal), then scale to 1,500 visitors + 10 orders by Sept 7 (30-day goal).

**Operating Principle:** Distribution drives traffic. Traffic drives data. Data drives optimization. We optimize only what's failing.

**Autonomy:** Claude Code has full authority to deploy website changes, run analyses, and optimize based on GA4/GSC data. No approval needed for safe, reversible, data-driven changes.

---

## Phase 1: Aug 10-15 (7-Day First-Order Push)

### Daily Targets
| Day | Visitors | Product Views | Add-to-Carts | Checkouts | Orders |
|-----|----------|---------------|--------------|-----------|--------|
| Aug 10 | 50 | 5 | 1 | 0 | 0 |
| Aug 11 | 50 | 5 | 1 | 0 | 0 |
| Aug 12 | 45 | 5 | 1 | 0 | 0 |
| Aug 13 | 40 | 5 | 1 | 0 | 0 |
| Aug 14 | 40 | 5 | 1 | 0 | 0 |
| Aug 15 | 35 | 5 | 1 | 1 | 1 |
| **Total** | **300** | **30** | **5** | **1** | **1** |

### Critical Success Factors

**1. GA4 Tracking** (DEPLOYED Aug 9)
- ✅ `select_item` (product clicks) now fires
- ✅ `view_item` (PDP views) now fires
- ✅ `add_to_cart` tracked
- ✅ `begin_checkout` tracked
- **Verification:** Aug 10 daily check should show select_item > 0

**2. Distribution Execution** (Faraday + Pareto)
- Warm audience DMs with tracked UTM links
- Organic social posts (1-2 per day)
- Tracked campaign: `order_growth_august_2026`
- No paid ads; qualified warm traffic only

**3. Funnel Health** (Claude Code monitors)
- If sessions arrive but product views = 0 → Fix product-link CTAs immediately
- If product views arrive but carts = 0 → Improve PDP urgency/trust signals
- If carts arrive but checkouts = 0 → Reduce friction in cart/checkout

**4. Website Readiness** (Already done)
- ✅ Storefront technical: Theme Check passing, 208 products available
- ✅ Merchandising: Homepage buyer-intent routes, collection fast-shopping paths
- ✅ Trust: Return policy live, PDP review surface, FAQ sections
- ✅ Performance: Product images optimized, LCP fixed

### Daily Execution Block

Every morning at same time:

1. **Run daily order-goal check** (automated)
   - GA4 funnel metrics
   - Search Console status
   - Shopify order monitor
   - Theme Check
   - Pace report

2. **Analyze gaps** (Claude Code)
   - Sessions vs. target: on pace?
   - Product views: are links getting clicked?
   - Add-to-carts: is PDP converting?
   - Checkouts: is cart working?

3. **Deploy fixes if needed** (Claude Code with Shopify CLI)
   - Homepage CTA clarity
   - Collection product-link prominence
   - PDP urgency/trust signals
   - Cart friction points
   - **Only if data shows it's needed**

4. **Update targets** (Lead Orchestrator)
   - Document day's results
   - Adjust next day targets if pace broken
   - Flag blockers to team

---

## Phase 2: Aug 15-22 (Scale Phase)

### Decision Point (Aug 15)

**If 7-day goal WAS hit (300 visitors, 1 order):**
- ✅ Distribution worked → Scale those channels 2x
- ✅ Funnel worked → Optimize for 1,500 visitors pace (50/day)
- ✅ Trust signals worked → Consider light content tweaks

**If 7-day goal MISSED:**
- 🔍 Why: traffic source issue? Link CTAs? PDP conversion? Checkout friction?
- 🔧 Fix the broken piece
- 📈 Adjust Aug 15-22 targets accordingly

### Content Optimization (IF needed)

Only deploy if GA4 data shows it's needed:

**Priority 1 (High impact):**
- Birthstone Jewelry: add month/gift guidance (currently 873 words, weakest)
- Jewelry Gifts for Her: strengthen gift-intent copy
- Collection hero CTAs: make product grids more prominent

**Priority 2 (Medium impact):**
- Product page internal links: add 3-5 related-product links to high-traffic pages
- FAQ sections: add 3-5 common objections per collection
- Mobile sticky CTA: ensure add-to-cart button always visible

**Priority 3 (Lower impact):**
- Homepage featured rail: highlight highest-converting products
- Collection copy depth: expand if pages getting traffic but high bounce
- Blog/guide updates: only if supporting commercial pages

---

## Phase 3: Aug 22-Sept 7 (30-Day Sprint)

### Target Pace
- **50.6 visitors/day** to hit 1,500 by Sept 7
- **6.9 product views/day** (based on current 20% click-through rate)
- **1 order every 3-4 days** to hit 10 total

### Optimization Loop

Each week:
1. Analyze GA4: which pages/products convert best?
2. Double down: increase internal links to high-performers
3. Fix underperformers: analyze why they're not converting
4. Redistribute: feature converting products more prominently
5. Measure: track order value, customer demographics, retention signals

---

## Measurement Dashboard

### Daily Metrics (from GA4 + GSC + Shopify)
- Sessions (target: 50/day)
- Product views (target: 5/day)
- Add-to-carts (target: 1/day)
- Checkouts started (target: 1 every 2 days)
- Orders (target: 1 every 7 days initially)
- Search Console impressions (monitor: should rise as pages index)
- Mobile vs desktop conversion
- Top performing product pages
- Top performing collection pages
- Bounce rate by landing page

### Weekly Reviews

**Wednesdays (Aug 13, 20, 27, Sept 3):**
- Pace check: on track or adjusted?
- Funnel analysis: where are we losing visitors?
- Traffic source performance: DM vs social vs organic?
- Top products: which are converting?
- Bottom products: why aren't they converting?
- Deployment needed: yes or no?

---

## Rules of Engagement

### Claude Code Authority ✅
Deploy immediately (no approval) if:
- GA4 data shows a clear issue
- Shopify QA shows a broken functionality
- Mobile UX regression detected
- Search Console shows indexing blocker
- Performance regression in Core Web Vitals

### Approval Needed ⏸️
**Blocked until cost/margin verified:**
- Discounts, bundles, free-shipping thresholds
- Gift-with-purchase offers
- Promotional pricing

**Blocked until owner review:**
- New product claims (materials, durability, etc.)
- Removal of products from catalog
- Major homepage restructuring
- Policy/legal language changes

### Not Changing ⛔
- Product prices (set by owner)
- Product images (use as-is until better ones available)
- Product descriptions (enriched Aug 5; only tweak for conversion, not accuracy)
- Brand voice (Kuhn owns)

---

## Success Criteria

### Aug 15 (7-day checkpoint)
- ✅ 300+ visitors recorded in GA4
- ✅ 1+ order completed in Shopify
- ✅ GA4 tracking verified working (select_item > 0)
- ✅ Funnel health confirmed (know where drop-off is)

### Sept 7 (30-day finish line)
- ✅ 1,500+ visitors total
- ✅ 10+ orders confirmed
- ✅ AOV known and tracked
- ✅ Repeat customer rate measured
- ✅ Next month's traffic strategy planned

---

## Contingency

**If traffic doesn't arrive (after 48 hours of distribution):**
- Verify distribution actually running (DMs sent? posts published?)
- Check GA4 tracking is firing (events showing?)
- Review traffic source (warm audience vs organic?)
- Adjust copy/offer if landing page CTR is 0%
- Consider paid ads as backup (requires owner approval)

**If product views arrive but carts = 0:**
- PDP trust issues: add social proof, ratings, FAQs
- Price perception: check compare-at pricing, competitor prices
- Product clarity: improve images, variants, sizing guidance
- Urgency: add scarcity signals if ethically justified

**If carts exist but checkouts = 0:**
- Guest checkout option verification
- Mobile checkout flow review
- Cart abandonment email setup consideration
- Shipping cost transparency

---

## Timeline

| Date | Phase | Focus | Owner |
|------|-------|-------|-------|
| Aug 10 | P1 Start | Verify GA4, execute distribution | Faraday + Claude |
| Aug 13 | P1 Mid | Analyze pace, deploy fixes if needed | Claude + Team |
| Aug 15 | P1 End | Decision point: scale or pivot? | Lead Orchestrator |
| Aug 20 | P2 Mid | Optimize based on performance data | Claude + Kuhn |
| Aug 22 | P2→P3 | Scale to 1,500 visitor pace | Faraday |
| Sept 7 | P3 End | Hit 10 orders, analyze results | Team |

---

## Who Does What

**Faraday (Organic Growth):**
- Execute distribution plan (DMs, social, warm audience)
- Monitor GA4 organic/campaign attribution
- Scale winning traffic channels

**Pareto (Sales/Conversion):**
- Monitor funnel: sessions → carts → orders
- Analyze checkout friction
- Recommend UX improvements

**Kuhn (Design/UX):**
- Visual QA for mobile and desktop
- Review CTA clarity, product link prominence
- PDP trust signal optimization

**Tesla (Implementation):**
- Deploy website changes via CLI
- Mobile/desktop testing
- Performance verification

**Rawls (Analytics):**
- Daily GA4/GSC monitoring
- Funnel reporting
- Pace tracking against targets

**Claude Code (Orchestration):**
- Daily monitoring and reporting
- Deploy data-driven improvements
- Coordinate across team
- Stay focused on order goals

---

**EXECUTION STARTS NOW. Aug 10 daily check will reveal current status.**
