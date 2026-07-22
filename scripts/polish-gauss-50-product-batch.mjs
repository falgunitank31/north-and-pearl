import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-gauss-50-polish-'));

const titleByHandle = new Map(Object.entries({
  'north-pearl-heart-necklace': 'North & Pearl Sculpted Heart Pendant',
  'north-pearl-heart-necklace-4710': 'North & Pearl Petite Love Pendant',
  'north-pearl-heart-necklace-1947': 'North & Pearl Sweet Heart Keepsake Necklace',
  'north-pearl-chain-bracelet': 'North & Pearl Oval Link Bracelet',
  'north-pearl-chain-necklace': 'North & Pearl Smooth Chain Necklace',
  'north-pearl-chain-necklace-4276': 'North & Pearl Dainty Chain Necklace',
  'north-pearl-initial-necklace': 'North & Pearl Classic Initial Necklace',
  'north-pearl-initial-necklace-6868': 'North & Pearl Framed Initial Necklace',
  'north-pearl-initial-necklace-5109': 'North & Pearl Everyday Initial Pendant',
  'north-pearl-initial-necklace-8711': 'North & Pearl Statement Initial Necklace',
  'north-pearl-initial-necklace-6130': 'North & Pearl Dainty Initial Charm',
  'north-pearl-initial-necklace-1814': 'North & Pearl Layered Initial Necklace',
  'north-pearl-initial-necklace-6010': 'North & Pearl Polished Initial Pendant',
  'north-pearl-letter-necklace': 'North & Pearl Block Letter Necklace',
  'north-pearl-letter-necklace-5321': 'North & Pearl Script Letter Necklace',
  'north-pearl-letter-necklace-6404': 'North & Pearl Dainty Letter Pendant',
  'north-pearl-letter-necklace-0021': 'North & Pearl Everyday Letter Necklace',
  'north-pearl-letter-necklace-1851': 'North & Pearl Framed Letter Pendant',
  'north-pearl-letter-necklace-9008': 'North & Pearl Polished Letter Necklace',
  'north-pearl-letter-necklace-4171': 'North & Pearl Minimal Letter Pendant',
  'north-pearl-letter-necklace-5856': 'North & Pearl Layered Letter Necklace',
  'north-pearl-name-necklace': 'North & Pearl Classic Name Necklace',
  'north-pearl-name-necklace-6152': 'North & Pearl Script Name Necklace',
  'north-pearl-name-necklace-6687': 'North & Pearl Dainty Name Necklace',
  'north-pearl-name-necklace-0523': 'North & Pearl Nameplate Necklace',
  'north-pearl-name-necklace-5330': 'North & Pearl Everyday Name Necklace',
  'north-pearl-name-necklace-7262': 'North & Pearl Polished Name Necklace',
  'north-pearl-name-necklace-1832': 'North & Pearl Custom Name Pendant',
  'north-pearl-name-necklace-4075': 'North & Pearl Floating Name Necklace',
  'north-pearl-name-necklace-2338': 'North & Pearl Custom Script Pendant',
  'north-pearl-name-necklace-1996': 'North & Pearl Refined Name Necklace',
  'north-pearl-name-necklace-6429': 'North & Pearl Giftable Name Necklace',
  'north-pearl-signature-bracelet': 'North & Pearl Everyday Link Bracelet',
  'north-pearl-signature-necklace': 'North & Pearl Everyday Pendant Necklace',
  'north-pearl-snake-chain-bracelet': 'North & Pearl Smooth Layering Bracelet',
  'north-pearl-sparkle-necklace': 'North & Pearl Dainty Sparkle Pendant',
  'north-pearl-sparkle-necklace-2894': 'North & Pearl Sparkle Drop Necklace',
  'north-pearl-sparkle-necklace-5629': 'North & Pearl Sparkle Accent Necklace',
  'north-pearl-sparkle-necklace-4446': 'North & Pearl Sparkle Charm Necklace',
  'north-pearl-sparkle-ring': 'North & Pearl Dainty Sparkle Ring',
  'north-pearl-sparkle-ring-4269': 'North & Pearl Polished Sparkle Ring',
}));

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

const products = gql(`query Products {
  products(first: 250, query: "vendor:'North & Pearl' status:active") {
    nodes {
      id
      title
      handle
      productType
      media(first: 20) {
        nodes { id mediaContentType }
      }
    }
  }
}`).products.nodes;

const updatedRows = [];

for (const product of products) {
  const nextTitle = titleByHandle.get(product.handle);
  if (!nextTitle || product.title === nextTitle) continue;

  const metaDescription = `${nextTitle.replace(/^North & Pearl\s+/, '')} selected for meaningful gifting, polished everyday styling, and North & Pearl's warm jewelry edit.`;
  const updated = gql(
    `mutation ProductUpdate($input: ProductInput!) {
      productUpdate(input: $input) {
        product { id title handle }
        userErrors { field message }
      }
    }`,
    {
      input: {
        id: product.id,
        title: nextTitle,
        seo: {
          title: `${nextTitle} | Jewelry Gifts | North & Pearl`,
          description: metaDescription,
        },
      },
    },
    true,
  ).productUpdate;

  if (updated.userErrors.length) {
    console.log(`title update warning ${product.handle}: ${JSON.stringify(updated.userErrors)}`);
    continue;
  }

  const imageMediaIds = product.media.nodes
    .filter((media) => media.mediaContentType === 'IMAGE')
    .map((media) => media.id);
  if (imageMediaIds.length) {
    const mediaUpdated = gql(
      `mutation ProductUpdateMedia($productId: ID!, $media: [UpdateMediaInput!]!) {
        productUpdateMedia(productId: $productId, media: $media) {
          mediaUserErrors { field message }
        }
      }`,
      {
        productId: product.id,
        media: imageMediaIds.map((id, index) => ({
          id,
          alt: `${nextTitle} product image ${index + 1}`,
        })),
      },
      true,
    ).productUpdateMedia;
    if (mediaUpdated.mediaUserErrors.length) {
      console.log(`media alt warning ${product.handle}: ${JSON.stringify(mediaUpdated.mediaUserErrors)}`);
    }
  }

  updatedRows.push({ handle: product.handle, previousTitle: product.title, nextTitle });
}

console.table(updatedRows);
console.log(`Updated ${updatedRows.length} product titles and media alt sets.`);
