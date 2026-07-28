import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-gauss-100-activate-'));
const runDate = new Date().toISOString().slice(0, 10);
const sourceReportPath = `reports/gauss-next-100-polish-gate-${runDate}.md`;
const outputReportPath = `reports/gauss-next-100-live-activation-${runDate}.md`;

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

function parseRows() {
  const text = readFileSync(sourceReportPath, 'utf8');
  return text
    .split('\n')
    .filter((line) => /^\| \d+ \|/.test(line))
    .map((line) => line.split('|').slice(1, -1).map((cell) => cell.trim()))
    .map((cells) => ({
      index: Number(cells[0]),
      handle: cells[1],
      previousTitle: cells[2],
      title: cells[3],
      result: cells[4],
      images: Number(cells[5]),
      sourcePrice: cells[6],
      score: Number(cells[7]),
    }));
}

function publicDescription(title, productType) {
  const cleanTitle = title.replace(/^North & Pearl\s+/, '');
  const noun =
    productType === 'Gift Set' ? 'jewelry set' :
    productType === 'Earrings' ? 'earrings' :
    productType === 'Ring' ? 'ring' :
    productType === 'Bracelet' ? 'bracelet' :
    'necklace';
  return [
    `<p>${cleanTitle} is a polished ${noun} chosen for meaningful gifting, everyday styling, and a warm North &amp; Pearl jewelry-box feel.</p>`,
    '<h3>Why you will love it</h3>',
    '<ul>',
    '<li>Giftable style with a refined, easy-to-wear look.</li>',
    '<li>Designed to pair well with everyday outfits and special moments.</li>',
    '<li>A thoughtful choice for birthdays, anniversaries, bridesmaids, friends, family, and self-gifting.</li>',
    '</ul>',
    '<h3>Gift note</h3>',
    '<p>Pairs well with a jewelry gift box or a handwritten message when you want the moment to feel more personal.</p>',
    '<h3>Care</h3>',
    '<p>Store separately, avoid harsh cleaners, and keep dry between wears. Final material-specific care guidance will be expanded after supplier documentation and sample review.</p>',
  ].join('');
}

function tagsFor(product) {
  const remove = new Set([
    'draft-candidate',
    'needs-kuhn-review',
    'needs-faraday-review',
    'needs-curie-review',
    'needs-lovelace-review',
  ]);
  return [
    ...new Set([
      ...(product.tags || []).filter((tag) => !remove.has(tag)),
      'gauss-next-100-live',
      'catalog-expanded',
      'new-arrival',
    ]),
  ];
}

const publications = gql(`query Publications {
  publications(first: 20) { nodes { id name } }
}`).publications.nodes;
const onlineStorePublication = publications.find((publication) => publication.name === 'Online Store');
const googlePublication = publications.find((publication) => publication.name === 'Google & YouTube');
if (!onlineStorePublication) throw new Error('Online Store publication not found.');

const rows = parseRows();
const candidates = rows.filter((row) => row.result === 'polished-launch-review' && row.images >= 4);
const results = [];

for (const row of candidates) {
  const response = gql(`query ProductByHandle($query: String!) {
    products(first: 1, query: $query) {
      nodes {
        id
        title
        handle
        status
        productType
        tags
        media(first: 20) { nodes { mediaContentType } }
        variants(first: 20) { nodes { id price compareAtPrice } }
        resourcePublications(first: 20) {
          nodes { isPublished publication { id name } }
        }
      }
    }
  }`, { query: `handle:${row.handle}` });
  const product = response.products.nodes[0];
  if (!product) {
    results.push({ ...row, status: 'missing' });
    continue;
  }
  const tags = product.tags || [];
  const imageCount = product.media.nodes.filter((media) => media.mediaContentType === 'IMAGE').length;
  if (tags.includes('do-not-activate') || tags.includes('supplier-pricing-review-required') || imageCount < 4) {
    results.push({ ...row, status: 'skipped-hold-or-image-gate', images: imageCount });
    continue;
  }

  const update = gql(
    `mutation ProductUpdate($product: ProductUpdateInput!) {
      productUpdate(product: $product) {
        product { id title handle status }
        userErrors { field message }
      }
    }`,
    {
      product: {
        id: product.id,
        title: row.title,
        status: 'ACTIVE',
        descriptionHtml: publicDescription(row.title, product.productType),
        tags: tagsFor(product),
        seo: {
          title: `${row.title.replace(/^North & Pearl\s+/, '')} | North & Pearl`,
          description: `${row.title.replace(/^North & Pearl\s+/, '')} from North & Pearl, selected for meaningful gifts, everyday styling, and polished jewelry-box moments.`.slice(0, 320),
        },
      },
    },
    true,
  ).productUpdate;
  if (update.userErrors.length) {
    results.push({ ...row, status: 'product-update-error', detail: JSON.stringify(update.userErrors) });
    continue;
  }

  if (product.variants.nodes.length) {
    gql(
      `mutation VariantUpdate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
        productVariantsBulkUpdate(productId: $productId, variants: $variants) {
          userErrors { field message }
        }
      }`,
      {
        productId: product.id,
        variants: product.variants.nodes.map((variant) => ({
          id: variant.id,
          price: variant.price,
          compareAtPrice: null,
        })),
      },
      true,
    );
  }

  const alreadyOnline = product.resourcePublications.nodes.some((publication) => (
    publication.isPublished && publication.publication.id === onlineStorePublication.id
  ));
  if (!alreadyOnline) {
    const publish = gql(
      `mutation PublishProduct($id: ID!, $input: [PublicationInput!]!) {
        publishablePublish(id: $id, input: $input) { userErrors { field message } }
      }`,
      { id: product.id, input: [{ publicationId: onlineStorePublication.id }] },
      true,
    ).publishablePublish;
    if (publish.userErrors.length) {
      results.push({ ...row, status: 'online-store-publish-error', detail: JSON.stringify(publish.userErrors) });
      continue;
    }
  }

  if (googlePublication) {
    gql(
      `mutation PublishProduct($id: ID!, $input: [PublicationInput!]!) {
        publishablePublish(id: $id, input: $input) { userErrors { field message } }
      }`,
      { id: product.id, input: [{ publicationId: googlePublication.id }] },
      true,
    );
  }

  results.push({ ...row, status: 'activated-online-store', images: imageCount });
}

const activated = results.filter((row) => row.status === 'activated-online-store');
const skipped = rows.filter((row) => row.result !== 'polished-launch-review' || row.images < 4);
const errors = results.filter((row) => row.status !== 'activated-online-store');

console.table(results.map((row) => ({
  handle: row.handle,
  title: row.title,
  status: row.status,
  images: row.images,
  score: row.score,
})));
console.log(`Activated: ${activated.length}. Errors/skipped in activation loop: ${errors.length}. Held from polish gate: ${skipped.length}.`);

const report = [
  `# Gauss Next 100 Live Activation - ${runDate}`,
  '',
  `Activated to Online Store: ${activated.length}`,
  `Held or skipped from the 100-product batch: ${100 - activated.length}`,
  '',
  'Safety gates enforced:',
  '- Only `polished-launch-review` products with at least 4 images were activated.',
  '- Products tagged `do-not-activate` or `supplier-pricing-review-required` were not activated.',
  '- Public copy was rewritten to remove review-gate/internal sourcing language.',
  '- Compare-at prices were cleared for this batch to avoid unapproved discount presentation.',
  '- Unsupported material, waterproof, hypoallergenic, nickel-free, sterling, vermeil, handmade, and durability claims were not added.',
  '',
  '| # | Handle | Product | Status | Images | Score |',
  '|---:|---|---|---|---:|---:|',
  ...results.map((row, index) => `| ${index + 1} | ${row.handle} | ${(row.title || '').replaceAll('|', '-')} | ${row.status} | ${row.images ?? ''} | ${row.score ?? ''} |`),
  '',
];
writeFileSync(outputReportPath, `${report.join('\n')}\n`);
console.log(`wrote ${outputReportPath}`);
