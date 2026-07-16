import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-media-'));

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
  'north-pearl-birthstone-name-necklace': [
    'https://s.alicdn.com/@sc04/kf/Ha70708512f184cc38834bb31484131acZ.png_300x300.png',
  ],
  'north-pearl-opal-pendant-necklace': [
    'https://s.alicdn.com/@sc04/kf/H50642816036f423cb4d01348f6ffa47e6.jpg_300x300.jpg',
    'https://s.alicdn.com/@sc04/kf/Hd00993cb8f9248838a2e372b218a4554j.jpg_300x300.jpg',
    'https://s.alicdn.com/@sc04/kf/Ha9ac6919c30c4a9ab5a290c711a97b87f.jpg_300x300.jpg',
  ],
  'north-pearl-teardrop-birthstone-necklace': [
    'https://s.alicdn.com/@sc04/kf/H819cdeb4f8df475197741874653d3c05k.jpg_300x300.jpg',
  ],
  'north-pearl-minimal-water-drop-necklace': [
    'https://s.alicdn.com/@sc04/kf/H2b743cbc422c4c2d8dc5882a5bd868c5R.jpg_300x300.jpg',
  ],
  'north-pearl-pearl-collarbone-necklace': [
    'https://s.alicdn.com/@sc04/kf/Hcd831284a57343479fc0a44bbb3ad2acW.jpg_300x300.jpg',
  ],
  'north-pearl-stackable-gold-bracelet': [
    'https://s.alicdn.com/@sc04/kf/H9b306b51a3f142e298997f1681bf3675d.jpg_300x300.jpg',
  ],
  'north-pearl-classic-tennis-bracelet': [
    'https://s.alicdn.com/@sc04/kf/H316e0d6799a64c4da0ac1938bad05579v.jpg_300x300.jpg',
  ],
  'north-pearl-heart-bangle-bracelet': [
    'https://s.alicdn.com/@sc04/kf/Hd56e87334c404b7d84c354dcb308d649N.jpg_300x300.jpg',
  ],
  'north-pearl-letter-charm-bracelet': [
    'https://s.alicdn.com/@sc04/kf/H419e89e8f2894feea05004ed7a73111az.png_300x300.png',
  ],
  'north-pearl-emerald-statement-ring': [
    'https://s.alicdn.com/@sc04/kf/H84b98c8b24744de3a66d8ac9dfc5bc14Q.jpg_300x300.jpg',
  ],
  'north-pearl-moissanite-gift-ring': [
    'https://s.alicdn.com/@sc04/kf/H1a6a4f9a9a1648348e3102541a9822f2T.jpg_300x300.jpg',
  ],
  'north-pearl-geometric-drop-earrings': [
    'https://s.alicdn.com/@sc04/kf/Haddf3955b3094ad9bc260e6bf1a849d66.jpg_300x300.jpg',
  ],
  'north-pearl-square-zircon-jewelry-set': [
    'https://s.alicdn.com/@sc04/kf/H57347201ea43439ab63ac5acc67e02d0E.jpg_300x300.jpg',
  ],
};

const products = gql(`query ProductsForMedia {
  products(first: 100) {
    nodes {
      id
      title
      handle
      media(first: 20) {
        nodes {
          alt
          mediaContentType
        }
      }
    }
  }
}`).products.nodes;

const productByHandle = new Map(products.map((product) => [product.handle, product]));

for (const [handle, urls] of Object.entries(mediaByHandle)) {
  const product = productByHandle.get(handle);
  if (!product) {
    console.log(`missing product: ${handle}`);
    continue;
  }

  const hasNorthPearlMedia = product.media.nodes.some((media) => (media.alt || '').startsWith(product.title));
  if (hasNorthPearlMedia) {
    console.log(`skipped existing media: ${product.title}`);
    continue;
  }

  const media = urls.map((url, index) => ({
    mediaContentType: 'IMAGE',
    originalSource: url,
    alt: `${product.title} product image ${index + 1}`,
  }));

  const created = gql(
    `mutation ProductCreateMedia($productId: ID!, $media: [CreateMediaInput!]!) {
      productCreateMedia(productId: $productId, media: $media) {
        media {
          alt
          mediaContentType
          status
        }
        mediaUserErrors {
          field
          message
        }
      }
    }`,
    { productId: product.id, media },
    true,
  ).productCreateMedia;

  if (created.mediaUserErrors.length) {
    console.log(`media warning ${product.title}: ${JSON.stringify(created.mediaUserErrors)}`);
  } else {
    console.log(`added ${media.length} image(s): ${product.title}`);
  }
}

const missing = [
  'north-pearl-initial-shell-necklace',
  'north-pearl-heart-keepsake-necklace',
  'north-pearl-flower-nail-bangle',
  'north-pearl-crystal-gemstone-cuff',
  'north-pearl-zircon-bracelet',
  'north-pearl-smooth-gold-ring',
  'north-pearl-bridal-water-drop-set',
];

console.log(`Exact image extraction still needed for ${missing.length} products: ${missing.join(', ')}`);
