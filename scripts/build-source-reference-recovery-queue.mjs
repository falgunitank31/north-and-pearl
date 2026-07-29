import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const date = '2026-07-29';
const tempDir = mkdtempSync(join(tmpdir(), 'np-source-reference-recovery-'));
const reportPath = `reports/source-reference-recovery-${date}.md`;
const csvPath = `reports/source-reference-recovery-${date}.csv`;

const recoverableSourceIds = new Map([
  ['north-pearl-flower-nail-bangle', '1601234622131'],
  ['north-pearl-hollow-flower-bangle-set', '1601599046429'],
  ['north-pearl-sparkle-pulse-bracelet', '1601403752183'],
  ['north-pearl-mixed-charm-bangle', '1601120166205'],
  ['north-pearl-pink-heart-bow-bracelet', '1601426024495'],
  ['north-pearl-dainty-flower-necklace', '1601469797456'],
  ['north-pearl-clover-charm-bracelet', '1601536342028'],
  ['north-pearl-twine-band-ring', '1601427206777'],
  ['north-pearl-warm-bead-stretch-bracelet', '1601310111350'],
  ['north-pearl-chunky-bead-bracelet', '1601647883963'],
  ['north-pearl-v-water-drop-jewelry-set', '1600828902618'],
]);

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
  const response = gql(`query SourceReferenceRecovery($after: String) {
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
            mediaContentType
            preview { image { width height url } }
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
  const mediaScore =
    images.length === 0 ? 'NO_IMAGE' :
    minWidth < 600 || minHeight < 600 ? 'NEEDS_FIX' :
    minWidth < 900 || minHeight < 900 || images.length < 4 ? 'ACCEPTABLE_TEMP' :
    'GOOD';
  const recoveredId = recoverableSourceIds.get(product.handle) || '';
  const sourceStatus = sourceTags.length || sourceUrlTags.length
    ? 'SOURCE_TAG_PRESENT'
    : recoveredId
      ? 'RECOVERABLE_ID_NEEDS_CONFIRMATION'
      : 'EXACT_SOURCE_URL_REQUIRED';

  return {
    title: product.title,
    handle: product.handle,
    productType: product.productType || '',
    images: images.length,
    minWidth: Number.isFinite(minWidth) ? minWidth : 0,
    minHeight: Number.isFinite(minHeight) ? minHeight : 0,
    mediaScore,
    sourceTags: sourceTags.join(';'),
    sourceUrlTags: sourceUrlTags.join(';'),
    recoveredId,
    sourceStatus,
    url: product.onlineStoreUrl || `https://northandpearl.com/products/${product.handle}`,
  };
});

const belowPreferred = rows.filter((row) => row.mediaScore !== 'GOOD');
const missingSourceBelowPreferred = belowPreferred.filter((row) => row.sourceStatus !== 'SOURCE_TAG_PRESENT');
const recoverable = missingSourceBelowPreferred.filter((row) => row.recoveredId);
const exactRequired = missingSourceBelowPreferred.filter((row) => !row.recoveredId);
const allMissingSource = rows.filter((row) => row.sourceStatus !== 'SOURCE_TAG_PRESENT');

mkdirSync(dirname(reportPath), { recursive: true });

const csvRows = [
  'title,handle,productType,mediaScore,images,minWidth,minHeight,sourceStatus,recoveredSourceId,sourceTags,sourceUrlTags,url',
  ...allMissingSource.map((row) => [
    row.title,
    row.handle,
    row.productType,
    row.mediaScore,
    row.images,
    row.minWidth,
    row.minHeight,
    row.sourceStatus,
    row.recoveredId,
    row.sourceTags,
    row.sourceUrlTags,
    row.url,
  ].map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')),
];
writeFileSync(csvPath, csvRows.join('\n'));

writeFileSync(reportPath, [
  `# Source Reference Recovery Queue - ${date}`,
  '',
  'Owner: Gauss + Curie + Lovelace  ',
  'Purpose: identify active products that need stronger Alibaba/source traceability before source-image upgrades or order fulfillment.',
  '',
  '## Summary',
  '',
  `- Active products checked: ${products.length}`,
  `- Active products below preferred media standard: ${belowPreferred.length}`,
  `- Below-preferred products missing usable source-reference tags: ${missingSourceBelowPreferred.length}`,
  `- Missing-source products with a recoverable repo source ID: ${recoverable.length}`,
  `- Missing-source products requiring exact Alibaba URL/source recovery: ${exactRequired.length}`,
  `- Active products missing any source-reference tag: ${allMissingSource.length}`,
  '',
  '## Decision',
  '',
  'Do not add source tags or replace product media until the exact same Alibaba listing or supplier asset is confirmed against the visible Shopify product. This prevents a customer order from being mapped to the wrong supplier item.',
  '',
  '## Recoverable Source IDs - Confirm Before Tagging',
  '',
  '| Product | Handle | Media | Recovered Source ID | Required Check |',
  '|---|---|---|---|---|',
  ...(recoverable.length
    ? recoverable.map((row) => `| ${row.title.replaceAll('|', '-')} | \`${row.handle}\` | ${row.mediaScore}, ${row.images} images, ${row.minWidth}x${row.minHeight} min | \`${row.recoveredId}\` | Confirm current listing image, title/type, available variants, sample availability, and shipping. |`)
    : ['| None | - | - | - | - |']),
  '',
  '## Exact Source URL Required',
  '',
  '| Product | Handle | Media | Current Action |',
  '|---|---|---|---|',
  ...(exactRequired.length
    ? exactRequired.map((row) => `| ${row.title.replaceAll('|', '-')} | \`${row.handle}\` | ${row.mediaScore}, ${row.images} images, ${row.minWidth}x${row.minHeight} min | Recover exact Alibaba URL/source ID or replace with a verified sourced product before fulfillment. |`)
    : ['| None | - | - | - |']),
  '',
  '## Agent Actions',
  '',
  '- Gauss: prioritize the products in this queue before adding more active products with weak traceability.',
  '- Curie: verify exact supplier/listing match and classify source evidence as VERIFIED, SUPPLIER CLAIM, ESTIMATE, INFERENCE, or UNKNOWN.',
  '- Kuhn: only approve image upgrades that show the same product accurately; do not improve images in ways that change size, finish, chain thickness, stone color, or included components.',
  '- Lovelace: when orders appear, use confirmed source tags/URLs only for buying instructions.',
  '- Tesla: write source tags/metafields only after Gauss/Curie confirmation.',
  '',
].join('\n'));

console.log(`Active products checked: ${products.length}`);
console.log(`Below preferred media standard: ${belowPreferred.length}`);
console.log(`Below-preferred missing source tags: ${missingSourceBelowPreferred.length}`);
console.log(`Recoverable IDs requiring confirmation: ${recoverable.length}`);
console.log(`Exact source URLs required: ${exactRequired.length}`);
console.log(`All active products missing source tags: ${allMissingSource.length}`);
console.log(`Wrote ${reportPath}`);
console.log(`Wrote ${csvPath}`);
