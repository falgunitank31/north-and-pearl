import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const date = '2026-07-29';
const tempDir = mkdtempSync(join(tmpdir(), 'np-qualified-traffic-'));
const reportPath = `reports/faraday-qualified-traffic-execution-${date}.md`;
const kitPath = `content/seo/qualified-traffic-posts-${date}.md`;

const targetLinks = [
  { label: 'Featured Jewelry', url: 'https://northandpearl.com/collections/best-sellers', slug: 'featured-jewelry' },
  { label: 'Jewelry Gifts for Her', url: 'https://northandpearl.com/collections/jewelry-gifts-for-her', slug: 'jewelry-gifts-for-her' },
  { label: 'Gifts Under $50', url: 'https://northandpearl.com/collections/gifts-under-50', slug: 'gifts-under-50' },
  { label: 'Gifts Under $100', url: 'https://northandpearl.com/collections/gifts-under-100', slug: 'gifts-under-100' },
  { label: 'Personalized Jewelry', url: 'https://northandpearl.com/collections/personalized-jewelry', slug: 'personalized-jewelry' },
  { label: 'Name Necklaces', url: 'https://northandpearl.com/collections/name-necklaces', slug: 'name-necklaces' },
  { label: 'Birthday Jewelry Gifts', url: 'https://northandpearl.com/collections/birthday-jewelry-gifts', slug: 'birthday-jewelry-gifts' },
  { label: 'Anniversary Gifts', url: 'https://northandpearl.com/collections/anniversary-gifts', slug: 'anniversary-gifts' },
];

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

function utm(url, campaign, content) {
  const params = new URLSearchParams({
    utm_source: 'organic_social',
    utm_medium: 'post',
    utm_campaign: campaign,
    utm_content: content,
  });
  return `${url}?${params.toString()}`;
}

function articleHtml() {
  return [
    '<p>If you want a jewelry gift that feels thoughtful without taking hours to choose, start with the occasion, the recipient, and the style she is most likely to wear often.</p>',
    '<p>This North & Pearl edit is built for shoppers who need a meaningful gift path today: personalized pieces, gift-ready favorites, under-$50 options, and polished jewelry under $100.</p>',
    '<h2>Quick answer: what should I shop first?</h2>',
    '<p>Start with featured jewelry if you are unsure, personalized jewelry if the gift should feel specific to her, and under-$50 or under-$100 collections if you are shopping by budget.</p>',
    '<h2>Fast gift paths</h2>',
    '<ul>',
    '<li><a href="/collections/jewelry-gifts-for-her">Jewelry Gifts for Her</a>: a broad edit for birthdays, anniversaries, appreciation, and everyday gifting.</li>',
    '<li><a href="/collections/gifts-under-50">Gifts Under $50</a>: accessible pieces when you want a thoughtful gift at an easier price point.</li>',
    '<li><a href="/collections/gifts-under-100">Gifts Under $100</a>: a wider gift edit with necklaces, bracelets, rings, earrings, and meaningful styles.</li>',
    '<li><a href="/collections/personalized-jewelry">Personalized Jewelry</a>: name, initial, heart, and meaning-led pieces when the detail matters.</li>',
    '<li><a href="/collections/best-sellers">Featured Jewelry</a>: a curated place to start when you want the strongest launch edit.</li>',
    '</ul>',
    '<h2>How to choose quickly</h2>',
    '<ul>',
    '<li>Choose necklaces or bracelets when you are unsure about sizing.</li>',
    '<li>Choose initials, names, or heart styles when the gift should feel personal.</li>',
    '<li>Choose earrings or simple bracelets for friends, bridesmaids, sisters, or coworkers.</li>',
    '<li>Review each product page for available options, personalization fields, care notes, and shipping information before checkout.</li>',
    '</ul>',
    '<h2>Important shopping note</h2>',
    '<p>Materials, personalization availability, and care details can vary by product. North & Pearl avoids unsupported material or durability claims, so always use the product page as the source of truth before ordering.</p>',
    '<h2>Shop the edit</h2>',
    '<p><a href="/collections/best-sellers">Shop Featured Jewelry</a>, <a href="/collections/jewelry-gifts-for-her">Jewelry Gifts for Her</a>, <a href="/collections/gifts-under-50">Gifts Under $50</a>, <a href="/collections/gifts-under-100">Gifts Under $100</a>, and <a href="/collections/personalized-jewelry">Personalized Jewelry</a>.</p>',
  ].join('\n');
}

const blogData = gql(`query GiftGuideBlog {
  blogs(first: 10, query: "handle:gift-guide") {
    nodes {
      id
      handle
      articles(first: 100) {
        nodes { id handle title }
      }
    }
  }
}`);

const blog = blogData.blogs.nodes.find((item) => item.handle === 'gift-guide');
if (!blog) throw new Error('Gift Guide blog not found.');

const handle = 'meaningful-jewelry-gifts-to-shop-this-week';
const existingArticle = blog.articles.nodes.find((article) => article.handle === handle);
const articleInput = {
  blogId: blog.id,
  title: 'Meaningful Jewelry Gifts to Shop This Week',
  handle,
  body: articleHtml(),
  summary: 'A quick North & Pearl shopping guide for meaningful jewelry gifts, personalized pieces, and gift-friendly price points.',
  tags: ['jewelry gifts', 'personalized jewelry', 'gifts under 50', 'gifts under 100', 'organic launch'],
  isPublished: true,
  author: { name: 'North & Pearl Editorial' },
};

let articleResult;
if (existingArticle) {
  articleResult = gql(
    `mutation UpdateTrafficArticle($id: ID!, $article: ArticleUpdateInput!) {
      articleUpdate(id: $id, article: $article) {
        article { id handle title }
        userErrors { field message }
      }
    }`,
    { id: existingArticle.id, article: articleInput },
    true,
  ).articleUpdate;
} else {
  articleResult = gql(
    `mutation CreateTrafficArticle($article: ArticleCreateInput!) {
      articleCreate(article: $article) {
        article { id handle title }
        userErrors { field message }
      }
    }`,
    { article: articleInput },
    true,
  ).articleCreate;
}

if (articleResult.userErrors?.length) {
  throw new Error(JSON.stringify(articleResult.userErrors));
}

const article = articleResult.article;
const articleUrl = `https://northandpearl.com/blogs/gift-guide/${handle}`;
const campaign = 'order_growth_july_2026';
const socialPosts = [
  {
    channel: 'Instagram/Facebook',
    title: 'Jewelry gifts under $50',
    copy: 'Looking for a meaningful gift that still feels easy? North & Pearl has a curated under-$50 jewelry edit with bracelets, earrings, rings, and small keepsake styles. Shop the gift edit:',
    link: utm('https://northandpearl.com/collections/gifts-under-50', campaign, 'gifts_under_50_post'),
  },
  {
    channel: 'Instagram/Facebook',
    title: 'Personalized jewelry gifts',
    copy: 'Names, initials, hearts, and meaningful details make jewelry feel personal. Explore North & Pearl personalized jewelry for birthdays, anniversaries, and everyday moments:',
    link: utm('https://northandpearl.com/collections/personalized-jewelry', campaign, 'personalized_jewelry_post'),
  },
  {
    channel: 'Instagram/Facebook',
    title: 'Jewelry gifts for her',
    copy: 'A polished jewelry gift can say a lot without overthinking it. Start with North & Pearl Jewelry Gifts for Her and find necklaces, bracelets, earrings, rings, and meaningful styles:',
    link: utm('https://northandpearl.com/collections/jewelry-gifts-for-her', campaign, 'gifts_for_her_post'),
  },
  {
    channel: 'Short video caption',
    title: '3 quick gift paths',
    copy: 'Three easy ways to shop North & Pearl: under $50, personalized jewelry, or featured jewelry. Meaningful pieces for names, milestones, and everyday moments.',
    link: utm(articleUrl, campaign, 'quick_gift_paths_video'),
  },
  {
    channel: 'SMS/WhatsApp personal share',
    title: 'Warm audience message',
    copy: 'I launched North & Pearl, a jewelry store focused on meaningful, giftable pieces. If you need a birthday, anniversary, or personalized gift, start here:',
    link: utm('https://northandpearl.com/collections/jewelry-gifts-for-her', campaign, 'warm_share'),
  },
];

mkdirSync(dirname(kitPath), { recursive: true });
writeFileSync(kitPath, [
  `# Qualified Traffic Posts - ${date}`,
  '',
  'Purpose: drive immediate buyer-intent traffic to North & Pearl without broad awareness waste.',
  '',
  '## Primary Links',
  '',
  ...targetLinks.map((link) => `- ${link.label}: ${utm(link.url, campaign, link.slug)}`),
  '',
  '## Ready-To-Post Copy',
  '',
  ...socialPosts.flatMap((post, index) => [
    `### ${index + 1}. ${post.title}`,
    '',
    `Channel: ${post.channel}`,
    '',
    post.copy,
    '',
    post.link,
    '',
  ]),
].join('\n'));

writeFileSync(reportPath, [
  `# Faraday Qualified Traffic Execution - ${date}`,
  '',
  'Owner: Faraday with Lead Orchestrator, Kuhn, Gauss, Tesla, and Rawls alignment.',
  '',
  '## Work Completed',
  '',
  `- ${existingArticle ? 'Updated' : 'Published'} Shopify gift-guide article: ${article.title}`,
  `- Article URL: ${articleUrl}`,
  `- Created ready-to-post traffic kit: \`${kitPath}\``,
  `- Created UTM campaign: \`${campaign}\``,
  '',
  '## Target Buyer-Intent URLs',
  '',
  ...targetLinks.map((link) => `- ${link.label}: ${link.url}`),
  '',
  '## Execution Notes',
  '',
  '- No paid spend was initiated.',
  '- No unsupported material, warranty, waterproof, hypoallergenic, tarnish-free, or review claims were introduced.',
  '- External posting remains account-side unless social account tools become available.',
  '- Measure traffic by UTM campaign once GA4/UI data is available.',
].join('\n'));

console.log(JSON.stringify({
  article: article.onlineStoreUrl || `https://northandpearl.com/blogs/gift-guide/${handle}`,
  kitPath,
  reportPath,
  campaign,
}, null, 2));
