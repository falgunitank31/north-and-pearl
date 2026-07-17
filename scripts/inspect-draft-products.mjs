import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-draft-inspect-'));

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

const handles = ['north-pearl-flower-nail-bangle', 'north-pearl-heart-keepsake-necklace'];

const products = gql(`query DraftProducts($query: String!) {
  products(first: 10, query: $query) {
    nodes {
      id
      title
      handle
      status
      vendor
      productType
      tags
      descriptionHtml
      onlineStoreUrl
      seo { title description }
      variants(first: 10) {
        nodes {
          id
          title
          price
          compareAtPrice
          availableForSale
          selectedOptions { name value }
        }
      }
      metafields(first: 50) {
        nodes {
          namespace
          key
          type
          value
        }
      }
      media(first: 20) {
        nodes {
          id
          alt
          mediaContentType
          preview { image { url width height } }
        }
      }
    }
  }
}`, { query: handles.map((handle) => `handle:${handle}`).join(' OR ') }).products.nodes;

console.log(JSON.stringify(products, null, 2));
