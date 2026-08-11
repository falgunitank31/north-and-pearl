# 100-Product Alibaba Expansion — Live Dashboard
**Started:** August 11, 2026
**Last updated:** August 11, 2026 (Batch 4 started; 5 total strict-sourced products published)

---

## PIPELINE COUNTS

| Metric | Count |
|---|---|
| Candidates Researched | 31 |
| Image/IP Screened | 10 |
| Shortlisted | 5 |
| Rejected | 1 |
| Held | 26 |
| Approved | 5 |
| Added to Shopify | 5 |
| QA Passed | 5 |
| Published | 5 |
| RED IP Rejections | 1 |
| YELLOW Reviews / Held (pending) | 26 (held for CAPTCHA/protection, insufficient image evidence, duplicate risk, incomplete supplier evidence, or claim-sensitive public-image risk) |
| Exact Alibaba URLs Recorded | 31 / 31 |
| Missing Supplier Information | 5+ (several public-web candidates have incomplete supplier profile confirmation and remain held or marked incomplete until the source page is fully accessible) |

*Real, verified count — not a target. Current August 11 strict expansion records include Batch 1 live-search candidates plus Batch 2-4 public-web exact Alibaba listings. Raw/source files include `docs/sourcing/batch1_candidates_raw.json`, `docs/sourcing/batch2_public_web_candidates_aug11.json`, `docs/sourcing/batch3_public_web_candidates_aug11.json`, and `docs/sourcing/batch4_public_web_candidates_aug11.json`. Gate registers are maintained per batch in `docs/sourcing/aug11-batch*-gate-register.csv`.*

*The current process intentionally favors fewer publish-ready products over bulk clutter: exact Alibaba URL, image/IP evidence, duplicate control, claim-safe copy, source metafields, and live PDP/cart QA are required before publication.*

*These are real counts for the August 11 strict sourcing pipeline, updated as work actually happens — not projected/target numbers. Target is ~100 final additions per the sprint brief; current August 11 progress is 0 until Phase 2 research produces verified candidates. This does not duplicate the earlier July 28 catalog expansion that brought the active catalog to 208 products.*

### August 11 Batch 1 Reconciliation + First Published Products

- Existing July 28 Gauss batch: 100 draft products created, 90 activated, 10 held. That work is already reflected in the 208-product active catalog and should not be repeated.
- Current August 11 batch: 17 raw candidates, 17 exact Alibaba URLs recorded, 3 image/IP screened, 2 approved and published.
- Preliminary gate register created at `docs/sourcing/aug11-batch1-gate-register.csv`.
- Published Batch 1 products:
  - `north-pearl-double-heart-birth-month-ring` — Shopify product `gid://shopify/Product/10521726877880`
  - `north-pearl-personalized-birth-month-name-ring` — Shopify product `gid://shopify/Product/10521727008952`
- Current best held candidates to visually/IP screen when Alibaba page access clears: B1-010 coordinates necklace, B1-016 personalized initial earrings, B1-008 half-moon coordinates necklace, B1-013 family multi-name necklace.

### August 11 Batch 2 Progress

- Batch 2 public-web discovery captured 8 additional exact Alibaba listing URLs.
- 12 original/source images downloaded for image/IP screening where public image URLs were available.
- Published Batch 2 product:
  - `north-pearl-zodiac-wish-card-necklace` — Shopify product `gid://shopify/Product/10521732939960`
- Live QA passed: 12 zodiac variants, 5 images ready, canonical present, customer-facing copy clean, and add-to-cart/cart confirmed with Pisces variant.
- Held candidates: B2-001 duplicate-risk ring; B2-003 limited-image evidence; B2-004 through B2-008 missing full image/IP screening evidence.

### August 11 Batch 3 Progress

- Batch 3 public-web discovery captured 3 more exact Alibaba listing URLs and 7 source images.
- Published Batch 3 product:
  - `north-pearl-family-birth-month-heart-necklace` — Shopify product `gid://shopify/Product/10521736937656`
- Live QA passed: PDP renders, 3 images ready, canonical present, customer-facing copy clean, personalization property reached cart, and no unsupported public claims detected.
- Rejected/held B3-002 because all available images contain visible XUPING logo/website watermark.
- Held B3-003 because only one image is available and initial necklaces are not a priority gap.

### August 11 Batch 4 Progress

- Batch 4 public-web discovery captured 3 more exact Alibaba listing URLs and 4 source images.
- Published Batch 4 product:
  - `north-pearl-birth-flower-pendant-necklace` — Shopify product `gid://shopify/Product/10521737658552`
- Live QA passed: 12 birth-month variants, 3 images ready, canonical present, customer-facing copy clean, May variant reached cart, and no unsupported public claims detected.
- One claim-sensitive specification image was intentionally excluded because it visibly contained unverified material/plating claims.
- Held B4-002 and B4-003 because exact URLs were captured but public image evidence was insufficient for mandatory IP screening.

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
