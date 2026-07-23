import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-linear-title-'));

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

const product = gql(
  `query ProductByHandle($query: String!) {
    products(first: 1, query: $query) {
      nodes { id title handle }
    }
  }`,
  { query: 'handle:north-pearl-linear-sparkle-bracelet' },
).products.nodes[0];

if (!product) {
  console.log('Product not found: north-pearl-linear-sparkle-bracelet');
  process.exit(0);
}

const result = gql(
  `mutation FixLinearSparkleTitle($product: ProductUpdateInput!) {
    productUpdate(product: $product) {
      product { id title handle seo { title description } }
      userErrors { field message }
    }
  }`,
  {
    product: {
      id: product.id,
      title: 'North & Pearl Linear Sparkle Bracelet',
      seo: {
        title: 'Linear Sparkle Bracelet | North & Pearl',
        description:
          'A linear sparkle bracelet selected for polished everyday styling and meaningful gifting. Exact materials, stones, finish, and sizing should be confirmed before stronger product claims are made.',
      },
    },
  },
  true,
).productUpdate;

if (result.userErrors.length) {
  console.log(JSON.stringify(result.userErrors, null, 2));
  process.exitCode = 1;
} else {
  console.log(JSON.stringify({ before: product, after: result.product }, null, 2));
}
