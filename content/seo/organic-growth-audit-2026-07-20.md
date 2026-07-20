# North & Pearl Organic Growth Audit

Date: 2026-07-20

Scope: ecommerce SEO, AEO, GEO, AI-search readiness, Shopify SEO, internal linking, organic Pinterest readiness, organic Shopping readiness, and organic conversion paths. Paid ads, paid media, SMS, account settings, billing, publishing, app installation, and unsupported product claims are out of scope.

## Evidence Labels

- VERIFIED: Confirmed in local files or live storefront HTML/sitemaps during this audit.
- INFERENCE: Reasonable conclusion from verified code/content, but not independently proven with analytics or Search Console.
- ESTIMATE: Directional scoring based on audit judgment, not traffic/rank/revenue data.
- UNKNOWN: Requires owner, supplier, Shopify admin, analytics, or Search Console confirmation.

## Organic Growth Scorecard

Overall organic foundation score: 63/100 (ESTIMATE).

| Area | Score | Evidence | Notes |
| --- | ---: | --- | --- |
| Crawlability and indexability | 82 | VERIFIED | `robots.txt` allows public storefront URLs and declares `https://northandpearl.com/sitemap.xml`. Shopify sitemap index includes products, collections, pages, blogs, and agentic discovery. |
| Technical Shopify SEO | 70 | VERIFIED | Canonicals, responsive image srcsets, Product schema, Breadcrumb schema, Organization schema, and WebSite SearchAction exist. Homepage lacks planned SEO title/meta description live. |
| Homepage organic positioning | 55 | VERIFIED | Live homepage has strong H1 and internal links, but live title is only `North and Pearl` and no meta description was found. |
| Collection SEO | 68 | VERIFIED | Key collection pages have unique titles/descriptions and H1s. Collection descriptions and lower-page guidance exist, but many collection pages still need stronger intent-specific copy and FAQs. |
| Product SEO | 62 | VERIFIED | Sample live product has unique title/meta, Product schema, Offer, cautious materials copy, personalization fields, and image alt text. Product sitemap shows many similar/duplicated product names that may create thin or duplicate intent risk. |
| Internal linking | 64 | VERIFIED | Header, featured nav, homepage, and collection guide links connect major collections and guides. Blog-to-collection and product-to-guide links need a formal rule set. |
| AEO readiness | 58 | VERIFIED/INFERENCE | FAQ template and AI Brand Information page exist. Collection/product question coverage is incomplete and should be expanded without unsupported material claims. |
| GEO / AI-search readiness | 66 | VERIFIED | AI Brand Information page and AboutPage schema exist; robots includes Shopify agentic discovery and UCP/MCP references. Entity naming is inconsistent between `North & Pearl` and `North and Pearl`. |
| Image SEO | 61 | VERIFIED | Product images have descriptive alt text and sitemap image captions. Some alt text is formulaic; primary visual quality and product inspectability require merchandising review. |
| Organic conversion paths | 68 | VERIFIED/INFERENCE | Product pages include personalization fields, gift note, care/material/production accordions, add-to-cart, and related products. Policy timing, materials, and fulfillment details remain unconfirmed. |
| Organic Pinterest readiness | 50 | INFERENCE | Product imagery and gift categories exist, but no documented organic Pinterest board taxonomy, pin title standards, or image naming/alt governance was found. |
| Organic Shopping readiness | 52 | VERIFIED/UNKNOWN | Product schema and offer data exist. Feed readiness cannot be confirmed without Shopify product attributes, GTIN/MPN policy, Google Merchant Center, shipping/tax settings, and material confirmation. |

## Verified Live Storefront Findings

- Homepage canonical: `https://northandpearl.com/` (VERIFIED).
- Homepage live title: `North and Pearl` (VERIFIED). This does not match the local metadata map recommendation.
- Homepage meta description: not found in fetched HTML (VERIFIED).
- Homepage H1: `Personalized jewelry made to celebrate what matters most.` (VERIFIED).
- Homepage schema types: Organization, WebSite, SearchAction from header plus custom Organization/Brand schema (VERIFIED).
- Robots: public storefront paths are crawlable, transactional/private paths are disallowed, sitemap is declared (VERIFIED).
- Sitemap index includes products, collections, pages, blogs, and `sitemap_agentic_discovery.xml` (VERIFIED).
- AI Brand Information page canonical, H1, AboutPage schema, Breadcrumb schema, and brand-safe copy exist (VERIFIED).
- Name Necklaces collection has canonical, unique title/meta description, H1, collection guide links, and one visible product in fetched HTML (VERIFIED).
- Sample live product `north-pearl-birthstone-name-necklace` has canonical, unique title/meta description, Product schema, Offer schema, price, H1, personalization fields, materials caution, gift packaging, production/shipping/returns, and care guidance (VERIFIED).
- Requested draft URL `/products/custom-name-necklace` returns the 404 template with canonical `https://northandpearl.com/404` (VERIFIED). The draft catalog handle does not match the live product handles.

## Technical SEO Audit

### Strengths

- Shopify sitemap and robots foundation is active and crawlable for core ecommerce surfaces (VERIFIED).
- Canonical tags are present in `layout/theme.liquid` and live pages (VERIFIED).
- Product schema is output through Shopify `{{ product | structured_data }}` in `sections/main-product.liquid` (VERIFIED).
- Custom Organization, Brand, BreadcrumbList, FAQPage, and AboutPage schema exists in `snippets/north-pearl-schema.liquid` (VERIFIED).
- Product pages include structured, crawlable content blocks rather than relying entirely on tabs hidden by JavaScript (VERIFIED).
- Collection pages show collection descriptions and lower collection guidance when content exists (VERIFIED).
- Product and collection images use Shopify responsive `srcset` patterns (VERIFIED).

### Issues

- Homepage metadata gap: live title is generic and no live meta description was found (VERIFIED). Priority: P0.
- Entity consistency gap: live shop name renders as `North and Pearl` in page titles/footer/logo alt, while brand/schema/content use `North & Pearl` (VERIFIED). Priority: P0/P1 depending on Shopify admin access.
- Duplicate Organization schema appears from both custom schema and Dawn header schema (VERIFIED). This is not automatically harmful, but should be consolidated or aligned so AI/search systems receive one consistent entity graph (INFERENCE). Priority: P1.
- Header schema uses `http://schema.org` while custom schema uses `https://schema.org` (VERIFIED). Low risk, but standardize when editing schema (INFERENCE). Priority: P2.
- Live product sitemap contains many similar handles/titles such as repeated `heart-necklace`, `crystal-bracelet`, and `flower-bracelet` variants (VERIFIED). This may create duplicate-title and thin-intent risk if product descriptions are not meaningfully differentiated (INFERENCE). Priority: P1.
- Collection sitemap includes `/collections/frontpage` (VERIFIED). If this is a legacy or empty collection, it should be reviewed for noindex/removal or repurposing inside Shopify admin (INFERENCE). Priority: P2.
- No Search Console, crawl error, index coverage, or query data was available (UNKNOWN).
- Core Web Vitals were not measured with field data (UNKNOWN). Theme uses multiple CSS/JS assets, Shopify web pixels, animations, cart drawer, and product media galleries, which are common LCP/INP risk areas (INFERENCE).

## Collection Keyword And Intent Map

Use the companion CSV at `content/seo/collection-keyword-intent-map.csv` as the operating map. Summary:

| Collection | Primary intent | Query theme | Page role |
| --- | --- | --- | --- |
| Best Sellers | Gift validation | best personalized jewelry gifts | Discovery and social proof substitute until reviews/data exist |
| Necklaces | Category shopping | personalized necklaces, gift necklaces | Main category hub |
| Name Necklaces | Personalization | name necklace, custom name necklace | High-intent transactional collection |
| Initial Necklaces | Everyday personalized gift | initial necklace, initial jewelry | High-intent transactional collection |
| Birthstone Jewelry | Occasion and family meaning | birthstone jewelry gifts | Birthday/mother/family gift hub |
| Gifts | Gift finder | personalized jewelry gifts for her | Recipient/occasion hub |
| Mother's Collection | Recipient | personalized jewelry for mom | Seasonal and evergreen recipient hub |
| Wedding & Bridesmaids | Occasion | bridesmaid jewelry gifts | Wedding occasion hub |
| Couple Jewelry | Relationship | anniversary jewelry, couple jewelry | Anniversary/partner hub |
| Bracelets/Rings/Earrings | Product type | personalized bracelet/ring/earrings | Category expansion hubs |

## Product SEO Standards

Use `content/seo/product-seo-standards.md` for the reusable standard. Minimum requirements:

- Unique product SEO title and meta description.
- One H1 equal to customer-facing product name.
- Product description must explain buyer, occasion, personalization, care, and claim boundaries.
- Material claims must be UNKNOWN unless confirmed by supplier documentation and approved by owner.
- Image alt text should describe product type and visual detail without invented materials.
- Product schema should include name, image, description, brand, category, offer price/currency/availability, and canonical URL where Shopify can provide them.
- Avoid duplicate product titles that differ only by suffix unless the product pages explain clear visual, recipient, occasion, or feature differences.

## Internal Linking Plan

Use `content/seo/internal-linking-aeo-geo-plan.md` for the detailed plan. Key rules:

- Homepage links to Best Sellers, Name Necklaces, Initial Necklaces, Birthstone Jewelry, Gifts, Mother's Collection, Wedding & Bridesmaids, Couple Jewelry, and Jewelry Care.
- Every collection should link to 3-6 related collections, 1 guide, FAQ, shipping, returns, and care where relevant.
- Every guide should link back to the most relevant collections in the first third of the page and again near the conclusion.
- Product pages should link to Jewelry Care, FAQ, shipping/returns, and their primary parent collection.
- Blog posts should use exact but natural anchors such as `name necklaces`, `birthstone jewelry gifts`, `bridesmaid jewelry gifts`, and `personalized jewelry gifts for mothers`.

## AEO Question Map

High-priority answer targets:

- How do I choose a personalized jewelry gift?
- What should I check before ordering personalized jewelry?
- Can I return personalized jewelry?
- How long does personalized jewelry take to ship?
- What materials are North & Pearl products made from?
- Are North & Pearl products hypoallergenic, waterproof, or tarnish-free?
- What is a name necklace?
- What is birthstone-inspired jewelry?
- What personalized jewelry is good for Mother's Day?
- What jewelry makes a good bridesmaid gift?
- What should I write on a personalized necklace or bracelet?
- How do I care for personalized jewelry?

Answer policy: give helpful guidance, then state that materials, production timing, and performance claims must be verified on the individual product page or by owner-approved policy.

## GEO And AI-Search Plan

- Keep `/pages/ai-brand-information` as the public source of truth for AI assistants (VERIFIED existing).
- Add a compact `AI-safe facts` section to About, FAQ, and major guide pages (INFERENCE).
- Standardize entity naming to `North & Pearl` in Shopify store name, schema, metadata, logo alt text, and footer if owner/admin access permits (VERIFIED gap, admin action required).
- Expand AI Brand Information with approved facts only: domain, category, audience, product categories, claim boundaries, support/contact paths, return/shipping caveats, and links to primary collections.
- Keep `sameAs` empty until official social profiles are confirmed (VERIFIED conservative schema).
- Add collection-level answer blocks for who the page is for, occasions, personalization options, claim boundary, and next steps.
- Monitor how AI crawlers and UCP/MCP discovery are represented in robots after Shopify updates (VERIFIED current discovery exists).

## First 25 Prioritized Organic-Growth Tasks

1. P0: Set homepage SEO title to `North & Pearl | Personalized Jewelry for Meaningful Moments` in Shopify admin or theme data source.
2. P0: Set homepage meta description from `content/seo/metadata-map.csv`.
3. P0: Standardize brand display name to `North & Pearl` where Shopify admin permits.
4. P0: Build a live product inventory audit for duplicate titles, thin descriptions, missing images, and unconfirmed claims.
5. P0: Confirm supplier-backed material, stone, finish, allergy, durability, care, and fulfillment facts before expanding product claims.
6. P1: Add or update unique collection descriptions for every indexed collection.
7. P1: Review `/collections/frontpage`; remove, redirect, or repurpose if legacy/thin.
8. P1: Expand AI Brand Information with internal links to collections, guides, FAQ, shipping, returns, and care.
9. P1: Add FAQ-style answer blocks to Name Necklaces, Gifts, Birthstone Jewelry, Mother's Collection, Wedding & Bridesmaids, and Couple Jewelry.
10. P1: Create a collection-to-guide internal linking matrix and implement in content.
11. P1: Differentiate duplicate product families with unique visual/occasion/value descriptions.
12. P1: Create product naming governance so future product handles/titles do not generate near duplicates.
13. P1: Add product FAQ content only where answers are product-specific and verified.
14. P1: Strengthen blog hub introduction and internal links to high-priority collections.
15. P1: Publish or refine original guides around name necklaces, gift selection, Mother's Day, bridesmaids, birthstone-inspired gifts, and anniversary gifts.
16. P1: Add image alt text rules for Shopify product media and collection images.
17. P2: Consolidate or align Organization schema to avoid conflicting brand names.
18. P2: Standardize schema context URLs to `https://schema.org`.
19. P2: Add CollectionPage schema if implemented cleanly and validated.
20. P2: Add Article schema review to blog templates and ensure published authors/dates are accurate.
21. P2: Build organic Pinterest board taxonomy and pin title/description standards.
22. P2: Build organic Shopping readiness checklist for product type, Google product category, image quality, price, availability, shipping, tax, and returns.
23. P2: Measure Core Web Vitals with Lighthouse/PageSpeed and Shopify Web Performance data.
24. P2: Review mobile collection filters/sorting for crawl-safe UX and tap target clarity.
25. P2: Connect Search Console and document baseline indexed pages, queries, impressions, and crawl issues.

## 90-Day Organic Roadmap

### Days 1-30: Foundation

- Fix homepage title/meta description and brand name consistency.
- Audit live product catalog for duplicates, thin pages, unsupported claims, missing metadata, and image issues.
- Finalize product SEO standards and collection keyword map.
- Update all priority collection descriptions and internal links.
- Expand AI Brand Information with approved source-of-truth facts and links.

### Days 31-60: Content And AEO

- Publish/refine priority gift guides with original content and internal links.
- Add collection-level FAQ answer sections to top commercial collections.
- Build FAQ answer governance for materials, shipping, returns, and personalization.
- Create organic Pinterest board and pin metadata system.
- Start Search Console monitoring and crawl/index issue tracking.

### Days 61-90: Authority And Optimization

- Differentiate duplicate product families and merge/remove weak pages where appropriate.
- Improve blog hub and guide hub navigation.
- Validate schema with rich-result testing tools.
- Measure Core Web Vitals and fix image/CSS/JS issues with theme owner coordination.
- Build organic Shopping readiness QA before any feed/channel push.

## 12-Month Authority-Building Roadmap

- Months 1-3: Technical cleanup, product/collection differentiation, source-of-truth brand facts, and launch guide cluster.
- Months 4-6: Expand recipient and occasion hubs: birthdays, anniversaries, moms, bridesmaids, couples, graduation, holidays, self-gifting.
- Months 7-9: Build material/care education only after supplier facts are confirmed; add comparison content with careful claim boundaries.
- Months 10-12: Develop evergreen authority assets: personalization idea library, gift inscription ideas, collection buying guides, Pinterest seasonal refreshes, and structured answer updates.

## Safe Reversible Improvements Implemented

- Added this dated organic growth audit under `content/seo/`.
- Added `content/seo/collection-keyword-intent-map.csv`.
- Added `content/seo/product-seo-standards.md`.
- Added `content/seo/internal-linking-aeo-geo-plan.md`.
- Updated `content/seo/seo-architecture.md` to reference the new operating documents.

No theme code, Shopify settings, product facts, publishing state, apps, payments, domains, or customer/account settings were changed.

## Risks And Missing Information

- Supplier-verified product materials, stones, finishes, care limits, allergy/safety claims, and fulfillment timelines are UNKNOWN.
- Search Console, analytics, rankings, traffic, conversion rate, revenue, and query data are UNKNOWN.
- Shopify admin homepage SEO settings and live product metadata source are UNKNOWN.
- Customer reviews and actual best-seller status are UNKNOWN unless Shopify sales/review data is provided.
- Product image ownership, source licensing, and quality-control status are UNKNOWN.
- Core Web Vitals field data is UNKNOWN.
- Organic Shopping readiness cannot be fully verified without product attributes, policy settings, Merchant Center/feed configuration, shipping/tax data, and owner approval.
