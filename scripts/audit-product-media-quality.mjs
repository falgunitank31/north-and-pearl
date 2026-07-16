import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-media-audit-'));

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

const products = gql(`query ProductMediaAudit {
  products(first: 100, query: "vendor:'North & Pearl'") {
    nodes {
      title
      handle
      status
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
}`).products.nodes;

const rows = products
  .map((product) => {
    const images = product.media.nodes.filter((media) => media.mediaContentType === 'IMAGE');
    const first = images[0]?.preview?.image;
    const minWidth = images.reduce((min, media) => Math.min(min, media.preview?.image?.width || 0), Infinity);
    const minHeight = images.reduce((min, media) => Math.min(min, media.preview?.image?.height || 0), Infinity);
    const hasThumbName = images.some((media) => (media.preview?.image?.url || '').includes('300x300'));
    const score =
      images.length === 0 ? 'NO_IMAGE' :
      minWidth < 600 || minHeight < 600 || hasThumbName ? 'NEEDS_FIX' :
      minWidth < 900 || minHeight < 900 ? 'ACCEPTABLE_TEMP' :
      'GOOD';
    return {
      title: product.title,
      handle: product.handle,
      status: product.status,
      images: images.length,
      firstWidth: first?.width || 0,
      firstHeight: first?.height || 0,
      minWidth: Number.isFinite(minWidth) ? minWidth : 0,
      minHeight: Number.isFinite(minHeight) ? minHeight : 0,
      hasThumbName,
      score,
      firstUrl: first?.url || '',
    };
  })
  .sort((a, b) => a.score.localeCompare(b.score) || a.title.localeCompare(b.title));

console.table(rows.map(({ firstUrl, ...row }) => row));

const needsFix = rows.filter((row) => row.score === 'NO_IMAGE' || row.score === 'NEEDS_FIX');
if (needsFix.length) {
  console.log('\nNeeds attention:');
  for (const row of needsFix) {
    console.log(`- ${row.score}: ${row.title} (${row.handle}) ${row.images} image(s), min ${row.minWidth}x${row.minHeight}`);
    if (row.firstUrl) console.log(`  ${row.firstUrl}`);
  }
}
