import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-commerce-trust-'));
const outputMd = 'reports/commerce-trust-surface-audit-2026-07-24.md';
const outputJson = 'reports/commerce-trust-surface-audit-2026-07-24.json';

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

function plain(html = '') {
  return String(html).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

const data = gql(`query CommerceTrustAudit {
  collections(first: 100) {
    nodes {
      title
      handle
      productsCount { count }
      descriptionHtml
      seo { title description }
    }
  }
  products(first: 250, query: "vendor:'North & Pearl' status:active") {
    nodes {
      title
      handle
      productType
      tags
      variants(first: 20) {
        nodes {
          price
          compareAtPrice
          availableForSale
        }
      }
      media(first: 20) {
        nodes {
          mediaContentType
          preview { image { width height url } }
        }
      }
    }
  }
}`);

const collections = data.collections.nodes.map((collection) => ({
  title: collection.title,
  handle: collection.handle,
  productsCount: collection.productsCount?.count || 0,
  hasSeo: Boolean(collection.seo?.title && collection.seo?.description),
  descriptionLength: plain(collection.descriptionHtml).length,
  issues: [
    collection.productsCount === 0 ? 'empty-collection' : '',
    collection.productsCount > 0 && collection.productsCount < 4 ? 'thin-collection' : '',
    !collection.seo?.title || !collection.seo?.description ? 'missing-seo' : '',
    plain(collection.descriptionHtml).length < 120 ? 'thin-description' : '',
  ].filter(Boolean),
}));

const products = data.products.nodes.map((product) => {
  const variant = product.variants.nodes[0] || {};
  const price = Number(variant.price || 0);
  const compareAt = Number(variant.compareAtPrice || 0);
  const discountPercent = compareAt > price && compareAt > 0 ? Math.round(((compareAt - price) / compareAt) * 100) : 0;
  const images = product.media.nodes.filter((media) => media.mediaContentType === 'IMAGE');
  const minWidth = images.reduce((min, media) => Math.min(min, media.preview?.image?.width || 0), Infinity);
  const minHeight = images.reduce((min, media) => Math.min(min, media.preview?.image?.height || 0), Infinity);
  return {
    title: product.title,
    handle: product.handle,
    productType: product.productType,
    price,
    compareAt,
    discountPercent,
    images: images.length,
    minWidth: Number.isFinite(minWidth) ? minWidth : 0,
    minHeight: Number.isFinite(minHeight) ? minHeight : 0,
    issues: [
      compareAt > price ? 'compare-at-price-active' : '',
      compareAt > price && discountPercent > 35 ? 'large-discount-review' : '',
      images.length < 4 ? 'limited-gallery' : '',
      (Number.isFinite(minWidth) ? minWidth : 0) < 800 || (Number.isFinite(minHeight) ? minHeight : 0) < 800 ? 'image-size-review' : '',
    ].filter(Boolean),
  };
});

const issueCounts = {
  collections: collections.reduce((map, item) => {
    for (const issue of item.issues) map[issue] = (map[issue] || 0) + 1;
    return map;
  }, {}),
  products: products.reduce((map, item) => {
    for (const issue of item.issues) map[issue] = (map[issue] || 0) + 1;
    return map;
  }, {}),
};

mkdirSync(dirname(outputMd), { recursive: true });
writeFileSync(outputJson, JSON.stringify({ collections, products, issueCounts }, null, 2));
writeFileSync(
  outputMd,
  `# Commerce Trust Surface Audit - 2026-07-24

## Summary

- Collections audited: ${collections.length}
- Active products audited: ${products.length}
- Collections with issues: ${collections.filter((item) => item.issues.length).length}
- Products with trust-surface issues: ${products.filter((item) => item.issues.length).length}

## Collection Issue Counts

${Object.entries(issueCounts.collections).map(([issue, count]) => `- ${issue}: ${count}`).join('\n') || '- None detected.'}

## Product Issue Counts

${Object.entries(issueCounts.products).map(([issue, count]) => `- ${issue}: ${count}`).join('\n') || '- None detected.'}

## Collections Needing Review

| Collection | Handle | Products | Description Length | Issues |
| --- | --- | ---: | ---: | --- |
${collections
  .filter((item) => item.issues.length)
  .sort((a, b) => a.productsCount - b.productsCount || a.title.localeCompare(b.title))
  .map((item) => `| ${item.title} | ${item.handle} | ${item.productsCount} | ${item.descriptionLength} | ${item.issues.join('; ')} |`)
  .join('\n') || '| None | - | - | - | - |'}

## Product Trust Surface Review

| Product | Handle | Price | Compare At | Discount | Images | Min Size | Issues |
| --- | --- | ---: | ---: | ---: | ---: | --- | --- |
${products
  .filter((item) => item.issues.length)
  .sort((a, b) => b.discountPercent - a.discountPercent || a.images - b.images || a.title.localeCompare(b.title))
  .slice(0, 80)
  .map((item) => `| ${item.title} | ${item.handle} | ${item.price} | ${item.compareAt || ''} | ${item.discountPercent}% | ${item.images} | ${item.minWidth}x${item.minHeight} | ${item.issues.join('; ')} |`)
  .join('\n') || '| None | - | - | - | - | - | - | - |'}

## Recommended Action

- Review sale/compare-at strategy before removing or retaining sale badges globally.
- Keep visible navigation away from empty or very thin collections.
- Continue product visual QA for limited galleries and images below 800px on either side.
`,
);

console.log(`Wrote ${outputMd}`);
console.log(`Wrote ${outputJson}`);
console.log(JSON.stringify(issueCounts, null, 2));
