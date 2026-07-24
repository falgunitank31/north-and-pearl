import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-google-attributes-'));

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
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      execFileSync('npx', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
      return JSON.parse(readFileSync(outputFile, 'utf8'));
    } catch (error) {
      lastError = error;
      if (attempt < 3) {
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 1500 * attempt);
      }
    }
  }
  throw lastError;
}

function feedColor(product) {
  const haystack = `${product.title} ${product.productType} ${product.tags.join(' ')}`.toLowerCase();

  if (haystack.includes('iridescent') || haystack.includes('color accent') || haystack.includes('birthstone')) {
    return 'Gold, Multicolor';
  }

  if (haystack.includes('water drop') || haystack.includes('sparkle') || haystack.includes('clover')) {
    return 'Gold, Clear';
  }

  if (haystack.includes('bead') || haystack.includes('pearl')) {
    return 'Gold, White';
  }

  if (haystack.includes('heart') || haystack.includes('flower') || haystack.includes('initial') || haystack.includes('name')) {
    return 'Gold';
  }

  return 'Gold';
}

const products = gql(`query ActiveProductsForGoogleAttributes {
  products(first: 250, query: "vendor:'North & Pearl' status:active") {
    nodes {
      id
      title
      handle
      productType
      tags
      metafields(first: 100, namespace: "mm-google-shopping") {
        nodes {
          namespace
          key
          type
          value
        }
      }
    }
  }
}`).products.nodes;

const changed = [];

for (const product of products) {
  const existing = new Map(product.metafields.nodes.map((metafield) => [metafield.key, metafield.value]));
  const desired = {
    age_group: 'adult',
    gender: 'female',
    color: feedColor(product),
    condition: 'new',
    google_product_category: '188',
  };

  const metafields = Object.entries(desired)
    .filter(([key, value]) => existing.get(key) !== value)
    .map(([key, value]) => ({
      ownerId: product.id,
      namespace: 'mm-google-shopping',
      key,
      type: 'single_line_text_field',
      value,
    }));

  if (existing.get('custom_product') !== 'true') {
    metafields.push({
      ownerId: product.id,
      namespace: 'mm-google-shopping',
      key: 'custom_product',
      type: 'boolean',
      value: 'true',
    });
  }

  if (!metafields.length) continue;

  const result = gql(
    `mutation SetGoogleShoppingMetafields($metafields: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $metafields) {
        metafields { namespace key value }
        userErrors { field message code }
      }
    }`,
    { metafields },
    true,
  ).metafieldsSet;

  if (result.userErrors.length) {
    throw new Error(`${product.title}: ${JSON.stringify(result.userErrors)}`);
  }

  changed.push({
    title: product.title,
    handle: product.handle,
    color: desired.color,
    fieldsSet: metafields.map((field) => field.key).join(', '),
  });
}

console.table(changed);
console.log(`Updated ${changed.length} active products.`);
