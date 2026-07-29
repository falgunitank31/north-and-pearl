import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const configDir = join(homedir(), '.config', 'codex-seo');
const configPath = join(configDir, 'google-api.json');
const examplePath = join(configDir, 'google-api.example.json');

mkdirSync(configDir, { recursive: true, mode: 0o700 });

if (!existsSync(examplePath)) {
  writeFileSync(examplePath, JSON.stringify({
    service_account_path: '/secure/local/path/to/google-service-account.json',
    api_key: 'GOOGLE_API_KEY',
    default_property: 'sc-domain:northandpearl.com',
    ga4_property_id: 'properties/GA4_PROPERTY_ID'
  }, null, 2), { mode: 0o600 });
}

const result = {
  configDir,
  configPath,
  examplePath,
  configExists: existsSync(configPath),
  toolkitCheck: null,
  status: 'BLOCKED',
  nextAction: 'Create google-api.json from google-api.example.json with real Google API credentials. Do not store the credential file in the repo.',
};

try {
  const raw = execFileSync(
    'python3',
    ['/Users/yagneshtank/.codex/skills/seo/scripts/google_auth.py', '--check', '--json'],
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] },
  );
  result.toolkitCheck = JSON.parse(raw);
  if ((result.toolkitCheck?.tier?.tier ?? -1) >= 0) {
    result.status = 'READY';
    result.nextAction = 'Google toolkit credentials are present. Faraday/Rawls can run API-backed reports.';
  }
} catch (error) {
  result.toolkitCheckError = error.stderr?.toString() || error.message;
}

console.log(JSON.stringify(result, null, 2));
