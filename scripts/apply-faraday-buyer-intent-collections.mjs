import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-faraday-buyer-intent-'));
const today = new Date().toISOString().slice(0, 10);
const reportPath = `reports/faraday-buyer-intent-collections-${today}.md`;

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

function stripTags(value = '') {
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function money(value) {
  return Number.parseFloat(value || '0') || 0;
}

function haystack(product) {
  return [
    product.title,
    product.productType,
    ...(product.tags || []),
    ...product.collections.nodes.map((collection) => collection.handle),
  ]
    .join(' ')
    .toLowerCase();
}

function has(product, terms) {
  const text = haystack(product);
  return terms.some((term) => text.includes(term));
}

function imageScore(product) {
  const image = product.featuredMedia?.preview?.image;
  if (!image) return 0;
  const minSide = Math.min(image.width || 0, image.height || 0);
  if (minSide >= 1000) return 4;
  if (minSide >= 800) return 3;
  if (minSide >= 650) return 2;
  return 1;
}

function scoreProduct(product, profile) {
  let score = 0;
  const price = money(product.variants.nodes[0]?.price);
  const tags = new Set(product.tags || []);
  const collections = new Set(product.collections.nodes.map((collection) => collection.handle));

  score += imageScore(product) * 8;
  if ((product.totalInventory ?? 0) > 0) score += 4;
  if (collections.has('best-sellers')) score += 14;
  if (collections.has('gifts')) score += 12;
  if (collections.has('new-arrivals')) score += 4;
  if (profile.priceMax && price <= profile.priceMax) score += 20;
  if (profile.priceMin && price >= profile.priceMin) score += 4;
  for (const tag of profile.strongTags || []) if (tags.has(tag)) score += 10;
  for (const tag of profile.supportingTags || []) if (tags.has(tag)) score += 5;
  if (profile.terms && has(product, profile.terms)) score += 10;
  if (tags.has('claim-status-unverified')) score -= 2;
  if (tags.has('draft-candidate')) score -= 4;
  return score;
}

function collectionDescription({ title, intro, links, faqs }) {
  const linkHtml = links
    .map((link) => `<a href="${link.href}">${link.label}</a>`)
    .join(', ');
  return [
    `<p>${intro}</p>`,
    '<p>Use this collection to compare styles by look, price, and occasion. Product-specific materials, dimensions, and care details are shown on each product page when confirmed.</p>',
    linkHtml ? `<p>Helpful next steps: ${linkHtml}.</p>` : '',
    '<h2>How to choose from this collection</h2>',
    '<p>Start with the recipient’s everyday style, then narrow by category, personalization detail, price, and occasion. If a product allows personalization, review the spelling and selected options carefully before checkout.</p>',
    '<h2>Frequently asked questions</h2>',
    ...faqs.map((faq) => `<h3>${faq.q}</h3><p>${faq.a}</p>`),
  ]
    .filter(Boolean)
    .join('\n');
}

const collectionPlans = [
  {
    title: 'Personalized Jewelry',
    handle: 'personalized-jewelry',
    targetSize: 72,
    sortOrder: 'MANUAL',
    profile: {
      terms: ['personalized', 'initial', 'letter', 'name', 'birthstone', 'birth', 'zodiac', 'heart'],
      strongTags: ['personalized', 'name-style', 'initial-style', 'letter-style'],
      supportingTags: ['birth-month-style', 'heart-style', 'flower-style', 'gift-for-her'],
    },
    seo: {
      title: 'Personalized Jewelry | North & Pearl',
      description: 'Shop personalized jewelry from North & Pearl, including name, initial, heart, birth-month inspired, bracelet, ring, earring, and necklace styles.',
    },
    descriptionHtml: collectionDescription({
      title: 'Personalized Jewelry',
      intro: 'Personalized jewelry makes a gift feel connected to a name, initial, symbol, milestone, or everyday memory. Explore North & Pearl pieces selected for meaningful gifting and personal style.',
      links: [
        { label: 'Name Necklaces', href: '/collections/name-necklaces' },
        { label: 'Initial Necklaces', href: '/collections/initial-necklaces' },
        { label: 'Gifts', href: '/collections/gifts' },
      ],
      faqs: [
        {
          q: 'What counts as personalized jewelry?',
          a: 'Personalized jewelry can include names, initials, letters, symbols, birth-month inspiration, hearts, or other meaningful details shown by the product design.',
        },
        {
          q: 'Can I return personalized jewelry?',
          a: 'Return eligibility depends on the final product and store policy. Custom or personalized items are generally more limited, so review the current policy before ordering.',
        },
      ],
    }),
  },
  {
    title: 'Jewelry Gifts for Her',
    handle: 'jewelry-gifts-for-her',
    targetSize: 64,
    sortOrder: 'MANUAL',
    profile: {
      terms: ['gift', 'heart', 'initial', 'letter', 'pearl', 'flower', 'bow', 'butterfly', 'bracelet', 'necklace', 'earring', 'ring'],
      strongTags: ['gift-for-her', 'heart-style', 'initial-style', 'flower-style', 'pearl-style'],
      supportingTags: ['personalized', 'name-style', 'sparkle-style', 'clover-style', 'bow-style'],
    },
    seo: {
      title: 'Jewelry Gifts for Her | North & Pearl',
      description: 'Find jewelry gifts for her from North & Pearl, including necklaces, bracelets, rings, earrings, personalized styles, and meaningful everyday pieces.',
    },
    descriptionHtml: collectionDescription({
      title: 'Jewelry Gifts for Her',
      intro: 'Find jewelry gifts for her that feel thoughtful, wearable, and easy to love. This edit brings together necklaces, bracelets, rings, earrings, and meaningful styles for birthdays, anniversaries, holidays, and everyday appreciation.',
      links: [
        { label: 'Gifts Under $50', href: '/collections/gifts-under-50' },
        { label: 'Gifts Under $100', href: '/collections/gifts-under-100' },
        { label: 'Best Sellers', href: '/collections/best-sellers' },
      ],
      faqs: [
        {
          q: 'What jewelry gift should I choose if I am unsure of her style?',
          a: 'Choose a clean necklace, bracelet, earrings, or a simple initial-style piece. These are easier to wear often and do not require ring sizing.',
        },
        {
          q: 'Is jewelry a good last-minute gift?',
          a: 'Jewelry can be a strong gift when the product, delivery timing, and personalization requirements fit your deadline. Review the current shipping information before ordering.',
        },
      ],
    }),
  },
  {
    title: 'Gifts Under $50',
    handle: 'gifts-under-50',
    targetSize: 40,
    sortOrder: 'MANUAL',
    profile: {
      priceMax: 49.99,
      terms: ['gift', 'bracelet', 'earring', 'ring', 'heart', 'initial', 'pearl', 'flower'],
      strongTags: ['gift-for-her', 'bracelet', 'earrings', 'ring'],
      supportingTags: ['heart-style', 'flower-style', 'initial-style', 'sparkle-style', 'pearl-style'],
    },
    seo: {
      title: 'Jewelry Gifts Under $50 | North & Pearl',
      description: 'Shop meaningful jewelry gifts under $50 from North & Pearl, including bracelets, earrings, rings, and polished everyday styles.',
    },
    descriptionHtml: collectionDescription({
      title: 'Gifts Under $50',
      intro: 'Jewelry gifts under $50 can still feel thoughtful when the piece is wearable, polished, and matched to the recipient. This edit focuses on accessible styles that make gifting easier.',
      links: [
        { label: 'Bracelets', href: '/collections/bracelets' },
        { label: 'Earrings', href: '/collections/earrings' },
        { label: 'Jewelry Gifts for Her', href: '/collections/jewelry-gifts-for-her' },
      ],
      faqs: [
        {
          q: 'What is a good jewelry gift under $50?',
          a: 'Bracelets, earrings, simple rings, heart styles, and small charm-inspired pieces are practical under-$50 options when they match the recipient’s style.',
        },
        {
          q: 'Do lower-priced jewelry gifts still feel premium?',
          a: 'They can, especially when the design is clean, the product photos are clear, and the gift feels personal to the recipient.',
        },
      ],
    }),
  },
  {
    title: 'Gifts Under $100',
    handle: 'gifts-under-100',
    targetSize: 80,
    sortOrder: 'MANUAL',
    profile: {
      priceMax: 99.99,
      terms: ['gift', 'name', 'initial', 'heart', 'birth', 'pearl', 'flower', 'necklace', 'bracelet', 'earring', 'ring'],
      strongTags: ['gift-for-her', 'personalized', 'name-style', 'initial-style', 'heart-style'],
      supportingTags: ['flower-style', 'birth-month-style', 'sparkle-style', 'pearl-style', 'bracelet', 'necklace'],
    },
    seo: {
      title: 'Jewelry Gifts Under $100 | North & Pearl',
      description: 'Shop jewelry gifts under $100 from North & Pearl, including personalized necklaces, bracelets, earrings, rings, and meaningful styles.',
    },
    descriptionHtml: collectionDescription({
      title: 'Gifts Under $100',
      intro: 'Explore meaningful jewelry gifts under $100, curated for shoppers who want something personal, polished, and easy to give without overcomplicating the choice.',
      links: [
        { label: 'Personalized Jewelry', href: '/collections/personalized-jewelry' },
        { label: 'Name Necklaces', href: '/collections/name-necklaces' },
        { label: 'Anniversary Gifts', href: '/collections/anniversary-gifts' },
      ],
      faqs: [
        {
          q: 'What jewelry gift under $100 is best for her?',
          a: 'A personalized necklace, initial-style piece, bracelet, earrings, or ring can work well when it fits her everyday style and the occasion.',
        },
        {
          q: 'How do I make an under-$100 gift feel more personal?',
          a: 'Choose a piece connected to a name, initial, heart, flower, birth-month inspiration, or shared milestone.',
        },
      ],
    }),
  },
  {
    title: 'Birthday Jewelry Gifts',
    handle: 'birthday-jewelry-gifts',
    targetSize: 56,
    sortOrder: 'MANUAL',
    profile: {
      terms: ['birthday', 'birthstone', 'birth', 'zodiac', 'initial', 'letter', 'flower', 'butterfly', 'heart', 'pearl'],
      strongTags: ['birth-month-style', 'initial-style', 'letter-style', 'flower-style'],
      supportingTags: ['heart-style', 'butterfly-style', 'pearl-style', 'gift-for-her', 'personalized'],
    },
    seo: {
      title: 'Birthday Jewelry Gifts | North & Pearl',
      description: 'Shop birthday jewelry gifts from North & Pearl, including initial, birth-month inspired, flower, heart, necklace, bracelet, earring, and ring styles.',
    },
    descriptionHtml: collectionDescription({
      title: 'Birthday Jewelry Gifts',
      intro: 'Birthday jewelry should feel connected to the person receiving it. Browse initial, birth-month inspired, floral, heart, necklace, bracelet, ring, and earring styles selected for thoughtful birthday gifting.',
      links: [
        { label: 'Birthstone Jewelry', href: '/collections/birthstone-jewelry' },
        { label: 'Initial Necklaces', href: '/collections/initial-necklaces' },
        { label: 'Gifts Under $100', href: '/collections/gifts-under-100' },
      ],
      faqs: [
        {
          q: 'What jewelry is best for a birthday gift?',
          a: 'Initials, birth-month inspired pieces, flowers, hearts, earrings, bracelets, rings, and necklaces all work when the design fits the recipient’s everyday style.',
        },
        {
          q: 'Should I choose a ring for a birthday gift?',
          a: 'Choose a ring only if you are confident about sizing. Necklaces, bracelets, and earrings are often easier when size is uncertain.',
        },
      ],
    }),
  },
  {
    title: 'Anniversary Gifts',
    handle: 'anniversary-gifts',
    targetSize: 56,
    sortOrder: 'MANUAL',
    profile: {
      terms: ['anniversary', 'couple', 'heart', 'love', 'name', 'initial', 'ring', 'bracelet', 'necklace', 'pearl'],
      strongTags: ['heart-style', 'name-style', 'initial-style', 'personalized'],
      supportingTags: ['couple-gift', 'gift-for-her', 'ring', 'bracelet', 'necklace', 'pearl-style'],
    },
    seo: {
      title: 'Anniversary Jewelry Gifts | North & Pearl',
      description: 'Shop anniversary jewelry gifts from North & Pearl, including heart, name, initial, couple-inspired, necklace, bracelet, ring, and pearl-style pieces.',
    },
    descriptionHtml: collectionDescription({
      title: 'Anniversary Gifts',
      intro: 'Anniversary jewelry should feel personal without being difficult to wear. This edit highlights hearts, initials, name-inspired pieces, rings, bracelets, necklaces, and meaningful everyday designs.',
      links: [
        { label: 'Couple Jewelry', href: '/collections/couple-jewelry' },
        { label: 'Name Necklaces', href: '/collections/name-necklaces' },
        { label: 'Jewelry Gifts for Her', href: '/collections/jewelry-gifts-for-her' },
      ],
      faqs: [
        {
          q: 'What jewelry makes a meaningful anniversary gift?',
          a: 'Heart styles, initials, names, rings, bracelets, and couple-inspired pieces can make meaningful anniversary gifts when they connect to the relationship.',
        },
        {
          q: 'How do I choose anniversary jewelry?',
          a: 'Start with the recipient’s normal style, then choose one personal detail such as an initial, heart, name, or shared symbol.',
        },
      ],
    }),
  },
];

let after = null;
const products = [];
do {
  const data = gql(
    `query Products($after: String) {
      products(first: 250, after: $after, query: "vendor:'North & Pearl' status:active") {
        pageInfo { hasNextPage endCursor }
        nodes {
          id
          title
          handle
          status
          productType
          tags
          totalInventory
          variants(first: 1) { nodes { price compareAtPrice } }
          collections(first: 20) { nodes { handle title } }
          featuredMedia { preview { image { url width height } } }
        }
      }
    }`,
    { after },
  ).products;
  products.push(...data.nodes);
  after = data.pageInfo.hasNextPage ? data.pageInfo.endCursor : null;
} while (after);

const existingCollections = gql(
  `query Collections {
    collections(first: 250) {
      nodes { id title handle descriptionHtml productsCount { count } seo { title description } }
    }
  }`,
).collections.nodes;
const collectionByHandle = new Map(existingCollections.map((collection) => [collection.handle, collection]));

async function getCollectionProducts(collectionId) {
  const collectionProducts = [];
  let cursor = null;
  do {
    const data = gql(
      `query CollectionProducts($id: ID!, $after: String) {
        collection(id: $id) {
          products(first: 250, after: $after) {
            pageInfo { hasNextPage endCursor }
            nodes { id title handle status }
          }
        }
      }`,
      { id: collectionId, after: cursor },
    ).collection.products;
    collectionProducts.push(...data.nodes);
    cursor = data.pageInfo.hasNextPage ? data.pageInfo.endCursor : null;
  } while (cursor);
  return collectionProducts;
}

const results = [];

for (const plan of collectionPlans) {
  const scored = products
    .map((product) => ({ ...product, faradayScore: scoreProduct(product, plan.profile) }))
    .filter((product) => product.faradayScore >= 32)
    .sort((a, b) => b.faradayScore - a.faradayScore || a.title.localeCompare(b.title))
    .slice(0, plan.targetSize);

  if (scored.length < 8) {
    results.push({ handle: plan.handle, action: 'skipped', reason: `Only ${scored.length} eligible products.` });
    continue;
  }

  let collection = collectionByHandle.get(plan.handle);
  const input = {
    title: plan.title,
    handle: plan.handle,
    descriptionHtml: plan.descriptionHtml,
    sortOrder: plan.sortOrder,
    seo: plan.seo,
  };

  if (collection) {
    const updated = gql(
      `mutation CollectionUpdate($input: CollectionInput!) {
        collectionUpdate(input: $input) {
          collection { id title handle }
          userErrors { field message }
        }
      }`,
      { input: { id: collection.id, ...input } },
      true,
    ).collectionUpdate;
    if (updated.userErrors.length) throw new Error(`${plan.title}: ${JSON.stringify(updated.userErrors)}`);
    collection = { ...collection, ...updated.collection };
  } else {
    const created = gql(
      `mutation CollectionCreate($input: CollectionInput!) {
        collectionCreate(input: $input) {
          collection { id title handle }
          userErrors { field message }
        }
      }`,
      { input },
      true,
    ).collectionCreate;
    if (created.userErrors.length) throw new Error(`${plan.title}: ${JSON.stringify(created.userErrors)}`);
    collection = created.collection;
  }

  const currentProducts = await getCollectionProducts(collection.id);
  const desiredIds = new Set(scored.map((product) => product.id));
  const currentIds = new Set(currentProducts.map((product) => product.id));
  const remove = currentProducts.filter((product) => !desiredIds.has(product.id));
  const add = scored.filter((product) => !currentIds.has(product.id));

  for (let index = 0; index < remove.length; index += 50) {
    const chunk = remove.slice(index, index + 50);
    const removed = gql(
      `mutation RemoveProducts($id: ID!, $productIds: [ID!]!) {
        collectionRemoveProducts(id: $id, productIds: $productIds) { userErrors { field message } }
      }`,
      { id: collection.id, productIds: chunk.map((product) => product.id) },
      true,
    ).collectionRemoveProducts;
    if (removed.userErrors.length) throw new Error(`${plan.title} remove: ${JSON.stringify(removed.userErrors)}`);
  }

  for (let index = 0; index < add.length; index += 50) {
    const chunk = add.slice(index, index + 50);
    const added = gql(
      `mutation AddProducts($id: ID!, $productIds: [ID!]!) {
        collectionAddProducts(id: $id, productIds: $productIds) { userErrors { field message } }
      }`,
      { id: collection.id, productIds: chunk.map((product) => product.id) },
      true,
    ).collectionAddProducts;
    const realErrors = added.userErrors.filter((error) => !error.message.includes('already exists'));
    if (realErrors.length) throw new Error(`${plan.title} add: ${JSON.stringify(realErrors)}`);
  }

  const finalProducts = await getCollectionProducts(collection.id);
  results.push({
    handle: plan.handle,
    action: collectionByHandle.has(plan.handle) ? 'updated' : 'created',
    selected: scored.length,
    removed: remove.length,
    added: add.length,
    finalCount: finalProducts.length,
    topProducts: scored.slice(0, 10).map((product) => `${product.title} (${product.handle})`),
  });
}

const report = `# Faraday Buyer-Intent Collection Buildout

Date: ${today}

## Summary

Faraday built commercial, search-intent aligned landing collections using only active North & Pearl products. Gauss constraints were applied for real catalog membership and product availability. Kuhn constraints were applied through minimum image scoring. Curie/Lovelace constraints were applied by avoiding unsupported material, shipping, return, warranty, durability, and allergy claims.

## Collections Updated Or Created

${results
  .map((result) => {
    if (result.action === 'skipped') return `- ${result.handle}: skipped — ${result.reason}`;
    return `- ${result.handle}: ${result.action}; selected ${result.selected}; added ${result.added}; removed ${result.removed}; final products ${result.finalCount}`;
  })
  .join('\n')}

## Top Products By Collection

${results
  .filter((result) => result.topProducts)
  .map((result) => `### ${result.handle}\n${result.topProducts.map((product) => `- ${product}`).join('\n')}`)
  .join('\n\n')}

## SEO/CRO Reasoning

- These pages target high-commercial-intent queries where shoppers are already looking for gift categories, price bands, and personalization paths.
- Each page links to adjacent category pages so visitors can keep shopping instead of bouncing.
- Product grids remain the primary content; SEO descriptions are structured to support AI/search clarity without burying products.
- No fake ratings, fake discounts, unsupported material claims, or inventory claims were introduced.

## Risks And Follow-Up

- Data confidence is low because GA4 traffic volume is still early-stage.
- Collections should be monitored in Search Console after indexing and in GA4 for collection views, product clicks, add-to-cart activity, and revenue.
- Some supplier-origin images remain acceptable temporary assets and should be replaced with owner-approved or exact supplier assets before aggressive external promotion.
`;

writeFileSync(reportPath, report);
console.table(results.map(({ handle, action, selected, added, removed, finalCount, reason }) => ({ handle, action, selected, added, removed, finalCount, reason })));
console.log(`Report: ${reportPath}`);
