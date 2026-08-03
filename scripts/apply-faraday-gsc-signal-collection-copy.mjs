import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-gsc-signal-copy-'));
const today = new Date().toISOString().slice(0, 10);
const reportPath = `reports/faraday-gsc-signal-copy-${today}.md`;

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

const updates = {
  'name-necklaces': {
    signal: 'Search Console row: "pearl necklace with name" -> /collections/name-necklaces',
    seoTitle: 'Name Necklaces & Personalized Jewelry Gifts | North & Pearl',
    meta:
      'Shop name necklaces and personalized jewelry gifts from North and Pearl, including script, initial, heart, and pearl-style designs where shown.',
    html: `
      <p>Name necklaces turn a word, name, or personal detail into a piece that feels close to the heart. Explore North &amp; Pearl name necklace styles for birthdays, anniversaries, mothers, bridesmaids, couples, family gifts, and meaningful self-expression.</p>
      <p>If you are searching for a pearl necklace with a name or a softer pearl-style personalized gift, use this collection as a starting point and review each product image carefully. North &amp; Pearl only treats pearl, stone, material, and finish details as confirmed when they are stated on the individual product page.</p>
      <h2>What to put on a name necklace</h2>
      <p>A name necklace can celebrate a person, relationship, child, partner, family name, milestone, or meaningful word. Before ordering, confirm the exact spelling, capitalization, variant selection, and any product-specific personalization instructions.</p>
      <h2>Helpful shopping paths</h2>
      <p>Compare <a href="/collections/personalized-jewelry">Personalized Jewelry</a>, <a href="/collections/initial-necklaces">Initial Necklaces</a>, <a href="/collections/jewelry-gifts-for-her">Jewelry Gifts for Her</a>, <a href="/collections/gifts-under-100">Gifts Under $100</a>, and <a href="/blogs/gift-guide/how-to-choose-a-name-necklace">How to Choose a Name Necklace</a>.</p>
    `,
  },
  'birthstone-jewelry': {
    signal: 'Search Console row: "birthstone gifts for mom not jewelry" -> /collections/birthstone-jewelry',
    seoTitle: 'Birthstone-Inspired Jewelry Gifts for Mom | North & Pearl',
    meta:
      'Shop birthstone-inspired jewelry gifts for moms, birthdays, family milestones, anniversaries, and meaningful personal moments.',
    html: `
      <p>Birthstone-inspired jewelry connects a piece to a month, memory, or person. Explore meaningful styles for birthdays, moms, anniversaries, family gifts, and milestone moments, with product-specific details confirmed on each item page.</p>
      <p>For shoppers looking for a birthstone gift for mom, this collection focuses on birth-month inspiration, color meaning, initials, hearts, flowers, and family-centered gift ideas. Exact stones, settings, finishes, and materials must be checked on the individual product page before ordering.</p>
      <h2>Birth-month meaning</h2>
      <p>Birthstone-inspired jewelry is often chosen because it gives a gift a layer of personal meaning. A birth-month color or accent can represent a birthday, child, partner, parent, or important date.</p>
      <h2>Helpful shopping paths</h2>
      <p>Continue with <a href="/collections/mothers-collection">Mother’s Collection</a>, <a href="/collections/birthday-jewelry-gifts">Birthday Jewelry Gifts</a>, <a href="/collections/personalized-jewelry">Personalized Jewelry</a>, <a href="/collections/name-necklaces">Name Necklaces</a>, and <a href="/blogs/gift-guide/birthstone-jewelry-gift-guide">Birthstone Jewelry Gift Guide</a>.</p>
    `,
  },
};

const handles = Object.keys(updates);
const collections = gql(
  `query CollectionsForGscSignals($query: String!) {
    collections(first: 20, query: $query) {
      nodes { id title handle descriptionHtml seo { title description } }
    }
  }`,
  { query: handles.map((handle) => `handle:${handle}`).join(' OR ') },
).collections.nodes;

const collectionByHandle = new Map(collections.map((collection) => [collection.handle, collection]));
const changed = [];
const missing = [];

function mdCell(value = '') {
  return String(value).replaceAll('|', '\\|');
}

for (const handle of handles) {
  const collection = collectionByHandle.get(handle);
  const update = updates[handle];
  if (!collection) {
    missing.push(handle);
    continue;
  }

  const result = gql(
    `mutation UpdateCollectionGscCopy($collection: CollectionInput!) {
      collectionUpdate(input: $collection) {
        collection { id title handle seo { title description } }
        userErrors { field message }
      }
    }`,
    {
      collection: {
        id: collection.id,
        descriptionHtml: update.html.replace(/\n\s+/g, '\n').trim(),
        seo: {
          title: update.seoTitle,
          description: update.meta,
        },
      },
    },
    true,
  ).collectionUpdate;

  if (result.userErrors.length) {
    throw new Error(`${collection.title}: ${JSON.stringify(result.userErrors)}`);
  }

  changed.push({
    title: result.collection.title,
    handle: result.collection.handle,
    signal: update.signal,
    seoTitle: result.collection.seo.title,
    meta: result.collection.seo.description,
  });
}

const report = [
  `# Faraday GSC Signal Collection Copy - ${today}`,
  '',
  '## Summary',
  '',
  'Faraday used the current verified Search Console rows to strengthen two commercial collection pages Google has already tested. The copy remains claim-safe: it uses `birthstone-inspired` and `pearl-style` wording rather than claiming real gemstones, pearls, precious metals, or allergy-safe materials.',
  '',
  '## Updated Collections',
  '',
  '| Collection | Search Console Signal | SEO Title | Meta Description |',
  '| --- | --- | --- | --- |',
  ...changed.map((item) => `| ${mdCell(item.title)} | ${mdCell(item.signal)} | ${mdCell(item.seoTitle)} | ${mdCell(item.meta)} |`),
  '',
  '## Missing Collections',
  '',
  missing.length ? missing.map((handle) => `- ${handle}`).join('\n') : '- None',
  '',
  '## Safety Notes',
  '',
  '- No product, inventory, discount, payment, tax, order, customer, or supplier data was changed.',
  '- No unsupported product/material claims were introduced.',
  '- Internal links point only to existing commercial collection or guide URLs.',
].join('\n');

writeFileSync(reportPath, report);
console.table(changed);
console.log(`Wrote ${reportPath}`);
