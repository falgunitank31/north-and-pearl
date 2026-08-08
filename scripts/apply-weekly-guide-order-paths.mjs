import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-weekly-guide-paths-'));
const targetHandle = 'meaningful-jewelry-gifts-to-shop-this-week';

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

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function stripSection(html = '') {
  return html.replace(/<!-- np-weekly-guide-order-path:start -->[\s\S]*?<!-- np-weekly-guide-order-path:end -->/g, '').trim();
}

const collectionHandles = [
  'birthday-jewelry-gifts',
  'jewelry-gifts-for-her',
  'gifts-under-100',
  'personalized-jewelry',
];

const collectionData = gql(
  `query WeeklyGuideCollections($query: String!) {
    collections(first: 20, query: $query) {
      nodes {
        handle
        title
        products(first: 8) {
          nodes {
            handle
            title
            status
            featuredMedia {
              preview {
                image {
                  url
                }
              }
            }
          }
        }
      }
    }
  }`,
  { query: collectionHandles.map((handle) => `handle:${handle}`).join(' OR ') },
);

const collectionsByHandle = new Map(collectionData.collections.nodes.map((collection) => [collection.handle, collection]));
const products = [];
const seenProducts = new Set();

for (const handle of collectionHandles) {
  const collection = collectionsByHandle.get(handle);
  if (!collection) throw new Error(`Collection not found: ${handle}`);
  for (const product of collection.products.nodes || []) {
    if (product.status !== 'ACTIVE') continue;
    if (!product.featuredMedia?.preview?.image?.url) continue;
    if (seenProducts.has(product.handle)) continue;
    seenProducts.add(product.handle);
    products.push(product);
    if (products.length >= 4) break;
  }
  if (products.length >= 4) break;
}

if (products.length < 4) {
  throw new Error(`Weekly guide needs 4 active image-ready products; found ${products.length}`);
}

const articleData = gql(
  `query WeeklyGuideArticle {
    blogs(first: 10, query: "handle:gift-guide") {
      nodes {
        handle
        articles(first: 100) {
          nodes {
            id
            handle
            title
            body
            summary
            tags
          }
        }
      }
    }
  }`,
);

const blog = articleData.blogs.nodes.find((item) => item.handle === 'gift-guide');
if (!blog) throw new Error('Gift Guide blog not found.');
const article = blog.articles.nodes.find((item) => item.handle === targetHandle);
if (!article) throw new Error(`Article not found: ${targetHandle}`);

const collectionItems = collectionHandles.map((handle) => {
  const collection = collectionsByHandle.get(handle);
  return `<li><a href="/collections/${collection.handle}">${escapeHtml(collection.title)}</a></li>`;
});

const productItems = products.map((product) => `<li><a href="/products/${product.handle}">${escapeHtml(product.title)}</a></li>`);

const orderPathSection = [
  '<!-- np-weekly-guide-order-path:start -->',
  '<h2>Shop this guide</h2>',
  '<p>If you are ready to choose now, use these paths first. They keep the decision simple: start with the occasion, then open a product page to confirm photos, options, care notes, and product-specific details before checkout.</p>',
  '<h3>Quick product paths</h3>',
  '<ul>',
  ...productItems,
  '</ul>',
  '<h3>Shop by gift intent</h3>',
  '<ul>',
  ...collectionItems,
  '</ul>',
  '<h3>Before you choose</h3>',
  '<ul>',
  '<li>Choose a necklace or bracelet when you want an easier fit decision.</li>',
  '<li>Choose an initial, heart, name, or birthstone-inspired piece when the gift should feel more personal.</li>',
  '<li>Use the product page as the source of truth for available options, personalization fields, materials, care notes, and shipping details.</li>',
  '</ul>',
  '<!-- np-weekly-guide-order-path:end -->',
].join('\n');

const nextBody = `${stripSection(article.body)}\n\n${orderPathSection}`;

const result = gql(
  `mutation UpdateWeeklyGuide($id: ID!, $article: ArticleUpdateInput!) {
    articleUpdate(id: $id, article: $article) {
      article {
        id
        handle
        title
      }
      userErrors {
        field
        message
      }
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
  throw new Error(JSON.stringify(result.userErrors));
}

console.table([
  {
    article: result.article.title,
    handle: result.article.handle,
    products: products.length,
    collections: collectionHandles.length,
  },
]);
