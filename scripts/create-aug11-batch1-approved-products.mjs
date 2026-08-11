import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-aug11-batch1-'));
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
    '<h3>Why it belongs in your jewelry box</h3>',
    '<ul>',
    ...product.highlights.map((item) => `<li>${item}</li>`),
    '</ul>',
    '<h3>Personalization details</h3>',
    `<p>${product.personalization}</p>`,
    '<h3>Good to know</h3>',
    '<p>Material and stone composition are supplier claims until North &amp; Pearl completes sample review and documentation checks. We describe this piece by its visible design, color, and personalization options instead of making unverified material claims.</p>',
    '<h3>Care</h3>',
    '<p>Store separately, keep dry when possible, and avoid perfumes, lotions, and harsh cleaners. Wipe gently with a soft cloth after wear.</p>',
  ].join('');
}

const products = [
  {
    candidateId: 'B1-001',
    title: 'North & Pearl Double Heart Birth Month Ring',
    handle: 'north-pearl-double-heart-birth-month-ring',
    type: 'Ring',
    price: '59.00',
    sourceId: '1601447882726',
    sourceUrl: 'https://www.alibaba.com/product-detail/Fine-925-Silver-Ring-CZ-Double_1601447882726.html',
    supplier: 'Shenzhen Lan Shang Jewelry Co.,ltd.',
    supplierProfileUrl: 'https://szlanshang.en.alibaba.com/company_profile.html',
    selectedVariant: 'Adjustable ring with heart-shaped birth-month color accent',
    lede:
      'A delicate double-heart ring designed around a birth-month inspired color accent, chosen for meaningful birthdays, family gifts, and everyday keepsake styling.',
    personalization:
      'Use the personalization field to enter the preferred birth month or color accent. This adjustable style does not require a standard ring-size selection before checkout.',
    highlights: [
      'Adjustable ring silhouette for easier gifting.',
      'Heart-shaped color accent creates a personal, birth-month inspired feel.',
      'A thoughtful option for birthdays, sisters, daughters, mothers, and self-gifting.',
      'Clean enough for everyday wear while still feeling sentimental.',
    ],
    collections: [
      'Rings',
      'Birthstone Jewelry | Ready to Ship',
      'Jewelry Gifts for Women | Ready to Ship',
      'Birthday Gifts for Her | Ready-to-Ship Jewelry',
      'Jewelry Gifts Under $100 | Ready to Order',
      'New Arrivals',
    ],
    tags: [
      'aug11-batch1',
      'alibaba-source-1601447882726',
      'birth-month',
      'birthstone-style',
      'gift-for-her',
      'ring',
      'personalized',
      'source-mapped',
    ],
    images: [
      'https://s.alicdn.com/@sc04/kf/H67f4b243d61f445fb1774d17eee588d8L.jpg',
      'https://s.alicdn.com/@sc04/kf/Hab270746c1a34aa381b30a04e8055fe4S.jpg',
      'https://s.alicdn.com/@sc04/kf/H4e88c177d40f4d9fa2e5d34d408bd3d24.jpg',
      'https://s.alicdn.com/@sc04/kf/H7be7435816cc45e4a32b9434788c29c25.jpg',
      'https://s.alicdn.com/@sc04/kf/Hbda0fc19f4004c1b85ad423db63fafb8S.jpg',
      'https://s.alicdn.com/@sc04/kf/Hfca05131dcf84195ae6868ce0d360758z.jpg',
    ],
  },
  {
    candidateId: 'B1-002',
    title: 'North & Pearl Personalized Birth Month Name Ring',
    handle: 'north-pearl-personalized-birth-month-name-ring',
    type: 'Ring',
    price: '64.00',
    sourceId: '1601911389893',
    sourceUrl: 'https://www.alibaba.com/product-detail/Custom-Name-Birthstone-Ring-Personalized-Engraved_1601911389893.html',
    supplier: 'Yiwu Qingyuan Jewelry Co., Ltd.',
    supplierProfileUrl: 'https://viviantra.en.alibaba.com/company_profile.html',
    selectedVariant: 'Gold-tone name ring with birth-month color accent and available sizing',
    lede:
      'A personalized name ring with a birth-month inspired color accent, selected for shoppers who want a small custom detail with everyday gift appeal.',
    personalization:
      'Use the personalization field to enter the name or word, preferred ring size, and preferred birth month or color accent exactly as you want them prepared.',
    highlights: [
      'Custom name or short word detail for a personal gift moment.',
      'Birth-month inspired color accent supports birthday and milestone gifting.',
      'A strong choice for mothers, daughters, sisters, best friends, and self-gifting.',
      'Designed to feel personal without relying on heavy or oversized styling.',
    ],
    collections: [
      'Rings',
      'Birthstone Jewelry | Ready to Ship',
      'Jewelry for Her | Shop Beautiful Ready-to-Order Pieces',
      'Jewelry Gifts for Women | Ready to Ship',
      'Birthday Gifts for Her | Ready-to-Ship Jewelry',
      'Jewelry Gifts Under $100 | Ready to Order',
      'New Arrivals',
    ],
    tags: [
      'aug11-batch1',
      'alibaba-source-1601911389893',
      'birth-month',
      'birthstone-style',
      'gift-for-her',
      'name-ring',
      'personalized',
      'source-mapped',
    ],
    images: [
      'https://s.alicdn.com/@sc04/kf/Hefe6e00061714282bc8a80c7430fe763m.jpg',
      'https://s.alicdn.com/@sc04/kf/Hfd68a988ee904b95aea2a3d2a8df4d5by.jpg',
      'https://s.alicdn.com/@sc04/kf/H29e82cf2cb47448a9a5a6109181cfd4eH.jpg',
      'https://s.alicdn.com/@sc04/kf/H4842ecae5b31490199a2e214faf761e69.jpg',
      'https://s.alicdn.com/@sc04/kf/H8f5e41dc73fb4deb8a1cd30d430bc769x.jpg',
      'https://s.alicdn.com/@sc04/kf/Hed65a5d715104e61b4efb2539dbd96d0O.png',
    ],
  },
];

const data = gql(`query Batch1Setup {
  collections(first: 100) { nodes { id title handle } }
}`);
const collectionByTitle = new Map(data.collections.nodes.map((collection) => [collection.title, collection]));
const results = [];

for (const product of products) {
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
            title: `${product.title.replace(/^North & Pearl\s+/, '')} | North & Pearl`,
            description: product.lede.slice(0, 320),
          },
          metafields: [
            { namespace: 'custom', key: 'supplier_product_url', type: 'url', value: product.sourceUrl },
            { namespace: 'custom', key: 'supplier_name', type: 'single_line_text_field', value: product.supplier },
            { namespace: 'custom', key: 'supplier_listing_id', type: 'single_line_text_field', value: product.sourceId },
            { namespace: 'custom', key: 'supplier_profile_url', type: 'url', value: product.supplierProfileUrl },
            { namespace: 'custom', key: 'supplier_selected_variant', type: 'single_line_text_field', value: product.selectedVariant },
            { namespace: 'custom', key: 'source_verification_status', type: 'single_line_text_field', value: 'Aug 11 Batch 1: visual/IP clean; material claims unverified; claim-safe public copy required' },
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
  const alreadyAttachedErrors = media.mediaUserErrors.filter((error) => !String(error.message).toLowerCase().includes('already'));
  if (alreadyAttachedErrors.length) {
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
writeFileSync('reports/alibaba-batch1-shopify-create-2026-08-11.json', JSON.stringify(results, null, 2));
