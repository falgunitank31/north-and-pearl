import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-empty-collections-'));

const updates = {
  'mens-jewelry': [
    '<p>North &amp; Pearl is preparing a focused men’s jewelry edit for meaningful gifts, everyday pieces, and personalized styles. Product details will be added only after supplier specifications and imagery are confirmed.</p>',
    '<p>For now, explore <a href="/collections/gifts">Gifts</a>, <a href="/collections/bracelets">Bracelets</a>, <a href="/collections/necklaces">Necklaces</a>, and <a href="/collections/couple-jewelry">Couple Jewelry</a> for thoughtful gift-ready options.</p>',
  ].join(''),
  'gift-cards': [
    '<p>Gift cards are planned for shoppers who want to give something meaningful while letting the recipient choose their own style, personalization, and favorite North &amp; Pearl piece.</p>',
    '<p>Until gift cards are active, browse <a href="/collections/gifts">Gifts</a>, <a href="/collections/best-sellers">Best Sellers</a>, <a href="/collections/name-necklaces">Name Necklaces</a>, and <a href="/collections/initial-necklaces">Initial Necklaces</a>.</p>',
  ].join(''),
  sale: [
    '<p>The North &amp; Pearl sale collection will be updated when a promotion is active. We keep this page clear so customers only see current, accurate offers.</p>',
    '<p>For live products, shop <a href="/collections/best-sellers">Best Sellers</a>, <a href="/collections/new-arrivals">New Arrivals</a>, <a href="/collections/gifts">Gifts</a>, and <a href="/collections/bracelets">Bracelets</a>.</p>',
  ].join(''),
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

const collections = gql(
  `query EmptyCollections($query: String!) {
    collections(first: 20, query: $query) {
      nodes { id title handle productsCount { count } }
    }
  }`,
  { query: Object.keys(updates).map((handle) => `handle:${handle}`).join(' OR ') },
).collections.nodes;

const changed = [];

for (const collection of collections) {
  if (collection.productsCount.count !== 0) continue;
  const result = gql(
    `mutation UpdateEmptyCollectionCopy($input: CollectionInput!) {
      collectionUpdate(input: $input) {
        collection { id handle title }
        userErrors { field message }
      }
    }`,
    {
      input: {
        id: collection.id,
        descriptionHtml: updates[collection.handle],
      },
    },
    true,
  ).collectionUpdate;

  if (result.userErrors.length) {
    console.log(`warning ${collection.handle}: ${JSON.stringify(result.userErrors)}`);
  } else {
    changed.push({ handle: result.collection.handle, title: result.collection.title });
  }
}

console.table(changed);
console.log(`Updated empty-state copy for ${changed.length} empty collection(s).`);
