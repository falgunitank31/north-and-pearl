import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-remove-waterproof-'));

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

const products = gql(`query ClaimSensitiveProducts {
  products(first: 250, query: "vendor:'North & Pearl' status:active") {
    nodes {
      id
      title
      handle
      descriptionHtml
    }
  }
}`).products.nodes;

const changed = [];

for (const product of products) {
  const cleanedDescription = product.descriptionHtml
    .replace(/\bwaterproof\b/gi, 'easy to style')
    .replace(/\s+([,.])/g, '$1')
    .replace(/\s{2,}/g, ' ');

  if (cleanedDescription === product.descriptionHtml) continue;

  const result = gql(
    `mutation ProductUpdate($input: ProductInput!) {
      productUpdate(input: $input) {
        product { id title handle }
        userErrors { field message }
      }
    }`,
    { input: { id: product.id, descriptionHtml: cleanedDescription } },
    true,
  ).productUpdate;

  if (result.userErrors.length) {
    throw new Error(`${product.title}: ${JSON.stringify(result.userErrors)}`);
  }

  changed.push({
    title: result.product.title,
    handle: result.product.handle,
  });
}

console.table(changed);

