import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-aug11-batch4-'));
const onlineStorePublicationId = 'gid://shopify/Publication/331104157880';
const googlePublicationId = 'gid://shopify/Publication/332010225848';

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

const product = {
  candidateId: 'B4-001',
  title: 'North & Pearl Birth Flower Pendant Necklace',
  handle: 'north-pearl-birth-flower-pendant-necklace',
  type: 'Necklace',
  price: '49.00',
  sourceId: '1600370738258',
  sourceUrl: 'https://www.alibaba.com/product-introduction/JINYOU-3001-Tarnish-Free-Mother-Women_1600370738258.html',
  supplier: 'JINYOU / supplier not fully confirmed from public page',
  supplierProfileUrl: 'https://www.alibaba.com/product-introduction/JINYOU-3001-Tarnish-Free-Mother-Women_1600370738258.html',
  selectedVariant: 'Round birth-flower pendant necklace with month options',
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  images: [
    'https://sc04.alicdn.com/kf/He11fe86443b443adb65716bfad8a7eeay.jpg',
    'https://sc04.alicdn.com/kf/Hc845671861474b65810126e1e1621ef4n.jpg',
    'https://sc04.alicdn.com/kf/Hd7943d6a2bc0442eb86e2803501c963eo.jpg',
  ],
};

const lede =
  'A round birth-flower inspired pendant necklace selected for birthday gifting, mom gifts, and meaningful everyday wear.';
const description = [
  `<p>${lede}</p>`,
  '<h3>Why we selected it</h3>',
  '<ul>',
  '<li>Birth-flower inspired month options add a personal detail without custom production.</li>',
  '<li>Minimal round pendant shape fits everyday styling and gift-led collections.</li>',
  '<li>A strong entry-price option for birthdays, mothers, sisters, and friends.</li>',
  '<li>Fills a confirmed North &amp; Pearl catalog gap: birth-flower jewelry.</li>',
  '</ul>',
  '<h3>Choose your month</h3>',
  '<p>Select the month option before adding to cart.</p>',
  '<h3>Good to know</h3>',
  '<p>Material and finish details are unverified until North &amp; Pearl completes sample review and documentation checks. We describe this piece by its visible design, color, and month options instead of making unverified material claims.</p>',
  '<h3>Care</h3>',
  '<p>Store separately, keep dry when possible, and avoid perfumes, lotions, and harsh cleaners. Wipe gently with a soft cloth after wear.</p>',
].join('');

const setup = gql(`query Batch4Setup {
  collections(first: 100) { nodes { id title handle } }
}`);
const collectionByTitle = new Map(setup.collections.nodes.map((collection) => [collection.title, collection]));
const results = [];

const existing = gql(
  `query ExistingProduct($query: String!) {
    products(first: 1, query: $query) {
      nodes { id title handle status variants(first: 100) { nodes { id title selectedOptions { name value } } } options { id name optionValues { id name } } }
    }
  }`,
  { query: `handle:${product.handle}` },
).products.nodes[0];

let shopifyProduct = existing;
if (!shopifyProduct) {
  const create = gql(
    `mutation ProductCreate($product: ProductCreateInput!) {
      productCreate(product: $product) {
        product { id title handle status variants(first: 100) { nodes { id title selectedOptions { name value } } } options { id name optionValues { id name } } }
        userErrors { field message }
      }
    }`,
    {
      product: {
        title: product.title,
        handle: product.handle,
        vendor: 'North & Pearl',
        productType: product.type,
        descriptionHtml: description,
        status: 'ACTIVE',
        productOptions: [{ name: 'Birth Month', values: product.months.map((name) => ({ name })) }],
        tags: [
          'aug11-batch4',
          'alibaba-source-1600370738258',
          'birth-flower',
          'birthday-gift',
          'mother-gift',
          'necklace',
          'ready-to-order',
          'source-mapped',
        ],
        seo: {
          title: 'Birth Flower Pendant Necklace | North & Pearl',
          description: lede,
        },
        metafields: [
          { namespace: 'custom', key: 'supplier_product_url', type: 'url', value: product.sourceUrl },
          { namespace: 'custom', key: 'supplier_name', type: 'single_line_text_field', value: product.supplier },
          { namespace: 'custom', key: 'supplier_listing_id', type: 'single_line_text_field', value: product.sourceId },
          { namespace: 'custom', key: 'supplier_profile_url', type: 'url', value: product.supplierProfileUrl },
          { namespace: 'custom', key: 'supplier_selected_variant', type: 'single_line_text_field', value: product.selectedVariant },
          { namespace: 'custom', key: 'source_verification_status', type: 'single_line_text_field', value: 'Aug 11 Batch 4: visual/IP clean with claim-sensitive spec image excluded; material claims unverified; claim-safe public copy required' },
        ],
      },
    },
    true,
  ).productCreate;
  if (create.userErrors.length) {
    results.push({ ...product, status: 'create-error', detail: JSON.stringify(create.userErrors) });
  } else {
    shopifyProduct = create.product;
  }
}

if (shopifyProduct) {
  const existingSigns = new Set(shopifyProduct.variants.nodes.map((variant) => variant.selectedOptions.find((option) => option.name === 'Birth Month')?.value || variant.title));
  const option = shopifyProduct.options?.find((item) => item.name === 'Birth Month');
  const optionValueByName = new Map((option?.optionValues || []).map((value) => [value.name, value.id]));
  const variantsToCreate = product.months
    .filter((month) => !existingSigns.has(month))
    .map((month) => ({
      price: product.price,
      compareAtPrice: null,
      inventoryPolicy: 'CONTINUE',
      taxable: true,
      optionValues: [{ optionId: option.id, id: optionValueByName.get(month) }],
      inventoryItem: { sku: `NP-${product.candidateId}-${product.sourceId}-${month.toUpperCase()}` },
    }));

  if (variantsToCreate.length) {
    const variantCreate = gql(
      `mutation VariantCreate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
        productVariantsBulkCreate(productId: $productId, variants: $variants) {
          userErrors { field message }
        }
      }`,
      { productId: shopifyProduct.id, variants: variantsToCreate },
      true,
    ).productVariantsBulkCreate;
    if (variantCreate.userErrors.length) {
      results.push({ ...product, productId: shopifyProduct.id, status: 'variant-create-error', detail: JSON.stringify(variantCreate.userErrors) });
    }
  }

  const refreshed = gql(
    `query Product($id: ID!) {
      product(id: $id) { id variants(first: 100) { nodes { id title selectedOptions { name value } } } }
    }`,
    { id: shopifyProduct.id },
  ).product;
  const variantInputs = refreshed.variants.nodes.map((variant) => {
    const month = variant.selectedOptions.find((option) => option.name === 'Birth Month')?.value || variant.title;
    return {
      id: variant.id,
      price: product.price,
      compareAtPrice: null,
      inventoryPolicy: 'CONTINUE',
      taxable: true,
      inventoryItem: { sku: `NP-${product.candidateId}-${product.sourceId}-${month.toUpperCase().replace(/[^A-Z0-9]+/g, '-')}` },
    };
  });
  if (variantInputs.length) {
    gql(
      `mutation VariantUpdate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
        productVariantsBulkUpdate(productId: $productId, variants: $variants) { userErrors { field message } }
      }`,
      { productId: shopifyProduct.id, variants: variantInputs },
      true,
    );
  }

  const media = gql(
    `mutation ProductCreateMedia($productId: ID!, $media: [CreateMediaInput!]!) {
      productCreateMedia(productId: $productId, media: $media) {
        media { alt mediaContentType status }
        mediaUserErrors { field message }
      }
    }`,
    {
      productId: shopifyProduct.id,
      media: product.images.map((url, index) => ({
        mediaContentType: 'IMAGE',
        originalSource: url,
        alt: `${product.title} product image ${index + 1}`,
      })),
    },
    true,
  ).productCreateMedia;
  const seriousMedia = media.mediaUserErrors.filter((error) => !String(error.message).toLowerCase().includes('already'));
  if (seriousMedia.length) {
    results.push({ ...product, productId: shopifyProduct.id, status: 'media-warning', detail: JSON.stringify(media.mediaUserErrors) });
  }

  const collectionTitles = [
    'Necklaces',
    'Birthstone Jewelry | Ready to Ship',
    'Jewelry Gifts for Women | Ready to Ship',
    "Mother's Collection",
    'Birthday Gifts for Her | Ready-to-Ship Jewelry',
    'Jewelry Gifts Under $50 | Ready to Order',
    'Jewelry Gifts Under $100 | Ready to Order',
    'New Arrivals',
    'Gifts',
  ];
  for (const title of collectionTitles) {
    const collection = collectionByTitle.get(title);
    if (!collection) {
      results.push({ ...product, productId: shopifyProduct.id, status: 'collection-missing', detail: title });
      continue;
    }
    gql(
      `mutation AddToCollection($id: ID!, $productIds: [ID!]!) {
        collectionAddProducts(id: $id, productIds: $productIds) { userErrors { field message } }
      }`,
      { id: collection.id, productIds: [shopifyProduct.id] },
      true,
    );
  }

  for (const publicationId of [onlineStorePublicationId, googlePublicationId]) {
    gql(
      `mutation PublishProduct($id: ID!, $input: [PublicationInput!]!) {
        publishablePublish(id: $id, input: $input) { userErrors { field message } }
      }`,
      { id: shopifyProduct.id, input: [{ publicationId }] },
      true,
    );
  }

  results.push({
    candidateId: product.candidateId,
    title: product.title,
    handle: product.handle,
    productId: shopifyProduct.id,
    sourceUrl: product.sourceUrl,
    status: existing ? 'updated-existing' : 'created-active-published',
  });
}

console.table(results.map((row) => ({
  candidate: row.candidateId,
  title: row.title,
  handle: row.handle,
  productId: row.productId,
  status: row.status,
  detail: row.detail || '',
})));
writeFileSync('reports/alibaba-batch4-shopify-create-2026-08-11.json', JSON.stringify(results, null, 2));
