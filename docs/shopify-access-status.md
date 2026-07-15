# Shopify Access Status

Last updated: July 15, 2026

## Current Store

- Production store URL: `https://north-and-pearl.myshopify.com`
- Canonical Shopify admin domain discovered by CLI: `q4ydix-w1.myshopify.com`
- Live theme: Dawn `189417881784`
- Current unpublished development theme: `North & Pearl Dev - Codex` `189441802424`

## Current Access

The Shopify Admin CLI app can perform admin setup actions for products, collections, pages, navigation, policies, and themes.

Theme deployment was unblocked on July 15, 2026 after adding:

- `read_themes`
- `write_themes`

Future Shopify CLI re-auth should include theme scopes if access expires.

## Safe Deployment Rule

Codex may push approved code to an unpublished development theme.

Codex must not publish the live production theme unless the owner explicitly approves that publication.

## Rollback

All theme work should be committed to Git before deployment. Rollback should use one of:

- Shopify theme version history for a single file.
- Git revert for a committed batch.
- Re-push the last known-good theme state to the development theme.
