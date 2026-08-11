import fs from 'fs';
import https from 'https';
import path from 'path';

const sources = [
  ['birthstone-rings', 'Ring', 'https://www.alibaba.com/countrysearch/CN/birthstone-rings.html'],
  ['zodiac-necklaces', 'Necklace', 'https://www.alibaba.com/countrysearch/CN/zodiac-necklace.html'],
  ['initial-earrings', 'Earrings', 'https://www.alibaba.com/countrysearch/CN/initial-earrings.html'],
  ['birthstone-earrings', 'Earrings', 'https://www.alibaba.com/countrysearch/CN/birthstone-earrings.html'],
  ['personalized-bracelets', 'Bracelet', 'https://www.alibaba.com/countrysearch/CN/personalized-bracelet.html'],
  ['stackable-rings', 'Ring', 'https://www.alibaba.com/countrysearch/CN/stackable-rings.html'],
  ['birth-flower-necklaces', 'Necklace', 'https://www.alibaba.com/countrysearch/CN/birth-flower-necklace.html'],
  ['name-bracelets', 'Bracelet', 'https://www.alibaba.com/countrysearch/CN/name-bracelet.html'],
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
];

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
  const productPattern =
    /\\"@type\\":\\"Product\\"[\s\S]*?\\"name\\":\\"([^"]+)\\"[\s\S]*?\\"image\\":\\"([^"]+)\\"[\s\S]*?\\"description\\":\\"([^"]*)\\"[\s\S]*?\\"brand\\":\{\\"@type\\":\\"Brand\\",\\"name\\":\\"([^"]*)\\"\}[\s\S]*?\\"price\\":([0-9.]+)[\s\S]*?\\"priceCurrency\\":\\"USD\\"[\s\S]*?\\"url\\":\\"([^"]+)\\"/g;

  for (const match of html.matchAll(productPattern)) {
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
  if (lower.includes('birthstone') && category === 'Ring') return 'North & Pearl Birth Month Ring';
  if (lower.includes('birthstone') && category === 'Earrings') return 'North & Pearl Birthstone Stud Earrings';
  if (lower.includes('zodiac')) return 'North & Pearl Zodiac Pendant Necklace';
  if (lower.includes('initial') && category === 'Earrings') return 'North & Pearl Initial Stud Earrings';
  if (lower.includes('name') && category === 'Bracelet') return 'North & Pearl Personalized Name Bracelet';
  if (lower.includes('stack')) return 'North & Pearl Stackable Ring';
  if (lower.includes('birth flower')) return 'North & Pearl Birth Flower Necklace';
  return `North & Pearl ${category}`;
}

const outDir = 'reports/alibaba-batch8-schema-images-2026-08-11';
fs.mkdirSync(outDir, { recursive: true });

const seen = new Set();
const output = [];

for (const [sourceName, category, url] of sources) {
  const html = (await get(url)).toString();
  const products = findProducts(html);
  console.log(`${sourceName}: ${products.length} products from schema`);

  for (const product of products) {
    const text = `${product.listingTitle} ${product.supplier}`.toLowerCase();
    if (rejectTerms.some((term) => text.includes(term))) continue;
    if (seen.has(product.url)) continue;
    seen.add(product.url);

    const id = `B8-${String(output.length + 1).padStart(3, '0')}`;
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
  'docs/sourcing/batch8_schema_candidates_aug11.json',
  JSON.stringify({ date: '2026-08-11', count: output.length, candidates: output }, null, 2),
);

console.log(`Saved ${output.length} Batch 8 candidates`);
