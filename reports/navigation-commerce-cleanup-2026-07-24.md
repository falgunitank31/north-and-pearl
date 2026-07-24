# North & Pearl Navigation Commerce Cleanup - 2026-07-24

## What Changed

- Updated Shopify `main-menu` from a flat 11-link menu to a commerce-focused hierarchy.
- Removed empty collection links from the header:
  - Men's Jewelry
  - Sale
- Added top-level menu groups:
  - Shop
  - Personalized
  - Gifts
  - New Arrivals
  - Best Sellers
  - About
- Added child links under Shop, Personalized, Gifts, and About.
- Switched desktop header menu presentation from dropdown to mega menu.

## Current Main Menu Structure

- Shop
  - All Jewelry
  - Necklaces
  - Bracelets
  - Rings
  - Earrings
- Personalized
  - Name Necklaces
  - Initial Necklaces
  - Birthstone Jewelry
  - Couple Jewelry
- Gifts
  - Gifts for Mom
  - Anniversary Gifts
  - Bridesmaid Gifts
  - Birthstone-Inspired Gifts
- New Arrivals
- Best Sellers
- About
  - Our Story
  - Jewelry Care
  - Personalized Jewelry Guide
  - FAQ

## Validation

- Shopify Admin main menu update: successful, no user errors.
- Shopify Theme Check: passed, 189 files inspected, 0 offenses.
- Myshopify storefront render: mega menu present.
- Custom domain storefront render: mega menu present.
- `/collections/mens-jewelry` removed from rendered header navigation.
- `/collections/sale` removed from rendered header navigation.

## Notes

- The word "Sale" may still appear as product-card sale badges where compare-at pricing exists. The empty Sale collection is not linked from the header.
- Men's Jewelry and Sale can be restored later when those collections have real active products.
