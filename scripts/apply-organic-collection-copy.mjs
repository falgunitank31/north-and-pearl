import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-collection-copy-'));

const updates = {
  'best-sellers': {
    seoTitle: 'Curated Jewelry Gifts | North & Pearl',
    meta: 'Shop North & Pearl jewelry gifts selected for meaningful birthdays, anniversaries, mothers, bridesmaids, couples, and everyday moments.',
    html: `
      <p>Discover North &amp; Pearl pieces selected for meaningful gifting, everyday polish, and memorable moments. This collection brings together jewelry styles that are easy to browse by occasion, recipient, and personal meaning, from sentimental necklaces to gift-ready bracelets, rings, earrings, and coordinated sets.</p>
      <p>The best jewelry gift is the one that feels personal to the person receiving it. Start with a style the recipient already wears often, then choose a piece with a shape, initial, heart, flower, pearl-style detail, or other visual meaning that fits the moment.</p>
      <h2>Choosing a meaningful jewelry gift</h2>
      <p>Use this collection as a starting point for birthdays, anniversaries, Mother’s Day, bridesmaid gifts, friendship gifts, and thoughtful self-gifting. For more help, explore Gifts, Necklaces, Bracelets, and the Personalized Jewelry Guide.</p>
    `,
  },
  gifts: {
    seoTitle: 'Jewelry Gifts for Her | North & Pearl',
    meta: 'Find elegant jewelry gifts for birthdays, anniversaries, mothers, bridesmaids, couples, friends, sisters, and meaningful everyday moments.',
    html: `
      <p>Find jewelry gifts chosen for the moments people remember: birthdays, anniversaries, Mother’s Day, bridesmaids, weddings, friendship, and everyday appreciation. North &amp; Pearl focuses on elegant, meaningful pieces that feel thoughtful without requiring complicated choices.</p>
      <h2>How to choose a jewelry gift</h2>
      <p>Start with the recipient first. A minimalist necklace can feel effortless for everyday wear, a bracelet can be easy to size and layer, earrings make polished gifts for many occasions, and rings can feel especially personal when sizing is known. For sentimental occasions, explore hearts, initials, names, flowers, birth-month inspiration, and coordinated jewelry sets.</p>
      <p>Review each product page for images, variant options, personalization fields, care guidance, shipping details, and return information before checkout.</p>
    `,
  },
  necklaces: {
    seoTitle: 'Necklaces for Meaningful Jewelry Gifts | North & Pearl',
    meta: 'Shop elegant necklaces selected for meaningful gifts, birthdays, anniversaries, mothers, bridesmaids, partners, and everyday styling.',
    html: `
      <p>Explore North &amp; Pearl necklaces selected for meaningful gifting, everyday styling, and personal expression. From initials and hearts to flower, pearl-style, and pendant designs, this collection helps shoppers find pieces for birthdays, anniversaries, mothers, bridesmaids, partners, and self-gifting.</p>
      <h2>Find the right necklace style</h2>
      <p>Choose a necklace by occasion, recipient, and wearability. A pendant can feel personal without being complicated, while initial, name, heart, or birth-month-inspired styles can add a more sentimental layer. Product-specific materials, dimensions, finishes, and care details should be reviewed on each product page.</p>
    `,
  },
  bracelets: {
    seoTitle: 'Bracelets for Meaningful Jewelry Gifts | North & Pearl',
    meta: 'Shop bracelets selected for layering, gifting, birthdays, mothers, friends, sisters, bridesmaids, and thoughtful everyday style.',
    html: `
      <p>Shop North &amp; Pearl bracelets chosen for layering, gifting, and everyday meaning. Explore charm, bangle, cuff, bead, crystal-accent, floral, and link-inspired styles for birthdays, mothers, friends, sisters, bridesmaids, and thoughtful self-gifting.</p>
      <h2>Bracelet gift ideas</h2>
      <p>Bracelets can be easy to gift because many styles are simple to layer and style. Choose a design that fits the recipient’s everyday look, then review product-specific sizing, closure, materials, finish, and care details before ordering.</p>
    `,
  },
  rings: {
    seoTitle: 'Rings for Meaningful Jewelry Gifts | North & Pearl',
    meta: 'Explore giftable rings selected for birthdays, anniversaries, self-gifting, everyday styling, and meaningful personal moments.',
    html: `
      <p>Explore North &amp; Pearl rings selected for visual meaning, polished style, and giftable moments. Rings can feel especially personal for birthdays, anniversaries, milestones, and self-gifting.</p>
      <h2>Before gifting a ring</h2>
      <p>Because ring sizing and stone or material details can vary by product, review each product page carefully before ordering. If size is uncertain, consider necklaces, bracelets, earrings, or gift cards as lower-risk gift options.</p>
    `,
  },
  earrings: {
    seoTitle: 'Earrings for Everyday Jewelry Gifts | North & Pearl',
    meta: 'Shop earrings selected for polished everyday wear, birthdays, bridesmaids, friends, sisters, and thoughtful jewelry gifts.',
    html: `
      <p>Shop North &amp; Pearl earrings selected for polished everyday wear, occasion styling, and easy gifting. Explore heart, curve, drop, hoop-inspired, and modern styles for birthdays, bridesmaids, friends, sisters, and self-gifting.</p>
      <h2>Earrings as a gift</h2>
      <p>Earrings can be a thoughtful choice when you want a gift that feels polished and easy to wear. Review product photos, closure details when available, care notes, and product-specific material information before ordering. North &amp; Pearl does not make allergy-related claims unless verified for the exact item.</p>
    `,
  },
  'name-necklaces': {
    seoTitle: 'Name Necklaces | North & Pearl',
    meta: 'Create a meaningful name necklace gift for birthdays, anniversaries, mothers, bridesmaids, partners, family, and self-gifting.',
    html: `
      <p>Name necklaces turn a word, name, or personal detail into a piece that feels close to the heart. Explore North &amp; Pearl name necklace styles for birthdays, anniversaries, mothers, bridesmaids, couples, family gifts, and meaningful self-expression.</p>
      <h2>What to put on a name necklace</h2>
      <p>A name necklace can celebrate a person, relationship, child, partner, family name, milestone, or meaningful word. Before ordering, confirm the exact spelling, capitalization, variant selection, and any product-specific personalization instructions.</p>
    `,
  },
  'initial-necklaces': {
    seoTitle: 'Initial Necklaces | North & Pearl',
    meta: 'Shop initial necklaces for subtle personalized style, birthdays, bridesmaids, partners, sisters, mothers, and everyday gifting.',
    html: `
      <p>Initial necklaces offer subtle personalization with everyday wearability. Explore initial-inspired styles for birthdays, bridesmaids, partners, sisters, mothers, and meaningful self-gifting.</p>
      <h2>Choosing an initial necklace</h2>
      <p>Choose a letter that represents the recipient, a child, a partner, a family name, or a meaningful personal detail. Review product-specific images, variants, care notes, and personalization instructions before checkout.</p>
    `,
  },
  'birthstone-jewelry': {
    seoTitle: 'Birthstone-Inspired Jewelry Gifts | North & Pearl',
    meta: 'Shop birthstone-inspired jewelry gifts for birthdays, mothers, anniversaries, family milestones, and meaningful personal moments.',
    html: `
      <p>Birthstone-inspired jewelry connects a piece to a month, memory, or person. Explore meaningful styles for birthdays, mothers, anniversaries, family gifts, and milestone moments, with product-specific details confirmed on each item page.</p>
      <h2>Birth-month meaning</h2>
      <p>Birthstone-inspired jewelry is often chosen because it gives a gift a layer of personal meaning. A birth-month color or accent can represent a birthday, child, partner, parent, or important date. Exact stones, materials, finishes, and settings can vary by product, so confirm details on the individual product page.</p>
    `,
  },
  'mothers-collection': {
    seoTitle: 'Jewelry Gifts for Mom | North & Pearl',
    meta: 'Find meaningful jewelry gifts for moms, mother figures, grandmothers, family milestones, Mother’s Day, birthdays, and everyday love.',
    html: `
      <p>Find meaningful jewelry gifts for moms, mother figures, grandmothers, and family milestones. Explore pieces with names, initials, hearts, flowers, birth-month inspiration, and elegant everyday styling.</p>
      <h2>Meaningful gifts for mothers</h2>
      <p>Jewelry for mom often feels most thoughtful when it connects to family, a child, a meaningful date, a shared memory, or a style she can wear often. Review personalization details, product images, care notes, and shipping information before ordering.</p>
    `,
  },
  'wedding-bridesmaids': {
    seoTitle: 'Bridesmaid Jewelry Gifts | North & Pearl',
    meta: 'Shop jewelry gifts for bridesmaids, bridal parties, wedding weekends, maid of honor gifts, and meaningful thank-you moments.',
    html: `
      <p>Explore jewelry gifts for bridesmaids, bridal parties, wedding weekends, and thank-you moments. Choose coordinated, personal, or easy-to-wear pieces that feel thoughtful without overwhelming the recipient.</p>
      <h2>Choosing bridesmaid jewelry</h2>
      <p>Bridesmaid jewelry can match across the group or reflect each person’s style. Initials, simple necklaces, bracelets, earrings, and coordinated sets can all work well. For group orders, review timing and product-specific details carefully before checkout.</p>
    `,
  },
  'couple-jewelry': {
    seoTitle: 'Couple Jewelry Gifts | North & Pearl',
    meta: 'Explore jewelry gifts for couples, partners, anniversaries, milestones, shared memories, hearts, names, dates, and meaningful moments.',
    html: `
      <p>Explore jewelry gifts for couples, partners, anniversaries, milestones, and shared memories. Choose heart, name, date, charm, and meaningful styles that connect the piece to the relationship.</p>
      <h2>Anniversary and couple gift ideas</h2>
      <p>A couple jewelry gift can reflect a date, name, place, milestone, or symbol that matters to both people. Keep personalization accurate, review product-specific options, and choose a style that fits the recipient’s daily wear.</p>
    `,
  },
};

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

const handles = Object.keys(updates);
const collections = gql(
  `query CollectionsForCopy($query: String!) {
    collections(first: 100, query: $query) {
      nodes { id title handle descriptionHtml seo { title description } }
    }
  }`,
  { query: handles.map((handle) => `handle:${handle}`).join(' OR ') },
).collections.nodes;

const collectionByHandle = new Map(collections.map((collection) => [collection.handle, collection]));
const changed = [];

for (const handle of handles) {
  const collection = collectionByHandle.get(handle);
  if (!collection) {
    console.log(`missing collection: ${handle}`);
    continue;
  }

  const update = updates[handle];
  const result = gql(
    `mutation UpdateCollectionCopy($collection: CollectionInput!) {
      collectionUpdate(input: $collection) {
        collection { id title handle seo { title description } }
        userErrors { field message }
      }
    }`,
    {
      collection: {
        id: collection.id,
        descriptionHtml: update.html.replace(/\n\s+/g, '\n').trim(),
        seo: {
          title: update.seoTitle,
          description: update.meta,
        },
      },
    },
    true,
  ).collectionUpdate;

  if (result.userErrors.length) {
    console.log(`warning ${collection.title}: ${JSON.stringify(result.userErrors)}`);
  } else {
    changed.push({
      title: result.collection.title,
      handle: result.collection.handle,
      seoTitle: result.collection.seo.title,
    });
    console.log(`updated collection: ${result.collection.title}`);
  }
}

console.table(changed);
