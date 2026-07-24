import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-google-publish-'));

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

const data = gql(`query ProductsMissingGooglePublication {
  publications(first: 20) {
    nodes { id name }
  }
  products(first: 250, query: "vendor:'North & Pearl' status:active") {
    nodes {
      id
      title
      handle
      resourcePublications(first: 20) {
        nodes {
          publication { id name }
          isPublished
        }
      }
    }
  }
}`);

const googlePublication = data.publications.nodes.find((publication) => publication.name === 'Google & YouTube');
if (!googlePublication) {
  throw new Error('Google & YouTube publication was not found.');
}

const missing = data.products.nodes.filter((product) => {
  return !product.resourcePublications.nodes.some((publication) => {
    return publication.isPublished && publication.publication.id === googlePublication.id;
  });
});

const changed = [];

for (const product of missing) {
  const result = gql(
    `mutation PublishProductToGoogle($id: ID!, $input: [PublicationInput!]!) {
      publishablePublish(id: $id, input: $input) {
        publishable {
          ... on Product { id title handle }
        }
        userErrors { field message }
      }
    }`,
    {
      id: product.id,
      input: [{ publicationId: googlePublication.id }],
    },
    true,
  ).publishablePublish;

  if (result.userErrors.length) {
    throw new Error(`${product.title}: ${JSON.stringify(result.userErrors)}`);
  }

  changed.push({
    title: product.title,
    handle: product.handle,
    publication: googlePublication.name,
  });
}

console.table(changed);
console.log(`Published ${changed.length} products to ${googlePublication.name}.`);

