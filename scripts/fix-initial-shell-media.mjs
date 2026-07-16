import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const onlineStorePublicationId = 'gid://shopify/Publication/331104157880';
const tempDir = mkdtempSync(join(tmpdir(), 'np-initial-shell-media-'));

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

const handle = 'north-pearl-initial-shell-necklace';
const imageUrls = [
  'https://s.alicdn.com/@sc04/kf/Hab4018ad85d94c1a87dac4bb0b943fb7l.jpg?avif=close&webp=close',
  'https://s.alicdn.com/@sc04/kf/H3b5d1e076ddf4f1ab7866a60210ff889I.jpg?avif=close&webp=close',
  'https://s.alicdn.com/@sc04/kf/H668e0ced99cf41e892ed24c29f2a5cb0O.jpg?avif=close&webp=close',
  'https://s.alicdn.com/@sc04/kf/H2315b1d7efd64a23bdb61afcfcfb82b1L.jpg?avif=close&webp=close',
  'https://s.alicdn.com/@sc04/kf/H09161576503e4017b9b11557692162d6R.jpg?avif=close&webp=close',
  'https://s.alicdn.com/@sc04/kf/H8e39178ebe2c488c9bfc886ef8ea260dj.jpg?avif=close&webp=close',
];

const product = gql(
  `query ProductByHandle($query: String!) {
    products(first: 1, query: $query) {
      nodes {
        id
        title
        handle
        media(first: 20) { nodes { id alt } }
      }
    }
  }`,
  { query: `handle:${handle}` },
).products.nodes[0];

if (!product) throw new Error(`Product not found: ${handle}`);

const media = imageUrls.map((url, index) => ({
  mediaContentType: 'IMAGE',
  originalSource: url,
  alt: `${product.title} shell initial necklace product image ${index + 1}`,
}));

const created = gql(
  `mutation ProductCreateMedia($productId: ID!, $media: [CreateMediaInput!]!) {
    productCreateMedia(productId: $productId, media: $media) {
      media { alt mediaContentType status }
      mediaUserErrors { field message }
    }
  }`,
  { productId: product.id, media },
  true,
).productCreateMedia;

if (created.mediaUserErrors.length) {
  console.log(`media warnings: ${JSON.stringify(created.mediaUserErrors)}`);
} else {
  console.log(`added ${created.media.length} images to ${product.title}`);
}

const activated = gql(
  `mutation ActivateProduct($input: ProductInput!) {
    productUpdate(input: $input) {
      product { title handle status }
      userErrors { field message }
    }
  }`,
  { input: { id: product.id, status: 'ACTIVE' } },
  true,
).productUpdate;

if (activated.userErrors.length) {
  console.log(`activation warnings: ${JSON.stringify(activated.userErrors)}`);
} else {
  console.log(`activated: ${activated.product.title}`);
}

const published = gql(
  `mutation PublishProduct($id: ID!, $input: [PublicationInput!]!) {
    publishablePublish(id: $id, input: $input) {
      publishable {
        publishedOnPublication(publicationId: "${onlineStorePublicationId}")
      }
      userErrors { field message }
    }
  }`,
  { id: product.id, input: [{ publicationId: onlineStorePublicationId }] },
  true,
).publishablePublish;

if (published.userErrors.length) {
  console.log(`publish warnings: ${JSON.stringify(published.userErrors)}`);
} else {
  console.log(`published to Online Store: ${product.title}`);
}
