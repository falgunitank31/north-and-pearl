import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-media-alt-'));

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
  const payload = JSON.parse(readFileSync(outputFile, 'utf8'));
  if (payload.errors) {
    throw new Error(JSON.stringify(payload.errors, null, 2));
  }
  return payload.data || payload;
}

const products = gql(`query ProductMediaAltAudit {
  products(first: 250, query: "vendor:'North & Pearl' status:active") {
    nodes {
      id
      title
      handle
      media(first: 20) {
        nodes {
          id
          alt
          mediaContentType
        }
      }
    }
  }
}`).products.nodes;

const changed = [];

for (const product of products) {
  const images = product.media.nodes.filter((media) => media.mediaContentType === 'IMAGE');
  const mediaUpdates = images
    .map((media, index) => ({
      id: media.id,
      alt: `${product.title} product image ${index + 1}`,
    }))
    .filter((media, index) => media.alt !== images[index]?.alt);

  if (!mediaUpdates.length) continue;

  const result = gql(
    `mutation ProductUpdateMedia($productId: ID!, $media: [UpdateMediaInput!]!) {
      productUpdateMedia(productId: $productId, media: $media) {
        media { id alt mediaContentType status }
        mediaUserErrors { field message }
      }
    }`,
    { productId: product.id, media: mediaUpdates },
    true,
  ).productUpdateMedia;

  if (result.mediaUserErrors.length) {
    throw new Error(`Media alt update failed for ${product.handle}: ${JSON.stringify(result.mediaUserErrors)}`);
  }

  changed.push({
    title: product.title,
    handle: product.handle,
    updatedImages: result.media.length,
  });
}

console.table(changed);
console.log(`Updated media alt text for ${changed.length} active product(s).`);
