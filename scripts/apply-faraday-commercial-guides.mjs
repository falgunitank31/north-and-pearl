import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-faraday-commercial-guides-'));

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

function p(items) {
  return items.map((item) => `<p>${item}</p>`).join('\n');
}

function ul(items) {
  return `<ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
}

function a(label, href) {
  return `<a href="${href}">${label}</a>`;
}

function html({ intro, sections, cta }) {
  return [
    p(intro),
    ...sections.map((section) => [
      `<h2>${section.heading}</h2>`,
      section.body ? p(section.body) : '',
      section.items ? ul(section.items) : '',
    ].join('\n')),
    `<h2>Shop the guide</h2>`,
    p([cta]),
  ].join('\n');
}

const guides = [
  {
    title: 'Anniversary Jewelry Gift Guide',
    handle: 'anniversary-jewelry-gift-guide',
    summary: 'Meaningful anniversary jewelry gift ideas by relationship, milestone, and personal style.',
    tags: ['anniversary gifts', 'jewelry gifts', 'couple jewelry', 'organic launch'],
    body: html({
      intro: [
        'Anniversary jewelry should feel connected to the relationship, not just the date. A strong gift can reference a name, initial, shared symbol, heart, birth-month inspiration, or a style your partner will actually wear.',
        'Use this guide to choose a thoughtful anniversary jewelry gift while keeping product details and material claims specific to each product page.',
      ],
      sections: [
        {
          heading: 'Quick answer: what jewelry is best for an anniversary?',
          body: ['Good anniversary jewelry feels personal, wearable, and connected to the relationship. Heart pendants, name necklaces, initial pieces, couple jewelry, bracelets, rings, and polished everyday styles can all work when they match the recipient’s style.'],
        },
        {
          heading: 'Choose by relationship milestone',
          items: [
            'First anniversary: choose a simple piece she can wear often.',
            'Major milestone: choose a more sentimental heart, name, ring, or set.',
            'Long-distance relationship: choose initials, names, or a symbol tied to your story.',
            'Married couple: choose a gift that feels lasting without relying on unsupported material claims.',
          ],
        },
        {
          heading: 'What to check before ordering',
          items: [
            'Confirm personalization details carefully.',
            'Check sizing if choosing a ring.',
            'Review product photos, available variants, care notes, and shipping information.',
            'Do not assume waterproof, tarnish-free, hypoallergenic, or precious-metal claims unless listed on the product page.',
          ],
        },
      ],
      cta: `Start with ${a('Couple Jewelry', '/collections/couple-jewelry')}, ${a('Gifts', '/collections/gifts')}, ${a('Name Necklaces', '/collections/name-necklaces')}, ${a('Initial Necklaces', '/collections/initial-necklaces')}, ${a('Necklaces', '/collections/necklaces')}, and ${a('Rings', '/collections/rings')}.`,
    }),
  },
  {
    title: 'Best Jewelry Gifts Under $100',
    handle: 'best-jewelry-gifts-under-100',
    summary: 'A practical guide to meaningful jewelry gifts under $100 for birthdays, anniversaries, moms, bridesmaids, and everyday moments.',
    tags: ['gifts under 100', 'jewelry gifts', 'gift guide', 'organic launch'],
    body: html({
      intro: [
        'A thoughtful jewelry gift does not need to feel oversized or complicated. Under-$100 gifts can still feel personal, polished, and meaningful when the style matches the recipient and the occasion.',
        'This guide helps shoppers choose accessible North & Pearl jewelry gift paths without relying on unverified material or performance claims.',
      ],
      sections: [
        {
          heading: 'Quick answer: what jewelry gifts under $100 feel meaningful?',
          body: ['Initial necklaces, name-inspired pieces, heart jewelry, bracelets, earrings, rings, and small jewelry sets can all make meaningful under-$100 gifts when the product fits the recipient’s everyday style.'],
        },
        {
          heading: 'Best under-$100 gift paths',
          items: [
            'For her: choose a polished necklace, bracelet, earrings, or ring.',
            'For mom: choose initials, family-inspired pieces, heart details, or floral styles.',
            'For bridesmaids: choose coordinated earrings, bracelets, or initial pieces.',
            'For birthdays: choose birth-month inspiration, initials, or everyday sparkle-style pieces.',
            'For anniversaries: choose heart, couple, name, or ring styles.',
          ],
        },
        {
          heading: 'How to make an affordable gift feel premium',
          body: ['Choose a piece with clean photos, clear product details, and a style that fits the recipient. A focused, wearable piece often feels more premium than a busy design.'],
        },
      ],
      cta: `Browse ${a('Gifts', '/collections/gifts')}, ${a('Best Sellers', '/collections/best-sellers')}, ${a('Necklaces', '/collections/necklaces')}, ${a('Bracelets', '/collections/bracelets')}, ${a('Earrings', '/collections/earrings')}, and ${a('Rings', '/collections/rings')}.`,
    }),
  },
  {
    title: 'Personalized Jewelry for Couples',
    handle: 'personalized-jewelry-for-couples',
    summary: 'Couple jewelry ideas for anniversaries, partners, shared initials, names, and meaningful everyday gifts.',
    tags: ['couple jewelry', 'personalized jewelry', 'anniversary gifts', 'organic launch'],
    body: html({
      intro: [
        'Personalized jewelry for couples works best when it feels subtle enough to wear often and meaningful enough to connect to the relationship.',
        'Names, initials, heart motifs, matching styles, and shared symbols can all create a thoughtful gift when the product supports the personalization or design detail.',
      ],
      sections: [
        {
          heading: 'Quick answer: what is good personalized jewelry for couples?',
          body: ['Good couple jewelry includes initials, names, heart pendants, matching pieces, rings, bracelets, and symbolic styles that connect to the relationship while still fitting everyday wear.'],
        },
        {
          heading: 'Couple gift ideas',
          items: [
            'Initial pieces for a subtle personal detail.',
            'Name necklaces or pendants where customization is supported.',
            'Heart jewelry for anniversaries and romantic gifts.',
            'Bracelets or rings for shoppers who want something wearable beyond special occasions.',
            'Coordinated styles when matching jewelry feels right for the couple.',
          ],
        },
        {
          heading: 'Avoid overcomplicating the gift',
          body: ['The strongest couple jewelry gifts are easy to understand. Choose one meaningful detail, confirm product options, and keep the final piece aligned with the recipient’s normal style.'],
        },
      ],
      cta: `Explore ${a('Couple Jewelry', '/collections/couple-jewelry')}, ${a('Name Necklaces', '/collections/name-necklaces')}, ${a('Initial Necklaces', '/collections/initial-necklaces')}, ${a('Necklaces', '/collections/necklaces')}, ${a('Bracelets', '/collections/bracelets')}, and ${a('Rings', '/collections/rings')}.`,
    }),
  },
  {
    title: 'Birthday Jewelry Gift Ideas',
    handle: 'birthday-jewelry-gift-ideas',
    summary: 'Birthday jewelry gift ideas for her, moms, friends, sisters, partners, and meaningful milestones.',
    tags: ['birthday gifts', 'jewelry gifts', 'gift guide', 'organic launch'],
    body: html({
      intro: [
        'Birthday jewelry is strongest when it feels connected to the person receiving it. Initials, names, birth-month inspiration, hearts, flowers, bracelets, earrings, and rings can all work depending on her style.',
        'Use this guide to choose a birthday jewelry gift that feels thoughtful without guessing on unsupported product claims.',
      ],
      sections: [
        {
          heading: 'Quick answer: what jewelry should I buy for a birthday?',
          body: ['Choose jewelry that connects to the recipient’s name, birth month, personal style, favorite motif, or everyday wardrobe. Necklaces, bracelets, earrings, and rings can all work when the product details fit the recipient.'],
        },
        {
          heading: 'Birthday gifts by recipient',
          items: [
            'For a partner: choose hearts, names, initials, rings, or couple-inspired pieces.',
            'For mom: choose family-centered pieces, birth-month inspiration, hearts, or flowers.',
            'For a friend or sister: choose earrings, bracelets, dainty necklaces, or playful symbols.',
            'For milestone birthdays: choose a piece that feels more personal or elevated.',
          ],
        },
        {
          heading: 'Easy choices when you are unsure',
          body: ['If you are unsure about sizing, choose necklaces, earrings, bracelets, or a gift card rather than a ring. If you are unsure about exact style, choose a clean everyday design instead of something overly specific.'],
        },
      ],
      cta: `Shop ${a('Gifts', '/collections/gifts')}, ${a('Birthstone Jewelry', '/collections/birthstone-jewelry')}, ${a('Initial Necklaces', '/collections/initial-necklaces')}, ${a('Earrings', '/collections/earrings')}, ${a('Bracelets', '/collections/bracelets')}, and ${a('Rings', '/collections/rings')}.`,
    }),
  },
  {
    title: 'How to Layer Necklaces',
    handle: 'how-to-layer-necklaces',
    summary: 'A simple styling guide for layering necklaces, pendants, initials, name necklaces, and everyday jewelry.',
    tags: ['necklace layering', 'necklaces', 'style guide', 'organic launch'],
    body: html({
      intro: [
        'Layering necklaces is about balance. A good stack mixes simple chains, pendants, initials, names, symbols, and spacing so each piece has room to be seen.',
        'This guide gives shoppers a simple way to build a necklace stack from North & Pearl styles while checking each product page for product-specific sizing and details.',
      ],
      sections: [
        {
          heading: 'Quick answer: how do you layer necklaces?',
          body: ['Layer necklaces by mixing different lengths, choosing one focal pendant, keeping the rest simpler, and checking product-specific chain or sizing details before ordering.'],
        },
        {
          heading: 'Start with one focal piece',
          body: ['A name necklace, initial pendant, heart, birth-month inspired piece, or statement pendant can anchor the stack. Let that piece carry the meaning, then add simpler necklaces around it.'],
        },
        {
          heading: 'Layering ideas',
          items: [
            'Initial plus simple pendant.',
            'Name necklace plus dainty sparkle-style necklace.',
            'Heart pendant plus smooth chain style.',
            'Birth-month inspired piece plus minimal necklace.',
            'Everyday pendant plus earrings or bracelet for a complete gift set feel.',
          ],
        },
        {
          heading: 'What to check before ordering',
          items: [
            'Review the product page for chain length or size details when available.',
            'Check whether personalization is supported.',
            'Avoid assuming material or durability claims unless they are stated on the product page.',
          ],
        },
      ],
      cta: `Build a stack from ${a('Necklaces', '/collections/necklaces')}, ${a('Name Necklaces', '/collections/name-necklaces')}, ${a('Initial Necklaces', '/collections/initial-necklaces')}, ${a('Gifts', '/collections/gifts')}, and ${a('Best Sellers', '/collections/best-sellers')}.`,
    }),
  },
];

const blogs = gql(`query Blogs {
  blogs(first: 50) { nodes { id handle title articles(first: 100) { nodes { id handle title } } } }
}`).blogs.nodes;

let blog = blogs.find((item) => item.handle === 'gift-guide');
if (!blog) {
  const created = gql(
    `mutation BlogCreate($blog: BlogCreateInput!) {
      blogCreate(blog: $blog) { blog { id handle title articles(first: 100) { nodes { id handle title } } } userErrors { field message } }
    }`,
    { blog: { title: 'Gift Guide', handle: 'gift-guide' } },
    true,
  ).blogCreate;
  if (created.userErrors.length) throw new Error(JSON.stringify(created.userErrors));
  blog = created.blog;
}

const existingByHandle = new Map((blog.articles?.nodes || []).map((article) => [article.handle, article]));
const changed = [];

for (const guide of guides) {
  const article = {
    title: guide.title,
    handle: guide.handle,
    body: guide.body,
    summary: `<p>${guide.summary}</p>`,
    tags: guide.tags,
    isPublished: true,
    author: { name: 'North & Pearl Editorial' },
  };
  const existing = existingByHandle.get(guide.handle);
  if (existing) {
    const updated = gql(
      `mutation ArticleUpdate($id: ID!, $article: ArticleUpdateInput!) {
        articleUpdate(id: $id, article: $article) { article { id handle title } userErrors { field message } }
      }`,
      { id: existing.id, article },
      true,
    ).articleUpdate;
    if (updated.userErrors.length) throw new Error(`${guide.title}: ${JSON.stringify(updated.userErrors)}`);
    changed.push({ action: 'updated', title: updated.article.title, handle: updated.article.handle });
  } else {
    const created = gql(
      `mutation ArticleCreate($article: ArticleCreateInput!) {
        articleCreate(article: $article) { article { id handle title } userErrors { field message } }
      }`,
      { article: { ...article, blogId: blog.id } },
      true,
    ).articleCreate;
    if (created.userErrors.length) throw new Error(`${guide.title}: ${JSON.stringify(created.userErrors)}`);
    changed.push({ action: 'created', title: created.article.title, handle: created.article.handle });
  }
}

console.table(changed);

