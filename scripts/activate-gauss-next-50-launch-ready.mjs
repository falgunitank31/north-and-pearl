import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-gauss-next-50-activate-'));
const reportPath = 'reports/gauss-next-50-live-activation-2026-07-23.md';

const launchReviewHandles = [
  'north-pearl-heart-necklace-7284',
  'north-pearl-name-necklace-0389',
  'north-pearl-heart-necklace-2260',
  'north-pearl-heart-earrings-5822',
  'north-pearl-clover-bracelet-1195',
  'north-pearl-letter-necklace-0689',
  'north-pearl-heart-necklace-2923',
  'north-pearl-bead-bracelet-0492',
  'north-pearl-name-necklace-4242',
  'north-pearl-letter-necklace-4810',
  'north-pearl-initial-necklace-6142',
  'north-pearl-initial-necklace-4829',
  'north-pearl-letter-necklace-2555',
  'north-pearl-name-necklace-1616',
  'north-pearl-name-necklace-8213',
  'north-pearl-initial-necklace-4204',
  'north-pearl-name-necklace-7562',
  'north-pearl-heart-necklace-0474',
  'north-pearl-letter-necklace-2156',
  'north-pearl-initial-necklace-8531',
  'north-pearl-heart-necklace-3361',
  'north-pearl-heart-necklace-1404',
  'north-pearl-clover-bracelet-4268',
  'north-pearl-letter-necklace-1571',
  'north-pearl-name-necklace-1956',
  'north-pearl-bead-necklace',
  'north-pearl-letter-necklace-1755',
  'north-pearl-letter-necklace-2210',
  'north-pearl-heart-ring-7637',
  'north-pearl-name-necklace-8379',
  'north-pearl-name-necklace-5921',
  'north-pearl-flower-necklace',
  'north-pearl-initial-necklace-3226',
  'north-pearl-name-necklace-7245',
  'north-pearl-name-necklace-6301',
  'north-pearl-bead-bracelet-3656',
  'north-pearl-signature-bracelet-1724',
  'north-pearl-letter-necklace-3046',
  'north-pearl-name-necklace-6441',
  'north-pearl-initial-necklace-2758',
  'north-pearl-name-necklace-6376',
  'north-pearl-name-necklace-8628',
  'north-pearl-name-necklace-0823',
  'north-pearl-name-necklace-5254',
  'north-pearl-sparkle-necklace-9390',
  'north-pearl-letter-necklace-7676',
  'north-pearl-signature-bracelet-6593',
  'north-pearl-heart-earrings-5815',
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

const data = gql(`query ActivationData {
  publications(first: 20) { nodes { id name } }
  products(first: 250, query: "vendor:'North & Pearl'") {
    nodes {
      id
      title
      handle
      status
      tags
      totalInventory
      media(first: 20) { nodes { mediaContentType } }
      resourcePublications(first: 20) {
        nodes { isPublished publication { id name } }
      }
    }
  }
}`);

const onlineStorePublication = data.publications.nodes.find((publication) => publication.name === 'Online Store');
if (!onlineStorePublication) throw new Error('Online Store publication not found.');

const productByHandle = new Map(data.products.nodes.map((product) => [product.handle, product]));
const rows = [];

for (const handle of launchReviewHandles) {
  const product = productByHandle.get(handle);
  if (!product) {
    rows.push({ handle, status: 'missing' });
    continue;
  }

  const imageCount = product.media.nodes.filter((media) => media.mediaContentType === 'IMAGE').length;
  if ((product.tags || []).includes('do-not-activate') || (product.tags || []).includes('hold-pricing-mismatch')) {
    rows.push({ handle, title: product.title, status: 'skipped-hold-tag', imageCount });
    continue;
  }

  if (imageCount < 3) {
    rows.push({ handle, title: product.title, status: 'skipped-low-image-count', imageCount });
    continue;
  }

  if (product.status !== 'ACTIVE') {
    const update = gql(
      `mutation ActivateProduct($product: ProductUpdateInput!) {
        productUpdate(product: $product) {
          product { id title handle status }
          userErrors { field message }
        }
      }`,
      { product: { id: product.id, status: 'ACTIVE' } },
      true,
    ).productUpdate;
    if (update.userErrors.length) {
      rows.push({ handle, title: product.title, status: 'activation-error', detail: JSON.stringify(update.userErrors), imageCount });
      continue;
    }
  }

  const alreadyOnline = product.resourcePublications.nodes.some((publication) => (
    publication.isPublished && publication.publication.id === onlineStorePublication.id
  ));

  if (!alreadyOnline) {
    const publish = gql(
      `mutation PublishProduct($id: ID!, $input: [PublicationInput!]!) {
        publishablePublish(id: $id, input: $input) {
          userErrors { field message }
        }
      }`,
      { id: product.id, input: [{ publicationId: onlineStorePublication.id }] },
      true,
    ).publishablePublish;
    if (publish.userErrors.length) {
      rows.push({ handle, title: product.title, status: 'publish-error', detail: JSON.stringify(publish.userErrors), imageCount });
      continue;
    }
  }

  rows.push({ handle, title: product.title, status: 'live-online-store', imageCount });
}

const activated = rows.filter((row) => row.status === 'live-online-store');
const skipped = rows.filter((row) => row.status !== 'live-online-store');

console.table(rows);
console.log(`Made ${activated.length} products live. Skipped ${skipped.length}.`);

const reportLines = [
  '# Gauss Next 50 Live Activation - 2026-07-23',
  '',
  `Made live: ${activated.length}`,
  `Skipped: ${skipped.length}`,
  '',
  '| # | Handle | Title | Result | Images |',
  '|---:|---|---|---|---:|',
  ...rows.map((row, index) => `| ${index + 1} | ${row.handle || ''} | ${(row.title || '').replaceAll('|', '-')} | ${row.status || ''} | ${row.imageCount ?? ''} |`),
  '',
  'Notes:',
  '- Products with hold/pricing mismatch tags were intentionally skipped.',
  '- Activation published approved products to the Online Store only; Google & YouTube publication and feed attributes are handled by follow-up scripts.',
  '',
];

writeFileSync(reportPath, `${reportLines.join('\n')}\n`);
console.log(`wrote ${reportPath}`);
