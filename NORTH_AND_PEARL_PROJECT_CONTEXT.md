# North & Pearl Project Context

Last updated: 2026-08-08  
Purpose: durable project intelligence handoff for ChatGPT Work and Codex.

This file is the primary handoff document for the North & Pearl project. It summarizes the business, operating system, Shopify implementation, agent responsibilities, marketing/SEO status, analytics, risks, and next work. It was created as documentation only. It does not contain passwords, API keys, OAuth tokens, Shopify secrets, private credentials, cookies, payment information, customer data, or supplier commitments.

## 1. Executive Project Summary

### Confirmed Facts

North & Pearl is a premium DTC jewelry ecommerce brand on Shopify.

Primary domain:

- `https://northandpearl.com`

Shopify store:

- `https://north-and-pearl.myshopify.com`

Business model:

- Direct-to-consumer ecommerce.
- Premium but accessible jewelry.
- Personalized, giftable, and emotionally meaningful jewelry.
- Initial product sourcing and product intelligence are based primarily on Alibaba supplier listings and owner-provided source references.
- Products are being prepared for Shopify resale with private-brand positioning as North & Pearl.

Core positioning:

- Premium personalized and giftable jewelry for meaningful life moments.
- Brand promise: `Crafted for Life's Meaningful Moments.`
- Canonical brand description used for AI/search consistency: `North & Pearl is a premium online jewelry brand offering elegant, meaningful, and giftable jewelry for life's important moments.`

Target customers:

- Women ages 22-45.
- Gift buyers.
- Men buying gifts for partners.
- Mothers.
- Bridesmaids.
- Couples.
- Birthday, anniversary, wedding, and Mother's Day shoppers.
- Corporate gifting buyers as a later opportunity.

Primary product categories:

- Personalized jewelry.
- Name necklaces.
- Initial necklaces.
- Birthstone-inspired jewelry.
- Engraved jewelry.
- Necklaces.
- Bracelets.
- Rings.
- Earrings.
- Jewelry gifts.
- Mother's jewelry.
- Bridesmaid and wedding jewelry.
- Anniversary and birthday gifts.
- Gift-ready jewelry.
- Jewelry gift boxes and gift sets.

Current business stage:

- Early launch / pre-scale.
- Website and catalog are live.
- Traffic remains very low.
- No visible Shopify orders were detected in the latest safe order checks recorded in project docs.
- Current bottleneck is qualified traffic and indexing maturity, not confirmed product purchasability.

Current website maturity:

- Substantial Shopify storefront, theme, product, collection, SEO, and analytics work has been completed.
- The site is far beyond a starter theme, but should still be treated as actively improving rather than final.
- Current standards emphasize page quality, product quality, crawlability, internal linking, commercial value, mobile UX, and trust before aggressive traffic scaling.

Current technical maturity:

- Shopify Online Store 2.0 theme files exist at repository root.
- Shopify CLI workflow has been used.
- Live theme work has occurred after the owner gave broader execution approval.
- Theme Check has repeatedly passed in project reports.
- Safe Admin/API scripts and reports exist for product, catalog, SEO, Merchant Center readiness, and order-source monitoring.

Primary business objective:

- Generate qualified traffic, convert traffic into orders, learn from data, improve, and repeat.

Current highest-priority objectives:

1. Keep the live storefront technically healthy and premium.
2. Improve index-worthy commercial pages and product-level discovery.
3. Maintain catalog quality across 208 active products.
4. Resolve Merchant Center and Google indexing maturation issues through quality and crawlability, not forced mass indexing.
5. Build qualified traffic through commercial SEO and controlled external sharing.
6. Establish cost and margin guardrails before launching discounts, bundles, thresholds, or gifts with purchase.

### Assumptions / Needs Validation

- Final supplier/product material specifications still require supplier documentation.
- Product-level landed cost, packaging cost, shipping subsidy, and margin guardrails are not yet verified.
- Shipping, fulfillment, return, and personalized/custom order policies need owner/legal review before aggressive claims.
- Real review content is not yet available; no fake reviews or ratings may be used.
- Final product photography and packaging photography are still needed for a stronger premium brand.

## 2. Project History and Timeline

### Early Setup

- The owner created the GitHub repository `falgunitank31/north-and-pearl`.
- The initial approach evaluated GitHub integration, Shopify CLI, local theme development, and manual ZIP upload workflows.
- Dawn was selected as the safe Shopify Online Store 2.0 base theme direction.
- A development theme was identified and used for implementation.
- The owner did not want GHL Technology mixed with this project; North & Pearl is a separate Shopify project.

### Shopify Access and Theme Work

- Shopify CLI access was established after the owner completed login/authorization steps.
- A custom app named `North Pearl Admin Setup` was created/installed for Admin/API access.
- Scopes were expanded over time for products, content, navigation, themes, publications, legal policies, and orders where needed.
- The owner later restored safe order-read access; safe recent order checks returned access OK and 0 visible orders.
- Live theme work ultimately targeted `North & Pearl Dev - Codex`.

### Website Buildout

Implemented work included:

- Homepage redesign and merchandising improvements.
- Header, navigation, and menu refinements.
- Collection page improvements with product-first layouts.
- Product page conversion-depth improvements.
- Product card polish.
- Mobile sticky add-to-cart assist.
- Cart and empty-cart recovery improvements.
- Footer discovery rails and internal links.
- Brand information page cleanup.
- Return policy addition.
- Theme-level safeguards against fake discounts/sale messaging.

### Catalog Expansion

- Initial active catalog grew from 118 to 208 active products.
- Gauss created 100 additional Alibaba-sourced draft products.
- 90 of those passed launch gates and were activated.
- 10 remained held due to image, source, score, or source-price risk.
- Active catalog QA later showed 208 active product pages passing live QA and 208/208 active products having at least one `availableForSale` variant.

### SEO and Google Work

- Codex SEO toolkit was installed as Faraday's subordinate toolkit.
- Google API, Search Console, and GA4 access were configured.
- GA4 property used in project docs: `properties/546565745`.
- GA4 tag recorded in project docs: `G-14KCZE935H`.
- Search Console domain property recorded: `sc-domain:northandpearl.com`.
- Shopify sitemaps were submitted and monitored.
- Page quality, internal linking, product descriptions, schema, and buyer-intent collections were improved for indexing readiness.
- Owner later instructed: do not reindex anything until GSC confirms indexing progress.

### Sales and Revenue Lane

- Pareto was added as the sales and revenue-growth lane.
- Sales operating files were created.
- Gift Sets were created as a non-discount AOV path.
- Bundle/discount/free-shipping-threshold/gift-with-purchase work remains blocked until cost and margin guardrails are verified.

### Return Policy

- A conservative Return Policy was added on 2026-08-08.
- Broader policy/legal finalization still requires owner/legal review.

## 3. Business and Brand Context

Brand name:

- North & Pearl.

Preferred style:

- Elegant.
- Warm.
- Premium.
- Trustworthy.
- Emotional.
- Clear.
- Modern.
- Gift-focused.

Visual direction:

- Ivory and warm neutral backgrounds.
- Matte black typography.
- Restrained champagne-gold accents.
- Elegant serif headings.
- Clean sans-serif body text.
- Generous spacing.
- Real product imagery wherever possible.
- Premium but accessible feel.

Avoid:

- Excessive gold.
- Dark luxury cliches.
- Fake urgency.
- Fake scarcity.
- Fake reviews.
- Unsupported trust claims.
- Generic dropshipping feel.
- Long copy blocks before products.
- Empty category or product presentation.
- Competitor copying.

Core customer experience:

- Customers should quickly understand what North & Pearl sells, what the products look like, how much they cost, and why the brand feels trustworthy.
- Product discovery should be easy by category, occasion, recipient, and price intent.
- Collection pages should show products early, with SEO/supporting content below product grids.
- Product pages should reduce buying uncertainty with clear imagery, price, variant/personalization handling, shipping/returns/care support, FAQs, and related paths.

## 4. Governance and Operating Rules

Primary governance file:

- `AGENTS.md`

Permanent operating priority:

1. Website quality.
2. Product and catalog quality.
3. Traffic.
4. Conversion.
5. Orders.
6. Retention.

Autonomy:

- Routine, safe, reversible, verified work can proceed without routine owner approval.
- The owner should not need to manually assign every agent or identify every issue.
- Work should follow inspect, execute, test, document, continue.

Owner approval required for:

- Spending money.
- Paid apps or subscriptions.
- Paid ads.
- Supplier contact or commitments.
- Inventory/sample purchases.
- Payment, bank, tax, billing, domain, or account ownership changes.
- Legal-policy decisions.
- Destructive data deletion.
- Unsupported product/material/shipping/return/warranty claims.
- Irreversible or high-risk business actions.

Current special instruction:

- Do not create new chats, tasks, or subagents unless explicitly requested.
- Keep work in this same North & Pearl thread when possible.
- Use existing responsibility lanes only.

## 5. Approved Agent Roster

The approved permanent lanes are:

| Agent | Responsibility |
| --- | --- |
| Lead Orchestrator | Scope, sequencing, risk, dependencies, conflict resolution, QA coordination, sprint management, release readiness, documentation. |
| Tesla | Shopify engineering, Liquid, CSS, JavaScript, CLI workflow, theme sections, mobile, cart, search, personalization persistence, performance, Theme Check. |
| Kuhn | Ecommerce design, premium jewelry UX, visual hierarchy, brand creative, mobile UX, product image presentation, trust perception. |
| Gauss | Product catalog, merchandising, product data, collection assignment, product naming, variants, images, availability, Alibaba product checks, catalog hygiene. |
| Faraday | Organic growth, SEO, AEO, GEO, AI search readiness, Search Console, keyword/content architecture, internal linking, Merchant Center organic readiness. |
| Rawls | Analytics, GA4, Search Console measurement, Shopify KPI checks, funnel reporting, dashboards, data integrity. |
| Lovelace | Operations, shipping, returns, customer-service SOPs, fulfillment readiness, policy-operational consistency. |
| Curie | Supplier intelligence, source evidence, claim safety, product-quality verification, landed-cost and supplier-risk inputs. |
| Pareto | Sales strategy, revenue growth, market monitoring, offers, bundles, AOV, commercial merchandising, sales experiments and forecasting. |

Do not use or reintroduce older/non-approved agent names unless the owner explicitly requests a separate mapping. Older names that appeared during experimentation should be treated as discontinued UI clutter, not active responsibility lanes.

## 6. Agent Workflows

### Cross-Functional Quality Gate

Every customer-facing change should be reviewed across applicable impacts:

- Jewelry UX.
- Visual design.
- Merchandising.
- Product data.
- Inventory.
- Personalization.
- Conversion.
- SEO/AEO/GEO.
- Accessibility.
- Mobile.
- Performance.
- Trust claims.
- Shipping and returns.
- Shopify functionality.
- Regression risk.

### Sales Initiative Workflow

1. Pareto identifies commercial opportunity.
2. Rawls validates funnel evidence and baseline.
3. Gauss validates products, pricing, inventory, and merchandising.
4. Curie validates cost, source, supplier, and margin inputs.
5. Lovelace validates shipping, fulfillment, returns, and customer promises.
6. Kuhn designs customer-facing presentation.
7. Tesla implements and technically validates.
8. Faraday aligns organic landing pages and search intent.
9. QA tests complete journey.
10. Rawls and Pareto measure and decide keep, revise, or revert.

### Product Activation Gate

Product changes require:

- Gauss: source/category/pricing/availability review.
- Kuhn: image quality, accuracy, visual order, premium fit.
- Faraday: product SEO, metadata, index-worthy status.
- Curie: source evidence and claim safety.
- Lovelace: operational promise safety.
- Tesla: rendering, mobile, alt text, add-to-cart and publication validation.

## 7. Technical Architecture

Repository root:

- `/Users/yagneshtank/Documents/Codex/north-and-pearl`

Shopify theme structure:

- Theme files live at repository root.
- Key theme directories: `assets/`, `config/`, `layout/`, `locales/`, `sections/`, `snippets/`, `templates/`.
- Documentation and operating files live alongside the theme.

Important root files:

- `AGENTS.md`
- `SPRINT.md`
- `BACKLOG.md`
- `CHANGELOG.md`
- `METRICS.md`
- `DECISIONS.md`
- `RISKS.md`
- `EXPERIMENTS.md`
- `README.md`
- `.theme-check.yml`

Important documentation folders:

- `docs/`
- `brand/`
- `content/`
- `seo/`
- `sales/`
- `analytics/`
- `operations/`
- `research/`
- `reports/`
- `scripts/`

Important theme assets observed:

- `assets/north-pearl.css`
- `assets/north-pearl-homepage.css`
- `assets/north-pearl-product-support.css`
- `assets/north-pearl-cart-support.css`
- `assets/north-pearl-collection-guide.css`
- `assets/north-pearl-reviews.css`
- `assets/north-pearl-ga4.js`
- `assets/north-pearl-logo.svg`
- `assets/north-pearl-logo-light.svg`
- `assets/north-pearl-mark.svg`

## 8. Current Shopify Theme State

Known theme state from recent CLI inspection:

- Live theme: `North & Pearl Dev - Codex`, theme ID `189441802424`.
- Unpublished theme: `Horizon`, theme ID `189417554104`.
- Unpublished theme: `Dawn`, theme ID `189417881784`.

Important discrepancy:

- Early workflow documents described using an unpublished development theme with no live changes.
- Later owner instructions gave broad authority and live publishing occurred.
- Current repository history and reports show live theme `189441802424` has received many pushed improvements.

Current rule:

- Documentation-only work in this handoff must not touch Shopify.
- Future routine safe reversible storefront work may be autonomous under `AGENTS.md`, but high-risk/approval-required actions still need owner approval.

## 9. Website State by Area

| Area | Current State | Notes |
| --- | --- | --- |
| Homepage | Improved, still needs periodic visual QA | Product-led sections, buyer-intent paths, Featured Pieces, gift guide links, and category/occasion merchandising exist. Avoid empty or awkward grids. |
| Header/navigation | Improved | Main menu is commerce-focused. Empty collections should not be exposed. Prior reports mention menu whitespace was fixed; keep monitoring. |
| Collection pages | Stronger than baseline | Product-first layout, editorial hero, metadata, shop bars, quicklinks, and collection images exist. |
| Product pages | Improved, not final | PDP support sections, FAQs, honest review surfaces, related paths, mobile sticky ATC assist, and structured data work exist. Final product-specific facts still need supplier validation. |
| Product cards | Improved | Media wells, hierarchy, highlight chips, compare-at/sale suppression, alt text handling. |
| Cart/empty cart | Improved | Empty-cart recovery links into buyer-intent paths and gift sets exist. |
| Search | Present through Shopify theme | Needs ongoing QA as catalog grows. |
| Footer | Improved | Discovery rail and key commercial/support links exist. |
| Policies | Partial | Return Policy added conservatively on 2026-08-08. Broader legal review still recommended. |
| AI/Brand information page | Cleaned | Customer-facing naming was changed from explicit "AI Brand Information" presentation to less awkward brand information language where possible. Some historical traces may remain in docs. |
| Blog/gift guides | Active | Multiple commercial gift-guide posts and updated internal links exist. Avoid mass thin content. |
| Mobile | Repeatedly reviewed | Continue checking grids, product forms, sticky ATC, image crops, and horizontal overflow. |
| Accessibility | Ongoing | Media alt text improved for 93 active products; continue image/title/label/focus review. |

## 10. Catalog State

Current catalog facts from project reports:

- Active products: 208.
- Active products with at least one `availableForSale` variant: 208/208.
- Active product SEO audit: 208/208 clean in latest reports.
- Merchant readiness repository audit: 208 ready, 0 needing review, with identifier caveat.
- Product quantity display concern: active variants have inventory tracking disabled, so visible quantity may appear as 0/hidden while variants remain sellable.
- A previous 100-product Gauss batch resulted in 90 activated products and 10 held products.

Known category counts from recent commerce-quality report:

| Collection | Approximate products |
| --- | ---: |
| Personalized Jewelry | 72 |
| Jewelry Gifts for Her | 64 |
| Gifts Under $50 | 40 |
| Gifts Under $100 | 80 |
| Birthday Jewelry Gifts | 56 |
| Anniversary Gifts | 56 |
| Best Sellers | 12 |
| New Arrivals | 64 |
| Name Necklaces | 111 |
| Initial Necklaces | 76 |
| Birthstone Jewelry | 8 |
| Necklaces | 151 |
| Bracelets | 56 |
| Rings | 15 |
| Earrings | 23 |
| Gifts | 56 |
| Mother's Collection | 34 |
| Wedding & Bridesmaids | 33 |

Catalog risks:

- 115 active products are below preferred media standard in older source-image audits.
- Several source references remain incomplete or blocked by Alibaba protection pages.
- Product descriptions were enriched broadly for Merchant Center but still need product-by-product differentiation using verified supplier facts.
- Birthstone Jewelry has improved image handling but still needs stronger product fit and assortment.

## 11. Product Sourcing and Alibaba Context

Supplier/Product sourcing lane:

- Curie and Gauss handle Alibaba/product research, sourcing evidence, supplier validation, sample planning, and claim safety.

Rules:

- Do not contact suppliers without approval.
- Do not place orders.
- Do not pay outside Alibaba.
- Do not claim a supplier manufactures for a competitor without evidence.
- Do not publish supplier notes or internal source language to customers.
- Supplier claims must be classified as verified, supplier claim, estimate, inference, or unknown.

Current state:

- Products have been sourced/researched from Alibaba listings and adapted into North & Pearl product records.
- Some owner-supplied Alibaba image URLs and source IDs were used to repair specific product imagery/source traceability.
- Direct Alibaba extraction is sometimes blocked by anti-bot/protection pages.
- Source traceability exists for many products, but not all.

When an order arrives:

- Use safe Shopify order access without customer PII exposure.
- Identify purchased product SKU/source tag/source URL/source ID.
- Provide the relevant Alibaba/source URL or source ID to the owner so the owner can order the correct item.
- Do not place supplier orders or spend money.

## 12. SEO, AEO, GEO, and Faraday State

Faraday owns:

- SEO.
- AEO.
- GEO.
- AI search readiness.
- Google Search Console.
- Internal linking.
- Commercial collection SEO.
- Product SEO.
- Merchant Center organic readiness.
- SERP clustering.
- SXO.
- Backlinks/authority systems.
- Competitor visibility analysis.
- Bing/IndexNow readiness.
- SEO drift monitoring.
- Image SEO.
- E-E-A-T/editorial trust.
- AI visibility tracking.
- Core Web Vitals trends.

Codex SEO toolkit:

- Installed as Faraday's subordinate toolkit from local Codex skills.
- Does not replace North & Pearl governance.
- Faraday remains the owner; toolkit agents/profiles are tooling only.

SEO work completed:

- Buyer-intent collections created and linked.
- Gift guides updated and/or created.
- Internal links strengthened from homepage, footer, PDP support blocks, collection guides, and blog/gift guides.
- Product descriptions enriched for Merchant Center.
- Global WebPage schema added.
- Product offer schema fixed for Merchant Center warnings around `shippingDetails` and `hasMerchantReturnPolicy`.
- Product card alt text improved to use Shopify media alt text.
- Page titles/meta snippets were shortened or cleaned through theme-level safeguards.
- Sitemap issues were corrected and resubmitted.

Current indexing stance:

- Google has discovered many Shopify sitemap URLs, but indexation is still maturing.
- Google cannot be forced to index ordinary Shopify ecommerce pages through an API.
- Safe actions: improve page quality, sitemap health, internal links, unique product value, crawlability, and external discovery.
- Owner has explicitly instructed not to reindex anything until GSC confirms pages are indexed.

## 13. Google Search Console Status

Configured status:

- Search Console access is configured for `sc-domain:northandpearl.com`.
- API access has been used for Search Analytics, sitemaps, and URL Inspection.
- Service account access was added by owner.

Historical metrics from project docs:

- Early baselines showed 1 impression, 0 clicks.
- Later snapshots showed 5-6 impressions, 0 clicks.
- GA4 organic continued showing 0 organic sessions in recorded monitoring windows.
- Several monitored buyer-intent URLs later became indexed.
- Larger priority inspections still showed a mix of indexed, discovered/not-indexed, crawled/not-indexed, and unknown URLs.

Important indexing caveat:

- `Crawled - currently not indexed` generally means Google was able to fetch the page but chose not to index yet.
- This is not automatically a technical block if crawl allowed, fetch successful, and no robots/canonical issue is present.
- Response should focus on strengthening page uniqueness, internal links, product value, and discovery signals.

Current owner preference:

- Do not manually request reindexing while Google indexing is still processing.
- Continue page quality and crawlability work only.

## 14. GA4 and Analytics State

Configured status:

- GA4 tag: `G-14KCZE935H`.
- GA4 property in project records: `properties/546565745`.
- GA4 Data API access has been verified in project reports.

Recorded baseline:

- July 28 visible GA4 Home overview: 9 active users, 9 new users, 23 sessions, 394 events, 0 key events.
- Acquisition baseline visible in docs: Direct only.
- Later GA4 organic API reports repeatedly returned 0 organic sessions and 0 organic top pages for monitored windows.

Measurement caveats:

- Traffic is too low for strong conclusions.
- Do not claim traffic increase, revenue, conversion rate, or order growth without verified data.
- Purchase-event verification remains a priority before making conversion-performance claims.
- Shopify order/revenue baseline is not fully documented beyond safe order queries showing 0 visible orders.

## 15. Google Merchant Center and Product Feed

Current recorded state:

- Merchant readiness repository audits report 208 active products ready with identifier caveat and 0 needing review.
- Google Merchant Center UI warnings may lag until Google reprocesses product feeds and crawls structured data.

Fixes completed:

- Product descriptions were enriched across 208 active products.
- Product offer JSON-LD was updated to include controlled `shippingDetails` and `hasMerchantReturnPolicy`.
- Customer-facing unsupported claims were avoided.

Known caveats:

- Merchant Center may still show UI validation or processing warnings after local/theme/feed readiness is corrected.
- Product identifiers/GTIN/MPN/brand handling may need account/feed-level review.
- Shipping and return settings in Merchant Center must remain consistent with Shopify/store policies.

## 16. Sales and Revenue State

Pareto owns sales and revenue growth.

Current state:

- No visible orders detected in recent safe order checks recorded in project docs.
- Current sales bottleneck is qualified visitor volume, not confirmed product purchasability.
- Products are available for sale at the Shopify variant level.
- Gift Sets collection was created as a non-discount AOV path.
- Empty cart and homepage/collection routes were adjusted toward buyer-intent paths.

Blocked sales work:

- Discounts.
- Bundle pricing.
- Free-shipping thresholds.
- Gift-with-purchase.
- Promotional offers that depend on margin.

Reason:

- Verified cost, landed cost, packaging cost, shipping subsidy, processing cost, return allowance, and minimum margin rules are not yet documented.

Permitted sales work:

- Non-discount merchandising.
- Better product grouping.
- Better gift positioning.
- Internal linking to commercial paths.
- Cart recovery links.
- Clearer offer planning without launching risky promotions.

## 17. Reviews and Trust Proof

Current state:

- Honest PDP review surfaces exist.
- Real review/rating counts are not yet available.
- No fake reviews, fake ratings, fake testimonials, `review` schema, or `aggregateRating` schema should be added.

Owner previously wanted 2-3 reviews on ready-to-order products, but governance requires real/verified reviews only.

Next acceptable paths:

- Install/configure an approved review app if owner approves any cost and app decision.
- Use Shopify-native/metafield review data if available.
- Collect verified first-customer reviews post-purchase.
- Use non-review reassurance content until real reviews exist.

## 18. Policies and Operations

Operations files exist under:

- `operations/customer-service-sop.md`
- `operations/fulfillment-sop.md`
- `operations/returns-sop.md`
- `operations/shipping-sop.md`

Policy status:

- Conservative Return Policy was added on 2026-08-08.
- Shipping, returns, refund, custom product, privacy, and terms need ongoing consistency review.
- Policies should be owner/legal reviewed before being treated as final.

Important policy direction:

- Personalized/custom products are generally non-returnable unless defective, damaged, or incorrect.
- Standard products may have a 14-30 day return window, but final window must be approved.
- Customers should contact support before returns.
- Production and shipping timelines must not be promised unless supplier/fulfillment confirms them.

## 19. Content, Blog, and Commercial Guides

Content strategy:

- Commercial pages first.
- Buyer-intent collections and product pages before large blog volume.
- Gift guides only when they link to real products/collections.
- Avoid mass AI content and thin informational pages.

Commercial content created or improved:

- Buyer-intent collections.
- Gift guide articles.
- Weekly meaningful jewelry gift guide.
- Name necklace and birthstone collection copy improvements.
- Internal guide-to-product links.

Important content rules:

- Do not copy AJLuxe or any competitor.
- Do not make unsupported material/quality claims.
- Do not create duplicate promotional landing pages during indexing stabilization.
- Do not publish large volumes of weak blog content before commercial pages are strong.

## 20. Brand and Design System

Brand files exist:

- `brand/brand-strategy.md`
- `brand/design-system.md`
- `brand/voice-and-tone.md`
- `brand/logo-system.md`
- `brand/photography-direction.md`
- `brand/packaging-direction.md`

Logo:

- North & Pearl logo assets exist in `assets/`.
- The owner specifically called out logo design earlier; logo system work exists but final brand asset approval may still be needed.

Design responsibility:

- Kuhn owns ecommerce design and brand creative.
- Tesla implements theme changes.

Current design standard:

- Premium jewelry.
- Product-led.
- Mobile-first.
- Shoppable.
- Real imagery.
- Minimal but not empty.
- No awkward empty cards or grids.
- Products should be visible early on collection and homepage surfaces.

## 21. Competitor Context

Reference competitors discussed:

- AJLuxe.
- Mejuri.
- Oak and Luna.
- Gorjana.
- Brilliant Earth.

Competitor use rules:

- Use only for category expectations and benchmarking.
- Do not copy content, code, images, layouts, promotions, product names, testimonials, or branding.
- Competitor observations should be verified with URLs and dates when used for decisions.

Owner comparison concern:

- The owner wants North & Pearl to feel comparable to leading jewelry ecommerce sites in product density, merchandising, product-page depth, visual polish, and trust.
- AJLuxe was used as a reference for product-page articulation and shopping density, not as a source to copy.

Gaps identified from competitor benchmarking:

- Product-page conversion depth needs continual improvement.
- Product galleries and image quality need stronger, accurate product imagery.
- Homepage and collection visual polish must avoid empty space.
- Product differentiation must be stronger and less generic.
- Real trust proof/reviews are missing.
- Offer strategy is blocked until economics are known.

## 22. Current Reports and Dashboards

Key local dashboard:

- `docs/agent-command-center.html`

Generator:

- `scripts/generate-agent-command-center.mjs`

Reports folder:

- `reports/` contains daily monitors, SEO reports, product audits, Merchant readiness reports, indexing dashboards, traffic/order summaries, and source-traceability reports.

Important report themes:

- Live storefront QA.
- Product SEO audit.
- Merchant Center readiness.
- Source-image/source-reference recovery.
- Faraday GSC/GA4 monitoring.
- Indexing dashboards.
- Traffic/order activation kits.
- Sales/revenue guardrails.

## 23. Automation and Daily Operating Pass

Recurring heartbeat instructions in the project thread directed same-thread daily operating passes.

Daily lanes:

- Faraday: Search Console, indexing, GA4 organic, sitemap status, buyer-intent pages, internal links.
- Gauss: catalog growth, category balance, product additions when safe, source traceability.
- Tesla: storefront QA, theme health, cart/search/mobile/accessibility.
- Rawls: GA4/GSC/Shopify KPI checks.
- Lovelace: order source monitor, operations readiness, shipping/returns promise safety.
- Kuhn: ecommerce design/brand visual QA.
- Curie: supplier/source evidence and claim safety.
- Pareto: revenue and commercial merchandising when applicable.

Routine actions:

- Regenerate Agent Command Center UI.
- Inspect storefront/catalog/SEO/analytics/order readiness.
- Execute safe work.
- Add products only when source/image/category/claim/SEO gates pass.
- If orders exist, identify product source without exposing customer PII.
- Update reports and project docs.
- Commit/push safe repo changes when appropriate.

## 24. Important Scripts and Tooling

Scripts directory contains many project automation files. Important categories include:

- Product SEO audits.
- Merchant readiness checks.
- Live storefront QA.
- Product/source image audits.
- Google access verification.
- Agent Command Center generation.
- Shopify Admin/API helpers.
- Search Console/GA4 monitors.

Tooling used:

- Shopify CLI.
- Shopify Theme Check.
- Git/GitHub.
- Codex SEO toolkit.
- Google APIs.
- GA4 Data API.
- Search Console API.
- Local command-line scripts.

Do not run scripts that mutate Shopify, Search Console, Merchant Center, or live theme unless the current task allows it. This handoff task explicitly allowed documentation only.

## 25. Git and Repository State

Recent git history includes:

- `568eecb Add conservative return policy`
- `21653eb Run monitor-only commerce QA pass`
- `610e3b7 Strengthen internal links for priority products`
- `0ddc9e9 Enrich product descriptions for Merchant Center`
- `fa263ad Add offer guardrails and honest PDP reviews`
- `bd8ea83 Improve PDP conversion depth and discovery links`
- `bcaa748 Fix homepage occasion grid layout`
- `60202e1 Run indexing phase priority pass`
- `e1c70df Fix birthstone collection hero image`
- `b672f8a Clean customer-facing brand information page`
- `c2be358 Rename AI brand page presentation`
- `24323bd Strengthen index discovery for priority pages`
- `b599f86 Document Faraday indexing response`
- `33df70f Expand Faraday organic growth role`
- `677eb91 Fix Merchant Center product offer schema`
- `d41085f Execute first-order traffic activation`

Repository has extensive documentation and reports. Some early docs such as `README.md`, `docs/architecture.md`, and `docs/development-workflow.md` may be stale compared with later live implementation.

## 26. Known Discrepancies and Conflicts

### Early No-Live-Change Workflow vs Later Live Execution

Decision/history:

- Early instructions required no live changes without exact approval and preferred unpublished development theme.
- Later owner instructions gave broader autonomy and requested live publishing.
- Theme work was pushed live to `North & Pearl Dev - Codex` theme ID `189441802424`.

Current status:

- Live work has occurred.
- Documentation-only handoff must not modify production.

### Approval Phrase vs Later Autonomy

Decision/history:

- Initial workflow required exact approval phrases.
- Later owner repeatedly instructed not to wait for routine approvals and to execute safe work autonomously.

Current status:

- `AGENTS.md` is the current operating authority: routine safe reversible work is autonomous; high-risk/financial/legal/account/supplier/unsupported-claim actions still need owner approval.

### Manual Reindexing vs Current Hold

Decision/history:

- The owner asked to push/request URLs and index pages.
- Later the owner instructed not to reindex anything until GSC confirms pages are indexed.

Current status:

- Do not request manual reindexing. Continue page quality, internal linking, sitemap monitoring, and crawlability work.

### Subagents and New Chats

Decision/history:

- Many subagent names appeared over time.
- The owner later objected to new chats/subagents and wanted only the defined roster.

Current status:

- Use the approved roster only: Lead Orchestrator, Tesla, Kuhn, Gauss, Faraday, Rawls, Lovelace, Curie, Pareto.

### Pinterest

Decision/history:

- Pinterest was considered.
- The owner agreed to prioritize Google organic, product pages, gift guides, and Merchant Center first.

Current status:

- Pinterest is deferred as lean priority unless owner later reopens it.

## 27. Current Blockers

### Cost and Margin Guardrails

Blocked:

- Discounts.
- Bundle pricing.
- Free-shipping threshold offers.
- Gift-with-purchase.
- Promotional pricing tests.

Needed:

- Product cost.
- Personalization cost.
- Packaging cost.
- Freight allocation.
- Import/duty estimate.
- Payment processing cost.
- Return/refund allowance.
- Minimum gross margin.

### Real Reviews

Blocked:

- Review/rating schema.
- Customer review claims.
- 2-3 reviews per product unless verified.

Needed:

- Real customer reviews.
- Approved review app or Shopify-native review metafields.

### Supplier/Product Facts

Blocked:

- Material claims such as sterling silver, gold vermeil, 18K plating, stainless steel, waterproof, tarnish-free, hypoallergenic, nickel-free, lead-free, cadmium-free, handmade, ethical.

Needed:

- Supplier documentation and owner approval.

### Product Photography

Blocked/partial:

- Premium final photography.
- Exact-source image replacement for products where Alibaba pages are protected or unavailable.

Needed:

- Owner-supplied source URLs/images.
- Supplier-provided assets.
- Final photography.

### Legal/Policy Finalization

Blocked:

- Treating policies as final legal guidance.

Needed:

- Owner/legal review.

## 28. Current Open Work

High-priority ongoing work:

1. Monitor Merchant Center reprocessing for shipping/returns schema and product description changes.
2. Monitor Search Console indexing without manual reindexing.
3. Keep 30-50 strongest commercial URLs stable while Google evaluates them.
4. Continue improving product uniqueness and imagery for index-worthy products.
5. Maintain buyer-intent internal links from homepage, footer, guides, collections, and PDPs.
6. Build qualified external traffic using tracked organic/warm-audience assets.
7. Confirm purchase/add-to-cart/checkout-start analytics events.
8. Establish cost/margin guardrails.
9. Finalize shipping/returns/customer promise language.
10. Continue storefront visual QA for empty spaces, broken images, product-grid awkwardness, and mobile issues.

## 29. Product Indexing Phase Directive

During the current indexing phase:

- Prioritize page quality, catalog quality, crawlability, internal linking, and commercial page value.
- Do not pause work while waiting for Google.
- Do not request indexing for every discovered URL.
- Do not use the Indexing API for ordinary ecommerce pages.
- Do not create thin content.
- Do not churn product handles, collection URLs, titles, or promotional framing unless a page is unsafe, unavailable, misleading, or weak.

Recommended URL tiering:

- Tier 1: homepage, primary commercial collections, best products, strongest guides.
- Tier 2: supporting commercial collections and high-quality products.
- Tier 3: supporting guides and lower-volume product pages.
- Tier 4: weak/temporary product pages needing improvement.
- Tier 5: utility, low-value, duplicate, filtered, or non-index-worthy URLs.

## 30. Security and Credential Handling

Known integrations exist, but this file intentionally excludes credentials.

Do not store or print:

- API keys.
- Access tokens.
- OAuth tokens.
- Service account JSON contents.
- Shopify app secrets.
- Private keys.
- Cookies.
- Passwords.
- Customer PII.
- Payment data.

If credentials are needed:

- Use existing local credential configuration if already present and authorized.
- If credential access fails, report blocked state without asking for secret values in chat.
- Prefer owner-mediated secure UI setup.

## 31. Integration Inventory

| Integration | Status | Notes |
| --- | --- | --- |
| Shopify store | Configured | Store is `north-and-pearl.myshopify.com`; live domain is `northandpearl.com`. |
| Shopify CLI | Configured | Used for theme and Admin/API workflows. |
| Shopify Admin/API app | Configured | `North Pearl Admin Setup`; no secrets documented here. |
| Shopify live theme | Configured | Live theme `North & Pearl Dev - Codex`, ID `189441802424`. |
| GitHub repository | Configured | `falgunitank31/north-and-pearl`. |
| Google Analytics 4 | Configured | Property `properties/546565745`; tag `G-14KCZE935H`. |
| Google Search Console | Configured | Domain property `sc-domain:northandpearl.com`. |
| Google Merchant Center / Google & YouTube | Configured/monitoring | Product readiness local audits green; UI reprocessing may lag. |
| Codex SEO toolkit | Installed | Faraday subordinate toolkit. |
| DataForSEO | Unknown/optional | Skills exist, but credentialed operational status is not confirmed in durable docs. |
| Alibaba | Research/source input | Used for sourcing research; direct pages can be blocked by protection. |
| Pinterest | Deferred | Not currently a priority versus Google organic/product pages/Merchant Center. |
| Review app | Not confirmed | Real review collection remains pending. |
| Agent Command Center | Local dashboard | `docs/agent-command-center.html`. |

## 32. Search and AI Readiness

AI/GEO goals:

- Make North & Pearl easy for Google AI Overviews, ChatGPT, Gemini, Perplexity, Bing Copilot, and other AI systems to understand accurately.

Implemented/partially implemented:

- Brand facts consistency.
- Brand information page cleanup.
- Schema improvements.
- Internal linking.
- Product/collection descriptions.
- Gift guide content.
- FAQ/reassurance structures.
- AI-safe brand description.

Still needed:

- More verified facts.
- Real reviews.
- Stronger author/editorial standards and last-updated practices for content.
- Backlink/authority baseline.
- Bing/IndexNow readiness if approved and technically viable.
- Ongoing AI visibility monitoring using verified tools/manual checks.

## 33. Quality Standards for Future Work

Before marking any future task complete, report:

1. What was inspected.
2. Problems identified.
3. Changes made.
4. Agents/responsibility lanes involved.
5. Files changed.
6. Shopify settings changed.
7. Tests run.
8. Risks.
9. Assumptions.
10. Missing information.
11. Live storefront validation.

Relevant tests:

- Shopify Theme Check.
- Live storefront render validation.
- Product/PDP QA.
- Cart add test.
- Search/menu/filter tests.
- Mobile/responsive checks.
- Accessibility checks.
- Claim scan.
- Product SEO audit.
- Merchant readiness audit.
- Schema/rich result checks where available.
- GA4/GSC checks where relevant.

## 34. What Not To Do

Do not:

- Copy AJLuxe or any competitor.
- Use competitor images.
- Use fake reviews.
- Use fake discounts.
- Use fake scarcity.
- Use unsupported material/quality claims.
- Launch paid ads without approval.
- Install paid apps without approval.
- Spend money.
- Contact suppliers without approval.
- Place orders.
- Change payment/tax/billing/domain/account settings.
- Delete important business data.
- Expose secrets.
- Create new subagents/chats unless explicitly asked.
- Force mass indexing or request all product URLs individually during the current GSC hold.
- Treat low traffic as statistically meaningful.

## 35. What To Do Next

Recommended next execution sequence:

1. Re-run a documentation-safe status check from `SPRINT.md`, `BACKLOG.md`, `METRICS.md`, `CHANGELOG.md`, and recent reports.
2. Confirm no P0 storefront issues.
3. Continue monitor-only GSC indexing posture.
4. Improve page quality and internal links only for index-worthy URLs.
5. Keep active product visual QA moving, especially products below preferred media standard.
6. Establish product-level cost/margin guardrails.
7. Finalize operations/policy facts.
8. Verify GA4 ecommerce events and Shopify order monitoring without exposing PII.
9. Continue qualified visitor activation through commercial gift guide links and tracked warm-audience assets.
10. Use Pareto/Faraday/Rawls to measure whether traffic, product views, add-to-cart, checkout starts, and orders begin moving.

## 36. Information Not Fully Recoverable

Historical context was available through the current Codex thread memory, attached handoff instruction, repository documentation, git history, sprint/backlog/metrics/change logs, and inspected project artifacts.

Not fully recoverable as a separate durable artifact:

- A complete raw transcript export of every prior Codex message.
- Exact browser UI interactions that occurred outside saved screenshots/reports.
- Any credentials or secret values, intentionally excluded.
- Some early one-off task outputs that were not committed or documented in repo files.
- Current live external account UI state unless rechecked through authorized tools or owner-provided screenshots.

Where exact historical detail is missing, future agents should rely on `AGENTS.md`, current project docs, git history, and verified live/API checks rather than inventing details.

## 37. High-Level Current Readiness

| Dimension | Readiness | Evidence / caveat |
| --- | --- | --- |
| Storefront technical health | Good | Theme Check and live QA repeatedly passed in reports. |
| Product purchasability | Good | 208/208 active products available for sale in recorded Admin/API audit. |
| Catalog breadth | Good | 208 active products, core categories populated. |
| Product media quality | Partial | Many products still below preferred premium media standard. |
| Product descriptions | Improved | 208 enriched for Merchant Center, but product-specific verified facts still needed. |
| SEO foundation | Improving | Sitemaps, schema, internal links, collections, and guides in place. |
| Indexing | Partial | Google indexing still maturing; do not force mass reindexing. |
| Analytics | Configured but low data | GA4/GSC connected; organic/session/order data remains very low. |
| Merchant Center | Improving | Local audits green; UI reprocessing may lag. |
| Sales/offers | Partial | Non-discount merchandising active; margin-dependent offers blocked. |
| Trust proof | Partial | Honest review surface exists; real reviews not yet available. |
| Operations/policies | Partial | Conservative Return Policy added; final legal/ops review needed. |

## 38. Ready for ChatGPT Work

ChatGPT Work should treat this document plus the repository as the starting context.

When uncertain:

1. Read `AGENTS.md`.
2. Read `SPRINT.md`, `BACKLOG.md`, `METRICS.md`, `CHANGELOG.md`, `DECISIONS.md`, and `RISKS.md`.
3. Inspect relevant theme files and scripts.
4. Verify live/API state before making claims.
5. Follow current owner directives and approval boundaries.

North & Pearl's current strategic focus is:

Website excellence and product/catalog quality first, then qualified traffic, then conversion and orders, with careful measurement and no unsupported claims.
