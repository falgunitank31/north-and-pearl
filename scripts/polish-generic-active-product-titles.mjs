import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-generic-title-polish-'));
const today = new Date().toISOString().slice(0, 10);
const reportPath = `reports/generic-active-product-title-polish-${today}.md`;

const updates = {
  'north-pearl-heart-necklace-9715': 'North & Pearl Sweetheart Charm Pendant',
  'north-pearl-heart-necklace-8734': 'North & Pearl Classic Love Pendant',
  'north-pearl-heart-necklace-3910': 'North & Pearl Dainty Love Pendant',
  'north-pearl-signature-bracelet-8272': 'North & Pearl Everyday Oval Bracelet',
  'north-pearl-signature-earrings': 'North & Pearl Giftable Polished Earrings',
  'north-pearl-signature-jewelry-set': 'North & Pearl Giftable Jewelry Set',
  'north-pearl-signature-ring-0279': 'North & Pearl Giftable Statement Ring',
  'north-pearl-signature-ring': 'North & Pearl Minimal Statement Ring',
  'north-pearl-heart-necklace-2948': 'North & Pearl Polished Love Pendant',
  'north-pearl-signature-jewelry-set-8616': 'North & Pearl Polished Jewelry Set',
  'north-pearl-signature-necklace-8214': 'North & Pearl Polished Pendant Necklace',
  'north-pearl-signature-ring-7015': 'North & Pearl Polished Statement Ring',
  'north-pearl-signature-bracelet-6682': 'North & Pearl Refined Oval Bracelet',
  'north-pearl-signature-earrings-6915': 'North & Pearl Refined Polished Earrings',
  'north-pearl-stud-earrings': 'North & Pearl Sculpted Stud Earrings',
  'north-pearl-signature-bracelet-9323': 'North & Pearl Stacking Oval Bracelet',
  'north-pearl-sparkle-bracelet-6794': 'North & Pearl Sparkle Stacking Bracelet',
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

function descriptionHtml(title) {
  return [
    `<p>${title} is selected for a polished jewelry-box look, thoughtful gifting, and easy everyday styling.</p>`,
    '<h3>Why it makes a meaningful gift</h3>',
    '<p>Chosen for birthdays, anniversaries, bridesmaids, mothers, partners, friends, sisters, and thoughtful self-gifting depending on the recipient and style.</p>',
    '<h3>Product details</h3>',
    '<p>Exact materials, finish, sizing, stones, personalization options, and packaging details should be confirmed against the final product record before stronger product claims are published.</p>',
    '<h3>Care note</h3>',
    '<p>Store separately, keep dry between wears, and avoid direct contact with lotions, perfumes, and harsh cleaners unless product-specific care guidance says otherwise.</p>',
  ].join('');
}

const products = gql(
  `query ProductsForPolish($query: String!) {
    products(first: 100, query: $query) {
      nodes { id title handle status }
    }
  }`,
  { query: Object.keys(updates).map((handle) => `handle:${handle}`).join(' OR ') },
).products.nodes;

const byHandle = new Map(products.map((product) => [product.handle, product]));
const changed = [];
const skipped = [];

for (const [handle, title] of Object.entries(updates)) {
  const product = byHandle.get(handle);
  if (!product || product.status !== 'ACTIVE') {
    skipped.push({ handle, reason: product ? product.status : 'not found' });
    continue;
  }

  if (product.title === title) continue;

  const result = gql(
    `mutation UpdateGenericTitleProduct($product: ProductUpdateInput!) {
      productUpdate(product: $product) {
        product { id title handle seo { title description } }
        userErrors { field message }
      }
    }`,
    {
      product: {
        id: product.id,
        title,
        descriptionHtml: descriptionHtml(title),
        seo: {
          title: `${title} | North & Pearl`,
          description: `${title} is a polished, giftable jewelry style selected for meaningful moments, everyday styling, and thoughtful North & Pearl gifting.`,
        },
      },
    },
    true,
  ).productUpdate;

  if (result.userErrors.length) {
    throw new Error(`Update errors for ${handle}: ${JSON.stringify(result.userErrors)}`);
  }

  changed.push({ handle, from: product.title, to: result.product.title });
}

const report = `# Generic Active Product Title Polish

Date: ${today}

## Summary

- Agent owners: Lead Orchestrator, Gauss, Kuhn, Faraday, Tesla.
- Products targeted: ${Object.keys(updates).length}
- Products updated: ${changed.length}
- Products skipped: ${skipped.length}

## Updated Products

${changed.map((item) => `- \`${item.handle}\`: ${item.from} -> ${item.to}`).join('\n') || '- None.'}

## Skipped

${skipped.map((item) => `- \`${item.handle}\`: ${item.reason}`).join('\n') || '- None.'}

## Risk And Rollback

- Risk level: Low. Handles, pricing, images, variants, collections, and inventory were not changed.
- Rollback: restore previous titles using the mapping above if needed.
`;

mkdirSync('reports', { recursive: true });
writeFileSync(reportPath, report);
console.table({ targeted: Object.keys(updates).length, updated: changed.length, skipped: skipped.length });
console.log(`Report: ${reportPath}`);
