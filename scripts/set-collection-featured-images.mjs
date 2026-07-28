import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-collection-images-'));
const today = new Date().toISOString().slice(0, 10);
const reportPath = `reports/collection-featured-image-polish-${today}.md`;

const collectionImageMap = {
  'best-sellers': 'north-pearl-initial-shell-necklace',
  'new-arrivals': 'north-pearl-heart-necklace-9715',
  necklaces: 'north-pearl-initial-shell-necklace',
  'name-necklaces': 'north-pearl-name-necklace-0389',
  'initial-necklaces': 'north-pearl-initial-shell-necklace',
  bracelets: 'north-pearl-hollow-flower-bangle-set',
  gifts: 'north-pearl-heart-keepsake-necklace',
  'mothers-collection': 'north-pearl-hollow-flower-bangle-set',
  'wedding-bridesmaids': 'north-pearl-bridal-water-drop-set',
  'couple-jewelry': 'north-pearl-heart-keepsake-necklace',
  earrings: 'north-pearl-modern-drop-earrings',
  rings: 'north-pearl-twine-band-ring',
  'birthstone-jewelry': 'north-pearl-color-accent-cuff',
  'personalized-jewelry': 'north-pearl-initial-shell-necklace',
  'jewelry-gifts-for-her': 'north-pearl-heart-keepsake-necklace',
  'gifts-under-50': 'north-pearl-pink-heart-bow-bracelet',
  'gifts-under-100': 'north-pearl-initial-shell-necklace',
  'birthday-jewelry-gifts': 'north-pearl-color-accent-cuff',
  'anniversary-gifts': 'north-pearl-heart-keepsake-necklace',
};

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

function collectionTitleFromHandle(handle) {
  return handle
    .split('-')
    .map((part) => (part === 'and' ? '&' : `${part[0].toUpperCase()}${part.slice(1)}`))
    .join(' ');
}

const handles = Object.keys(collectionImageMap);
const collections = [];
for (const handle of handles) {
  const data = gql(
    `query CollectionByHandle($handle: String!) {
      collectionByHandle(handle: $handle) {
        id
        title
        handle
        productsCount { count }
        image { url altText width height }
      }
    }`,
    { handle },
  ).collectionByHandle;
  if (data) collections.push(data);
}

const products = [];
for (const handle of Object.values(collectionImageMap)) {
  const data = gql(
    `query ProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        status
        featuredMedia {
          ... on MediaImage {
            image { url width height altText }
          }
        }
      }
    }`,
    { handle },
  ).productByHandle;
  if (data) products.push(data);
}

const productByHandle = new Map(products.map((product) => [product.handle, product]));
const changed = [];
const skipped = [];

for (const collection of collections) {
  const productHandle = collectionImageMap[collection.handle];
  const product = productByHandle.get(productHandle);
  const image = product?.featuredMedia?.image;

  if (!product || product.status !== 'ACTIVE' || !image?.url) {
    skipped.push({
      collection: collection.handle,
      product: productHandle,
      reason: product ? `product ${product.status}, image ${Boolean(image?.url)}` : 'product not found',
    });
    continue;
  }

  const altText = `${collection.title} jewelry curated by North & Pearl`;
  const result = gql(
    `mutation UpdateCollectionImage($collection: CollectionUpdateInput!) {
      collectionUpdate(collection: $collection) {
        collection { id title handle image { url altText width height } }
        userErrors { field message }
      }
    }`,
    {
      collection: {
        id: collection.id,
        image: {
          src: image.url,
          altText,
        },
      },
    },
    true,
  ).collectionUpdate;

  if (result.userErrors.length) {
    throw new Error(`Collection image update failed for ${collection.handle}: ${JSON.stringify(result.userErrors)}`);
  }

  changed.push({
    collection: result.collection.handle,
    title: result.collection.title,
    sourceProduct: product.handle,
    sourceTitle: product.title,
    imageWidth: result.collection.image?.width,
    imageHeight: result.collection.image?.height,
  });
}

const finalCollections = [];
for (const handle of handles) {
  const data = gql(
    `query CollectionByHandle($handle: String!) {
      collectionByHandle(handle: $handle) {
        title
        handle
        productsCount { count }
        image { url altText width height }
      }
    }`,
    { handle },
  ).collectionByHandle;
  if (data) finalCollections.push(data);
}

const missingAfter = finalCollections.filter((collection) => collection.productsCount.count > 0 && !collection.image?.url);
const report = `# Collection Featured Image Polish

Date: ${today}

## Summary

- Agent owners: Lead Orchestrator, Kuhn, Gauss, Faraday, Tesla.
- Collections targeted: ${handles.length}
- Collection images updated: ${changed.length}
- Collections skipped: ${skipped.length}
- Populated targeted collections still missing images after update: ${missingAfter.length}

## Updated Collections

${changed.map((item) => `- ${collectionTitleFromHandle(item.collection)} (\`${item.collection}\`) -> source product \`${item.sourceProduct}\` (${item.sourceTitle}), image ${item.imageWidth}x${item.imageHeight}`).join('\n') || '- None.'}

## Skipped

${skipped.map((item) => `- \`${item.collection}\`: ${item.reason}`).join('\n') || '- None.'}

## Missing After Update

${missingAfter.map((collection) => `- \`${collection.handle}\``).join('\n') || '- None.'}

## Risk And Rollback

- Risk level: Low. This updates collection featured images only.
- No products, variants, prices, inventory, theme files, customer data, policies, or supplier claims were changed.
- Rollback: remove or replace the collection image in Shopify Admin for the affected collection.
`;

mkdirSync('reports', { recursive: true });
writeFileSync(reportPath, report);
console.table({ targeted: handles.length, updated: changed.length, skipped: skipped.length, missingAfter: missingAfter.length });
console.log(`Report: ${reportPath}`);
