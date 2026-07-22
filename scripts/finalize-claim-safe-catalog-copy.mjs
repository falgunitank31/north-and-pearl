import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-final-claim-copy-'));

const updates = {
  'north-pearl-zircon-bracelet': {
    title: 'North & Pearl Dainty Sparkle Bracelet',
    description:
      'A dainty sparkle-accent bracelet chosen for simple gifting, everyday shine, and easy styling. Stone, setting, material, finish, and sizing details must be verified before stronger product claims are made.',
    seoTitle: 'Dainty Sparkle Bracelet | North & Pearl',
  },
  'north-pearl-crystal-accent-bracelet': {
    title: 'North & Pearl Linear Sparkle Bracelet',
    description:
      'A linear sparkle-accent bracelet selected for polished everyday styling and thoughtful gifting. Exact stone, finish, material, and sizing details require supplier confirmation before stronger claims are made.',
    seoTitle: 'Linear Sparkle Bracelet | North & Pearl',
  },
};

const reviewHandles = [
  'north-pearl-opal-pendant-necklace',
  'north-pearl-crystal-gemstone-cuff',
  'north-pearl-zircon-bracelet',
  'north-pearl-smooth-gold-ring',
  'north-pearl-chunky-pearl-bracelet',
  'north-pearl-gold-bead-stretch-bracelet',
  'north-pearl-crystal-row-bracelet',
  'north-pearl-crystal-link-bracelet',
  'north-pearl-crystal-pulse-bracelet',
  'north-pearl-crystal-accent-bracelet',
  'north-pearl-crystal-halo-bracelet',
  'north-pearl-crystal-bead-bracelet',
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

function cleanHtml(product, update = {}) {
  const intro =
    update.description ||
    `${product.title} is selected for thoughtful gifting, everyday styling, and a polished North & Pearl jewelry look. Exact product composition, finish, sizing, and packaging details should be verified against supplier documentation before stronger claims are made.`;

  return [
    `<p>${intro}</p>`,
    '<h3>Why it makes a meaningful gift</h3>',
    '<p>Chosen for birthdays, anniversaries, bridesmaids, mothers, friends, sisters, partners, and thoughtful self-gifting depending on the recipient and style.</p>',
    '<h3>Details to confirm</h3>',
    '<ul>',
    '<li>Product composition, finish, sizing, and packaging should be confirmed with supplier documentation and samples before stronger claims are made.</li>',
    '<li>North &amp; Pearl only publishes item-level quality or performance claims after they are verified for the specific product.</li>',
    '</ul>',
    '<h3>Care note</h3>',
    '<p>Until final product composition is confirmed, store separately, keep dry between wears, and avoid direct contact with lotions, perfumes, and harsh cleaners.</p>',
  ].join('');
}

const products = gql(
  `query ProductsForFinalClaimCopy($query: String!) {
    products(first: 100, query: $query) {
      nodes { id title handle status seo { title description } }
    }
  }`,
  { query: reviewHandles.map((handle) => `handle:${handle}`).join(' OR ') },
).products.nodes;

const changed = [];

for (const product of products) {
  if (product.status !== 'ACTIVE') continue;

  const update = updates[product.handle] || {};
  const nextTitle = update.title || product.title;
  const nextDescription =
    update.description ||
    `${nextTitle} is selected for thoughtful gifting, everyday styling, and a polished North & Pearl jewelry look. Exact product composition, finish, sizing, and packaging details should be verified against supplier documentation before stronger claims are made.`;

  const result = gql(
    `mutation FinalizeClaimSafeCopy($product: ProductUpdateInput!) {
      productUpdate(product: $product) {
        product { title handle seo { title description } }
        userErrors { field message }
      }
    }`,
    {
      product: {
        id: product.id,
        title: nextTitle,
        descriptionHtml: cleanHtml(product, update),
        seo: {
          title: update.seoTitle || product.seo?.title || `${nextTitle} | North & Pearl`,
          description: nextDescription,
        },
      },
    },
    true,
  ).productUpdate;

  if (result.userErrors.length) {
    console.log(`warning ${product.handle}: ${JSON.stringify(result.userErrors)}`);
  } else {
    changed.push({ handle: product.handle, title: result.product.title });
  }
}

console.table(changed);
