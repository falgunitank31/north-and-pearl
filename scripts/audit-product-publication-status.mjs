import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-publications-'));

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

const data = gql(`query PublicationAudit {
  publications(first: 20) {
    nodes {
      id
      name
    }
  }
  products(first: 250, query: "vendor:'North & Pearl' status:active") {
    nodes {
      title
      handle
      status
      resourcePublications(first: 20) {
        nodes {
          publication { name id }
          isPublished
          publishDate
        }
      }
      metafields(first: 30, namespace: "mm-google-shopping") {
        nodes { key value }
      }
    }
  }
}`);

console.log('\nPublications');
console.table(data.publications.nodes);

const rows = data.products.nodes.map((product) => {
  const publications = product.resourcePublications.nodes
    .filter((publication) => publication.isPublished)
    .map((publication) => publication.publication.name)
    .join(', ');
  const googleFields = new Set(product.metafields.nodes.map((metafield) => metafield.key));
  return {
    title: product.title,
    handle: product.handle,
    publications,
    hasGoogleAge: googleFields.has('age_group'),
    hasGoogleColor: googleFields.has('color'),
    hasGoogleGender: googleFields.has('gender'),
  };
});

console.log('\nProducts');
console.table(rows);

const missingGoogleFields = rows.filter((row) => !row.hasGoogleAge || !row.hasGoogleColor || !row.hasGoogleGender);
if (missingGoogleFields.length) {
  console.log('\nMissing Google fields');
  console.table(missingGoogleFields);
}
