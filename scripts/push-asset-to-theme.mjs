#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { extname } from 'path';

async function pushAssetToTheme(assetPath, themeId) {
  const filename = assetPath.split('/').pop();
  const fileContent = readFileSync(assetPath, 'utf8');
  const contentType = assetPath.endsWith('.js') ? 'text/javascript' : 'text/css';

  const payload = {
    asset: {
      key: `assets/${filename}`,
      value: fileContent,
    },
  };

  const cmd = [
    'curl',
    '-X',
    'PUT',
    `https://north-and-pearl.myshopify.com/admin/api/2024-01/themes/${themeId}/assets.json`,
    '-H',
    '"Authorization: Bearer ${SHOPIFY_ADMIN_API_TOKEN}"',
    '-H',
    '"Content-Type: application/json"',
    '-d',
    `'${JSON.stringify(payload)}'`,
  ];

  console.log(`Pushing ${filename} to theme ${themeId}...`);
  const result = execSync(cmd.join(' '), { encoding: 'utf8' });
  console.log(result);
}

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node scripts/push-asset-to-theme.mjs <asset-path> <theme-id>');
  process.exit(1);
}

pushAssetToTheme(args[0], args[1]).catch((e) => {
  console.error('Error:', e.message);
  process.exit(1);
});
