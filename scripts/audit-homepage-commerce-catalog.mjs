import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-homepage-catalog-'));
const reportPath = 'reports/homepage-commerce-catalog-audit-2026-07-24.json';

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

const products = [];
let productCursor = null;
let hasNextProducts = true;

while (hasNextProducts) {
  const data = gql(
    `query HomepageCatalogProducts($after: String) {
      products(first: 100, after: $after, query: "vendor:'North & Pearl'") {
        pageInfo { hasNextPage endCursor }
        nodes {
          title
          handle
          status
          productType
          tags
          totalInventory
          tracksInventory
          onlineStoreUrl
          priceRangeV2 { minVariantPrice { amount currencyCode } }
          compareAtPriceRange { minVariantCompareAtPrice { amount currencyCode } }
          media(first: 10) {
            nodes {
              mediaContentType
              preview { image { url width height altText } }
            }
          }
          collections(first: 10) {
            nodes { title handle productsCount { count } }
          }
          variants(first: 10) {
            nodes {
              availableForSale
              price
              compareAtPrice
              inventoryQuantity
              inventoryPolicy
            }
          }
        }
      }
    }`,
    { after: productCursor },
  );
  products.push(...data.products.nodes);
  hasNextProducts = data.products.pageInfo.hasNextPage;
  productCursor = data.products.pageInfo.endCursor;
}

const collections = [];
let collectionCursor = null;
let hasNextCollections = true;

while (hasNextCollections) {
  const data = gql(
    `query HomepageCatalogCollections($after: String) {
      collections(first: 100, after: $after) {
        pageInfo { hasNextPage endCursor }
        nodes {
          title
          handle
          productsCount { count }
          image { url altText width height }
        }
      }
    }`,
    { after: collectionCursor },
  );
  collections.push(...data.collections.nodes);
  hasNextCollections = data.collections.pageInfo.hasNextPage;
  collectionCursor = data.collections.pageInfo.endCursor;
}

const activeProducts = products.filter((product) => product.status === 'ACTIVE');
const usableImageProducts = activeProducts.filter((product) =>
  product.media.nodes.some((media) => media.mediaContentType === 'IMAGE' && media.preview?.image?.url),
);
const pricedProducts = activeProducts.filter((product) => Number(product.priceRangeV2.minVariantPrice.amount) > 0);
const availableProducts = activeProducts.filter((product) =>
  product.variants.nodes.some((variant) => variant.availableForSale),
);
const emptyCollections = collections.filter((collection) => collection.productsCount.count === 0);
const populatedCollections = collections
  .filter((collection) => collection.productsCount.count > 0)
  .sort((a, b) => b.productsCount.count - a.productsCount.count);

const report = {
  generatedAt: new Date().toISOString(),
  productCount: products.length,
  activeProductCount: activeProducts.length,
  activeProductsWithUsableImages: usableImageProducts.length,
  activeProductsWithPrices: pricedProducts.length,
  activeProductsAvailableForSale: availableProducts.length,
  collectionCount: collections.length,
  populatedCollectionCount: populatedCollections.length,
  emptyCollectionCount: emptyCollections.length,
  emptyCollections: emptyCollections.map((collection) => collection.handle),
  populatedCollections: populatedCollections.map((collection) => ({
    title: collection.title,
    handle: collection.handle,
    productCount: collection.productsCount.count,
    hasImage: Boolean(collection.image?.url),
  })),
  sampleActiveProducts: activeProducts.slice(0, 20).map((product) => ({
    title: product.title,
    handle: product.handle,
    images: product.media.nodes.filter((media) => media.mediaContentType === 'IMAGE').length,
    price: product.priceRangeV2.minVariantPrice.amount,
    compareAtPrice: product.compareAtPriceRange.minVariantCompareAtPrice.amount,
    collections: product.collections.nodes.map((collection) => collection.handle),
  })),
};

mkdirSync('reports', { recursive: true });
writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
