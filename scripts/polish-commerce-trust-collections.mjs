import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-trust-collections-'));

const updates = {
  'new-arrivals': {
    html:
      '<p>Explore the newest North & Pearl jewelry additions, including personal pieces, giftable necklaces, bracelets, rings, earrings, and meaningful styles selected for everyday moments.</p>',
    seoTitle: 'New Jewelry Arrivals | North & Pearl',
    meta: 'Shop new North & Pearl jewelry arrivals, including meaningful necklaces, bracelets, rings, earrings, and giftable pieces for everyday moments.',
  },
  sale: {
    html:
      '<p>This collection is reserved for verified North & Pearl promotional pieces. Products are added only when an approved promotion or markdown is active.</p>',
    seoTitle: 'Jewelry Offers | North & Pearl',
    meta: 'View approved North & Pearl jewelry offers when active. Promotional products are shown only when available.',
  },
  'mens-jewelry': {
    html:
      '<p>This collection is reserved for giftable jewelry styles suitable for men once product selection, sizing, materials, and fulfillment details are confirmed.</p>',
    seoTitle: "Men's Jewelry Gifts | North & Pearl",
    meta: "Explore North & Pearl men's jewelry gifts when confirmed styles are available.",
  },
  frontpage: {
    html:
      '<p>A reserved Shopify system collection for North & Pearl homepage merchandising. Customer shopping paths are managed through featured collections and navigation.</p>',
    seoTitle: 'North & Pearl Homepage Collection',
    meta: 'Reserved North & Pearl homepage merchandising collection.',
  },
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

const handles = Object.keys(updates);
const collections = gql(
  `query CollectionsForTrustPolish($query: String!) {
    collections(first: 50, query: $query) {
      nodes { id title handle productsCount { count } descriptionHtml seo { title description } }
    }
  }`,
  { query: handles.map((handle) => `handle:${handle}`).join(' OR ') },
).collections.nodes;

const byHandle = new Map(collections.map((collection) => [collection.handle, collection]));
const changed = [];

for (const handle of handles) {
  const collection = byHandle.get(handle);
  if (!collection) {
    console.log(`missing: ${handle}`);
    continue;
  }

  const update = updates[handle];
  const result = gql(
    `mutation UpdateTrustCollection($input: CollectionInput!) {
      collectionUpdate(input: $input) {
        collection { id title handle seo { title description } }
        userErrors { field message }
      }
    }`,
    {
      input: {
        id: collection.id,
        descriptionHtml: update.html,
        seo: {
          title: update.seoTitle,
          description: update.meta,
        },
      },
    },
    true,
  ).collectionUpdate;

  if (result.userErrors.length) {
    console.log(`warning ${handle}: ${JSON.stringify(result.userErrors)}`);
  } else {
    changed.push({ handle, title: result.collection.title, seoTitle: result.collection.seo.title });
  }
}

console.table(changed);
