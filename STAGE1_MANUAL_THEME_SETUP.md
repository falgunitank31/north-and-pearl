# Stage 1: Manual Theme Setup (Internal Links + Schema)

**Status:** Collection SEO + Homepage ✅ DEPLOYED
**Remaining:** Theme edits (internal links + FAQPage schema)

---

## What's Deployed ✅

```
✓ Homepage title + meta description
✓ 8 collection titles + meta descriptions:
  - name-necklaces
  - initial-necklaces
  - birthstone-jewelry
  - personalized-jewelry
  - jewelry-gifts-for-her
  - gifts-under-50
  - gifts-under-100
  - birthday-jewelry-gifts
```

These are **live now** in Shopify.

---

## What Needs Manual Setup ⏳

### Option A: Use Shopify Theme Editor (Easiest)

1. **Login to Shopify Admin**
   ```
   https://q4ydix-w1.myshopify.com/admin
   ```

2. **Go to Online Store → Themes**

3. **Click "Customize" on your live theme**

4. **Find Collection Template**
   - Click **Collection** in sidebar
   - Scroll to bottom
   - Click **"Add section"**

5. **Add Custom HTML section**
   - Search for "Custom liquid" or "HTML"
   - Click to add

6. **Paste Internal Links Snippet**

Copy this code and paste into the custom liquid section:

```liquid
<!-- Related Collections Links - Stage 1 SEO -->
<div class="related-collections-section" style="margin-top: 3rem; padding: 2rem 0; border-top: 1px solid #e5e5e5;">
  <h3 style="font-size: 1.25rem; margin-bottom: 1.5rem;">Explore More</h3>
  
  {% if collection.handle == 'name-necklaces' %}
    <ul style="list-style: none; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
      <li><a href="/collections/personalized-jewelry">← All Personalized Jewelry</a></li>
      <li><a href="/collections/initial-necklaces">Initial Necklaces</a></li>
      <li><a href="/collections/birthstone-jewelry">Birthstone Jewelry</a></li>
      <li><a href="/collections/jewelry-gifts-for-her">Jewelry Gifts for Her</a></li>
    </ul>
  {% elsif collection.handle == 'initial-necklaces' %}
    <ul style="list-style: none; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
      <li><a href="/collections/personalized-jewelry">← All Personalized Jewelry</a></li>
      <li><a href="/collections/name-necklaces">Name Necklaces</a></li>
      <li><a href="/collections/jewelry-gifts-for-her">Jewelry Gifts for Her</a></li>
      <li><a href="/collections/birthday-jewelry-gifts">Birthday Gifts</a></li>
    </ul>
  {% elsif collection.handle == 'birthstone-jewelry' %}
    <ul style="list-style: none; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
      <li><a href="/collections/personalized-jewelry">← All Personalized Jewelry</a></li>
      <li><a href="/collections/jewelry-gifts-for-her">Jewelry Gifts for Her</a></li>
      <li><a href="/collections/gifts-under-100">Gifts Under $100</a></li>
      <li><a href="/collections/birthday-jewelry-gifts">Birthday Gifts</a></li>
    </ul>
  {% elsif collection.handle == 'personalized-jewelry' %}
    <ul style="list-style: none; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
      <li><a href="/collections/name-necklaces">Name Necklaces</a></li>
      <li><a href="/collections/initial-necklaces">Initial Necklaces</a></li>
      <li><a href="/collections/birthstone-jewelry">Birthstone Jewelry</a></li>
      <li><a href="/collections/jewelry-gifts-for-her">Jewelry Gifts for Her</a></li>
    </ul>
  {% elsif collection.handle == 'jewelry-gifts-for-her' %}
    <ul style="list-style: none; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
      <li><a href="/collections/personalized-jewelry">← All Personalized Jewelry</a></li>
      <li><a href="/collections/name-necklaces">Name Necklaces</a></li>
      <li><a href="/collections/birthday-jewelry-gifts">Birthday Gifts</a></li>
      <li><a href="/collections/gifts-under-100">Gifts Under $100</a></li>
    </ul>
  {% elsif collection.handle == 'gifts-under-50' or collection.handle == 'gifts-under-100' %}
    <ul style="list-style: none; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
      <li><a href="/collections/jewelry-gifts-for-her">← Jewelry Gifts for Her</a></li>
      <li><a href="/collections/name-necklaces">Name Necklaces</a></li>
      <li><a href="/collections/personalized-jewelry">Personalized Jewelry</a></li>
      <li><a href="/collections/birthday-jewelry-gifts">Birthday Gifts</a></li>
    </ul>
  {% elsif collection.handle == 'birthday-jewelry-gifts' %}
    <ul style="list-style: none; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
      <li><a href="/collections/jewelry-gifts-for-her">← Jewelry Gifts for Her</a></li>
      <li><a href="/collections/name-necklaces">Name Necklaces</a></li>
      <li><a href="/collections/gifts-under-100">Gifts Under $100</a></li>
      <li><a href="/collections/birthstone-jewelry">Birthstone Jewelry</a></li>
    </ul>
  {% endif %}
</div>
```

7. **Click "Save"**

---

### Option B: Use Shopify Admin API (Programmatic)

I can deploy via API if you confirm theme auth is set up. Let me know if you want this approach.

---

## Adding FAQPage Schema

### In Theme Editor

1. **Go to Online Store → Themes → Customize**

2. **Click theme code (</> icon)**

3. **Find `theme.liquid`** in the left sidebar

4. **Add before closing `</head>` tag:**

```liquid
<!-- FAQPage Schema - Stage 1 SEO -->
{% if collection.handle == 'name-necklaces' %}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a custom name necklace?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A custom name necklace is personalized jewelry where any name or word is engraved or stamped onto the pendant. At North & Pearl, each name necklace is handcrafted in gold, silver, or rose gold and arrives gift-ready."
      }
    },
    {
      "@type": "Question",
      "name": "Are name necklaces good gifts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Name necklaces make meaningful gifts for birthdays, anniversaries, Mother's Day, graduations, and any occasion. Personalization makes them unique and memorable. All orders include gift wrapping and free US shipping."
      }
    },
    {
      "@type": "Question",
      "name": "Can I customize the style of my name necklace?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Choose from script, block, or minimal lettering. Select your metal (gold, silver, rose gold), and add optional charms, birthstones, or coordinates. Each necklace is made-to-order."
      }
    },
    {
      "@type": "Question",
      "name": "How long does personalization take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Personalization is included at no extra cost. Most orders ship within 5-7 business days. Express shipping available. Check your order confirmation for exact delivery date."
      }
    },
    {
      "@type": "Question",
      "name": "What metals are available?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer 14K gold, sterling silver, and rose gold. All metals are tarnish-resistant and designed for everyday wear. Each necklace is handcrafted and arrives with care instructions."
      }
    }
  ]
}
</script>
{% elsif collection.handle == 'birthstone-jewelry' %}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a birthstone?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A birthstone is a gemstone associated with a person's birth month. Birthstone jewelry makes meaningful gifts by connecting the wearer to their birth month. At North & Pearl, we offer birthstone-inspired necklaces, bracelets, and rings."
      }
    },
    {
      "@type": "Question",
      "name": "What are all 12 birthstones?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "January: Garnet | February: Amethyst | March: Aquamarine | April: Diamond | May: Emerald | June: Pearl | July: Ruby | August: Peridot | September: Sapphire | October: Tourmaline | November: Topaz | December: Blue Topaz"
      }
    },
    {
      "@type": "Question",
      "name": "Are birthstone necklaces good gifts for mothers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Birthstone necklaces are popular Mother's Day gifts. Many moms wear necklaces featuring their children's birthstones. Personalization and custom metal options make each piece unique and meaningful."
      }
    },
    {
      "@type": "Question",
      "name": "Can I customize birthstone jewelry?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Each birthstone necklace can be customized with your choice of metal, stone color, and engraving. Gift wrapping and personalization are included."
      }
    }
  ]
}
</script>
{% elsif collection.handle == 'personalized-jewelry' %}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does personalized jewelry mean?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Personalized jewelry is custom-made with names, initials, dates, or coordinates engraved onto the piece. At North & Pearl, personalization is free and included with every order."
      }
    },
    {
      "@type": "Question",
      "name": "Why buy personalized jewelry?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Personalized jewelry makes meaningful gifts for any occasion. It shows thoughtfulness and creates a keepsake. Whether it's a name necklace for a baby, birthstone ring for a mother, or coordinates necklace for an anniversary, personalization adds sentimental value."
      }
    },
    {
      "@type": "Question",
      "name": "Is personalization free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Free personalization is included with every piece at North & Pearl. Choose custom names, initials, dates, coordinates, or birthstones. Free US shipping included."
      }
    },
    {
      "@type": "Question",
      "name": "What types of personalization are available?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Options include: Custom names, initials, dates, coordinates, birthstones, engravings, and charms. Mix and match styles to create your unique piece."
      }
    },
    {
      "@type": "Question",
      "name": "How do I place a personalized order?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Choose your piece, select your metal and style, enter your personalization details, and review before checkout. Our team hand-crafts each order. Delivery typically takes 5-7 business days."
      }
    }
  ]
}
</script>
{% endif %}
```

5. **Click "Save"**

---

## Verification

After adding the theme code:

1. **Visit a collection page** (e.g., `/collections/name-necklaces`)
2. **Scroll to bottom** — Should see "Explore More" section with links
3. **Right-click → Inspect** — Check for FAQPage schema in HTML
4. **Validate schema:**
   ```
   https://schema.org/validate
   ```
   Paste the FAQPage JSON, should show 0 errors

---

## Timeline

**Already Done:**
- ✅ Homepage title + meta (live now)
- ✅ 8 collection titles + metas (live now)

**Need to Do:**
- ⏳ Internal links in theme (30 min)
- ⏳ FAQPage schema (15 min)

**Total remaining work:** ~45 minutes

---

## Ready?

Once you complete the theme edits, Stage 1 is 100% deployed and will start showing impact in 1-7 days (meta descriptions in SERP, internal links crawled by Google).

