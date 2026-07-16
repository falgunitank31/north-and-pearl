import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const onlineStorePublicationId = 'gid://shopify/Publication/331104157880';
const tempDir = mkdtempSync(join(tmpdir(), 'np-remaining-media-'));

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

const mediaByHandle = {
  'north-pearl-crystal-gemstone-cuff': [
    'https://sc04.alicdn.com/kf/Hc9231564adbc4c50a3b413b75f8f0e15P.jpg',
    'https://sc04.alicdn.com/kf/H0980bc4c7d47419892a39a885351e9e3u.jpg',
    'https://sc04.alicdn.com/kf/H362363b797464b6d8c9b5233677eaf9fJ.jpg',
    'https://sc04.alicdn.com/kf/H1ed7ad25341d4b039d96668c2a83e250p.jpg',
    'https://sc04.alicdn.com/kf/H40292bd075444b35827d35b3f90c114dO.jpg',
    'https://sc04.alicdn.com/kf/H01b083c26b084a76a2b1737f439a4b87W.jpg',
  ],
  'north-pearl-zircon-bracelet': [
    'https://sc04.alicdn.com/kf/H9f46d5668dec4fe4b35edfa77d6f6e85D.jpg',
    'https://sc04.alicdn.com/kf/Ha76903c639094e54aef63d42b637a87b7.jpg',
    'https://sc04.alicdn.com/kf/H04fd43eaa989422a95b3db3c46f15215c.jpg',
    'https://sc04.alicdn.com/kf/H85b8310a594c4634858f08cdbcf065b1V.jpg',
    'https://sc04.alicdn.com/kf/H2cb85be502d641cc93532ece5139e4efP.jpg',
    'https://sc04.alicdn.com/kf/He28a4fcbab654c9592a2c6686fd8bd2eC.jpg',
  ],
  'north-pearl-smooth-gold-ring': [
    'https://sc04.alicdn.com/kf/H053a64c2f0b540b094fd80bd1524f2b8E.jpg',
    'https://sc04.alicdn.com/kf/H54d7d657088f42abb1f826683b4cdb88C.jpg',
    'https://sc04.alicdn.com/kf/H231151158de74a38932a347d6689593bW.jpg',
    'https://sc04.alicdn.com/kf/He87ddca8d89d43b9b26940f8e5fbba807.jpg',
    'https://sc04.alicdn.com/kf/Hb25220a61e3841838841a64f96e904dee.jpg',
    'https://sc04.alicdn.com/kf/H6a5fa2ff9e454578882e0c07f10941085.jpg',
  ],
  'north-pearl-bridal-water-drop-set': [
    'https://sc04.alicdn.com/kf/H4a65a5b3a142493d888f660fbfc13ba5G.jpg',
    'https://sc04.alicdn.com/kf/H907266accde74e3bb06bc6a3c66377efN.jpg',
    'https://sc04.alicdn.com/kf/H340859ad1b624a558094625331b58b4eI.jpg',
    'https://sc04.alicdn.com/kf/H17a5866fe6764aaa89f91f012cc0753dm.jpg',
    'https://sc04.alicdn.com/kf/He98facf64e4a4493a7217ace2007b9e3U.jpg',
    'https://sc04.alicdn.com/kf/H08e6ee2c4a8341ba81c7ebbb7615015fN.jpg',
  ],
};

const handles = Object.keys(mediaByHandle);
const products = gql(`query ProductsForMedia($query: String!) {
  products(first: 20, query: $query) {
    nodes {
      id
      title
      handle
      media(first: 20) { nodes { id alt } }
    }
  }
}`, { query: handles.map((handle) => `handle:${handle}`).join(' OR ') }).products.nodes;

const productByHandle = new Map(products.map((product) => [product.handle, product]));

for (const [handle, urls] of Object.entries(mediaByHandle)) {
  const product = productByHandle.get(handle);
  if (!product) {
    console.log(`missing product: ${handle}`);
    continue;
  }

  const hasMedia = product.media.nodes.length > 0;
  if (!hasMedia) {
    const media = urls.map((url, index) => ({
      mediaContentType: 'IMAGE',
      originalSource: url,
      alt: `${product.title} product image ${index + 1}`,
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
      console.log(`media warning ${product.title}: ${JSON.stringify(created.mediaUserErrors)}`);
    } else {
      console.log(`added ${created.media.length} image(s): ${product.title}`);
    }
  } else {
    console.log(`skipped existing media: ${product.title}`);
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
    console.log(`activation warning ${product.title}: ${JSON.stringify(activated.userErrors)}`);
  } else {
    console.log(`activated: ${product.title}`);
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
    console.log(`publish warning ${product.title}: ${JSON.stringify(published.userErrors)}`);
  } else {
    console.log(`published to Online Store: ${product.title}`);
  }
}
