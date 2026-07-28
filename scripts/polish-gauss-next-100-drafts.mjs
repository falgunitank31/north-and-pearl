import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-gauss-100-polish-'));
const runDate = new Date().toISOString().slice(0, 10);
const sourceReportPath = `reports/gauss-next-100-draft-products-${runDate}.md`;
const outputReportPath = `reports/gauss-next-100-polish-gate-${runDate}.md`;

const descriptors = {
  Necklace: ['Everyday', 'Dainty', 'Polished', 'Keepsake', 'Layering', 'Giftable', 'Classic', 'Refined'],
  Bracelet: ['Stackable', 'Polished', 'Everyday', 'Keepsake', 'Giftable', 'Sculpted', 'Layering', 'Refined'],
  Ring: ['Everyday', 'Polished', 'Keepsake', 'Minimal', 'Giftable', 'Sculpted'],
  Earrings: ['Everyday', 'Polished', 'Petite', 'Giftable', 'Refined', 'Sculpted'],
  'Gift Set': ['Giftable', 'Polished', 'Occasion', 'Keepsake', 'Refined'],
};

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
      score: Number(cells[1]),
      title: cells[2],
      type: cells[3],
      price: cells[4],
      compareAt: cells[5],
      supplier: cells[6],
      moq: cells[7],
      sourcePrice: cells[8],
      images: Number(cells[9]),
      sourceId: cells[10],
      handle: cells[11],
    }));
}

function sourcePriceRisk(row) {
  const price = row.sourcePrice || '';
  return /,\d{3}/.test(price)
    || /\$48\.50-360/.test(price)
    || /\$58\.36-355\.98/.test(price)
    || /\$30\b/.test(price)
    || /355|360/.test(price);
}

function supplierRisk(row) {
  return /\b1 yr\b/.test(row.supplierYears || '') || row.score < 78;
}

function motifFromTitle(title) {
  const lower = title.toLowerCase();
  if (lower.includes('initial')) return 'Initial';
  if (lower.includes('letter')) return 'Letter';
  if (lower.includes('name')) return 'Name';
  if (lower.includes('heart')) return 'Heart';
  if (lower.includes('flower')) return 'Bloom';
  if (lower.includes('clover')) return 'Clover';
  if (lower.includes('bead')) return 'Bead';
  if (lower.includes('sparkle')) return 'Sparkle';
  if (lower.includes('chain')) return 'Chain';
  if (lower.includes('tennis')) return 'Tennis';
  return 'Signature';
}

function productNoun(type) {
  if (type === 'Gift Set') return 'Jewelry Set';
  if (type === 'Earrings') return 'Earrings';
  if (type === 'Ring') return 'Ring';
  if (type === 'Bracelet') return 'Bracelet';
  return 'Necklace';
}

function polishedTitle(row) {
  const motif = motifFromTitle(row.title);
  const words = descriptors[row.type] || descriptors.Necklace;
  const descriptor = words[(row.index - 1) % words.length];
  return `North & Pearl ${descriptor} ${motif} ${productNoun(row.type)}`.replace(/\s+/g, ' ').trim();
}

function shortCopy(row, title) {
  const clean = title.replace(/^North & Pearl\s+/, '');
  const lowerType = productNoun(row.type).toLowerCase();
  if (row.type === 'Gift Set') {
    return `${clean} is a coordinated jewelry set selected for giftable styling, occasion dressing, and polished presentation.`;
  }
  return `${clean} is a ${lowerType} selected for meaningful gifting, everyday styling, and a warm North & Pearl assortment fit.`;
}

function descriptionHtml(row, title) {
  const short = shortCopy(row, title);
  const noun = productNoun(row.type).toLowerCase();
  return [
    `<p>${short}</p>`,
    '<h3>Why it belongs in review</h3>',
    `<p>This ${noun} candidate was added to strengthen category depth while keeping final product claims conservative until supplier documentation and samples are reviewed.</p>`,
    '<h3>Best for</h3>',
    '<p>Thoughtful gifting, birthdays, anniversaries, bridesmaid moments, everyday styling, and meaningful self-gifting depending on the final sample quality.</p>',
    '<h3>Details to confirm before launch</h3>',
    '<ul>',
    '<li>Base material, plating, finish, dimensions, weight, and packaging.</li>',
    '<li>Image accuracy against the physical sample.</li>',
    '<li>Personalization workflow and lead time when applicable.</li>',
    '<li>Supplier availability, replacement policy, and order specifications.</li>',
    '</ul>',
    '<h3>Care note</h3>',
    '<p>Final care instructions depend on confirmed materials. Until then, store separately, avoid harsh cleaners, and keep dry between wears.</p>',
  ].join('');
}

function tagsFor(row, product, hold) {
  const next = [
    ...(product.tags || []),
    'gauss-next-100',
    'draft-candidate',
    'needs-kuhn-review',
    'needs-faraday-review',
    'needs-curie-review',
    'needs-lovelace-review',
    'claim-status-unverified',
    'sample-status-not-ordered',
  ];
  if (hold) {
    next.push('do-not-activate', 'supplier-pricing-review-required');
  } else {
    next.push('launch-review');
  }
  return [...new Set(next)].filter(Boolean);
}

const rows = parseRows();
const results = [];

for (const row of rows) {
  const productData = gql(`query ProductByHandle($query: String!) {
    products(first: 1, query: $query) {
      nodes {
        id
        title
        handle
        status
        tags
        media(first: 20) { nodes { id mediaContentType } }
      }
    }
  }`, { query: `handle:${row.handle}` });
  const product = productData.products.nodes[0];
  if (!product) {
    results.push({ ...row, result: 'missing' });
    continue;
  }

  const hold = sourcePriceRisk(row) || row.images < 4 || row.score < 76;
  const nextTitle = polishedTitle(row);
  const update = gql(
    `mutation ProductUpdate($product: ProductUpdateInput!) {
      productUpdate(product: $product) {
        product { id title handle status tags }
        userErrors { field message }
      }
    }`,
    {
      product: {
        id: product.id,
        title: nextTitle,
        descriptionHtml: descriptionHtml(row, nextTitle),
        tags: tagsFor(row, product, hold),
        seo: {
          title: `${nextTitle.replace(/^North & Pearl\s+/, '')} | North & Pearl`,
          description: shortCopy(row, nextTitle).slice(0, 320),
        },
      },
    },
    true,
  ).productUpdate;

  if (update.userErrors.length) {
    results.push({ ...row, nextTitle, result: 'product-update-error', detail: JSON.stringify(update.userErrors) });
    continue;
  }

  const imageMediaIds = product.media.nodes
    .filter((media) => media.mediaContentType === 'IMAGE')
    .map((media) => media.id);
  if (imageMediaIds.length) {
    gql(
      `mutation ProductUpdateMedia($productId: ID!, $media: [UpdateMediaInput!]!) {
        productUpdateMedia(productId: $productId, media: $media) {
          mediaUserErrors { field message }
        }
      }`,
      {
        productId: product.id,
        media: imageMediaIds.map((id, index) => ({
          id,
          alt: `${nextTitle.replace(/^North & Pearl\s+/, '')} product image ${index + 1} for North & Pearl`,
        })),
      },
      true,
    );
  }

  results.push({
    ...row,
    previousTitle: product.title,
    nextTitle,
    result: hold ? 'held-for-review' : 'polished-launch-review',
  });
}

const held = results.filter((row) => row.result === 'held-for-review');
const launchReview = results.filter((row) => row.result === 'polished-launch-review');

console.table(results.map((row) => ({
  handle: row.handle,
  previousTitle: row.previousTitle || row.title,
  nextTitle: row.nextTitle,
  result: row.result,
  images: row.images,
  sourcePrice: row.sourcePrice,
  score: row.score,
})));

const report = [
  `# Gauss Next 100 Polish Gate - ${runDate}`,
  '',
  `Products processed: ${results.length}`,
  `Launch-review candidates: ${launchReview.length}`,
  `Held for pricing/image/source review: ${held.length}`,
  '',
  'Agent gate:',
  '- Gauss: category depth, merchandising title, and draft status.',
  '- Kuhn: product-image presentation must be visually reviewed before activation.',
  '- Faraday: SEO titles/meta updated without unsupported claims.',
  '- Curie: unverified materials and supplier facts remain unclaimed; pricing-risk products are held.',
  '- Lovelace: fulfillment, personalization, and packaging promises remain conservative.',
  '- Tesla: no theme changes required for this catalog gate.',
  '',
  '| # | Handle | Previous title | Polished title | Result | Images | Source price | Score |',
  '|---:|---|---|---|---|---:|---|---:|',
  ...results.map((row, index) => `| ${index + 1} | ${row.handle} | ${(row.previousTitle || row.title || '').replaceAll('|', '-')} | ${(row.nextTitle || '').replaceAll('|', '-')} | ${row.result} | ${row.images} | ${(row.sourcePrice || '').replaceAll('|', '-')} | ${row.score} |`),
  '',
  'Activation rule:',
  '- Do not activate products tagged `do-not-activate` or `supplier-pricing-review-required`.',
  '- Do not activate any product until visual QA confirms image quality and product-page presentation.',
  '- Do not publish stronger material, plating, waterproof, hypoallergenic, or durability claims without supplier documentation and owner approval.',
  '',
];

writeFileSync(outputReportPath, `${report.join('\n')}\n`);
console.log(`Processed ${results.length} products. Launch-review: ${launchReview.length}. Held: ${held.length}.`);
console.log(`wrote ${outputReportPath}`);
