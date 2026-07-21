import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-organic-guides-'));

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

function paragraphs(items) {
  return items.map((item) => `<p>${item}</p>`).join('\n');
}

function list(items) {
  return `<ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
}

function guideHtml({ intro, sections, cta }) {
  return [
    paragraphs(intro),
    ...sections.map((section) => [
      `<h2>${section.heading}</h2>`,
      section.body ? paragraphs(section.body) : '',
      section.items ? list(section.items) : '',
    ].join('\n')),
    `<h2>Shop the guide</h2>`,
    paragraphs([cta]),
  ].join('\n');
}

const guides = [
  {
    title: 'Best Personalized Jewelry Gifts for Her',
    handle: 'best-personalized-jewelry-gifts-for-her',
    summary: 'A practical North & Pearl guide to choosing meaningful personalized jewelry gifts by recipient, occasion, and style.',
    tags: ['gift guide', 'personalized jewelry', 'gifts for her', 'organic launch'],
    bodyHtml: guideHtml({
      intro: [
        'The best personalized jewelry gift feels specific to the person receiving it. It can carry a name, an initial, a date, a birth-month inspired detail, a heart, a flower, or simply a style that reminds them of an important moment.',
        'This guide is designed for thoughtful gift buyers who want something elegant, personal, and easy to wear. Use it to narrow the choice by recipient, occasion, and the kind of meaning you want the piece to hold.',
      ],
      sections: [
        {
          heading: 'Quick answer: what makes a jewelry gift feel personal?',
          body: [
            'A jewelry gift feels personal when it connects to the recipient, the relationship, or the moment being celebrated. Names, initials, birth-month inspiration, hearts, flowers, and carefully chosen everyday styles can all make a piece feel more meaningful.',
          ],
        },
        {
          heading: 'Choose by recipient',
          items: [
            'For a partner: choose hearts, names, initials, couple jewelry, or anniversary-inspired pieces.',
            'For mom: choose family-inspired names, initials, birth-month details, floral pieces, or polished bracelets.',
            'For bridesmaids: choose coordinated necklaces, initial pieces, bracelets, or earrings that can be worn after the wedding.',
            'For friends or sisters: choose everyday necklaces, charm bracelets, earrings, or playful symbolic pieces.',
            'For self-gifting: choose the piece that feels most wearable with the recipient’s daily style.',
          ],
        },
        {
          heading: 'Choose by occasion',
          body: [
            'Birthdays work well with initials, birth-month inspired pieces, flowers, and personal symbols. Anniversaries naturally fit hearts, names, couple jewelry, dates, or meaningful places. Mother’s Day gifts should feel connected to family, children, or appreciation. Wedding and bridesmaid gifts should feel coordinated, polished, and wearable beyond the event.',
          ],
        },
        {
          heading: 'What to check before ordering',
          items: [
            'Confirm spelling, initials, dates, or personalization details before checkout.',
            'Review each product page for product-specific materials, dimensions, color options, care guidance, and shipping information.',
            'Choose lower-risk styles like necklaces, bracelets, earrings, or gift cards when sizing is uncertain.',
            'Avoid assuming allergy, waterproof, tarnish-free, or precious-metal claims unless they are stated on the specific product page.',
          ],
        },
      ],
      cta: 'Start with the Gifts collection, then explore Name Necklaces, Initial Necklaces, Birthstone Jewelry, Mother’s Collection, Wedding & Bridesmaids, and Couple Jewelry to find the most relevant path.',
    }),
  },
  {
    title: 'How to Choose a Name Necklace',
    handle: 'how-to-choose-a-name-necklace',
    summary: 'Learn how to choose a name necklace by word, recipient, occasion, readability, and product-specific details.',
    tags: ['name necklaces', 'personalized jewelry', 'gift guide', 'organic launch'],
    bodyHtml: guideHtml({
      intro: [
        'A name necklace is one of the clearest ways to make jewelry feel personal. It can celebrate the recipient’s name, a child, a partner, a family name, or a meaningful word.',
        'The right name necklace should feel easy to read, easy to wear, and emotionally connected to the person receiving it.',
      ],
      sections: [
        {
          heading: 'Quick answer: how do you choose a name necklace?',
          body: [
            'Choose the name or word first, then match the style to the recipient’s everyday jewelry. Before checkout, confirm spelling, capitalization, available options, personalization fields, and product-specific details.',
          ],
        },
        {
          heading: 'Start with the meaning',
          body: [
            'A name necklace can hold a first name, nickname, child’s name, partner’s name, family name, or short word. For gifts, choose the detail that would feel instantly recognizable to the recipient.',
          ],
        },
        {
          heading: 'Think about readability and length',
          body: [
            'Short names and words often feel delicate and easy to wear. Longer names may need a product style that supports more characters or clearer letter spacing. Do not assume character limits; check the individual product page before ordering.',
          ],
        },
        {
          heading: 'Match the recipient’s style',
          items: [
            'Minimal style: choose a simple name, initial, or small pendant direction.',
            'Sentimental style: choose a name, heart, birth-month inspired detail, or family meaning.',
            'Wedding gifting: choose coordinated pieces with small individual personalization.',
            'Everyday wear: choose a design that can layer with other necklaces.',
          ],
        },
        {
          heading: 'Ordering checklist',
          items: [
            'Check spelling twice.',
            'Confirm capitalization and spacing.',
            'Review product photos and variants.',
            'Check material and care notes on the product page.',
            'Review production and shipping information before purchase.',
          ],
        },
      ],
      cta: 'Explore Name Necklaces, Initial Necklaces, Gifts, Mother’s Collection, and Couple Jewelry for name and initial-inspired gift ideas.',
    }),
  },
  {
    title: 'Birthstone Jewelry Gift Guide',
    handle: 'birthstone-jewelry-gift-guide',
    summary: 'A claim-safe guide to birthstone-inspired jewelry gifts for birthdays, mothers, family moments, and milestones.',
    tags: ['birthstone jewelry', 'birthday gifts', 'mother gifts', 'organic launch'],
    bodyHtml: guideHtml({
      intro: [
        'Birthstone-inspired jewelry is popular because it connects a piece to a month, person, birthday, child, partner, or family story. It gives a gift a layer of meaning without requiring a long message.',
        'At North & Pearl, exact product details matter. Use this guide for gift ideas, then review each product page for confirmed materials, stones, colors, dimensions, and care notes.',
      ],
      sections: [
        {
          heading: 'Quick answer: what is birthstone-inspired jewelry?',
          body: [
            'Birthstone-inspired jewelry uses a birth month, color, or symbolic detail as the inspiration for the piece. Unless a product page verifies the exact stone or material, it should be treated as birth-month inspired rather than a confirmed gemstone claim.',
          ],
        },
        {
          heading: 'Best occasions for birthstone-inspired gifts',
          items: [
            'Birthdays, because the birth month is directly tied to the recipient.',
            'Mother’s Day, especially when a piece represents children or family members.',
            'Anniversaries, when the month carries relationship meaning.',
            'Milestones, such as graduations, new jobs, weddings, or new chapters.',
          ],
        },
        {
          heading: 'Gift ideas by recipient',
          body: [
            'For mom, choose family-centered birth-month inspiration, names, initials, or floral pieces. For a partner, choose a birth-month inspired necklace, heart detail, or couple jewelry. For a friend or sister, choose a subtle pendant, bracelet, or ring style that fits everyday wear.',
          ],
        },
        {
          heading: 'Important product-detail reminder',
          body: [
            'Do not assume a product contains a natural gemstone, specific crystal, precious metal, or allergy-friendly material unless the product page states it clearly. North & Pearl keeps material language conservative until supplier documentation is confirmed.',
          ],
        },
      ],
      cta: 'Browse Birthstone Jewelry, Gifts, Mother’s Collection, Rings, and Name Necklaces for birth-month inspired gift paths.',
    }),
  },
  {
    title: 'Jewelry Gifts for Mom',
    handle: 'jewelry-gifts-for-mom',
    summary: 'Meaningful jewelry gift ideas for moms, mother figures, grandmothers, new moms, and family milestones.',
    tags: ['mother gifts', 'mothers day gifts', 'gift guide', 'organic launch'],
    bodyHtml: guideHtml({
      intro: [
        'Jewelry for mom feels strongest when it connects to family, appreciation, or a meaningful life moment. A small detail like a name, initial, heart, birth-month inspired accent, or flower can make the gift feel more personal.',
        'Use this guide to choose a gift for Mother’s Day, birthdays, new moms, grandmothers, mother figures, or everyday appreciation.',
      ],
      sections: [
        {
          heading: 'Quick answer: what jewelry makes a meaningful gift for mom?',
          body: [
            'The most meaningful jewelry gifts for mom are pieces connected to family, children, initials, birth-month inspiration, hearts, flowers, or everyday styles she can wear often.',
          ],
        },
        {
          heading: 'Gift ideas for different moms',
          items: [
            'For a new mom: choose names, initials, or birth-month inspired jewelry connected to the child.',
            'For a grandmother: choose family-centered pieces, hearts, flowers, or layered symbols.',
            'For a minimalist mom: choose a simple necklace, bracelet, ring, or earrings.',
            'For a sentimental mom: choose a piece tied to names, dates, family, or shared memories.',
          ],
        },
        {
          heading: 'How to make the gift feel complete',
          body: [
            'Choose a piece that fits her style, confirm personalization carefully, and review available gift options on the product page. If you are unsure about ring sizing, a necklace, bracelet, earrings, or gift card may be easier to choose.',
          ],
        },
      ],
      cta: 'Start with Mother’s Collection, then explore Gifts, Birthstone Jewelry, Name Necklaces, Initial Necklaces, and Bracelets.',
    }),
  },
  {
    title: 'Bridesmaid Jewelry Gift Ideas',
    handle: 'bridesmaid-jewelry-gift-ideas',
    summary: 'Thoughtful jewelry gift ideas for bridesmaids, maid of honor gifts, bridal parties, and wedding thank-you moments.',
    tags: ['bridesmaid gifts', 'wedding jewelry', 'gift guide', 'organic launch'],
    bodyHtml: guideHtml({
      intro: [
        'Bridesmaid jewelry should feel coordinated enough for the wedding and personal enough to be worn afterward. The best pieces are polished, easy to style, and meaningful without being overly complicated.',
        'This guide helps brides choose jewelry gifts for bridesmaids, maid of honor gifts, bridal party thank-you moments, and wedding weekend gifting.',
      ],
      sections: [
        {
          heading: 'Quick answer: what jewelry is good for bridesmaid gifts?',
          body: [
            'Necklaces, bracelets, earrings, initials, and coordinated jewelry sets can work well for bridesmaid gifts. Choose one shared style, then add a small personal detail where supported.',
          ],
        },
        {
          heading: 'Coordinated but personal',
          body: [
            'A bridal party can wear coordinated jewelry without every piece being identical. You can keep the same product type or color direction, then personalize by initial, name, symbol, or gift note when the product supports it.',
          ],
        },
        {
          heading: 'What to check before ordering for a group',
          items: [
            'Confirm each recipient’s initial, name, or personalization detail.',
            'Review product-specific timing before placing group orders.',
            'Choose styles that can be worn beyond the wedding day.',
            'Avoid unverified material, allergy, or delivery claims when writing gift notes or product copy.',
          ],
        },
      ],
      cta: 'Browse Wedding & Bridesmaids, Gifts, Initial Necklaces, Necklaces, Bracelets, and Earrings for bridal party gift ideas.',
    }),
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
  console.log('created blog: Gift Guide');
} else {
  console.log('exists blog: Gift Guide');
}

const articleByHandle = new Map((blog.articles?.nodes || []).map((article) => [article.handle, article]));
const changed = [];

for (const guide of guides) {
  const input = normalizeArticle(guide);
  const existing = articleByHandle.get(guide.handle);

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
      console.log(`article warning ${guide.title}: ${JSON.stringify(result.userErrors)}`);
      continue;
    }
    changed.push({ action: 'updated', title: result.article.title, handle: result.article.handle });
    console.log(`updated article: ${result.article.title}`);
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
      console.log(`article warning ${guide.title}: ${JSON.stringify(result.userErrors)}`);
      continue;
    }
    changed.push({ action: 'created', title: result.article.title, handle: result.article.handle });
    console.log(`created article: ${result.article.title}`);
  }
}

console.table(changed);
