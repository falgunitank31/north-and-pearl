import fs from 'fs';
import path from 'path';
import https from 'https';

const candidates = [
  ['B7-001', 'North & Pearl Topaz Birth Month Ring', 'Ring', 'https://www.alibaba.com/product-detail/Toposh-Wholesale-925-sterling-silver-birth_1601018179826.html', '1601018179826'],
  ['B7-002', 'North & Pearl Oval Birthstone Ring', 'Ring', 'https://www.alibaba.com/product-detail/Kirin-Eternity-Sterling-Silver-Ring-Oval_1601289965800.html', '1601289965800'],
  ['B7-003', 'North & Pearl Classic Birthstone Ring', 'Ring', 'https://www.alibaba.com/product-detail/12-Month-Birthstone-Ring-Wholesale-Tarnish_1601517859415.html', '1601517859415'],
  ['B7-004', 'North & Pearl Gold Birth Month Ring', 'Ring', 'https://www.alibaba.com/product-detail/12-Months-Birthstone-Ring-18K-Gold_1601239734997.html', '1601239734997'],
  ['B7-005', 'North & Pearl Birthstone Stud Earrings', 'Earrings', 'https://www.alibaba.com/product-detail/eManco-Stainless-Steel-Birthstone-Earrings-Minimalist_1600849580572.html', '1600849580572'],
  ['B7-006', 'North & Pearl Color Accent Stud Earrings', 'Earrings', 'https://www.alibaba.com/product-detail/Stainless-Steel-14K-Gold-Micro-Insert_1600848265168.html', '1600848265168'],
  ['B7-007', 'North & Pearl Water Drop Birthstone Earrings', 'Earrings', 'https://www.alibaba.com/product-detail/Birthday-Jewelry-Gifts-Water-Drop-12_1601266249962.html', '1601266249962'],
  ['B7-008', 'North & Pearl Personalized Name Bracelet', 'Bracelet', 'https://www.alibaba.com/product-detail/Customized-Name-Bracelet-for-Women-Personalized_1601313981475.html', '1601313981475'],
  ['B7-009', 'North & Pearl Rolo Chain Name Bracelet', 'Bracelet', 'https://www.alibaba.com/product-detail/18K-Gold-Plated-Rolo-Chain-Stainless_1601360413536.html', '1601360413536'],
  ['B7-010', 'North & Pearl Personalized Chain Bracelet', 'Bracelet', 'https://www.alibaba.com/product-detail/Personalized-14K-Gold-Plated-Cuban-Chain_1601560434934.html', '1601560434934'],
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

function extractImages(html) {
  const urls = [...html.matchAll(/https?:\\?\/\\?\/(?:s|sc0[1-9])\.alicdn\.com[^"' <>)]+/g)]
    .map((match) => match[0].replace(/\\\//g, '/').replace(/&amp;/g, '&'))
    .filter((url) => /\.(jpg|jpeg|png|webp)(\?|$)/i.test(url))
    .filter((url) => !url.includes('48x48'));

  return [...new Set(urls)].slice(0, 12);
}

function imageExtension(url) {
  const match = url.match(/\.(png|jpg|jpeg|webp)/i);
  return match ? match[1].toLowerCase().replace('jpeg', 'jpg') : 'jpg';
}

const outDir = 'reports/alibaba-batch7-original-images-2026-08-11';
fs.mkdirSync(outDir, { recursive: true });

const output = [];

for (const [id, np, category, url, listing] of candidates) {
  const html = (await get(url)).toString();
  const images = extractImages(html);
  const downloaded = [];
  let imageNumber = 1;

  for (const imageUrl of images.slice(0, 8)) {
    const ext = imageExtension(imageUrl);
    const file = path.join(outDir, `${id}-${imageNumber}.${ext}`);
    const buffer = await get(imageUrl);
    if (buffer.length > 1000) {
      fs.writeFileSync(file, buffer);
      downloaded.push(file);
      imageNumber += 1;
    }
  }

  output.push({
    id,
    np,
    category,
    url,
    listing,
    title: html.match(/<title[^>]*>([^<]+)/i)?.[1] || '',
    images,
    downloaded,
    imageStatus: `downloaded-${downloaded.length}`,
    htmlBytes: html.length,
  });

  console.log(`${id}: ${images.length} image URLs, ${downloaded.length} downloaded`);
}

fs.writeFileSync(
  'docs/sourcing/batch7_search_candidates_aug11.json',
  JSON.stringify({ date: '2026-08-11', count: output.length, candidates: output }, null, 2),
);
