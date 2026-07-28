import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-new-arrivals-curation-'));
const today = new Date().toISOString().slice(0, 10);
const reportPath = `reports/new-arrivals-merchandising-curation-${today}.md`;
const collectionHandle = 'new-arrivals';
const targetSize = 64;

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

async function getCollectionProducts(collectionId) {
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

function imageScore(product) {
  const images = product.media.nodes.filter((media) => media.mediaContentType === 'IMAGE');
  if (images.length >= 5) return 25;
  if (images.length >= 3) return 18;
  return 0;
}

function categoryPriority(product) {
  const type = product.productType.toLowerCase();
  if (type.includes('necklace')) return 5;
  if (type.includes('bracelet')) return 4;
  if (type.includes('earring')) return 3;
  if (type.includes('ring')) return 2;
  if (type.includes('set')) return 3;
  return 1;
}

function productScore(product) {
  const tags = new Set(product.tags);
  let score = 0;
  if (product.status === 'ACTIVE') score += 20;
  if (product.onlineStoreUrl) score += 10;
  score += imageScore(product);
  score += categoryPriority(product) * 3;
  if (tags.has('gauss-next-100-live')) score += 28;
  if (tags.has('polished-launch-review')) score += 14;
  if (tags.has('visual-status-good')) score += 8;
  if (tags.has('claim-status-unverified')) score -= 2;
  return score;
}

const data = gql(`query NewArrivalsInputs {
  collectionByHandle(handle: "${collectionHandle}") { id title handle productsCount { count } }
  products(first: 250, query: "vendor:'North & Pearl' status:active") {
    nodes {
      id title handle status productType tags onlineStoreUrl createdAt
      media(first: 8) { nodes { mediaContentType preview { image { width height url } } } }
    }
  }
}`);

const collection = data.collectionByHandle;
if (!collection) throw new Error(`Missing collection: ${collectionHandle}`);

const current = await getCollectionProducts(collection.id);
const candidates = data.products.nodes
  .map((product) => ({ ...product, score: productScore(product) }))
  .filter((product) => imageScore(product) > 0)
  .sort((a, b) => b.score - a.score || new Date(b.createdAt) - new Date(a.createdAt) || a.title.localeCompare(b.title));

const selected = candidates.slice(0, targetSize);
const selectedIds = new Set(selected.map((product) => product.id));
const currentIds = new Set(current.map((product) => product.id));
const remove = current.filter((product) => !selectedIds.has(product.id));
const add = selected.filter((product) => !currentIds.has(product.id));

for (let index = 0; index < remove.length; index += 50) {
  const chunk = remove.slice(index, index + 50);
  const result = gql(
    `mutation RemoveFromNewArrivals($id: ID!, $productIds: [ID!]!) {
      collectionRemoveProducts(id: $id, productIds: $productIds) { userErrors { field message } }
    }`,
    { id: collection.id, productIds: chunk.map((product) => product.id) },
    true,
  ).collectionRemoveProducts;
  if (result.userErrors.length) throw new Error(`Remove errors: ${JSON.stringify(result.userErrors)}`);
}

for (let index = 0; index < add.length; index += 50) {
  const chunk = add.slice(index, index + 50);
  const result = gql(
    `mutation AddToNewArrivals($id: ID!, $productIds: [ID!]!) {
      collectionAddProducts(id: $id, productIds: $productIds) { userErrors { field message } }
    }`,
    { id: collection.id, productIds: chunk.map((product) => product.id) },
    true,
  ).collectionAddProducts;
  const realErrors = result.userErrors.filter((error) => !error.message.includes('already exists'));
  if (realErrors.length) throw new Error(`Add errors: ${JSON.stringify(realErrors)}`);
}

const after = await getCollectionProducts(collection.id);

const report = `# New Arrivals Merchandising Curation

Date: ${today}

## Summary

- Agent owners: Lead Orchestrator, Gauss, Kuhn, Faraday, Tesla.
- Collection: New Arrivals (\`${collectionHandle}\`)
- Starting products: ${current.length}
- Target curated products: ${targetSize}
- Products removed from collection only: ${remove.length}
- Products added to collection: ${add.length}
- Products now in collection: ${after.length}

## Curation Rules

New Arrivals now prioritizes the latest Gauss expansion products with active status, storefront availability, usable media, and claim-safe launch review status. Products were not deleted, unpublished, repriced, or removed from their core category collections.

## Selected Products

${selected.map((product, index) => `${index + 1}. ${product.title} (\`${product.handle}\`) — score ${product.score}`).join('\n')}

## Risk And Rollback

- Risk level: Low. This changes manual collection membership only.
- Rollback: restore products from the prior New Arrivals collection using Shopify Admin if needed.
- Measurement: Rawls should revisit after traffic and add-to-cart data determine which new products deserve more visibility.
`;

writeFileSync(reportPath, report);
console.table({ startingProducts: current.length, removed: remove.length, added: add.length, finalProducts: after.length });
console.log(`Report: ${reportPath}`);
