# Action Plan

## Priority Queue

| Severity | Issue |
|----------|-------|
| Critical | Content: Author or expert attribution signals are limited or absent in the visible content. |
| Critical | Content: No external citations were detected in the visible HTML. |
| Critical | Geo: Author/date attribution is weak in the visible content. |
| Critical | Geo: No strong 134-167 word self-contained answer block was detected. |
| Critical | Geo: Server-rendered content confirmation is weak without technical-cache support. |
| Critical | Geo: The page has limited question-based heading structure for AI extraction patterns. |
| Critical | Performance: INP is above target at 500ms. |
| Critical | Performance: LCP is above target at 2.91s. |
| Critical | Performance: Real-user/PageSpeed performance data was unavailable, so the report uses deterministic lab heuristics. |
| Critical | Sitemap: 5 sitemap URL(s) have a canonical mismatch. |

## Recommended Actions

- **Technical**: Prioritize the hero/LCP element, reduce render-blocking resources, and compress above-the-fold assets.
- **Technical**: Reduce main-thread JavaScript work and defer non-critical third-party scripts.
- **Technical**: Consider IndexNow if faster Bing/Yandex discovery matters to the publishing workflow.
- **Performance**: Prioritize the hero/LCP element, reduce render-blocking resources, and compress above-the-fold assets.
- **Performance**: Reduce main-thread JavaScript work and defer non-critical third-party scripts.
- **Performance**: Provide `PAGESPEED_API_KEY` or re-run in an environment with PageSpeed API access for richer CWV evidence.
- **On Page**: Shorten long title tags to 50-60 characters for optimal SERP display.
- **On Page**: Trim meta descriptions to 150-160 characters to avoid truncation.
- **Content**: Add explicit author, founder, reviewer, or expert attribution where it fits the page type.
- **Content**: Add selective citations or proof links where factual claims would benefit from support.
- **Schema**: Add WebPage markup aligned with the current page intent.
- **Images**: Compress oversized images and prioritize WebP/AVIF for large raster assets.
