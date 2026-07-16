import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const onlineStorePublicationId = 'gid://shopify/Publication/331104157880';
const tempDir = mkdtempSync(join(tmpdir(), 'np-publish-'));

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

function publish(id, label) {
  const result = gql(
    `mutation Publish($id: ID!, $input: [PublicationInput!]!) {
      publishablePublish(id: $id, input: $input) {
        publishable { publishedOnPublication(publicationId: "${onlineStorePublicationId}") }
        userErrors { field message }
      }
    }`,
    { id, input: [{ publicationId: onlineStorePublicationId }] },
    true,
  ).publishablePublish;

  const alreadyPublished = result.userErrors.some((error) => error.message.toLowerCase().includes('already published'));
  if (result.userErrors.length && !alreadyPublished) {
    console.log(`publish warning ${label}: ${JSON.stringify(result.userErrors)}`);
  } else {
    console.log(`published: ${label}`);
  }
}

const data = gql(`query LaunchResources {
  products(first: 100) {
    nodes { id title handle }
  }
  collections(first: 100) {
    nodes { id title handle }
  }
}`);

const launchProductPrefix = 'north-pearl-';
const launchCollectionHandles = new Set([
  'best-sellers',
  'necklaces',
  'name-necklaces',
  'initial-necklaces',
  'birthstone-jewelry',
  'couple-jewelry',
  'bracelets',
  'rings',
  'earrings',
  'gifts',
  'mothers-collection',
  'wedding-bridesmaids',
  'mens-jewelry',
  'gift-cards',
  'new-arrivals',
  'sale',
]);

const products = data.products.nodes.filter((product) => product.handle.startsWith(launchProductPrefix));
const collections = data.collections.nodes.filter((collection) => launchCollectionHandles.has(collection.handle));

for (const product of products) publish(product.id, `product ${product.title}`);
for (const collection of collections) publish(collection.id, `collection ${collection.title}`);

console.log(`Published ${products.length} products and ${collections.length} collections to Online Store.`);
