import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const today = new Date().toISOString().slice(0, 10);
const outputPath = `reports/daily-order-goal-${today}.md`;

function readJson(path, fallback = null) {
  if (!existsSync(path)) return fallback;
  return JSON.parse(readFileSync(path, 'utf8'));
}

function latestFile(dir, predicate) {
  if (!existsSync(dir)) return null;
  return readdirSync(dir)
    .filter(predicate)
    .map((file) => {
      const path = join(dir, file);
      return { path, file, mtime: statSync(path).mtime };
    })
    .sort((a, b) => b.mtime - a.mtime)[0] || null;
}

function latestJson(dir, predicate) {
  const latest = latestFile(dir, predicate);
  return {
    file: latest?.path || null,
    data: latest ? readJson(latest.path, {}) : {},
  };
}

function val(value, fallback = 0) {
  return value ?? fallback;
}

const goals = readJson('sales/order-goals.json', {});
const dailyGoal = goals.daily_operating_goal || {};
const targets = dailyGoal.targets || {};
const ga4 = latestJson('reports/google-api', (file) => file.startsWith('ga4-order-goal-progress-') && file.endsWith('.json'));
const campaign = latestJson('reports/google-api', (file) => file.startsWith('ga4-order-campaign-breakdown-') && file.endsWith('.json'));
const gsc = latestJson('reports/google-api', (file) => file.startsWith('gsc-query-order-goal-') && file.endsWith('.json'));
const sitemaps = latestJson('reports/google-api', (file) => file.startsWith('gsc-sitemaps-daily-') && file.endsWith('.json'));
const orders = latestJson('reports', (file) => file.startsWith('shopify-orders-safe-') && file.endsWith('.json'));

const totals = ga4.data?.totals || {};
const current = {
  qualified_visitors: val(totals.sessions),
  product_clicks: val(totals.select_item),
  product_views: val(totals.view_item),
  add_to_carts: val(totals.add_to_cart),
  checkout_starts: val(totals.begin_checkout),
  orders: val(totals.purchase),
};

const sitemapRows = sitemaps.data?.sitemaps || [];
const sitemapErrors = sitemapRows.reduce((sum, sitemap) => sum + Number(sitemap.errors || 0), 0);
const sitemapWarnings = sitemapRows.reduce((sum, sitemap) => sum + Number(sitemap.warnings || 0), 0);
const merchantPath = `reports/merchant-center-readiness-${today}.md`;
const merchantText = existsSync(merchantPath) ? readFileSync(merchantPath, 'utf8') : '';
const merchantSummary = merchantText.match(/Active products audited:\s*(\d+)[\s\S]*?Ready with identifier caveat:\s*(\d+)[\s\S]*?Needs review:\s*(\d+)/i);

const storefrontChecks = [
  'Homepage',
  'Gifts Under $100',
  'Jewelry Gifts for Her',
  'Name Necklaces',
  'Initial Shell Necklace PDP',
  'Weekly gift guide',
].join(', ');

const dailyMet = (
  current.qualified_visitors >= val(targets.qualified_visitors, Infinity)
  || current.product_clicks >= val(targets.product_clicks, Infinity)
  || current.product_views >= val(targets.product_views, Infinity)
  || current.add_to_carts >= val(targets.add_to_carts, Infinity)
  || current.checkout_starts >= val(targets.checkout_starts, Infinity)
  || current.orders > 0
);

const lines = [
  `# Daily Order Goal - ${today}`,
  '',
  'Owner: Lead Orchestrator',
  '',
  '## Operating Change',
  '',
  'North & Pearl is operating with one focused daily order-goal block, followed by measurement and a stop unless a P0/P1 customer-harming issue appears.',
  '',
  '## Daily Targets',
  '',
  '| Metric | Daily Target | Verified Current |',
  '| --- | ---: | ---: |',
  `| Qualified visitors / sessions | ${val(targets.qualified_visitors)} | ${current.qualified_visitors} |`,
  `| Product clicks | ${val(targets.product_clicks)} | ${current.product_clicks} |`,
  `| Product views | ${val(targets.product_views)} | ${current.product_views} |`,
  `| Add-to-carts | ${val(targets.add_to_carts)} | ${current.add_to_carts} |`,
  `| Checkout starts | ${val(targets.checkout_starts)} | ${current.checkout_starts} |`,
  `| Orders | ${val(targets.orders)} required daily | ${current.orders} |`,
  '',
  '## Success Rule',
  '',
  dailyGoal.success_rule || 'A day is successful when qualified traffic or downstream funnel movement occurs.',
  '',
  "## Today's Action Block",
  '',
  '1. Use the existing `order_growth_august_2026` tracked buyer-intent links.',
  '2. Send visitors to commercial product-entry paths first: Gifts Under $100, Jewelry Gifts for Her, Name Necklaces, Initial Necklaces, Birthstone Jewelry, and the weekly gift guide.',
  '3. Measure whether sessions become product clicks, product views, add-to-carts, checkout starts, or orders.',
  '4. Avoid same-day churn on URLs, titles, product records, and offers unless a P0/P1 issue appears.',
  '',
  '## Current Verified Status',
  '',
  `- GA4 source: \`${ga4.file || 'not available'}\``,
  `- Latest verified sessions: ${current.qualified_visitors}`,
  `- Latest verified product clicks: ${current.product_clicks}`,
  `- Latest verified product views: ${current.product_views}`,
  `- Latest verified add-to-carts: ${current.add_to_carts}`,
  `- Latest verified checkout starts: ${current.checkout_starts}`,
  `- Latest verified orders: ${current.orders}`,
  `- Campaign source: \`${campaign.file || 'not available'}\``,
  `- Latest verified \`order_growth_august_2026\` campaign sessions: ${val(campaign.data?.highlight?.sessions)}`,
  `- Search Console source: \`${gsc.file || 'not available'}\``,
  `- Latest verified Search Console impressions: ${val(gsc.data?.totals?.impressions)}`,
  `- Latest verified Search Console clicks: ${val(gsc.data?.totals?.clicks)}`,
  `- Latest verified Search Console rows: ${val(gsc.data?.row_count)}`,
  `- Sitemap source: \`${sitemaps.file || 'not available'}\``,
  `- Latest sitemap status: ${sitemapErrors} errors and ${sitemapWarnings} warnings across submitted Shopify sitemap files.`,
  `- Shopify order source: \`${orders.file || 'not available'}\``,
  `- Latest safe order access: \`${orders.data?.status || 'not available'}\`, ${val(orders.data?.ordersVisible)} visible orders, no customer PII requested.`,
  `- Merchant readiness source: \`${merchantPath}\``,
  merchantSummary
    ? `- Latest Merchant readiness: ${merchantSummary[2]} active products ready with identifier caveat, ${merchantSummary[3]} needing review.`
    : '- Latest Merchant readiness: not available for this date.',
  `- Storefront sample: ${storefrontChecks} should be checked during the daily block.`,
  '',
  '## Daily Result',
  '',
  dailyMet
    ? 'Daily goal has meaningful verified movement. Continue measuring before making additional same-day changes.'
    : 'Daily goal was not met yet. The verified bottleneck remains qualified traffic and product-entry engagement, not checkout, order access, Merchant readiness, or an obvious P0/P1 storefront failure.',
  '',
  '## Stop Rule',
  '',
  'After the daily action block is complete, stop and wait for the next daily check. Do not continuously redesign, rewrite, or reshuffle the store during the same day unless a verified critical issue appears.',
];

mkdirSync('reports', { recursive: true });
writeFileSync(outputPath, `${lines.join('\n')}\n`);
console.log(outputPath);
