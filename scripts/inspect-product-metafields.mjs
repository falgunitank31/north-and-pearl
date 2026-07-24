import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-metafields-'));

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

const products = gql(`query MetafieldInspection {
  products(first: 5, query: "vendor:'North & Pearl' status:active") {
    nodes {
      title
      handle
      category { id fullName name }
      productType
      tags
      metafields(first: 100) {
        nodes {
          namespace
          key
          type
          value
        }
      }
    }
  }
}`).products.nodes;

for (const product of products) {
  console.log(`\n${product.title} (${product.handle})`);
  console.log(`Category: ${product.category?.fullName || 'none'} | Type: ${product.productType}`);
  console.table(product.metafields.nodes);
}

