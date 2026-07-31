import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-pareto-gift-sets-'));
const today = new Date().toISOString().slice(0, 10);
const reportPath = `reports/pareto-gift-sets-collection-${today}.md`;

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

function assertNoErrors(label, result) {
  if (result.userErrors?.length) {
    throw new Error(`${label}: ${JSON.stringify(result.userErrors)}`);
  }
}

const existing = gql(
  `query ExistingCollection {
    collections(first: 10, query: "handle:jewelry-gift-sets") {
      nodes { id title handle productsCount { count } }
    }
  }`,
).collections.nodes[0];

const products = gql(
  `query GiftSetProducts {
    products(first: 50, query: "status:ACTIVE AND product_type:'Gift Set'") {
      nodes {
        id
        title
        handle
        status
        productType
        featuredMedia { preview { image { width height } } }
        priceRangeV2 { minVariantPrice { amount currencyCode } }
      }
    }
  }`,
).products.nodes
  .filter((product) => product.featuredMedia?.preview?.image)
  .sort((a, b) => Number(b.priceRangeV2.minVariantPrice.amount) - Number(a.priceRangeV2.minVariantPrice.amount));

if (products.length < 6) {
  throw new Error(`Only ${products.length} active gift-set products were eligible; holding collection creation.`);
}

const input = {
  title: 'Jewelry Gift Sets',
  handle: 'jewelry-gift-sets',
  descriptionHtml: [
    '<p>Shop North & Pearl jewelry gift sets curated for shoppers who want a complete, polished gift path without building a pairing from scratch.</p>',
    '<p>Each product page is the source of truth for photos, available options, care notes, and product-specific details. No material or durability claims are made unless confirmed on the product page.</p>',
    '<h2>How to choose a jewelry gift set</h2>',
    '<p>Start with the recipient’s style, then compare the set by category, price, product photos, and occasion. Gift sets can be useful for birthdays, bridal moments, anniversaries, and meaningful everyday gifting.</p>',
    '<h2>Helpful next steps</h2>',
    '<p>Browse <a href="/collections/jewelry-gifts-for-her">Jewelry Gifts for Her</a>, <a href="/collections/gifts-under-100">Gifts Under $100</a>, and <a href="/collections/personalized-jewelry">Personalized Jewelry</a>.</p>',
  ].join('\n'),
  sortOrder: 'MANUAL',
  seo: {
    title: 'Jewelry Gift Sets | North & Pearl',
    description: 'Shop jewelry gift sets from North & Pearl, including curated necklace, bracelet, earring, and meaningful gift-ready jewelry styles.',
  },
};

let collection = existing;
if (collection) {
  const updated = gql(
    `mutation UpdateGiftSets($input: CollectionInput!) {
      collectionUpdate(input: $input) {
        collection { id title handle }
        userErrors { field message }
      }
    }`,
    { input: { id: collection.id, ...input } },
    true,
  ).collectionUpdate;
  assertNoErrors('collectionUpdate', updated);
  collection = updated.collection;
} else {
  const created = gql(
    `mutation CreateGiftSets($input: CollectionInput!) {
      collectionCreate(input: $input) {
        collection { id title handle }
        userErrors { field message }
      }
    }`,
    { input },
    true,
  ).collectionCreate;
  assertNoErrors('collectionCreate', created);
  collection = created.collection;
}

const currentProducts = gql(
  `query CollectionProducts($id: ID!) {
    collection(id: $id) { products(first: 100) { nodes { id title handle } } }
  }`,
  { id: collection.id },
).collection.products.nodes;

const desiredIds = new Set(products.map((product) => product.id));
const currentIds = new Set(currentProducts.map((product) => product.id));
const remove = currentProducts.filter((product) => !desiredIds.has(product.id));
const add = products.filter((product) => !currentIds.has(product.id));

if (remove.length) {
  const removed = gql(
    `mutation RemoveProducts($id: ID!, $productIds: [ID!]!) {
      collectionRemoveProducts(id: $id, productIds: $productIds) { userErrors { field message } }
    }`,
    { id: collection.id, productIds: remove.map((product) => product.id) },
    true,
  ).collectionRemoveProducts;
  assertNoErrors('collectionRemoveProducts', removed);
}

if (add.length) {
  const added = gql(
    `mutation AddProducts($id: ID!, $productIds: [ID!]!) {
      collectionAddProducts(id: $id, productIds: $productIds) { userErrors { field message } }
    }`,
    { id: collection.id, productIds: add.map((product) => product.id) },
    true,
  ).collectionAddProducts;
  const realErrors = added.userErrors.filter((error) => !error.message.includes('already exists'));
  if (realErrors.length) throw new Error(`collectionAddProducts: ${JSON.stringify(realErrors)}`);
}

const publications = gql(
  `query Publications { publications(first: 50) { nodes { id name } } }`,
).publications.nodes.filter((publication) => ['Online Store', 'Google & YouTube'].includes(publication.name));

if (publications.length) {
  const published = gql(
    `mutation PublishCollection($id: ID!, $input: [PublicationInput!]!) {
      publishablePublish(id: $id, input: $input) { userErrors { field message } }
    }`,
    { id: collection.id, input: publications.map((publication) => ({ publicationId: publication.id })) },
    true,
  ).publishablePublish;
  assertNoErrors('publishablePublish', published);
}

const finalProducts = gql(
  `query FinalCollection($id: ID!) {
    collection(id: $id) { title handle productsCount { count } products(first: 20) { nodes { title handle } } }
  }`,
  { id: collection.id },
).collection;

mkdirSync('reports', { recursive: true });
writeFileSync(reportPath, [
  `# Pareto Jewelry Gift Sets Collection - ${today}`,
  '',
  'Owner: Pareto with Gauss, Kuhn, Faraday, Curie, Lovelace, Tesla, and Rawls alignment.',
  '',
  '## Work Completed',
  '',
  `- ${existing ? 'Updated' : 'Created'} collection: Jewelry Gift Sets`,
  '- Handle: `/collections/jewelry-gift-sets`',
  `- Final product count: ${finalProducts.productsCount.count}`,
  `- Added products: ${add.length}`,
  `- Removed products: ${remove.length}`,
  `- Published to: ${publications.map((publication) => publication.name).join(', ') || 'No publications available'}`,
  '',
  '## Commercial Reason',
  '',
  'This creates an AOV-friendly shopping path without discounting, fake scarcity, or unsupported claims.',
  '',
  '## Products',
  '',
  ...finalProducts.products.nodes.map((product) => `- ${product.title} (${product.handle})`),
  '',
  '## Guardrails',
  '',
  '- No discount, bundle pricing, shipping threshold, or gift-with-purchase was launched.',
  '- Product pages remain the source of truth for product-specific details.',
].join('\n'));

console.log(JSON.stringify({
  collection: '/collections/jewelry-gift-sets',
  count: finalProducts.productsCount.count,
  added: add.length,
  removed: remove.length,
  reportPath,
}, null, 2));
