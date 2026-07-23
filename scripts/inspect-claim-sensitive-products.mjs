import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-claim-inspect-'));
const queryFile = join(tempDir, 'query.graphql');
const varsFile = join(tempDir, 'vars.json');
const outputFile = join(tempDir, 'output.json');

const riskyClaimPattern =
  /\b(hypoallergenic|waterproof|tarnish[- ]?free|nickel[- ]?free|lead[- ]?free|cadmium[- ]?free|sterling silver|gold vermeil|solid gold|ethical|sustainable|handmade)\b/gi;

writeFileSync(
  queryFile,
  `query ClaimSensitiveProducts {
    products(first: 250, query: "vendor:'North & Pearl' status:active") {
      nodes {
        title
        handle
        tags
        descriptionHtml
      }
    }
  }`,
);
writeFileSync(varsFile, '{}');

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

const products = JSON.parse(readFileSync(outputFile, 'utf8')).products.nodes;

const rows = products
  .map((product) => {
    const plain = product.descriptionHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const haystack = [product.title, product.tags.join(' '), plain].join(' ');
    const matches = [...haystack.matchAll(riskyClaimPattern)].map((match) => match[0].toLowerCase());
    return {
      title: product.title,
      handle: product.handle,
      matches: [...new Set(matches)].join(', '),
      tags: product.tags.join(', '),
    };
  })
  .filter((row) => row.matches)
  .sort((a, b) => a.title.localeCompare(b.title));

console.table(rows);

