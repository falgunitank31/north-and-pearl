import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const onlineStorePublicationId = 'gid://shopify/Publication/331104157880';
const tempDir = mkdtempSync(join(tmpdir(), 'np-heart-fix-'));

const imageUrls = [
  'https://s.alicdn.com/@sc04/kf/H0025f67a65a74f6f9e65ec697bc729efr.jpg',
  'https://s.alicdn.com/@sc04/kf/H79f45f36fefb4497a7f2bf184c6e3599M.jpg',
  'https://s.alicdn.com/@sc04/kf/Hea7daf3daa98465ba2a82eb768f3a0309.jpg',
  'https://s.alicdn.com/@sc04/kf/Hc0338ac831b04b20a81f9bbd9525f0aer.jpg',
  'https://s.alicdn.com/@sc04/kf/H32a794dfaec84eef9aebe925921241c61.jpg',
  'https://s.alicdn.com/@sc04/kf/Ha752501dea6f426083d1d6e89c8cf40af.jpg',
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

function imageInfo(url, index) {
  const file = join(tempDir, `heart-${index}`);
  execFileSync('curl', ['-L', '-s', '-o', file, url]);
  const output = execFileSync('file', [file], { encoding: 'utf8' });
  const matches = [...output.matchAll(/(\d+)\s*x\s*(\d+)/g)];
  const match = matches.at(-1);
  return {
    url,
    ok: Boolean(match),
    width: match ? Number(match[1]) : 0,
    height: match ? Number(match[2]) : 0,
    output: output.trim(),
  };
}

const checkedImages = imageUrls.map(imageInfo);
const usableImages = checkedImages.filter((image) => image.ok && image.width >= 900 && image.height >= 900);

if (usableImages.length !== imageUrls.length) {
  console.log(JSON.stringify(checkedImages, null, 2));
  throw new Error('Not all Heart Keepsake images passed quality checks.');
}

const product = gql(`query HeartKeepsake {
  products(first: 1, query: "handle:north-pearl-heart-keepsake-necklace") {
    nodes {
      id
      title
      handle
      status
      media(first: 20) {
        nodes { id mediaContentType preview { image { url width height } } }
      }
    }
  }
}`).products.nodes[0];

if (!product) throw new Error('Heart Keepsake product was not found.');

const existingImages = product.media.nodes.filter((media) => media.mediaContentType === 'IMAGE');
if (existingImages.length) {
  const deleted = gql(
    `mutation DeleteMedia($productId: ID!, $mediaIds: [ID!]!) {
      productDeleteMedia(productId: $productId, mediaIds: $mediaIds) {
        deletedMediaIds
        mediaUserErrors { field message }
      }
    }`,
    { productId: product.id, mediaIds: existingImages.map((media) => media.id) },
    true,
  ).productDeleteMedia;

  if (deleted.mediaUserErrors.length) {
    throw new Error(`Could not delete existing Heart Keepsake media: ${JSON.stringify(deleted.mediaUserErrors)}`);
  }
}

const created = gql(
  `mutation CreateMedia($productId: ID!, $media: [CreateMediaInput!]!) {
    productCreateMedia(productId: $productId, media: $media) {
      media { alt mediaContentType status }
      mediaUserErrors { field message }
    }
  }`,
  {
    productId: product.id,
    media: usableImages.map((image, index) => ({
      mediaContentType: 'IMAGE',
      originalSource: image.url,
      alt: `${product.title} product image ${index + 1}`,
    })),
  },
  true,
).productCreateMedia;

if (created.mediaUserErrors.length) {
  throw new Error(`Could not create Heart Keepsake media: ${JSON.stringify(created.mediaUserErrors)}`);
}

const updated = gql(
  `mutation ActivateProduct($input: ProductInput!) {
    productUpdate(input: $input) {
      product { id title status }
      userErrors { field message }
    }
  }`,
  { input: { id: product.id, status: 'ACTIVE' } },
  true,
).productUpdate;

if (updated.userErrors.length) {
  throw new Error(`Could not activate Heart Keepsake: ${JSON.stringify(updated.userErrors)}`);
}

const published = gql(
  `mutation PublishProduct($id: ID!, $input: [PublicationInput!]!) {
    publishablePublish(id: $id, input: $input) {
      publishable { publicationCount }
      userErrors { field message }
    }
  }`,
  { id: product.id, input: [{ publicationId: onlineStorePublicationId }] },
  true,
).publishablePublish;

if (published.userErrors.length) {
  throw new Error(`Could not publish Heart Keepsake to Online Store: ${JSON.stringify(published.userErrors)}`);
}

console.log(`Fixed ${product.title}: uploaded ${usableImages.length} images, activated, and published to Online Store.`);
