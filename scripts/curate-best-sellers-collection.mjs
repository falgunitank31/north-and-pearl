import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-best-curation-'));
const reportPath = 'reports/best-sellers-curation-2026-07-27.md';
const targetSize = 12;

const preferredHandles = [
  'north-pearl-heart-keepsake-necklace',
  'north-pearl-initial-shell-necklace',
  'north-pearl-iridescent-pendant-necklace',
  'north-pearl-hollow-flower-bangle-set',
  'north-pearl-color-accent-cuff',
  'north-pearl-heart-jewelry-set',
  'north-pearl-chunky-bead-bracelet',
  'north-pearl-pink-heart-bow-bracelet',
  'north-pearl-flower-jewelry-set',
  'north-pearl-sweetheart-pendant-necklace',
  'north-pearl-polished-initial-pendant',
  'north-pearl-sparkle-drop-necklace-2894',
];

function gql(query, variables = {}, allowMutations = false) {
  const queryFile = join(tempDir, `query-${Date.now()}-${Math.random()}.graphql`);
  const varsFile = join(tempDir, `vars-${Date.now()}-${Math.random()}.json`);
  const outputFile = join(tempDir, `out-${Date.now()}-${Math.random()}.json`);
  writeFileSync(queryFile, query);
  writeFileSync(varsFile, JSON.stringify(variables, null, 2));
  const args = [
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
  ];
  if (allowMutations) args.push('--allow-mutations');
  execFileSync('npx', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  return JSON.parse(readFileSync(outputFile, 'utf8'));
}

function mediaScore(product) {
  const images = product.media.nodes.filter((media) => media.mediaContentType === 'IMAGE');
  if (images.length < 3) return 0;
  const minSide = images.reduce((min, media) => Math.min(min, media.preview?.image?.width || 0, media.preview?.image?.height || 0), Infinity);
  if (minSide >= 1000) return 3;
  if (minSide >= 900) return 2;
  if (minSide >= 750) return 1;
  return 0;
}

function scoreProduct(product, indexPreference) {
  const tags = new Set(product.tags);
  const collections = product.collections.nodes.map((collection) => collection.handle);
  let score = 0;
  if (product.status === 'ACTIVE') score += 30;
  if (product.onlineStoreUrl) score += 10;
  score += mediaScore(product) * 10;
  if (collections.includes('gifts')) score += 10;
  if (collections.includes('mothers-collection') || collections.includes('couple-jewelry') || collections.includes('wedding-bridesmaids')) score += 8;
  if (tags.has('personalized') || tags.has('heart-style') || tags.has('initial-necklace') || tags.has('mother-gift')) score += 6;
  if (Number.isFinite(indexPreference)) score += 100 - indexPreference;
  if (tags.has('claim-status-unverified')) score -= 2;
  return score;
}

async function collectionProducts(collectionId) {
  const products = [];
  let after = null;
  do {
    const data = gql(
      `query CollectionProducts($id: ID!, $after: String) {
        collection(id: $id) {
          products(first: 250, after: $after) {
            pageInfo { hasNextPage endCursor }
            nodes { id title handle status }
          }
        }
      }`,
      { id: collectionId, after },
    ).collection.products;
    products.push(...data.nodes);
    after = data.pageInfo.hasNextPage ? data.pageInfo.endCursor : null;
  } while (after);
  return products;
}

const data = gql(`query BestSellerInputs {
  best: collectionByHandle(handle: "best-sellers") { id title handle productsCount { count } }
  products(first: 250, query: "vendor:'North & Pearl' status:active") {
    nodes {
      id title handle status productType tags onlineStoreUrl totalInventory
      media(first: 10) { nodes { mediaContentType preview { image { width height url } } } }
      collections(first: 20) { nodes { handle title } }
    }
  }
}`);

const collection = data.best;
if (!collection) throw new Error('Missing best-sellers collection.');

const preferredIndex = new Map(preferredHandles.map((handle, index) => [handle, index]));
const candidates = data.products.nodes
  .map((product) => ({ ...product, score: scoreProduct(product, preferredIndex.get(product.handle)) }))
  .filter((product) => mediaScore(product) > 0)
  .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));

const selected = candidates.slice(0, targetSize);
const selectedIds = new Set(selected.map((product) => product.id));
const current = await collectionProducts(collection.id);
const remove = current.filter((product) => !selectedIds.has(product.id));
const currentIds = new Set(current.map((product) => product.id));
const add = selected.filter((product) => !currentIds.has(product.id));

if (remove.length) {
  const result = gql(
    `mutation RemoveBest($id: ID!, $productIds: [ID!]!) {
      collectionRemoveProducts(id: $id, productIds: $productIds) { userErrors { field message } }
    }`,
    { id: collection.id, productIds: remove.map((product) => product.id) },
    true,
  ).collectionRemoveProducts;
  if (result.userErrors.length) throw new Error(`Remove errors: ${JSON.stringify(result.userErrors)}`);
}

if (add.length) {
  const result = gql(
    `mutation AddBest($id: ID!, $productIds: [ID!]!) {
      collectionAddProducts(id: $id, productIds: $productIds) { userErrors { field message } }
    }`,
    { id: collection.id, productIds: add.map((product) => product.id) },
    true,
  ).collectionAddProducts;
  const realErrors = result.userErrors.filter((error) => !error.message.includes('already exists'));
  if (realErrors.length) throw new Error(`Add errors: ${JSON.stringify(realErrors)}`);
}

const after = await collectionProducts(collection.id);

const report = `# Best Sellers Curation

Date: 2026-07-27

## Summary

- Agent owners: Lead Orchestrator, Gauss, Kuhn, Faraday, Tesla.
- Collection: Best Sellers (\`best-sellers\`)
- Starting products: ${current.length}
- Target curated products: ${targetSize}
- Products removed from collection only: ${remove.length}
- Products added to collection: ${add.length}
- Products now in collection: ${after.length}

## Important Note

North & Pearl does not yet have enough verified sales data to treat this as a true data-proven best-seller list. This is a curated launch merchandising set using active status, storefront availability, visual readiness, gift relevance, and category variety. The collection name can stay customer-friendly, but internal measurement should revisit this once Shopify sales data is meaningful.

## Selected Products

${selected.map((product, index) => `${index + 1}. ${product.title} (\`${product.handle}\`) — score ${product.score}`).join('\n')}

## Risk And Rollback

- Risk level: Low. This changes manual collection membership only.
- Rollback: remove the newly added products from the Best Sellers collection or restore the five-product collection listed in Git history/reports.
- Measurement: Rawls should replace this curated order with true sales/add-to-cart evidence once traffic is sufficient.
`;

writeFileSync(reportPath, report);
console.table({
  startingProducts: current.length,
  removed: remove.length,
  added: add.length,
  finalProducts: after.length,
});
console.log(`Report: ${reportPath}`);
