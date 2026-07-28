# Search Console Indexing Execution

Date: July 28, 2026

## Summary

Search Console URL Inspection was executed for North & Pearl using the verified domain property `northandpearl.com`.

## Completed Requests

| URL | Inspection status before request | Result |
| --- | --- | --- |
| `https://northandpearl.com/` | URL is on Google | Indexing requested |
| `https://northandpearl.com/collections/best-sellers` | URL is not on Google | Indexing requested |
| `https://northandpearl.com/collections/gifts` | URL is not on Google | Indexing requested |
| `https://northandpearl.com/collections/new-arrivals` | URL is not on Google | Indexing requested |
| `https://northandpearl.com/collections/name-necklaces` | URL is on Google | Indexing requested |
| `https://northandpearl.com/collections/necklaces` | URL is not on Google | Indexing requested |
| `https://northandpearl.com/pages/ai-brand-information` | Batch processed | Indexing requested |
| `https://northandpearl.com/collections/bracelets` | Batch processed | Indexing requested |
| `https://northandpearl.com/collections/rings` | Batch processed | Indexing requested |
| `https://northandpearl.com/collections/earrings` | URL is on Google | Indexing requested |

## Corrected URL Issue

The originally queued URL below returned a live Google Inspection 404 and was rejected:

- `https://northandpearl.com/blogs/news/best-personalized-jewelry-gifts-for-her`

Root cause: homepage linked to `/blogs/news/...` while the live article exists under `/blogs/gift-guide/...`.

Fix applied: homepage link updated to:

- `https://northandpearl.com/blogs/gift-guide/best-personalized-jewelry-gifts-for-her`

Validation:

- Incorrect `/blogs/news/...` URL: `404`
- Correct `/blogs/gift-guide/...` URL: `200`
- Correct URL status in Search Console: URL is on Google

## Remaining Optional Recrawl

Google reCAPTCHA appeared while requesting a fresh recrawl for the correct gift-guide URL:

- `https://northandpearl.com/blogs/gift-guide/best-personalized-jewelry-gifts-for-her`

The page is already on Google, so this is a recrawl-priority blocker rather than an indexing eligibility blocker.

## Remaining URLs

- `https://northandpearl.com/blogs/gift-guide/best-personalized-jewelry-gifts-for-her` fresh recrawl after CAPTCHA

## Notes

- Google states that submitting a page multiple times does not change its crawl priority.
- Indexing requests do not guarantee immediate indexing or ranking.
- Continue requests in a small, commercial-priority batch to avoid quota/captcha friction.
