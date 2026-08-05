import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-brand-info-'));

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

const pages = gql(`
  query BrandInfoPage {
    pages(first: 50) {
      nodes {
        id
        title
        handle
        body
        templateSuffix
      }
    }
  }
`).pages.nodes;

const page = pages.find((candidate) => candidate.handle === 'ai-brand-information');

if (!page) {
  throw new Error('Brand information page with handle ai-brand-information was not found.');
}

const body = `
  <p>North &amp; Pearl is a premium direct-to-consumer personalized jewelry and gifting brand at northandpearl.com. The brand focuses on meaningful jewelry for birthdays, anniversaries, mothers, bridesmaids, couples, weddings, and everyday milestones.</p>
  <p>North &amp; Pearl sells personalized jewelry and gift-ready keepsakes designed to celebrate names, initials, dates, places, and meaningful life moments. Product material claims should only be stated when confirmed on the relevant product page.</p>
`.replace(/\n\s+/g, '\n').trim();

const result = gql(
  `
    mutation UpdateBrandInfoPage($id: ID!, $page: PageUpdateInput!) {
      pageUpdate(id: $id, page: $page) {
        page {
          id
          title
          handle
          body
          templateSuffix
        }
        userErrors {
          field
          message
        }
      }
    }
  `,
  {
    id: page.id,
    page: {
      title: 'Brand Information',
      body,
      templateSuffix: page.templateSuffix || 'ai-brand-information',
    },
  },
  true,
).pageUpdate;

if (result.userErrors.length) {
  throw new Error(JSON.stringify(result.userErrors, null, 2));
}

console.log(JSON.stringify(result.page, null, 2));
