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

### North & Pearl Double Heart Birth Month Ring
- North & Pearl Product ID: `gid://shopify/Product/10521726877880`
- North & Pearl Handle: `north-pearl-double-heart-birth-month-ring`
- Classification: CORE

**Sourcing**
- Supplier (company name): Shenzhen Lan Shang Jewelry Co.,ltd.
- Alibaba Listing Title: Fine 925 Silver Ring CZ Double Heart 12 Month Birthstone Rings Adjustable for Women Jewelry Gifts
- EXACT Alibaba Product URL: https://www.alibaba.com/product-detail/Fine-925-Silver-Ring-CZ-Double_1601447882726.html
- Alibaba Listing/Product ID: `1601447882726`
- Supplier Profile URL: https://szlanshang.en.alibaba.com/company_profile.html
- Supplier SKU/Model Number: UNKNOWN
- Supplier Location: UNKNOWN
- Years on Alibaba: UNKNOWN
- Verified Supplier Status: UNKNOWN
- Trade Assurance: UNKNOWN

**Selected Specification**
- Variant Selected: Adjustable ring with heart-shaped birth-month color accent
- Finish Selected: Silver-tone appearance shown in source imagery; exact material/finish unverified
- Size Selected: Adjustable style shown by source listing
- Customization Selected: Birth-month/color accent selected through personalization field
- Packaging Selected: UNKNOWN

**Cost**
- Unit Cost: `$12.38` [SUPPLIER CLAIM/listing price]
- MOQ: 2 pieces
- Sample Price (if available): UNKNOWN
- Estimated Shipping Cost: UNKNOWN
- Estimated Landed Cost: UNKNOWN
- Recommended Retail Price: `$59.00`
- Expected Gross Margin: UNKNOWN until freight, packaging, payment, and fulfillment costs are verified

**Risk & Verification**
- IP Risk Status: GREEN
- IP Risk Notes: No visible third-party branding, designer monograms, watermarks, or unrelated trademark marks found in the six retrieved source images.
- Verification Status: Source URL recorded; supplier name/profile recorded; 6 source images retrieved at 1001px; public copy stripped of 925 silver, CZ, gemstone, waterproof, tarnish, hypoallergenic, and durability claims.
- Last Verified Date: 2026-08-11
- Notes: Published with neutral "birth-month color accent" language. Internal Shopify metafields store the supplier URL, supplier name, listing ID, profile URL, selected variant, and verification status.

### North & Pearl Personalized Birth Month Name Ring
- North & Pearl Product ID: `gid://shopify/Product/10521727008952`
- North & Pearl Handle: `north-pearl-personalized-birth-month-name-ring`
- Classification: CORE

**Sourcing**
- Supplier (company name): Yiwu Qingyuan Jewelry Co., Ltd.
- Alibaba Listing Title: Custom Name Birthstone Ring Personalized Engraved Jewelry 12 Month Gemstone Gold Tone Statement Gift
- EXACT Alibaba Product URL: https://www.alibaba.com/product-detail/Custom-Name-Birthstone-Ring-Personalized-Engraved_1601911389893.html
- Alibaba Listing/Product ID: `1601911389893`
- Supplier Profile URL: https://viviantra.en.alibaba.com/company_profile.html
- Supplier SKU/Model Number: UNKNOWN
- Supplier Location: UNKNOWN
- Years on Alibaba: UNKNOWN
- Verified Supplier Status: UNKNOWN
- Trade Assurance: UNKNOWN

**Selected Specification**
- Variant Selected: Gold-tone name ring with birth-month color accent and available sizing
- Finish Selected: Gold-tone appearance shown in source imagery; exact material/finish unverified
- Size Selected: Customer enters preferred size in personalization field; source image references sizes 6-10
- Customization Selected: Name/word, ring size, and birth-month/color accent entered through personalization field
- Packaging Selected: UNKNOWN

**Cost**
- Unit Cost: `$2.74-3.46`; also listed `$3.43-4.33` [SUPPLIER CLAIM/listing price]
- MOQ: 1 piece
- Sample Price (if available): UNKNOWN
- Estimated Shipping Cost: UNKNOWN
- Estimated Landed Cost: UNKNOWN
- Recommended Retail Price: `$64.00`
- Expected Gross Margin: UNKNOWN until freight, packaging, payment, and fulfillment costs are verified

**Risk & Verification**
- IP Risk Status: GREEN
- IP Risk Notes: No visible third-party branding, designer monograms, watermarks, or unrelated trademark marks found in the six retrieved source images.
- Verification Status: Source URL recorded; supplier name/profile recorded; 6 source images retrieved at 1254-1600px; public copy stripped of gemstone, material, waterproof, tarnish, hypoallergenic, and durability claims.
- Last Verified Date: 2026-08-11
- Notes: Published with neutral "birth-month inspired color accent" language. Internal Shopify metafields store the supplier URL, supplier name, listing ID, profile URL, selected variant, and verification status.

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
