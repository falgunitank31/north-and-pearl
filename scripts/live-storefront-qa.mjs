import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const domain = 'https://northandpearl.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-live-qa-'));

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

async function fetchText(path, options = {}) {
  const response = await fetch(`${domain}${path}`, {
    redirect: 'follow',
    headers: {
      'user-agent': 'NorthPearlLiveQA/1.0',
      ...options.headers,
    },
    ...options,
  });
  const text = await response.text();
  return { response, text };
}

function has(html, pattern) {
  return pattern.test(html);
}

const products = gql(`query ActiveProducts {
  products(first: 100, query: "vendor:'North & Pearl' status:active") {
    nodes {
      title
      handle
      status
      tags
      variants(first: 20) {
        nodes {
          id
          title
          availableForSale
          inventoryPolicy
          inventoryQuantity
        }
      }
      media(first: 20) {
        nodes {
          mediaContentType
          preview { image { url width height altText } }
        }
      }
    }
  }
}`).products.nodes;

const results = [];

for (const product of products) {
  const path = `/products/${product.handle}`;
  const { response, text: html } = await fetchText(path);
  const images = product.media.nodes.filter((media) => media.mediaContentType === 'IMAGE');
  const availableVariant = product.variants.nodes.find((variant) => variant.availableForSale);
  const personalizationLikely = `${product.title} ${product.tags.join(' ')}`.toLowerCase();
  const needsPersonalization =
    personalizationLikely.includes('personalized') ||
    personalizationLikely.includes('engraved') ||
    personalizationLikely.includes('coordinates') ||
    personalizationLikely.includes('custom');

  const checks = {
    http200: response.status === 200,
    h1: has(html, /<h1\b/i),
    productForm: has(html, /<product-form\b/i),
    addButton: has(html, /ProductSubmitButton-/i),
    variantInput: has(html, /class="product-variant-id"/i),
    thumbnailGallery: images.length > 1 ? has(html, /product--thumbnail_slider/i) && has(html, /GalleryThumbnails/i) : true,
    mediaImages: images.length > 0,
    price: has(html, /class="[^"]*price/i),
    cartDrawerScript: has(html, /cart-drawer/i),
    disclosureSupport: has(html, /Gift|Shipping|Care|Returns|Personalization/i),
    personalizationFields: needsPersonalization ? has(html, /np-personalization-fields/i) : true,
  };

  results.push({
    title: product.title,
    handle: product.handle,
    page: Object.values(checks).every(Boolean) ? 'PASS' : 'FAIL',
    failedChecks: Object.entries(checks).filter(([, passed]) => !passed).map(([name]) => name).join(', '),
    images: images.length,
    availableVariantId: availableVariant?.id?.replace('gid://shopify/ProductVariant/', '') || '',
  });
}

const cartCandidate = products.find((product) => product.variants.nodes.some((variant) => variant.availableForSale));
let cartResult = { status: 'SKIPPED', detail: 'No available active variant found.' };

if (cartCandidate) {
  const variant = cartCandidate.variants.nodes.find((item) => item.availableForSale);
  const variantId = variant.id.replace('gid://shopify/ProductVariant/', '');
  const body = new URLSearchParams({
    id: variantId,
    quantity: '1',
    'properties[QA session]': 'North & Pearl live storefront QA',
  });

  const addResponse = await fetch(`${domain}/cart/add.js`, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      accept: 'application/json',
      'user-agent': 'NorthPearlLiveQA/1.0',
    },
    body,
    redirect: 'manual',
  });

  const addText = await addResponse.text();
  cartResult = {
    status: addResponse.ok ? 'PASS' : 'FAIL',
    product: cartCandidate.title,
    variantId,
    httpStatus: addResponse.status,
    detail: addText.slice(0, 240).replace(/\s+/g, ' '),
  };
}

console.table(results);
console.log('\nCart add test:');
console.log(JSON.stringify(cartResult, null, 2));

const failures = results.filter((result) => result.page !== 'PASS');
if (failures.length || cartResult.status === 'FAIL') {
  process.exitCode = 1;
}
