import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-letter-charm-media-'));

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

const handle = 'north-pearl-letter-charm-bracelet';
const product = gql(
  `query ProductByHandle($query: String!) {
    products(first: 1, query: $query) {
      nodes {
        id
        title
        media(first: 20) { nodes { id alt } }
      }
    }
  }`,
  { query: `handle:${handle}` },
).products.nodes[0];

if (!product) throw new Error(`Product not found: ${handle}`);

if (product.media.nodes.length) {
  const deleted = gql(
    `mutation DeleteMedia($productId: ID!, $mediaIds: [ID!]!) {
      productDeleteMedia(productId: $productId, mediaIds: $mediaIds) {
        deletedMediaIds
        mediaUserErrors { field message }
      }
    }`,
    { productId: product.id, mediaIds: product.media.nodes.map((media) => media.id) },
    true,
  ).productDeleteMedia;
  if (deleted.mediaUserErrors.length) {
    console.log(`delete warnings: ${JSON.stringify(deleted.mediaUserErrors)}`);
  } else {
    console.log(`removed ${deleted.deletedMediaIds.length} low-resolution image(s)`);
  }
}

const created = gql(
  `mutation ProductCreateMedia($productId: ID!, $media: [CreateMediaInput!]!) {
    productCreateMedia(productId: $productId, media: $media) {
      media { alt mediaContentType status }
      mediaUserErrors { field message }
    }
  }`,
  {
    productId: product.id,
    media: [
      {
        mediaContentType: 'IMAGE',
        originalSource: 'https://s.alicdn.com/@sc04/kf/H419e89e8f2894feea05004ed7a73111az.png',
        alt: `${product.title} product image 1`,
      },
    ],
  },
  true,
).productCreateMedia;

if (created.mediaUserErrors.length) {
  console.log(`create warnings: ${JSON.stringify(created.mediaUserErrors)}`);
} else {
  console.log(`added full-size image to ${product.title}`);
}
