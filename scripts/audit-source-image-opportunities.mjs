import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const date = '2026-07-27';
const tempDir = mkdtempSync(join(tmpdir(), 'np-source-image-opportunities-'));
const reportPath = `reports/source-image-opportunities-${date}.md`;
const csvPath = `reports/source-image-opportunities-${date}.csv`;

function gql(query, variables = {}) {
  const queryFile = join(tempDir, `query-${Date.now()}-${Math.random()}.graphql`);
  const varsFile = join(tempDir, `vars-${Date.now()}-${Math.random()}.json`);
  const outputFile = join(tempDir, `out-${Date.now()}-${Math.random()}.json`);
  writeFileSync(queryFile, query);
  writeFileSync(varsFile, JSON.stringify(variables, null, 2));
  execFileSync(
    'npx',
    [
      '@shopify/cli@latest',
      'store',
      'execute',
      '--store',
      store,
      '--query-file',
      queryFile,
      '--variable-file',
      varsFile,
      '--output-file',
      outputFile,
      '--json',
    ],
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] },
  );
  return JSON.parse(readFileSync(outputFile, 'utf8'));
}

const products = [];
let cursor = null;
let hasNextPage = true;

while (hasNextPage) {
  const response = gql(`query SourceImageOpportunityAudit($after: String) {
    products(first: 100, after: $after, query: "vendor:'North & Pearl' status:active") {
      pageInfo { hasNextPage endCursor }
      nodes {
        title
        handle
        status
        tags
        productType
        onlineStoreUrl
        media(first: 20) {
          nodes {
            id
            alt
            mediaContentType
            preview { image { url width height } }
          }
        }
      }
    }
  }`, { after: cursor });

  products.push(...response.products.nodes);
  hasNextPage = response.products.pageInfo.hasNextPage;
  cursor = response.products.pageInfo.endCursor;
}

const rows = products.map((product) => {
  const images = product.media.nodes.filter((media) => media.mediaContentType === 'IMAGE');
  const minWidth = images.reduce((min, media) => Math.min(min, media.preview?.image?.width || 0), Infinity);
  const minHeight = images.reduce((min, media) => Math.min(min, media.preview?.image?.height || 0), Infinity);
  const sourceTags = product.tags.filter((tag) => tag.startsWith('alibaba-source-'));
  const sourceUrlTags = product.tags.filter((tag) => tag.startsWith('source-url-') || tag.startsWith('alibaba-url-'));
  const score =
    images.length === 0 ? 'NO_IMAGE' :
    minWidth < 600 || minHeight < 600 ? 'NEEDS_FIX' :
    minWidth < 900 || minHeight < 900 || images.length < 4 ? 'ACCEPTABLE_TEMP' :
    'GOOD';
  return {
    title: product.title,
    handle: product.handle,
    productType: product.productType || '',
    images: images.length,
    minWidth: Number.isFinite(minWidth) ? minWidth : 0,
    minHeight: Number.isFinite(minHeight) ? minHeight : 0,
    score,
    sourceTags,
    sourceUrlTags,
    onlineStoreUrl: product.onlineStoreUrl || `https://northandpearl.com/products/${product.handle}`,
    firstImage: images[0]?.preview?.image?.url || '',
  };
}).sort((a, b) => {
  const scoreOrder = { NEEDS_FIX: 0, NO_IMAGE: 1, ACCEPTABLE_TEMP: 2, GOOD: 3 };
  return (scoreOrder[a.score] ?? 9) - (scoreOrder[b.score] ?? 9)
    || a.images - b.images
    || a.minWidth - b.minWidth
    || a.title.localeCompare(b.title);
});

const opportunities = rows.filter((row) => row.score !== 'GOOD');
const withSource = opportunities.filter((row) => row.sourceTags.length || row.sourceUrlTags.length);
const withoutSource = opportunities.filter((row) => !row.sourceTags.length && !row.sourceUrlTags.length);

mkdirSync(dirname(reportPath), { recursive: true });
writeFileSync(csvPath, [
  'title,handle,score,images,minWidth,minHeight,productType,sourceTags,sourceUrlTags,url',
  ...opportunities.map((row) => [
    row.title,
    row.handle,
    row.score,
    row.images,
    row.minWidth,
    row.minHeight,
    row.productType,
    row.sourceTags.join(';'),
    row.sourceUrlTags.join(';'),
    row.onlineStoreUrl,
  ].map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')),
].join('\n'));

writeFileSync(reportPath, [
  `# Source Image Replacement Opportunities - ${date}`,
  '',
  '## Summary',
  '',
  `- Active products audited: ${products.length}`,
  `- Products below preferred media standard: ${opportunities.length}`,
  `- Products with source-reference tags: ${withSource.length}`,
  `- Products missing source-reference tags: ${withoutSource.length}`,
  '',
  '## Decision',
  '',
  'No media replacement should happen unless the source image is confirmed to be the exact same product. Current active products pass storefront functionality checks, so this is a premium polish task, not a broken-store blocker.',
  '',
  '## Priority Queue',
  '',
  '| Priority | Product | Handle | Score | Images | Smallest Image | Source Reference |',
  '|---:|---|---|---|---:|---|---|',
  ...opportunities.slice(0, 40).map((row, index) => `| ${index + 1} | ${row.title.replaceAll('|', '-')} | \`${row.handle}\` | ${row.score} | ${row.images} | ${row.minWidth}x${row.minHeight} | ${(row.sourceTags.concat(row.sourceUrlTags).join(', ') || 'Missing').replaceAll('|', '-')} |`),
  '',
  '## Agent Actions',
  '',
  '- Gauss: recover exact Alibaba product URLs for products missing source-reference tags before any image replacement.',
  '- Curie: verify source listing availability, visible media, MOQ, and supplier status when URLs are recoverable.',
  '- Kuhn: approve first-image crop/order only when imagery is exact-product and visually stronger.',
  '- Tesla: upload replacement media only after exact-source verification; never delete existing media unless replacement is validated.',
  '',
  '## Blockers',
  '',
  withoutSource.length
    ? `- ${withoutSource.length} below-threshold products do not expose usable source URL tags in Shopify, so exact-source replacement is blocked until source URLs are recovered from catalog records or owner-supplied Alibaba links.`
    : '- No source-reference blocker found.',
  '',
].join('\n'));

console.log(`Audited ${products.length} active products.`);
console.log(`Below preferred standard: ${opportunities.length}.`);
console.log(`With source tags: ${withSource.length}. Missing source tags: ${withoutSource.length}.`);
console.log(`Wrote ${reportPath}`);
console.log(`Wrote ${csvPath}`);
