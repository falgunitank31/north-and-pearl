import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-duplicate-name-cleanup-'));

const updates = {
  'north-pearl-signature-bracelet': {
    title: 'North & Pearl Everyday Oval Link Bracelet',
    description: 'A polished oval-link bracelet selected for everyday layering, thoughtful gifting, and a clean jewelry-box staple.',
  },
  'north-pearl-signature-bracelet-1724': {
    title: 'North & Pearl Everyday Rounded Link Bracelet',
    description: 'A rounded-link bracelet chosen for soft shine, easy styling, and meaningful everyday gifting.',
  },
  'north-pearl-name-necklace-5330': {
    title: 'North & Pearl Everyday Script Name Necklace',
    description: 'A script-style name necklace for personal details, milestone gifts, and everyday sentimental wear.',
  },
  'north-pearl-name-necklace-4242': {
    title: 'North & Pearl Everyday Classic Name Necklace',
    description: 'A classic name necklace selected for personalized gifting, birthdays, anniversaries, and everyday meaning.',
  },
  'north-pearl-name-necklace-4075': {
    title: 'North & Pearl Floating Script Name Necklace',
    description: 'A floating script name necklace with a light, personal look for meaningful gift moments.',
  },
  'north-pearl-name-necklace-1956': {
    title: 'North & Pearl Floating Nameplate Necklace',
    description: 'A floating nameplate necklace selected for personal styling, thoughtful gifting, and everyday wear.',
  },
  'north-pearl-name-necklace-6429': {
    title: 'North & Pearl Giftable Script Name Necklace',
    description: 'A giftable script name necklace created for names, words, and meaningful personal details.',
  },
  'north-pearl-name-necklace-8379': {
    title: 'North & Pearl Giftable Nameplate Necklace',
    description: 'A nameplate-style necklace selected for personalized gifts and everyday sentimental jewelry.',
  },
  'north-pearl-polished-link-bracelet': {
    title: 'North & Pearl Polished Oval Link Bracelet',
    description: 'A polished oval-link bracelet chosen for refined layering and easy jewelry gifting.',
  },
  'north-pearl-signature-bracelet-6593': {
    title: 'North & Pearl Polished Statement Link Bracelet',
    description: 'A statement link bracelet with a clean polished look for gifting, styling, and everyday wear.',
  },
  'north-pearl-name-necklace-1996': {
    title: 'North & Pearl Refined Script Name Necklace',
    description: 'A refined script name necklace selected for personal details, milestones, and meaningful gifts.',
  },
  'north-pearl-name-necklace-6441': {
    title: 'North & Pearl Refined Nameplate Necklace',
    description: 'A refined nameplate necklace chosen for personal styling and giftable everyday meaning.',
  },
  'north-pearl-name-necklace-6152': {
    title: 'North & Pearl Script Floating Name Necklace',
    description: 'A floating script name necklace selected for names, meaningful words, and personal gifting.',
  },
  'north-pearl-name-necklace-1616': {
    title: 'North & Pearl Script Classic Name Necklace',
    description: 'A classic script name necklace chosen for personalized gifting and everyday sentimental wear.',
  },
  'north-pearl-letter-necklace-7676': {
    title: 'North & Pearl Framed Heirloom Letter Necklace',
    description: 'A framed letter necklace selected for initials, personal symbolism, and thoughtful gifting.',
  },
  'north-pearl-name-necklace-0389': {
    title: 'North & Pearl Heirloom Script Name Necklace',
    description: 'A signature script name necklace for meaningful personalization and everyday wear.',
  },
  'north-pearl-sweetheart-pendant-necklace': {
    title: 'North & Pearl Sweetheart Oval Pendant Necklace',
    description: 'A sweetheart-inspired pendant necklace selected for romantic gifts, family gifts, and sentimental everyday styling.',
  },
  'north-pearl-heart-necklace-2260': {
    title: 'North & Pearl Sweetheart Drop Pendant Necklace',
    description: 'A sweetheart drop pendant necklace chosen for meaningful gifting and polished daily wear.',
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

function descriptionHtml(update) {
  return [
    `<p>${update.description}</p>`,
    '<h3>Why it makes a meaningful gift</h3>',
    '<p>Selected for birthdays, anniversaries, bridesmaids, mothers, partners, friends, sisters, and thoughtful self-gifting depending on the recipient and style.</p>',
    '<h3>Product details</h3>',
    '<p>Exact materials, finish, sizing, stones, and packaging details should be confirmed against the final product record before stronger product claims are published.</p>',
    '<h3>Care note</h3>',
    '<p>Store separately, keep dry between wears, and avoid direct contact with lotions, perfumes, and harsh cleaners unless product-specific care guidance says otherwise.</p>',
  ].join('');
}

const products = gql(
  `query DuplicateNameProducts($query: String!) {
    products(first: 100, query: $query) {
      nodes { id title handle status }
    }
  }`,
  { query: Object.keys(updates).map((handle) => `handle:${handle}`).join(' OR ') },
).products.nodes;

const byHandle = new Map(products.map((product) => [product.handle, product]));
const changed = [];

for (const [handle, update] of Object.entries(updates)) {
  const product = byHandle.get(handle);
  if (!product || product.status !== 'ACTIVE') continue;

  const result = gql(
    `mutation UpdateDuplicateNameProduct($product: ProductUpdateInput!) {
      productUpdate(product: $product) {
        product { id title handle seo { title description } }
        userErrors { field message }
      }
    }`,
    {
      product: {
        id: product.id,
        title: update.title,
        descriptionHtml: descriptionHtml(update),
        seo: {
          title: `${update.title} | North & Pearl`,
          description: update.description,
        },
      },
    },
    true,
  ).productUpdate;

  if (result.userErrors.length) {
    console.log(`warning ${handle}: ${JSON.stringify(result.userErrors)}`);
  } else {
    changed.push({ handle, from: product.title, to: result.product.title });
  }
}

console.table(changed);
