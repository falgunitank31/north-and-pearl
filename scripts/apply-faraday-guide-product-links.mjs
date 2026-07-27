import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-faraday-guide-product-links-'));

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

function productLink(title, handle) {
  return `<li><a href="/products/${handle}">${title}</a></li>`;
}

function productSection(items) {
  return [
    '<h2>Featured pieces to start with</h2>',
    '<p>Use these product paths as a starting point, then review each product page for photos, available options, personalization fields, care notes, and product-specific details before ordering.</p>',
    '<ul>',
    ...items.map((item) => productLink(item.title, item.handle)),
    '</ul>',
  ].join('\n');
}

function stripExistingSection(html = '') {
  return html
    .replace(/<h2>Featured pieces to start with<\/h2>\s*<p>Use these product paths[\s\S]*?<\/ul>/g, '')
    .trim();
}

const guideProducts = {
  'best-personalized-jewelry-gifts-for-her': [
    { title: 'North & Pearl Initial Shell Necklace', handle: 'north-pearl-initial-shell-necklace' },
    { title: 'North & Pearl Heart Keepsake Necklace', handle: 'north-pearl-heart-keepsake-necklace' },
    { title: 'North & Pearl Flower Nail Bangle', handle: 'north-pearl-flower-nail-bangle' },
    { title: 'North & Pearl Bridal Water Drop Set', handle: 'north-pearl-bridal-water-drop-set' },
  ],
  'how-to-choose-a-name-necklace': [
    { title: 'North & Pearl Classic Name Necklace', handle: 'north-pearl-name-necklace' },
    { title: 'North & Pearl Custom Script Name Necklace', handle: 'north-pearl-name-necklace-7562' },
    { title: 'North & Pearl Fine Script Name Necklace', handle: 'north-pearl-name-necklace-6301' },
  ],
  'jewelry-gifts-for-mom': [
    { title: 'North & Pearl Heart Keepsake Necklace', handle: 'north-pearl-heart-keepsake-necklace' },
    { title: 'North & Pearl Bloom Pendant Necklace', handle: 'north-pearl-flower-necklace' },
    { title: 'North & Pearl Floral Accent Bracelet', handle: 'north-pearl-floral-accent-bracelet' },
  ],
  'anniversary-jewelry-gift-guide': [
    { title: 'North & Pearl Sculpted Heart Pendant', handle: 'north-pearl-heart-necklace' },
    { title: 'North & Pearl Open Heart Pendant Necklace', handle: 'north-pearl-heart-necklace-3361' },
    { title: 'North & Pearl Sweetheart Oval Pendant Necklace', handle: 'north-pearl-sweetheart-pendant-necklace' },
  ],
  'best-jewelry-gifts-under-100': [
    { title: 'North & Pearl Initial Shell Necklace', handle: 'north-pearl-initial-shell-necklace' },
    { title: 'North & Pearl Polished Oval Link Bracelet', handle: 'north-pearl-polished-link-bracelet' },
    { title: 'North & Pearl Sweetheart Drop Earrings', handle: 'north-pearl-heart-earrings-5815' },
  ],
};

const productHandles = [...new Set(Object.values(guideProducts).flat().map((product) => product.handle))];
const activeProducts = gql(
  `query ActiveProducts($query: String!) {
    products(first: 100, query: $query) {
      nodes { handle status }
    }
  }`,
  { query: productHandles.map((handle) => `handle:${handle}`).join(' OR ') },
).products.nodes;

const activeByHandle = new Map(activeProducts.map((product) => [product.handle, product.status]));
for (const handle of productHandles) {
  if (activeByHandle.get(handle) !== 'ACTIVE') {
    throw new Error(`Product handle is not active and should not be linked from guides: ${handle}`);
  }
}

const blog = gql(
  `query BlogArticles {
    blogs(first: 10, query: "handle:gift-guide") {
      nodes { id handle articles(first: 100) { nodes { id handle title body summary tags } } }
    }
  }`,
).blogs.nodes.find((item) => item.handle === 'gift-guide');

if (!blog) throw new Error('Gift Guide blog not found');

const articles = new Map(blog.articles.nodes.map((article) => [article.handle, article]));
const changed = [];

for (const [handle, products] of Object.entries(guideProducts)) {
  const article = articles.get(handle);
  if (!article) throw new Error(`Article not found: ${handle}`);
  const nextBody = `${stripExistingSection(article.body)}\n${productSection(products)}`;
  if (nextBody.trim() === article.body.trim()) continue;

  const result = gql(
    `mutation UpdateArticle($id: ID!, $article: ArticleUpdateInput!) {
      articleUpdate(id: $id, article: $article) {
        article { id handle title }
        userErrors { field message }
      }
    }`,
    {
      id: article.id,
      article: {
        title: article.title,
        handle: article.handle,
        body: nextBody,
        summary: article.summary,
        tags: article.tags,
        isPublished: true,
        author: { name: 'North & Pearl Editorial' },
      },
    },
    true,
  ).articleUpdate;

  if (result.userErrors.length) {
    throw new Error(`${handle}: ${JSON.stringify(result.userErrors)}`);
  }
  changed.push({ handle: result.article.handle, title: result.article.title });
}

console.table(changed);
console.log(`Updated product links in ${changed.length} guide article(s).`);
