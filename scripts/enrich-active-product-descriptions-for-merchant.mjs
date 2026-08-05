import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-merchant-description-enrich-'));
const runDate = new Date().toISOString().slice(0, 10);
const reportPath = `reports/merchant-product-description-enrichment-${runDate}.md`;
const csvPath = `reports/merchant-product-description-enrichment-${runDate}.csv`;

function gql(query, variables = {}, allowMutations = false) {
  const queryFile = join(tempDir, `query-${Date.now()}-${Math.random()}.graphql`);
  const varsFile = join(tempDir, `vars-${Date.now()}-${Math.random()}.json`);
  const outputFile = join(tempDir, `out-${Date.now()}-${Math.random()}.json`);
  writeFileSync(queryFile, query);
  writeFileSync(varsFile, JSON.stringify(variables, null, 2));
  const args = [
    '@shopify/cli@latest',
    'store',
    'execute',
    '--store',
    store,
    '--query-file',
    queryFile,
    '--variable-file',
    varsFile,
    '--output-file',
    outputFile,
    '--json',
  ];
  if (allowMutations) args.push('--allow-mutations');
  execFileSync('npx', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  return JSON.parse(readFileSync(outputFile, 'utf8'));
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function plain(value = '') {
  return String(value).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function csv(value = '') {
  return `"${String(value ?? '').replaceAll('"', '""')}"`;
}

function cleanTitle(title = '') {
  return title.replace(/^North\s*&\s*Pearl\s+/i, '').trim();
}

function nounFor(product) {
  const type = String(product.productType || '').toLowerCase();
  const title = product.title.toLowerCase();
  if (type.includes('earring') || title.includes('earring') || title.includes('stud') || title.includes('hoop')) return 'earrings';
  if (type.includes('ring') || title.includes('ring')) return 'ring';
  if (type.includes('bracelet') || title.includes('bracelet') || title.includes('bangle')) return 'bracelet';
  if (type.includes('gift set') || title.includes('set')) return 'jewelry set';
  if (type.includes('gift box') || title.includes('gift box')) return 'jewelry gift box';
  return 'necklace';
}

function styleAngle(product) {
  const title = cleanTitle(product.title).toLowerCase();
  const tags = (product.tags || [])
    .filter((tag) => !/^north[-\s_]*pearl$/i.test(tag))
    .join(' ')
    .toLowerCase();
  const haystack = `${title} ${tags}`;

  if (haystack.includes('initial') || haystack.includes('letter')) {
    return {
      angle: 'personal initial detail',
      benefit: 'a small letter-led detail that feels personal without overpowering an outfit',
      occasion: 'birthdays, bridesmaid gifts, graduation moments, everyday self-gifting, and thoughtful just-because gifts',
    };
  }
  if (haystack.includes('heart') || haystack.includes('love')) {
    return {
      angle: 'heart-led keepsake styling',
      benefit: 'a sentimental shape that works well for romantic gifts, family moments, and meaningful everyday wear',
      occasion: 'anniversaries, Valentine-style moments, birthdays, Mother\'s Day, and partner gifts',
    };
  }
  if (haystack.includes('birthstone') || haystack.includes('birth') || haystack.includes('crystal')) {
    return {
      angle: 'birth-month inspired color and sparkle',
      benefit: 'a color-led detail that helps the piece feel selected for the recipient',
      occasion: 'birthday gifts, gifts for Mom, milestone gifts, and meaningful self-gifting',
    };
  }
  if (haystack.includes('bride') || haystack.includes('bridal') || haystack.includes('wedding') || haystack.includes('bridesmaid')) {
    return {
      angle: 'wedding and bridesmaid gifting',
      benefit: 'a polished giftable style that can support bridal-party, ceremony, and celebration looks',
      occasion: 'bridesmaid proposals, wedding weekends, rehearsal dinners, and thank-you gifts',
    };
  }
  if (haystack.includes('mama') || haystack.includes('mother') || haystack.includes('mom')) {
    return {
      angle: 'motherhood and family gifting',
      benefit: 'a meaningful style for celebrating family, children, and everyday reminders of home',
      occasion: 'Mother\'s Day, birthdays, new-mom gifts, and family milestones',
    };
  }
  if (haystack.includes('pearl') || haystack.includes('shell')) {
    return {
      angle: 'soft pearl-style detail',
      benefit: 'a light, feminine look that feels polished for both everyday and special moments',
      occasion: 'birthday gifts, vacation looks, bridesmaid styling, and thoughtful self-gifting',
    };
  }
  if (haystack.includes('flower') || haystack.includes('floral')) {
    return {
      angle: 'floral-inspired detail',
      benefit: 'a gentle nature-inspired accent that feels feminine, soft, and giftable',
      occasion: 'spring birthdays, Mother\'s Day, bridesmaid gifts, and everyday appreciation',
    };
  }
  if (haystack.includes('minimal') || haystack.includes('dainty')) {
    return {
      angle: 'minimal everyday styling',
      benefit: 'a refined shape that is easy to wear alone or layer with other jewelry',
      occasion: 'everyday gifts, workday styling, birthdays, and simple thank-you moments',
    };
  }
  return {
    angle: 'polished gift-ready styling',
    benefit: 'a refined jewelry-box look that is easy to give and easy to wear',
    occasion: 'birthdays, anniversaries, bridesmaid gifts, family gifts, friendship moments, and thoughtful self-gifting',
  };
}

function optionSummary(product) {
  const optionLines = (product.options || [])
    .filter((option) => option.name && option.values?.length)
    .map((option) => `${escapeHtml(option.name)}: ${option.values.slice(0, 10).map(escapeHtml).join(', ')}`);

  if (!optionLines.length) {
    return '<li>Review the selected variant and available product images before checkout.</li>';
  }

  return optionLines.map((line) => `<li>${line}</li>`).join('');
}

function priceSummary(product) {
  const prices = product.variants.nodes
    .filter((variant) => variant.availableForSale && variant.price)
    .map((variant) => Number(variant.price))
    .filter((price) => Number.isFinite(price));
  if (!prices.length) return 'Price is shown above based on the selected option.';
  const min = Math.min(...prices).toFixed(2);
  const max = Math.max(...prices).toFixed(2);
  return min === max ? `Current price: $${min}.` : `Current price range: $${min}-$${max}, depending on the selected option.`;
}

function personalizationLine(product) {
  const title = product.title.toLowerCase();
  const tags = (product.tags || []).join(' ').toLowerCase();
  const options = (product.options || []).map((option) => `${option.name} ${(option.values || []).join(' ')}`).join(' ').toLowerCase();
  const haystack = `${title} ${tags} ${options}`;
  if (!/(personal|custom|initial|letter|name|engraved|birthstone|birth flower|coordinate|mama)/i.test(haystack)) {
    return '<li>No personalization claim is made unless the product options on this page support it.</li>';
  }
  return '<li>If personalization options are shown, enter names, initials, dates, or gift details exactly as you want them prepared.</li>';
}

function descriptionHtml(product) {
  const displayTitle = escapeHtml(cleanTitle(product.title));
  const noun = nounFor(product);
  const style = styleAngle(product);
  const imageCount = product.media.nodes.filter((media) => media.mediaContentType === 'IMAGE').length;

  return [
    `<p>${displayTitle} is a ${escapeHtml(style.angle)} ${escapeHtml(noun)} selected for North &amp; Pearl shoppers who want jewelry that feels thoughtful, wearable, and easy to gift. It is designed for customers looking for ${escapeHtml(style.benefit)}.</p>`,
    '<h3>Why shoppers choose it</h3>',
    '<ul>',
    `<li>Giftable ${escapeHtml(noun)} style for ${escapeHtml(style.occasion)}.</li>`,
    '<li>Works as a standalone piece and can be paired with other North &amp; Pearl jewelry for a more complete gift.</li>',
    '<li>Product images show the visible style, shape, and finish so customers can compare the look before ordering.</li>',
    `<li>${imageCount >= 3 ? `${imageCount} product images are available to review before checkout.` : 'Review all available product images before checkout.'}</li>`,
    '</ul>',
    '<h3>Product details to review</h3>',
    '<ul>',
    optionSummary(product),
    `<li>${escapeHtml(priceSummary(product))}</li>`,
    personalizationLine(product),
    '<li>Materials, stones, plating, finish, dimensions, and packaging details are only stated when confirmed for the specific product.</li>',
    '</ul>',
    '<h3>Gift and styling ideas</h3>',
    `<p>This ${escapeHtml(noun)} is a practical choice when you want a polished gift that still feels personal. It can be considered for birthdays, anniversaries, bridal-party moments, Mother&apos;s Day, friendship gifts, or an everyday jewelry refresh depending on the recipient and the selected style.</p>`,
    '<h3>Care guidance</h3>',
    '<p>Store jewelry separately, keep it dry when possible, and avoid direct contact with lotions, perfumes, and harsh cleaners. Use the product images, selected options, and checkout details as the source of truth before ordering.</p>',
    '<h3>Before you order</h3>',
    '<p>Review the product title, images, selected variant, personalization fields when present, quantity, shipping details, and return information before checkout. For time-sensitive gifts, contact support before ordering if you need help choosing the best piece.</p>',
  ].join('');
}

function seoDescription(product) {
  const title = cleanTitle(product.title);
  const noun = nounFor(product);
  const style = styleAngle(product);
  return `${title} from North & Pearl, a giftable ${noun} for ${style.occasion}. Review images, options, care notes, and checkout details before ordering.`.slice(0, 315);
}

const products = [];
let cursor = null;
let hasNextPage = true;

while (hasNextPage) {
  const data = gql(`query ActiveProductsForMerchantDescriptions($after: String) {
    products(first: 100, after: $after, query: "vendor:'North & Pearl' status:active") {
      pageInfo { hasNextPage endCursor }
      nodes {
        id
        title
        handle
        productType
        tags
        descriptionHtml
        seo { title description }
        options { name values }
        variants(first: 50) { nodes { title price availableForSale } }
        media(first: 20) { nodes { mediaContentType } }
      }
    }
  }`, { after: cursor });
  products.push(...data.products.nodes);
  hasNextPage = data.products.pageInfo.hasNextPage;
  cursor = data.products.pageInfo.endCursor;
}

const updated = [];
const unchanged = [];
const pendingUpdates = [];

for (const product of products) {
  const nextDescriptionHtml = descriptionHtml(product);
  const nextSeoDescription = seoDescription(product);
  const currentDescription = product.descriptionHtml || '';
  const currentSeoDescription = product.seo?.description || '';
  const shouldUpdate =
    plain(currentDescription).length < 850 ||
    currentDescription !== nextDescriptionHtml ||
    currentSeoDescription !== nextSeoDescription;

  if (!shouldUpdate) {
    unchanged.push(product);
    continue;
  }

  pendingUpdates.push({
    title: product.title,
    handle: product.handle,
    productType: product.productType,
    previousLength: plain(currentDescription).length,
    nextLength: plain(nextDescriptionHtml).length,
    seoLength: nextSeoDescription.length,
    product: {
      id: product.id,
      descriptionHtml: nextDescriptionHtml,
      seo: {
        title: product.seo?.title || `${product.title} | North & Pearl`,
        description: nextSeoDescription,
      },
    },
  });
}

for (let index = 0; index < pendingUpdates.length; index += 12) {
  const chunk = pendingUpdates.slice(index, index + 12);
  const variableDefinitions = chunk.map((_, itemIndex) => `$product${itemIndex}: ProductUpdateInput!`).join(', ');
  const mutationFields = chunk.map((_, itemIndex) => `
    update${itemIndex}: productUpdate(product: $product${itemIndex}) {
      product { id title handle }
      userErrors { field message }
    }
  `).join('\n');
  const variables = Object.fromEntries(chunk.map((item, itemIndex) => [`product${itemIndex}`, item.product]));
  const result = gql(
    `mutation EnrichProductMerchantDescriptionBatch(${variableDefinitions}) {
      ${mutationFields}
    }`,
    variables,
    true,
  );

  chunk.forEach((item, itemIndex) => {
    const update = result[`update${itemIndex}`];
    if (!update || update.userErrors.length) {
      throw new Error(`Could not update ${item.handle}: ${JSON.stringify(update?.userErrors || update)}`);
    }
    updated.push({
      title: item.title,
      handle: item.handle,
      productType: item.productType,
      previousLength: item.previousLength,
      nextLength: item.nextLength,
      seoLength: item.seoLength,
    });
  });
}

mkdirSync(dirname(reportPath), { recursive: true });
writeFileSync(
  csvPath,
  [
    ['Title', 'Handle', 'Product Type', 'Previous Description Length', 'New Description Length', 'SEO Description Length'].map(csv).join(','),
    ...updated.map((row) => [
      row.title,
      row.handle,
      row.productType,
      row.previousLength,
      row.nextLength,
      row.seoLength,
    ].map(csv).join(',')),
  ].join('\n'),
);

writeFileSync(
  reportPath,
  [
    '# Merchant Product Description Enrichment',
    '',
    `Date: ${runDate}`,
    '',
    '## Summary',
    '',
    `- Active products reviewed: ${products.length}`,
    `- Active products updated: ${updated.length}`,
    `- Active products unchanged: ${unchanged.length}`,
    '',
    '## What Changed',
    '',
    'Product records were enriched for Google Merchant Center quality using customer-facing details shoppers look for: style, gift use cases, option review guidance, visible-image guidance, price context, care guidance, and before-order checks.',
    '',
    'No unsupported claims were added. The enrichment intentionally avoids unverified material, plating, stone, waterproof, tarnish-free, hypoallergenic, nickel-free, handmade, ethical, production-time, warranty, review, or supplier claims.',
    '',
    '## Updated Products',
    '',
    '| Product | Handle | Previous Length | New Length |',
    '|---|---|---:|---:|',
    ...updated.map((row) => `| ${row.title.replaceAll('|', '-')} | \`${row.handle}\` | ${row.previousLength} | ${row.nextLength} |`),
    '',
    '## Validation Required',
    '',
    '- Re-run product SEO audit.',
    '- Re-run Merchant Center readiness audit.',
    '- Validate sampled PDP live descriptions.',
    '- Allow Google Merchant Center time to reprocess the feed after Shopify sends updated product data.',
    '',
  ].join('\n'),
);

console.table({ activeProductsReviewed: products.length, activeProductsUpdated: updated.length, unchanged: unchanged.length });
console.log(`Report: ${reportPath}`);
console.log(`CSV: ${csvPath}`);
