import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-collection-guides-'));

const guides = {
  gifts: [
    ['Best Personalized Jewelry Gifts for Her', '/blogs/gift-guide/best-personalized-jewelry-gifts-for-her'],
    ['Jewelry Gifts for Mom', '/blogs/gift-guide/jewelry-gifts-for-mom'],
    ['Birthstone Jewelry Gift Guide', '/blogs/gift-guide/birthstone-jewelry-gift-guide'],
  ],
  'name-necklaces': [
    ['How to Choose a Name Necklace', '/blogs/gift-guide/how-to-choose-a-name-necklace'],
    ['Best Personalized Jewelry Gifts for Her', '/blogs/gift-guide/best-personalized-jewelry-gifts-for-her'],
  ],
  'initial-necklaces': [
    ['Best Personalized Jewelry Gifts for Her', '/blogs/gift-guide/best-personalized-jewelry-gifts-for-her'],
    ['Bridesmaid Jewelry Gift Ideas', '/blogs/gift-guide/bridesmaid-jewelry-gift-ideas'],
  ],
  'birthstone-jewelry': [
    ['Birthstone Jewelry Gift Guide', '/blogs/gift-guide/birthstone-jewelry-gift-guide'],
    ['Jewelry Gifts for Mom', '/blogs/gift-guide/jewelry-gifts-for-mom'],
  ],
  'mothers-collection': [
    ['Jewelry Gifts for Mom', '/blogs/gift-guide/jewelry-gifts-for-mom'],
    ['Birthstone Jewelry Gift Guide', '/blogs/gift-guide/birthstone-jewelry-gift-guide'],
  ],
  'wedding-bridesmaids': [
    ['Bridesmaid Jewelry Gift Ideas', '/blogs/gift-guide/bridesmaid-jewelry-gift-ideas'],
    ['Best Personalized Jewelry Gifts for Her', '/blogs/gift-guide/best-personalized-jewelry-gifts-for-her'],
  ],
  necklaces: [
    ['How to Choose a Name Necklace', '/blogs/gift-guide/how-to-choose-a-name-necklace'],
    ['Best Personalized Jewelry Gifts for Her', '/blogs/gift-guide/best-personalized-jewelry-gifts-for-her'],
  ],
  bracelets: [
    ['Best Personalized Jewelry Gifts for Her', '/blogs/gift-guide/best-personalized-jewelry-gifts-for-her'],
    ['Jewelry Gifts for Mom', '/blogs/gift-guide/jewelry-gifts-for-mom'],
  ],
  rings: [
    ['Birthstone Jewelry Gift Guide', '/blogs/gift-guide/birthstone-jewelry-gift-guide'],
    ['Best Personalized Jewelry Gifts for Her', '/blogs/gift-guide/best-personalized-jewelry-gifts-for-her'],
  ],
  earrings: [
    ['Bridesmaid Jewelry Gift Ideas', '/blogs/gift-guide/bridesmaid-jewelry-gift-ideas'],
    ['Best Personalized Jewelry Gifts for Her', '/blogs/gift-guide/best-personalized-jewelry-gifts-for-her'],
  ],
  'best-sellers': [
    ['Best Personalized Jewelry Gifts for Her', '/blogs/gift-guide/best-personalized-jewelry-gifts-for-her'],
    ['Jewelry Gifts for Mom', '/blogs/gift-guide/jewelry-gifts-for-mom'],
  ],
  'couple-jewelry': [
    ['Best Personalized Jewelry Gifts for Her', '/blogs/gift-guide/best-personalized-jewelry-gifts-for-her'],
    ['How to Choose a Name Necklace', '/blogs/gift-guide/how-to-choose-a-name-necklace'],
  ],
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

function guideBlock(handle) {
  const links = guides[handle];
  if (!links) return '';
  return [
    '<h3>Helpful North &amp; Pearl guides</h3>',
    '<ul>',
    ...links.map(([label, href]) => `<li><a href="${href}">${label}</a></li>`),
    '</ul>',
  ].join('');
}

function stripExistingGuideBlock(html = '') {
  return html.replace(/<h3>Helpful North &amp; Pearl guides<\/h3>\s*<ul>[\s\S]*?<\/ul>/g, '').trim();
}

const collections = gql(
  `query CollectionGuideAudit($query: String!) {
    collections(first: 50, query: $query) {
      nodes { id handle title descriptionHtml }
    }
  }`,
  { query: Object.keys(guides).map((handle) => `handle:${handle}`).join(' OR ') },
).collections.nodes;

const changed = [];

for (const collection of collections) {
  const baseDescription = stripExistingGuideBlock(collection.descriptionHtml);
  const nextDescription = `${baseDescription}\n${guideBlock(collection.handle)}`.trim();
  if (nextDescription === collection.descriptionHtml.trim()) continue;

  const result = gql(
    `mutation UpdateCollectionGuides($input: CollectionInput!) {
      collectionUpdate(input: $input) {
        collection { id handle title }
        userErrors { field message }
      }
    }`,
    {
      input: {
        id: collection.id,
        descriptionHtml: nextDescription,
      },
    },
    true,
  ).collectionUpdate;

  if (result.userErrors.length) {
    console.log(`warning ${collection.handle}: ${JSON.stringify(result.userErrors)}`);
  } else {
    changed.push({ handle: result.collection.handle, title: result.collection.title });
  }
}

console.table(changed);
console.log(`Updated guide internal links for ${changed.length} collection(s).`);
