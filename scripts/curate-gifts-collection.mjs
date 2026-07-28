import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-gifts-curation-'));
const today = new Date().toISOString().slice(0, 10);
const reportPath = `reports/gifts-merchandising-curation-${today}.md`;

const giftCollectionHandle = 'gifts';
const targetSize = 56;

const highIntentTags = new Set([
  'mother-gift',
  'bridesmaid-gift',
  'wedding-gift',
  'couple-gift',
  'gift-set',
  'initial-necklace',
  'heart-necklace',
  'flower-necklace',
  'flower-bracelet',
  'charm-bracelet',
  'heart-bracelet',
  'bangle-set',
  'bow-bracelet',
]);

const meaningfulTags = [
  'personalized',
  'initial-style',
  'letter-style',
  'name-style',
  'heart-style',
  'flower-style',
  'birthstone-style',
  'crystal-style',
  'pearl-style',
  'clover-style',
  'bow-style',
  'butterfly-style',
];

const occasionCollections = new Set([
  'mothers-collection',
  'wedding-bridesmaids',
  'couple-jewelry',
  'birthstone-jewelry',
  'best-sellers',
]);

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
            nodes { id title handle status productType tags totalInventory collections(first: 20) { nodes { handle title } } featuredMedia { preview { image { width height url } } } }
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

function mediaScore(product) {
  const image = product.featuredMedia?.preview?.image;
  if (!image) return 0;
  const minSide = Math.min(image.width || 0, image.height || 0);
  if (minSide >= 1000) return 4;
  if (minSide >= 800) return 3;
  if (minSide >= 700) return 2;
  return 1;
}

function productScore(product) {
  const tags = new Set(product.tags);
  const collectionHandles = product.collections.nodes.map((collection) => collection.handle);
  let score = 0;

  if (product.status === 'ACTIVE') score += 20;
  score += mediaScore(product) * 7;
  if (collectionHandles.some((handle) => occasionCollections.has(handle))) score += 20;
  for (const tag of highIntentTags) if (tags.has(tag)) score += 10;
  for (const tag of meaningfulTags) if (tags.has(tag)) score += 4;
  if (['Gift Set', 'Necklace', 'Bracelet', 'Earrings', 'Ring'].includes(product.productType)) score += 5;
  if ((product.totalInventory ?? 0) > 0) score += 3;
  if (tags.has('claim-status-unverified')) score -= 2;
  if (tags.has('draft-candidate') || tags.has('launch-review')) score -= 4;
  return score;
}

function reasonFor(product) {
  const tags = new Set(product.tags);
  const collectionHandles = product.collections.nodes.map((collection) => collection.handle);
  const reasons = [];
  if (collectionHandles.some((handle) => occasionCollections.has(handle))) reasons.push('occasion/recipient collection');
  if ([...highIntentTags].some((tag) => tags.has(tag))) reasons.push('clear gift-intent tag');
  if ([...meaningfulTags].some((tag) => tags.has(tag))) reasons.push('meaningful/personalized style');
  if (mediaScore(product) >= 3) reasons.push('usable primary image');
  return reasons.join(', ') || 'lower gift relevance';
}

const collections = gql(`query GiftCollection { collections(first: 5, query: "handle:${giftCollectionHandle}") { nodes { id title handle productsCount { count } } } }`).collections.nodes;
const giftCollection = collections[0];
if (!giftCollection) throw new Error(`Missing collection: ${giftCollectionHandle}`);

const currentGiftProducts = await getCollectionProducts(giftCollection.id);
const activeProducts = gql(`query ActiveProducts { products(first: 250, query: "vendor:'North & Pearl' status:active") { nodes { id title handle status productType tags totalInventory collections(first: 20) { nodes { handle title } } featuredMedia { preview { image { width height url } } } } } }`).products.nodes;

const scored = activeProducts
  .map((product) => ({ ...product, score: productScore(product), reason: reasonFor(product) }))
  .filter((product) => product.score >= 40)
  .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));

const keep = scored.slice(0, targetSize);
const keepIds = new Set(keep.map((product) => product.id));
const currentIds = new Set(currentGiftProducts.map((product) => product.id));
const remove = currentGiftProducts.filter((product) => !keepIds.has(product.id));
const add = keep.filter((product) => !currentIds.has(product.id));

for (let index = 0; index < remove.length; index += 50) {
  const chunk = remove.slice(index, index + 50);
  const result = gql(
    `mutation RemoveFromGifts($id: ID!, $productIds: [ID!]!) {
      collectionRemoveProducts(id: $id, productIds: $productIds) { userErrors { field message } }
    }`,
    { id: giftCollection.id, productIds: chunk.map((product) => product.id) },
    true,
  ).collectionRemoveProducts;
  if (result.userErrors.length) throw new Error(`Remove errors: ${JSON.stringify(result.userErrors)}`);
}

for (let index = 0; index < add.length; index += 50) {
  const chunk = add.slice(index, index + 50);
  const result = gql(
    `mutation AddToGifts($id: ID!, $productIds: [ID!]!) {
      collectionAddProducts(id: $id, productIds: $productIds) { userErrors { field message } }
    }`,
    { id: giftCollection.id, productIds: chunk.map((product) => product.id) },
    true,
  ).collectionAddProducts;
  const realErrors = result.userErrors.filter((error) => !error.message.includes('already exists'));
  if (realErrors.length) throw new Error(`Add errors: ${JSON.stringify(realErrors)}`);
}

const nextGiftProducts = await getCollectionProducts(giftCollection.id);
const activeNext = nextGiftProducts.filter((product) => product.status === 'ACTIVE');

const report = `# Gifts Merchandising Curation

Date: ${today}

## Summary

- Agent owners: Lead Orchestrator, Gauss, Kuhn, Faraday, Tesla.
- Collection: Gifts (\`${giftCollection.handle}\`)
- Starting products in collection: ${currentGiftProducts.length}
- Target curated active products: ${targetSize}
- Products removed from Gifts collection only: ${remove.length}
- Products added to Gifts collection: ${add.length}
- Products now in Gifts collection: ${nextGiftProducts.length}
- Active products now in Gifts collection: ${activeNext.length}

## Curation Rules

Products were prioritized for the Gifts collection when they had stronger gift intent, occasion/recipient relevance, meaningful or personalized style tags, and usable product imagery. Products were not deleted, unpublished, repriced, or removed from their core category collections.

## Kept For Gifts

${keep.map((product, index) => `${index + 1}. ${product.title} (\`${product.handle}\`) — score ${product.score}; ${product.reason}`).join('\n')}

## Removed From Gifts Only

${remove.map((product) => `- ${product.title} (\`${product.handle}\`) — status ${product.status}; lower curated gift relevance or inactive/draft collection residue`).join('\n') || '- None.'}

## Risk And Rollback

- Risk level: Low. This changes manual collection membership only.
- Rollback: re-add products listed under “Removed From Gifts Only” to the Gifts collection in Shopify Admin or rerun a prior catalog import script.
- Remaining risk: Some kept products still use supplier-origin imagery and require ongoing visual QA before heavier marketing pushes.
`;

writeFileSync(reportPath, report);

console.table({
  startingCollectionProducts: currentGiftProducts.length,
  removed: remove.length,
  added: add.length,
  finalCollectionProducts: nextGiftProducts.length,
  finalActiveProducts: activeNext.length,
});
console.log(`Report: ${reportPath}`);
