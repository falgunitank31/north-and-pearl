import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const date = new Date().toISOString().slice(0, 10);
const tempDir = mkdtempSync(join(tmpdir(), 'np-faraday-august-push-'));
const campaign = 'indexed_page_push_august_2026';
const reportPath = `reports/faraday-indexed-page-marketing-push-${date}.md`;
const kitPath = `content/seo/indexed-page-push-kit-${date}.md`;

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

const relatedGuides = [
  { title: 'Best Name Necklace Gifts for Her', handle: 'best-name-necklace-gifts-for-her' },
  { title: 'Birthstone-Inspired Jewelry Gifts for Mom', handle: 'birthstone-inspired-jewelry-gifts-for-mom' },
  { title: 'Jewelry Gifts Under $100', handle: 'jewelry-gifts-under-100' },
  { title: 'Meaningful Jewelry Gifts to Shop This Week', handle: 'meaningful-jewelry-gifts-to-shop-this-week' },
];

function relatedGuideLinks(currentHandle) {
  const links = relatedGuides
    .filter((guide) => guide.handle !== currentHandle)
    .map((guide) => `<li><a href="/blogs/gift-guide/${guide.handle}">${guide.title}</a></li>`);
  return [
    '<h2>Related North & Pearl gift guides</h2>',
    `<ul>${links.join('')}</ul>`,
  ].join('\n');
}

function html({ intro, sections, cta, handle }) {
  return [
    p(intro),
    ...sections.map((section) => [
      `<h2>${section.heading}</h2>`,
      section.body ? p(section.body) : '',
      section.items ? ul(section.items) : '',
    ].join('\n')),
    '<h2>Shop the edit</h2>',
    p([cta]),
    relatedGuideLinks(handle),
  ].join('\n');
}

function utm(url, content, medium = 'organic_post') {
  const params = new URLSearchParams({
    utm_source: 'owned_organic',
    utm_medium: medium,
    utm_campaign: campaign,
    utm_content: content,
  });
  return `${url}?${params.toString()}`;
}

const articles = [
  {
    title: 'Best Name Necklace Gifts for Her',
    handle: 'best-name-necklace-gifts-for-her',
    summary: 'A buyer-intent guide to choosing name necklace gifts for partners, moms, bridesmaids, friends, and meaningful moments.',
    tags: ['name necklaces', 'gifts for her', 'personalized jewelry', 'commercial guide'],
    body: html({
      handle: 'best-name-necklace-gifts-for-her',
      intro: [
        'A name necklace gift works because it feels specific. It can celebrate her name, a child, a partner, a family detail, or a short word that carries meaning.',
        'Use this guide when you want a personal jewelry gift without overcomplicating the choice.',
      ],
      sections: [
        {
          heading: 'Quick answer: who should receive a name necklace?',
          body: [
            'Name necklaces work well for partners, moms, sisters, close friends, bridesmaids, and anyone who enjoys jewelry with a personal detail. Start with the person, then choose the style that best fits how she dresses every day.',
          ],
        },
        {
          heading: 'Best name necklace gift paths',
          items: [
            `For her: start with ${a('Name Necklaces', '/collections/name-necklaces')} or ${a('Jewelry Gifts for Her', '/collections/jewelry-gifts-for-her')}.`,
            `For mom: choose family, child-name, initial, heart, or birth-month inspired paths from ${a('Mother’s Collection', '/collections/mothers-collection')}.`,
            `For anniversaries: consider names, initials, hearts, and couple-led designs from ${a('Anniversary Gifts', '/collections/anniversary-gifts')}.`,
            `For bridesmaids: keep the style coordinated and personal through initials or wearable necklaces from ${a('Wedding & Bridesmaids', '/collections/wedding-bridesmaids')}.`,
          ],
        },
        {
          heading: 'Before you order',
          items: [
            'Confirm spelling, capitalization, spacing, and any personalization details before checkout.',
            'Review each product page for available variants, product photos, care notes, and shipping information.',
            'Do not assume precious-metal, waterproof, hypoallergenic, or tarnish-free claims unless the individual product page states them.',
          ],
        },
      ],
      cta: `Shop ${a('Name Necklaces', '/collections/name-necklaces')}, ${a('Personalized Jewelry', '/collections/personalized-jewelry')}, ${a('Jewelry Gifts for Her', '/collections/jewelry-gifts-for-her')}, and ${a('Gifts Under $100', '/collections/gifts-under-100')}.`,
    }),
  },
  {
    title: 'Birthstone-Inspired Jewelry Gifts for Mom',
    handle: 'birthstone-inspired-jewelry-gifts-for-mom',
    summary: 'A claim-safe buying guide for birth-month inspired jewelry gifts for moms, grandmothers, new moms, and family milestones.',
    tags: ['birthstone jewelry', 'gifts for mom', 'mother gifts', 'commercial guide'],
    body: html({
      handle: 'birthstone-inspired-jewelry-gifts-for-mom',
      intro: [
        'Birthstone-inspired jewelry can make a gift feel connected to family, children, birthdays, and meaningful months. For moms, that personal layer often matters more than a large design.',
        'North & Pearl keeps product claims conservative, so use this guide for gift direction and each product page for confirmed details.',
      ],
      sections: [
        {
          heading: 'Quick answer: why choose birthstone-inspired jewelry for mom?',
          body: [
            'Birthstone-inspired jewelry is a thoughtful mom gift because it can represent children, family members, birthdays, or milestones. It adds meaning while still feeling wearable.',
          ],
        },
        {
          heading: 'Best gift paths for mom',
          items: [
            `Family meaning: browse ${a('Birthstone Jewelry', '/collections/birthstone-jewelry')} and ${a('Mother’s Collection', '/collections/mothers-collection')}.`,
            `Personal detail: explore ${a('Name Necklaces', '/collections/name-necklaces')} and ${a('Initial Necklaces', '/collections/initial-necklaces')}.`,
            `Budget-conscious gifts: start with ${a('Gifts Under $50', '/collections/gifts-under-50')} or ${a('Gifts Under $100', '/collections/gifts-under-100')}.`,
            `Birthday gifting: use ${a('Birthday Jewelry Gifts', '/collections/birthday-jewelry-gifts')} for month-led and personal styles.`,
          ],
        },
        {
          heading: 'What to verify on the product page',
          items: [
            'Confirm whether the product uses a specific stone, crystal, color detail, or birth-month inspired design.',
            'Review available variants and product images carefully.',
            'Check care guidance and shipping information before checkout.',
          ],
        },
      ],
      cta: `Shop ${a('Birthstone Jewelry', '/collections/birthstone-jewelry')}, ${a('Mother’s Collection', '/collections/mothers-collection')}, ${a('Birthday Jewelry Gifts', '/collections/birthday-jewelry-gifts')}, and ${a('Jewelry Gifts for Her', '/collections/jewelry-gifts-for-her')}.`,
    }),
  },
  {
    title: 'Jewelry Gifts Under $100',
    handle: 'jewelry-gifts-under-100',
    summary: 'A commercial gift guide for polished jewelry gifts under $100, including necklaces, bracelets, rings, earrings, and personalized styles.',
    tags: ['gifts under 100', 'jewelry gifts', 'gifts for her', 'commercial guide'],
    body: html({
      handle: 'jewelry-gifts-under-100',
      intro: [
        'A jewelry gift under $100 can still feel thoughtful, polished, and personal when the design fits the recipient. The key is choosing a clear gift path rather than scrolling through everything.',
        'Use this guide when you want a meaningful North & Pearl gift at an accessible price point.',
      ],
      sections: [
        {
          heading: 'Quick answer: what jewelry gifts under $100 should I shop first?',
          body: [
            'Start with necklaces, bracelets, earrings, initial styles, heart details, and simple rings. These categories are easy to gift and work for birthdays, anniversaries, bridesmaids, mom gifts, and everyday appreciation.',
          ],
        },
        {
          heading: 'Shop by recipient',
          items: [
            `For her: browse ${a('Jewelry Gifts for Her', '/collections/jewelry-gifts-for-her')}.`,
            `For mom: start with ${a('Mother’s Collection', '/collections/mothers-collection')} and birth-month inspired pieces.`,
            `For birthdays: use ${a('Birthday Jewelry Gifts', '/collections/birthday-jewelry-gifts')}.`,
            `For anniversaries: browse ${a('Anniversary Gifts', '/collections/anniversary-gifts')}.`,
            `For a personal detail: shop ${a('Personalized Jewelry', '/collections/personalized-jewelry')}.`,
          ],
        },
        {
          heading: 'How to choose faster',
          items: [
            'Choose necklaces or bracelets when sizing is uncertain.',
            'Choose initials, names, or hearts when the gift should feel personal.',
            'Choose earrings or simple bracelets for friends, bridesmaids, sisters, and coworkers.',
            'Review the product page for exact options, photos, and care notes.',
          ],
        },
      ],
      cta: `Shop ${a('Gifts Under $100', '/collections/gifts-under-100')}, ${a('Gifts Under $50', '/collections/gifts-under-50')}, ${a('Best Sellers', '/collections/best-sellers')}, ${a('Necklaces', '/collections/necklaces')}, ${a('Bracelets', '/collections/bracelets')}, ${a('Rings', '/collections/rings')}, and ${a('Earrings', '/collections/earrings')}.`,
    }),
  },
];

const blogQuery = gql(`query GiftGuide {
  blogs(first: 25) {
    nodes {
      id
      handle
      title
      articles(first: 250) { nodes { id handle title } }
    }
  }
}`);

const blog = blogQuery.blogs.nodes.find((item) => item.handle === 'gift-guide');
if (!blog) throw new Error('Gift Guide blog not found.');

const existingByHandle = new Map((blog.articles?.nodes || []).map((article) => [article.handle, article]));
const changed = [];

for (const guide of articles) {
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

const indexedPages = [
  { label: 'Name Necklaces', url: 'https://northandpearl.com/collections/name-necklaces', content: 'name_necklaces' },
  { label: 'Birthstone Jewelry', url: 'https://northandpearl.com/collections/birthstone-jewelry', content: 'birthstone_jewelry' },
  { label: 'Jewelry Gifts for Her', url: 'https://northandpearl.com/collections/jewelry-gifts-for-her', content: 'gifts_for_her' },
  { label: 'Gifts Under $100', url: 'https://northandpearl.com/collections/gifts-under-100', content: 'gifts_under_100' },
  { label: 'Personalized Jewelry', url: 'https://northandpearl.com/collections/personalized-jewelry', content: 'personalized_jewelry' },
  { label: 'Initial Shell Necklace', url: 'https://northandpearl.com/products/north-pearl-initial-shell-necklace', content: 'initial_shell_necklace' },
];

const publishUrls = changed.map((item) => ({
  title: item.title,
  url: `https://northandpearl.com/blogs/gift-guide/${item.handle}`,
}));

const pushPosts = [
  {
    title: 'Name necklace gift path',
    copy: 'A name necklace is a simple way to make a jewelry gift feel personal. Start with North & Pearl’s name necklace guide, then shop the personalized edit.',
    link: utm('https://northandpearl.com/blogs/gift-guide/best-name-necklace-gifts-for-her', 'name_necklace_guide'),
  },
  {
    title: 'Mom gift path',
    copy: 'Looking for a meaningful gift for mom? Start with birthstone-inspired and family-led jewelry ideas, then choose the piece that fits her everyday style.',
    link: utm('https://northandpearl.com/blogs/gift-guide/birthstone-inspired-jewelry-gifts-for-mom', 'mom_birthstone_guide'),
  },
  {
    title: 'Under $100 gift path',
    copy: 'A polished jewelry gift does not need to feel complicated. Browse North & Pearl’s under-$100 edit for necklaces, bracelets, earrings, rings, and meaningful styles.',
    link: utm('https://northandpearl.com/blogs/gift-guide/jewelry-gifts-under-100', 'under_100_guide'),
  },
  {
    title: 'Indexed collection push',
    copy: 'North & Pearl’s most useful starting points are live and index-ready: personalized jewelry, name necklaces, jewelry gifts for her, and under-$100 gifts.',
    link: utm('https://northandpearl.com/collections/personalized-jewelry', 'indexed_personalized_collection'),
  },
];

mkdirSync(dirname(kitPath), { recursive: true });
writeFileSync(kitPath, [
  `# Indexed Page Push Kit - ${date}`,
  '',
  `Campaign: \`${campaign}\``,
  '',
  '## Indexed Pages To Push',
  '',
  ...indexedPages.map((page) => `- ${page.label}: ${utm(page.url, page.content)}`),
  '',
  '## Published Buyer-Intent Posts',
  '',
  ...publishUrls.map((page) => `- ${page.title}: ${utm(page.url, page.title.toLowerCase().replaceAll(' ', '_'))}`),
  '',
  '## Ready-To-Post Copy',
  '',
  ...pushPosts.flatMap((post, index) => [
    `### ${index + 1}. ${post.title}`,
    '',
    post.copy,
    '',
    post.link,
    '',
  ]),
  '## Measurement',
  '',
  '- Rawls should monitor GA4 campaign traffic for `indexed_page_push_august_2026`.',
  '- Faraday should monitor Search Console query/page movement for Name Necklaces, Birthstone Jewelry, Gifts Under $100, Jewelry Gifts for Her, Personalized Jewelry, and the new guide URLs.',
  '- Evaluate early directional movement after 3 days, but do not treat low-volume data as conclusive.',
].join('\n'));

mkdirSync(dirname(reportPath), { recursive: true });
writeFileSync(reportPath, [
  `# Faraday Indexed Page Marketing Push - ${date}`,
  '',
  '## Completed',
  '',
  '- Published/updated three buyer-intent Shopify Gift Guide posts.',
  '- Created tracked external-push assets for indexed commercial pages and the new guides.',
  '- Focused the campaign on indexed or commercially connected pages rather than broad awareness traffic.',
  '- Preserved claim safety: no unsupported material, waterproof, hypoallergenic, tarnish-free, review, delivery, or warranty claims were introduced.',
  '',
  '## Shopify Posts',
  '',
  ...changed.map((item) => `- ${item.action}: ${item.title} — https://northandpearl.com/blogs/gift-guide/${item.handle}`),
  '',
  '## External Push Assets',
  '',
  `- Push kit: \`${kitPath}\``,
  `- UTM campaign: \`${campaign}\``,
  '',
  '## Monitoring Plan',
  '',
  '- Rawls: monitor GA4 traffic by campaign/source, guide landing-page engagement, collection visits, product views, add-to-cart, checkout starts, and orders.',
  '- Faraday: monitor Search Console impressions, clicks, CTR, and query/page rows for the new posts and linked collections.',
  '- Pareto: watch product discovery and cart progression from commercial guides before proposing any discount-led offer.',
  '',
  '## Blocked Portion',
  '',
  '- Actual posting to external social/email accounts is not executable from this repository because no connected social/email publishing account is available. The tracked post copy and links are ready for distribution.',
].join('\n'));

console.log(JSON.stringify({ changed, kitPath, reportPath, campaign }, null, 2));
