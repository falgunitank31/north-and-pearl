import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-copy-polish-'));

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

function productHtml({ intro, occasion, detail }) {
  return [
    `<p>${intro}</p>`,
    '<h3>Why it makes a meaningful gift</h3>',
    `<p>${occasion}</p>`,
    '<h3>Details</h3>',
    '<ul>',
    `<li>${detail}</li>`,
    '<li>Designed for thoughtful gifting, self-purchase, and everyday styling.</li>',
    '<li>Material notes are listed only when confirmed for this specific item.</li>',
    '</ul>',
    '<h3>Care</h3>',
    '<p>Store separately, keep dry when possible, and avoid direct contact with lotions, perfumes, and harsh cleaners.</p>',
  ].join('');
}

const productCopy = {
  'north-pearl-birthstone-name-necklace': productHtml({
    intro: 'A personalized name necklace concept with a birth-month inspired accent, created for gifts that feel personal without feeling overdone.',
    occasion: 'A strong choice for birthdays, mothers, daughters, anniversaries, and milestone moments.',
    detail: 'Personalization and birth-month options should be reviewed carefully before checkout.',
  }),
  'north-pearl-opal-pendant-necklace': productHtml({
    intro: 'A luminous opal-style pendant necklace with a soft, elegant look for everyday gifting.',
    occasion: 'A refined gift for birthdays, bridesmaids, sisters, anniversaries, or a simple just-because moment.',
    detail: 'Pendant and chain details are presented clearly on the product page when available.',
  }),
  'north-pearl-initial-shell-necklace': productHtml({
    intro: 'A polished initial necklace with a shell-inspired detail for subtle, personal everyday style.',
    occasion: 'An easy-to-love gift for bridesmaids, sisters, daughters, friends, birthdays, and layering.',
    detail: 'Choose the initial carefully and review available options before checkout.',
  }),
  'north-pearl-teardrop-birthstone-necklace': productHtml({
    intro: 'A teardrop birthstone-inspired pendant that adds color and meaning to a classic gift silhouette.',
    occasion: 'Perfect for birthdays, mothers, daughters, sisters, and milestone celebrations.',
    detail: 'Birth-month color availability should be selected from the current product options.',
  }),
  'north-pearl-minimal-water-drop-necklace': productHtml({
    intro: 'A minimal water-drop pendant necklace with clean everyday styling and a graceful gift-ready shape.',
    occasion: 'A thoughtful pick for birthdays, anniversaries, workwear gifts, and everyday jewelry lovers.',
    detail: 'Designed as a simple pendant style for low-friction gifting.',
  }),
  'north-pearl-pearl-collarbone-necklace': productHtml({
    intro: 'A delicate pearl-style collarbone necklace with a soft, feminine look for classic gifting.',
    occasion: 'A natural fit for bridesmaids, bridal showers, birthdays, sisters, and timeless everyday style.',
    detail: 'Pearl-style details and available options should be reviewed on the product page.',
  }),
  'north-pearl-stackable-gold-bracelet': productHtml({
    intro: 'A simple stackable bracelet designed for daily wear, gifting, and pairing with other meaningful pieces.',
    occasion: 'A versatile gift for birthdays, bridesmaids, sisters, friends, and self-gifting.',
    detail: 'A clean bracelet silhouette that works well alone or layered.',
  }),
  'north-pearl-classic-tennis-bracelet': productHtml({
    intro: 'A classic tennis bracelet style with polished sparkle for occasions that call for something refined.',
    occasion: 'A strong option for anniversaries, weddings, birthdays, bridal gifting, and milestone gifts.',
    detail: 'Stone-style details and sizing should be reviewed before purchase.',
  }),
  'north-pearl-heart-bangle-bracelet': productHtml({
    intro: 'A heart-accent bangle made for romantic, family, and everyday gifting moments.',
    occasion: 'A sweet choice for partners, mothers, daughters, anniversaries, and friendship gifts.',
    detail: 'Bangle fit and available options should be reviewed before checkout.',
  }),
  'north-pearl-letter-charm-bracelet': productHtml({
    intro: 'A letter charm bracelet that brings a small personal detail into an easy everyday accessory.',
    occasion: 'A giftable piece for birthdays, bridesmaids, sisters, daughters, and best friends.',
    detail: 'Select the letter or charm option carefully where available.',
  }),
  'north-pearl-crystal-gemstone-cuff': productHtml({
    intro: 'A crystal-style cuff bracelet with meaningful color and a polished statement look.',
    occasion: 'A thoughtful option for mothers, birthdays, milestone gifts, and customers who love color-forward jewelry.',
    detail: 'Color and stone-style details should be reviewed from the current product imagery and options.',
  }),
  'north-pearl-zircon-bracelet': productHtml({
    intro: 'A minimal zircon-style bracelet for everyday sparkle, gifting, and simple occasion dressing.',
    occasion: 'An accessible gift for birthdays, friends, sisters, and everyday jewelry shoppers.',
    detail: 'Designed as a low-profile bracelet with easy styling potential.',
  }),
  'north-pearl-emerald-statement-ring': productHtml({
    intro: 'A green stone-style statement ring with rich color and a polished gift-ready presence.',
    occasion: 'A memorable choice for birthdays, anniversaries, holidays, and customers who love standout rings.',
    detail: 'Ring sizing and stone-style details should be reviewed before checkout.',
  }),
  'north-pearl-moissanite-gift-ring': productHtml({
    intro: 'A bright stone-style gift ring with a refined, celebratory look.',
    occasion: 'A higher-impact gift option for anniversaries, birthdays, holidays, and special milestones.',
    detail: 'Stone-style and sizing details should be reviewed carefully before purchase.',
  }),
  'north-pearl-smooth-gold-ring': productHtml({
    intro: 'A smooth everyday ring with clean modern styling and an easy-to-wear silhouette.',
    occasion: 'A simple gift for birthdays, self-gifting, stacking, and everyday jewelry wardrobes.',
    detail: 'Review available ring sizes and finish options before checkout.',
  }),
  'north-pearl-geometric-drop-earrings': productHtml({
    intro: 'Geometric drop earrings with a polished shape for easy occasion dressing.',
    occasion: 'A graceful gift for birthdays, bridesmaids, weddings, dinners, and everyday elevated style.',
    detail: 'Earring size, backing, and comfort details should be reviewed from the product page.',
  }),
  'north-pearl-square-zircon-jewelry-set': productHtml({
    intro: 'A square zircon-style jewelry set created for coordinated, gift-ready sparkle.',
    occasion: 'A polished option for weddings, anniversaries, birthdays, bridesmaids, and formal occasions.',
    detail: 'Set components should be reviewed from the product imagery before checkout.',
  }),
  'north-pearl-bridal-water-drop-set': productHtml({
    intro: 'A water-drop necklace and earring set with a wedding-ready shape and elegant occasion feel.',
    occasion: 'A strong option for bridesmaids, bridal showers, rehearsal dinners, wedding guests, and formal gifting.',
    detail: 'Set components and styling details should be reviewed in the product gallery before purchase.',
  }),
};

const collectionCopy = {
  'best-sellers': 'A curated edit of North & Pearl pieces with strong gifting appeal, refined styling, and easy everyday meaning.',
  gifts: 'Giftable jewelry for birthdays, anniversaries, mothers, bridesmaids, partners, friends, and meaningful everyday moments.',
  'birthstone-jewelry': 'Birth-month inspired jewelry for customers who want color, symbolism, and a personal story behind the gift.',
  'wedding-bridesmaids': 'Elegant jewelry gifts for bridesmaids, bridal parties, wedding weekends, and formal celebration moments.',
  bracelets: 'Bracelets chosen for everyday styling, thoughtful gifting, and easy layering.',
  rings: 'Rings with polished silhouettes for self-gifting, birthdays, anniversaries, and occasion dressing.',
  earrings: 'Earrings selected for refined styling, gifting, and easy finishing touches.',
  necklaces: 'Necklaces for personalized gifts, everyday keepsakes, and meaningful milestones.',
};

const products = gql(`query Products {
  products(first: 100) {
    nodes { id title handle }
  }
}`).products.nodes;

for (const product of products.filter((item) => productCopy[item.handle])) {
  const result = gql(
    `mutation UpdateProductCopy($product: ProductUpdateInput!) {
      productUpdate(product: $product) {
        product { title handle }
        userErrors { field message }
      }
    }`,
    { product: { id: product.id, descriptionHtml: productCopy[product.handle] } },
    true,
  ).productUpdate;
  if (result.userErrors.length) {
    console.log(`product copy warning ${product.title}: ${JSON.stringify(result.userErrors)}`);
  } else {
    console.log(`polished product copy: ${product.title}`);
  }
}

const collections = gql(`query Collections {
  collections(first: 100) {
    nodes { id title handle }
  }
}`).collections.nodes;

for (const collection of collections.filter((item) => collectionCopy[item.handle])) {
  const result = gql(
    `mutation UpdateCollectionCopy($collection: CollectionUpdateInput!) {
      collectionUpdate(collection: $collection) {
        collection { title handle }
        userErrors { field message }
      }
    }`,
    { collection: { id: collection.id, descriptionHtml: `<p>${collectionCopy[collection.handle]}</p>` } },
    true,
  ).collectionUpdate;
  if (result.userErrors.length) {
    console.log(`collection copy warning ${collection.title}: ${JSON.stringify(result.userErrors)}`);
  } else {
    console.log(`polished collection copy: ${collection.title}`);
  }
}
