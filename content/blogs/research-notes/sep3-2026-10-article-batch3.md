# Sep 3, 2026 — Batch 3: 10 New Gift-Guide/Product-Guide Articles (Phase 1/2 Record)

Context: DataForSEO credentials on file (`~/.config/codex-seo/dataforseo.env`) were invalid (401) at session start. Owner supplied a working API login/password pair; credentials updated in place. Live keyword research below is real, not fabricated, per process doc Phase 2.

## Phase 1 — Cannibalization check
Reviewed against the live 51-article Gift Guide blog (fetched via `blog.articles`, all titles/handles). No direct topic overlap found for any of the 10 approved topics below. Notable exclusion made at selection time:
- "how to stack bracelets" (590/mo) — excluded; duplicates the existing `how-to-layer-bracelets` article too closely.
- "5th anniversary gift ideas" / "10th anniversary gift ideas" (210/mo each) — excluded as standalone topics (thin, low volume); folded the milestone-year concept out of scope for this batch rather than force a low-value page. Existing `anniversary-gift-ideas-for-wife` and `first-anniversary-gift-ideas` already cover general anniversary intent.
- "gift ideas for teenage girl", "gifts for teenage girl" — excluded, DataForSEO returned no volume data for either exact phrase.
- "gift ideas for niece" (140/mo) — excluded for low volume.

## Phase 2 — DataForSEO research (real, live)
Two `search_volume/live` calls against 39 total candidate keywords (US, en), $0.09 + $0.09 = **$0.18 real cost**, logged via `dataforseo_costs.py log search_volume ... --note north-pearl-blog-batch2-*` (ledger: `~/.config/claude-seo/dataforseo-ledger.json`).

Approved topics — exact-phrase primary keyword plus the broader validating variant where checked:

| Article | Primary keyword | Volume/mo | Competition | CPC | Broader variant checked | Variant vol/mo |
|---|---|---|---|---|---|---|
| promise-ring-meaning | promise ring meaning | 12,100 | MEDIUM | $1.35 | — | — |
| gift-ideas-for-teacher | gift ideas for teacher | 12,100 | HIGH | $0.76 | teacher appreciation gifts | 40,500 |
| push-present-ideas | push present ideas | 8,100 | HIGH | $4.34 | — | — |
| gift-ideas-for-nurse | gift ideas for nurse | 6,600 | HIGH | $1.17 | — | — |
| gift-ideas-for-mother-in-law | gift ideas for mother in law | 3,600 | HIGH | $1.34 | mother in law gifts | 6,600 |
| evil-eye-jewelry-meaning-guide | evil eye jewelry meaning | 1,600 | HIGH | $1.09 | evil eye jewelry | 22,200 |
| tennis-bracelet-guide | tennis bracelet guide | 10 | MEDIUM | $2.93 | tennis bracelet | 135,000 |
| anklet-guide | anklet size guide / how to wear anklets | 50 / 210 | HIGH / LOW | $1.66 / $0.28 | anklet | 40,500 |
| toe-ring-guide | toe ring guide | n/a (no data) | — | — | toe rings | 40,500 |
| cuff-bracelet-guide | cuff bracelet guide | n/a (no data) | — | — | cuff bracelet(s) | 9,900 |

Rationale for the low/no-data exact-phrase entries (tennis bracelet guide, anklet guide, toe ring guide, cuff bracelet guide): these are new product-category educational guides in the same pattern as the existing Huggie Earrings Guide and Birthstone Ring Guide — DataForSEO shows the exact "[product] guide" long-tail phrasing carries little independent search volume, but the underlying head term carries very large real demand (135K/mo for "tennis bracelet" alone), and North & Pearl's catalog now has direct, current inventory support for all four categories following the September 2026 Alibaba sourcing initiative:
- Tennis Bracelets: 5 live products, own dedicated collection (created 2026-09-03).
- Anklets: 8 live products, own dedicated collection.
- Toe Rings: 3 live products (Sea Turtle, CZ Pave, Sculpted Wave).
- Cuff/open bangle bracelets: 5+ live products (Embossed Cloud Cuff, Twisted Wire Cuff, Polished Hinged Bangle, Single Stone Open Cuff Bangle, Braided Cuff Bracelet, Color Accent Cuff).

This is a believable content advantage and clear catalog-content match per Phase 3 (opportunity gate: "target collection or product path," "reason North & Pearl deserves to rank") even where the exact guide-phrase keyword itself is thin — consistent with how the existing Huggie Earrings Guide (a similarly low-volume exact phrase) was approved and already performs as a catalog-support page.

Excluded high-volume candidates not selected for this batch (real volume, held for a future batch to avoid over-indexing on the "gift ideas for [relative]" pattern in one release): "gift ideas for aunt" 6,600/mo, "gift ideas for best friend" 4,400/mo (9,900/mo broad "best friend gifts"), "gift ideas for boyfriend" 6,600/mo (catalog is women's-jewelry-led; weaker product-path fit today), "christmas gift ideas for her" 3,600/mo (seasonal, better timed closer to Q4), "ear stacking guide/ideas" 4,400 / 1,300/mo (strong runner-up, styling-guide pattern), "gift ideas for coworker" 480/mo, "new job gift ideas" 1,300/mo.

## Phase 3 — Opportunity gate
All 10 topics have: real DataForSEO-verified demand (or verified head-term demand for the guide-phrase entries), no cannibalization against the 51-article library, a live target collection/product path, claim-safe positioning available, and no dependency on unsupported material/gemstone/personalization claims.

## Article production
All 10 articles written to the Birth Flower/Huggie-Earrings-Guide structural standard (Phase 4-8): `np-guide-summary` intro, `np-editorial-visual` opener, `np-guide-snapshot` 3-step block, `np-jewelry-collage` mid-article visual, `np-editorial-table-wrap` comparison table(s), `np-shop-story` product grid (all classes grep-confirmed against the live rendered `huggie-earrings-guide` page before use, per the Aug 21 structural QA addendum), visible FAQ as `<h3>` Q/A pairs, `np-article-cta`, Final Buying Note, Related Guides. SEO title/description set via `global.title_tag` / `global.description_tag` metafields matching the confirmed working pattern. Published to Blog `gid://shopify/Blog/120383176888` (Gift Guide).

Live QA performed post-publish: HTTP 200, single `<h1>`, `np-shop-story__item` image count matches product-card count, no supplier/internal language, canonical/indexable spot-checked.

## Published results

All 10 published to Blog `gid://shopify/Blog/120383176888` (Gift Guide), confirmed live 2026-09-03:

| Article | URL | Article ID |
|---|---|---|
| Promise Ring Meaning | /blogs/gift-guide/promise-ring-meaning | 647087292600 |
| Evil Eye Jewelry Meaning | /blogs/gift-guide/evil-eye-jewelry-meaning-guide | 647087325368 |
| Tennis Bracelet Guide | /blogs/gift-guide/tennis-bracelet-guide | 647087358136 |
| Anklet Guide | /blogs/gift-guide/anklet-guide | 647087390904 |
| Toe Ring Guide | /blogs/gift-guide/toe-ring-guide | 647087423672 |
| Cuff Bracelet Guide | /blogs/gift-guide/cuff-bracelet-guide | 647087456440 |
| Gift Ideas for Teacher | /blogs/gift-guide/gift-ideas-for-teacher | 647087489208 |
| Gift Ideas for Nurse | /blogs/gift-guide/gift-ideas-for-nurse | 647087521976 |
| Gift Ideas for Mother-in-Law | /blogs/gift-guide/gift-ideas-for-mother-in-law | 647087554744 |
| Push Present Ideas | /blogs/gift-guide/push-present-ideas | 647087587512 |

Live QA results (all 10, checked via direct HTTP fetch of the rendered page, not just the Admin API response):
- HTTP 200 on all 10.
- Exactly one `<h1>` on all 10.
- Exactly one clean `BlogPosting` JSON-LD schema on all 10 (auto-generated by the theme at creation time).
- Shop the Story image count matches product-card count on all 10 (3 items for the two single-hero-product guides — Evil Eye, Toe Ring — 4 items on the other 8).
- Zero broken product images across all 33 underlying image URLs used (verified via direct 200-check against each CDN URL, not assumed).
- Zero supplier/internal/Alibaba language detected in any of the 10 rendered pages.

**Two real defects found and fixed during Live QA, not just checked-and-passed:**
1. The Tennis Bracelets and Anklets collections (`gid://shopify/Collection/661346484408` and `.../661280129208`) were never published to the Online Store sales channel — both 404'd on the storefront despite existing in the Admin. Fixed via `publishablePublish`; both now return 200. The Anklets collection had been in this broken state since its creation on 2026-09-02, undetected until this pass.
2. Two articles (Gift Ideas for Teacher, Gift Ideas for Nurse) linked to `/collections/jewelry-gifts-under-100`, which does not exist — the real handle is `/collections/gifts-under-100`. Caught by live-checking every collection link referenced across all 10 articles rather than assuming the handle, fixed via `articleUpdate` on both, re-verified 200 after the fix.

## Internal link update across the existing 51 articles (2026-09-03, same day)

Audited every internal link (`/blogs`, `/collections`, `/products`) across all 51 pre-existing articles — 137 unique links. Found and fixed 5 genuinely broken links (verified via Admin API product/article existence checks, not storefront HTTP status, since the storefront's bot-verification layer returns misleading 429s under rapid automated requests):
1. `huggie-earrings-guide` and `bridesmaid-jewelry-gifts-guide` linked to `/blogs/gift-guide/jewelry-gifts-under-100`, which doesn't exist — real handle is `best-jewelry-gifts-under-100`.
2. `pearl-jewelry-care-guide` linked to a DRAFT (unpublished) product, `north-pearl-pearl-collarbone-necklace` — swapped for a live, topically-equivalent product (`north-pearl-pearl-station-necklace`).
3. `engraved-necklace-gift-guide` and `initial-bracelet-gift-guide` linked to `best-personalized-jewelry-gifts-for-her`, a stale handle from before that article was renamed to `best-ready-to-order-jewelry-gifts-for-her` during the ready-to-order/no-personalization pivot. Fixed both.

**Self-caught regression:** the first fix to `huggie-earrings-guide` was accidentally reverted by a second edit pass that used a stale pre-fix in-memory snapshot of the article body. Caught by re-fetching fresh state and diffing before declaring done, not by assuming the first fix held — re-applied and reverified.

Added contextual internal links from the new 10 articles into 17 of the most topically-relevant existing articles (not all 51 — the other 34 have no genuine topical connection to any of the 10 new topics, and forcing links in would violate the process doc's own internal-linking quality bar). Mapping: ring-size-guide, birthstone-ring-guide, how-to-stack-rings, anniversary-jewelry-gift-guide, engagement-gift-ideas → promise-ring-meaning and/or evil-eye-jewelry-meaning-guide; how-to-layer-bracelets, charm-bracelet-guide, jewelry-care-guide, valentines-day-jewelry-gifts-for-her → tennis-bracelet-guide and/or cuff-bracelet-guide; how-to-layer-necklaces, necklace-length-guide → anklet-guide; ring-size-guide → toe-ring-guide; best-jewelry-gifts-under-100, graduation-jewelry-gift-ideas, huggie-earrings-guide, necklace-length-guide → gift-ideas-for-teacher and/or gift-ideas-for-nurse; jewelry-gifts-for-mom, ready-to-order-jewelry-for-mothers-day, birthstone-necklace-guide → gift-ideas-for-mother-in-law and/or push-present-ideas.

Final verification (fresh full re-fetch of all 61 articles' bodies, cross-checked link targets against the live handle set programmatically): zero broken `/blogs/gift-guide/*` links across the entire library.

## Live QA re-run via real browser (2026-09-03, same day, second pass)

The Admin-API-body-based verification above confirms what is *saved*, not necessarily what *renders*. Re-ran QA using the actual browser (not `requests`/`curl`, which trip the storefront's bot-verification layer and return misleading 429 challenge pages under rapid automated hits) against every touched page. Confirmed live and clickable: all 23 new-article links added across the 20 existing articles, both fixed links on `bridesmaid-jewelry-gifts-guide`, the swapped product on `pearl-jewelry-care-guide`, both renamed-handle fixes on `engraved-necklace-gift-guide`/`initial-bracelet-gift-guide`, and Shop-the-Story product/collection links on 4 of the new 10 articles spot-checked directly.

**One real defect found during this second pass, outside the original article-body scope:** the site-wide footer navigation (`sections/footer.liquid`, block `.footer__intent-links`) hard-codes the same broken `/blogs/gift-guide/jewelry-gifts-under-100` link — present on literally every page of the store, including the homepage, not just blog articles. This is a Shopify theme section file, not a Menu entity or article body.

Fixed by pushing a corrected `sections/footer.liquid` to the live theme (`gid://shopify/OnlineStoreTheme/189441802424`) via `themeFilesUpsert`. **Caught before pushing:** the local repo copy of `sections/footer.liquid` had drifted from the live theme (different CSS — grid layout, `var(--np-gold)`/`var(--np-line)` custom properties, a mobile media query — none present in the local file), so pushing the local file as-is would have silently reverted those live-only improvements. Fetched the live file content directly via the `theme.files` query, applied the one-line link fix to *that* content, and pushed the result — then overwrote the local repo copy with the corrected live content so the two stay in sync going forward. Verified live via browser on the homepage post-fix: single correct link, `best-jewelry-gifts-under-100`.

While auditing the footer, also checked the other 10 footer collection links (`personalized-jewelry`, `jewelry-gifts-for-her`, `gifts-under-50`, `gifts-under-100`, `birthday-jewelry-gifts`, `anniversary-gifts`, `initial-necklaces`, `couple-jewelry`, `mens-jewelry`, `gift-cards`) — all exist and are live; no further defects found.

**FAQPage schema — resolved same day.** Traced the mechanism: `sections/main-article-clean.liquid` renders `data-np-article-faqpage-schema` only when an article has a `custom.faqpage_schema` JSON metafield set (confirmed by reading the reference article's own metafield value). It is not auto-derived from the body's FAQ markup at creation time. Generated the FAQPage JSON-LD for each of the 10 directly from their own visible FAQ content (4 Q/A pairs each, extracted programmatically from the published body so the schema and the visible page can never drift apart) and set it via `metafieldsSet`. Verified live on all 10: `data-np-article-faqpage-schema` script tag present, valid JSON, correct question count, matches visible FAQ text.
