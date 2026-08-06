import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-collection-commerce-quality-'));
const today = new Date().toISOString().slice(0, 10);
const reportPath = `reports/priority-collection-commerce-quality-${today}.md`;
const csvPath = `reports/priority-collection-commerce-quality-${today}.csv`;

const priorityHandles = [
  'personalized-jewelry',
  'jewelry-gifts-for-her',
  'gifts-under-50',
  'gifts-under-100',
  'birthday-jewelry-gifts',
  'anniversary-gifts',
  'best-sellers',
  'new-arrivals',
  'name-necklaces',
  'initial-necklaces',
  'birthstone-jewelry',
  'necklaces',
  'bracelets',
  'rings',
  'earrings',
  'gifts',
  'mothers-collection',
  'wedding-bridesmaids',
];

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

function textLength(html = '') {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().length;
}

function imageQuality(product) {
  const images = product.media.nodes
    .filter((media) => media.mediaContentType === 'IMAGE')
    .map((media) => media.preview?.image)
    .filter(Boolean);
  const minSide = Math.min(...images.map((image) => Math.min(image.width || 0, image.height || 0)));
  if (!images.length) return 'NO_IMAGE';
  if (images.length < 3) return 'LOW_IMAGE_COUNT';
  if (minSide < 700) return 'LOW_RESOLUTION';
  if (minSide < 900) return 'ACCEPTABLE_TEMP';
  return 'GOOD';
}

function productReady(product) {
  const hasAvailableVariant = product.variants.nodes.some((variant) => variant.availableForSale);
  const imageState = imageQuality(product);
  return hasAvailableVariant && imageState !== 'NO_IMAGE' && imageState !== 'LOW_IMAGE_COUNT';
}

function csvCell(value = '') {
  const string = String(value).replaceAll('"', '""');
  return `"${string}"`;
}

const query = priorityHandles.map((handle) => `handle:${handle}`).join(' OR ');
const collections = gql(
  `query PriorityCollectionCommerceAudit($query: String!) {
    collections(first: 50, query: $query) {
      nodes {
        id
        title
        handle
        descriptionHtml
        image { url width height altText }
        productsCount { count }
        products(first: 24) {
          nodes {
            title
            handle
            status
            productType
            totalInventory
            variants(first: 8) { nodes { availableForSale price compareAtPrice } }
            media(first: 8) {
              nodes {
                mediaContentType
                preview { image { url width height altText } }
              }
            }
          }
        }
      }
    }
  }`,
  { query },
).collections.nodes;

const rows = collections
  .sort((a, b) => priorityHandles.indexOf(a.handle) - priorityHandles.indexOf(b.handle))
  .map((collection) => {
    const activeProducts = collection.products.nodes.filter((product) => product.status === 'ACTIVE');
    const readyProducts = activeProducts.filter(productReady);
    const weakProducts = activeProducts
      .filter((product) => !productReady(product))
      .map((product) => `${product.title} (${imageQuality(product)})`);
    const descriptionChars = textLength(collection.descriptionHtml);
    const issues = [];
    if (!collection.image?.url) issues.push('missing collection image');
    if (collection.productsCount.count < 4) issues.push('thin collection');
    if (readyProducts.length < Math.min(4, activeProducts.length)) issues.push('weak first-page products');
    if (descriptionChars > 1200) issues.push('description may be too long above products');
    if (descriptionChars < 180) issues.push('thin description');
    return {
      title: collection.title,
      handle: collection.handle,
      totalProducts: collection.productsCount.count,
      sampledActiveProducts: activeProducts.length,
      readySampleProducts: readyProducts.length,
      hasCollectionImage: Boolean(collection.image?.url),
      descriptionChars,
      issues,
      weakProducts,
    };
  });

const md = [
  `# Priority Collection Commerce Quality - ${today}`,
  '',
  '## Summary',
  '',
  `- Priority collections audited: ${rows.length}`,
  `- Collections with no issues in sampled data: ${rows.filter((row) => row.issues.length === 0).length}`,
  `- Collections with issues to monitor or improve: ${rows.filter((row) => row.issues.length > 0).length}`,
  '',
  'This is a monitor-only GSC period. No URL Inspection requests, reindexing requests, sitemap pings, or indexing API actions were performed.',
  '',
  '## Collection Audit',
  '',
  '| Collection | Products | Ready Sample | Collection Image | Description Chars | Issues |',
  '| --- | ---: | ---: | --- | ---: | --- |',
  ...rows.map(
    (row) =>
      `| ${row.title} | ${row.totalProducts} | ${row.readySampleProducts}/${row.sampledActiveProducts} | ${row.hasCollectionImage ? 'Yes' : 'No'} | ${row.descriptionChars} | ${row.issues.join('; ') || 'None'} |`,
  ),
  '',
  '## Weak Sampled Products',
  '',
  ...rows
    .filter((row) => row.weakProducts.length > 0)
    .map((row) => [`### ${row.title}`, ...row.weakProducts.map((item) => `- ${item}`), ''].join('\n')),
  '',
  '## Next Action',
  '',
  'Keep priority collections stable while Google recrawls. Fix only visible customer-quality issues: broken/missing images, weak first-page products, excessive copy above product grids, or products that are not purchasable.',
].join('\n');

const csv = [
  [
    'collection',
    'handle',
    'total_products',
    'sampled_active_products',
    'ready_sample_products',
    'has_collection_image',
    'description_chars',
    'issues',
  ].join(','),
  ...rows.map((row) =>
    [
      row.title,
      row.handle,
      row.totalProducts,
      row.sampledActiveProducts,
      row.readySampleProducts,
      row.hasCollectionImage,
      row.descriptionChars,
      row.issues.join('; '),
    ]
      .map(csvCell)
      .join(','),
  ),
].join('\n');

writeFileSync(reportPath, md);
writeFileSync(csvPath, `${csv}\n`);
console.table(rows.map(({ title, handle, totalProducts, readySampleProducts, sampledActiveProducts, hasCollectionImage, descriptionChars, issues }) => ({
  title,
  handle,
  totalProducts,
  ready: `${readySampleProducts}/${sampledActiveProducts}`,
  hasCollectionImage,
  descriptionChars,
  issues: issues.join('; ') || 'None',
})));
console.log(`Wrote ${reportPath}`);
console.log(`Wrote ${csvPath}`);
