import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-draft-low-image-products-'));

const handles = [
  'north-pearl-birthstone-name-necklace',
  'north-pearl-classic-tennis-bracelet',
  'north-pearl-emerald-statement-ring',
  'north-pearl-geometric-drop-earrings',
  'north-pearl-heart-bangle-bracelet',
  'north-pearl-letter-charm-bracelet',
  'north-pearl-minimal-water-drop-necklace',
  'north-pearl-moissanite-gift-ring',
  'north-pearl-pearl-collarbone-necklace',
  'north-pearl-square-zircon-jewelry-set',
  'north-pearl-stackable-gold-bracelet',
  'north-pearl-teardrop-birthstone-necklace',
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

const products = gql(
  `query LowImageProducts($query: String!) {
    products(first: 50, query: $query) {
      nodes {
        id
        title
        handle
        status
        media(first: 20) { nodes { mediaContentType } }
      }
    }
  }`,
  { query: handles.map((handle) => `handle:${handle}`).join(' OR ') },
).products.nodes;

const changed = [];

for (const product of products) {
  const imageCount = product.media.nodes.filter((media) => media.mediaContentType === 'IMAGE').length;
  if (imageCount > 1) {
    console.log(`skip ${product.title}: ${imageCount} images`);
    continue;
  }

  const result = gql(
    `mutation DraftLowImageProduct($product: ProductUpdateInput!) {
      productUpdate(product: $product) {
        product { id title handle status }
        userErrors { field message }
      }
    }`,
    { product: { id: product.id, status: 'DRAFT' } },
    true,
  ).productUpdate;

  if (result.userErrors.length) {
    console.log(`warning ${product.title}: ${JSON.stringify(result.userErrors)}`);
  } else {
    changed.push({
      title: result.product.title,
      handle: result.product.handle,
      previousStatus: product.status,
      status: result.product.status,
      imageCount,
    });
    console.log(`drafted: ${result.product.title}`);
  }
}

console.table(changed);
