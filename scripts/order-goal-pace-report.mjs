import { existsSync, readdirSync, readFileSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const today = new Date().toISOString().slice(0, 10);
const goalsPath = 'sales/order-goals.json';
const datedProgressPath = `reports/google-api/ga4-order-goal-progress-${today}.json`;
const reportPath = `reports/order-goal-pace-${today}.md`;

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function latestGoalProgressPath() {
  if (existsSync(datedProgressPath)) return datedProgressPath;
  const dir = 'reports/google-api';
  if (!existsSync(dir)) return datedProgressPath;

  const latest = readdirSync(dir)
    .filter((file) => file.startsWith('ga4-order-goal-progress-') && file.endsWith('.json'))
    .map((file) => {
      const path = join(dir, file);
      return { path, mtime: statSync(path).mtime };
    })
    .sort((a, b) => b.mtime - a.mtime)[0];

  return latest?.path || datedProgressPath;
}

function daysBetween(start, end) {
  const startDate = new Date(`${start}T00:00:00Z`);
  const endDate = new Date(`${end}T00:00:00Z`);
  return Math.max(0, Math.ceil((endDate - startDate) / 86400000));
}

function fmt(value) {
  if (Number.isInteger(value)) return String(value);
  return value.toFixed(1).replace(/\\.0$/, '');
}

function pct(current, target) {
  if (!target) return '0%';
  return `${Math.min(100, Math.round((current / target) * 100))}%`;
}

const goals = readJson(goalsPath);
const progressPath = latestGoalProgressPath();
const progress = readJson(progressPath);
const totals = progress.totals || {};

const current = {
  qualified_visitors: totals.sessions || 0,
  product_clicks: totals.select_item || 0,
  product_views: totals.view_item || 0,
  add_to_carts: totals.add_to_cart || 0,
  checkout_starts: totals.begin_checkout || 0,
  orders: totals.purchase || 0,
};

const lines = [
  `# Order Goal Pace Report - ${today}`,
  '',
  'Owner: Lead Orchestrator with Rawls, Pareto, Faraday, Kuhn, Tesla, and Gauss.',
  '',
  '## Verified Current Progress',
  '',
  `- Source: \`${progressPath}\``,
  `- Generated: ${progress.generated_at}`,
  `- Sessions / qualified visitors: ${current.qualified_visitors}`,
  `- Product clicks: ${current.product_clicks}`,
  `- Product views: ${current.product_views}`,
  `- Add-to-carts: ${current.add_to_carts}`,
  `- Checkout starts: ${current.checkout_starts}`,
  `- Orders: ${current.orders}`,
  '',
  '## Pace Needed',
  '',
];

if (goals.daily_operating_goal?.targets) {
  const dailyGoal = goals.daily_operating_goal;
  lines.push('### Daily Operating Goal');
  lines.push('');
  lines.push(`- Cadence: ${dailyGoal.cadence}`);
  lines.push(`- Owner: ${dailyGoal.owner}`);
  lines.push(`- Success rule: ${dailyGoal.success_rule}`);
  lines.push(`- Operating rule: ${dailyGoal.operating_rule}`);
  lines.push('');
  lines.push('| Metric | Today | Daily Target | Progress |');
  lines.push('| --- | ---: | ---: | ---: |');

  const dailyMetrics = [
    ['Qualified visitors', 'qualified_visitors'],
    ['Product clicks', 'product_clicks'],
    ['Product views', 'product_views'],
    ['Add-to-carts', 'add_to_carts'],
    ['Checkout starts', 'checkout_starts'],
    ['Orders', 'orders'],
  ];

  for (const [label, key] of dailyMetrics) {
    const target = dailyGoal.targets?.[key] || 0;
    const value = current[key] || 0;
    lines.push(`| ${label} | ${value} | ${target} | ${pct(value, target)} |`);
  }
  lines.push('');
}

for (const goal of goals.goals || []) {
  const daysRemaining = Math.max(1, daysBetween(today, goal.target_date));
  lines.push(`### ${goal.name}`);
  lines.push('');
  lines.push(`- Window: ${goal.start_date} to ${goal.target_date}`);
  lines.push(`- Days remaining: ${daysRemaining}`);
  lines.push('');
  lines.push('| Metric | Current | Target | Progress | Needed/day from now |');
  lines.push('| --- | ---: | ---: | ---: | ---: |');

  const metrics = [
    ['Qualified visitors', 'qualified_visitors'],
    ['Product clicks', 'product_clicks', 'product_views'],
    ['Product views', 'product_views'],
    ['Add-to-carts', 'add_to_carts'],
    ['Checkout starts', 'checkout_starts'],
    ['Orders', 'orders'],
  ];

  for (const [label, key, targetKey = key] of metrics) {
    const target = goal.targets?.[targetKey] || 0;
    const value = current[key] || 0;
    const remaining = Math.max(0, target - value);
    lines.push(`| ${label} | ${value} | ${target} | ${pct(value, target)} | ${fmt(remaining / daysRemaining)} |`);
  }
  lines.push('');
}

lines.push('## Operating Interpretation');
lines.push('');
lines.push('- The current verified gap is still traffic and product discovery: sessions exist, but product clicks, product views, carts, checkouts, and orders remain 0.');
lines.push('- Immediate work should prioritize qualified visitor distribution and product-entry paths, then verify whether `select_item` and `view_item` begin moving.');
lines.push('- Do not launch discounts, bundles, scarcity, or stronger shipping/material promises until cost, margin, and operations guardrails are verified.');
lines.push('');
lines.push('## Next Safe Actions');
lines.push('');
lines.push('1. Faraday/Pareto: distribute the existing `order_growth_august_2026` tracked buyer-intent links through available owned/warm channels.');
lines.push('2. Rawls/Tesla: re-run GA4 pace checks daily and investigate instrumentation if sessions grow but product clicks remain 0.');
lines.push('3. Kuhn/Gauss: keep homepage and guide product paths visually obvious while avoiding URL/title churn during indexing stabilization.');

mkdirSync('reports', { recursive: true });
writeFileSync(reportPath, `${lines.join('\n')}\n`);
console.log(reportPath);
