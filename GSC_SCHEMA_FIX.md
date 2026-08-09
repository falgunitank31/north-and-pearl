# GSC Schema Error Fix - Add Return Policy to Theme

**Issue:** GSC validation failing for 2 products (Flower Jewelry Set, Water Drop Jewelry Set)  
**Root Cause:** MerchantReturnPolicy schema not rendered in HTML  
**Solution:** Add schema to product template

---

## Quick Fix (5 minutes)

### Step 1: Login to Shopify Admin

Go to: https://q4ydix-w1.myshopify.com/admin

### Step 2: Edit Theme Code

1. **Online Store** → **Themes**
2. Click **Customize** on your live theme
3. Click the code editor icon **< >** (top right)
4. Left sidebar: Search for **theme.liquid**
5. Click to open

### Step 3: Add Return Policy Schema

Find the **`</head>`** tag (near line 100-150, depending on theme size)

**BEFORE `</head>`**, add this code:

```liquid
<!-- MerchantReturnPolicy Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "MerchantReturnPolicy",
  "applicableCountry": "US",
  "returnPolicyCategory": "GENERAL_REFUND",
  "returnsAccepted": true,
  "returnShippingFeesAmount": {
    "@type": "PriceSpecification",
    "currency": "USD",
    "price": "0"
  },
  "returnableProductCategory": "ALL_PRODUCTS",
  "restockingFee": {
    "@type": "PriceSpecification",
    "currency": "USD",
    "price": "0"
  }
}
</script>
```

### Step 4: Save

Click **Save** button (top right)

### Step 5: Validate in GSC

1. Go to: https://search.google.com/search-console/
2. Select: **sc-domain:northandpearl.com**
3. Left sidebar: **Enhancements** → **Structured data**
4. Click on **Product** (with error icon)
5. Click **"Validate fix"** button
6. Google will re-crawl in 1-3 days

---

## What This Schema Does

✅ Tells Google your store accepts returns  
✅ Specifies return shipping is free ($0)  
✅ Specifies no restocking fee ($0)  
✅ Applies to all products (ALL_PRODUCTS)  
✅ Fixes the GSC validation error  

---

## Verification

After you save the theme code:

1. **Visit any product page** (e.g., `/products/north-pearl-flower-jewelry-set`)
2. **Right-click → Inspect** 
3. **Search for `MerchantReturnPolicy`** in the HTML
4. You should see the JSON-LD schema

---

## Timeline

- **5 min:** Add schema to theme
- **1-3 hours:** Google crawls updated page
- **1-3 days:** GSC validation clears error

---

## Need Help?

If you get stuck on "Find `</head>` tag":
- Use `Ctrl+F` (or `Cmd+F` on Mac) in the code editor
- Search for: `</head>`
- Add the schema RIGHT BEFORE it

The `</head>` tag looks like: `</head>`  
Nothing should come after the schema code except the `</head>` tag.

