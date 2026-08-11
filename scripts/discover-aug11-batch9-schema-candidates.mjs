import fs from 'fs';
import https from 'https';
import path from 'path';

const existingFiles = [
  'docs/sourcing/batch1_candidates_raw.json',
  'docs/sourcing/batch2_public_web_candidates_aug11.json',
  'docs/sourcing/batch3_public_web_candidates_aug11.json',
  'docs/sourcing/batch4_public_web_candidates_aug11.json',
  'docs/sourcing/batch5_public_web_candidates_aug11.json',
  'docs/sourcing/batch6_country_candidates_aug11.json',
  'docs/sourcing/batch7_search_candidates_aug11.json',
  'docs/sourcing/batch8_schema_candidates_aug11.json',
];

const sources = [
  ['birthstone-necklaces', 'Necklace', 'https://www.alibaba.com/countrysearch/CN/birthstone-necklace.html'],
  ['birthstone-bracelets', 'Bracelet', 'https://www.alibaba.com/countrysearch/CN/birthstone-bracelet.html'],
  ['huggie-earrings', 'Earrings', 'https://www.alibaba.com/countrysearch/CN/huggie-earrings.html'],
  ['hoop-earrings', 'Earrings', 'https://www.alibaba.com/countrysearch/CN/gold-hoop-earrings.html'],
  ['stackable-bracelets', 'Bracelet', 'https://www.alibaba.com/countrysearch/CN/stackable-bracelets.html'],
  ['mother-necklaces', 'Necklace', 'https://www.alibaba.com/countrysearch/CN/mother-necklace.html'],
  ['anniversary-necklaces', 'Necklace', 'https://www.alibaba.com/countrysearch/CN/anniversary-necklace.html'],
  ['name-rings', 'Ring', 'https://www.alibaba.com/countrysearch/CN/name-ring.html'],
];

const rejectTerms = [
  'xuping',
  'luoteemi',
  'cartoon',
  'silicone',
  'rubber',
  'plush',
  'wristband',
  'toy',
  'cuban',
  'men',
  'hip hop',
  'children',
  'logo',
  'anime',
  'emoji',
];

function loadExistingUrls() {
  const urls = new Set();
  for (const file of existingFiles) {
    if (!fs.existsSync(file)) continue;
    try {
      const data = JSON.parse(fs.readFileSync(file, 'utf8'));
      for (const candidate of data.candidates || []) {
        if (candidate.url) urls.add(candidate.url);
      }
    } catch {
      // Ignore malformed/nonexistent working files; sourcing dashboard remains the main reconciliation record.
    }
  }
  return urls;
}

function get(url) {
  return new Promise((resolve) => {
    https
      .get(
        url,
        {
          headers: {
            'user-agent':
              'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/126 Safari/537.36',
          },
        },
        (res) => {
          const chunks = [];
          res.on('data', (chunk) => chunks.push(chunk));
          res.on('end', () => resolve(Buffer.concat(chunks)));
        },
      )
      .on('error', (error) => resolve(Buffer.from(`ERROR ${error.message}`)));
  });
}

function findProducts(html) {
  const products = [];
  const pattern =
    /\\"@type\\":\\"Product\\"[\s\S]*?\\"name\\":\\"([^"]+)\\"[\s\S]*?\\"image\\":\\"([^"]+)\\"[\s\S]*?\\"description\\":\\"([^"]*)\\"[\s\S]*?\\"brand\\":\{\\"@type\\":\\"Brand\\",\\"name\\":\\"([^"]*)\\"\}[\s\S]*?\\"price\\":([0-9.]+)[\s\S]*?\\"priceCurrency\\":\\"USD\\"[\s\S]*?\\"url\\":\\"([^"]+)\\"/g;

  for (const match of html.matchAll(pattern)) {
    products.push({
      listingTitle: match[1],
      image: match[2].replace(/\\\//g, '/'),
      description: match[3],
      supplier: match[4],
      price: match[5],
      url: match[6].replace(/\\\//g, '/'),
      listingId: match[6].match(/_(\d+)\.html/)?.[1] || 'UNKNOWN',
    });
  }

  return products;
}

function northPearlTitle(title, category) {
  const lower = title.toLowerCase();
  if (lower.includes('birthstone') && category === 'Necklace') return 'North & Pearl Birthstone Pendant Necklace';
  if (lower.includes('birthstone') && category === 'Bracelet') return 'North & Pearl Birthstone Bracelet';
  if (lower.includes('huggie')) return 'North & Pearl Huggie Earrings';
  if (lower.includes('hoop')) return 'North & Pearl Hoop Earrings';
  if (lower.includes('mother') || lower.includes('mom')) return 'North & Pearl Mom Necklace';
  if (lower.includes('anniversary')) return 'North & Pearl Anniversary Necklace';
  if (lower.includes('name') && category === 'Ring') return 'North & Pearl Personalized Name Ring';
  if (lower.includes('stack')) return `North & Pearl Stackable ${category}`;
  return `North & Pearl ${category}`;
}

const existing = loadExistingUrls();
const outDir = 'reports/alibaba-batch9-schema-images-2026-08-11';
fs.mkdirSync(outDir, { recursive: true });

const output = [];

for (const [sourceName, category, url] of sources) {
  const html = (await get(url)).toString();
  const products = findProducts(html);
  console.log(`${sourceName}: ${products.length} products from schema`);

  for (const product of products) {
    const text = `${product.listingTitle} ${product.supplier}`.toLowerCase();
    if (rejectTerms.some((term) => text.includes(term))) continue;
    if (existing.has(product.url)) continue;
    if (output.some((candidate) => candidate.url === product.url)) continue;

    const id = `B9-${String(output.length + 1).padStart(3, '0')}`;
    const imageFile = path.join(outDir, `${id}.jpg`);
    const imageBuffer = await get(product.image);
    const downloaded = [];
    if (imageBuffer.length > 1000) {
      fs.writeFileSync(imageFile, imageBuffer);
      downloaded.push(imageFile);
    }

    output.push({
      id,
      np: northPearlTitle(product.listingTitle, category),
      category,
      sourceCategory: sourceName,
      url: product.url,
      listing: product.listingId,
      supplier: product.supplier || 'UNKNOWN',
      supplierClaimPriceUsd: product.price,
      title: product.listingTitle,
      image: product.image,
      downloaded,
      gateStatus: downloaded.length ? 'DISCOVERY_THUMBNAIL_ONLY' : 'NO_IMAGE_DOWNLOADED',
    });

    if (output.length >= 45) break;
  }
  if (output.length >= 45) break;
}

fs.writeFileSync(
  'docs/sourcing/batch9_schema_candidates_aug11.json',
  JSON.stringify({ date: '2026-08-11', count: output.length, candidates: output }, null, 2),
);

console.log(`Saved ${output.length} Batch 9 candidates`);
