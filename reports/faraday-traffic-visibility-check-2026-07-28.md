# Faraday Traffic Visibility Check - 2026-07-28

## Summary

GA4 is receiving North & Pearl traffic, but traffic is still very low and currently appears as Direct only in the visible GA4 Home overview.

## Verified In GA4 UI

Property visible:

- Account/property: `northandpearl`
- Measurement ID known in project: `G-14KCZE935H`

Visible GA4 Home overview, last 7 days:

- Active users: 9
- New users: 9
- Sessions: 23
- Event count: 394
- Key events: 0
- Active users in last 30 minutes: 0
- First user source / medium: `(direct) / (none)` with 9 active users
- Session source / medium: `(direct) / (none)` with 23 sessions

Visible page view leaders:

- Homepage: 72 views
- Name Necklaces collection: 23 views
- Initial Shell Necklace PDP: 19 views
- Gifts collection: 18 views
- Iridescent Pendant Necklace PDP: 8 views
- Jewelry Gifts for Her guide: 7 views
- Checkout: 5 views

Visible event leaders:

- `page_view`: 193
- `user_engagement`: 97
- `scroll`: 32
- `session_start`: 23
- `view_item`: 20
- `first_visit`: 9
- `form_start`: 6

## Interpretation

This is not a total tracking failure. GA4 has recorded users, sessions, page views, product views, and checkout page views.

The current issue is acquisition volume:

- Organic search traffic is not visible yet in the GA4 Home overview.
- Realtime showed 0 active users at the time of inspection.
- The site is early in indexing and promotion, so low traffic is expected until Google Search Console indexing and commercial-page visibility mature.

## Faraday Priority

Focus on qualified organic acquisition:

1. Push indexing and visibility for homepage, Gifts, Name Necklaces, Initial Necklaces, Best Sellers, New Arrivals, and high-quality PDPs.
2. Improve internal links from gift guides to commercial collections.
3. Use Search Console query/page data as soon as meaningful impressions appear.
4. Avoid reporting marketing success until organic clicks, product views, add-to-cart, and orders are visible in GA4/Search Console/Shopify.

## Rawls Note

GA4 has data, but Realtime may show 0 when no user is actively on the site. Continue to verify ecommerce event receipt for add-to-cart and purchase when real activity or test orders exist.
