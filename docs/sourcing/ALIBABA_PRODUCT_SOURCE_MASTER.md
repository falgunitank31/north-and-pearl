# Alibaba Product Source Master
**Purpose:** When a North & Pearl order arrives for a sourced item, this record must allow immediate identification of the exact Alibaba listing, supplier, and specification — no re-research at fulfillment time.

**Status legend:** VERIFIED (confirmed by direct observation) | SUPPLIER CLAIM (stated by supplier, not independently confirmed) | INFERENCE (reasonable assumption, not stated) | UNKNOWN (not yet determined)

---

## How to read this file
Each product gets one full record block. Do not compress records into a table — sourcing details need room, and this file is optimized for fulfillment-time lookup (search for the North & Pearl handle), not for browsing.

## Companion file
`docs/sourcing/alibaba-product-source-master.csv` — same data in flat form for spreadsheet use. This .md file is the source of truth if the two ever disagree; update both together.

---

## RECORDS

*(No August 11 products approved and added yet — this file will be populated as Phase 2 onward produces verified, approved candidates. See `docs/sourcing/SOURCING_DASHBOARD_AUG11.md` for live pipeline counts. Batch 1 raw candidates are now staged in `docs/sourcing/aug11-batch1-gate-register.csv`; they are not approved products.)*

---

## RECORD TEMPLATE (for reference — copy this block per product once approved)

```
### [North & Pearl Product Name]
- North & Pearl Product ID:
- North & Pearl Handle:
- Classification: HERO / CORE / SUPPORTING / EXPERIMENTAL

**Sourcing**
- Supplier (company name):
- Alibaba Listing Title:
- EXACT Alibaba Product URL:
- Alibaba Listing/Product ID:
- Supplier Profile URL:
- Supplier SKU/Model Number:
- Supplier Location:
- Years on Alibaba: [VERIFIED/SUPPLIER CLAIM/UNKNOWN]
- Verified Supplier Status: [VERIFIED/SUPPLIER CLAIM/UNKNOWN]
- Trade Assurance: [VERIFIED/SUPPLIER CLAIM/UNKNOWN]

**Selected Specification**
- Variant Selected:
- Finish Selected:
- Size Selected:
- Customization Selected:
- Packaging Selected:

**Cost**
- Unit Cost: [VERIFIED/SUPPLIER CLAIM]
- MOQ:
- Sample Price (if available):
- Estimated Shipping Cost: [INFERENCE unless quoted]
- Estimated Landed Cost:
- Recommended Retail Price:
- Expected Gross Margin:

**Risk & Verification**
- IP Risk Status: GREEN / YELLOW / RED
- IP Risk Notes:
- Verification Status: [what was actually checked]
- Last Verified Date:
- Notes:
```
