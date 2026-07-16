import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-draft-no-image-'));

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

const noImageHandles = new Set([
  'north-pearl-initial-shell-necklace',
  'north-pearl-heart-keepsake-necklace',
  'north-pearl-flower-nail-bangle',
  'north-pearl-crystal-gemstone-cuff',
  'north-pearl-zircon-bracelet',
  'north-pearl-smooth-gold-ring',
  'north-pearl-bridal-water-drop-set',
]);

const products = gql(`query Products {
  products(first: 100) {
    nodes {
      id
      title
      handle
      status
      media(first: 1) { nodes { id } }
    }
  }
}`).products.nodes;

for (const product of products.filter((item) => noImageHandles.has(item.handle))) {
  const result = gql(
    `mutation DraftProduct($input: ProductInput!) {
      productUpdate(input: $input) {
        product { title handle status }
        userErrors { field message }
      }
    }`,
    { input: { id: product.id, status: 'DRAFT' } },
    true,
  ).productUpdate;

  if (result.userErrors.length) {
    console.log(`draft warning ${product.title}: ${JSON.stringify(result.userErrors)}`);
  } else {
    console.log(`drafted: ${result.product.title}`);
  }
}
