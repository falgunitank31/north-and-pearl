import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-return-policy-'));

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

const policyBody = `
<h2>Return Policy</h2>
<p>We want every North &amp; Pearl order to arrive as expected. Please review this policy before sending any item back, and contact support first so we can confirm eligibility and next steps for your order.</p>

<h2>Personalized and custom items</h2>
<p>Personalized, engraved, custom-name, initial, birthstone, and made-to-order pieces are final sale unless they arrive damaged, defective, or incorrect. Please review personalization details carefully before checkout.</p>

<h2>Standard, non-personalized items</h2>
<p>Standard, non-personalized items may be eligible for return within 14 days of delivery when they are unused, unworn, undamaged, and returned with original packaging. Return eligibility must be approved by support before the item is sent back.</p>

<h2>Damaged, defective, or incorrect items</h2>
<p>If your order arrives damaged, defective, or incorrect, contact us within 7 days of delivery with your order number and clear photos of the item and packaging. We will review the issue and help determine the appropriate resolution.</p>

<h2>Items that cannot be returned</h2>
<ul>
  <li>Personalized or custom items, except when damaged, defective, or incorrect</li>
  <li>Items that have been worn, used, altered, or damaged after delivery</li>
  <li>Items returned without prior approval from support</li>
  <li>Gift cards</li>
</ul>

<h2>How to start a return</h2>
<p>Contact North &amp; Pearl support with your order number, the item you would like reviewed, and the reason for the request. If the return is approved, we will provide the next steps. Please do not send items back before your request is approved.</p>

<h2>Return shipping</h2>
<p>Customers are responsible for return shipping costs unless the item arrived damaged, defective, or incorrect. Original shipping charges, when applicable, are not refundable.</p>

<h2>Refunds</h2>
<p>Approved refunds are issued to the original payment method after the returned item is received and inspected. Your bank or payment provider may require additional time to post the refund.</p>

<h2>Exchanges</h2>
<p>Exchange availability depends on the item and order details. Contact support so we can review the request before any item is returned.</p>
`.replace(/\n\s+/g, '\n').trim();

const returnsPageBody = `
<p>We want every North &amp; Pearl order to arrive as expected. Please contact support before sending anything back so we can review your order and confirm the correct next step.</p>

<h2>Personalized orders</h2>
<p>Personalized, engraved, custom-name, initial, birthstone, and made-to-order pieces are final sale unless they arrive damaged, defective, or incorrect. Please review personalization details carefully before checkout.</p>

<h2>Standard, non-personalized items</h2>
<p>Standard, non-personalized items may be eligible for return within 14 days of delivery when they are unused, unworn, undamaged, and returned with original packaging. Return eligibility must be approved by support before the item is sent back.</p>

<h2>Damaged, defective, or incorrect items</h2>
<p>If your order arrives damaged, defective, or incorrect, contact support within 7 days of delivery with your order number and clear photos of the item and packaging.</p>

<h2>How to start a return</h2>
<p>Send your order number, the item you would like reviewed, and the reason for the request. If the return is approved, we will provide the next steps. Please do not send items back before your request is approved.</p>

<h2>Return shipping and refunds</h2>
<p>Customers are responsible for return shipping costs unless the item arrived damaged, defective, or incorrect. Approved refunds are issued to the original payment method after the returned item is received and inspected.</p>
`.replace(/\n\s+/g, '\n').trim();

const policyResult = gql(
  `mutation UpdateRefundPolicy($shopPolicy: ShopPolicyInput!) {
    shopPolicyUpdate(shopPolicy: $shopPolicy) {
      shopPolicy { id title type updatedAt }
      userErrors { field message }
    }
  }`,
  {
    shopPolicy: {
      type: 'REFUND_POLICY',
      body: policyBody,
    },
  },
  true,
).shopPolicyUpdate;

if (policyResult.userErrors.length) {
  throw new Error(`Refund policy update failed: ${JSON.stringify(policyResult.userErrors)}`);
}

const pages = gql(
  `query FindReturnsPage {
    pages(first: 20, query: "handle:returns-exchanges") {
      nodes { id title handle }
    }
  }`,
).pages.nodes;

const returnsPage = pages.find((page) => page.handle === 'returns-exchanges');

if (!returnsPage) {
  throw new Error('Could not find /pages/returns-exchanges.');
}

const pageResult = gql(
  `mutation UpdateReturnsPage($id: ID!, $page: PageUpdateInput!) {
    pageUpdate(id: $id, page: $page) {
      page { id title handle updatedAt }
      userErrors { field message }
    }
  }`,
  {
    id: returnsPage.id,
    page: {
      body: returnsPageBody,
    },
  },
  true,
).pageUpdate;

if (pageResult.userErrors.length) {
  throw new Error(`Returns page update failed: ${JSON.stringify(pageResult.userErrors)}`);
}

console.table([
  {
    surface: 'Shopify native refund policy',
    status: 'updated',
    type: policyResult.shopPolicy.type,
    updatedAt: policyResult.shopPolicy.updatedAt,
  },
  {
    surface: 'Returns & Exchanges page',
    status: 'updated',
    handle: pageResult.page.handle,
    updatedAt: pageResult.page.updatedAt,
  },
]);
