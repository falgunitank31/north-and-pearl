import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const automationRoot = '/Users/yagneshtank/.codex/automations';
const now = new Date();
const today = now.toISOString().slice(0, 10);

const agents = [
  {
    name: 'Faraday',
    lane: 'Organic growth',
    automationId: 'north-pearl-faraday-daily-traffic-and-orders-sprint',
    reportPrefix: 'faraday-daily-traffic-orders',
    expectedHour: 9,
    expectedMinute: 30,
    owns: 'SEO, AEO, GEO, Search Console, buyer-intent pages, organic traffic and conversion paths.',
  },
  {
    name: 'Gauss',
    lane: 'Product and merchandising',
    automationId: 'north-pearl-gauss-daily-product-catalog-growth',
    reportPrefix: 'gauss-daily-catalog-growth',
    expectedHour: 10,
    expectedMinute: 0,
    owns: 'Daily product additions, category balance, product source traceability, catalog hygiene.',
  },
  {
    name: 'Tesla',
    lane: 'Shopify engineering',
    automationId: 'north-pearl-tesla-daily-storefront-qa',
    reportPrefix: 'tesla-daily-storefront-qa',
    expectedHour: 11,
    expectedMinute: 0,
    owns: 'Theme code, QA, cart, search, mobile, performance, accessibility, Shopify CLI.',
  },
  {
    name: 'Rawls',
    lane: 'Analytics and data',
    automationId: 'north-pearl-rawls-daily-analytics-watch',
    reportPrefix: 'rawls-daily-analytics-watch',
    expectedHour: 12,
    expectedMinute: 0,
    owns: 'GA4, Search Console, Shopify analytics, KPI measurement, funnel diagnosis.',
  },
  {
    name: 'Lovelace',
    lane: 'Operations and order sourcing',
    automationId: 'north-pearl-lovelace-daily-order-source-monitor',
    reportPrefix: 'lovelace-daily-order-source-monitor',
    expectedHour: 13,
    expectedMinute: 0,
    owns: 'Order-source mapping, Alibaba source URLs, fulfillment readiness, shipping/returns safety.',
  },
  {
    name: 'Lead Orchestrator',
    lane: 'Ecommerce operating system',
    automationId: 'north-pearl-lead-daily-ecommerce-coordination',
    reportPrefix: 'lead-daily-ecommerce-coordination',
    expectedHour: 16,
    expectedMinute: 0,
    owns: 'Prioritization, cross-agent coordination, sprint/backlog, risk, QA, next-month order readiness.',
  },
];

function parseTomlValue(text, key) {
  const match = text.match(new RegExp(`^${key}\\s*=\\s*\"([^\"]*)\"`, 'm'));
  return match?.[1] || '';
}

function readAutomation(agent) {
  const file = join(automationRoot, agent.automationId, 'automation.toml');
  if (!existsSync(file)) return { active: false, file };
  const text = readFileSync(file, 'utf8');
  return {
    active: parseTomlValue(text, 'status') === 'ACTIVE',
    name: parseTomlValue(text, 'name'),
    rrule: parseTomlValue(text, 'rrule'),
    model: parseTomlValue(text, 'model'),
    file,
  };
}

function reportFiles(prefix) {
  if (!existsSync('reports')) return [];
  return readdirSync('reports')
    .filter((file) => file.startsWith(prefix) && file.endsWith('.md'))
    .map((file) => {
      const path = join('reports', file);
      const stats = statSync(path);
      return { file, path, mtime: stats.mtime };
    })
    .sort((a, b) => b.mtime - a.mtime);
}

function isPastExpected(agent) {
  const expected = new Date(now);
  expected.setHours(agent.expectedHour, agent.expectedMinute, 0, 0);
  return now > expected;
}

function statusFor(agent, automation, latest, todayReport) {
  if (!automation.active) return 'Not Scheduled';
  if (todayReport) return 'Working';
  if (isPastExpected(agent)) return 'Needs Update';
  if (latest) return 'Scheduled Today';
  return 'No Report Yet';
}

function statusClass(status) {
  return status.toLowerCase().replace(/\s+/g, '-');
}

function esc(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

const rows = agents.map((agent) => {
  const automation = readAutomation(agent);
  const reports = reportFiles(agent.reportPrefix);
  const latest = reports[0];
  const todayReport = reports.find((report) => report.file.includes(today));
  const status = statusFor(agent, automation, latest, todayReport);
  return {
    ...agent,
    automation,
    latest,
    todayReport,
    status,
  };
});

const summary = {
  generatedAt: now.toISOString(),
  activeAutomations: rows.filter((row) => row.automation.active).length,
  workingToday: rows.filter((row) => row.status === 'Working').length,
  needsUpdate: rows.filter((row) => row.status === 'Needs Update').length,
};

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>North & Pearl Agent Command Center</title>
  <style>
    :root {
      color-scheme: light;
      --ivory: #fbf7ef;
      --paper: #fffdf8;
      --ink: #17130f;
      --muted: #6f665c;
      --line: #e8dfd2;
      --gold: #b9914f;
      --green: #0f7a4b;
      --amber: #9a6200;
      --red: #a8342d;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: var(--ivory);
      color: var(--ink);
      font: 15px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    .wrap { max-width: 1180px; margin: 0 auto; padding: 40px 22px 64px; }
    header {
      display: grid;
      gap: 10px;
      padding-bottom: 28px;
      border-bottom: 1px solid var(--line);
    }
    .kicker {
      color: var(--gold);
      font-size: 12px;
      font-weight: 700;
      letter-spacing: .16em;
      text-transform: uppercase;
    }
    h1 {
      margin: 0;
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(34px, 6vw, 62px);
      line-height: .95;
      letter-spacing: -.02em;
    }
    .sub { color: var(--muted); max-width: 760px; margin: 0; }
    .stats {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 14px;
      margin: 24px 0;
    }
    .stat, .card {
      background: var(--paper);
      border: 1px solid var(--line);
      border-radius: 10px;
      box-shadow: 0 10px 24px rgba(30, 20, 10, .04);
    }
    .stat { padding: 18px; }
    .stat strong { display: block; font-size: 30px; line-height: 1; }
    .stat span { color: var(--muted); font-size: 13px; }
    .grid { display: grid; gap: 14px; }
    .card {
      display: grid;
      grid-template-columns: 180px 1fr 170px;
      gap: 18px;
      padding: 18px;
      align-items: start;
    }
    .agent-name {
      font-family: Georgia, "Times New Roman", serif;
      font-size: 25px;
      margin: 0 0 2px;
    }
    .lane { color: var(--muted); font-size: 13px; }
    .status {
      display: inline-flex;
      justify-content: center;
      min-width: 132px;
      border-radius: 999px;
      padding: 8px 12px;
      font-weight: 700;
      font-size: 13px;
      border: 1px solid currentColor;
    }
    .working { color: var(--green); background: #eef8f2; }
    .scheduled-today, .no-report-yet { color: var(--amber); background: #fff7e5; }
    .needs-update, .not-scheduled { color: var(--red); background: #fff0ef; }
    dl { display: grid; gap: 6px; margin: 0; }
    dt { color: var(--muted); font-size: 12px; text-transform: uppercase; letter-spacing: .08em; }
    dd { margin: 0 0 8px; }
    a { color: var(--ink); text-decoration-color: var(--gold); text-underline-offset: 3px; }
    .small { color: var(--muted); font-size: 13px; }
    footer { margin-top: 26px; color: var(--muted); font-size: 13px; }
    @media (max-width: 820px) {
      .stats, .card { grid-template-columns: 1fr; }
      .status { justify-content: flex-start; }
    }
  </style>
</head>
<body>
  <main class="wrap">
    <header>
      <div class="kicker">North & Pearl</div>
      <h1>Agent Command Center</h1>
      <p class="sub">Daily operating view for the North & Pearl ecommerce team. Status is based on active Codex automations and whether each lane has produced today’s expected report.</p>
    </header>

    <section class="stats" aria-label="Agent status summary">
      <div class="stat"><strong>${summary.activeAutomations}</strong><span>Active scheduled agents</span></div>
      <div class="stat"><strong>${summary.workingToday}</strong><span>Reported today</span></div>
      <div class="stat"><strong>${summary.needsUpdate}</strong><span>Need update</span></div>
    </section>

    <section class="grid" aria-label="Agent lanes">
      ${rows.map((row) => `
        <article class="card">
          <div>
            <h2 class="agent-name">${esc(row.name)}</h2>
            <div class="lane">${esc(row.lane)}</div>
          </div>
          <dl>
            <dt>Owns</dt>
            <dd>${esc(row.owns)}</dd>
            <dt>Schedule</dt>
            <dd>${esc(row.automation.rrule || 'No active schedule')}</dd>
            <dt>Latest Report</dt>
            <dd>${row.latest ? `<a href="../${esc(row.latest.path)}">${esc(row.latest.file)}</a>` : '<span class="small">No report found yet.</span>'}</dd>
            <dt>Automation</dt>
            <dd class="small">${esc(row.automation.name || row.automationId)}</dd>
          </dl>
          <div>
            <span class="status ${statusClass(row.status)}">${esc(row.status)}</span>
          </div>
        </article>
      `).join('')}
    </section>

    <footer>
      Generated at ${esc(summary.generatedAt)}. Open this file after scheduled runs or regenerate with <code>node scripts/generate-agent-command-center.mjs</code>.
    </footer>
  </main>
</body>
</html>
`;

mkdirSync('docs', { recursive: true });
mkdirSync('reports', { recursive: true });
writeFileSync('docs/agent-command-center.html', html);
writeFileSync('reports/agent-command-center-status.json', JSON.stringify({ summary, agents: rows }, null, 2));

const textReport = `# Agent Command Center

Generated: ${summary.generatedAt}

## Summary

- Active scheduled agents: ${summary.activeAutomations}
- Reported today: ${summary.workingToday}
- Need update: ${summary.needsUpdate}

## Agents

${rows.map((row) => `- ${row.name}: ${row.status}; latest report: ${row.latest ? row.latest.path : 'none yet'}; schedule: ${row.automation.rrule || 'not scheduled'}`).join('\n')}

## UI

Open \`docs/agent-command-center.html\` to view the local dashboard.
`;

writeFileSync(`reports/agent-command-center-${today}.md`, textReport);
console.table(rows.map((row) => ({
  agent: row.name,
  status: row.status,
  report: row.latest?.file || 'none',
  active: row.automation.active,
})));
console.log('Dashboard: docs/agent-command-center.html');
