import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-product-seo-audit-'));
const outputCsv = 'reports/product-seo-catalog-audit.csv';
const outputMd = 'reports/product-seo-catalog-audit.md';

function gql(query, variables = {}) {
  const queryFile = join(tempDir, `query-${Date.now()}-${Math.random()}.graphql`);
  const varsFile = join(tempDir, `vars-${Date.now()}-${Math.random()}.json`);
  const outputFile = join(tempDir, `out-${Date.now()}-${Math.random()}.json`);
  writeFileSync(queryFile, query);
  writeFileSync(varsFile, JSON.stringify(variables, null, 2));
  execFileSync(
    'npx',
    [
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
    ],
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] },
  );
  return JSON.parse(readFileSync(outputFile, 'utf8'));
}

function csv(value) {
  return `"${String(value ?? '').replaceAll('"', '""')}"`;
}

function text(value = '') {
  return String(value).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function normalizedTitle(title) {
  return title
    .toLowerCase()
    .replace(/^north\s*&?\s*pearl\s+/i, '')
    .replace(/-\d+$/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const riskyClaimPattern =
  /\b(hypoallergenic|waterproof|tarnish[- ]?free|nickel[- ]?free|lead[- ]?free|cadmium[- ]?free|sterling silver|gold vermeil|solid gold|ethical|sustainable|handmade)\b/i;

const genericPattern = /\b(signature|heart necklace|crystal bracelet|flower bracelet|chain bracelet|hoop earrings)\b/i;

const products = gql(`query ProductSeoAudit {
  products(first: 250, query: "vendor:'North & Pearl' status:active") {
    nodes {
      title
      handle
      status
      productType
      tags
      descriptionHtml
      seo {
        title
        description
      }
      variants(first: 30) {
        nodes {
          title
          price
          compareAtPrice
          availableForSale
        }
      }
      media(first: 20) {
        nodes {
          mediaContentType
          alt
          preview {
            image {
              url
              width
              height
              altText
            }
          }
        }
      }
    }
  }
}`).products.nodes;

const titleCounts = new Map();
for (const product of products) {
  const key = normalizedTitle(product.title);
  titleCounts.set(key, (titleCounts.get(key) || 0) + 1);
}

const rows = products.map((product) => {
  const plainDescription = text(product.descriptionHtml);
  const images = product.media.nodes.filter((media) => media.mediaContentType === 'IMAGE');
  const altTexts = images.map((image) => image.alt || image.preview?.image?.altText || '').filter(Boolean);
  const minWidth = images.reduce((min, media) => Math.min(min, media.preview?.image?.width || 0), Infinity);
  const minHeight = images.reduce((min, media) => Math.min(min, media.preview?.image?.height || 0), Infinity);
  const titleKey = normalizedTitle(product.title);
  const issues = [];

  if (titleCounts.get(titleKey) > 1) issues.push('duplicate-title-family');
  if (genericPattern.test(product.title)) issues.push('generic-title');
  if (!product.seo?.title) issues.push('missing-seo-title');
  if (!product.seo?.description) issues.push('missing-meta-description');
  if (plainDescription.length < 450) issues.push('thin-description');
  if (images.length < 3) issues.push('low-image-count');
  if ((Number.isFinite(minWidth) ? minWidth : 0) < 700 || (Number.isFinite(minHeight) ? minHeight : 0) < 700) {
    issues.push('small-image-risk');
  }
  if (altTexts.length < images.length) issues.push('missing-image-alt');
  if (riskyClaimPattern.test(`${product.title} ${plainDescription} ${product.tags.join(' ')}`)) {
    issues.push('claim-review-needed');
  }

  const score = Math.max(0, 100 - issues.length * 12);
  return {
    title: product.title,
    handle: product.handle,
    productType: product.productType,
    images: images.length,
    minWidth: Number.isFinite(minWidth) ? minWidth : 0,
    minHeight: Number.isFinite(minHeight) ? minHeight : 0,
    descriptionLength: plainDescription.length,
    seoTitle: product.seo?.title || '',
    metaDescription: product.seo?.description || '',
    issues: issues.join('; '),
    score,
  };
}).sort((a, b) => a.score - b.score || a.title.localeCompare(b.title));

mkdirSync(dirname(outputCsv), { recursive: true });
writeFileSync(
  outputCsv,
  [
    [
      'Title',
      'Handle',
      'Product Type',
      'Images',
      'Min Width',
      'Min Height',
      'Description Length',
      'SEO Title',
      'Meta Description',
      'Issues',
      'Score',
    ].map(csv).join(','),
    ...rows.map((row) =>
      [
        row.title,
        row.handle,
        row.productType,
        row.images,
        row.minWidth,
        row.minHeight,
        row.descriptionLength,
        row.seoTitle,
        row.metaDescription,
        row.issues,
        row.score,
      ].map(csv).join(','),
    ),
  ].join('\n'),
);

const issueCounts = new Map();
for (const row of rows) {
  for (const issue of row.issues.split('; ').filter(Boolean)) {
    issueCounts.set(issue, (issueCounts.get(issue) || 0) + 1);
  }
}

const worstRows = rows.slice(0, 20);
writeFileSync(
  outputMd,
  `# Product SEO Catalog Audit

Date: ${new Date().toISOString().slice(0, 10)}

Scope: Active Shopify products with vendor \`North & Pearl\`.

Products audited: ${products.length}

## Issue Counts

${[...issueCounts.entries()].sort((a, b) => b[1] - a[1]).map(([issue, count]) => `- ${issue}: ${count}`).join('\n') || '- No issues detected by this script.'}

## Lowest Scoring Products

| Product | Handle | Score | Issues |
|---|---|---:|---|
${worstRows.map((row) => `| ${row.title} | ${row.handle} | ${row.score} | ${row.issues || 'None'} |`).join('\n')}

## Next Actions

1. Keep active-product SEO checks in the weekly Gauss QA rhythm.
2. Keep one-image products drafted until exact source listings, image sets, and product facts are verified.
3. Continue enforcing at least 3 accurate images for active products before scaling traffic.
4. Store source URLs, source titles, image URLs, and verification dates on every future product.
5. Review claim-sensitive product names and descriptions against supplier documentation before larger traffic pushes.
`,
);

console.table(rows.map(({ seoTitle, metaDescription, ...row }) => row));
console.log(`\nWrote ${outputCsv}`);
console.log(`Wrote ${outputMd}`);

if (rows.some((row) => row.score < 65)) {
  process.exitCode = 1;
}
