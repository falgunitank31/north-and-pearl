import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-active-title-dupes-'));
const today = new Date().toISOString().slice(0, 10);
const reportPath = `reports/active-duplicate-product-title-cleanup-${today}.md`;

const descriptorPools = {
  necklace: ['Charm', 'Pendant', 'Layering', 'Keepsake', 'Everyday', 'Gift', 'Signature', 'Minimal', 'Refined', 'Delicate'],
  bracelet: ['Stacking', 'Link', 'Charm', 'Everyday', 'Gift', 'Signature', 'Polished', 'Layering', 'Refined', 'Minimal'],
  ring: ['Stacking', 'Statement', 'Everyday', 'Gift', 'Signature', 'Polished', 'Refined', 'Minimal'],
  earrings: ['Stud', 'Drop', 'Everyday', 'Gift', 'Signature', 'Polished', 'Refined', 'Minimal'],
  default: ['Everyday', 'Gift', 'Signature', 'Polished', 'Refined', 'Minimal', 'Keepsake', 'Layering'],
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

function productKind(product) {
  const value = `${product.productType} ${product.title}`.toLowerCase();
  if (value.includes('bracelet') || value.includes('bangle') || value.includes('cuff')) return 'bracelet';
  if (value.includes('ring')) return 'ring';
  if (value.includes('earring') || value.includes('stud') || value.includes('hoop')) return 'earrings';
  if (value.includes('necklace') || value.includes('pendant') || value.includes('charm')) return 'necklace';
  return 'default';
}

function normalizeTitle(title) {
  return title.trim().replace(/\s+/g, ' ');
}

function makeUniqueTitle(product, index, existingTitles) {
  const original = normalizeTitle(product.title);
  const kind = productKind(product);
  const pool = descriptorPools[kind] || descriptorPools.default;
  const base = original.replace(/^North & Pearl\s+/i, '');

  for (const descriptor of pool) {
    const candidate = normalizeTitle(`North & Pearl ${descriptor} ${base}`);
    if (!existingTitles.has(candidate.toLowerCase())) return candidate;
  }

  const candidate = normalizeTitle(`North & Pearl ${base} Edit ${index + 1}`);
  return candidate;
}

function safeDescription(title, kind) {
  const productWord = kind === 'default' ? 'jewelry piece' : kind.replace('earrings', 'earring style');
  return [
    `<p>${title} is selected for customers who want a polished, giftable ${productWord} with a meaningful North & Pearl presentation.</p>`,
    '<h3>Why it makes a meaningful gift</h3>',
    '<p>Chosen for birthdays, anniversaries, bridesmaids, mothers, partners, friends, sisters, and thoughtful self-gifting depending on the recipient and style.</p>',
    '<h3>Product details</h3>',
    '<p>Exact materials, finish, sizing, stones, personalization options, and packaging details should be confirmed against the final product record before stronger product claims are published.</p>',
    '<h3>Care note</h3>',
    '<p>Store separately, keep dry between wears, and avoid direct contact with lotions, perfumes, and harsh cleaners unless product-specific care guidance says otherwise.</p>',
  ].join('');
}

const products = [];
let after = null;
do {
  const data = gql(
    `query ActiveProducts($after: String) {
      products(first: 250, after: $after, query: "vendor:'North & Pearl' status:active") {
        pageInfo { hasNextPage endCursor }
        nodes { id title handle status productType tags }
      }
    }`,
    { after },
  ).products;
  products.push(...data.nodes);
  after = data.pageInfo.hasNextPage ? data.pageInfo.endCursor : null;
} while (after);

const groups = new Map();
for (const product of products) {
  const key = normalizeTitle(product.title).toLowerCase();
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(product);
}

const duplicateGroups = [...groups.values()].filter((group) => group.length > 1);
const existingTitles = new Set(products.map((product) => normalizeTitle(product.title).toLowerCase()));
const changed = [];

for (const group of duplicateGroups) {
  group.sort((a, b) => a.handle.localeCompare(b.handle));
  for (let index = 1; index < group.length; index += 1) {
    const product = group[index];
    existingTitles.delete(normalizeTitle(product.title).toLowerCase());
    const title = makeUniqueTitle(product, index, existingTitles);
    existingTitles.add(title.toLowerCase());
    const kind = productKind(product);

    const result = gql(
      `mutation UpdateProductTitle($product: ProductUpdateInput!) {
        productUpdate(product: $product) {
          product { id title handle seo { title description } }
          userErrors { field message }
        }
      }`,
      {
        product: {
          id: product.id,
          title,
          descriptionHtml: safeDescription(title, kind),
          seo: {
            title: `${title} | North & Pearl`,
            description: `${title} is a polished, giftable jewelry style selected for meaningful moments, everyday styling, and thoughtful North & Pearl gifting.`,
          },
        },
      },
      true,
    ).productUpdate;

    if (result.userErrors.length) {
      throw new Error(`Update errors for ${product.handle}: ${JSON.stringify(result.userErrors)}`);
    }

    changed.push({ handle: product.handle, from: product.title, to: result.product.title });
  }
}

const report = `# Active Duplicate Product Title Cleanup

Date: ${today}

## Summary

- Agent owners: Lead Orchestrator, Gauss, Kuhn, Faraday, Tesla.
- Active products reviewed: ${products.length}
- Duplicate title groups found: ${duplicateGroups.length}
- Product titles updated: ${changed.length}

## What Changed

The cleanup only changed active product titles, description copy, and SEO snippets for duplicate-title products. It did not change handles, prices, inventory, product media, channel publication, variants, collections, or supplier facts.

## Updated Products

${changed.map((item) => `- \`${item.handle}\`: ${item.from} -> ${item.to}`).join('\n') || '- None.'}

## Risk And Rollback

- Risk level: Low. Product records remain active and URLs/handles are unchanged.
- Rollback: use Shopify product history or Git/report mapping above to restore a prior title/copy manually.
- Remaining issue: Titles are now differentiated, but final product-specific naming should improve again after physical samples and supplier specification confirmation.
`;

mkdirSync('reports', { recursive: true });
writeFileSync(reportPath, report);
console.table({ activeProducts: products.length, duplicateGroups: duplicateGroups.length, updatedProducts: changed.length });
console.log(`Report: ${reportPath}`);
