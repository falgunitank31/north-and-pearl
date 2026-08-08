import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-birthday-signal-'));
const today = new Date().toISOString().slice(0, 10);
const reportPath = `reports/faraday-order-goal-birthday-copy-${today}.md`;

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

const collectionData = gql(
  `query BirthdayCollection {
    collections(first: 1, query: "handle:birthday-jewelry-gifts") {
      nodes { id title handle seo { title description } }
    }
  }`,
);

const collection = collectionData.collections.nodes[0];
if (!collection) throw new Error('Birthday Jewelry Gifts collection not found.');

const descriptionHtml = `
  <p>Birthday jewelry should feel personal, wearable, and easy to choose. This North &amp; Pearl edit brings together necklaces, bracelets, rings, earrings, initials, heart styles, flower-inspired details, and birth-month inspired pieces for thoughtful birthday gifting.</p>
  <p>If you are shopping for a birthday necklace, start with pieces that match the recipient’s everyday style: a small pendant, an initial detail, a heart keepsake, a bracelet, or a birth-month inspired accent. Review each product page for photos, available options, sizing notes, personalization fields, care guidance, and shipping details before checkout.</p>
  <h2>Quick birthday gift paths</h2>
  <ul>
    <li><a href="/collections/birthstone-jewelry">Birthstone Jewelry</a> for birth-month inspired color and meaning.</li>
    <li><a href="/collections/initial-necklaces">Initial Necklaces</a> for a simple personal detail.</li>
    <li><a href="/collections/gifts-under-100">Gifts Under $100</a> for a polished gift edit by budget.</li>
    <li><a href="/collections/jewelry-gifts-for-her">Jewelry Gifts for Her</a> for a broader recipient-first gift path.</li>
  </ul>
  <h2>How to choose faster</h2>
  <p>Choose necklaces, earrings, and bracelets when sizing is uncertain. Choose initials, hearts, flowers, or birth-month inspired designs when the gift should feel more specific to the person or the occasion. For personalized styles, confirm spelling, selected options, and any custom details carefully before checkout.</p>
`;

const seo = {
  title: 'Birthday Jewelry Gifts & Birthday Necklaces | North & Pearl',
  description:
    'Shop birthday jewelry gifts from North and Pearl, including birthday necklaces, initials, birth-month inspired pieces, bracelets, earrings, rings, and heart styles.',
};

const result = gql(
  `mutation UpdateBirthdayCollection($collection: CollectionInput!) {
    collectionUpdate(input: $collection) {
      collection { id title handle seo { title description } }
      userErrors { field message }
    }
  }`,
  {
    collection: {
      id: collection.id,
      descriptionHtml: descriptionHtml.replace(/\n\s+/g, '\n').trim(),
      seo,
    },
  },
  true,
).collectionUpdate;

if (result.userErrors.length) {
  throw new Error(JSON.stringify(result.userErrors));
}

writeFileSync(
  reportPath,
  [
    `# Faraday Order-Goal Birthday Collection Copy - ${today}`,
    '',
    '## Verified Signal',
    '',
    'Search Console now shows the strongest non-brand impression cluster on `Birthday Jewelry Gifts`: `birthday jewelry`, `birthday necklace`, `birthday jewelry gifts`, `happy birthday necklace`, `necklace birthday gift`, and `jewelry for birthday gifts`. Clicks remain 0, so the goal is to make the indexed page better aligned with the query family without changing URLs or making unsupported product claims.',
    '',
    '## Change Implemented',
    '',
    '- Updated Shopify collection SEO title and meta description for `/collections/birthday-jewelry-gifts`.',
    '- Updated collection description with concise buyer guidance, birthday necklace language, and internal links into Birthstone Jewelry, Initial Necklaces, Gifts Under $100, and Jewelry Gifts for Her.',
    '- Kept copy claim-safe: no unsupported material, gemstone, hypoallergenic, waterproof, tarnish-free, delivery, review, or discount claims.',
    '',
    '## Validation Required',
    '',
    '- Confirm live page returns 200.',
    '- Confirm products still appear before long guide content through the current collection template.',
    '- Monitor Search Console impressions, CTR, and average position for birthday query rows over the next recrawl window.',
  ].join('\n'),
);

console.log(JSON.stringify({
  collection: result.collection,
  reportPath,
}, null, 2));
