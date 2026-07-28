import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-internal-language-clean-'));
const runDate = new Date().toISOString().slice(0, 10);
const reportPath = `reports/active-internal-catalog-language-cleanup-${runDate}.md`;

const internalPattern = /supplier shown|source reference|internal source|candidate|details to confirm|before launch|Alibaba|stronger claims|supplier documentation|sample confirmation|sample review/i;

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
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      execFileSync('npx', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
      return JSON.parse(readFileSync(outputFile, 'utf8'));
    } catch (error) {
      lastError = error;
      if (attempt < 3) {
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, attempt * 2000);
      }
    }
  }
  throw lastError;
}

function noun(productType) {
  if (productType === 'Gift Set') return 'jewelry set';
  if (productType === 'Earrings') return 'earrings';
  if (productType === 'Ring') return 'ring';
  if (productType === 'Bracelet') return 'bracelet';
  return 'necklace';
}

function publicDescription(product) {
  const cleanTitle = product.title.replace(/^North & Pearl\s+/, '');
  const item = noun(product.productType);
  return [
    `<p>${cleanTitle} is a polished ${item} selected for meaningful gifting, everyday styling, and a refined North &amp; Pearl jewelry-box feel.</p>`,
    '<h3>Why you will love it</h3>',
    '<ul>',
    '<li>Giftable design with a warm, personal feel.</li>',
    '<li>Easy to style for everyday outfits, celebrations, and thoughtful moments.</li>',
    '<li>Works well for birthdays, anniversaries, bridesmaids, friends, family, and self-gifting depending on the style.</li>',
    '</ul>',
    '<h3>Gift note</h3>',
    '<p>Add a jewelry gift box or personal message when you want the moment to feel more considered.</p>',
    '<h3>Care</h3>',
    '<p>Store separately, avoid harsh cleaners, and keep dry between wears. Material-specific care guidance will be expanded after item-level documentation is confirmed.</p>',
  ].join('');
}

const products = [];
let cursor = null;
let hasNextPage = true;

while (hasNextPage) {
  const response = gql(`query ActiveProducts($after: String) {
    products(first: 100, after: $after, query: "vendor:'North & Pearl' status:active") {
      pageInfo { hasNextPage endCursor }
      nodes {
        id
        title
        handle
        productType
        descriptionHtml
        seo { title description }
      }
    }
  }`, { after: cursor });
  products.push(...response.products.nodes);
  hasNextPage = response.products.pageInfo.hasNextPage;
  cursor = response.products.pageInfo.endCursor;
}

const cleaned = [];

for (const product of products) {
  const text = `${product.descriptionHtml || ''} ${product.seo?.description || ''}`;
  if (!internalPattern.test(text)) continue;

  const nextDescriptionHtml = publicDescription(product);
  const nextSeoDescription = `${product.title.replace(/^North & Pearl\s+/, '')} from North & Pearl, selected for meaningful gifting, everyday styling, and polished jewelry-box moments.`;

  const result = gql(
    `mutation CleanInternalLanguage($product: ProductUpdateInput!) {
      productUpdate(product: $product) {
        product { id title handle }
        userErrors { field message }
      }
    }`,
    {
      product: {
        id: product.id,
        descriptionHtml: nextDescriptionHtml,
        seo: {
          title: product.seo?.title || `${product.title} | North & Pearl`,
          description: nextSeoDescription.slice(0, 320),
        },
      },
    },
    true,
  ).productUpdate;

  if (result.userErrors.length) {
    throw new Error(`Could not clean ${product.handle}: ${JSON.stringify(result.userErrors)}`);
  }
  cleaned.push({ title: product.title, handle: product.handle });
}

const report = [
  `# Active Internal Catalog Language Cleanup - ${runDate}`,
  '',
  `Active products reviewed: ${products.length}`,
  `Active products cleaned: ${cleaned.length}`,
  '',
  'Purpose: remove internal sourcing, review-gate, and supplier-confirmation wording from active customer-facing product descriptions and meta descriptions.',
  '',
  '| # | Product | Handle |',
  '|---:|---|---|',
  ...cleaned.map((row, index) => `| ${index + 1} | ${row.title.replaceAll('|', '-')} | \`${row.handle}\` |`),
  '',
];
writeFileSync(reportPath, `${report.join('\n')}\n`);
console.table({ activeProductsReviewed: products.length, activeProductsCleaned: cleaned.length });
console.log(`Report: ${reportPath}`);
