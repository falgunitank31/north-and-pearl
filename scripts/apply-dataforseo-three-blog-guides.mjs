import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-dataforseo-guides-'));

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

const link = (label, href) => `<a href="${href}">${label}</a>`;
const p = (text) => `<p>${text}</p>`;
const ul = (items) => `<ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;

function articleHtml(parts) {
  return parts.join('\n');
}

const articles = [
  {
    title: 'Charm Bracelet Guide: How to Choose a Meaningful Bracelet Gift',
    handle: 'charm-bracelet-guide',
    summary:
      'A practical guide to choosing a charm bracelet by style, recipient, occasion, and everyday wearability.',
    tags: ['gift guide', 'bracelets', 'charm bracelet', 'jewelry gifts', 'DataForSEO'],
    bodyHtml: articleHtml([
      p(
        `A charm bracelet works because it feels personal without needing to say too much. It can be playful, polished, sentimental, or simple enough for everyday wear. For North & Pearl shoppers, the best charm bracelet is the one that matches the recipient's style and the moment behind the gift.`
      ),
      p(
        `DataForSEO shows strong U.S. search demand around charm bracelets and personalized charm bracelets, so this guide is built for shoppers who are comparing styles and want a clear path from idea to purchase. Start with ${link('Bracelets', '/collections/bracelets')} if you already know the category, or browse ${link('Jewelry Gifts for Her', '/collections/jewelry-gifts-for-her')} if you are still choosing the gift direction.`
      ),
      '<h2>Quick answer: what makes a charm bracelet a good gift?</h2>',
      p(
        `A charm bracelet is a good gift when the charm detail feels connected to the recipient, the bracelet is easy to wear, and the style fits the occasion. Look for a design that feels intentional rather than overly busy, especially if the person usually wears minimal jewelry.`
      ),
      '<h2>Choose by recipient</h2>',
      ul([
        `For a partner: choose a heart, clover, floral, or keepsake-inspired bracelet that feels romantic without relying on exaggerated claims.`,
        `For mom: choose a bracelet with a soft, meaningful detail that can be worn with casual or dressier outfits.`,
        `For a friend or sister: choose a charm bracelet with personality, color, or a small symbol that feels fun and wearable.`,
        `For bridesmaids: choose a polished bracelet style that can work beyond the wedding day.`,
      ]),
      '<h2>Choose by bracelet style</h2>',
      p(
        `If the recipient likes a refined look, start with a clean charm, clover, or floral accent. If she likes a more expressive jewelry box, a mixed-charm or beaded bracelet can feel more personal. If you are unsure, a simple bracelet with one strong design detail is usually the safer gift choice.`
      ),
      p(
        `North & Pearl options to compare include the ${link('Polished Clover Bracelet', '/products/north-pearl-clover-bracelet-7425')}, ${link('Keepsake Letter Bracelet', '/products/north-pearl-letter-bracelet-4295')}, and ${link('Bloom Charm Bracelet', '/products/north-pearl-bloom-charm-bracelet')}. Product details vary by item, so review each product page before ordering.`
      ),
      '<h2>Best occasions for charm bracelets</h2>',
      ul([
        `Birthdays: choose a bracelet that feels connected to her personality or style.`,
        `Mother's Day: choose a meaningful charm or polished everyday bracelet.`,
        `Anniversaries: choose a keepsake-inspired design that feels symbolic but easy to wear.`,
        `Thank-you gifts: choose a bracelet that looks thoughtful without feeling too formal.`,
      ]),
      '<h2>Charm bracelet buying checklist</h2>',
      ul([
        `Does the bracelet match the recipient's usual jewelry style?`,
        `Is the charm detail visible enough to feel special?`,
        `Can the bracelet work with both everyday outfits and occasional dressing up?`,
        `Have you reviewed the product page for size, finish, personalization, and care details?`,
        `Is the gift message about the meaning of the piece, not an unsupported product claim?`,
      ]),
      '<h2>FAQ</h2>',
      '<h3>Are charm bracelets still popular?</h3>',
      p(
        `Yes. Charm bracelets remain popular because they can feel personal, collectible, and easy to gift. The strongest styles are wearable rather than overly complicated.`
      ),
      '<h3>What charm bracelet should I buy as a gift?</h3>',
      p(
        `Choose a charm bracelet that fits the recipient's personal style first. A refined charm bracelet is best for someone minimal, while a more detailed bracelet can work for someone who enjoys expressive jewelry.`
      ),
      '<h3>Can charm bracelets be personalized?</h3>',
      p(
        `Some bracelet styles include initials, letters, or symbolic details. Always check the product page for the exact personalization options available on that item.`
      ),
      '<h2>Shop charm bracelet gift ideas</h2>',
      p(
        `Browse ${link('Bracelets', '/collections/bracelets')}, ${link('Gifts Under $100', '/collections/gifts-under-100')}, and ${link('Jewelry Gifts for Her', '/collections/jewelry-gifts-for-her')} to compare giftable North & Pearl styles.`
      ),
    ]),
  },
  {
    title: 'Initial Necklace Guide: How to Choose a Letter Necklace',
    handle: 'initial-necklace-guide',
    summary:
      'A buyer-friendly guide to choosing an initial necklace by letter style, recipient, outfit use, and gifting occasion.',
    tags: ['gift guide', 'initial necklace', 'letter necklace', 'personalized jewelry', 'DataForSEO'],
    bodyHtml: articleHtml([
      p(
        `An initial necklace is one of the easiest personalized jewelry gifts to understand: one letter can represent a name, a partner, a child, a family member, or a private memory. The challenge is choosing a style that feels personal and wearable, not generic.`
      ),
      p(
        `DataForSEO shows strong U.S. search demand for initial necklaces, name necklaces, and custom name necklaces. That makes initial-necklace content important for North & Pearl because it connects discovery searches to a real shopping path. Start with ${link('Initial Necklaces', '/collections/initial-necklaces')} or browse the broader ${link('Personalized Jewelry', '/collections/personalized-jewelry')} collection.`
      ),
      '<h2>Quick answer: how do you choose an initial necklace?</h2>',
      p(
        `Choose the initial first, then choose the pendant style based on how the recipient dresses. A clean letter necklace is usually best for everyday wear, while a bolder pendant can feel more like a statement gift.`
      ),
      '<h2>Choose the right initial</h2>',
      ul([
        `Her own initial: the simplest choice and usually the safest for birthdays or self-gifting.`,
        `A partner's initial: a romantic option when the relationship meaning is clear.`,
        `A child's initial: a thoughtful option for moms and family-centered gifts.`,
        `A shared initial: a subtle option for couples or close friendships.`,
      ]),
      '<h2>Choose the pendant style</h2>',
      p(
        `Initial necklaces can feel minimal, vintage-inspired, polished, playful, or statement-making. If the recipient usually wears delicate jewelry, choose a smaller or cleaner letter style. If she likes pieces that draw attention, choose a pendant with more visual detail.`
      ),
      p(
        `North & Pearl styles to compare include the ${link('Charm Classic Initial Necklace', '/products/north-pearl-initial-necklace-5273')}, ${link('Initial Shell Necklace', '/products/north-pearl-initial-shell-necklace')}, and ${link('Charm Classic Letter Necklace', '/products/north-pearl-letter-necklace-6249')}. Review the product page for each item's exact options before ordering.`
      ),
      '<h2>Initial necklace gift ideas by occasion</h2>',
      ul([
        `Birthday: choose her own initial or a letter connected to a loved one.`,
        `Anniversary: choose an initial tied to the relationship.`,
        `Mother's Day: choose an initial connected to a child or family member.`,
        `Bridesmaid gift: choose each person's initial for a coordinated but individual gift.`,
        `Graduation or milestone: choose an initial necklace she can wear into the next chapter.`,
      ]),
      '<h2>What to check before ordering</h2>',
      ul([
        `Confirm the exact letter before checkout.`,
        `Review the chain, pendant, and variant options on the product page.`,
        `Check whether the piece is ready-to-order or personalized.`,
        `Read the product care notes before gifting.`,
        `Avoid assuming material, allergy, waterproof, or tarnish claims unless they are shown on the product page.`,
      ]),
      '<h2>FAQ</h2>',
      '<h3>Is an initial necklace a good gift?</h3>',
      p(
        `Yes. An initial necklace is a strong gift because it feels personal while still being easy to wear with everyday outfits.`
      ),
      "<h3>Should I choose her initial or someone else's?</h3>",
      p(
        `For a safe gift, choose her own initial. For a more emotional gift, choose the initial of a partner, child, or loved one when you know that meaning will be welcome.`
      ),
      '<h3>What is the difference between an initial necklace and a name necklace?</h3>',
      p(
        `An initial necklace uses one letter as the personal detail. A name necklace uses a full name or word. Both can feel meaningful, but initial necklaces are usually more subtle.`
      ),
      '<h2>Shop initial necklace styles</h2>',
      p(
        `Explore ${link('Initial Necklaces', '/collections/initial-necklaces')}, ${link('Name Necklaces', '/collections/name-necklaces')}, and ${link('Personalized Jewelry', '/collections/personalized-jewelry')} for meaningful letter and name styles.`
      ),
    ]),
  },
  {
    title: 'Birthstone Necklace Guide: Meaningful Jewelry Gifts by Month',
    handle: 'birthstone-necklace-guide',
    summary:
      'A claim-safe guide to choosing birthstone-inspired necklaces and color-accent jewelry for birthdays, moms, anniversaries, and meaningful gifts.',
    tags: ['gift guide', 'birthstone necklace', 'birthstone jewelry', 'jewelry gifts', 'DataForSEO'],
    bodyHtml: articleHtml([
      p(
        `A birthstone necklace is popular because it turns a birth month into a personal gift idea. The piece can celebrate a birthday, a child, a partner, a family member, or a milestone month. For North & Pearl, the safest way to shop this category is to focus on birth-month inspiration and visible design details while checking each product page for exact specifications.`
      ),
      p(
        `DataForSEO shows strong U.S. search demand for birthstone necklaces, birthstone jewelry, and birthstone necklace gifts. This guide is designed to help shoppers choose a meaningful piece without relying on unsupported gemstone, material, or quality claims. Start with ${link('Birthstone Jewelry', '/collections/birthstone-jewelry')} or browse ${link('Birthday Jewelry Gifts', '/collections/birthday-jewelry-gifts')} for occasion-led shopping.`
      ),
      '<h2>Quick answer: what is a birthstone necklace?</h2>',
      p(
        `A birthstone necklace is a necklace chosen to represent a birth month, often through a colored stone, crystal, charm, or birth-month inspired detail. Product materials and stone details vary, so the product page should be the source of truth for each item.`
      ),
      '<h2>Choose by meaning</h2>',
      ul([
        `For a birthday: choose the recipient's birth month or a color she naturally wears.`,
        `For mom: choose a piece inspired by a child or family member's birth month.`,
        `For an anniversary: choose the month of the relationship milestone.`,
        `For self-gifting: choose the month, color, or symbol that feels most personal.`,
      ]),
      '<h2>Choose by style</h2>',
      p(
        `Birthstone-inspired jewelry can be subtle or expressive. A delicate pendant works well for everyday wear, while a stronger color accent can feel more gift-forward. If the recipient usually wears minimal jewelry, choose a refined piece with one focal detail. If she enjoys layered jewelry, choose a pendant that can sit comfortably with other necklaces.`
      ),
      p(
        `North & Pearl pieces to compare include the ${link('Polished Love Pendant', '/products/north-pearl-heart-necklace-2948')}, ${link('Heart Keepsake Necklace', '/products/north-pearl-heart-keepsake-necklace')}, and ${link('Color Accent Cuff', '/products/north-pearl-color-accent-cuff')}. These links are shopping paths into color, symbol, and keepsake styles; always review the product page for exact item details.`
      ),
      '<h2>Birthstone necklace gift ideas</h2>',
      ul([
        `For January through March birthdays: choose deeper, cooler, or classic tones if the recipient likes understated styling.`,
        `For spring birthdays: floral, heart, and soft color details can feel seasonal and fresh.`,
        `For summer birthdays: choose pieces that feel bright, light, and easy to wear with simple outfits.`,
        `For fall and winter birthdays: choose polished keepsake styles that feel warm, dressy, or symbolic.`,
      ]),
      '<h2>What to check before buying birthstone-inspired jewelry</h2>',
      ul([
        `Confirm the birth month or color meaning before choosing the piece.`,
        `Check the product page for exact stone, crystal, charm, finish, or personalization information.`,
        `Review product images carefully so the color and scale match your expectation.`,
        `Do not assume sterling silver, gold vermeil, waterproof, hypoallergenic, or tarnish-free qualities unless the product page confirms them.`,
        `Choose a gift message that focuses on the meaning of the month rather than unverified product claims.`,
      ]),
      '<h2>FAQ</h2>',
      '<h3>Is birthstone jewelry a good birthday gift?</h3>',
      p(
        `Yes. Birthstone-inspired jewelry is a thoughtful birthday gift because it connects the piece to the recipient's birth month and personal story.`
      ),
      '<h3>Can birthstone jewelry be gifted to moms?</h3>',
      p(
        `Yes. Many shoppers choose birth-month inspired jewelry to represent a child, partner, or family milestone.`
      ),
      '<h3>How do I know the exact stone or material?</h3>',
      p(
        `Use the product page as the source of truth. If a product page does not confirm a material or stone detail, do not assume it.`
      ),
      '<h2>Shop birthstone-inspired jewelry</h2>',
      p(
        `Browse ${link('Birthstone Jewelry', '/collections/birthstone-jewelry')}, ${link('Birthday Jewelry Gifts', '/collections/birthday-jewelry-gifts')}, ${link('Gifts for Mom', '/collections/mothers-collection')}, and ${link('Jewelry Gifts for Her', '/collections/jewelry-gifts-for-her')} for meaningful North & Pearl gift ideas.`
      ),
    ]),
  },
];

function normalizeArticle(article) {
  return {
    title: article.title,
    handle: article.handle,
    body: article.bodyHtml,
    summary: `<p>${article.summary}</p>`,
    tags: article.tags,
    isPublished: true,
    author: { name: 'North & Pearl Editorial' },
  };
}

const blogs = gql(
  `query ExistingBlogs {
    blogs(first: 50) {
      nodes { id handle title articles(first: 100) { nodes { id handle title } } }
    }
  }`,
).blogs.nodes;

let blog = blogs.find((item) => item.handle === 'gift-guide');

if (!blog) {
  const result = gql(
    `mutation CreateBlog($blog: BlogCreateInput!) {
      blogCreate(blog: $blog) {
        blog { id handle title articles(first: 100) { nodes { id handle title } } }
        userErrors { field message }
      }
    }`,
    { blog: { title: 'Gift Guide', handle: 'gift-guide' } },
    true,
  ).blogCreate;

  if (result.userErrors.length) {
    throw new Error(`blogCreate: ${JSON.stringify(result.userErrors)}`);
  }
  blog = result.blog;
}

const articleByHandle = new Map((blog.articles?.nodes || []).map((article) => [article.handle, article]));
const changed = [];

for (const article of articles) {
  const input = normalizeArticle(article);
  const existing = articleByHandle.get(article.handle);

  if (existing) {
    const result = gql(
      `mutation UpdateArticle($id: ID!, $article: ArticleUpdateInput!) {
        articleUpdate(id: $id, article: $article) {
          article { id handle title }
          userErrors { field message }
        }
      }`,
      { id: existing.id, article: input },
      true,
    ).articleUpdate;

    if (result.userErrors.length) {
      throw new Error(`articleUpdate ${article.handle}: ${JSON.stringify(result.userErrors)}`);
    }
    changed.push({ action: 'updated', ...result.article });
  } else {
    const result = gql(
      `mutation CreateArticle($article: ArticleCreateInput!) {
        articleCreate(article: $article) {
          article { id handle title }
          userErrors { field message }
        }
      }`,
      { article: { ...input, blogId: blog.id } },
      true,
    ).articleCreate;

    if (result.userErrors.length) {
      throw new Error(`articleCreate ${article.handle}: ${JSON.stringify(result.userErrors)}`);
    }
    changed.push({ action: 'created', ...result.article });
  }
}

console.log(JSON.stringify({ changed }, null, 2));
