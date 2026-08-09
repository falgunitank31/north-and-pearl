import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const today = new Date().toISOString().slice(0, 10);
const property = 'properties/546565745';
const gscProperty = 'sc-domain:northandpearl.com';
const campaign = 'order_growth_august_2026';
const reportPath = `reports/daily-order-goal-run-${today}.md`;
const storefrontPath = `reports/storefront-sample-daily-${today}.json`;

const steps = [
  {
    name: 'GA4 funnel progress',
    command: [
      'python3',
      'scripts/ga4-order-goal-progress.py',
      '--property',
      property,
      '--start',
      '2026-08-08',
      '--end',
      today,
      '--out',
      `reports/google-api/ga4-order-goal-progress-${today}.json`,
    ],
  },
  {
    name: 'GA4 campaign attribution',
    command: [
      'python3',
      'scripts/ga4-order-campaign-breakdown.py',
      '--property',
      property,
      '--start',
      '2026-08-08',
      '--end',
      today,
      '--campaign',
      campaign,
      '--out',
      `reports/google-api/ga4-order-campaign-breakdown-${today}.json`,
    ],
  },
  {
    name: 'Search Console query snapshot',
    command: [
      'python3',
      '/Users/yagneshtank/.codex/skills/seo/scripts/gsc_query.py',
      '--property',
      gscProperty,
      '--days',
      '28',
      '--json',
    ],
    stdoutFile: `reports/google-api/gsc-query-order-goal-${today}-latest.json`,
  },
  {
    name: 'Search Console sitemap snapshot',
    command: [
      'python3',
      '/Users/yagneshtank/.codex/skills/seo/scripts/gsc_query.py',
      'sitemaps',
      '--property',
      gscProperty,
      '--json',
    ],
    stdoutFile: `reports/google-api/gsc-sitemaps-daily-${today}.json`,
  },
  {
    name: 'Safe Shopify order monitor',
    command: ['node', 'scripts/shopify-safe-order-monitor.mjs'],
  },
  {
    name: 'Merchant Center readiness audit',
    command: ['node', 'scripts/audit-merchant-center-readiness.mjs'],
  },
  {
    name: 'Storefront sample HTTP check',
    custom: runStorefrontSample,
  },
  {
    name: 'Daily order goal report',
    command: ['node', 'scripts/daily-order-goal-report.mjs'],
  },
  {
    name: 'Order goal pace report',
    command: ['node', 'scripts/order-goal-pace-report.mjs'],
  },
  {
    name: 'Agent Command Center',
    command: ['node', 'scripts/generate-agent-command-center.mjs'],
  },
];

const storefrontUrls = [
  ['Homepage', 'https://northandpearl.com/'],
  ['Gifts Under $100', 'https://northandpearl.com/collections/gifts-under-100'],
  ['Jewelry Gifts for Her', 'https://northandpearl.com/collections/jewelry-gifts-for-her'],
  ['Name Necklaces', 'https://northandpearl.com/collections/name-necklaces'],
  ['Initial Shell Necklace PDP', 'https://northandpearl.com/products/north-pearl-initial-shell-necklace'],
  ['Weekly gift guide', 'https://northandpearl.com/blogs/gift-guide/meaningful-jewelry-gifts-to-shop-this-week'],
];

function runStorefrontSample() {
  const checks = storefrontUrls.map(([label, url]) => {
    try {
      const status = execFileSync('curl', ['-L', '-s', '-o', '/dev/null', '-w', '%{http_code}', url], {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
      }).trim();
      return { label, url, status: Number(status), ok: status === '200' };
    } catch (error) {
      return { label, url, status: null, ok: false, error: String(error.message || error) };
    }
  });

  const report = {
    generatedAt: new Date().toISOString(),
    checks,
    failed: checks.filter((check) => !check.ok),
  };
  writeFileSync(storefrontPath, `${JSON.stringify(report, null, 2)}\n`);
  if (report.failed.length) {
    throw new Error(`${report.failed.length} storefront sample URL(s) failed`);
  }
  return checks.map((check) => `${check.status} ${check.url}`).join('\n');
}

function runStep(step) {
  try {
    const output = step.custom
      ? step.custom()
      : execFileSync(step.command[0], step.command.slice(1), {
          encoding: 'utf8',
          stdio: ['ignore', 'pipe', 'pipe'],
        });
    if (step.stdoutFile) {
      mkdirSync(step.stdoutFile.split('/').slice(0, -1).join('/'), { recursive: true });
      writeFileSync(step.stdoutFile, output);
    }
    return { name: step.name, status: 'passed', output: output.trim().slice(0, 1200), error: null };
  } catch (error) {
    if (step.stdoutFile && error.stdout) {
      mkdirSync(step.stdoutFile.split('/').slice(0, -1).join('/'), { recursive: true });
      writeFileSync(step.stdoutFile, String(error.stdout));
    }
    return {
      name: step.name,
      status: 'failed',
      output: String(error.stdout || '').trim().slice(0, 1200),
      error: String(error.stderr || error.message || error).trim().slice(0, 2000),
    };
  }
}

const results = steps.map(runStep);
const failed = results.filter((result) => result.status === 'failed');

function readJson(path) {
  return existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : {};
}

const ga4 = readJson(`reports/google-api/ga4-order-goal-progress-${today}.json`);
const gsc = readJson(`reports/google-api/gsc-query-order-goal-${today}-latest.json`);
const orders = readJson(`reports/shopify-orders-safe-${today}.json`);

const lines = [
  `# Daily Order Goal Run - ${today}`,
  '',
  'Owner: Lead Orchestrator',
  '',
  '## Run Summary',
  '',
  `- Steps passed: ${results.length - failed.length}`,
  `- Steps failed: ${failed.length}`,
  `- GA4 sessions: ${ga4.totals?.sessions ?? 0}`,
  `- GA4 product clicks: ${ga4.totals?.select_item ?? 0}`,
  `- GA4 product views: ${ga4.totals?.view_item ?? 0}`,
  `- GA4 add-to-carts: ${ga4.totals?.add_to_cart ?? 0}`,
  `- GA4 checkout starts: ${ga4.totals?.begin_checkout ?? 0}`,
  `- GA4 purchases/orders: ${ga4.totals?.purchase ?? 0}`,
  `- Search Console impressions: ${gsc.totals?.impressions ?? 0}`,
  `- Search Console clicks: ${gsc.totals?.clicks ?? 0}`,
  `- Safe Shopify visible orders: ${orders.ordersVisible ?? 0}`,
  '',
  '## Step Results',
  '',
  '| Step | Status |',
  '| --- | --- |',
  ...results.map((result) => `| ${result.name} | ${result.status} |`),
  '',
];

if (failed.length) {
  lines.push('## Failures');
  lines.push('');
  for (const result of failed) {
    lines.push(`### ${result.name}`);
    lines.push('');
    lines.push('```text');
    lines.push(result.error || 'Unknown error');
    lines.push('```');
    lines.push('');
  }
}

mkdirSync('reports', { recursive: true });
writeFileSync(reportPath, `${lines.join('\n')}\n`);
console.table(results.map(({ name, status }) => ({ name, status })));
console.log(reportPath);

if (failed.length) process.exitCode = 1;
