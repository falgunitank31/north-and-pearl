import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const today = new Date().toISOString().slice(0, 10);
const tempDir = mkdtempSync(join(tmpdir(), 'np-safe-orders-'));
const outputPath = `reports/shopify-orders-safe-${today}.json`;

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
    ],
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] },
  );

  return JSON.parse(readFileSync(outputFile, 'utf8'));
}

function sourceTags(tags = []) {
  return tags.filter((tag) => /alibaba|source|supplier/i.test(tag));
}

let report;

try {
  const data = gql(
    `query SafeRecentOrders {
      orders(first: 10, sortKey: PROCESSED_AT, reverse: true) {
        nodes {
          id
          createdAt
          displayFinancialStatus
          displayFulfillmentStatus
          lineItems(first: 50) {
            nodes {
              title
              quantity
              product {
                title
                handle
                tags
                onlineStoreUrl
              }
              variant {
                title
                sku
              }
            }
          }
        }
      }
    }`,
  );

  const orders = data.orders?.nodes || [];
  report = {
    status: 'ORDER_ACCESS_OK',
    generatedAt: new Date().toISOString(),
    ordersVisible: orders.length,
    privacy: 'No customer names, emails, addresses, payment details, or order notes requested.',
    orders: orders.map((order) => ({
      id: order.id,
      createdAt: order.createdAt,
      financialStatus: order.displayFinancialStatus,
      fulfillmentStatus: order.displayFulfillmentStatus,
      lineItems: (order.lineItems?.nodes || []).map((item) => ({
        title: item.title,
        quantity: item.quantity,
        variantTitle: item.variant?.title || '',
        sku: item.variant?.sku || '',
        productTitle: item.product?.title || '',
        productHandle: item.product?.handle || '',
        productUrl: item.product?.onlineStoreUrl || '',
        sourceTags: sourceTags(item.product?.tags || []),
      })),
    })),
    error: null,
  };
} catch (error) {
  report = {
    status: 'ORDER_ACCESS_ERROR',
    generatedAt: new Date().toISOString(),
    ordersVisible: null,
    orders: [],
    error: String(error.message || error),
  };
}

writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
console.table([{ status: report.status, ordersVisible: report.ordersVisible, outputPath }]);

if (report.error) process.exitCode = 1;
