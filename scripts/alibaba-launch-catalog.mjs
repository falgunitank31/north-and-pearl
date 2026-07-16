import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-alibaba-catalog-'));

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

function html(product) {
  const bullets = product.features.map((feature) => `<li>${feature}</li>`).join('');
  return [
    `<p>${product.short}</p>`,
    `<h3>Why it belongs in the North & Pearl collection</h3>`,
    `<p>${product.story}</p>`,
    `<h3>Details to confirm before final launch</h3>`,
    `<ul>${bullets}</ul>`,
    `<h3>Gift positioning</h3>`,
    `<p>${product.gift}</p>`,
    `<h3>Care note</h3>`,
    `<p>Final care instructions depend on supplier-confirmed materials and plating. Until confirmed, customers should store the piece separately, avoid harsh cleaners, and keep it dry between wears.</p>`,
  ].join('');
}

const sourceHandles = [
  'custom-name-necklace',
  'initial-pendant-necklace',
  'birthstone-name-necklace',
  'personalized-bar-necklace',
  'coordinates-necklace',
  'couple-name-necklace',
  'mama-name-necklace',
  'engraved-heart-necklace',
  'birth-flower-necklace',
  'custom-name-bracelet',
  'initial-bracelet',
  'engraved-couple-bracelet',
  'personalized-ring',
  'birthstone-ring',
  'initial-stud-earrings',
  'custom-hoop-earrings',
  'bridesmaid-gift-necklace',
  'mother-s-day-gift-set',
  'luxury-jewelry-gift-box',
  'digital-gift-card',
];

const products = [
  {
    title: 'North & Pearl Birthstone Name Necklace',
    handle: 'north-pearl-birthstone-name-necklace',
    type: 'Necklace',
    price: '89.00',
    compareAtPrice: '115.00',
    collections: ['Best Sellers', 'Name Necklaces', 'Birthstone Jewelry', 'Gifts', "Mother's Collection"],
    tags: ['personalized', 'birthstone', 'name-necklace', 'gift-for-her', 'mother-gift'],
    short: 'A personalized name necklace concept with a birth-month inspired accent for meaningful birthday, mother, and family gifting.',
    story: 'This is the strongest first-launch product because it combines name personalization with a birth-month story. It gives North & Pearl a clear premium gifting angle while staying easy to understand for shoppers.',
    gift: 'Best for birthdays, mothers, daughters, partners, anniversaries, and milestone gifts.',
    features: ['Name personalization to be confirmed with supplier character limits', 'Birth-month accent options pending sample verification', 'Supplier material and plating claims must be verified before publication', 'Ideal first sample candidate'],
  },
  {
    title: 'North & Pearl Opal Pendant Necklace',
    handle: 'north-pearl-opal-pendant-necklace',
    type: 'Necklace',
    price: '69.00',
    compareAtPrice: '89.00',
    collections: ['Best Sellers', 'Necklaces', 'Gifts'],
    tags: ['opal-style', 'pendant-necklace', 'gift-for-her', 'everyday-jewelry'],
    short: 'A luminous opal-style pendant necklace positioned as an elegant everyday gift.',
    story: 'The soft pendant look fits North & Pearl’s warm, minimal, gift-focused brand direction without needing heavy personalization.',
    gift: 'Best for birthdays, anniversaries, bridesmaids, sisters, and thoughtful everyday gifts.',
    features: ['Opal-style stone details require supplier confirmation', 'Pendant dimensions pending sample review', 'Chain length and closure details pending supplier confirmation', 'Good photography and gifting potential'],
  },
  {
    title: 'North & Pearl Initial Shell Necklace',
    handle: 'north-pearl-initial-shell-necklace',
    type: 'Necklace',
    price: '59.00',
    compareAtPrice: '75.00',
    collections: ['Best Sellers', 'Initial Necklaces', 'Necklaces', 'Gifts'],
    tags: ['personalized', 'initial-necklace', 'shell-style', 'gift-for-her'],
    short: 'A polished initial necklace concept with a shell-style detail for subtle personalization.',
    story: 'Initial jewelry is easy to buy, easy to gift, and lower risk than complex custom name production. It gives the catalog a clean entry-level personalized product.',
    gift: 'Best for bridesmaids, sisters, daughters, friends, birthdays, and everyday layering.',
    features: ['A-Z initial availability pending supplier confirmation', 'Shell-style detail must be verified in sample', 'Material and plating details pending supplier documentation', 'Strong sample priority'],
  },
  {
    title: 'North & Pearl Heart Keepsake Necklace',
    handle: 'north-pearl-heart-keepsake-necklace',
    type: 'Necklace',
    price: '64.00',
    compareAtPrice: '84.00',
    collections: ['Necklaces', 'Couple Jewelry', 'Gifts', "Mother's Collection"],
    tags: ['heart-necklace', 'couple-gift', 'mother-gift', 'gift-for-her'],
    short: 'A sentimental double-heart necklace for romantic, family, and friendship gifting.',
    story: 'The heart motif is direct, emotional, and highly giftable. It supports the North & Pearl promise without relying on unverified custom production.',
    gift: 'Best for anniversaries, Mother’s Day, birthdays, daughters, partners, and friendship gifts.',
    features: ['Heart pendant dimensions pending supplier confirmation', 'Stone or crystal details pending verification', 'Packaging fit should be checked with samples', 'Strong product-page storytelling potential'],
  },
  {
    title: 'North & Pearl Teardrop Birthstone Necklace',
    handle: 'north-pearl-teardrop-birthstone-necklace',
    type: 'Necklace',
    price: '69.00',
    compareAtPrice: '89.00',
    collections: ['Birthstone Jewelry', 'Necklaces', 'Gifts'],
    tags: ['birthstone', 'teardrop-necklace', 'birthday-gift', 'gift-for-her'],
    short: 'A teardrop birthstone-inspired pendant for birthdays, mothers, and meaningful milestones.',
    story: 'This gives the birthstone category a simpler non-name option for customers who want meaning without entering personalization details.',
    gift: 'Best for birthday gifts, mothers, daughters, sisters, and milestone moments.',
    features: ['Birth-month color range pending supplier confirmation', 'Stone composition must be verified before claims', 'Chain details pending sample review', 'Works well as a lower-friction birthstone product'],
  },
  {
    title: 'North & Pearl Minimal Water Drop Necklace',
    handle: 'north-pearl-minimal-water-drop-necklace',
    type: 'Necklace',
    price: '59.00',
    compareAtPrice: '79.00',
    collections: ['Necklaces', 'Gifts'],
    tags: ['minimal-necklace', 'water-drop', 'everyday-jewelry', 'gift-for-her'],
    short: 'A minimal water-drop pendant necklace with refined everyday styling.',
    story: 'This piece rounds out the necklace category with a clean, elegant silhouette that can sell as a simple gift or self-purchase.',
    gift: 'Best for birthdays, anniversaries, workwear gifts, and everyday jewelry lovers.',
    features: ['Stone or zircon details pending supplier confirmation', 'Pendant size pending sample review', 'Material and plating claims require documentation', 'Good low-complexity launch item'],
  },
  {
    title: 'North & Pearl Pearl Collarbone Necklace',
    handle: 'north-pearl-pearl-collarbone-necklace',
    type: 'Necklace',
    price: '54.00',
    compareAtPrice: '72.00',
    collections: ['Necklaces', 'Gifts', 'Wedding & Bridesmaids'],
    tags: ['pearl-style', 'collarbone-necklace', 'bridesmaid-gift', 'gift-for-her'],
    short: 'A delicate pearl-style collarbone necklace for soft, feminine gifting.',
    story: 'This product naturally reinforces the Pearl side of the brand name and gives the assortment a bridal and bridesmaid-friendly option.',
    gift: 'Best for bridesmaids, bridal showers, birthdays, sisters, and classic everyday style.',
    features: ['Pearl material/type pending supplier confirmation', 'Length and clasp details pending sample review', 'Wedding collection fit', 'Good bundle candidate with earrings or gift box'],
  },
  {
    title: 'North & Pearl Stackable Gold Bracelet',
    handle: 'north-pearl-stackable-gold-bracelet',
    type: 'Bracelet',
    price: '49.00',
    compareAtPrice: '65.00',
    collections: ['Best Sellers', 'Bracelets', 'Gifts'],
    tags: ['bracelet', 'stackable', 'everyday-jewelry', 'gift-for-her'],
    short: 'A simple stackable bracelet designed for daily wear and easy gifting.',
    story: 'This is a strong add-on item because it feels premium, simple, and low-friction. It can support bundles and gift-box upsells.',
    gift: 'Best for birthdays, bridesmaids, sisters, friends, and self-gifting.',
    features: ['Finish and plating details pending supplier confirmation', 'Bracelet length and adjustability pending sample review', 'Strong AOV bundle candidate', 'Good first sample candidate'],
  },
  {
    title: 'North & Pearl Classic Tennis Bracelet',
    handle: 'north-pearl-classic-tennis-bracelet',
    type: 'Bracelet',
    price: '79.00',
    compareAtPrice: '99.00',
    collections: ['Bracelets', 'Gifts', 'Wedding & Bridesmaids'],
    tags: ['tennis-bracelet', 'zircon-style', 'anniversary-gift', 'wedding-gift'],
    short: 'A sparkling tennis bracelet concept with elevated gift appeal.',
    story: 'A tennis bracelet gives North & Pearl a more premium-looking bracelet option while still staying accessible compared with fine jewelry.',
    gift: 'Best for anniversaries, weddings, birthdays, bridal gifting, and milestone gifts.',
    features: ['Stone setting quality must be sample-tested', 'Clasp strength should be inspected before launch', 'Stone composition pending supplier documents', 'Good premium gift candidate'],
  },
  {
    title: 'North & Pearl Heart Bangle Bracelet',
    handle: 'north-pearl-heart-bangle-bracelet',
    type: 'Bracelet',
    price: '59.00',
    compareAtPrice: '79.00',
    collections: ['Bracelets', 'Couple Jewelry', 'Gifts', "Mother's Collection"],
    tags: ['heart-bracelet', 'bangle', 'couple-gift', 'mother-gift'],
    short: 'A heart-accent bangle for romantic, family, and everyday gifting.',
    story: 'The heart detail fits the brand’s emotional gifting promise and gives bracelet shoppers a direct meaningful option.',
    gift: 'Best for anniversaries, Valentine gifting, Mother’s Day, birthdays, and family keepsakes.',
    features: ['Bangle sizing pending supplier confirmation', 'Heart detail and stone setting should be sample checked', 'Supplier finish claims require verification', 'Works as a gift-box upsell product'],
  },
  {
    title: 'North & Pearl Flower Nail Bangle',
    handle: 'north-pearl-flower-nail-bangle',
    type: 'Bracelet',
    price: '59.00',
    compareAtPrice: '79.00',
    collections: ['Bracelets', 'Gifts'],
    tags: ['flower-bracelet', 'bangle', 'floral-jewelry', 'gift-for-her'],
    short: 'A floral-inspired bangle with a polished, feminine gift look.',
    story: 'This gives the bracelet collection a distinctive floral option without moving too far into trend-only jewelry.',
    gift: 'Best for birthdays, spring gifts, Mother’s Day, sisters, and feminine everyday style.',
    features: ['Design and fit should be checked against samples', 'Stone or crystal details pending verification', 'Material and plating claims require supplier proof', 'Good visual merchandising candidate'],
  },
  {
    title: 'North & Pearl Crystal Gemstone Cuff',
    handle: 'north-pearl-crystal-gemstone-cuff',
    type: 'Bracelet',
    price: '64.00',
    compareAtPrice: '84.00',
    collections: ['Bracelets', 'Birthstone Jewelry', 'Gifts', "Mother's Collection"],
    tags: ['crystal-style', 'gemstone-style', 'cuff-bracelet', 'mother-gift'],
    short: 'A crystal-style cuff bracelet with meaningful color and gifting potential.',
    story: 'This product adds color and a more artisan-inspired feeling to the launch set, useful for Mother’s Collection and birthday gifting.',
    gift: 'Best for mothers, birthdays, sisters, friends, and meaningful color-based gifting.',
    features: ['Stone type and origin must be verified before claims', 'Cuff fit and comfort should be sample tested', 'Color options pending supplier confirmation', 'Good gift-guide product'],
  },
  {
    title: 'North & Pearl Letter Charm Bracelet',
    handle: 'north-pearl-letter-charm-bracelet',
    type: 'Bracelet',
    price: '54.00',
    compareAtPrice: '72.00',
    collections: ['Bracelets', 'Initial Necklaces', 'Gifts'],
    tags: ['personalized', 'letter-bracelet', 'initial-bracelet', 'gift-for-her'],
    short: 'A personalized letter charm bracelet for initials, names, and everyday meaning.',
    story: 'This is the bracelet version of the initial-gift concept and helps North & Pearl own personalization beyond necklaces.',
    gift: 'Best for bridesmaids, daughters, sisters, friends, birthdays, and self-gifting.',
    features: ['Letter availability pending supplier confirmation', 'Charm durability should be sample tested', 'Bead/stone details require verification', 'Strong personalization category fit'],
  },
  {
    title: 'North & Pearl Zircon Bracelet',
    handle: 'north-pearl-zircon-bracelet',
    type: 'Bracelet',
    price: '49.00',
    compareAtPrice: '65.00',
    collections: ['Bracelets', 'Gifts'],
    tags: ['zircon-style', 'bracelet', 'everyday-jewelry', 'gift-for-her'],
    short: 'A minimal zircon-style bracelet for everyday sparkle and easy gifting.',
    story: 'This gives the bracelet assortment a simple, affordable sparkle item that can be bundled with necklaces or gift boxes.',
    gift: 'Best for birthdays, bridesmaids, friends, sisters, and everyday jewelry styling.',
    features: ['Stone setting quality pending sample review', 'Bracelet sizing pending supplier details', 'Material claims require verification', 'Good low-price bracelet option'],
  },
  {
    title: 'North & Pearl Smooth Gold Ring',
    handle: 'north-pearl-smooth-gold-ring',
    type: 'Ring',
    price: '44.00',
    compareAtPrice: '58.00',
    collections: ['Rings', 'Gifts'],
    tags: ['ring', 'minimal-ring', 'everyday-jewelry', 'gift-for-her'],
    short: 'A smooth everyday ring concept with clean modern styling.',
    story: 'This ring gives North & Pearl a low-risk entry into rings before adding more size-sensitive or high-ticket ring products.',
    gift: 'Best for self-gifting, birthdays, sisters, friends, and everyday minimal jewelry.',
    features: ['Ring sizes pending supplier confirmation', 'Finish durability should be sample tested', 'Material and plating claims require documentation', 'Good category starter'],
  },
  {
    title: 'North & Pearl Emerald Statement Ring',
    handle: 'north-pearl-emerald-statement-ring',
    type: 'Ring',
    price: '79.00',
    compareAtPrice: '99.00',
    collections: ['Rings', 'Birthstone Jewelry', 'Gifts'],
    tags: ['emerald-style', 'statement-ring', 'birthstone', 'gift-for-her'],
    short: 'An emerald-color statement ring for bold, meaningful gifting.',
    story: 'This ring introduces a premium-looking color story and works well for birthstone-inspired merchandising.',
    gift: 'Best for birthdays, anniversaries, milestone gifts, and customers who like statement jewelry.',
    features: ['Stone material and grade require supplier confirmation', 'Ring sizing and setting quality must be sample checked', 'Higher perceived value product', 'Use cautious birthstone-inspired copy until verified'],
  },
  {
    title: 'North & Pearl Moissanite Gift Ring',
    handle: 'north-pearl-moissanite-gift-ring',
    type: 'Ring',
    price: '129.00',
    compareAtPrice: '159.00',
    collections: ['Rings', 'Wedding & Bridesmaids', 'Gifts'],
    tags: ['premium-ring', 'anniversary-gift', 'wedding-gift', 'milestone-gift'],
    short: 'A premium gift ring concept for anniversaries, weddings, and milestone moments.',
    story: 'This should be treated as a higher-ticket test item. It can lift brand perception, but must be verified carefully before paid promotion.',
    gift: 'Best for anniversaries, weddings, milestone birthdays, and premium gifting.',
    features: ['Stone claims must be verified with documentation', 'Sizing, setting, and certification details require sample review', 'Higher inventory risk than core products', 'Do not advertise fine-jewelry claims until confirmed'],
  },
  {
    title: 'North & Pearl Geometric Drop Earrings',
    handle: 'north-pearl-geometric-drop-earrings',
    type: 'Earrings',
    price: '39.00',
    compareAtPrice: '55.00',
    collections: ['Earrings', 'Gifts'],
    tags: ['drop-earrings', 'geometric-earrings', 'everyday-jewelry', 'gift-for-her'],
    short: 'Modern geometric drop earrings for polished everyday style.',
    story: 'These earrings create an accessible earring category starter while keeping the brand minimal and modern.',
    gift: 'Best for birthdays, friends, sisters, bridesmaids, and everyday styling.',
    features: ['Earring back type pending supplier confirmation', 'Weight and comfort should be sample checked', 'Material claims require verification', 'Good entry-price item'],
  },
  {
    title: 'North & Pearl Square Zircon Jewelry Set',
    handle: 'north-pearl-square-zircon-jewelry-set',
    type: 'Gift Set',
    price: '89.00',
    compareAtPrice: '115.00',
    collections: ['Gifts', 'Wedding & Bridesmaids', 'Earrings', 'Necklaces'],
    tags: ['jewelry-set', 'zircon-style', 'gift-set', 'wedding-gift'],
    short: 'A coordinated necklace and earring gift set with polished occasion-ready appeal.',
    story: 'Gift sets help North & Pearl increase perceived value and average order value while making the gifting decision easier.',
    gift: 'Best for weddings, bridesmaids, anniversaries, birthdays, and complete ready-to-give moments.',
    features: ['Set components and packaging fit pending sample review', 'Stone details require verification', 'Good premium gifting candidate', 'Can be merchandised as a gift-ready set'],
  },
  {
    title: 'North & Pearl Bridal Water Drop Set',
    handle: 'north-pearl-bridal-water-drop-set',
    type: 'Gift Set',
    price: '99.00',
    compareAtPrice: '129.00',
    collections: ['Wedding & Bridesmaids', 'Gifts', 'Earrings', 'Necklaces'],
    tags: ['bridal-jewelry', 'jewelry-set', 'bridesmaid-gift', 'wedding-gift'],
    short: 'A wedding-ready water-drop necklace and earring set for bridal and bridesmaid gifting.',
    story: 'This gives the Wedding & Bridesmaids collection a stronger hero item and supports event-based merchandising.',
    gift: 'Best for bridesmaids, bridal showers, rehearsal dinners, wedding guests, and formal occasions.',
    features: ['Set quality and stone details pending supplier confirmation', 'Packaging compatibility should be sample tested', 'Wedding copy should remain original and claim-safe', 'Good seasonal wedding product'],
  },
];

const existingProducts = gql(`query ExistingProducts {
  products(first: 100) {
    nodes {
      id
      handle
      title
      variants(first: 1) { nodes { id } }
    }
  }
}`).products.nodes;

const existingCollections = gql(`query ExistingCollections {
  collections(first: 100) { nodes { id title handle } }
}`).collections.nodes;

const productByHandle = new Map(existingProducts.map((product) => [product.handle, product]));
const collectionByTitle = new Map(existingCollections.map((collection) => [collection.title, collection]));
const managedCollectionTitles = [
  'Home page',
  'Best Sellers',
  'Necklaces',
  'Name Necklaces',
  'Initial Necklaces',
  'Birthstone Jewelry',
  'Couple Jewelry',
  'Bracelets',
  'Rings',
  'Earrings',
  'Gifts',
  "Mother's Collection",
  'Wedding & Bridesmaids',
  "Men's Jewelry",
  'Gift Cards',
  'New Arrivals',
  'Sale',
];

for (let index = 0; index < products.length; index += 1) {
  const product = products[index];
  let existing = productByHandle.get(product.handle) || productByHandle.get(sourceHandles[index]);

  if (!existing) {
    const created = gql(
      `mutation ProductCreate($product: ProductCreateInput!) {
        productCreate(product: $product) {
          product { id handle title variants(first: 1) { nodes { id } } }
          userErrors { field message }
        }
      }`,
      {
        product: {
          title: product.title,
          handle: product.handle,
          descriptionHtml: html(product),
          vendor: 'North & Pearl',
          productType: product.type,
          tags: product.tags,
          status: 'ACTIVE',
          templateSuffix: product.tags.includes('personalized') ? 'personalized' : null,
          seo: {
            title: `${product.title} | Meaningful Jewelry Gifts | North & Pearl`,
            description: product.short,
          },
        },
      },
      true,
    ).productCreate;
    if (created.userErrors.length) throw new Error(`${product.title}: ${JSON.stringify(created.userErrors)}`);
    existing = created.product;
    console.log(`created product: ${product.title}`);
  } else {
    const updated = gql(
      `mutation ProductUpdate($product: ProductUpdateInput!) {
        productUpdate(product: $product) {
          product { id handle title }
          userErrors { field message }
        }
      }`,
      {
        product: {
          id: existing.id,
          title: product.title,
          handle: product.handle,
          descriptionHtml: html(product),
          vendor: 'North & Pearl',
          productType: product.type,
          tags: product.tags,
          status: 'ACTIVE',
          templateSuffix: product.tags.includes('personalized') ? 'personalized' : null,
          seo: {
            title: `${product.title} | Meaningful Jewelry Gifts | North & Pearl`,
            description: product.short,
          },
        },
      },
      true,
    ).productUpdate;
    if (updated.userErrors.length) throw new Error(`${product.title}: ${JSON.stringify(updated.userErrors)}`);
    console.log(`updated product: ${product.title}`);
  }

  const variantId = existing.variants?.nodes?.[0]?.id;
  if (variantId) {
    const variant = gql(
      `mutation VariantUpdate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
        productVariantsBulkUpdate(productId: $productId, variants: $variants) {
          userErrors { field message }
        }
      }`,
      {
        productId: existing.id,
        variants: [
          {
            id: variantId,
            price: product.price,
            compareAtPrice: product.compareAtPrice,
          },
        ],
      },
      true,
    ).productVariantsBulkUpdate;
    if (variant.userErrors.length) console.log(`variant warning ${product.title}: ${JSON.stringify(variant.userErrors)}`);
  }

  for (const collectionTitle of managedCollectionTitles) {
    const collection = collectionByTitle.get(collectionTitle);
    if (!collection) continue;
    const remove = gql(
      `mutation RemoveFromCollection($id: ID!, $productIds: [ID!]!) {
        collectionRemoveProducts(id: $id, productIds: $productIds) {
          job { id }
          userErrors { field message }
        }
      }`,
      { id: collection.id, productIds: [existing.id] },
      true,
    ).collectionRemoveProducts;
    if (remove.userErrors.length) {
      const message = JSON.stringify(remove.userErrors);
      if (!message.includes('is not in collection')) console.log(`collection remove warning ${product.title}: ${message}`);
    }
  }

  for (const collectionTitle of product.collections) {
    const collection = collectionByTitle.get(collectionTitle);
    if (!collection) {
      console.log(`missing collection "${collectionTitle}" for ${product.title}`);
      continue;
    }
    const add = gql(
      `mutation AddToCollection($id: ID!, $productIds: [ID!]!) {
        collectionAddProducts(id: $id, productIds: $productIds) {
          userErrors { field message }
        }
      }`,
      { id: collection.id, productIds: [existing.id] },
      true,
    ).collectionAddProducts;
    if (add.userErrors.length) {
      const message = JSON.stringify(add.userErrors);
      if (!message.includes('already exists')) console.log(`collection warning ${product.title}: ${message}`);
    }
  }
}

console.log(`North & Pearl Alibaba-derived launch catalog updated: ${products.length} products.`);
