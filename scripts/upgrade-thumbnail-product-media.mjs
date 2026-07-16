import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-upgrade-thumbs-'));

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

const upgrades = {
  'north-pearl-birthstone-name-necklace': ['https://s.alicdn.com/@sc04/kf/Ha70708512f184cc38834bb31484131acZ.png'],
  'north-pearl-classic-tennis-bracelet': ['https://s.alicdn.com/@sc04/kf/H316e0d6799a64c4da0ac1938bad05579v.jpg'],
  'north-pearl-emerald-statement-ring': ['https://s.alicdn.com/@sc04/kf/H84b98c8b24744de3a66d8ac9dfc5bc14Q.jpg'],
  'north-pearl-geometric-drop-earrings': ['https://s.alicdn.com/@sc04/kf/Haddf3955b3094ad9bc260e6bf1a849d66.jpg'],
  'north-pearl-heart-bangle-bracelet': ['https://s.alicdn.com/@sc04/kf/Hd56e87334c404b7d84c354dcb308d649N.jpg'],
  'north-pearl-minimal-water-drop-necklace': ['https://s.alicdn.com/@sc04/kf/H2b743cbc422c4c2d8dc5882a5bd868c5R.jpg'],
  'north-pearl-moissanite-gift-ring': ['https://s.alicdn.com/@sc04/kf/H1a6a4f9a9a1648348e3102541a9822f2T.jpg'],
  'north-pearl-opal-pendant-necklace': [
    'https://s.alicdn.com/@sc04/kf/H50642816036f423cb4d01348f6ffa47e6.jpg',
    'https://s.alicdn.com/@sc04/kf/Hd00993cb8f9248838a2e372b218a4554j.jpg',
    'https://s.alicdn.com/@sc04/kf/Ha9ac6919c30c4a9ab5a290c711a97b87f.jpg',
  ],
  'north-pearl-pearl-collarbone-necklace': ['https://s.alicdn.com/@sc04/kf/Hcd831284a57343479fc0a44bbb3ad2acW.jpg'],
  'north-pearl-square-zircon-jewelry-set': ['https://s.alicdn.com/@sc04/kf/H57347201ea43439ab63ac5acc67e02d0E.jpg'],
  'north-pearl-stackable-gold-bracelet': ['https://s.alicdn.com/@sc04/kf/H9b306b51a3f142e298997f1681bf3675d.jpg'],
  'north-pearl-teardrop-birthstone-necklace': ['https://s.alicdn.com/@sc04/kf/H819cdeb4f8df475197741874653d3c05k.jpg'],
};

function imageInfo(url) {
  const output = execFileSync(
    'node',
    [
      '-e',
      `const {execFileSync}=require('child_process'); const f='/tmp/np-img-check'; execFileSync('curl',['-L','-s','-o',f,${JSON.stringify(url)}]); console.log(execFileSync('file',[f],{encoding:'utf8'}));`,
    ],
    { encoding: 'utf8' },
  );
  const matches = [...output.matchAll(/(\d+)\s*x\s*(\d+)/g)];
  const match = matches.at(-1);
  return { ok: Boolean(match), width: match ? Number(match[1]) : 0, height: match ? Number(match[2]) : 0, output: output.trim() };
}

const products = gql(`query ProductsForUpgrade($query: String!) {
  products(first: 50, query: $query) {
    nodes {
      id
      title
      handle
      media(first: 20) { nodes { id alt mediaContentType preview { image { width height url } } } }
    }
  }
}`, { query: Object.keys(upgrades).map((handle) => `handle:${handle}`).join(' OR ') }).products.nodes;

const productByHandle = new Map(products.map((product) => [product.handle, product]));

for (const [handle, urls] of Object.entries(upgrades)) {
  const product = productByHandle.get(handle);
  if (!product) {
    console.log(`missing product: ${handle}`);
    continue;
  }

  const checked = urls.map((url) => ({ url, ...imageInfo(url) }));
  const usable = checked.filter((item) => item.ok && item.width >= 600 && item.height >= 600);
  if (usable.length !== urls.length) {
    console.log(`skipped ${product.title}: not all replacement images passed`);
    console.log(JSON.stringify(checked, null, 2));
    continue;
  }

  const existingImages = product.media.nodes.filter((media) => media.mediaContentType === 'IMAGE');
  const minExistingWidth = existingImages.reduce((min, media) => Math.min(min, media.preview?.image?.width || 0), Infinity);
  const minExistingHeight = existingImages.reduce((min, media) => Math.min(min, media.preview?.image?.height || 0), Infinity);
  const hasThumbnailUrl = existingImages.some((media) => (media.preview?.image?.url || '').includes('300x300'));

  if (
    existingImages.length === urls.length &&
    Number.isFinite(minExistingWidth) &&
    minExistingWidth >= 600 &&
    minExistingHeight >= 600 &&
    !hasThumbnailUrl
  ) {
    console.log(`already upgraded ${product.title}: ${minExistingWidth}x${minExistingHeight}+`);
    continue;
  }

  const existingIds = existingImages.map((media) => media.id);

  if (existingIds.length) {
    const deleted = gql(
      `mutation DeleteMedia($productId: ID!, $mediaIds: [ID!]!) {
        productDeleteMedia(productId: $productId, mediaIds: $mediaIds) {
          deletedMediaIds
          mediaUserErrors { field message }
        }
      }`,
      { productId: product.id, mediaIds: existingIds },
      true,
    ).productDeleteMedia;
    if (deleted.mediaUserErrors.length) {
      console.log(`delete warning ${product.title}: ${JSON.stringify(deleted.mediaUserErrors)}`);
      continue;
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
      media: usable.map((item, index) => ({
        mediaContentType: 'IMAGE',
        originalSource: item.url,
        alt: `${product.title} product image ${index + 1}`,
      })),
    },
    true,
  ).productCreateMedia;

  if (created.mediaUserErrors.length) {
    console.log(`create warning ${product.title}: ${JSON.stringify(created.mediaUserErrors)}`);
  } else {
    console.log(`upgraded ${product.title}: ${usable.map((item) => `${item.width}x${item.height}`).join(', ')}`);
  }
}
