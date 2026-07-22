import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-draft-claim-cleanup-'));

const titleUpdates = {
  'north-pearl-birthstone-name-necklace': 'North & Pearl Birth-Month Name Necklace',
  'north-pearl-square-zircon-jewelry-set': 'North & Pearl Square Sparkle Jewelry Set',
  'north-pearl-emerald-statement-ring': 'North & Pearl Green Accent Statement Ring',
  'north-pearl-moissanite-gift-ring': 'North & Pearl Brilliant Gift Ring',
  'north-pearl-stackable-gold-bracelet': 'North & Pearl Stackable Warm Bracelet',
  'north-pearl-pearl-collarbone-necklace': 'North & Pearl Bead Collarbone Necklace',
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

function description(title) {
  return [
    `<p>${title} is a draft North &amp; Pearl catalog candidate selected for review. It should remain unpublished until product imagery, exact composition, finish, sizing, supplier status, pricing, and packaging details are verified.</p>`,
    '<h3>Before activation</h3>',
    '<ul>',
    '<li>Confirm exact material, finish, stone or accent composition, dimensions, and care requirements from supplier documentation.</li>',
    '<li>Confirm at least three accurate product images that match the item customers will receive.</li>',
    '<li>Confirm inventory availability, MOQ, sample cost, production lead time, and shipping options.</li>',
    '<li>Do not publish precious-metal, gemstone, allergy, waterproof, tarnish-free, or durability claims until verified.</li>',
    '</ul>',
  ].join('');
}

const handles = Object.keys(titleUpdates);
const products = gql(
  `query DraftClaimSensitiveProducts($query: String!) {
    products(first: 50, query: $query) {
      nodes { id title handle status seo { title description } }
    }
  }`,
  { query: handles.map((handle) => `handle:${handle}`).join(' OR ') },
).products.nodes;

const changed = [];

for (const product of products) {
  if (product.status !== 'DRAFT') continue;
  const nextTitle = titleUpdates[product.handle];
  if (!nextTitle) continue;

  const result = gql(
    `mutation CleanDraftClaimSensitiveProduct($product: ProductUpdateInput!) {
      productUpdate(product: $product) {
        product { id title handle status seo { title description } }
        userErrors { field message }
      }
    }`,
    {
      product: {
        id: product.id,
        title: nextTitle,
        descriptionHtml: description(nextTitle),
        seo: {
          title: `${nextTitle} | North & Pearl`,
          description: `${nextTitle} is a draft North & Pearl product candidate pending supplier, image, material, and fulfillment verification before activation.`,
        },
      },
    },
    true,
  ).productUpdate;

  if (result.userErrors.length) {
    console.log(`warning ${product.handle}: ${JSON.stringify(result.userErrors)}`);
  } else {
    changed.push({
      handle: result.product.handle,
      oldTitle: product.title,
      newTitle: result.product.title,
      status: result.product.status,
    });
  }
}

console.table(changed);
console.log(`Cleaned ${changed.length} draft product candidate(s).`);
