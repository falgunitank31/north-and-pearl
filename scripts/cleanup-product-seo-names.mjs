import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-product-name-cleanup-'));

const updates = {
  'north-pearl-crystal-bracelet': ['North & Pearl Crystal Accent Bracelet', 'north-pearl-crystal-accent-bracelet', 'A crystal-accent bracelet selected for easy gifting, layering, and everyday meaning.'],
  'north-pearl-crystal-bracelet-2183': ['North & Pearl Crystal Halo Bracelet', 'north-pearl-crystal-halo-bracelet', 'A crystal-inspired bracelet with polished gift appeal and everyday sparkle.'],
  'north-pearl-crystal-bracelet-6205': ['North & Pearl Crystal Row Bracelet', 'north-pearl-crystal-row-bracelet', 'A crystal-row bracelet chosen for refined styling, layering, and meaningful gifting.'],
  'north-pearl-crystal-bracelet-1371': ['North & Pearl Crystal Link Bracelet', 'north-pearl-crystal-link-bracelet', 'A crystal-link bracelet selected for polished everyday wear and thoughtful gifting.'],
  'north-pearl-crystal-bracelet-9725': ['North & Pearl Crystal Bead Bracelet', 'north-pearl-crystal-bead-bracelet', 'A crystal-bead bracelet with a giftable, layered look for everyday moments.'],
  'north-pearl-flower-bracelet': ['North & Pearl Bloom Charm Bracelet', 'north-pearl-bloom-charm-bracelet', 'A bloom-inspired bracelet selected for soft, meaningful gifting and everyday styling.'],
  'north-pearl-flower-bracelet-8784': ['North & Pearl Garden Flower Bracelet', 'north-pearl-garden-flower-bracelet', 'A flower-inspired bracelet with feminine gift appeal and easy layering potential.'],
  'north-pearl-flower-bracelet-6429': ['North & Pearl Floral Accent Bracelet', 'north-pearl-floral-accent-bracelet', 'A floral-accent bracelet selected for birthdays, mothers, friends, and thoughtful self-gifting.'],
  'north-pearl-heart-necklace': ['North & Pearl Sweetheart Pendant Necklace', 'north-pearl-sweetheart-pendant-necklace', 'A sweetheart-inspired necklace for romantic, family, and friendship gifting.'],
  'north-pearl-heart-necklace-5936': ['North & Pearl Heart Drop Necklace', 'north-pearl-heart-drop-necklace', 'A heart-drop necklace chosen for meaningful everyday gifting and polished styling.'],
  'north-pearl-heart-necklace-4000': ['North & Pearl Heart Charm Necklace', 'north-pearl-heart-charm-necklace', 'A heart-charm necklace with sentimental gift appeal for life’s meaningful moments.'],
  'north-pearl-snake-chain-bracelet': ['North & Pearl Sleek Snake Chain Bracelet', 'north-pearl-sleek-snake-chain-bracelet', 'A sleek snake-chain bracelet selected for polished everyday wear and gifting.'],
  'north-pearl-snake-chain-bracelet-0353': ['North & Pearl Smooth Snake Chain Bracelet', 'north-pearl-smooth-snake-chain-bracelet', 'A smooth snake-chain bracelet chosen for simple styling, layering, and everyday meaning.'],
  'north-pearl-chain-bracelet': ['North & Pearl Polished Chain Bracelet', 'north-pearl-polished-chain-bracelet', 'A polished chain bracelet selected for easy gifting and everyday layering.'],
  'north-pearl-hoop-earrings': ['North & Pearl Everyday Hoop Earrings', 'north-pearl-everyday-hoop-earrings', 'A refined hoop earring style for everyday polish and thoughtful gifting.'],
  'north-pearl-signature-earrings': ['North & Pearl Modern Drop Earrings', 'north-pearl-modern-drop-earrings', 'A modern earring style selected for polished occasions and everyday gifting.'],
  'north-pearl-signature-necklace': ['North & Pearl Minimal Pendant Necklace', 'north-pearl-minimal-pendant-necklace', 'A minimal pendant necklace selected for refined everyday style and meaningful gifting.'],
  'north-pearl-signature-ring': ['North & Pearl Modern Statement Ring', 'north-pearl-modern-statement-ring', 'A modern statement ring chosen for giftable style and everyday wear.'],
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
const products = gql(
  `query ProductsForNameCleanup($query: String!) {
    products(first: 100, query: $query) {
      nodes {
        id
        title
        handle
        seo { title description }
      }
    }
  }`,
  { query: handles.map((handle) => `handle:${handle}`).join(' OR ') },
).products.nodes;

const byHandle = new Map(products.map((product) => [product.handle, product]));
const changed = [];

for (const handle of handles) {
  const product = byHandle.get(handle);
  if (!product) {
    console.log(`missing: ${handle}`);
    continue;
  }
  const [title, nextHandle, description] = updates[handle];
  const result = gql(
    `mutation UpdateProductNameSeo($product: ProductUpdateInput!) {
      productUpdate(product: $product) {
        product { id title handle seo { title description } }
        userErrors { field message }
      }
    }`,
    {
      product: {
        id: product.id,
        title,
        handle: nextHandle,
        seo: {
          title: `${title} | Jewelry Gifts | North & Pearl`,
          description,
        },
      },
    },
    true,
  ).productUpdate;

  if (result.userErrors.length) {
    console.log(`warning ${product.title}: ${JSON.stringify(result.userErrors)}`);
  } else {
    changed.push({ from: product.title, to: result.product.title, handle: result.product.handle });
    console.log(`renamed: ${product.title} -> ${result.product.title}`);
  }
}

console.table(changed);
