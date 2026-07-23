import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-handle-cleanup-'));

const handleUpdates = {
  'north-pearl-opal-pendant-necklace': 'north-pearl-iridescent-pendant-necklace',
  'north-pearl-crystal-gemstone-cuff': 'north-pearl-color-accent-cuff',
  'north-pearl-zircon-bracelet': 'north-pearl-sparkle-accent-bracelet',
  'north-pearl-smooth-gold-ring': 'north-pearl-smooth-band-ring',
  'north-pearl-gold-bead-stretch-bracelet': 'north-pearl-warm-bead-stretch-bracelet',
  'north-pearl-chunky-pearl-bracelet': 'north-pearl-chunky-bead-bracelet',
  'north-pearl-crystal-accent-bracelet': 'north-pearl-linear-sparkle-bracelet',
  'north-pearl-crystal-halo-bracelet': 'north-pearl-sparkle-halo-bracelet',
  'north-pearl-crystal-row-bracelet': 'north-pearl-sparkle-row-bracelet',
  'north-pearl-crystal-link-bracelet': 'north-pearl-sparkle-link-bracelet',
  'north-pearl-crystal-pulse-bracelet': 'north-pearl-sparkle-pulse-bracelet',
  'north-pearl-crystal-bead-bracelet': 'north-pearl-sparkle-bead-bracelet',
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

const products = gql(
  `query ProductsForHandleCleanup($query: String!) {
    products(first: 100, query: $query) {
      nodes { id title handle status }
    }
  }`,
  { query: Object.keys(handleUpdates).map((handle) => `handle:${handle}`).join(' OR ') },
).products.nodes;

const changed = [];

for (const product of products) {
  const nextHandle = handleUpdates[product.handle];
  if (!nextHandle || product.status !== 'ACTIVE') continue;

  const result = gql(
    `mutation ClaimSafeHandleUpdate($product: ProductUpdateInput!) {
      productUpdate(product: $product) {
        product { id title handle }
        userErrors { field message }
      }
    }`,
    {
      product: {
        id: product.id,
        handle: nextHandle,
        redirectNewHandle: true,
      },
    },
    true,
  ).productUpdate;

  if (result.userErrors.length) {
    console.log(`warning ${product.handle}: ${JSON.stringify(result.userErrors)}`);
    continue;
  }

  changed.push({
    title: product.title,
    previousHandle: product.handle,
    nextHandle: result.product.handle,
  });
}

console.table(changed);
console.log(`Updated ${changed.length} claim-sensitive product handles.`);
