import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-order-pages-'));

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

const pageUpdates = {
  faq: `
    <h2>How does personalization work?</h2>
    <p>Choose a product, enter the requested personalization details, and review spelling carefully before checkout. Personalized details are prepared from the information entered at the time of order.</p>
    <h2>What materials are used?</h2>
    <p>Materials can vary by product. North &amp; Pearl lists product-specific material and finish details only when they are confirmed for that item. We avoid broad claims such as sterling silver, gold vermeil, waterproof, tarnish-free, nickel-free, or hypoallergenic unless verified for the exact product.</p>
    <h2>Can personalized items be returned?</h2>
    <p>Personalized and custom items are generally final sale unless they arrive defective, damaged, or incorrect. Contact support before starting any return or exchange request so the order can be reviewed.</p>
    <h2>How should I care for my jewelry?</h2>
    <p>Store jewelry separately, keep it away from harsh chemicals, and clean gently with a soft dry cloth. Review the Jewelry Care Guide and any product-specific care details before regular wear.</p>
  `,
  'shipping-policy': `
    <p>North &amp; Pearl offers U.S. shipping for online orders. Personalized pieces may require production time before transit begins. Once an order ships, tracking details are sent to the email used at checkout.</p>
    <p>Shipping timelines can vary by product, carrier, destination, and personalization requirements. Please review product-page notes before ordering a time-sensitive gift.</p>
    <h2>Order tracking</h2>
    <p>When tracking is available, use the tracking link in your shipping confirmation email. If tracking does not update right away, allow the carrier time to scan the package.</p>
    <h2>Address accuracy</h2>
    <p>Please enter your shipping address carefully before checkout. If an address issue is discovered after purchase, contact support as soon as possible so the order can be reviewed before fulfillment.</p>
  `,
  'returns-exchanges': `
    <p>Personalized and custom items are generally final sale unless they arrive defective, damaged, or incorrect. Standard, non-personalized items may be eligible for return when they are unused, unworn, and approved by support.</p>
    <p>Please contact North &amp; Pearl before sending anything back so the support team can review the order and provide the correct next step.</p>
    <h2>Personalized orders</h2>
    <p>Customers are responsible for entering personalization details accurately. If an item arrives with an error caused by production or fulfillment, contact support with your order details and photos so the issue can be reviewed.</p>
    <h2>Damaged, defective, or incorrect items</h2>
    <p>If an order arrives damaged, defective, or incorrect, contact support promptly with your order number and clear photos of the item and packaging.</p>
  `,
  contact: `
    <p>Questions about an order, product, personalization, or a gift? Send a message through the form below and include your order number when available.</p>
    <p>For product questions, include the product name or link so the support team can review the correct item.</p>
  `,
  'track-your-order': `
    <p>After your order ships, tracking details are sent to the email used at checkout. Use that link to follow carrier updates.</p>
    <p>If you recently received a shipping confirmation and tracking has not updated yet, the carrier may still be processing the first scan. For order questions, contact support with your order number.</p>
  `,
};

const pages = gql(
  `query PagesForOrderReadiness {
    pages(first: 50) { nodes { id title handle body } }
  }`,
).pages.nodes;

const pageByHandle = new Map(pages.map((page) => [page.handle, page]));
const changed = [];

for (const [handle, body] of Object.entries(pageUpdates)) {
  const page = pageByHandle.get(handle);
  if (!page) {
    console.log(`missing page: ${handle}`);
    continue;
  }

  const result = gql(
    `mutation UpdatePage($id: ID!, $page: PageUpdateInput!) {
      pageUpdate(id: $id, page: $page) {
        page { id title handle }
        userErrors { field message }
      }
    }`,
    {
      id: page.id,
      page: {
        body: body.replace(/\n\s+/g, '\n').trim(),
      },
    },
    true,
  ).pageUpdate;

  if (result.userErrors.length) {
    console.log(`page warning ${page.title}: ${JSON.stringify(result.userErrors)}`);
    continue;
  }

  changed.push({ title: result.page.title, handle: result.page.handle });
  console.log(`updated page: ${result.page.title}`);
}

console.table(changed);
