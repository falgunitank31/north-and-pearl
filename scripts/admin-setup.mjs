import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-admin-'));

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

function handleize(value) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const products = [
  ['Custom Name Necklace', 'Necklace', 79, 99, ['personalized', 'name-necklace', 'gift-for-her', 'birthday', 'anniversary'], ['Name Necklaces', 'Best Sellers', 'Gifts']],
  ['Initial Pendant Necklace', 'Necklace', 59, 75, ['personalized', 'initial-necklace', 'minimal-jewelry', 'gift-for-her'], ['Initial Necklaces', 'Best Sellers', 'Gifts']],
  ['Birthstone Name Necklace', 'Necklace', 89, 115, ['birthstone', 'name-necklace', 'personalized', 'mother-gift'], ['Birthstone Jewelry', 'Name Necklaces', 'Gifts']],
  ['Personalized Bar Necklace', 'Necklace', 69, 89, ['engraved', 'bar-necklace', 'personalized', 'anniversary'], ['Necklaces', 'Gifts', 'Best Sellers']],
  ['Coordinates Necklace', 'Necklace', 79, 99, ['coordinates', 'personalized', 'anniversary', 'couple-gift'], ['Necklaces', 'Couple Jewelry', 'Gifts']],
  ['Couple Name Necklace', 'Necklace', 89, 115, ['couple-jewelry', 'personalized', 'anniversary', 'gift-for-partner'], ['Couple Jewelry', 'Name Necklaces', 'Gifts']],
  ['Mama Name Necklace', 'Necklace', 89, 115, ['mama-necklace', 'mother-gift', 'personalized', 'mothers-day'], ["Mother's Collection", 'Name Necklaces', 'Gifts']],
  ['Engraved Heart Necklace', 'Necklace', 69, 89, ['heart-necklace', 'engraved', 'personalized', 'gift-for-her'], ['Necklaces', 'Gifts']],
  ['Birth Flower Necklace', 'Necklace', 79, 99, ['birth-flower', 'personalized', 'birthday-gift', 'mother-gift'], ['Birthstone Jewelry', "Mother's Collection", 'Gifts']],
  ['Custom Name Bracelet', 'Bracelet', 59, 79, ['name-bracelet', 'personalized', 'gift-for-her'], ['Bracelets', 'Gifts']],
  ['Initial Bracelet', 'Bracelet', 49, 65, ['initial-bracelet', 'personalized', 'minimal-jewelry'], ['Bracelets', 'Gifts']],
  ['Engraved Couple Bracelet', 'Bracelet', 69, 89, ['couple-bracelet', 'engraved', 'anniversary', 'personalized'], ['Bracelets', 'Couple Jewelry', 'Gifts']],
  ['Personalized Ring', 'Ring', 59, 79, ['personalized-ring', 'gift-for-her', 'anniversary'], ['Rings', 'Gifts']],
  ['Birthstone Ring', 'Ring', 69, 89, ['birthstone-ring', 'birthday-gift', 'mother-gift'], ['Rings', 'Birthstone Jewelry', 'Gifts']],
  ['Initial Stud Earrings', 'Earrings', 39, 55, ['initial-earrings', 'stud-earrings', 'personalized'], ['Earrings', 'Gifts']],
  ['Custom Hoop Earrings', 'Earrings', 59, 79, ['hoop-earrings', 'personalized', 'gift-for-her'], ['Earrings', 'Gifts']],
  ['Bridesmaid Gift Necklace', 'Necklace', 69, 89, ['bridesmaid-gift', 'wedding', 'personalized'], ['Wedding & Bridesmaids', 'Necklaces', 'Gifts']],
  ["Mother's Day Gift Set", 'Gift Set', 99, 129, ['mothers-day', 'mother-gift', 'gift-set', 'personalized'], ["Mother's Collection", 'Gifts']],
  ['Luxury Jewelry Gift Box', 'Gift Box', 14.99, 19.99, ['gift-box', 'packaging', 'upsell'], ['Gifts']],
  ['Digital Gift Card', 'Gift Card', 25, null, ['gift-card', 'last-minute-gift'], ['Gift Cards', 'Gifts']],
].map(([title, type, price, compareAtPrice, tags, collections]) => ({
  title,
  handle: handleize(title),
  productType: type,
  price,
  compareAtPrice,
  tags,
  collections,
  bodyHtml: `<p>${title} is a North & Pearl draft product created for personalized jewelry and meaningful gifting. Material details, production timing, and fulfillment promises must be confirmed before launch.</p>`,
  seo: {
    title: `${title} | North & Pearl`,
    description: `Shop ${title.toLowerCase()} from North & Pearl. A personalized jewelry gift concept for meaningful moments. Materials pending confirmation.`,
  },
}));

const collectionDefinitions = [
  ['Best Sellers', 'best-sellers', 'Meaningful personalized jewelry favorites for birthdays, anniversaries, mothers, bridesmaids, and everyday gifting.'],
  ['Necklaces', 'necklaces', 'Personalized necklaces for names, initials, dates, coordinates, and meaningful gifting.'],
  ['Name Necklaces', 'name-necklaces', 'Custom name necklace concepts for birthdays, mothers, bridesmaids, partners, and self-gifting.'],
  ['Initial Necklaces', 'initial-necklaces', 'Minimal initial jewelry for thoughtful everyday personalization.'],
  ['Birthstone Jewelry', 'birthstone-jewelry', 'Birth-month inspired personalized jewelry. Exact stones and materials require supplier confirmation.'],
  ['Couple Jewelry', 'couple-jewelry', 'Personalized couple jewelry for anniversaries, names, dates, coordinates, and relationship milestones.'],
  ['Bracelets', 'bracelets', 'Personalized bracelets for names, initials, dates, and meaningful gifts.'],
  ['Rings', 'rings', 'Personalized ring concepts for milestones, initials, birth-month details, and everyday gifting.'],
  ['Earrings', 'earrings', 'Personalized earring concepts for subtle, meaningful style.'],
  ['Gifts', 'gifts', 'Personalized jewelry gifts organized for meaningful occasions and recipients.'],
  ["Mother's Collection", 'mothers-collection', 'Personalized jewelry gift concepts for mothers, family meaning, and Mother’s Day.'],
  ['Wedding & Bridesmaids', 'wedding-bridesmaids', 'Personalized wedding and bridesmaid jewelry gifts for bridal party thank-you moments.'],
  ["Men's Jewelry", 'mens-jewelry', 'Personalized men’s jewelry direction pending supplier and product confirmation.'],
  ['Gift Cards', 'gift-cards', 'Digital gift cards for personalized jewelry and meaningful gifting.'],
  ['New Arrivals', 'new-arrivals', 'Newest North & Pearl personalized jewelry concepts and gift-ready pieces.'],
  ['Sale', 'sale', 'North & Pearl sale collection placeholder. Publish only after promotional strategy is approved.'],
].map(([title, handle, descriptionHtml]) => ({ title, handle, descriptionHtml: `<p>${descriptionHtml}</p>` }));

const pages = [
  ['About North & Pearl', 'about-north-pearl', 'about', '<p>North & Pearl creates personalized jewelry and meaningful gifts for the names, dates, initials, places, and milestones people carry with them. The brand promise is Crafted for Life’s Meaningful Moments.</p><p>Product materials, fulfillment timelines, and packaging promises must be confirmed before final launch claims are made.</p>'],
  ['FAQ', 'faq', 'faq', '<h2>How does personalization work?</h2><p>Choose a product, enter the requested personalization details, and review spelling carefully before checkout.</p><h2>What materials are used?</h2><p>Material details are pending supplier confirmation. North & Pearl should not publish claims such as sterling silver, gold vermeil, waterproof, tarnish-free, nickel-free, or hypoallergenic until approved.</p><h2>Can personalized items be returned?</h2><p>Personalized and custom products are generally final sale unless defective, damaged, or incorrect. Final policy language requires owner review before publication.</p>'],
  ['Jewelry Care Guide', 'jewelry-care-guide', 'jewelry-care-guide', '<p>Store jewelry separately in a soft pouch or jewelry box. Keep pieces away from harsh chemicals, lotions, perfumes, and extended moisture unless the specific product page confirms otherwise. Clean gently with a soft dry cloth.</p>'],
  ['Personalized Jewelry Guide', 'personalized-jewelry-guide', 'personalized-jewelry-guide', '<p>Choose personalization that feels meaningful and easy to wear. Names, initials, birth-month details, dates, coordinates, and short phrases can all tell a story.</p>'],
  ['AI Brand Information', 'ai-brand-information', 'ai-brand-information', '<p>North & Pearl is a premium direct-to-consumer personalized jewelry and gifting brand at northandpearl.com. The brand focuses on meaningful jewelry for birthdays, anniversaries, mothers, bridesmaids, couples, weddings, and everyday milestones.</p><p>AI-safe brand description: North & Pearl sells personalized jewelry and gift-ready keepsakes designed to celebrate names, initials, dates, places, and meaningful life moments. Material claims should only be stated when confirmed on the relevant product page.</p>'],
  ['Shipping Policy', 'shipping-policy', 'shipping-policy', '<p>This is a draft shipping policy. Production time, carrier options, shipping regions, and free-shipping rules must be confirmed before final publication. Personalized items may require production time before transit begins.</p>'],
  ['Returns & Exchanges', 'returns-exchanges', 'returns-exchanges', '<p>This is a draft returns and exchanges policy. Personalized and custom items are generally non-returnable unless defective, damaged, or incorrect. Standard item return windows require owner review before publishing.</p>'],
  ['Track Your Order', 'track-your-order', 'track-your-order', '<p>Order tracking will be available after fulfillment settings and carrier notifications are confirmed. Customers should use the tracking link in their shipping confirmation email once orders begin shipping.</p>'],
].map(([title, handle, templateSuffix, body]) => ({ title, handle, templateSuffix, body }));

const existingProducts = gql(`query ExistingProducts { products(first: 100) { nodes { id handle title variants(first: 1) { nodes { id } } } } }`).products.nodes;
const productByHandle = new Map(existingProducts.map((p) => [p.handle, p]));
const productIds = {};

for (const product of products) {
  let existing = productByHandle.get(product.handle);
  if (!existing) {
    const created = gql(
      `mutation CreateProduct($product: ProductCreateInput!) {
        productCreate(product: $product) {
          product { id handle title variants(first: 1) { nodes { id } } }
          userErrors { field message }
        }
      }`,
      {
        product: {
          title: product.title,
          handle: product.handle,
          descriptionHtml: product.bodyHtml,
          vendor: 'North & Pearl',
          productType: product.productType,
          tags: product.tags,
          status: 'DRAFT',
          seo: product.seo,
        },
      },
      true,
    ).productCreate;
    if (created.userErrors.length) throw new Error(`Product ${product.title}: ${JSON.stringify(created.userErrors)}`);
    existing = created.product;
    console.log(`created product: ${product.title}`);
  } else {
    console.log(`exists product: ${product.title}`);
  }
  productIds[product.title] = existing.id;

  const variantId = existing.variants?.nodes?.[0]?.id;
  if (variantId) {
    const updated = gql(
      `mutation UpdateVariant($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
        productVariantsBulkUpdate(productId: $productId, variants: $variants) {
          productVariants { id price compareAtPrice }
          userErrors { field message }
        }
      }`,
      {
        productId: existing.id,
        variants: [
          {
            id: variantId,
            price: String(product.price),
            compareAtPrice: product.compareAtPrice == null ? null : String(product.compareAtPrice),
          },
        ],
      },
      true,
    ).productVariantsBulkUpdate;
    if (updated.userErrors.length) console.log(`variant warning ${product.title}: ${JSON.stringify(updated.userErrors)}`);
  }
}

const existingCollections = gql(`query ExistingCollections { collections(first: 100) { nodes { id handle title } } }`).collections.nodes;
const collectionByHandle = new Map(existingCollections.map((c) => [c.handle, c]));

for (const collection of collectionDefinitions) {
  let existing = collectionByHandle.get(collection.handle);
  if (!existing) {
    const ids = products.filter((p) => p.collections.includes(collection.title)).map((p) => productIds[p.title]).filter(Boolean);
    const created = gql(
      `mutation CreateCollection($input: CollectionInput!) {
        collectionCreate(input: $input) {
          collection { id handle title }
          userErrors { field message }
        }
      }`,
      {
        input: {
          title: collection.title,
          handle: collection.handle,
          descriptionHtml: collection.descriptionHtml,
          products: ids,
        },
      },
      true,
    ).collectionCreate;
    if (created.userErrors.length) throw new Error(`Collection ${collection.title}: ${JSON.stringify(created.userErrors)}`);
    existing = created.collection;
    console.log(`created collection: ${collection.title}`);
  } else {
    console.log(`exists collection: ${collection.title}`);
  }
}

const existingPages = gql(`query ExistingPages { pages(first: 100) { nodes { id handle title } } }`).pages.nodes;
const pageByHandle = new Map(existingPages.map((p) => [p.handle, p]));

for (const page of pages) {
  const existing = pageByHandle.get(page.handle);
  if (!existing) {
    const created = gql(
      `mutation CreatePage($page: PageCreateInput!) {
        pageCreate(page: $page) {
          page { id handle title }
          userErrors { field message }
        }
      }`,
      {
        page: {
          title: page.title,
          handle: page.handle,
          body: page.body,
          isPublished: true,
          templateSuffix: page.templateSuffix,
        },
      },
      true,
    ).pageCreate;
    if (created.userErrors.length) throw new Error(`Page ${page.title}: ${JSON.stringify(created.userErrors)}`);
    console.log(`created page: ${page.title}`);
  } else {
    console.log(`exists page: ${page.title}`);
  }
}

const menus = gql(`query Menus { menus(first: 20) { nodes { id handle title } } }`).menus.nodes;
const mainMenu = menus.find((m) => m.handle === 'main-menu');
const footerMenu = menus.find((m) => m.handle === 'footer');

function menuItem(title, url, type = 'HTTP') {
  return { title, url, type, items: [] };
}

if (mainMenu) {
  const res = gql(
    `mutation UpdateMenu($id: ID!, $title: String!, $handle: String!, $items: [MenuItemUpdateInput!]!) {
      menuUpdate(id: $id, title: $title, handle: $handle, items: $items) {
        menu { id handle title }
        userErrors { field message }
      }
    }`,
    {
      id: mainMenu.id,
      title: 'Main menu',
      handle: 'main-menu',
      items: [
        menuItem('New Arrivals', '/collections/new-arrivals'),
        menuItem('Best Sellers', '/collections/best-sellers'),
        menuItem('Necklaces', '/collections/necklaces'),
        menuItem('Bracelets', '/collections/bracelets'),
        menuItem('Rings', '/collections/rings'),
        menuItem('Earrings', '/collections/earrings'),
        menuItem('Gifts', '/collections/gifts'),
        menuItem("Mother's Collection", '/collections/mothers-collection'),
        menuItem('Wedding & Bridesmaids', '/collections/wedding-bridesmaids'),
        menuItem("Men's Jewelry", '/collections/mens-jewelry'),
        menuItem('Sale', '/collections/sale'),
      ],
    },
    true,
  ).menuUpdate;
  if (res.userErrors.length) console.log(`main menu warning: ${JSON.stringify(res.userErrors)}`);
  else console.log('updated main menu');
}

if (footerMenu) {
  const res = gql(
    `mutation UpdateMenu($id: ID!, $title: String!, $handle: String!, $items: [MenuItemUpdateInput!]!) {
      menuUpdate(id: $id, title: $title, handle: $handle, items: $items) {
        menu { id handle title }
        userErrors { field message }
      }
    }`,
    {
      id: footerMenu.id,
      title: 'Footer menu',
      handle: 'footer',
      items: [
        menuItem('About North & Pearl', '/pages/about-north-pearl'),
        menuItem('Contact Us', '/pages/contact'),
        menuItem('FAQ', '/pages/faq'),
        menuItem('Shipping Policy', '/pages/shipping-policy'),
        menuItem('Returns & Exchanges', '/pages/returns-exchanges'),
        menuItem('Jewelry Care Guide', '/pages/jewelry-care-guide'),
        menuItem('Track Your Order', '/pages/track-your-order'),
        menuItem('Privacy Policy', '/policies/privacy-policy'),
        menuItem('Terms of Service', '/policies/terms-of-service'),
        menuItem('AI Brand Information', '/pages/ai-brand-information'),
      ],
    },
    true,
  ).menuUpdate;
  if (res.userErrors.length) console.log(`footer menu warning: ${JSON.stringify(res.userErrors)}`);
  else console.log('updated footer menu');
}

const policies = [
  [
    'SHIPPING_POLICY',
    '<p>This shipping policy is a North & Pearl draft. Production time is separate from transit time. Final carrier options, shipping regions, free-shipping rules, and delivery timelines must be confirmed before launch.</p><p>Personalized items may require production time before transit begins. Customers will receive tracking when an order ships.</p>',
  ],
  [
    'REFUND_POLICY',
    '<p>This refund policy is a North & Pearl draft. Personalized and custom products are generally final sale unless defective, damaged, or incorrect. Standard product return windows require owner review before publication.</p><p>Customers should contact support before returning any item.</p>',
  ],
  [
    'PRIVACY_POLICY',
    '<p>This privacy policy is a draft placeholder and must be reviewed before launch. North & Pearl uses Shopify to operate the store and process orders. Tracking, analytics, and marketing tools should only be added after privacy review.</p>',
  ],
  [
    'TERMS_OF_SERVICE',
    '<p>These terms of service are a draft placeholder and must be reviewed before launch. By using the North & Pearl store, customers agree to provide accurate order and personalization details. North & Pearl may decline prohibited, offensive, or infringing personalization requests.</p>',
  ],
].map(([type, body]) => ({ type, body }));

for (const shopPolicy of policies) {
  const res = gql(
    `mutation UpdatePolicy($shopPolicy: ShopPolicyInput!) {
      shopPolicyUpdate(shopPolicy: $shopPolicy) {
        shopPolicy { id type title url }
        userErrors { field message }
      }
    }`,
    { shopPolicy },
    true,
  ).shopPolicyUpdate;
  if (res.userErrors.length) console.log(`policy warning ${shopPolicy.type}: ${JSON.stringify(res.userErrors)}`);
  else console.log(`updated policy: ${shopPolicy.type}`);
}

console.log('North & Pearl Admin setup complete.');
