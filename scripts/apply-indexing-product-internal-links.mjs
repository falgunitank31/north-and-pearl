import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-index-product-links-'));
const today = new Date().toISOString().slice(0, 10);
const reportPath = `reports/indexing-product-internal-links-${today}.md`;

const priorityProducts = [
  {
    handle: 'north-pearl-heart-keepsake-necklace',
    related: [
      ['North & Pearl Sweetheart Oval Pendant Necklace', 'north-pearl-sweetheart-pendant-necklace'],
      ['North & Pearl Sculpted Heart Pendant', 'north-pearl-heart-necklace'],
      ['North & Pearl Open Heart Pendant Necklace', 'north-pearl-heart-necklace-3361'],
    ],
    collections: [
      ['Jewelry Gifts for Her', '/collections/jewelry-gifts-for-her'],
      ['Anniversary Gifts', '/collections/anniversary-gifts'],
      ['Gifts Under $100', '/collections/gifts-under-100'],
    ],
  },
  {
    handle: 'north-pearl-flower-nail-bangle',
    related: [
      ['North & Pearl Floral Accent Bracelet', 'north-pearl-floral-accent-bracelet'],
      ['North & Pearl Bloom Charm Bracelet', 'north-pearl-bloom-charm-bracelet'],
      ['North & Pearl Garden Bloom Bracelet', 'north-pearl-garden-bloom-bracelet'],
    ],
    collections: [
      ['Bracelets', '/collections/bracelets'],
      ['Jewelry Gifts for Her', '/collections/jewelry-gifts-for-her'],
      ['Gifts Under $100', '/collections/gifts-under-100'],
    ],
  },
  {
    handle: 'north-pearl-pink-heart-bow-bracelet',
    related: [
      ['North & Pearl Heart Bracelet', 'north-pearl-heart-bracelet'],
      ['North & Pearl Sparkle Accent Bracelet', 'north-pearl-sparkle-accent-bracelet'],
      ['North & Pearl Mixed Charm Bangle', 'north-pearl-mixed-charm-bangle'],
    ],
    collections: [
      ['Bracelets', '/collections/bracelets'],
      ['Birthday Jewelry Gifts', '/collections/birthday-jewelry-gifts'],
      ['Gifts Under $50', '/collections/gifts-under-50'],
    ],
  },
  {
    handle: 'north-pearl-dainty-flower-necklace',
    related: [
      ['North & Pearl Bloom Pendant Necklace', 'north-pearl-flower-necklace'],
      ['North & Pearl Heart Charm Necklace', 'north-pearl-heart-charm-necklace'],
      ['North & Pearl Iridescent Pendant Necklace', 'north-pearl-iridescent-pendant-necklace'],
    ],
    collections: [
      ['Necklaces', '/collections/necklaces'],
      ['Birthday Jewelry Gifts', '/collections/birthday-jewelry-gifts'],
      ['Jewelry Gifts for Her', '/collections/jewelry-gifts-for-her'],
    ],
  },
  {
    handle: 'north-pearl-clover-charm-bracelet',
    related: [
      ['North & Pearl Clover Bracelet', 'north-pearl-clover-bracelet'],
      ['North & Pearl Sparkle Link Bracelet', 'north-pearl-sparkle-link-bracelet'],
      ['North & Pearl Bloom Charm Bracelet', 'north-pearl-bloom-charm-bracelet'],
    ],
    collections: [
      ['Bracelets', '/collections/bracelets'],
      ['Gifts Under $50', '/collections/gifts-under-50'],
      ['Gifts Under $100', '/collections/gifts-under-100'],
    ],
  },
  {
    handle: 'north-pearl-personalized-nameplate-necklace',
    related: [
      ['North & Pearl Classic Name Necklace', 'north-pearl-name-necklace'],
      ['North & Pearl Script Floating Name Necklace', 'north-pearl-name-necklace-6152'],
      ['North & Pearl Initial Shell Necklace', 'north-pearl-initial-shell-necklace'],
    ],
    collections: [
      ['Name Necklaces', '/collections/name-necklaces'],
      ['Personalized Jewelry', '/collections/personalized-jewelry'],
      ['Initial Necklaces', '/collections/initial-necklaces'],
    ],
  },
  {
    handle: 'north-pearl-twine-band-ring',
    related: [
      ['North & Pearl Modern Statement Ring', 'north-pearl-modern-statement-ring'],
      ['North & Pearl Heart Ring', 'north-pearl-heart-ring'],
      ['North & Pearl Polished Sparkle Ring', 'north-pearl-sparkle-ring-4269'],
    ],
    collections: [
      ['Rings', '/collections/rings'],
      ['Gifts Under $50', '/collections/gifts-under-50'],
      ['Jewelry Gifts for Her', '/collections/jewelry-gifts-for-her'],
    ],
  },
  {
    handle: 'north-pearl-water-drop-jewelry-set',
    related: [
      ['North & Pearl Bridal Water Drop Set', 'north-pearl-bridal-water-drop-set'],
      ['North & Pearl V Water Drop Jewelry Set', 'north-pearl-v-water-drop-jewelry-set'],
      ['North & Pearl Modern Drop Earrings', 'north-pearl-modern-drop-earrings'],
    ],
    collections: [
      ['Wedding & Bridesmaids', '/collections/wedding-bridesmaids'],
      ['Earrings', '/collections/earrings'],
      ['Jewelry Gifts for Her', '/collections/jewelry-gifts-for-her'],
    ],
  },
  {
    handle: 'north-pearl-mixed-charm-bangle',
    related: [
      ['North & Pearl Flower Nail Bangle', 'north-pearl-flower-nail-bangle'],
      ['North & Pearl Pink Heart Bow Bracelet', 'north-pearl-pink-heart-bow-bracelet'],
      ['North & Pearl Hollow Flower Bangle Set', 'north-pearl-hollow-flower-bangle-set'],
    ],
    collections: [
      ['Bracelets', '/collections/bracelets'],
      ['Birthday Jewelry Gifts', '/collections/birthday-jewelry-gifts'],
      ['Gifts Under $100', '/collections/gifts-under-100'],
    ],
  },
  {
    handle: 'north-pearl-sparkle-accent-bracelet',
    related: [
      ['North & Pearl Sparkle Pulse Bracelet', 'north-pearl-sparkle-pulse-bracelet'],
      ['North & Pearl Sparkle Halo Bracelet', 'north-pearl-sparkle-halo-bracelet'],
      ['North & Pearl Sparkle Row Bracelet', 'north-pearl-sparkle-row-bracelet'],
    ],
    collections: [
      ['Bracelets', '/collections/bracelets'],
      ['Best Sellers', '/collections/best-sellers'],
      ['Gifts Under $50', '/collections/gifts-under-50'],
    ],
  },
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

function stripExistingLinkBlock(html = '') {
  return html
    .replace(/<h3>More ways to shop at North &amp; Pearl<\/h3>\s*<p>Compare this piece[\s\S]*?<\/ul>/g, '')
    .trim();
}

function linkBlock(plan, activeByHandle) {
  const activeRelated = plan.related.filter(([, handle]) => activeByHandle.get(handle)?.status === 'ACTIVE');
  const productLinks = activeRelated.map(
    ([title, handle]) => `<li><a href="/products/${handle}">${title}</a></li>`,
  );
  const collectionLinks = plan.collections.map(([label, href]) => `<li><a href="${href}">${label}</a></li>`);

  return [
    '<h3>More ways to shop at North &amp; Pearl</h3>',
    '<p>Compare this piece with related styles and customer-friendly shopping paths before you decide.</p>',
    '<ul>',
    ...productLinks,
    ...collectionLinks,
    '</ul>',
  ].join('');
}

const handles = [
  ...new Set([
    ...priorityProducts.map((item) => item.handle),
    ...priorityProducts.flatMap((item) => item.related.map(([, handle]) => handle)),
  ]),
];

const products = gql(
  `query PriorityInternalLinkProducts($query: String!) {
    products(first: 100, query: $query) {
      nodes {
        id
        handle
        title
        status
        descriptionHtml
        onlineStoreUrl
        featuredMedia { preview { image { url width height } } }
        variants(first: 5) { nodes { availableForSale price } }
      }
    }
  }`,
  { query: handles.map((handle) => `handle:${handle}`).join(' OR ') },
).products.nodes;

const activeByHandle = new Map(products.map((product) => [product.handle, product]));
const changed = [];
const skipped = [];

for (const plan of priorityProducts) {
  const product = activeByHandle.get(plan.handle);
  if (!product) {
    skipped.push({ handle: plan.handle, reason: 'not found' });
    continue;
  }
  if (product.status !== 'ACTIVE') {
    skipped.push({ handle: plan.handle, reason: `status ${product.status}` });
    continue;
  }
  if (!product.featuredMedia?.preview?.image?.url) {
    skipped.push({ handle: plan.handle, reason: 'no featured image' });
    continue;
  }
  if (!product.variants.nodes.some((variant) => variant.availableForSale)) {
    skipped.push({ handle: plan.handle, reason: 'not available for sale' });
    continue;
  }

  const nextDescription = `${stripExistingLinkBlock(product.descriptionHtml)}\n${linkBlock(plan, activeByHandle)}`.trim();
  if (nextDescription === product.descriptionHtml.trim()) {
    skipped.push({ handle: plan.handle, reason: 'already current' });
    continue;
  }

  const result = gql(
    `mutation UpdateProductInternalLinks($product: ProductUpdateInput!) {
      productUpdate(product: $product) {
        product { id handle title }
        userErrors { field message }
      }
    }`,
    {
      product: {
        id: product.id,
        descriptionHtml: nextDescription,
      },
    },
    true,
  ).productUpdate;

  if (result.userErrors.length) {
    skipped.push({ handle: plan.handle, reason: JSON.stringify(result.userErrors) });
    continue;
  }

  changed.push({
    title: result.product.title,
    handle: result.product.handle,
    relatedLinks: plan.related.filter(([, handle]) => activeByHandle.get(handle)?.status === 'ACTIVE').length,
    collectionLinks: plan.collections.length,
  });
}

function mdCell(value = '') {
  return String(value).replaceAll('|', '\\|');
}

const report = [
  `# Indexing Product Internal Links - ${today}`,
  '',
  '## Summary',
  '',
  `- Priority product records targeted: ${priorityProducts.length}`,
  `- Product records updated: ${changed.length}`,
  `- Product records skipped: ${skipped.length}`,
  '',
  'Faraday, Gauss, Kuhn, and Tesla strengthened internal links for priority products that were unknown, discovered/not-indexed, or crawled/not-indexed in the August 5 indexing dashboard. The link block is intentionally compact and customer-facing so it helps discovery without making collection pages more text-heavy.',
  '',
  '## Updated Products',
  '',
  '| Product | Handle | Related Product Links | Collection Links |',
  '| --- | --- | ---: | ---: |',
  ...changed.map(
    (item) =>
      `| ${mdCell(item.title)} | \`${mdCell(item.handle)}\` | ${item.relatedLinks} | ${item.collectionLinks} |`,
  ),
  '',
  '## Skipped Products',
  '',
  skipped.length
    ? ['| Handle | Reason |', '| --- | --- |', ...skipped.map((item) => `| \`${item.handle}\` | ${mdCell(item.reason)} |`)].join('\n')
    : '- None',
  '',
  '## Safety Notes',
  '',
  '- No product handles, prices, variants, inventory, images, materials, shipping promises, return promises, discounts, or customer/order data were changed.',
  '- No unsupported material, allergy, waterproof, tarnish-free, review, rating, scarcity, or supplier claims were added.',
  '- Product links point only to active Shopify products verified during the update.',
].join('\n');

writeFileSync(reportPath, report);
console.table(changed);
console.log(`Wrote ${reportPath}`);
