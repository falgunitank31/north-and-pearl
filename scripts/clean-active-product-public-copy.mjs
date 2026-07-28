import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-public-copy-cleanup-'));
const reportPath = 'reports/active-product-public-copy-cleanup-2026-07-27.md';

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

function clean(value = '') {
  return String(value)
    .replace(/<h3>Details to confirm before launch<\/h3><ul>[\s\S]*?<\/ul>/gi, '<h3>Product details</h3><p>Review available options, product imagery, care guidance, and checkout details before ordering.</p>')
    .replace(/<li>Internal source reference:[\s\S]*?<\/li>/gi, '')
    .replace(/Internal source reference:[^<\n\r]+/gi, '')
    .replace(/Base material, plating, finish, dimensions, and packaging must be confirmed before stronger product claims are added\./gi, 'Review available options, product imagery, care guidance, and checkout details before ordering.')
    .replace(/Sample review should confirm image accuracy, chain feel, finish consistency, and packaging fit\./gi, '')
    .replace(/Final care instructions depend on supplier-confirmed materials\. Until confirmed, /gi, '')
    .replace(/<h3>Why it belongs in review<\/h3>/gi, '<h3>Why it belongs</h3>')
    .replace(/Details remain sample-confirmed before launch\./gi, 'Review product images, options, care notes, and checkout details before ordering.')
    .replace(/Details remain sample-confirmed before launch/gi, 'Review product images, options, care notes, and checkout details before ordering.')
    .replace(/Exact product composition, finish, sizing, and packaging details should be verified against supplier documentation before stronger claims are made\./gi, 'Review available product details, options, care guidance, and packaging notes before checkout.')
    .replace(/Product composition, finish, sizing, and packaging should be confirmed with supplier documentation and samples before stronger claims are made\./gi, 'Review available product details, options, care guidance, and packaging notes before checkout.')
    .replace(/Materials, stones, plating, finish, sizing, and packaging must be confirmed with supplier documentation and samples before stronger claims are made\./gi, 'Review available product details, options, sizing, care guidance, and packaging notes before checkout.')
    .replace(/Exact materials, stones, finish, sizing, and durability details require supplier and sample confirmation before stronger claims are made\./gi, 'Review available details, options, sizing, and care guidance before checkout.')
    .replace(/Material, stone, finish, sizing, durability, and care details should be confirmed with supplier documentation before stronger claims are made\./gi, 'Review available details, options, sizing, and care guidance before checkout.')
    .replace(/Product-specific materials, stone details, finish, and chain measurements should be confirmed against supplier documentation before stronger claims are made\./gi, 'Review available details, options, chain information, and care guidance before checkout.')
    .replace(/Bead composition, finish, sizing, and care details should be confirmed with supplier documentation before stronger claims are made\./gi, 'Review available details, options, sizing, and care guidance before checkout.')
    .replace(/A ([^.]+?) selected for ([^.]+?)\. Exact ([^.]+?) require supplier and sample confirmation before stronger claims are made\./gi, 'A $1 selected for $2. Review available details, options, sizing, and care guidance before checkout.')
    .replace(/A ([^.]+?) selected for ([^.]+?)\. Exact ([^.]+?) require supplier confirmation before stronger claims are made\./gi, 'A $1 selected for $2. Review available details, options, sizing, and care guidance before checkout.')
    .replace(/A ([^.]+?) selected for ([^.]+?)\. Exact ([^.]+?) must be verified before stronger claims are made\./gi, 'A $1 selected for $2. Review available details, options, sizing, and care guidance before checkout.')
    .replace(/A ([^.]+?) selected for ([^.]+?)\. Exact ([^.]+?) should be confirmed before stronger claims are made\./gi, 'A $1 selected for $2. Review available details, options, sizing, and care guidance before checkout.')
    .replace(/A ([^.]+?) selected for ([^.]+?)\. ([^.]+?) should be confirmed with supplier documentation before stronger claims are made\./gi, 'A $1 selected for $2. Review available details, options, sizing, and care guidance before checkout.')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

const products = [];
let cursor = null;
let hasNextPage = true;

while (hasNextPage) {
  const data = gql(`query ActiveProducts($after: String) {
    products(first: 100, after: $after, query: "vendor:'North & Pearl' status:active") {
      pageInfo { hasNextPage endCursor }
      nodes {
        id
        title
        handle
        descriptionHtml
        seo { title description }
      }
    }
  }`, { after: cursor });
  products.push(...data.products.nodes);
  hasNextPage = data.products.pageInfo.hasNextPage;
  cursor = data.products.pageInfo.endCursor;
}

const cleaned = [];

for (const product of products) {
  const nextDescriptionHtml = clean(product.descriptionHtml || '');
  const nextSeoDescription = clean(product.seo?.description || '');
  const changedDescription = nextDescriptionHtml !== (product.descriptionHtml || '');
  const changedSeo = nextSeoDescription !== (product.seo?.description || '');

  if (!changedDescription && !changedSeo) continue;

  const result = gql(
    `mutation CleanProductPublicCopy($input: ProductInput!) {
      productUpdate(input: $input) {
        product { id title handle }
        userErrors { field message }
      }
    }`,
    {
      input: {
        id: product.id,
        descriptionHtml: nextDescriptionHtml,
        seo: {
          title: product.seo?.title || null,
          description: nextSeoDescription || null,
        },
      },
    },
    true,
  ).productUpdate;

  if (result.userErrors.length) {
    throw new Error(`Could not clean ${product.handle}: ${JSON.stringify(result.userErrors)}`);
  }

  cleaned.push({
    title: product.title,
    handle: product.handle,
    description: changedDescription,
    meta: changedSeo,
  });
}

mkdirSync(dirname(reportPath), { recursive: true });
writeFileSync(reportPath, [
  '# Active Product Public Copy Cleanup',
  '',
  'Date: 2026-07-27',
  '',
  '## Summary',
  '',
  `- Active products reviewed: ${products.length}`,
  `- Active products cleaned: ${cleaned.length}`,
  '',
  '## What Changed',
  '',
  'Removed internal supplier/sample-review language from active customer-facing descriptions and meta descriptions. Replacements are neutral shopper guidance and do not add material, stone, finish, allergy, durability, warranty, or fulfillment claims.',
  '',
  '| Product | Handle | Description Updated | Meta Updated |',
  '|---|---|---:|---:|',
  ...cleaned.map((row) => `| ${row.title.replaceAll('|', '-')} | \`${row.handle}\` | ${row.description ? 'Yes' : 'No'} | ${row.meta ? 'Yes' : 'No'} |`),
  '',
  '## Responsibility Lanes',
  '',
  '- Faraday: SEO snippet and public-copy quality.',
  '- Curie: claim-safe language boundary.',
  '- Gauss: product catalog hygiene.',
  '- Tesla: Shopify Admin API execution.',
  '',
  '## Risk',
  '',
  'Low. This preserves conservative product facts while removing internal launch/supplier phrasing from active storefront copy.',
  '',
].join('\n'));

console.table({
  activeProductsReviewed: products.length,
  activeProductsCleaned: cleaned.length,
});
console.log(`Report: ${reportPath}`);
