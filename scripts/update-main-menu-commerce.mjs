import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-menu-update-'));
const mainMenuId = 'gid://shopify/Menu/308591231160';

function gql(query, variables = {}) {
  const queryFile = join(tempDir, `query-${Date.now()}-${Math.random()}.graphql`);
  const varsFile = join(tempDir, `vars-${Date.now()}-${Math.random()}.json`);
  const outputFile = join(tempDir, `out-${Date.now()}-${Math.random()}.json`);
  writeFileSync(queryFile, query);
  writeFileSync(varsFile, JSON.stringify(variables, null, 2));
  execFileSync(
    'npx',
    [
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
      '--allow-mutations',
    ],
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] },
  );
  return JSON.parse(readFileSync(outputFile, 'utf8'));
}

const items = [
  {
    title: 'Shop',
    type: 'HTTP',
    url: '/collections/gifts',
    items: [
      { title: 'All Jewelry', type: 'HTTP', url: '/collections/gifts' },
      { title: 'Necklaces', type: 'HTTP', url: '/collections/necklaces' },
      { title: 'Bracelets', type: 'HTTP', url: '/collections/bracelets' },
      { title: 'Rings', type: 'HTTP', url: '/collections/rings' },
      { title: 'Earrings', type: 'HTTP', url: '/collections/earrings' },
    ],
  },
  {
    title: 'Personalized',
    type: 'HTTP',
    url: '/collections/name-necklaces',
    items: [
      { title: 'Name Necklaces', type: 'HTTP', url: '/collections/name-necklaces' },
      { title: 'Initial Necklaces', type: 'HTTP', url: '/collections/initial-necklaces' },
      { title: 'Birthstone Jewelry', type: 'HTTP', url: '/collections/birthstone-jewelry' },
      { title: 'Couple Jewelry', type: 'HTTP', url: '/collections/couple-jewelry' },
    ],
  },
  {
    title: 'Gifts',
    type: 'HTTP',
    url: '/collections/gifts',
    items: [
      { title: 'Gifts for Mom', type: 'HTTP', url: '/collections/mothers-collection' },
      { title: 'Anniversary Gifts', type: 'HTTP', url: '/collections/couple-jewelry' },
      { title: 'Bridesmaid Gifts', type: 'HTTP', url: '/collections/wedding-bridesmaids' },
      { title: 'Birthstone-Inspired Gifts', type: 'HTTP', url: '/collections/birthstone-jewelry' },
    ],
  },
  { title: 'New Arrivals', type: 'HTTP', url: '/collections/new-arrivals' },
  { title: 'Best Sellers', type: 'HTTP', url: '/collections/best-sellers' },
  {
    title: 'About',
    type: 'HTTP',
    url: '/pages/about',
    items: [
      { title: 'Our Story', type: 'HTTP', url: '/pages/about' },
      { title: 'Jewelry Care', type: 'HTTP', url: '/pages/jewelry-care-guide' },
      { title: 'Personalized Jewelry Guide', type: 'HTTP', url: '/pages/personalized-jewelry-guide' },
      { title: 'FAQ', type: 'HTTP', url: '/pages/faq' },
    ],
  },
];

const result = gql(
  `mutation UpdateMainMenu($id: ID!, $title: String!, $handle: String!, $items: [MenuItemUpdateInput!]!) {
    menuUpdate(id: $id, title: $title, handle: $handle, items: $items) {
      menu {
        id
        handle
        title
        items {
          title
          type
          url
          items { title type url }
        }
      }
      userErrors { field message }
    }
  }`,
  {
    id: mainMenuId,
    title: 'Main menu',
    handle: 'main-menu',
    items,
  },
);

console.log(JSON.stringify(result, null, 2));
if (result.menuUpdate?.userErrors?.length) {
  process.exitCode = 1;
}
