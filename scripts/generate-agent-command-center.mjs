import { copyFileSync, cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const automationRoot = '/Users/yagneshtank/.codex/automations';
const localExportRoot = '/tmp/north-pearl-command-center-root';
const now = new Date();
const today = now.toISOString().slice(0, 10);
const sameThreadAutomationId = 'north-pearl-same-thread-daily-agent-run';

const agents = [
  {
    name: 'Faraday',
    lane: 'Organic growth',
    reportPrefixes: ['faraday-qualified-traffic-execution', 'faraday-daily-traffic-orders', 'faraday-daily-marketing', 'faraday-traffic-visibility-check', 'faraday-buyer-intent-collections', 'google-api-access-blocker'],
    owns: 'SEO, AEO, GEO, Search Console, buyer-intent pages, organic traffic and conversion paths.',
  },
  {
    name: 'Gauss',
    lane: 'Product and merchandising',
    reportPrefixes: ['gauss-daily-catalog-growth', 'gauss-next-100', 'gauss-market-category-review', 'gauss-catalog-qa', 'source-reference-recovery'],
    owns: 'Daily product additions, category balance, product source traceability, catalog hygiene.',
  },
  {
    name: 'Tesla',
    lane: 'Shopify engineering',
    reportPrefixes: ['tesla-daily-storefront-qa', 'tesla-storefront-qa', 'live-storefront-qa'],
    owns: 'Theme code, QA, cart, search, mobile, performance, accessibility, Shopify CLI.',
  },
  {
    name: 'Rawls',
    lane: 'Analytics and data',
    reportPrefixes: ['rawls-daily-analytics-watch', 'rawls-measurement-readiness', 'organic-measurement-qa'],
    owns: 'GA4, Search Console, Shopify analytics, KPI measurement, funnel diagnosis.',
  },
  {
    name: 'Lovelace',
    lane: 'Operations and order sourcing',
    reportPrefixes: ['lovelace-order-access-restored', 'lovelace-daily-order-source-monitor', 'lovelace-merchant-center-shipping-blocker', 'operations-readiness-audit'],
    owns: 'Order-source mapping, Alibaba source URLs, fulfillment readiness, shipping/returns safety.',
  },
  {
    name: 'Kuhn',
    lane: 'Ecommerce design and brand',
    reportPrefixes: ['kuhn-daily-design-qa', 'kuhn-product-visual-standard', 'homepage-commerce-redesign', 'world-class-ecommerce-remediation'],
    owns: 'Premium jewelry UX, visual QA, product imagery presentation, homepage/collection/PDP polish.',
  },
  {
    name: 'Curie',
    lane: 'Supplier and claim safety',
    reportPrefixes: ['curie-daily-source-claim-safety', 'source-reference-recovery', 'source-image-opportunities', 'alibaba-source-media-access', 'source-media-blocker-repair'],
    owns: 'Supplier/source evidence, Alibaba traceability, claim safety, product-quality risk.',
  },
  {
    name: 'Lead Orchestrator',
    lane: 'Ecommerce operating system',
    reportPrefixes: ['order-growth-execution', 'lead-urgent-task-execution', 'lead-traffic-orders-summary', 'lead-daily-ecommerce-coordination', 'lead-orchestrator-daily-execution', 'daily-orchestration-sprint'],
    owns: 'Prioritization, cross-agent coordination, sprint/backlog, risk, QA, next-month order readiness.',
  },
];

function parseTomlValue(text, key) {
  const match = text.match(new RegExp(`^${key}\\s*=\\s*\"([^\"]*)\"`, 'm'));
  return match?.[1] || '';
}

function readAutomationById(automationId) {
  const file = join(automationRoot, automationId, 'automation.toml');
  if (!existsSync(file)) return { active: false, file };
  const text = readFileSync(file, 'utf8');
  return {
    active: parseTomlValue(text, 'status') === 'ACTIVE',
    kind: parseTomlValue(text, 'kind'),
    name: parseTomlValue(text, 'name'),
    rrule: parseTomlValue(text, 'rrule'),
    model: parseTomlValue(text, 'model'),
    file,
  };
}

function reportFiles(prefixes) {
  if (!existsSync('reports')) return [];
  return readdirSync('reports')
    .filter((file) => prefixes.some((prefix) => file.startsWith(prefix)) && file.endsWith('.md'))
    .map((file) => {
      const path = join('reports', file);
      const stats = statSync(path);
      return { file, path, mtime: stats.mtime };
    })
    .sort((a, b) => b.mtime - a.mtime);
}

function statusFor(sameThreadAutomation, latest, todayReport) {
  if (!sameThreadAutomation.active) return 'Not Scheduled';
  if (todayReport) return 'Updated Today';
  if (latest) return 'Waiting In Thread';
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

function readJson(path, fallback = null) {
  if (!existsSync(path)) return fallback;
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    return fallback;
  }
}

function latestMatchingFile(dir, matcher) {
  if (!existsSync(dir)) return null;
  return readdirSync(dir)
    .filter(matcher)
    .map((file) => {
      const path = join(dir, file);
      return { file, path, mtime: statSync(path).mtime };
    })
    .sort((a, b) => b.mtime - a.mtime)[0] || null;
}

function readLatestJson(dir, matcher, fallback = null) {
  const latest = latestMatchingFile(dir, matcher);
  if (!latest) return { data: fallback, file: null };
  return { data: readJson(latest.path, fallback), file: latest.path };
}

function readText(path) {
  return existsSync(path) ? readFileSync(path, 'utf8') : '';
}

function firstNumber(text, patterns, fallback = 'Unknown') {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return match[1];
  }
  return fallback;
}

const sameThreadAutomation = readAutomationById(sameThreadAutomationId);

const rows = agents.map((agent) => {
  const reports = reportFiles(agent.reportPrefixes);
  const latest = reports[0];
  const todayReport = reports.find((report) => report.file.includes(today));
  const status = statusFor(sameThreadAutomation, latest, todayReport);
  return {
    ...agent,
    latest,
    todayReport,
    status,
  };
});

const latestGsc = readLatestJson('reports/google-api', (file) => file.startsWith('gsc-query-post-faraday-') && file.endsWith('.json'));
const latestGa4Organic = readLatestJson('reports/google-api', (file) => file.startsWith('ga4-organic-post-faraday-') && file.endsWith('.json'));
const latestGa4Pages = readLatestJson('reports/google-api', (file) => file.startsWith('ga4-organic-top-pages-post-faraday-') && file.endsWith('.json'));
const latestOrders = readLatestJson('reports', (file) => file.startsWith('shopify-orders-safe-') && file.endsWith('.json'));
const merchantText = readText(`reports/merchant-center-readiness-${today}.md`) || readText('reports/merchant-center-readiness-2026-07-30.md');
const sprintText = readText('SPRINT.md');
const metricsText = readText('METRICS.md');
const commandTrafficReport = readText(`reports/faraday-traffic-chance-before-after-${today}.md`) || readText('reports/faraday-traffic-chance-before-after-2026-07-30.md');

const gscTotals = latestGsc.data?.totals || {};
const ga4OrganicSessions = latestGa4Pages.data?.total_organic_sessions ?? 0;
const orderCount = latestOrders.data?.orders?.nodes?.length ?? 0;
const activeProducts = firstNumber(merchantText, [/Active products audited:\s*(\d+)/i, /(\d+)\s+active products/i], 'Unknown');
const merchantReady = firstNumber(merchantText, [/Ready with identifier caveat:\s*(\d+)/i, /(\d+)\s+active products ready/i], 'Unknown');
const merchantNeedsReview = firstNumber(merchantText, [/Needs review:\s*(\d+)/i, /(\d+)\s+needing review/i], 'Unknown');
const sourceMediaRisk = firstNumber(metricsText, [/Source-image polish baseline:\s*(\d+)\s+of\s+\d+\s+active products are below/i], '115');
const themeCheck = firstNumber(sprintText, [/Theme Check(?: passed)?(?: on July 30)?;\s*(\d+)\s+files inspected with 0 offenses/i, /Theme Check[^.\n]*?(\d+)\s+files inspected[^.\n]*?0 offenses/i], '231');

const businessStats = [
  { label: 'Search impressions', value: gscTotals.impressions ?? 0, note: 'Search Console, latest API snapshot', tone: 'blue' },
  { label: 'Search clicks', value: gscTotals.clicks ?? 0, note: 'No organic clicks verified yet', tone: Number(gscTotals.clicks || 0) > 0 ? 'green' : 'amber' },
  { label: 'GA4 organic sessions', value: ga4OrganicSessions, note: 'Organic top-pages API report', tone: Number(ga4OrganicSessions || 0) > 0 ? 'green' : 'amber' },
  { label: 'Visible orders', value: orderCount, note: 'Safe non-PII Shopify order monitor', tone: Number(orderCount || 0) > 0 ? 'green' : 'amber' },
  { label: 'Active products', value: activeProducts, note: 'Gauss catalog baseline', tone: 'green' },
  { label: 'Merchant-ready products', value: merchantReady, note: `${merchantNeedsReview} needing review`, tone: merchantNeedsReview === '0' ? 'green' : 'amber' },
  { label: 'Media polish queue', value: sourceMediaRisk, note: 'Products below preferred image standard', tone: 'amber' },
  { label: 'Theme Check', value: '0', note: `${themeCheck} files inspected, 0 offenses`, tone: 'green' },
];

const agentStats = rows.map((row) => {
  const reports = reportFiles(row.reportPrefixes);
  return {
    name: row.name,
    reportsToday: reports.filter((report) => report.file.includes(today)).length,
    totalReports: reports.length,
    latest: row.latest?.file || 'No report yet',
    status: row.status,
  };
});

const summary = {
  generatedAt: now.toISOString(),
  sameThreadAutomationActive: sameThreadAutomation.active,
  activeAutomations: sameThreadAutomation.active ? 1 : 0,
  workingToday: rows.filter((row) => row.status === 'Updated Today').length,
  needsUpdate: rows.filter((row) => row.status === 'No Report Yet').length,
  resting: rows.filter((row) => row.status !== 'Updated Today').length,
  searchImpressions: gscTotals.impressions ?? 0,
  searchClicks: gscTotals.clicks ?? 0,
  organicSessions: ga4OrganicSessions,
  visibleOrders: orderCount,
  activeProducts,
};

const blockers = [
  {
    owner: 'Rawls + Faraday',
    severity: 'Resolved',
    title: 'Google API, Search Console, and GA4 access are configured',
    impact: 'Faraday and Rawls can now run API-backed Search Console, URL Inspection, sitemap, PageSpeed, CrUX, and GA4 organic reports from local credentials.',
    next: 'Continue daily monitoring; current growth blocker is indexing and traffic maturity, not access.',
  },
  {
    owner: 'Faraday',
    severity: 'Needs Work',
    title: 'Buyer-intent pages are still early in Google discovery',
    impact: 'Search Console currently shows 1 impression and 0 clicks, and priority buyer-intent URLs remain unknown to Google or not fully indexed yet.',
    next: 'Use the same-thread daily Faraday monitor to recheck indexing, preserve sitemap submission, and strengthen internal links from indexed pages into commercial paths.',
  },
  {
    owner: 'Lovelace',
    severity: 'Resolved',
    title: 'Shopify order read access is restored',
    impact: 'Safe non-PII order monitoring can now detect recent orders and map ordered products to source tags when orders exist.',
    next: 'Continue daily order-source monitoring; current safe query shows 0 visible orders.',
  },
  {
    owner: 'Gauss + Curie + Kuhn',
    severity: 'Needs Work',
    title: '115 active products remain below preferred media standard',
    impact: 'Storefront QA passes, but product imagery is not yet at the premium visual bar for a world-class jewelry brand.',
    next: 'Work reports/source-reference-recovery-2026-07-29.md first: 5 recoverable source IDs need exact-match confirmation and 4 products need exact Alibaba URLs.',
  },
];

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
      --blue: #315f87;
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
    .stats, .toolbar {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 14px;
      margin: 24px 0;
    }
    .stat, .card, .panel {
      background: var(--paper);
      border: 1px solid var(--line);
      border-radius: 10px;
      box-shadow: 0 10px 24px rgba(30, 20, 10, .04);
    }
    .stat { padding: 18px; }
    .stat strong { display: block; font-size: 30px; line-height: 1; }
    .stat span { color: var(--muted); font-size: 13px; }
    .stat.blue strong { color: var(--blue); }
    .stat.green strong { color: var(--green); }
    .stat.amber strong { color: var(--amber); }
    .metric-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 12px;
      margin-top: 12px;
    }
    .metric {
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 14px;
      background: #fffaf1;
    }
    .metric strong {
      display: block;
      font-size: 28px;
      line-height: 1;
      margin-bottom: 6px;
    }
    .metric .label { font-weight: 750; }
    .metric .note { color: var(--muted); font-size: 12px; margin-top: 4px; }
    .metric.blue strong { color: var(--blue); }
    .metric.green strong { color: var(--green); }
    .metric.amber strong { color: var(--amber); }
    .agent-metrics {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 10px;
      margin-top: 12px;
    }
    .agent-metric {
      border: 1px solid var(--line);
      border-radius: 8px;
      background: var(--paper);
      padding: 12px;
    }
    .agent-metric strong { display: block; font-size: 18px; }
    .toolbar {
      grid-template-columns: 1fr auto auto auto auto;
      align-items: center;
    }
    .search {
      width: 100%;
      min-height: 44px;
      border: 1px solid var(--line);
      border-radius: 999px;
      background: var(--paper);
      color: var(--ink);
      padding: 0 16px;
      font: inherit;
    }
    .filter {
      min-height: 44px;
      border: 1px solid var(--line);
      border-radius: 999px;
      background: var(--paper);
      color: var(--ink);
      padding: 0 15px;
      font: inherit;
      cursor: pointer;
    }
    .filter[aria-pressed="true"] {
      background: var(--ink);
      color: var(--paper);
      border-color: var(--ink);
    }
    .panel {
      padding: 18px;
      margin: 0 0 18px;
    }
    .panel h2 {
      font-family: Georgia, "Times New Roman", serif;
      font-size: 26px;
      margin: 0 0 12px;
    }
    .blockers {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
    }
    .blocker {
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 14px;
      background: #fffaf1;
    }
    .blocker strong { display: block; margin-bottom: 5px; }
    .pill {
      display: inline-flex;
      border-radius: 999px;
      padding: 4px 9px;
      margin-bottom: 10px;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: .04em;
      text-transform: uppercase;
    }
    .pill.blocked { color: var(--red); background: #fff0ef; }
    .pill.needs-work { color: var(--amber); background: #fff7e5; }
    .pill.resolved { color: var(--green); background: #eef8f2; }
    .grid { display: grid; gap: 14px; }
    .card {
      display: grid;
      grid-template-columns: 180px 1fr 170px;
      gap: 18px;
      padding: 18px;
      align-items: start;
      transition: transform .16s ease, border-color .16s ease, box-shadow .16s ease;
    }
    .card:hover,
    .card:focus-within {
      border-color: rgba(185, 145, 79, .65);
      box-shadow: 0 16px 36px rgba(30, 20, 10, .08);
      transform: translateY(-1px);
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
    .updated-today { color: var(--green); background: #eef8f2; }
    .waiting-in-thread { color: var(--amber); background: #fff7e5; }
    .no-report-yet, .not-scheduled { color: var(--red); background: #fff0ef; }
    .agent-state {
      margin-top: 10px;
      color: var(--muted);
      font-size: 13px;
    }
    .working { color: var(--green); }
    .resting { color: var(--amber); }
    .blocked-text { color: var(--red); }
    dl { display: grid; gap: 6px; margin: 0; }
    dt { color: var(--muted); font-size: 12px; text-transform: uppercase; letter-spacing: .08em; }
    dd { margin: 0 0 8px; }
    a { color: var(--ink); text-decoration-color: var(--gold); text-underline-offset: 3px; }
    .small { color: var(--muted); font-size: 13px; }
    footer { margin-top: 26px; color: var(--muted); font-size: 13px; }
    .hidden { display: none !important; }
    @media (max-width: 980px) {
      .stats, .toolbar, .blockers, .card, .metric-grid, .agent-metrics { grid-template-columns: 1fr; }
      .status { justify-content: flex-start; }
    }
  </style>
</head>
<body>
  <main class="wrap">
    <header>
      <div class="kicker">North & Pearl</div>
      <h1>Agent Command Center</h1>
      <p class="sub">Daily operating view for the North & Pearl ecommerce team. Agents now run as responsibility lanes inside the same thread through one heartbeat, so this dashboard tracks lane evidence without creating separate Codex chats.</p>
    </header>

    <section class="stats" aria-label="Agent status summary">
      <div class="stat"><strong>${summary.activeAutomations}</strong><span>Same-thread heartbeat</span></div>
      <div class="stat"><strong>${summary.workingToday}</strong><span>Lanes updated today</span></div>
      <div class="stat"><strong>${summary.resting}</strong><span>Lanes resting</span></div>
      <div class="stat"><strong>${summary.needsUpdate}</strong><span>Lanes with no report yet</span></div>
    </section>

    <section class="panel" aria-label="Traffic and storefront performance statistics">
      <h2>Traffic & Performance</h2>
      <p class="small">These are verified snapshots from Search Console, GA4, Shopify, Merchant readiness, and theme reports. No traffic or order lift is claimed until these numbers move.</p>
      <div class="metric-grid">
        ${businessStats.map((item) => `
          <div class="metric ${esc(item.tone)}">
            <strong>${esc(item.value)}</strong>
            <div class="label">${esc(item.label)}</div>
            <div class="note">${esc(item.note)}</div>
          </div>
        `).join('')}
      </div>
      <p class="small">Latest Faraday read: ${commandTrafficReport ? 'traffic chance improved, verified traffic increase remains 0 so far.' : 'traffic before/after report is not present yet.'}</p>
    </section>

    <section class="panel" aria-label="Agent performance statistics">
      <h2>Agent Performance</h2>
      <p class="small">This tracks evidence of work in the same thread: reports produced today, total matching lane reports, and latest artifact.</p>
      <div class="agent-metrics">
        ${agentStats.map((agent) => `
          <div class="agent-metric">
            <strong>${esc(agent.name)}</strong>
            <div class="small">${esc(agent.status)}</div>
            <div class="small">${esc(agent.reportsToday)} report(s) today · ${esc(agent.totalReports)} total</div>
            <div class="small">Latest: ${esc(agent.latest)}</div>
          </div>
        `).join('')}
      </div>
    </section>

    <section class="toolbar" aria-label="Dashboard filters">
      <input class="search" id="agent-search" type="search" placeholder="Search agents, ownership, reports, blockers..." aria-label="Search agents">
      <button class="filter" type="button" data-filter="all" aria-pressed="true">All</button>
      <button class="filter" type="button" data-filter="working" aria-pressed="false">Working</button>
      <button class="filter" type="button" data-filter="resting" aria-pressed="false">Resting</button>
      <button class="filter" type="button" data-filter="blocked" aria-pressed="false">Blocked</button>
    </section>

    <section class="panel" aria-label="Current blockers">
      <h2>Current Blockers</h2>
      <div class="blockers">
        ${blockers.map((blocker) => `
          <div class="blocker" data-blocker-owner="${esc(blocker.owner)}">
            <span class="pill ${statusClass(blocker.severity)}">${esc(blocker.severity)}</span>
            <strong>${esc(blocker.title)}</strong>
            <p class="small">${esc(blocker.impact)}</p>
            <p class="small"><strong>Next:</strong> ${esc(blocker.next)}</p>
            <p class="small"><strong>Owner:</strong> ${esc(blocker.owner)}</p>
          </div>
        `).join('')}
      </div>
    </section>

    <section class="grid" aria-label="Agent lanes">
      ${rows.map((row) => `
        <article class="card" data-agent="${esc(row.name)}" data-state="${row.status === 'Updated Today' ? 'working' : 'resting'}" data-search="${esc([row.name, row.lane, row.owns, row.latest?.file || '', row.status].join(' ').toLowerCase())}">
          <div>
            <h2 class="agent-name">${esc(row.name)}</h2>
            <div class="lane">${esc(row.lane)}</div>
            <div class="agent-state ${row.status === 'Updated Today' ? 'working' : 'resting'}">${row.status === 'Updated Today' ? 'Working today' : 'Resting until next heartbeat'}</div>
          </div>
          <dl>
            <dt>Owns</dt>
            <dd>${esc(row.owns)}</dd>
            <dt>Operating Mode</dt>
            <dd>${sameThreadAutomation.active ? `Same-thread heartbeat: ${esc(sameThreadAutomation.rrule)}` : 'No same-thread heartbeat is active'}</dd>
            <dt>Latest Report</dt>
            <dd>${row.latest ? `<a href="../${esc(row.latest.path)}">${esc(row.latest.file)}</a>` : '<span class="small">No report found yet.</span>'}</dd>
            <dt>Thread Rule</dt>
            <dd class="small">No separate chat. Lead Orchestrator runs this lane inside the current thread.</dd>
          </dl>
          <div>
            <span class="status ${statusClass(row.status)}">${esc(row.status)}</span>
          </div>
        </article>
      `).join('')}
    </section>

    <footer>
      Generated at ${esc(summary.generatedAt)}. Open this file after the same-thread daily run or regenerate with <code>node scripts/generate-agent-command-center.mjs</code>.
    </footer>
  </main>
  <script>
    const search = document.querySelector('#agent-search');
    const filters = [...document.querySelectorAll('.filter')];
    const cards = [...document.querySelectorAll('.card[data-agent]')];
    const blockers = [...document.querySelectorAll('.blocker')];
    let activeFilter = 'all';

    function normalize(value) {
      return String(value || '').toLowerCase().trim();
    }

    function applyFilters() {
      const q = normalize(search.value);
      const blockedOwners = blockers.map((blocker) => normalize(blocker.dataset.blockerOwner));

      cards.forEach((card) => {
        const state = card.dataset.state;
        const agent = normalize(card.dataset.agent);
        const matchesSearch = !q || card.dataset.search.includes(q);
        const matchesFilter =
          activeFilter === 'all' ||
          activeFilter === state ||
          (activeFilter === 'blocked' && blockedOwners.some((owner) => owner.includes(agent) || owner.includes(agent.split(' ')[0])));

        card.classList.toggle('hidden', !(matchesSearch && matchesFilter));
      });
    }

    filters.forEach((button) => {
      button.addEventListener('click', () => {
        activeFilter = button.dataset.filter;
        filters.forEach((item) => item.setAttribute('aria-pressed', item === button ? 'true' : 'false'));
        applyFilters();
      });
    });

    search.addEventListener('input', applyFilters);
  </script>
</body>
</html>
`;

mkdirSync('docs', { recursive: true });
mkdirSync('reports', { recursive: true });
writeFileSync('docs/agent-command-center.html', html);
writeFileSync('reports/agent-command-center-status.json', JSON.stringify({ summary, businessStats, agentStats, blockers, agents: rows }, null, 2));

const textReport = `# Agent Command Center

Generated: ${summary.generatedAt}

## Summary

- Same-thread heartbeat active: ${summary.sameThreadAutomationActive ? 'yes' : 'no'}
- Lanes updated today: ${summary.workingToday}
- Lanes resting: ${summary.resting}
- Lanes with no report yet: ${summary.needsUpdate}
- Search Console impressions: ${summary.searchImpressions}
- Search Console clicks: ${summary.searchClicks}
- GA4 organic sessions: ${summary.organicSessions}
- Visible Shopify orders: ${summary.visibleOrders}
- Active products: ${summary.activeProducts}

## Traffic & Performance

${businessStats.map((item) => `- ${item.label}: ${item.value} (${item.note})`).join('\n')}

## Agent Performance

${agentStats.map((agent) => `- ${agent.name}: ${agent.reportsToday} report(s) today, ${agent.totalReports} total matching lane reports; latest: ${agent.latest}`).join('\n')}

## Blockers

${blockers.map((blocker) => `- ${blocker.severity}: ${blocker.title}; owner: ${blocker.owner}; next: ${blocker.next}`).join('\n')}

## Agents

${rows.map((row) => `- ${row.name}: ${row.status}; latest report: ${row.latest ? row.latest.path : 'none yet'}; operating mode: same-thread heartbeat`).join('\n')}

## UI

Open \`docs/agent-command-center.html\` to view the local dashboard.
`;

writeFileSync(`reports/agent-command-center-${today}.md`, textReport);

rmSync(localExportRoot, { recursive: true, force: true });
mkdirSync(join(localExportRoot, 'docs'), { recursive: true });
mkdirSync(join(localExportRoot, 'reports'), { recursive: true });
copyFileSync('docs/agent-command-center.html', join(localExportRoot, 'docs', 'agent-command-center.html'));
cpSync('reports', join(localExportRoot, 'reports'), { recursive: true });

console.table(rows.map((row) => ({
  agent: row.name,
  status: row.status,
  report: row.latest?.file || 'none',
  sameThreadHeartbeat: sameThreadAutomation.active,
})));
console.log('Dashboard: docs/agent-command-center.html');
