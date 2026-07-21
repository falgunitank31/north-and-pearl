import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-remaining-catalog-cleanup-'));

const updates = {
  'north-pearl-sculpted-hoop-earrings': {
    title: 'North & Pearl Sculpted Curve Earrings',
    handle: 'north-pearl-sculpted-curve-earrings',
    description:
      'A sculpted earring style selected for everyday polish and easy gifting. Exact materials, finish, closure style, and comfort details must be confirmed with supplier samples before stronger product claims are made.',
  },
  'north-pearl-everyday-hoop-earrings': {
    title: 'North & Pearl Everyday Curve Earrings',
    handle: 'north-pearl-everyday-curve-earrings',
    description:
      'A refined curved earring style for everyday polish and thoughtful gifting. Final material, finish, and comfort details must be confirmed before stronger claims are made.',
  },
  'north-pearl-garden-flower-bracelet': {
    title: 'North & Pearl Garden Bloom Bracelet',
    handle: 'north-pearl-garden-bloom-bracelet',
    description:
      'A garden-bloom bracelet selected for birthdays, mothers, friends, sisters, and thoughtful self-gifting. Product materials, sizing, finish, and packaging must be verified before scaling.',
  },
  'north-pearl-polished-chain-bracelet': {
    title: 'North & Pearl Polished Link Bracelet',
    handle: 'north-pearl-polished-link-bracelet',
    description:
      'A polished link bracelet selected for easy gifting and everyday layering. Materials, sizing, clasp details, and finish must be confirmed before stronger product claims are made.',
  },
  'north-pearl-sleek-snake-chain-bracelet': {
    title: 'North & Pearl Sleek Flex Bracelet',
    handle: 'north-pearl-sleek-flex-bracelet',
    description:
      'A sleek flexible bracelet selected for polished everyday wear and gifting. Final material, sizing, clasp, and finish details require sample verification.',
  },
  'north-pearl-smooth-snake-chain-bracelet': {
    title: 'North & Pearl Smooth Flex Bracelet',
    handle: 'north-pearl-smooth-flex-bracelet',
    description:
      'A smooth flexible bracelet chosen for simple styling, layering, and everyday meaning. Exact materials, sizing, clasp, and finish must be confirmed with samples.',
  },
  'north-pearl-flower-nail-bangle': {
    description:
      'A polished floral nail-inspired bangle with a sculptural, gift-ready look. Supplier details, exact materials, finish, sizing, and durability must be verified through samples before stronger product claims are made.',
  },
  'north-pearl-hollow-flower-bangle-set': {
    description:
      'A stackable floral bangle set for a soft, feminine layered bracelet look. Supplier details, materials, finish, sizing, and durability must be verified through samples before stronger product claims are made.',
  },
  'north-pearl-mixed-charm-bangle': {
    description:
      'A polished charm bangle with a sentimental, collectible feel. Supplier details, charm dimensions, fit, finish, and materials must be confirmed through samples before stronger product claims are made.',
  },
  'north-pearl-twine-band-ring': {
    description:
      'A textured twine-inspired band ring for subtle everyday styling. Supplier details, sizing, finish, and materials must be verified through samples before stronger product claims are made.',
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

const products = gql(
  `query ProductsForRemainingCleanup($query: String!) {
    products(first: 50, query: $query) {
      nodes { id title handle descriptionHtml productType seo { title description } }
    }
  }`,
  { query: Object.keys(updates).map((handle) => `handle:${handle}`).join(' OR ') },
).products.nodes;

const productByHandle = new Map(products.map((product) => [product.handle, product]));
const changed = [];

function safeDescription(product, update) {
  const intro = update.description;
  return [
    `<p>${intro}</p>`,
    `<h3>Gift positioning</h3>`,
    `<p>Best for birthdays, anniversaries, bridesmaids, mothers, friends, sisters, and thoughtful self-gifting depending on the style.</p>`,
    `<h3>Details to confirm before scaling</h3>`,
    `<ul>`,
    `<li>Materials, plating, stones, sizing, and packaging must be confirmed with supplier samples before stronger product claims are made.</li>`,
    `<li>North &amp; Pearl does not publish allergy, water, tarnish, metal, or durability claims unless they are verified for the specific item.</li>`,
    `</ul>`,
    `<h3>Care note</h3>`,
    `<p>Final care instructions depend on supplier-confirmed materials and plating. Until confirmed, store separately, avoid harsh cleaners, and keep dry between wears.</p>`,
  ].join('');
}

for (const [handle, update] of Object.entries(updates)) {
  const product = productByHandle.get(handle);
  if (!product) {
    console.log(`missing: ${handle}`);
    continue;
  }

  const nextTitle = update.title || product.title;
  const result = gql(
    `mutation UpdateRemainingCatalogSeo($product: ProductUpdateInput!) {
      productUpdate(product: $product) {
        product { id title handle seo { title description } }
        userErrors { field message }
      }
    }`,
    {
      product: {
        id: product.id,
        title: nextTitle,
        handle: update.handle || product.handle,
        descriptionHtml: safeDescription(product, update),
        seo: {
          title: `${nextTitle} | Jewelry Gifts | North & Pearl`,
          description: update.description,
        },
      },
    },
    true,
  ).productUpdate;

  if (result.userErrors.length) {
    console.log(`warning ${product.title}: ${JSON.stringify(result.userErrors)}`);
  } else {
    changed.push({ from: product.title, to: result.product.title, handle: result.product.handle });
    console.log(`cleaned: ${product.title} -> ${result.product.title}`);
  }
}

console.table(changed);
