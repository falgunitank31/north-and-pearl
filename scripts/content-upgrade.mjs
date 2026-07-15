import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-content-'));

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
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function productHtml(product) {
  const detail = product.detail || 'a personal detail';
  return [
    `<p>${product.short}</p>`,
    `<h3>Why it feels meaningful</h3>`,
    `<p>${product.long}</p>`,
    `<h3>Personalization</h3>`,
    `<p>Add ${detail}. Review spelling, dates, initials, coordinates, and gift notes carefully before checkout because personalized details are prepared from the information entered.</p>`,
    `<h3>Gift notes</h3>`,
    `<p>${product.gift}</p>`,
    `<h3>Materials and care</h3>`,
    `<p>Material details are shown only after supplier confirmation and owner approval. Store jewelry separately, keep it away from harsh cleaners, and follow product-specific care details when listed.</p>`,
    `<h3>Before ordering</h3>`,
    `<p>Production timing, personalization limits, dimensions, and packaging options should be reviewed on the finalized product page before purchase.</p>`,
  ].join('');
}

const products = [
  ['Custom Name Necklace', 'A personalized name necklace made to carry the word, name, or memory that matters most.', 'Designed as a thoughtful everyday keepsake, this necklace turns a meaningful name into a gift that feels specific, wearable, and easy to love.', 'Best for birthdays, anniversaries, bridesmaids, mothers, partners, and meaningful self-gifting.', 'a name, word, or short phrase', 79, 99, ['personalized', 'name-necklace', 'gift-for-her', 'birthday', 'anniversary']],
  ['Initial Pendant Necklace', 'A minimal initial necklace for subtle, personal everyday style.', 'A refined initial pendant makes personalization feel quiet and elegant, whether it represents a first name, last name, child, partner, or private reminder.', 'Best for birthdays, bridesmaids, sisters, partners, mothers, and everyday layering.', 'one initial', 59, 75, ['personalized', 'initial-necklace', 'minimal-jewelry', 'gift-for-her']],
  ['Birthstone Name Necklace', 'A name necklace with birth-month inspired detail for a more layered gift.', 'This piece combines name personalization with birth-month meaning, making it especially thoughtful for birthdays, mothers, daughters, and milestone moments.', 'Best for birthdays, family gifts, mothers, daughters, partners, and milestone gifting.', 'a name and birth month', 89, 115, ['birthstone', 'name-necklace', 'personalized', 'mother-gift']],
  ['Personalized Bar Necklace', 'A clean bar necklace for names, dates, coordinates, or a short meaningful phrase.', 'Modern and understated, the bar silhouette gives customers room to carry a date, place, name, or phrase close in an easy everyday shape.', 'Best for anniversaries, couples, bridesmaids, mothers, and personal milestones.', 'engraving text', 69, 89, ['engraved', 'bar-necklace', 'personalized', 'anniversary']],
  ['Coordinates Necklace', 'A personalized necklace made to remember a meaningful place.', 'Coordinates make a gift feel anchored to a real memory: where you met, where home began, where a wedding happened, or where a new chapter started.', 'Best for anniversaries, weddings, long-distance relationships, travel memories, and new homes.', 'coordinates or a location note', 79, 99, ['coordinates', 'personalized', 'anniversary', 'couple-gift']],
  ['Couple Name Necklace', 'A personalized couple necklace concept for names, initials, or relationship milestones.', 'Made for shared meaning, this piece helps customers celebrate two names, a date, or a relationship detail without feeling overly complicated.', 'Best for anniversaries, partners, Valentine gifting, weddings, and relationship milestones.', 'two names, initials, or a date', 89, 115, ['couple-jewelry', 'personalized', 'anniversary', 'gift-for-partner']],
  ['Mama Name Necklace', 'A personalized necklace designed to celebrate mothers, children, and family meaning.', 'A family-centered keepsake for names, initials, or birth-month inspired details that represent the people closest to her.', 'Best for Mother’s Day, new moms, birthdays, baby showers, and family milestones.', 'children’s names or family initials', 89, 115, ['mama-necklace', 'mother-gift', 'personalized', 'mothers-day']],
  ['Engraved Heart Necklace', 'A heart necklace concept for initials, names, dates, or a short message.', 'The heart shape gives emotional weight to a simple engraving, making it easy to position as a romantic, family, or friendship gift.', 'Best for partners, mothers, daughters, anniversaries, birthdays, and sentimental keepsakes.', 'initials, a date, or a short note', 69, 89, ['heart-necklace', 'engraved', 'personalized', 'gift-for-her']],
  ['Birth Flower Necklace', 'A birth flower inspired necklace for personal meaning by month.', 'Birth flower symbolism gives customers a soft, floral way to personalize a gift without relying only on names or initials.', 'Best for birthdays, mothers, sisters, daughters, and thoughtful milestone gifts.', 'birth month or flower option', 79, 99, ['birth-flower', 'personalized', 'birthday-gift', 'mother-gift']],
  ['Custom Name Bracelet', 'A personalized bracelet designed for a name, word, or meaningful detail.', 'A bracelet keeps personalization visible in daily movement, making it a strong choice for gift buyers who want something personal but easy to wear.', 'Best for birthdays, bridesmaids, mothers, partners, and everyday gifts.', 'a name or short word', 59, 79, ['name-bracelet', 'personalized', 'gift-for-her']],
  ['Initial Bracelet', 'A minimal initial bracelet for a subtle personalized gift.', 'Simple, delicate, and easy to stack, this bracelet gives customers a smaller personalization option that still feels intentional.', 'Best for bridesmaids, sisters, friends, daughters, and everyday personal style.', 'one initial', 49, 65, ['initial-bracelet', 'personalized', 'minimal-jewelry']],
  ['Engraved Couple Bracelet', 'A personalized bracelet for names, dates, initials, or meaningful couple details.', 'This bracelet gives couples a wearable way to mark a date, name, or shared detail with understated personalization.', 'Best for anniversaries, partners, weddings, Valentine gifting, and relationship milestones.', 'names, initials, or a date', 69, 89, ['couple-bracelet', 'engraved', 'anniversary', 'personalized']],
  ['Personalized Ring', 'A personalized ring concept for initials, names, dates, or meaningful symbols.', 'Compact and sentimental, a personalized ring works for customers who want an everyday reminder with subtle emotional value.', 'Best for birthdays, anniversaries, partners, sisters, mothers, and self-gifting.', 'an initial, name, or date', 59, 79, ['personalized-ring', 'gift-for-her', 'anniversary']],
  ['Birthstone Ring', 'A birthstone-inspired ring for birthdays, mothers, and milestone gifting.', 'A birth-month inspired detail makes this ring feel tied to a person, family story, or milestone without requiring a long inscription.', 'Best for birthday gifts, mothers, daughters, sisters, and milestone moments.', 'birth month', 69, 89, ['birthstone-ring', 'birthday-gift', 'mother-gift']],
  ['Initial Stud Earrings', 'Initial stud earrings designed for subtle personalization and everyday gifting.', 'Small but personal, initial studs are an easy entry point for customers who want a low-profile personalized jewelry gift.', 'Best for birthdays, teens, sisters, bridesmaids, friends, and everyday styling.', 'one initial', 39, 55, ['initial-earrings', 'stud-earrings', 'personalized']],
  ['Custom Hoop Earrings', 'Personalized hoop earrings concept for initials or meaningful details.', 'Hoops give personalization a more modern shape, making them a strong option for customers who want something expressive but still wearable.', 'Best for birthdays, friends, sisters, partners, and modern everyday gifting.', 'initials or product-specific details', 59, 79, ['hoop-earrings', 'personalized', 'gift-for-her']],
  ['Bridesmaid Gift Necklace', 'A gift-ready necklace concept for bridesmaids, maid of honor, and wedding thank-you moments.', 'Designed for coordinated gifting, this necklace helps brides give something personal without losing the clean, elevated look of the bridal party.', 'Best for bridesmaids, maid of honor gifts, mother of the bride, and bridal party thank-you moments.', 'an initial, name, or wedding detail', 69, 89, ['bridesmaid-gift', 'wedding', 'personalized']],
  ["Mother's Day Gift Set", 'A Mother’s Day gift set concept built around personalized jewelry and gift-ready presentation.', 'This set is positioned around family meaning and a more complete gifting moment for mothers, grandmothers, and mother figures.', 'Best for Mother’s Day, birthdays, new moms, grandmothers, and family milestones.', 'family names, initials, or gift notes', 99, 129, ['mothers-day', 'mother-gift', 'gift-set', 'personalized']],
  ['Luxury Jewelry Gift Box', 'A premium gift box add-on concept for a more elevated jewelry gifting experience.', 'The gift box helps turn a jewelry order into a more complete presentation moment, especially for birthdays, anniversaries, weddings, and Mother’s Day.', 'Best as an add-on for customers who want a more finished gifting experience.', 'gift message when available', 14.99, 19.99, ['gift-box', 'packaging', 'upsell']],
  ['Digital Gift Card', 'A flexible gift for someone who wants to choose their own meaningful piece.', 'The digital gift card solves uncertainty around style, personalization, size, or timing while keeping the gift focused on meaningful jewelry.', 'Best for last-minute gifting, uncertain sizing, corporate gifting, and recipients who prefer to choose.', 'the gift card value', 25, null, ['gift-card', 'last-minute-gift']],
].map(([title, short, long, gift, detail, price, compareAtPrice, tags]) => ({
  title,
  handle: handleize(title),
  short,
  long,
  gift,
  detail,
  price,
  compareAtPrice,
  tags,
  seo: {
    title: `${title} | Personalized Jewelry Gifts | North & Pearl`,
    description: `${short} Shop gift-ready personalized jewelry from North & Pearl. Material details are product-specific and confirmed before final claims.`,
  },
}));

const collectionSetup = JSON.parse(readFileSync('content/collections/collection-setup.json', 'utf8'));
const collections = collectionSetup.collections.filter((collection) => collection.handle !== 'all');

const articles = [
  {
    title: 'Best Personalized Jewelry Gifts for Her',
    handle: 'best-personalized-jewelry-gifts-for-her',
    summary: 'A practical guide to choosing meaningful personalized jewelry gifts by recipient, occasion, and style.',
    tags: ['gift guide', 'personalized jewelry', 'gifts for her'],
    body: '<p>Personalized jewelry works because it turns a gift into something specific: a name, an initial, a date, a place, or a reminder that belongs to the recipient.</p><h2>Start with the recipient</h2><p>For partners, choose romantic details like dates, coordinates, initials, or names. For mothers, family names, birth-month inspired details, and meaningful sets often feel more personal. For bridesmaids, choose coordinated pieces with a small individualized detail.</p><h2>Match the gift to the moment</h2><p>Birthdays work well with initials, birth-month inspired pieces, and name necklaces. Anniversaries are a natural fit for dates, coordinates, and couple jewelry. Mother’s Day is strongest when the piece connects to children or family meaning.</p><h2>Keep product details honest</h2><p>Always review product-specific materials, personalization limits, care guidance, and production timing before checkout.</p>',
  },
  {
    title: 'How to Choose a Name Necklace',
    handle: 'how-to-choose-a-name-necklace',
    summary: 'Learn how to choose a name necklace based on name length, style, gifting intent, and everyday wear.',
    tags: ['name necklaces', 'personalized jewelry', 'gift guide'],
    body: '<p>A name necklace is one of the most direct forms of personalized jewelry. The best choice balances meaning, readability, and everyday wearability.</p><h2>Think about name length</h2><p>Short names and words often feel delicate and easy to wear. Longer names may need a product with more room or a clearer script style, so always check product-specific character limits.</p><h2>Choose the meaning first</h2><p>The name can represent the recipient, a child, a partner, a family name, or a word that holds personal meaning.</p><h2>Review the details</h2><p>Before checkout, confirm spelling, capitalization, product options, care details, and any production timing shown on the product page.</p>',
  },
  {
    title: 'Birthstone Jewelry Gift Guide',
    handle: 'birthstone-jewelry-gift-guide',
    summary: 'A guide to birth-month inspired jewelry gifts for birthdays, mothers, family milestones, and anniversaries.',
    tags: ['birthstone jewelry', 'birthday gifts', 'mother gifts'],
    body: '<p>Birthstone-inspired jewelry adds a layer of meaning by connecting a piece to a month, birthday, child, or family story.</p><h2>Best occasions</h2><p>Birth-month details work especially well for birthdays, Mother’s Day, new moms, family milestones, and anniversary gifts.</p><h2>Pair with personalization</h2><p>A name, initial, or date can make a birth-month inspired piece feel even more specific.</p><h2>Confirm product facts</h2><p>Exact stones, crystals, colors, and materials should be verified on the product page before purchase. North & Pearl avoids material claims unless they are confirmed.</p>',
  },
  {
    title: 'Bridesmaid Jewelry Gift Ideas',
    handle: 'bridesmaid-jewelry-gift-ideas',
    summary: 'Original bridesmaid jewelry gift ideas for coordinated, personal, and meaningful bridal party thank-you moments.',
    tags: ['bridesmaid gifts', 'wedding jewelry', 'gift guide'],
    body: '<p>Bridesmaid jewelry should feel coordinated enough for the wedding and personal enough to be worn afterward.</p><h2>Choose a shared style</h2><p>Start with one jewelry type, such as a necklace or bracelet, then personalize each piece with an initial, name, date, or gift note.</p><h2>Think beyond the wedding day</h2><p>The best bridesmaid gifts feel useful after the event. Minimal initial jewelry and simple personalized pieces are easier to wear every day.</p><h2>Plan timing carefully</h2><p>Personalized gifts may require production time, so order samples or final gifts early once product details are approved.</p>',
  },
  {
    title: 'Personalized Jewelry for Mother’s Day',
    handle: 'personalized-jewelry-for-mothers-day',
    summary: 'A Mother’s Day gift guide for name jewelry, initials, birth-month inspired pieces, and family keepsakes.',
    tags: ['mothers day gifts', 'mother gifts', 'personalized jewelry'],
    body: '<p>Mother’s Day jewelry is strongest when it reflects family meaning. Names, initials, children’s birth months, and thoughtful gift notes can make a simple piece feel deeply personal.</p><h2>Gift ideas for moms</h2><p>Mama name necklaces, birth flower or birth-month inspired pieces, initial jewelry, and personalized gift sets all work well for mothers and mother figures.</p><h2>Make it feel complete</h2><p>Consider a gift box, note, and care instructions to turn the jewelry into a more polished gifting moment.</p><h2>Review before checkout</h2><p>Check spelling, product options, materials, and production timing before placing a personalized order.</p>',
  },
];

const existingProducts = gql(`query ExistingProducts { products(first: 100) { nodes { id handle title } } }`).products.nodes;
const productByHandle = new Map(existingProducts.map((product) => [product.handle, product]));

for (const product of products) {
  const existing = productByHandle.get(product.handle);
  if (!existing) {
    console.log(`missing product: ${product.title}`);
    continue;
  }
  const res = gql(
    `mutation UpdateProduct($product: ProductUpdateInput!) {
      productUpdate(product: $product) {
        product { id handle title }
        userErrors { field message }
      }
    }`,
    {
      product: {
        id: existing.id,
        descriptionHtml: productHtml(product),
        tags: product.tags,
        templateSuffix: product.tags.includes('personalized') || product.tags.includes('engraved') || product.tags.includes('coordinates') ? 'personalized' : null,
        seo: product.seo,
      },
    },
    true,
  ).productUpdate;
  if (res.userErrors.length) console.log(`product warning ${product.title}: ${JSON.stringify(res.userErrors)}`);
  else console.log(`updated product: ${product.title}`);
}

const existingCollections = gql(`query ExistingCollections { collections(first: 100) { nodes { id handle title } } }`).collections.nodes;
const collectionByHandle = new Map(existingCollections.map((collection) => [collection.handle, collection]));

for (const collection of collections) {
  const existing = collectionByHandle.get(collection.handle);
  if (!existing) {
    console.log(`missing collection: ${collection.title}`);
    continue;
  }
  const res = gql(
    `mutation UpdateCollection($collection: CollectionUpdateInput!) {
      collectionUpdate(collection: $collection) {
        collection { id handle title }
        userErrors { field message }
      }
    }`,
    {
      collection: {
        id: existing.id,
        descriptionHtml: `<p>${collection.description}</p>`,
        seo: {
          title: collection.seo_title,
          description: collection.meta_description,
        },
      },
    },
    true,
  ).collectionUpdate;
  if (res.userErrors.length) console.log(`collection warning ${collection.title}: ${JSON.stringify(res.userErrors)}`);
  else console.log(`updated collection: ${collection.title}`);
}

const existingBlogs = gql(`query ExistingBlogs { blogs(first: 50) { nodes { id handle title articles(first: 50) { nodes { id handle title } } } } }`).blogs.nodes;
let blog = existingBlogs.find((item) => item.handle === 'gift-guide');
if (!blog) {
  const created = gql(
    `mutation CreateBlog($blog: BlogCreateInput!) {
      blogCreate(blog: $blog) {
        blog { id handle title articles(first: 50) { nodes { id handle title } } }
        userErrors { field message }
      }
    }`,
    { blog: { title: 'Gift Guide', handle: 'gift-guide' } },
    true,
  ).blogCreate;
  if (created.userErrors.length) throw new Error(`blogCreate: ${JSON.stringify(created.userErrors)}`);
  blog = created.blog;
  console.log('created blog: Gift Guide');
} else {
  console.log('exists blog: Gift Guide');
}

const articleByHandle = new Map((blog.articles?.nodes || []).map((article) => [article.handle, article]));
for (const article of articles) {
  const existing = articleByHandle.get(article.handle);
  const articleInput = {
    title: article.title,
    handle: article.handle,
    body: article.body,
    summary: `<p>${article.summary}</p>`,
    tags: article.tags,
    isPublished: true,
    author: { name: 'North & Pearl Editorial' },
  };
  if (existing) {
    const updated = gql(
      `mutation UpdateArticle($id: ID!, $article: ArticleUpdateInput!) {
        articleUpdate(id: $id, article: $article) {
          article { id handle title }
          userErrors { field message }
        }
      }`,
      { id: existing.id, article: articleInput },
      true,
    ).articleUpdate;
    if (updated.userErrors.length) console.log(`article warning ${article.title}: ${JSON.stringify(updated.userErrors)}`);
    else console.log(`updated article: ${article.title}`);
  } else {
    const created = gql(
      `mutation CreateArticle($article: ArticleCreateInput!) {
        articleCreate(article: $article) {
          article { id handle title }
          userErrors { field message }
        }
      }`,
      { article: { ...articleInput, blogId: blog.id } },
      true,
    ).articleCreate;
    if (created.userErrors.length) console.log(`article warning ${article.title}: ${JSON.stringify(created.userErrors)}`);
    else console.log(`created article: ${article.title}`);
  }
}

console.log('North & Pearl content upgrade complete.');
