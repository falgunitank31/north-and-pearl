import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const onlineStorePublicationId = 'gid://shopify/Publication/331104157880';
const domain = 'https://www.alibaba.com/search/api/proTextSearch';
const tempDir = mkdtempSync(join(tmpdir(), 'np-catalog-100-'));
const cachedAlibabaResponse = '/tmp/np-alibaba-pro-search.json';
const targetActiveProducts = 100;

const searches = [
  "jewelry for women",
  "women's jewelry",
  "personalized name necklace jewelry",
  "initial necklace women jewelry",
  "birthstone necklace women jewelry",
  "heart necklace women jewelry",
  "flower necklace women jewelry",
  "pearl necklace women jewelry",
  "clover necklace women jewelry",
  "gold bracelet women jewelry",
  "heart bracelet women jewelry",
  "flower bracelet women jewelry",
  "pearl bracelet women jewelry",
  "tennis bracelet women jewelry",
  "minimalist ring women jewelry",
  "birthstone ring women jewelry",
  "hoop earrings women jewelry",
  "drop earrings women jewelry",
  "bridal jewelry set women",
  "jewelry gift box",
];

const rejectWords = [
  'watch',
  'eyewear',
  'sunglasses',
  'hair',
  'piercing',
  'nose',
  'toe',
  'anklet',
  'keychain',
  'phone',
  'brooch',
  'body',
  'men ',
  'man ',
  'kids',
  'children',
  'cheap',
];

const motifWords = [
  ['heart', 'Heart'],
  ['flower', 'Flower'],
  ['clover', 'Clover'],
  ['pearl', 'Pearl'],
  ['birthstone', 'Birthstone'],
  ['zircon', 'Crystal'],
  ['crystal', 'Crystal'],
  ['water drop', 'Water Drop'],
  ['teardrop', 'Teardrop'],
  ['initial', 'Initial'],
  ['letter', 'Letter'],
  ['name', 'Name'],
  ['bow', 'Bow'],
  ['moon', 'Moon'],
  ['butterfly', 'Butterfly'],
  ['snake', 'Snake Chain'],
  ['tennis', 'Tennis'],
  ['bead', 'Bead'],
  ['gemstone', 'Gemstone'],
  ['bar', 'Bar'],
  ['chain', 'Chain'],
  ['shell', 'Shell'],
  ['huggie', 'Huggie'],
  ['hoop', 'Hoop'],
  ['drop', 'Drop'],
  ['stud', 'Stud'],
  ['bridal', 'Bridal'],
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

function cleanText(value = '') {
  return String(value)
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function slug(value) {
  return cleanText(value)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function parseNumber(value = '') {
  const match = String(value).replace(/,/g, '').match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : 0;
}

function parseMoq(value = '') {
  return parseNumber(value) || 9999;
}

function parseYears(value = '') {
  return parseNumber(value);
}

function stripImageSize(url) {
  return url.replace(/^\/\//, 'https://').replace(/_\d+x\d+\.(jpg|jpeg|png|webp)$/i, '');
}

function imageInfo(url, index) {
  const file = join(tempDir, `image-${Date.now()}-${index}`);
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

function fetchOffers(query, page) {
  const params = new URLSearchParams({
    query,
    searchQuery: query,
    multiSearchQuery: query,
    keywordsTranslate: query,
    pageSize: '40',
    page: String(page),
    coreProduct: query,
    langident: 'en',
    bizSceneCode: 'proSearch',
  });
  const raw = execFileSync('curl', ['-Ls', `${domain}?${params.toString()}`], {
    encoding: 'utf8',
    maxBuffer: 30 * 1024 * 1024,
  });
  if (!raw.trim().startsWith('{')) {
    console.log(`search blocked or non-json: "${query}" page ${page}`);
    return [];
  }
  const parsed = JSON.parse(raw);
  return parsed.model?.offers || [];
}

function productType(title) {
  const t = title.toLowerCase();
  if (t.includes('gift box') || t.includes('jewelry box') || t.includes('packaging')) return 'Gift Box';
  if (t.includes('earring') || t.includes('earings')) return 'Earrings';
  if (t.includes('ring')) return 'Ring';
  if (t.includes('bracelet') || t.includes('bangle') || t.includes('cuff')) return 'Bracelet';
  if (t.includes('set')) return 'Gift Set';
  return 'Necklace';
}

function motif(title) {
  const t = title.toLowerCase();
  for (const [needle, label] of motifWords) {
    if (t.includes(needle)) return label;
  }
  return 'Signature';
}

function northPearlTitle(offer) {
  const title = cleanText(offer.title);
  const type = productType(title);
  const motifLabel = motif(title);
  const base =
    type === 'Gift Box' ? 'Gift Box' :
    type === 'Gift Set' ? 'Jewelry Set' :
    type;
  return `North & Pearl ${motifLabel} ${base}`.replace('Signature Gift Box', 'Signature Gift Box');
}

function collectionsFor(type, title) {
  const t = title.toLowerCase();
  const collections = ['Gifts'];
  if (type === 'Necklace') collections.push('Necklaces');
  if (type === 'Bracelet') collections.push('Bracelets');
  if (type === 'Ring') collections.push('Rings');
  if (type === 'Earrings') collections.push('Earrings');
  if (type === 'Gift Set') collections.push('Wedding & Bridesmaids');
  if (type === 'Gift Box') collections.push('Gift Cards');
  if (t.includes('name')) collections.push('Name Necklaces');
  if (t.includes('initial') || t.includes('letter')) collections.push('Initial Necklaces');
  if (t.includes('birthstone') || t.includes('gemstone')) collections.push('Birthstone Jewelry');
  if (t.includes('heart') || t.includes('couple')) collections.push('Couple Jewelry');
  if (t.includes('mother') || t.includes('mama') || t.includes('flower') || t.includes('pearl')) collections.push("Mother's Collection");
  if (t.includes('bridal') || t.includes('wedding') || t.includes('bridesmaid') || t.includes('pearl')) collections.push('Wedding & Bridesmaids');
  collections.push('New Arrivals');
  return [...new Set(collections)];
}

function tagsFor(type, title, sourceId) {
  const t = title.toLowerCase();
  const tags = [
    'gift-for-her',
    'alibaba-sourced',
    `alibaba-source-${sourceId}`,
    'source-alibaba',
    'claim-status-unverified',
    'sample-status-not-ordered',
    'availability-status-visible',
  ];
  if (type === 'Necklace') tags.push('necklace');
  if (type === 'Bracelet') tags.push('bracelet');
  if (type === 'Ring') tags.push('ring');
  if (type === 'Earrings') tags.push('earrings');
  if (type === 'Gift Set') tags.push('gift-set');
  if (type === 'Gift Box') tags.push('gift-box');
  for (const [needle, label] of motifWords) {
    if (t.includes(needle)) tags.push(`${label.toLowerCase().replace(/\s+/g, '-')}-style`);
  }
  if (t.includes('name') || t.includes('initial') || t.includes('letter') || t.includes('custom')) tags.push('personalized');
  return [...new Set(tags)];
}

function retailPrice(type, supplierPriceText) {
  const low = parseNumber(supplierPriceText);
  if (type === 'Gift Box') return ['19.00', '29.00'];
  if (type === 'Earrings') return [low > 3 ? '49.00' : '39.00', low > 3 ? '65.00' : '55.00'];
  if (type === 'Ring') return [low > 5 ? '69.00' : '49.00', low > 5 ? '89.00' : '65.00'];
  if (type === 'Bracelet') return [low > 4 ? '69.00' : '54.00', low > 4 ? '89.00' : '72.00'];
  if (type === 'Gift Set') return [low > 4 ? '99.00' : '89.00', low > 4 ? '129.00' : '115.00'];
  return [low > 4 ? '79.00' : '59.00', low > 4 ? '99.00' : '79.00'];
}

function shortCopy(type, motifLabel) {
  const lower = motifLabel.toLowerCase();
  if (type === 'Gift Box') return 'A polished jewelry gift box designed to make North & Pearl pieces feel ready to give.';
  if (type === 'Gift Set') return `A coordinated ${lower}-inspired jewelry set for meaningful gifting and occasion-ready styling.`;
  if (type === 'Earrings') return `A refined ${lower}-inspired earring style for everyday polish and thoughtful gifting.`;
  if (type === 'Ring') return `A ${lower}-inspired ring chosen for giftable style and everyday wear.`;
  if (type === 'Bracelet') return `A ${lower}-inspired bracelet selected for easy gifting, layering, and everyday meaning.`;
  return `A ${lower}-inspired necklace selected for meaningful gifting and polished everyday style.`;
}

function description(product, offer) {
  const supplier = cleanText(offer.companyName || 'Alibaba supplier');
  return [
    `<p>${product.short}</p>`,
    `<h3>Why it belongs in the North &amp; Pearl collection</h3>`,
    `<p>This piece was selected for its gift-ready visual appeal, accessible retail positioning, and fit with North &amp; Pearl's warm, meaningful jewelry direction.</p>`,
    `<h3>Gift positioning</h3>`,
    `<p>Best for birthdays, anniversaries, bridesmaids, mothers, friends, sisters, and thoughtful self-gifting depending on the style.</p>`,
    `<h3>Details to confirm before scaling</h3>`,
    `<ul>`,
    `<li>Supplier shown on Alibaba: ${supplier}</li>`,
    `<li>Visible Alibaba MOQ: ${cleanText(offer.moq || 'Unknown')}</li>`,
    `<li>Visible Alibaba price range: ${cleanText(offer.price || 'Unknown')}</li>`,
    `<li>Materials, plating, stones, sizing, and packaging must be confirmed with samples before any stronger product claims are made.</li>`,
    `</ul>`,
    `<h3>Care note</h3>`,
    `<p>Final care instructions depend on supplier-confirmed materials and plating. Until confirmed, store separately, avoid harsh cleaners, and keep dry between wears.</p>`,
  ].join('');
}

function scoreOffer(offer) {
  const title = cleanText(offer.title);
  const lower = title.toLowerCase();
  if (rejectWords.some((word) => lower.includes(word))) return 0;
  const type = productType(title);
  if (!['Necklace', 'Bracelet', 'Ring', 'Earrings', 'Gift Set', 'Gift Box'].includes(type)) return 0;
  const moq = parseMoq(offer.moq);
  if (moq > 20) return 0;
  const rating = Number(offer.reviewScore || 0);
  const years = parseYears(offer.goldSupplierYears);
  const reviews = parseNumber(offer.reviewCount);
  const sold = parseNumber(offer.soldOrder);
  let score = 45;
  score += Math.min(15, sold / 300);
  score += rating >= 4.8 ? 14 : rating >= 4.7 ? 12 : rating >= 4.5 ? 9 : rating >= 4.3 ? 5 : 0;
  score += Math.min(10, years * 1.5);
  score += Math.min(8, reviews / 50);
  score += moq <= 2 ? 10 : moq <= 6 ? 8 : moq <= 12 ? 5 : 2;
  if ((offer.multiImage || []).length >= 5) score += 8;
  if (lower.includes('personal') || lower.includes('custom') || lower.includes('initial') || lower.includes('name')) score += 4;
  if (lower.includes('heart') || lower.includes('birthstone') || lower.includes('flower') || lower.includes('pearl')) score += 3;
  return Math.round(Math.min(100, score));
}

const existingProducts = gql(`query ExistingProducts {
  products(first: 250, query: "vendor:'North & Pearl'") {
    nodes { id title handle status tags media(first: 20) { nodes { id mediaContentType } } variants(first: 1) { nodes { id } } }
  }
}`).products.nodes;

const existingCollections = gql(`query ExistingCollections {
  collections(first: 100) { nodes { id title handle } }
}`).collections.nodes;

const activeCount = existingProducts.filter((product) => product.status === 'ACTIVE').length;
let slots = Math.max(0, targetActiveProducts - activeCount);
const collectionByTitle = new Map(existingCollections.map((collection) => [collection.title, collection]));
const productByHandle = new Map(existingProducts.map((product) => [product.handle, product]));
const existingSourceTags = new Set(existingProducts.flatMap((product) => product.tags || []).filter((tag) => tag.startsWith('alibaba-source-')));

console.log(`North & Pearl active product count: ${activeCount}. Open slots to ${targetActiveProducts}: ${slots}.`);

if (slots === 0) process.exit(0);

const offerById = new Map();
for (const search of searches) {
  for (const page of [1, 2, 3]) {
    const offers = fetchOffers(search, page);
    for (const offer of offers) {
      if (!offer.productId || offerById.has(offer.productId)) continue;
      const score = scoreOffer(offer);
      if (score < 72) continue;
      offerById.set(offer.productId, { ...offer, npScore: score, npSearch: search });
    }
  }
}

if (offerById.size === 0 && existsSync(cachedAlibabaResponse)) {
  console.log(`using cached Alibaba response: ${cachedAlibabaResponse}`);
  const cached = JSON.parse(readFileSync(cachedAlibabaResponse, 'utf8'));
  for (const offer of cached.model?.offers || []) {
    if (!offer.productId || offerById.has(offer.productId)) continue;
    const score = scoreOffer(offer);
    if (score < 72) continue;
    offerById.set(offer.productId, { ...offer, npScore: score, npSearch: 'cached jewelry for women' });
  }
}

const candidates = [...offerById.values()]
  .filter((offer) => !existingSourceTags.has(`alibaba-source-${offer.productId}`))
  .sort((a, b) => b.npScore - a.npScore || parseNumber(b.soldOrder) - parseNumber(a.soldOrder));

const createdRows = [];
const usedHandles = new Set(productByHandle.keys());

for (const offer of candidates) {
  if (slots <= 0) break;

  const sourceTitle = cleanText(offer.title);
  const type = productType(sourceTitle);
  const motifLabel = motif(sourceTitle);
  const titleBase = northPearlTitle(offer);
  let handle = `north-pearl-${slug(titleBase.replace(/^North & Pearl\s+/, ''))}`;
  if (usedHandles.has(handle)) handle = `${handle}-${offer.productId.slice(-4)}`;
  if (usedHandles.has(handle)) continue;

  const imageUrls = (offer.multiImage || []).slice(0, 6).map(stripImageSize);
  const checkedImages = imageUrls.map(imageInfo);
  const usableImages = checkedImages.filter((image) => image.ok && image.width >= 700 && image.height >= 700);
  if (usableImages.length < 3) continue;

  const [price, compareAtPrice] = retailPrice(type, offer.price);
  const product = {
    title: titleBase,
    handle,
    type,
    short: shortCopy(type, motifLabel),
    collections: collectionsFor(type, sourceTitle),
    tags: tagsFor(type, sourceTitle, offer.productId),
    price,
    compareAtPrice,
  };

  const created = gql(
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
  if (created.userErrors.length) {
    console.log(`create skipped ${product.title}: ${JSON.stringify(created.userErrors)}`);
    continue;
  }

  const shopifyProduct = created.product;
  const variantId = shopifyProduct.variants?.nodes?.[0]?.id;
  if (variantId) {
    gql(
      `mutation VariantUpdate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
        productVariantsBulkUpdate(productId: $productId, variants: $variants) {
          userErrors { field message }
        }
      }`,
      { productId: shopifyProduct.id, variants: [{ id: variantId, price, compareAtPrice }] },
      true,
    );
  }

  gql(
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
  );

  for (const collectionTitle of product.collections) {
    const collection = collectionByTitle.get(collectionTitle);
    if (!collection) continue;
    gql(
      `mutation AddToCollection($id: ID!, $productIds: [ID!]!) {
        collectionAddProducts(id: $id, productIds: $productIds) { userErrors { field message } }
      }`,
      { id: collection.id, productIds: [shopifyProduct.id] },
      true,
    );
  }

  gql(
    `mutation PublishProduct($id: ID!, $input: [PublicationInput!]!) {
      publishablePublish(id: $id, input: $input) { userErrors { field message } }
    }`,
    { id: shopifyProduct.id, input: [{ publicationId: onlineStorePublicationId }] },
    true,
  );

  usedHandles.add(handle);
  slots -= 1;
  createdRows.push({
    score: offer.npScore,
    title: product.title,
    handle,
    type,
    price,
    compareAtPrice,
    sourceId: offer.productId,
    supplier: cleanText(offer.companyName),
    supplierYears: offer.goldSupplierYears || '',
    rating: offer.reviewScore || '',
    reviews: offer.reviewCount || '',
    moq: offer.moq || '',
    sourcePrice: offer.price || '',
    images: usableImages.length,
  });
  console.log(`created ${createdRows.length}: ${product.title} (${handle})`);
}

console.table(createdRows);
console.log(`Created ${createdRows.length} products. Remaining slots to ${targetActiveProducts}: ${slots}.`);
