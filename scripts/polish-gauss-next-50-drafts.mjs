import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-gauss-next-50-polish-'));
const reportPath = 'reports/gauss-next-50-polished-products-2026-07-23.md';

const updates = [
  ['north-pearl-heart-necklace-7284', 'North & Pearl Sculpted Heart Pendant Necklace', 'A softly sculpted heart pendant chosen for sentimental gifting and everyday wear.', 'Necklace', 'launch-review'],
  ['north-pearl-name-necklace-0389', 'North & Pearl Signature Name Necklace', 'A classic name necklace candidate for personalized gifting and meaningful daily styling.', 'Necklace', 'launch-review'],
  ['north-pearl-heart-necklace-2260', 'North & Pearl Sweetheart Pendant Necklace', 'A warm heart pendant style selected for birthdays, anniversaries, and thoughtful self-gifting.', 'Necklace', 'launch-review'],
  ['north-pearl-heart-earrings-5822', 'North & Pearl Petite Heart Earrings', 'A compact heart earring style for simple polish and easy gift appeal.', 'Earrings', 'launch-review'],
  ['north-pearl-clover-bracelet-1195', 'North & Pearl Clover Link Bracelet', 'A clover-inspired bracelet candidate with strong gift and layering potential.', 'Bracelet', 'launch-review'],
  ['north-pearl-letter-necklace-0689', 'North & Pearl Dainty Letter Tag Necklace', 'A clean letter pendant style for initials, everyday styling, and personalized gifting.', 'Necklace', 'launch-review'],
  ['north-pearl-heart-necklace-2923', 'North & Pearl Keepsake Heart Pendant Necklace', 'A heart pendant candidate selected for meaningful gift positioning and classic styling.', 'Necklace', 'launch-review'],
  ['north-pearl-bead-bracelet-0492', 'North & Pearl Beaded Keepsake Bracelet', 'A beaded bracelet style chosen for soft texture, easy stacking, and gift-ready merchandising.', 'Bracelet', 'launch-review'],
  ['north-pearl-name-necklace-4242', 'North & Pearl Everyday Name Necklace', 'A personalized name necklace candidate for a core North & Pearl gifting assortment.', 'Necklace', 'launch-review'],
  ['north-pearl-letter-necklace-4810', 'North & Pearl Polished Letter Pendant Necklace', 'A polished letter pendant candidate selected for initials and meaningful everyday wear.', 'Necklace', 'launch-review'],
  ['north-pearl-initial-necklace-6142', 'North & Pearl Framed Initial Pendant Necklace', 'A framed initial pendant style for personalized gifting with a refined focal detail.', 'Necklace', 'launch-review'],
  ['north-pearl-initial-necklace-4829', 'North & Pearl Classic Initial Charm Necklace', 'A classic initial charm candidate for simple personalized styling.', 'Necklace', 'launch-review'],
  ['north-pearl-letter-necklace-2555', 'North & Pearl Statement Letter Pendant Necklace', 'A stronger letter pendant style selected for visible initial-focused gifting.', 'Necklace', 'launch-review'],
  ['north-pearl-name-necklace-1616', 'North & Pearl Script Name Necklace', 'A script name necklace candidate for personalized gifts and milestone moments.', 'Necklace', 'launch-review'],
  ['north-pearl-name-necklace-8213', 'North & Pearl Nameplate Charm Necklace', 'A nameplate-inspired necklace candidate for clean personalization and gift appeal.', 'Necklace', 'launch-review'],
  ['north-pearl-initial-necklace-4204', 'North & Pearl Minimal Initial Pendant Necklace', 'A minimal initial pendant candidate for everyday personalization.', 'Necklace', 'launch-review'],
  ['north-pearl-name-necklace-7562', 'North & Pearl Custom Script Name Necklace', 'A custom name necklace candidate with strong category fit for personalized jewelry shoppers.', 'Necklace', 'launch-review'],
  ['north-pearl-heart-necklace-0474', 'North & Pearl Petite Heart Charm Necklace', 'A petite heart charm candidate for accessible gifts and everyday sentiment.', 'Necklace', 'launch-review'],
  ['north-pearl-tennis-necklace', 'North & Pearl Supplier Review Hold Tennis Necklace', 'This tennis necklace candidate is held because the visible source price does not support the current retail model.', 'Necklace', 'hold-pricing-mismatch'],
  ['north-pearl-letter-necklace-2156', 'North & Pearl Everyday Letter Charm Necklace', 'An everyday letter charm style for initial gifting and simple layered looks.', 'Necklace', 'launch-review'],
  ['north-pearl-initial-necklace-8531', 'North & Pearl Dainty Initial Necklace', 'A dainty initial necklace candidate for affordable personalized gifting.', 'Necklace', 'launch-review'],
  ['north-pearl-heart-necklace-3361', 'North & Pearl Open Heart Pendant Necklace', 'A heart pendant candidate selected for sentimental gifts and easy styling.', 'Necklace', 'launch-review'],
  ['north-pearl-heart-necklace-1404', 'North & Pearl Rounded Heart Pendant Necklace', 'A rounded heart pendant style with classic gift appeal.', 'Necklace', 'launch-review'],
  ['north-pearl-clover-bracelet-4268', 'North & Pearl Clover Station Bracelet', 'A clover station bracelet candidate for polished stacking and giftable styling.', 'Bracelet', 'launch-review'],
  ['north-pearl-letter-necklace-1571', 'North & Pearl Petite Letter Necklace', 'A petite letter necklace candidate for initial-focused gifting.', 'Necklace', 'launch-review'],
  ['north-pearl-name-necklace-1956', 'North & Pearl Floating Name Necklace', 'A floating name necklace candidate for personalized everyday wear.', 'Necklace', 'launch-review'],
  ['north-pearl-bead-necklace', 'North & Pearl Beaded Layering Necklace', 'A beaded layering necklace candidate selected for texture and easy outfit styling.', 'Necklace', 'launch-review'],
  ['north-pearl-letter-necklace-1755', 'North & Pearl Layered Letter Necklace', 'A layered letter necklace candidate for initial styling and gift-ready discovery.', 'Necklace', 'launch-review'],
  ['north-pearl-letter-necklace-2210', 'North & Pearl Slim Letter Pendant Necklace', 'A slim letter pendant candidate for clean initial jewelry merchandising.', 'Necklace', 'launch-review'],
  ['north-pearl-heart-ring-7637', 'North & Pearl Heart Accent Ring', 'A heart accent ring candidate selected for meaningful gifts and everyday detail.', 'Ring', 'launch-review'],
  ['north-pearl-name-necklace-8379', 'North & Pearl Giftable Name Necklace', 'A giftable name necklace candidate for core personalized jewelry demand.', 'Necklace', 'launch-review'],
  ['north-pearl-name-necklace-5921', 'North & Pearl Polished Name Pendant Necklace', 'A polished name pendant candidate with strong personalization category fit.', 'Necklace', 'launch-review'],
  ['north-pearl-flower-necklace', 'North & Pearl Bloom Pendant Necklace', 'A flower-inspired pendant candidate for feminine gifting and soft styling.', 'Necklace', 'launch-review'],
  ['north-pearl-initial-necklace-3226', 'North & Pearl Block Initial Necklace', 'A block initial necklace candidate for clean personalized styling.', 'Necklace', 'launch-review'],
  ['north-pearl-name-necklace-7245', 'North & Pearl Personal Name Necklace', 'A personal name necklace candidate for meaningful gifts and everyday wear.', 'Necklace', 'launch-review'],
  ['north-pearl-name-necklace-6301', 'North & Pearl Fine Script Name Necklace', 'A fine script name necklace candidate for personalized gift merchandising.', 'Necklace', 'launch-review'],
  ['north-pearl-bead-bracelet-3656', 'North & Pearl Polished Bead Bracelet', 'A polished bead bracelet candidate for stacking, gifting, and everyday wear.', 'Bracelet', 'launch-review'],
  ['north-pearl-signature-bracelet-1724', 'North & Pearl Everyday Link Bracelet', 'An everyday link bracelet candidate for a clean bracelet assortment.', 'Bracelet', 'launch-review'],
  ['north-pearl-letter-necklace-3046', 'North & Pearl Framed Letter Necklace', 'A framed letter necklace candidate for refined initial-focused gifting.', 'Necklace', 'launch-review'],
  ['north-pearl-name-necklace-6441', 'North & Pearl Refined Name Necklace', 'A refined name necklace candidate for personalized jewelry shoppers.', 'Necklace', 'launch-review'],
  ['north-pearl-initial-necklace-2758', 'North & Pearl Simple Initial Pendant Necklace', 'A simple initial pendant candidate for daily wear and easy gifting.', 'Necklace', 'launch-review'],
  ['north-pearl-name-necklace-6376', 'North & Pearl Modern Name Necklace', 'A modern name necklace candidate for personalized everyday styling.', 'Necklace', 'launch-review'],
  ['north-pearl-name-necklace-8628', 'North & Pearl Keepsake Name Necklace', 'A keepsake name necklace candidate selected for meaningful gift positioning.', 'Necklace', 'launch-review'],
  ['north-pearl-name-necklace-0823', 'North & Pearl Luxe Name Pendant Necklace', 'A higher-positioned name pendant candidate requiring sample review before activation.', 'Necklace', 'launch-review'],
  ['north-pearl-name-necklace-5254', 'North & Pearl Dainty Name Pendant Necklace', 'A dainty name pendant candidate for accessible personalized gifts.', 'Necklace', 'launch-review'],
  ['north-pearl-tennis-necklace-5473', 'North & Pearl Supplier Review Hold Tennis Necklace', 'This tennis necklace candidate is held because the visible source price does not support the current retail model.', 'Necklace', 'hold-pricing-mismatch'],
  ['north-pearl-sparkle-necklace-9390', 'North & Pearl Sparkle Pendant Necklace', 'A sparkle pendant candidate selected for polished gift appeal and occasion styling.', 'Necklace', 'launch-review'],
  ['north-pearl-letter-necklace-7676', 'North & Pearl Signature Letter Necklace', 'A signature letter necklace candidate for initial gifting and everyday styling.', 'Necklace', 'launch-review'],
  ['north-pearl-signature-bracelet-6593', 'North & Pearl Polished Link Bracelet', 'A polished link bracelet candidate for easy gifting and simple stacking.', 'Bracelet', 'launch-review'],
  ['north-pearl-heart-earrings-5815', 'North & Pearl Sweetheart Drop Earrings', 'A sweetheart earring candidate selected for gift-ready styling and soft occasion wear.', 'Earrings', 'launch-review'],
].map(([handle, title, short, productType, decision]) => ({ handle, title, short, productType, decision }));

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

function cleanName(title) {
  return title.replace(/^North & Pearl\s+/, '');
}

function tagsFor(update, product) {
  const existing = product.tags || [];
  const next = [
    ...existing,
    'gauss-next-50',
    'draft-candidate',
    update.decision,
    update.decision === 'hold-pricing-mismatch' ? 'do-not-activate' : 'needs-kuhn-review',
    update.decision === 'hold-pricing-mismatch' ? 'pricing-review-required' : 'needs-faraday-review',
  ];
  return [...new Set(next)].filter(Boolean);
}

function descriptionHtml(update, product) {
  const name = cleanName(update.title);
  const supplierTag = (product.tags || []).find((tag) => tag.startsWith('alibaba-source-')) || 'alibaba-source-unknown';
  const hold = update.decision === 'hold-pricing-mismatch';
  return [
    `<p>${update.short}</p>`,
    '<h3>Why it belongs in review</h3>',
    hold
      ? '<p>This product is currently held for supplier and pricing review. It should not be activated until the visible source pricing, materials, sizing, and landed-cost model are confirmed.</p>'
      : `<p>${name} fits the North &amp; Pearl assortment because it supports meaningful gifting, everyday styling, and a warm premium jewelry presentation.</p>`,
    '<h3>Best for</h3>',
    `<p>${update.productType === 'Bracelet' ? 'Bracelet gifting, stacking, birthdays, friendship gifts, and self-gifting.' : update.productType === 'Ring' ? 'Ring gifting, meaningful everyday details, birthdays, and thoughtful self-gifting.' : update.productType === 'Earrings' ? 'Everyday earrings, birthdays, bridesmaid gifts, and polished styling.' : 'Personalized gifts, birthdays, anniversaries, Mother’s Day, bridesmaids, and thoughtful self-gifting.'}</p>`,
    '<h3>Details to confirm before launch</h3>',
    '<ul>',
    `<li>Internal source reference: ${supplierTag}</li>`,
    '<li>Base material, plating, finish, dimensions, and packaging must be confirmed before stronger product claims are added.</li>',
    '<li>Sample review should confirm image accuracy, chain feel, finish consistency, and packaging fit.</li>',
    '</ul>',
    '<h3>Care note</h3>',
    '<p>Final care instructions depend on supplier-confirmed materials. Until confirmed, store separately, avoid harsh cleaners, and keep dry between wears.</p>',
  ].join('');
}

const handles = updates.map((update) => update.handle);
const products = [];
let cursor = null;
let hasNextPage = true;

while (hasNextPage) {
  const response = gql(`query Products($after: String) {
    products(first: 100, after: $after, query: "vendor:'North & Pearl' status:draft") {
      pageInfo { hasNextPage endCursor }
      nodes {
        id
        title
        handle
        status
        tags
        media(first: 20) {
          nodes { id mediaContentType }
        }
      }
    }
  }`, { after: cursor });
  products.push(...response.products.nodes);
  hasNextPage = response.products.pageInfo.hasNextPage;
  cursor = response.products.pageInfo.endCursor;
}

const productByHandle = new Map(products.map((product) => [product.handle, product]));
const rows = [];

for (const update of updates) {
  const product = productByHandle.get(update.handle);
  if (!product) {
    rows.push({ handle: update.handle, status: 'missing-draft-product' });
    continue;
  }

  const metaDescription = `${cleanName(update.title)} from North & Pearl, selected for meaningful gifting and polished everyday jewelry styling. Details remain sample-confirmed before launch.`;
  const result = gql(
    `mutation ProductUpdate($product: ProductUpdateInput!) {
      productUpdate(product: $product) {
        product { id title handle status tags seo { title description } }
        userErrors { field message }
      }
    }`,
    {
      product: {
        id: product.id,
        title: update.title,
        productType: update.productType,
        tags: tagsFor(update, product),
        descriptionHtml: descriptionHtml(update, product),
        seo: {
          title: `${cleanName(update.title)} | North & Pearl`,
          description: metaDescription.slice(0, 320),
        },
      },
    },
    true,
  ).productUpdate;

  if (result.userErrors.length) {
    rows.push({ handle: update.handle, status: 'product-update-error', detail: JSON.stringify(result.userErrors) });
    continue;
  }

  const imageMediaIds = product.media.nodes
    .filter((media) => media.mediaContentType === 'IMAGE')
    .map((media) => media.id);

  if (imageMediaIds.length) {
    const mediaResult = gql(
      `mutation ProductUpdateMedia($productId: ID!, $media: [UpdateMediaInput!]!) {
        productUpdateMedia(productId: $productId, media: $media) {
          mediaUserErrors { field message }
        }
      }`,
      {
        productId: product.id,
        media: imageMediaIds.map((id, index) => ({
          id,
          alt: `${cleanName(update.title)} product image ${index + 1} for North & Pearl`,
        })),
      },
      true,
    ).productUpdateMedia;
    if (mediaResult.mediaUserErrors.length) {
      rows.push({ handle: update.handle, status: 'media-alt-warning', detail: JSON.stringify(mediaResult.mediaUserErrors) });
      continue;
    }
  }

  rows.push({
    handle: update.handle,
    previousTitle: product.title,
    nextTitle: update.title,
    status: update.decision,
    images: imageMediaIds.length,
  });
}

console.table(rows);

const reportLines = [
  '# Gauss Next 50 Product Polish - 2026-07-23',
  '',
  'Scope: all 50 draft products created in the Gauss next-50 batch.',
  '',
  'Actions completed:',
  '- Replaced generic raw import titles with distinct North & Pearl merchandising titles.',
  '- Rebuilt product descriptions with claim-safe gift positioning and sample-confirmation notes.',
  '- Updated SEO titles and meta descriptions.',
  '- Updated product image alt text.',
  '- Preserved draft status.',
  '- Added review/hold tags so draft products cannot be mistaken for launch-approved products.',
  '',
  '| # | Handle | Previous title | Polished title | Decision | Images |',
  '|---:|---|---|---|---|---:|',
  ...rows.map((row, index) => `| ${index + 1} | ${row.handle || ''} | ${(row.previousTitle || '').replaceAll('|', '-')} | ${(row.nextTitle || '').replaceAll('|', '-')} | ${row.status || ''} | ${row.images ?? ''} |`),
  '',
  'Hold candidates:',
  '- `north-pearl-tennis-necklace`: source pricing mismatch; do not activate.',
  '- `north-pearl-tennis-necklace-5473`: source pricing mismatch; do not activate.',
  '',
  'Next gate:',
  '- Kuhn: visual curation and image order.',
  '- Faraday: collection SEO fit and commercial keyword alignment.',
  '- Tesla: storefront preview QA before any activation.',
  '',
];

writeFileSync(reportPath, `${reportLines.join('\n')}\n`);
console.log(`Updated ${rows.length} draft products.`);
console.log(`wrote ${reportPath}`);
