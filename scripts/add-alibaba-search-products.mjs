import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const onlineStorePublicationId = 'gid://shopify/Publication/331104157880';
const tempDir = mkdtempSync(join(tmpdir(), 'np-alibaba-search-products-'));

const searchUrl =
  'https://www.alibaba.com/search/api/proTextSearch?query=jewelry%20for%20women&searchQuery=women%27s%20jewelry&multiSearchQuery=women%27s%20jewelry&keywordsTranslate=jewelry%20for%20women&pageSize=40&page=1&coreProduct=women%27s%20jewelry&langident=en&bizSceneCode=proSearch';

const selectedProducts = [
  {
    sourceId: '1601234622131',
    title: 'North & Pearl Flower Nail Bangle',
    handle: 'north-pearl-flower-nail-bangle',
    type: 'Bracelet',
    price: '59.00',
    compareAtPrice: '79.00',
    collections: ['Bracelets', 'Gifts', 'Best Sellers'],
    tags: ['bangle', 'flower-bracelet', 'gift-for-her', 'new-arrival'],
    short: 'A polished floral nail-inspired bangle with a sculptural, gift-ready look.',
    story: 'This completes the floral bracelet slot in the launch assortment with an elegant shape that feels more distinctive than a plain chain bracelet.',
    gift: 'Best for birthdays, Mother’s Day, sisters, friends, and polished everyday gifting.',
    score: 88,
    risk: 'Medium preliminary risk: exact material and finish claims must stay unverified until sample documentation is reviewed.',
  },
  {
    sourceId: '1601599046429',
    title: 'North & Pearl Hollow Flower Bangle Set',
    handle: 'north-pearl-hollow-flower-bangle-set',
    type: 'Bracelet',
    price: '69.00',
    compareAtPrice: '89.00',
    collections: ['Bracelets', 'Gifts', "Mother's Collection"],
    tags: ['bangle-set', 'flower-bracelet', 'gift-for-her', 'mother-gift'],
    short: 'A stackable floral bangle set for a soft, feminine layered bracelet look.',
    story: 'A set format increases perceived value and gives gift buyers a more complete present without needing personalization details.',
    gift: 'Best for mothers, birthdays, spring gifting, sisters, and bracelet layering.',
    score: 86,
    risk: 'Medium preliminary risk: supplier claims around finish durability are unverified.',
  },
  {
    sourceId: '1601403752183',
    title: 'North & Pearl Crystal Pulse Bracelet',
    handle: 'north-pearl-crystal-pulse-bracelet',
    type: 'Bracelet',
    price: '54.00',
    compareAtPrice: '72.00',
    collections: ['Bracelets', 'Gifts'],
    tags: ['crystal-style', 'bracelet', 'gift-for-her'],
    short: 'A refined crystal-accent bracelet for everyday sparkle and easy gifting.',
    story: 'The bracelet has strong visual appeal, low MOQ, and broad giftability while staying within an accessible retail price point.',
    gift: 'Best for birthdays, bridesmaids, friends, sisters, and self-gifting.',
    score: 85,
    risk: 'Medium preliminary risk: stone composition and finish should be sample-checked.',
  },
  {
    sourceId: '1601120166205',
    title: 'North & Pearl Mixed Charm Bangle',
    handle: 'north-pearl-mixed-charm-bangle',
    type: 'Bracelet',
    price: '59.00',
    compareAtPrice: '79.00',
    collections: ['Bracelets', 'Gifts', 'Couple Jewelry'],
    tags: ['charm-bracelet', 'bangle', 'gift-for-her'],
    short: 'A polished charm bangle with a sentimental, collectible feel.',
    story: 'Charm details support the emotional gifting angle while still remaining simple enough for a broad audience.',
    gift: 'Best for anniversaries, birthdays, friendship gifts, and meaningful everyday style.',
    score: 84,
    risk: 'Medium preliminary risk: charm dimensions and clasp/fit need sample verification.',
  },
  {
    sourceId: '1601426024495',
    title: 'North & Pearl Pink Heart Bow Bracelet',
    handle: 'north-pearl-pink-heart-bow-bracelet',
    type: 'Bracelet',
    price: '49.00',
    compareAtPrice: '65.00',
    collections: ['Bracelets', 'Gifts', "Mother's Collection"],
    tags: ['heart-bracelet', 'bow-bracelet', 'gift-for-her'],
    short: 'A sweet heart-and-bow bracelet with soft feminine gift appeal.',
    story: 'This gives the bracelet assortment a romantic, younger-leaning gift option while still fitting the meaningful jewelry promise.',
    gift: 'Best for daughters, friends, birthdays, Valentine gifting, and thoughtful small gifts.',
    score: 82,
    risk: 'Medium preliminary risk: color consistency and stone setting should be sample-tested.',
  },
  {
    sourceId: '1601057945936',
    title: 'North & Pearl Double Heart Pendant',
    handle: 'north-pearl-double-heart-pendant',
    type: 'Necklace',
    price: '64.00',
    compareAtPrice: '84.00',
    collections: ['Necklaces', 'Gifts', 'Couple Jewelry', "Mother's Collection"],
    tags: ['heart-necklace', 'couple-gift', 'mother-gift', 'gift-for-her'],
    short: 'A sentimental double-heart pendant necklace for love, family, and friendship gifting.',
    story: 'Heart motifs are clear, emotional, and high-converting for gift buyers, especially around anniversaries and Mother’s Day.',
    gift: 'Best for partners, mothers, daughters, friendship gifts, anniversaries, and birthdays.',
    score: 87,
    risk: 'Low-to-medium preliminary risk: strong supplier rating, but material claims remain unverified.',
  },
  {
    sourceId: '1601217453230',
    title: 'North & Pearl Sculpted Hoop Earrings',
    handle: 'north-pearl-sculpted-hoop-earrings',
    type: 'Earrings',
    price: '39.00',
    compareAtPrice: '55.00',
    collections: ['Earrings', 'Gifts'],
    tags: ['hoop-earrings', 'gift-for-her', 'everyday-jewelry'],
    short: 'A polished hoop earring style for everyday wear and easy gifting.',
    story: 'Hoops are a category staple and help North & Pearl balance personalized products with simple self-purchase items.',
    gift: 'Best for birthdays, bridesmaids, friends, sisters, and everyday jewelry lovers.',
    score: 83,
    risk: 'Medium preliminary risk: earring weight, closure, and comfort need sample review.',
  },
  {
    sourceId: '1601469797456',
    title: 'North & Pearl Dainty Flower Necklace',
    handle: 'north-pearl-dainty-flower-necklace',
    type: 'Necklace',
    price: '54.00',
    compareAtPrice: '72.00',
    collections: ['Necklaces', 'Gifts', "Mother's Collection"],
    tags: ['flower-necklace', 'gift-for-her', 'mother-gift'],
    short: 'A delicate flower necklace for soft, feminine everyday gifting.',
    story: 'The floral motif supports birthday, Mother’s Day, and sentimental gift guides without requiring custom production.',
    gift: 'Best for mothers, daughters, birthdays, sisters, and spring occasions.',
    score: 84,
    risk: 'Medium preliminary risk: pendant size and finish should be confirmed by sample.',
  },
  {
    sourceId: '1601536342028',
    title: 'North & Pearl Clover Charm Bracelet',
    handle: 'north-pearl-clover-charm-bracelet',
    type: 'Bracelet',
    price: '49.00',
    compareAtPrice: '65.00',
    collections: ['Bracelets', 'Gifts'],
    tags: ['clover-bracelet', 'charm-bracelet', 'gift-for-her'],
    short: 'A lucky clover-inspired charm bracelet with simple, meaningful gift appeal.',
    story: 'Clover shapes are easy to merchandise around encouragement, luck, friendship, and milestone gifting.',
    gift: 'Best for friends, graduates, birthdays, sisters, and good-luck gifts.',
    score: 81,
    risk: 'Medium preliminary risk: finish and charm details require sample verification.',
  },
  {
    sourceId: '1601427206777',
    title: 'North & Pearl Twine Band Ring',
    handle: 'north-pearl-twine-band-ring',
    type: 'Ring',
    price: '44.00',
    compareAtPrice: '58.00',
    collections: ['Rings', 'Gifts'],
    tags: ['ring', 'minimal-ring', 'gift-for-her'],
    short: 'A textured twine-inspired band ring for subtle everyday styling.',
    story: 'This adds visual variety to rings without relying on stone claims, making it a lower-risk category expansion.',
    gift: 'Best for self-gifting, birthdays, friends, sisters, and everyday minimal jewelry.',
    score: 82,
    risk: 'Medium preliminary risk: sizing and finish durability need sample testing.',
  },
  {
    sourceId: '1601310111350',
    title: 'North & Pearl Gold Bead Stretch Bracelet',
    handle: 'north-pearl-gold-bead-stretch-bracelet',
    type: 'Bracelet',
    price: '44.00',
    compareAtPrice: '58.00',
    collections: ['Bracelets', 'Gifts'],
    tags: ['bead-bracelet', 'stackable', 'gift-for-her'],
    short: 'A stackable bead bracelet for a polished, effortless bracelet look.',
    story: 'Stretch bracelets are simple to size and easy to bundle, making this useful for entry-price gifting and add-ons.',
    gift: 'Best for friends, bridesmaids, birthdays, sisters, and bracelet stacks.',
    score: 80,
    risk: 'Medium preliminary risk: stretch durability and bead finish should be sample-tested.',
  },
  {
    sourceId: '1601647883963',
    title: 'North & Pearl Chunky Pearl Bracelet',
    handle: 'north-pearl-chunky-pearl-bracelet',
    type: 'Bracelet',
    price: '49.00',
    compareAtPrice: '65.00',
    collections: ['Bracelets', 'Gifts', 'Wedding & Bridesmaids'],
    tags: ['pearl-style', 'bracelet', 'bridesmaid-gift'],
    short: 'A pearl-style stretch bracelet with a soft statement look.',
    story: 'Pearl-inspired styling fits the brand name and gives bridesmaid or wedding shoppers a simple accessory option.',
    gift: 'Best for bridesmaids, birthdays, bridal showers, sisters, and classic feminine style.',
    score: 81,
    risk: 'Medium preliminary risk: pearl material/type and stretch quality need verification.',
  },
  {
    sourceId: '1600828902618',
    title: 'North & Pearl V Water Drop Jewelry Set',
    handle: 'north-pearl-v-water-drop-jewelry-set',
    type: 'Gift Set',
    price: '89.00',
    compareAtPrice: '115.00',
    collections: ['Gifts', 'Wedding & Bridesmaids', 'Necklaces', 'Earrings'],
    tags: ['jewelry-set', 'water-drop', 'wedding-gift', 'gift-for-her'],
    short: 'A coordinated water-drop necklace and earring set for occasion-ready gifting.',
    story: 'Gift sets increase perceived value and help shoppers buy a complete look for weddings, anniversaries, and formal events.',
    gift: 'Best for bridesmaids, wedding guests, anniversaries, birthdays, and event styling.',
    score: 80,
    risk: 'Medium preliminary risk: set components, stone details, and packaging fit require sample review.',
  },
  {
    sourceId: '1601110650353',
    title: 'North & Pearl Snake Chain Jewelry Set',
    handle: 'north-pearl-snake-chain-jewelry-set',
    type: 'Gift Set',
    price: '69.00',
    compareAtPrice: '89.00',
    collections: ['Gifts', 'Necklaces', 'Bracelets'],
    tags: ['jewelry-set', 'snake-chain', 'gift-for-her'],
    short: 'A minimal snake-chain necklace and bracelet set for refined everyday gifting.',
    story: 'This gives shoppers a clean matching set with broad appeal and strong bundling potential.',
    gift: 'Best for birthdays, sisters, friends, self-gifting, and simple polished style.',
    score: 82,
    risk: 'Medium preliminary risk: chain weight, clasp quality, and finish should be sample-checked.',
  },
  {
    sourceId: '11000017124129',
    title: 'North & Pearl Clover Shell Jewelry Set',
    handle: 'north-pearl-clover-shell-jewelry-set',
    type: 'Gift Set',
    price: '79.00',
    compareAtPrice: '99.00',
    collections: ['Gifts', 'Wedding & Bridesmaids', 'Necklaces', 'Earrings'],
    tags: ['clover-jewelry', 'jewelry-set', 'gift-for-her'],
    short: 'A clover-inspired jewelry set with a polished, gift-ready look.',
    story: 'The clover motif adds meaning and visual consistency across necklace, earring, and bracelet-style merchandising.',
    gift: 'Best for birthdays, bridesmaids, good-luck gifts, sisters, and friendship gifts.',
    score: 79,
    risk: 'Medium preliminary risk: set components and shell-style details require sample verification.',
  },
];

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

function stripImageSize(url) {
  return url.replace(/_\d+x\d+\.(jpg|jpeg|png|webp)$/i, '');
}

function cleanTitle(title) {
  return title.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
}

function imageInfo(url, index) {
  const file = join(tempDir, `candidate-${index}`);
  execFileSync('curl', ['-L', '-s', '-o', file, url]);
  const output = execFileSync('file', [file], { encoding: 'utf8' });
  const matches = [...output.matchAll(/(\d+)\s*x\s*(\d+)/g)];
  const match = matches.at(-1);
  return {
    url,
    ok: Boolean(match),
    width: match ? Number(match[1]) : 0,
    height: match ? Number(match[2]) : 0,
  };
}

function description(product, offer) {
  return [
    `<p>${product.short}</p>`,
    `<h3>Why it belongs in the North &amp; Pearl collection</h3>`,
    `<p>${product.story}</p>`,
    `<h3>Gift positioning</h3>`,
    `<p>${product.gift}</p>`,
    `<h3>Supplier details to verify before scaling</h3>`,
    `<ul>`,
    `<li>Alibaba listing: ${cleanTitle(offer.title)}</li>`,
    `<li>Visible Alibaba price range: ${offer.price || 'Unknown'}</li>`,
    `<li>Visible Alibaba MOQ: ${offer.moq || 'Unknown'}</li>`,
    `<li>Supplier shown on Alibaba: ${offer.companyName || 'Unknown'}</li>`,
    `<li>${product.risk}</li>`,
    `</ul>`,
    `<h3>Care note</h3>`,
    `<p>Final care instructions depend on supplier-confirmed materials and plating. Until confirmed, store separately, avoid harsh cleaners, and keep dry between wears.</p>`,
  ].join('');
}

const apiResponse = JSON.parse(execFileSync('curl', ['-Ls', searchUrl], { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 }));
const offers = apiResponse.model.offers || [];
const offerById = new Map(offers.map((offer) => [offer.productId, offer]));

const existingProducts = gql(`query ExistingProducts {
  products(first: 250) {
    nodes { id title handle status media(first: 20) { nodes { id mediaContentType } } variants(first: 1) { nodes { id } } }
  }
}`).products.nodes;
const existingCollections = gql(`query ExistingCollections {
  collections(first: 100) { nodes { id title handle } }
}`).collections.nodes;

const productByHandle = new Map(existingProducts.map((product) => [product.handle, product]));
const collectionByTitle = new Map(existingCollections.map((collection) => [collection.title, collection]));
const analysis = [];

for (const product of selectedProducts) {
  const offer = offerById.get(product.sourceId);
  if (!offer) {
    console.log(`skipped missing Alibaba offer: ${product.title}`);
    continue;
  }

  const candidateImages = (offer.multiImage || []).slice(0, 6).map(stripImageSize);
  const checkedImages = candidateImages.map(imageInfo);
  const usableImages = checkedImages.filter((image) => image.ok && image.width >= 700 && image.height >= 700);
  if (usableImages.length === 0) {
    console.log(`skipped no usable images: ${product.title}`);
    continue;
  }

  let shopifyProduct = productByHandle.get(product.handle);
  if (!shopifyProduct) {
    const created = gql(
      `mutation ProductCreate($product: ProductCreateInput!) {
        productCreate(product: $product) {
          product { id title handle status variants(first: 1) { nodes { id } } media(first: 20) { nodes { id mediaContentType } } }
          userErrors { field message }
        }
      }`,
      {
        product: {
          title: product.title,
          handle: product.handle,
          descriptionHtml: description(product, offer),
          vendor: 'North & Pearl',
          productType: product.type,
          tags: product.tags,
          status: 'ACTIVE',
          seo: {
            title: `${product.title} | Jewelry Gifts | North & Pearl`,
            description: product.short,
          },
        },
      },
      true,
    ).productCreate;
    if (created.userErrors.length) throw new Error(`${product.title}: ${JSON.stringify(created.userErrors)}`);
    shopifyProduct = created.product;
    console.log(`created product: ${product.title}`);
  } else {
    const updated = gql(
      `mutation ProductUpdate($input: ProductInput!) {
        productUpdate(input: $input) {
          product { id title handle status variants(first: 1) { nodes { id } } media(first: 20) { nodes { id mediaContentType } } }
          userErrors { field message }
        }
      }`,
      {
        input: {
          id: shopifyProduct.id,
          title: product.title,
          handle: product.handle,
          descriptionHtml: description(product, offer),
          vendor: 'North & Pearl',
          productType: product.type,
          tags: product.tags,
          status: 'ACTIVE',
          seo: {
            title: `${product.title} | Jewelry Gifts | North & Pearl`,
            description: product.short,
          },
        },
      },
      true,
    ).productUpdate;
    if (updated.userErrors.length) throw new Error(`${product.title}: ${JSON.stringify(updated.userErrors)}`);
    shopifyProduct = { ...shopifyProduct, ...updated.product };
    console.log(`updated product: ${product.title}`);
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
        variants: [{ id: variantId, price: product.price, compareAtPrice: product.compareAtPrice }],
      },
      true,
    ).productVariantsBulkUpdate;
    if (variantUpdate.userErrors.length) console.log(`variant warning ${product.title}: ${JSON.stringify(variantUpdate.userErrors)}`);
  }

  const existingImageIds = (shopifyProduct.media?.nodes || [])
    .filter((media) => media.mediaContentType === 'IMAGE')
    .map((media) => media.id);
  if (existingImageIds.length) {
    const deleted = gql(
      `mutation DeleteMedia($productId: ID!, $mediaIds: [ID!]!) {
        productDeleteMedia(productId: $productId, mediaIds: $mediaIds) {
          mediaUserErrors { field message }
        }
      }`,
      { productId: shopifyProduct.id, mediaIds: existingImageIds },
      true,
    ).productDeleteMedia;
    if (deleted.mediaUserErrors.length) console.log(`media delete warning ${product.title}: ${JSON.stringify(deleted.mediaUserErrors)}`);
  }

  const mediaCreate = gql(
    `mutation ProductCreateMedia($productId: ID!, $media: [CreateMediaInput!]!) {
      productCreateMedia(productId: $productId, media: $media) {
        media { alt mediaContentType status }
        mediaUserErrors { field message }
      }
    }`,
    {
      productId: shopifyProduct.id,
      media: usableImages.map((image, index) => ({
        mediaContentType: 'IMAGE',
        originalSource: image.url,
        alt: `${product.title} product image ${index + 1}`,
      })),
    },
    true,
  ).productCreateMedia;
  if (mediaCreate.mediaUserErrors.length) console.log(`media create warning ${product.title}: ${JSON.stringify(mediaCreate.mediaUserErrors)}`);

  for (const collectionTitle of product.collections) {
    const collection = collectionByTitle.get(collectionTitle);
    if (!collection) {
      console.log(`missing collection ${collectionTitle}`);
      continue;
    }
    const add = gql(
      `mutation AddToCollection($id: ID!, $productIds: [ID!]!) {
        collectionAddProducts(id: $id, productIds: $productIds) {
          userErrors { field message }
        }
      }`,
      { id: collection.id, productIds: [shopifyProduct.id] },
      true,
    ).collectionAddProducts;
    if (add.userErrors.length && !JSON.stringify(add.userErrors).includes('already exists')) {
      console.log(`collection warning ${product.title}: ${JSON.stringify(add.userErrors)}`);
    }
  }

  const published = gql(
    `mutation PublishProduct($id: ID!, $input: [PublicationInput!]!) {
      publishablePublish(id: $id, input: $input) {
        userErrors { field message }
      }
    }`,
    { id: shopifyProduct.id, input: [{ publicationId: onlineStorePublicationId }] },
    true,
  ).publishablePublish;
  if (published.userErrors.length) console.log(`publish warning ${product.title}: ${JSON.stringify(published.userErrors)}`);

  analysis.push({
    score: product.score,
    northPearlTitle: product.title,
    handle: product.handle,
    sourceTitle: cleanTitle(offer.title),
    sourceUrl: `https:${offer.productUrl}`,
    price: offer.price,
    moq: offer.moq,
    soldOrder: offer.soldOrder || '',
    supplier: offer.companyName,
    supplierYears: offer.goldSupplierYears || '',
    reviewScore: offer.reviewScore || '',
    reviewCount: offer.reviewCount || '',
    imagesAdded: usableImages.length,
    risk: product.risk,
  });
}

console.table(analysis.map(({ sourceUrl, risk, ...row }) => row));
console.log('\nSource detail:');
for (const item of analysis) {
  console.log(`- ${item.northPearlTitle}: ${item.sourceUrl}`);
  console.log(`  Supplier: ${item.supplier}; ${item.supplierYears}; rating ${item.reviewScore} (${item.reviewCount}); ${item.moq}; ${item.price}; images ${item.imagesAdded}`);
  console.log(`  Risk: ${item.risk}`);
}
