import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-aug11-batch2-'));
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
    '<h3>Why we selected it</h3>',
    '<ul>',
    ...product.highlights.map((item) => `<li>${item}</li>`),
    '</ul>',
    '<h3>Choose your sign</h3>',
    '<p>Select the zodiac sign from the options before adding to cart.</p>',
    '<h3>Good to know</h3>',
    '<p>Material and finish details are supplier claims until North &amp; Pearl completes sample review and documentation checks. We describe this piece by its visible design, color, and gifting use instead of making unverified material claims.</p>',
    '<h3>Care</h3>',
    '<p>Store separately, keep dry when possible, and avoid perfumes, lotions, and harsh cleaners. Wipe gently with a soft cloth after wear.</p>',
  ].join('');
}

const products = [
  {
    candidateId: 'B2-002',
    title: 'North & Pearl Zodiac Wish Card Necklace',
    handle: 'north-pearl-zodiac-wish-card-necklace',
    type: 'Necklace',
    price: '39.00',
    sourceId: '1601679678930',
    sourceUrl: 'https://www.alibaba.com/product-detail/Wholesale-12-Zodiac-Necklace-with-Wish_1601679678930.html',
    supplier: 'Yiwu Deshang Jewelry Co., Ltd.',
    supplierProfileUrl: 'https://deshangjewelry.en.alibaba.com/company_profile.html',
    selectedVariant: 'Round zodiac pendant necklace with sign card presentation',
    lede:
      'A delicate zodiac pendant necklace chosen for birthday gifting, friendship gifts, and shoppers who want a small meaningful symbol tied to their sign.',
    highlights: [
      'Zodiac sign options make the piece personal without custom production.',
      'Card-style presentation supports gifting and easy product storytelling.',
      'A strong entry-price gift for birthdays, sisters, friends, and self-gifting.',
      'Fills a confirmed North & Pearl catalog gap: zodiac jewelry.',
    ],
    collections: [
      'Necklaces',
      'Jewelry Gifts for Women | Ready to Ship',
      'Birthday Gifts for Her | Ready-to-Ship Jewelry',
      'Jewelry Gifts Under $50 | Ready to Order',
      'Jewelry Gifts Under $100 | Ready to Order',
      'New Arrivals',
      'Gifts',
    ],
    tags: [
      'aug11-batch2',
      'alibaba-source-1601679678930',
      'zodiac',
      'gift-for-her',
      'birthday-gift',
      'necklace',
      'ready-to-order',
      'source-mapped',
    ],
    images: [
      'https://s.alicdn.com/@sc04/kf/H046bed918a0e4624bf408a967e14484cV.jpg',
      'https://s.alicdn.com/@sc04/kf/H5d5c862ab16644329680dad21280e4384.jpg',
      'https://s.alicdn.com/@sc04/kf/H40d4e01d84d74c10b7c8bbbe61429f88f.jpg',
      'https://s.alicdn.com/@sc04/kf/H4fd7556192434149b98182c12943207dO.jpg',
      'https://s.alicdn.com/@sc04/kf/Hbd4fe5fd3b8c420f87d3efe9a1f7cfacL.jpg',
    ],
    signs: [
      'Aries',
      'Taurus',
      'Gemini',
      'Cancer',
      'Leo',
      'Virgo',
      'Libra',
      'Scorpio',
      'Sagittarius',
      'Capricorn',
      'Aquarius',
      'Pisces',
    ],
  },
];

const data = gql(`query Batch2Setup {
  collections(first: 100) { nodes { id title handle } }
}`);
const collectionByTitle = new Map(data.collections.nodes.map((collection) => [collection.title, collection]));
const results = [];

for (const product of products) {
  const existing = gql(
    `query ExistingProduct($query: String!) {
      products(first: 1, query: $query) {
        nodes { id title handle status variants(first: 100) { nodes { id title selectedOptions { name value } } } }
      }
    }`,
    { query: `handle:${product.handle}` },
  ).products.nodes[0];

  let shopifyProduct = existing;
  if (!shopifyProduct) {
    const create = gql(
      `mutation ProductCreate($product: ProductCreateInput!) {
        productCreate(product: $product) {
          product { id title handle status variants(first: 100) { nodes { id title selectedOptions { name value } } } }
          userErrors { field message }
        }
      }`,
      {
        product: {
          title: product.title,
          handle: product.handle,
          vendor: 'North & Pearl',
          productType: product.type,
          templateSuffix: null,
          descriptionHtml: description(product),
          status: 'ACTIVE',
          tags: product.tags,
          productOptions: [{ name: 'Zodiac Sign', values: product.signs.map((name) => ({ name })) }],
          seo: {
            title: 'Zodiac Wish Card Necklace | North & Pearl',
            description: product.lede.slice(0, 320),
          },
          metafields: [
            { namespace: 'custom', key: 'supplier_product_url', type: 'url', value: product.sourceUrl },
            { namespace: 'custom', key: 'supplier_name', type: 'single_line_text_field', value: product.supplier },
            { namespace: 'custom', key: 'supplier_listing_id', type: 'single_line_text_field', value: product.sourceId },
            { namespace: 'custom', key: 'supplier_profile_url', type: 'url', value: product.supplierProfileUrl },
            { namespace: 'custom', key: 'supplier_selected_variant', type: 'single_line_text_field', value: product.selectedVariant },
            { namespace: 'custom', key: 'source_verification_status', type: 'single_line_text_field', value: 'Aug 11 Batch 2: visual/IP clean; material claims unverified; claim-safe public copy required' },
          ],
        },
      },
      true,
    ).productCreate;

    if (create.userErrors.length) {
      results.push({ ...product, status: 'create-error', detail: JSON.stringify(create.userErrors) });
      continue;
    }
    shopifyProduct = create.product;
  }

  const variants = shopifyProduct.variants?.nodes || [];
  const variantInputs = variants.map((variant) => {
    const sign = variant.selectedOptions?.find((option) => option.name === 'Zodiac Sign')?.value || variant.title;
    return {
      id: variant.id,
      price: product.price,
      compareAtPrice: null,
      inventoryPolicy: 'CONTINUE',
      taxable: true,
      inventoryItem: { sku: `NP-${product.candidateId}-${product.sourceId}-${sign.toUpperCase().replace(/[^A-Z0-9]+/g, '-')}` },
    };
  });

  if (variantInputs.length) {
    const variantUpdate = gql(
      `mutation VariantUpdate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
        productVariantsBulkUpdate(productId: $productId, variants: $variants) {
          userErrors { field message }
        }
      }`,
      { productId: shopifyProduct.id, variants: variantInputs },
      true,
    ).productVariantsBulkUpdate;
    if (variantUpdate.userErrors.length) {
      results.push({ ...product, productId: shopifyProduct.id, status: 'variant-error', detail: JSON.stringify(variantUpdate.userErrors) });
      continue;
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
writeFileSync('reports/alibaba-batch2-shopify-create-2026-08-11.json', JSON.stringify(results, null, 2));
