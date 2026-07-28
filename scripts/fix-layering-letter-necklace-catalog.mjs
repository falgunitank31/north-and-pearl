import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-letter-necklace-catalog-fix-'));
const backupPath = 'reports/catalog-fix-layering-letter-necklace-backup-2026-07-28.json';

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
  execFileSync('npx', args, { stdio: ['ignore', 'pipe', 'pipe'] });
  return JSON.parse(readFileSync(outputFile, 'utf8'));
}

function assertNoErrors(label, payload, field = 'userErrors') {
  const errors = payload?.[field] || payload?.mediaUserErrors || [];
  if (errors.length) {
    throw new Error(`${label}: ${JSON.stringify(errors)}`);
  }
}

const product = gql(
  `query ProductByHandle($query: String!) {
    products(first: 1, query: $query) {
      nodes {
        id
        title
        handle
        productType
        status
        tags
        seo { title description }
        descriptionHtml
        onlineStoreUrl
        collections(first: 20) { nodes { id title handle } }
        media(first: 20) {
          nodes {
            id
            alt
            mediaContentType
            preview { image { url width height } }
          }
        }
      }
    }
  }`,
  { query: 'handle:north-pearl-letter-bracelet' },
).products.nodes[0];

if (!product) throw new Error('Product not found: north-pearl-letter-bracelet');

const collections = gql(
  `query Collections {
    necklaces: collections(first: 1, query: "handle:necklaces") { nodes { id title handle } }
    bracelets: collections(first: 1, query: "handle:bracelets") { nodes { id title handle } }
  }`,
);

const necklaceCollection = collections.necklaces.nodes[0];
const braceletCollection = collections.bracelets.nodes[0];
if (!necklaceCollection || !braceletCollection) {
  throw new Error('Required collection not found.');
}

mkdirSync(dirname(backupPath), { recursive: true });
writeFileSync(
  backupPath,
  JSON.stringify(
    {
      capturedAt: new Date().toISOString(),
      product,
      intendedFix: {
        title: 'North & Pearl Layering Name Necklace',
        handle: 'north-pearl-layering-name-necklace',
        productType: 'Necklace',
        removeFromCollection: braceletCollection,
        addToCollection: necklaceCollection,
      },
    },
    null,
    2,
  ),
);

const nextTags = Array.from(
  new Set(
    product.tags
      .filter((tag) => tag !== 'bracelet')
      .concat(['necklace', 'name-necklace'])
      .filter(Boolean),
  ),
).sort();

const descriptionHtml = [
  '<p>Layering Name Necklace is a polished personalized necklace selected for meaningful gifting, everyday styling, and a refined North &amp; Pearl jewelry-box feel.</p>',
  '<h3>Why you will love it</h3>',
  '<ul>',
  '<li>Name-focused design with a warm, personal feel.</li>',
  '<li>Easy to style for everyday outfits, celebrations, and thoughtful moments.</li>',
  '<li>Works well for birthdays, anniversaries, bridesmaids, friends, family, and self-gifting depending on the personalization selected.</li>',
  '</ul>',
  '<h3>Before you personalize</h3>',
  '<p>Review your spelling carefully before checkout. Material-specific guidance will be expanded after item-level documentation is confirmed.</p>',
  '<h3>Gift note</h3>',
  '<p>Add a jewelry gift box or personal message when you want the moment to feel more considered.</p>',
  '<h3>Care</h3>',
  '<p>Store separately, avoid harsh cleaners, and keep dry between wears. Material-specific care guidance will be expanded after item-level documentation is confirmed.</p>',
].join('');

const updated = gql(
  `mutation ProductUpdate($input: ProductInput!) {
    productUpdate(input: $input) {
      product { id title handle productType tags seo { title description } }
      userErrors { field message }
    }
  }`,
  {
    input: {
      id: product.id,
      title: 'North & Pearl Layering Name Necklace',
      handle: 'north-pearl-layering-name-necklace',
      productType: 'Necklace',
      tags: nextTags,
      descriptionHtml,
      seo: {
        title: 'Layering Name Necklace | North & Pearl',
        description:
          'Layering Name Necklace from North & Pearl, selected for meaningful gifting, everyday styling, and polished jewelry-box moments.',
      },
    },
  },
  true,
).productUpdate;
assertNoErrors('productUpdate', updated);

const inBracelets = product.collections.nodes.some((collection) => collection.handle === 'bracelets');
if (inBracelets) {
  const removed = gql(
    `mutation RemoveFromCollection($id: ID!, $productIds: [ID!]!) {
      collectionRemoveProducts(id: $id, productIds: $productIds) {
        job { id done }
        userErrors { field message }
      }
    }`,
    { id: braceletCollection.id, productIds: [product.id] },
    true,
  ).collectionRemoveProducts;
  assertNoErrors('collectionRemoveProducts', removed);
}

const inNecklaces = product.collections.nodes.some((collection) => collection.handle === 'necklaces');
if (!inNecklaces) {
  const added = gql(
    `mutation AddToCollection($id: ID!, $productIds: [ID!]!) {
      collectionAddProducts(id: $id, productIds: $productIds) {
        userErrors { field message }
      }
    }`,
    { id: necklaceCollection.id, productIds: [product.id] },
    true,
  ).collectionAddProducts;
  assertNoErrors('collectionAddProducts', added);
}

try {
  const redirect = gql(
    `mutation RedirectCreate($redirect: UrlRedirectInput!) {
      urlRedirectCreate(urlRedirect: $redirect) {
        urlRedirect { id path target }
        userErrors { field message }
      }
    }`,
    {
      redirect: {
        path: '/products/north-pearl-letter-bracelet',
        target: '/products/north-pearl-layering-name-necklace',
      },
    },
    true,
  ).urlRedirectCreate;
  if (redirect.userErrors.length) {
    console.log(`redirect warning: ${JSON.stringify(redirect.userErrors)}`);
  }
} catch (error) {
  console.log(`redirect warning: ${error.message}`);
}

console.log(`Updated ${updated.product.title}`);
console.log(`Handle: ${updated.product.handle}`);
console.log(`Backup: ${backupPath}`);
