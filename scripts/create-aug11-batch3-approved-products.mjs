import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-aug11-batch3-'));
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

function description(product) {
  return [
    `<p>${product.lede}</p>`,
    '<h3>Why it feels meaningful</h3>',
    '<ul>',
    ...product.highlights.map((item) => `<li>${item}</li>`),
    '</ul>',
    '<h3>Personalization details</h3>',
    `<p>${product.personalization}</p>`,
    '<h3>Good to know</h3>',
    '<p>Material, finish, and stone composition are unverified until North &amp; Pearl completes sample review and documentation checks. We describe this piece by its visible design, color accents, and personalization options instead of making unverified material claims.</p>',
    '<h3>Care</h3>',
    '<p>Store separately, keep dry when possible, and avoid perfumes, lotions, and harsh cleaners. Wipe gently with a soft cloth after wear.</p>',
  ].join('');
}

const product = {
  candidateId: 'B3-001',
  title: 'North & Pearl Family Birth Month Heart Necklace',
  handle: 'north-pearl-family-birth-month-heart-necklace',
  type: 'Necklace',
  price: '69.00',
  sourceId: '1601397950260',
  sourceUrl: 'https://www.alibaba.com/product-introduction/Custom-Family-Names-Heart-Pendant-Necklace_1601397950260.html',
  supplier: 'Supplier not fully confirmed from public page',
  supplierProfileUrl: 'https://www.alibaba.com/product-introduction/Custom-Family-Names-Heart-Pendant-Necklace_1601397950260.html',
  selectedVariant: 'Heart pendant necklace with multiple names and birth-month color accents',
  lede:
    'A personalized heart necklace designed for family names and birth-month inspired color accents, selected for meaningful gifts for mothers, grandmothers, and close family.',
  personalization:
    'Use the personalization field to enter each name and preferred birth-month color accent. Please enter the details exactly as you want them prepared.',
  highlights: [
    'Multi-name layout supports family, mother, and grandmother gifting.',
    'Birth-month inspired color accents add a personal detail without relying on verified gemstone claims.',
    'Heart silhouette gives the piece clear sentimental gift appeal.',
    'Fills a confirmed North & Pearl catalog gap: family and multi-name jewelry.',
  ],
  collections: [
    'Necklaces',
    'Personalized Jewelry',
    'Jewelry Gifts for Women | Ready to Ship',
    "Mother's Collection",
    'Birthday Gifts for Her | Ready-to-Ship Jewelry',
    'Jewelry Gifts Under $100 | Ready to Order',
    'New Arrivals',
    'Gifts',
  ],
  tags: [
    'aug11-batch3',
    'alibaba-source-1601397950260',
    'family-jewelry',
    'multi-name',
    'birth-month',
    'mother-gift',
    'personalized',
    'necklace',
    'source-mapped',
  ],
  images: [
    'https://sc04.alicdn.com/kf/He0b13571d1fa414f9f743b6a0db6a6a9M.jpg',
    'https://sc04.alicdn.com/kf/Ha0c94262d5ad44b692064ed6ec5c9823v.jpg',
    'https://sc04.alicdn.com/kf/H1a8faea570584943942feccdd2d55d77f.jpg',
  ],
};

const setup = gql(`query Batch3Setup {
  collections(first: 100) { nodes { id title handle } }
}`);
const collectionByTitle = new Map(setup.collections.nodes.map((collection) => [collection.title, collection]));
const results = [];

const existing = gql(
  `query ExistingProduct($query: String!) {
    products(first: 1, query: $query) {
      nodes { id title handle status variants(first: 1) { nodes { id } } }
    }
  }`,
  { query: `handle:${product.handle}` },
).products.nodes[0];

let shopifyProduct = existing;
if (!shopifyProduct) {
  const create = gql(
    `mutation ProductCreate($product: ProductCreateInput!) {
      productCreate(product: $product) {
        product { id title handle status variants(first: 1) { nodes { id } } }
        userErrors { field message }
      }
    }`,
    {
      product: {
        title: product.title,
        handle: product.handle,
        vendor: 'North & Pearl',
        productType: product.type,
        templateSuffix: 'personalized',
        descriptionHtml: description(product),
        status: 'ACTIVE',
        tags: product.tags,
        seo: {
          title: 'Family Birth Month Heart Necklace | North & Pearl',
          description: product.lede.slice(0, 320),
        },
        metafields: [
          { namespace: 'custom', key: 'supplier_product_url', type: 'url', value: product.sourceUrl },
          { namespace: 'custom', key: 'supplier_name', type: 'single_line_text_field', value: product.supplier },
          { namespace: 'custom', key: 'supplier_listing_id', type: 'single_line_text_field', value: product.sourceId },
          { namespace: 'custom', key: 'supplier_profile_url', type: 'url', value: product.supplierProfileUrl },
          { namespace: 'custom', key: 'supplier_selected_variant', type: 'single_line_text_field', value: product.selectedVariant },
          { namespace: 'custom', key: 'source_verification_status', type: 'single_line_text_field', value: 'Aug 11 Batch 3: visual/IP clean; material claims unverified; claim-safe public copy required' },
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
  const variantId = shopifyProduct.variants?.nodes?.[0]?.id;
  if (variantId) {
    const variantUpdate = gql(
      `mutation VariantUpdate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
        productVariantsBulkUpdate(productId: $productId, variants: $variants) {
          userErrors { field message }
        }
      }`,
      {
        productId: shopifyProduct.id,
        variants: [
          {
            id: variantId,
            price: product.price,
            compareAtPrice: null,
            inventoryPolicy: 'CONTINUE',
            taxable: true,
            inventoryItem: { sku: `NP-${product.candidateId}-${product.sourceId}` },
          },
        ],
      },
      true,
    ).productVariantsBulkUpdate;
    if (variantUpdate.userErrors.length) {
      results.push({ ...product, productId: shopifyProduct.id, status: 'variant-error', detail: JSON.stringify(variantUpdate.userErrors) });
    }
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

  for (const title of product.collections) {
    const collection = collectionByTitle.get(title);
    if (!collection) {
      results.push({ ...product, productId: shopifyProduct.id, status: 'collection-missing', detail: title });
      continue;
    }
    const add = gql(
      `mutation AddToCollection($id: ID!, $productIds: [ID!]!) {
        collectionAddProducts(id: $id, productIds: $productIds) { userErrors { field message } }
      }`,
      { id: collection.id, productIds: [shopifyProduct.id] },
      true,
    ).collectionAddProducts;
    const serious = add.userErrors.filter((error) => !String(error.message).toLowerCase().includes('already'));
    if (serious.length) {
      results.push({ ...product, productId: shopifyProduct.id, status: 'collection-error', detail: JSON.stringify(add.userErrors) });
    }
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
writeFileSync('reports/alibaba-batch3-shopify-create-2026-08-11.json', JSON.stringify(results, null, 2));
