import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-weak-guide-links-'));

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

const guidePlans = [
  {
    handle: 'birthstone-jewelry-gift-guide',
    collectionHandles: ['birthstone-jewelry', 'birthday-jewelry-gifts', 'jewelry-gifts-for-her'],
    checklist: [
      'Choose the birth month, color story, or symbolic detail before comparing styles.',
      'Open each product page to review exact options, photos, care notes, and item-specific details.',
      'Keep the gift message focused on meaning unless a material or stone detail is confirmed on the product page.',
    ],
  },
  {
    handle: 'bridesmaid-jewelry-gift-ideas',
    collectionHandles: ['wedding-bridesmaids', 'jewelry-gifts-for-her', 'gifts-under-100'],
    checklist: [
      'Start with pieces that feel polished enough for the wedding day and wearable afterward.',
      'Use one shared style direction, then choose individual pieces when each recipient has a different taste.',
      'Review product pages for exact availability and options before planning a group order.',
    ],
  },
  {
    handle: 'personalized-jewelry-for-mothers-day',
    collectionHandles: ['mothers-collection', 'personalized-jewelry', 'jewelry-gifts-for-her'],
    checklist: [
      'Choose a piece connected to a name, initial, child, date, or everyday symbol she will recognize.',
      'Keep the style wearable for ordinary days, not just the holiday moment.',
      'Confirm personalization fields and product-specific details before checkout.',
    ],
  },
  {
    handle: 'personalized-jewelry-for-couples',
    collectionHandles: ['couple-jewelry', 'personalized-jewelry', 'anniversary-gifts'],
    checklist: [
      'Choose a piece that points to the relationship without becoming difficult to wear.',
      'Match the product style to the recipient first, then add the symbolic or personalized detail.',
      'Review each product page for exact personalization options and available variants.',
    ],
  },
  {
    handle: 'best-name-necklace-gifts-for-her',
    collectionHandles: ['name-necklaces', 'personalized-jewelry', 'jewelry-gifts-for-her'],
    checklist: [
      'Confirm the spelling before choosing a name necklace or name-inspired style.',
      'Choose script, charm, or pendant styling based on how subtle or expressive she likes her jewelry.',
      'Use the product page as the source of truth for exact personalization and product details.',
    ],
  },
  {
    handle: 'jewelry-gifts-under-100',
    collectionHandles: ['gifts-under-100', 'jewelry-gifts-for-her', 'birthday-jewelry-gifts'],
    checklist: [
      'Start with the recipient and occasion, then compare styles inside the price range.',
      'Look for a piece that feels giftable without depending on a discount or artificial urgency.',
      'Review product photos and product-specific details before ordering.',
    ],
  },
  {
    handle: 'how-to-layer-necklaces',
    collectionHandles: ['necklaces', 'name-necklaces', 'initial-necklaces'],
    checklist: [
      'Start with one focal necklace, then add one simpler piece to avoid visual clutter.',
      'Mix pendant shapes and chain styles carefully so each piece remains visible.',
      'Check each product page for available lengths, variants, and product-specific details.',
    ],
  },
];

const collectionHandles = [...new Set(guidePlans.flatMap((plan) => plan.collectionHandles))];

const collectionData = gql(
  `query CollectionsForGuideLinks($query: String!) {
    collections(first: 50, query: $query) {
      nodes {
        handle
        title
        products(first: 6) {
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

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function stripFaradaySection(html = '') {
  return html.replace(/<!-- np-faraday-commercial-routing:start -->[\s\S]*?<!-- np-faraday-commercial-routing:end -->/g, '').trim();
}

function selectedProducts(plan) {
  const seen = new Set();
  const products = [];
  for (const handle of plan.collectionHandles) {
    const collection = collectionsByHandle.get(handle);
    if (!collection) throw new Error(`Collection not found: ${handle}`);
    for (const product of collection.products.nodes) {
      if (product.status !== 'ACTIVE') continue;
      if (!product.featuredMedia?.preview?.image?.url) continue;
      if (seen.has(product.handle)) continue;
      seen.add(product.handle);
      products.push(product);
      if (products.length >= 3) return products;
    }
  }
  return products;
}

function commercialSection(plan) {
  const collections = plan.collectionHandles.map((handle) => {
    const collection = collectionsByHandle.get(handle);
    if (!collection) throw new Error(`Collection not found: ${handle}`);
    return collection;
  });
  const products = selectedProducts(plan);
  if (products.length < 3) {
    throw new Error(`${plan.handle}: fewer than 3 active image-ready products found`);
  }

  return [
    '<!-- np-faraday-commercial-routing:start -->',
    '<h2>Shop this guide</h2>',
    '<p>Use these product and collection paths to move from the idea in this guide into real North &amp; Pearl pieces. Product details can vary by item, so always review the product page before ordering.</p>',
    '<h3>Recommended product paths</h3>',
    '<ul>',
    ...products.map((product) => `<li><a href="/products/${product.handle}">${escapeHtml(product.title)}</a></li>`),
    '</ul>',
    '<h3>Helpful collections</h3>',
    '<ul>',
    ...collections.map((collection) => `<li><a href="/collections/${collection.handle}">${escapeHtml(collection.title)}</a></li>`),
    '</ul>',
    '<h3>Before you choose</h3>',
    '<ul>',
    ...plan.checklist.map((item) => `<li>${escapeHtml(item)}</li>`),
    '</ul>',
    '<!-- np-faraday-commercial-routing:end -->',
  ].join('\n');
}

const blog = gql(
  `query GiftGuideArticles {
    blogs(first: 10, query: "handle:gift-guide") {
      nodes {
        id
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
).blogs.nodes.find((item) => item.handle === 'gift-guide');

if (!blog) throw new Error('Gift Guide blog not found');

const articlesByHandle = new Map(blog.articles.nodes.map((article) => [article.handle, article]));
const changed = [];

for (const plan of guidePlans) {
  const article = articlesByHandle.get(plan.handle);
  if (!article) throw new Error(`Article not found: ${plan.handle}`);
  const nextBody = `${stripFaradaySection(article.body)}\n\n${commercialSection(plan)}`;
  if (nextBody.trim() === article.body.trim()) continue;

  const result = gql(
    `mutation UpdateGuideArticle($id: ID!, $article: ArticleUpdateInput!) {
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
    throw new Error(`${plan.handle}: ${JSON.stringify(result.userErrors)}`);
  }
  changed.push({ handle: result.article.handle, title: result.article.title });
}

console.table(changed);
console.log(`Updated commercial routing in ${changed.length} guide article(s).`);
