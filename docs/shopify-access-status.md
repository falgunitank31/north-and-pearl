# Shopify Access Status

Last updated: July 15, 2026

## Current Store

- Production store URL: `https://north-and-pearl.myshopify.com`
- Canonical Shopify admin domain discovered by CLI: `q4ydix-w1.myshopify.com`
- Live theme: Dawn-based North & Pearl build
- Protected development target requested by owner: theme `189417881784`

## Current Access

The Shopify Admin CLI app can perform admin setup actions for products, collections, pages, navigation, and policies.

Theme deployment through Shopify CLI is currently blocked because the app-authenticated token does not include theme scopes.

Observed error:

```text
Missing access scope: read_themes
```

## Required Owner Action

In the Shopify Dev Dashboard app used for North & Pearl, add and release these scopes:

- `read_themes`
- `write_themes`

After releasing the app version, re-run Shopify CLI store auth with the existing admin scopes plus the theme scopes.

Recommended command:

```sh
npx @shopify/cli@latest store auth --store q4ydix-w1.myshopify.com --scopes read_products,write_products,read_content,write_content,read_online_store_navigation,write_online_store_navigation,read_legal_policies,write_legal_policies,read_themes,write_themes
```

## Safe Deployment Rule

Codex may push approved code to an unpublished development theme.

Codex must not publish the live production theme unless the owner explicitly approves that publication.

## Rollback

All theme work should be committed to Git before deployment. Rollback should use one of:

- Shopify theme version history for a single file.
- Git revert for a committed batch.
- Re-push the last known-good theme state to the development theme.
