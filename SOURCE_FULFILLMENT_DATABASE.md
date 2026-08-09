# North & Pearl Product Source & Fulfillment Database
**Purpose:** Quick lookup for supplier URLs when orders arrive  
**Status:** Needs completion from owner's records  
**Owner:** Yagnesth  
**Last Updated:** Aug 9, 2026

---

## How to Use This Document

When a customer orders a product:
1. Find the product handle in the lookup table below
2. Use the "Supplier URL" to order the exact item from your supplier
3. Track order #, supplier order #, and delivery date
4. Fulfill to customer when stock arrives

---

## Products with Verified Source URLs

If you have the exact Alibaba product URLs for these, please provide them:

| Product Handle | Product Title | Status | Supplier URL | Order Template |
|---|---|---|---|---|
| north-pearl-initial-shell-necklace | Initial Shell Necklace | ✅ VERIFIED | [1601721496131](https://alibaba.com/p/1601721496131) | qty___, ship_date___ |
| north-pearl-heart-keepsake-necklace | Heart Keepsake Necklace | ✅ VERIFIED | [Link needed] | qty___, ship_date___ |
| north-pearl-pink-heart-bow-bracelet | Pink Heart Bow Bracelet | ✅ VERIFIED | [Link needed] | qty___, ship_date___ |
| north-pearl-clover-charm-bracelet | Clover Charm Bracelet | ✅ VERIFIED | [Link needed] | qty___, ship_date___ |
| north-pearl-personalized-nameplate-necklace | Personalized Nameplate Necklace | ✅ VERIFIED | [Link needed] | qty___, ship_date___ |
| north-pearl-twine-band-ring | Twine Band Ring | ✅ VERIFIED | [Link needed] | qty___, ship_date___ |

---

## Products with Alibaba IDs (Blocked by Protection)

**Issue:** Alibaba protection pages prevent access. Need you to verify OR provide alternate URL:

| Product Handle | Product Title | Alibaba ID | Action Needed |
|---|---|---|---|
| north-pearl-flower-nail-bangle | Flower Nail Bangle | 1601234622131 | Provide Alibaba URL or alternate supplier |
| north-pearl-sparkle-pulse-bracelet | Sparkle Pulse Bracelet | 1601403752183 | Provide Alibaba URL or alternate supplier |
| north-pearl-mixed-charm-bangle | Mixed Charm Bangle | 1601120166205 | Provide Alibaba URL or alternate supplier |
| north-pearl-dainty-flower-necklace | Dainty Flower Necklace | 1601469797456 | Provide Alibaba URL or alternate supplier |
| north-pearl-v-water-drop-jewelry-set | V Water Drop Jewelry Set | 1600828902618 | Provide Alibaba URL or alternate supplier |

---

## Products Missing Source Records

**Status:** Need source URL recovery  
**Action:** Provide Alibaba URL, alternate supplier, or mark as "hold for real photography"

| Product Handle | Product Title | Current Status | Action |
|---|---|---|---|
| north-pearl-iridescent-pendant-necklace | Iridescent Pendant Necklace | MISSING | Provide URL or remove from catalog |
| north-pearl-sparkle-accent-bracelet | Sparkle Accent Bracelet | MISSING | Provide URL or remove from catalog |
| north-pearl-bridal-water-drop-set | Bridal Water Drop Set | MISSING | Provide URL or remove from catalog |

---

## All Other Products (190+)

📋 **Status:** Needs Shopify export to complete  
**Next Step:** Once you authenticate Shopify CLI, we'll pull all 208 product records with their existing source metafields

**To Authenticate Shopify CLI:**

```bash
shopify auth login
# Select: north-and-pearl.myshopify.com
# Grant access when prompted
```

Then I can pull all 208 products and their sources automatically.

---

## Quick Order Workflow Template

When you get an order for product **[HANDLE]**:

1. **Find supplier URL** in table above
2. **Verify quantity** available at supplier
3. **Place order** with:
   - Product URL from supplier
   - Quantity needed
   - Any customization notes (color, size, engraving)
   - Shipping address to your fulfillment center or directly to customer
4. **Track it** in your order management system
5. **Fulfill** to customer when stock arrives

---

## Data We Need From You

To complete this database fully, please provide:

**Option A (Easiest):**
- CSV or spreadsheet with: `product_handle, supplier_url`
- For products without URLs, just mark as "MISSING" or "TBD"

**Option B (Manual):**
- For each Alibaba ID above, verify the URL is accessible and provide it
- For "MISSING" products, either provide source URL or confirm "remove from catalog"

**Option C (Automation):**
- Authenticate Shopify CLI so we can export all products with their metafields
- We'll auto-generate a complete database

---

## Tracking Orders from This Database

Once you have the complete source database, here's the workflow:

1. **Order arrives:** Customer buys "Pink Heart Bow Bracelet"
2. **Look up product:** Find `north-pearl-pink-heart-bow-bracelet` in database
3. **Get supplier URL:** Click link, verify product matches customer expectation
4. **Order from supplier:** Buy qty matching customer order
5. **Ship to fulfillment:** Update tracking in your system
6. **Fulfill to customer:** When stock arrives, ship with packaging

---

## Notes

- **Alibaba IDs** (1601XXXXXXX format) can sometimes be accessed via VPN or different browser
- **Verified sources** have been cross-checked against live Shopify product details
- **Missing sources** should be recovered or products should be removed from active catalog
- **Real photography** is the long-term goal; supplier sourcing is the short-term fulfillment path

---

**Last Updated:** Aug 9, 2026 at 5:30 PM  
**Next Update:** When owner provides missing URLs or Shopify CLI is authenticated

