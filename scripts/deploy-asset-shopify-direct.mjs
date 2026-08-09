#!/usr/bin/env node

/**
 * Deploy theme asset to Shopify using Admin API directly
 * Usage: SHOPIFY_CLIENT_ID=xxx SHOPIFY_CLIENT_SECRET=yyy node scripts/deploy-asset-shopify-direct.mjs <asset-path> <theme-id>
 */

import { readFileSync } from 'fs';
import https from 'https';

const clientId = process.env.SHOPIFY_CLIENT_ID;
const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;
const store = 'north-and-pearl.myshopify.com';

if (!clientId || !clientSecret) {
  console.error('Error: SHOPIFY_CLIENT_ID and SHOPIFY_CLIENT_SECRET env vars required');
  console.error('Usage: SHOPIFY_CLIENT_ID=xxx SHOPIFY_CLIENT_SECRET=yyy node deploy-asset-shopify-direct.mjs <asset-path> <theme-id>');
  process.exit(1);
}

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: SHOPIFY_CLIENT_ID=xxx SHOPIFY_CLIENT_SECRET=yyy node deploy-asset-shopify-direct.mjs <asset-path> <theme-id>');
  process.exit(1);
}

const assetPath = args[0];
const themeId = args[1];

async function makeRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: store,
      port: 443,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({ status: res.statusCode, data: data });
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function deployAsset() {
  try {
    console.log(`📦 Deploying ${assetPath} to theme ${themeId}...`);

    // Read asset file
    let fileContent;
    try {
      fileContent = readFileSync(assetPath, 'utf8');
    } catch (err) {
      console.error(`Error reading ${assetPath}:`, err.message);
      process.exit(1);
    }

    const filename = assetPath.split('/').pop();
    const assetKey = `assets/${filename}`;

    // Deploy asset
    const deployPath = `/admin/api/2024-01/themes/${themeId}/assets.json`;
    const payload = {
      asset: {
        key: assetKey,
        value: fileContent,
      },
    };

    console.log(`Pushing ${filename}...`);
    const deployResult = await makeRequest('PUT', deployPath, payload);

    if (deployResult.status === 200) {
      console.log(`✅ Asset deployed successfully!`);
      console.log(`   File: ${filename}`);
      console.log(`   Theme: ${themeId}`);
      console.log(`   Path: ${assetKey}`);
      process.exit(0);
    } else {
      console.error(`❌ Deployment failed with status ${deployResult.status}`);
      try {
        const errorData = JSON.parse(deployResult.data);
        console.error('Response:', JSON.stringify(errorData, null, 2));
      } catch {
        console.error('Response:', deployResult.data);
      }
      process.exit(1);
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

deployAsset();
