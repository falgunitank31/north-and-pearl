import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const domain = 'https://northandpearl.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-merchant-readiness-'));
const outputMd = 'reports/merchant-center-readiness-2026-07-22.md';
const outputCsv = 'reports/merchant-center-readiness-2026-07-22.csv';

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

const products = gql(`query MerchantReadiness {
  products(first: 250, query: "vendor:'North & Pearl' status:active") {
    nodes {
      title
      handle
      productType
      status
      vendor
      tags
      descriptionHtml
      seo { title description }
      variants(first: 20) {
        nodes {
          title
          price
          compareAtPrice
          availableForSale
          barcode
          sku
          inventoryPolicy
        }
      }
      media(first: 20) {
        nodes {
          mediaContentType
          alt
          preview { image { url width height altText } }
        }
      }
    }
  }
}`).products.nodes;

const rows = products.map((product) => {
  const issues = [];
  const description = text(product.descriptionHtml);
  const images = product.media.nodes.filter((media) => media.mediaContentType === 'IMAGE');
  const firstVariant = product.variants.nodes[0];
  const image = images[0]?.preview?.image;
  const sourceTagged = product.tags.includes('source-alibaba') || product.tags.includes('alibaba-sourced');

  if (!product.title || product.title.length > 150) issues.push('title-risk');
  if (description.length < 500) issues.push('description-thin');
  if (!product.seo?.title || !product.seo?.description) issues.push('missing-seo');
  if (!firstVariant?.price || Number(firstVariant.price) <= 0) issues.push('missing-price');
  if (!firstVariant?.availableForSale) issues.push('not-available');
  if (!images.length) issues.push('missing-image');
  if ((image?.width || 0) < 700 || (image?.height || 0) < 700) issues.push('primary-image-small');
  if (images.some((media) => !(media.alt || media.preview?.image?.altText))) issues.push('missing-alt');
  if (!firstVariant?.barcode && !firstVariant?.sku) issues.push('identifier-gap');
  if (sourceTagged && !product.tags.some((tag) => tag.startsWith('alibaba-source-'))) issues.push('source-id-missing');

  return {
    title: product.title,
    handle: product.handle,
    url: `${domain}/products/${product.handle}`,
    productType: product.productType,
    price: firstVariant?.price || '',
    available: firstVariant?.availableForSale ? 'yes' : 'no',
    imageCount: images.length,
    primaryImageWidth: image?.width || 0,
    primaryImageHeight: image?.height || 0,
    hasBarcode: firstVariant?.barcode ? 'yes' : 'no',
    hasSku: firstVariant?.sku ? 'yes' : 'no',
    issues,
    readiness: issues.filter((issue) => issue !== 'identifier-gap').length === 0 ? 'Ready with identifier caveat' : 'Needs review',
  };
});

const issueCounts = new Map();
for (const row of rows) {
  for (const issue of row.issues) issueCounts.set(issue, (issueCounts.get(issue) || 0) + 1);
}

mkdirSync(dirname(outputCsv), { recursive: true });
writeFileSync(
  outputCsv,
  [
    ['Title', 'Handle', 'URL', 'Type', 'Price', 'Available', 'Images', 'Primary Width', 'Primary Height', 'Barcode', 'SKU', 'Readiness', 'Issues'].map(csv).join(','),
    ...rows.map((row) => [
      row.title,
      row.handle,
      row.url,
      row.productType,
      row.price,
      row.available,
      row.imageCount,
      row.primaryImageWidth,
      row.primaryImageHeight,
      row.hasBarcode,
      row.hasSku,
      row.readiness,
      row.issues.join('; '),
    ].map(csv).join(',')),
  ].join('\n'),
);

const readyCount = rows.filter((row) => row.readiness === 'Ready with identifier caveat').length;
const needsReview = rows.length - readyCount;

writeFileSync(
  outputMd,
  `# Merchant Center Readiness Audit - 2026-07-22

Owner: Faraday + Rawls + Tesla

Scope: active North & Pearl Shopify products and free Google product listing readiness.

## Summary

- Active products audited: ${rows.length}
- Ready with identifier caveat: ${readyCount}
- Needs review: ${needsReview}
- Domain checked for product URLs: \`${domain}\`

## Issue Counts

${[...issueCounts.entries()].sort((a, b) => b[1] - a[1]).map(([issue, count]) => `- ${issue}: ${count}`).join('\n') || '- No issues detected.'}

## Interpretation

- \`identifier-gap\` means barcode/GTIN and SKU are missing. This is common for private-label/resale jewelry, but Google may ask for stronger identifiers or \`identifier_exists = no\` depending on feed setup.
- Products should not be pushed into Merchant Center with invented GTINs, MPNs, materials, certifications, or supplier facts.
- Shipping, returns, tax, and business identity should be configured directly in Merchant Center/Shopify admin by the owner or through the official Google & YouTube sales channel.

## High-Priority Next Actions

1. Connect or verify the official Google & YouTube Shopify sales channel.
2. Claim and verify \`northandpearl.com\` in Merchant Center.
3. Configure shipping and return settings in Merchant Center using verified business rules.
4. Decide feed identifier strategy for private-label jewelry: use real supplier/manufacturer identifiers where available; otherwise do not invent GTINs.
5. Review products with \`description-thin\`, \`primary-image-small\`, \`missing-price\`, or \`not-available\` if they appear in future audits.
6. Keep product titles clear, claim-safe, and aligned with the landing page.

## Agent Handoffs

- Faraday: align product titles/descriptions with commercial search intent without keyword stuffing.
- Gauss: collect supplier identifiers, exact source URLs, stock status, material docs, and product facts.
- Kuhn: review primary product images for Google Shopping visual quality.
- Tesla: keep product schema, landing pages, and feed-related theme output stable.
- Rawls: measure free listing traffic once Merchant Center is active.
- Lovelace: confirm shipping/return policy details before feed submission.
`,
);

console.log(`Audited ${rows.length} active products.`);
console.log(`Ready with identifier caveat: ${readyCount}`);
console.log(`Needs review: ${needsReview}`);
console.log(`Wrote ${outputMd}`);
console.log(`Wrote ${outputCsv}`);

