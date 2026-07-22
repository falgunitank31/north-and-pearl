import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-safe-rename-'));

const updates = {
  'north-pearl-opal-pendant-necklace': {
    title: 'North & Pearl Iridescent Pendant Necklace',
    description:
      'An iridescent-style pendant necklace selected for soft color, everyday polish, and thoughtful gifting. Product-specific materials, stone details, finish, and chain measurements should be confirmed against supplier documentation before stronger claims are made.',
    seoTitle: 'Iridescent Pendant Necklace | North & Pearl',
  },
  'north-pearl-crystal-gemstone-cuff': {
    title: 'North & Pearl Color Accent Cuff',
    description:
      'A color-accent cuff selected for a polished statement look and meaningful gift moments. Exact materials, stones, finish, sizing, and durability details require supplier and sample confirmation before stronger claims are made.',
    seoTitle: 'Color Accent Cuff Bracelet | North & Pearl',
  },
  'north-pearl-zircon-bracelet': {
    title: 'North & Pearl Sparkle Accent Bracelet',
    description:
      'A sparkle-accent bracelet chosen for simple gifting, everyday shine, and easy styling. Stone, setting, material, finish, and sizing details must be verified before stronger product claims are made.',
    seoTitle: 'Sparkle Accent Bracelet | North & Pearl',
  },
  'north-pearl-smooth-gold-ring': {
    title: 'North & Pearl Smooth Band Ring',
    description:
      'A smooth band ring with a warm jewelry finish and clean everyday silhouette. Exact material, finish, plating, and sizing details should be verified before stronger product claims are made.',
    seoTitle: 'Smooth Band Ring | North & Pearl',
  },
  'north-pearl-chunky-pearl-bracelet': {
    title: 'North & Pearl Chunky Bead Bracelet',
    description:
      'A chunky bead bracelet selected for soft texture, easy styling, and thoughtful gifting. Bead composition, finish, sizing, and care details should be confirmed with supplier documentation before stronger claims are made.',
    seoTitle: 'Chunky Bead Bracelet | North & Pearl',
  },
  'north-pearl-gold-bead-stretch-bracelet': {
    title: 'North & Pearl Warm Bead Stretch Bracelet',
    description:
      'A warm-tone bead stretch bracelet selected for layering, everyday gifting, and easy wear. Exact material, bead finish, stretch construction, and sizing should be confirmed before stronger product claims are made.',
    seoTitle: 'Warm Bead Stretch Bracelet | North & Pearl',
  },
  'north-pearl-crystal-row-bracelet': {
    title: 'North & Pearl Sparkle Row Bracelet',
    description:
      'A sparkle-row bracelet selected for polished gifting and simple occasion styling. Exact stone, setting, finish, material, and sizing details require supplier confirmation before stronger claims are made.',
    seoTitle: 'Sparkle Row Bracelet | North & Pearl',
  },
  'north-pearl-crystal-link-bracelet': {
    title: 'North & Pearl Sparkle Link Bracelet',
    description:
      'A sparkle-link bracelet selected for easy gifting and refined everyday styling. Exact materials, stone details, link construction, finish, and sizing must be verified before stronger claims are made.',
    seoTitle: 'Sparkle Link Bracelet | North & Pearl',
  },
  'north-pearl-crystal-pulse-bracelet': {
    title: 'North & Pearl Sparkle Pulse Bracelet',
    description:
      'A sparkle-accent bracelet with a polished, giftable look for everyday and occasion styling. Exact materials, stones, finish, and sizing should be confirmed before stronger product claims are made.',
    seoTitle: 'Sparkle Pulse Bracelet | North & Pearl',
  },
  'north-pearl-crystal-accent-bracelet': {
    title: 'North & Pearl Sparkle Accent Bracelet',
    description:
      'A sparkle-accent bracelet selected for simple gifting and polished everyday styling. Exact stone, finish, material, and sizing details require supplier confirmation before stronger claims are made.',
    seoTitle: 'Sparkle Accent Bracelet | North & Pearl',
  },
  'north-pearl-crystal-halo-bracelet': {
    title: 'North & Pearl Sparkle Halo Bracelet',
    description:
      'A sparkle-halo bracelet selected for refined gifting and occasion-ready styling. Exact materials, stones, finish, and sizing should be confirmed before stronger claims are made.',
    seoTitle: 'Sparkle Halo Bracelet | North & Pearl',
  },
  'north-pearl-crystal-bead-bracelet': {
    title: 'North & Pearl Sparkle Bead Bracelet',
    description:
      'A sparkle bead bracelet selected for gifting, layering, and polished everyday wear. Exact bead composition, stone details, finish, and sizing must be verified before stronger claims are made.',
    seoTitle: 'Sparkle Bead Bracelet | North & Pearl',
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
    '<p>Chosen for birthdays, anniversaries, bridesmaids, mothers, friends, sisters, partners, and thoughtful self-gifting depending on the recipient and style.</p>',
    '<h3>Details to confirm</h3>',
    '<ul>',
    '<li>Materials, stones, plating, finish, sizing, and packaging must be confirmed with supplier documentation and samples before stronger claims are made.</li>',
    '<li>North &amp; Pearl does not publish allergy, waterproof, tarnish, precious-metal, or durability claims unless verified for the specific item.</li>',
    '</ul>',
    '<h3>Care note</h3>',
    '<p>Until exact materials are confirmed, store separately, keep dry between wears, and avoid direct contact with lotions, perfumes, and harsh cleaners.</p>',
  ].join('');
}

const products = gql(
  `query ClaimSensitiveProducts($query: String!) {
    products(first: 100, query: $query) {
      nodes { id title handle status }
    }
  }`,
  { query: Object.keys(updates).map((handle) => `handle:${handle}`).join(' OR ') },
).products.nodes;

const changed = [];

for (const product of products) {
  const update = updates[product.handle];
  if (!update || product.status !== 'ACTIVE') continue;

  const result = gql(
    `mutation SafeRenameProduct($product: ProductUpdateInput!) {
      productUpdate(product: $product) {
        product { id title handle status seo { title description } }
        userErrors { field message }
      }
    }`,
    {
      product: {
        id: product.id,
        title: update.title,
        descriptionHtml: descriptionHtml(update),
        seo: {
          title: update.seoTitle,
          description: update.description,
        },
      },
    },
    true,
  ).productUpdate;

  if (result.userErrors.length) {
    console.log(`warning ${product.handle}: ${JSON.stringify(result.userErrors)}`);
  } else {
    changed.push({
      handle: product.handle,
      from: product.title,
      to: result.product.title,
    });
  }
}

console.table(changed);
