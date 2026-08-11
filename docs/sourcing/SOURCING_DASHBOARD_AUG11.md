# 100-Product Alibaba Expansion — Live Dashboard
**Started:** August 11, 2026
**Last updated:** August 11, 2026 (Batch 1 screened where accessible; 2 products published)

---

## PIPELINE COUNTS

| Metric | Count |
|---|---|
| Candidates Researched | 17 |
| Image/IP Screened | 3 |
| Shortlisted | 2 |
| Rejected | 0 |
| Held | 15 |
| Approved | 2 |
| Added to Shopify | 2 |
| QA Passed | 2 |
| Published | 2 |
| RED IP Rejections | 0 |
| YELLOW Reviews (pending) | 15 (1 visually screened but held for unsupported claim panels; 14 inaccessible for mandatory visual/IP screening because Alibaba returned CAPTCHA/protection pages) |
| Exact Alibaba URLs Recorded | 17 / 17 |
| Missing Supplier Information | 2 (2 candidates have incomplete capture — price or supplier not yet fully read; flagged in raw data, need a follow-up pass) |

*Real, verified count — not a target. 17 candidates found across 5 of ~10 priority categories via live Alibaba search:*
- *Birthstone ring: 4*
- *Zodiac: 3*
- *Coordinates/engraved: 4 (including one $519 candidate for the empty $100+ tier)*
- *Family/multi-name: 4*
- *Earrings: 2*

*Raw data: `docs/sourcing/batch1_candidates_raw.json`. Gate register: `docs/sourcing/aug11-batch1-gate-register.csv`. Remaining priority categories not yet researched: rings (general, non-birthstone), earrings (continued — only 2 so far against a real gap), $100+ tier (beyond the one coordinates candidate), plus none of these 17 have had image-level IP screening yet — that's the next real step before any shortlisting decision, given today's earlier lesson that title-only screening missed trademark issues that only showed up on visual inspection.*

*These are real counts for the August 11 strict sourcing pipeline, updated as work actually happens — not projected/target numbers. Target is ~100 final additions per the sprint brief; current August 11 progress is 0 until Phase 2 research produces verified candidates. This does not duplicate the earlier July 28 catalog expansion that brought the active catalog to 208 products.*

### August 11 Batch 1 Reconciliation + First Published Products

- Existing July 28 Gauss batch: 100 draft products created, 90 activated, 10 held. That work is already reflected in the 208-product active catalog and should not be repeated.
- Current August 11 batch: 17 raw candidates, 17 exact Alibaba URLs recorded, 3 image/IP screened, 2 approved and published.
- Preliminary gate register created at `docs/sourcing/aug11-batch1-gate-register.csv`.
- Published Batch 1 products:
  - `north-pearl-double-heart-birth-month-ring` — Shopify product `gid://shopify/Product/10521726877880`
  - `north-pearl-personalized-birth-month-name-ring` — Shopify product `gid://shopify/Product/10521727008952`
- Current best held candidates to visually/IP screen when Alibaba page access clears: B1-010 coordinates necklace, B1-016 personalized initial earrings, B1-008 half-moon coordinates necklace, B1-013 family multi-name necklace.

---

## PHASE STATUS

| Phase | Status | Notes |
|---|---|---|
| 1. Market opportunity + catalog gap analysis | ✅ Complete | See findings below |
| 2. Alibaba candidate research | 🔄 In progress | Testing browser accessibility first |
| 3. Supplier + IP screening | 🔄 Partial | 3/17 screened; 14 held behind Alibaba CAPTCHA/protection |
| 4. Commercial analysis | 🔄 Partial | 2 products approved with conservative pricing; landed cost still unknown |
| 5. Brand/visual review | 🔄 Partial | 2 products passed; 1 held |
| 6. Final assortment selection | 🔄 Partial | 2 selected from accessible screened items |
| 7. Shopify product creation | 🔄 Partial | 2 products created active |
| 8. Collections + merchandising | 🔄 Partial | 2 products assigned to Rings, Birthstone, Gifts, Birthday, Under $100, New Arrivals |
| 9. Technical + CX QA | 🔄 Partial | 2 products passed record/PDP/cart QA |
| 10. Live verification | 🔄 Partial | 2 live PDPs return 200 and add-to-cart/cart test passed |

---

## PHASE 1 FINDINGS — Catalog Gap Analysis

Based on the live active catalog (184 products, pulled via Admin API — the 24 unpublished RED products excluded):

### By product type (real distribution, not estimated)
| Type | Count | % of catalog |
|---|---|---|
| Necklace | 105 | 57% |
| Bracelet | 43 | 23% |
| Earrings | 16 | 9% |
| Gift Set | 11 | 6% |
| Ring | 9 | 5% |

**Finding: Necklaces are heavily over-represented. Rings and Earrings are the real category gaps.**

### By price point
| Range | Count |
|---|---|
| Under $50 | 29 |
| $50–70 | 110 |
| $70–100 | 45 |
| $100+ | **0** |

**Finding: Zero products above $100. No premium/statement price tier exists at all.**

### By theme/occasion (title + tag search across full active catalog)
| Theme | Products found |
|---|---|
| Birthstone | 0 |
| Zodiac | 0 |
| Coordinates | 0 |
| Family (multi-name) | 0 |
| Couple | 1 |
| Mother's Day | 4 |
| Friendship | 0 |
| Anniversary | 0 (occasion collection exists but pulls generic necklaces, not anniversary-specific product design) |
| Engraved (as distinct from "personalized") | 0 |

**Finding: Birthstone, zodiac, coordinates, and family jewelry are genuine, complete gaps — zero current representation despite being named as target categories in the sprint brief.**

### Resulting priority order for the 100-product expansion
Based on actual evidence, not equal category distribution:
1. **Rings** — most under-represented category, real gap
2. **Earrings** — second most under-represented
3. **Birthstone jewelry** — zero current SKUs, named target category, real demand category generally
4. **Zodiac jewelry** — zero current SKUs, real gap
5. **Coordinates jewelry** — zero current SKUs, real gap
6. **Family/multi-name jewelry** — zero current SKUs, distinct from single-name pieces already well covered
7. **$100+ tier pieces** — fills the empty premium price band, likely gift sets or statement pieces rather than more $50-70 necklaces
8. **Necklaces** — explicitly LOW priority for new additions; catalog is already saturated here. Any new necklace candidates need a strong differentiation reason (e.g., birthstone/zodiac necklace fills a theme gap even though it's still a necklace) rather than being "another name necklace."

---

## PHASE 2 STATUS: Alibaba Access Test

Testing whether the Browser tool can actually navigate and read real Alibaba.com listings before committing to this as the research method. Result will be recorded here once known.
