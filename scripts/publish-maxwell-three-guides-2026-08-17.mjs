import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, join } from 'node:path';

const store = 'q4ydix-w1.myshopify.com';
const tempDir = mkdtempSync(join(tmpdir(), 'np-maxwell-guides-'));

const markdownFiles = [
  'content/blogs/gift-guides/engraved-necklace-gift-guide.md',
  'content/blogs/gift-guides/initial-bracelet-gift-guide.md',
  'content/blogs/gift-guides/birth-flower-necklace-guide.md',
];
const onlyHandles = (process.env.ONLY_HANDLES || '')
  .split(',')
  .map((handle) => handle.trim())
  .filter(Boolean);

const articleEnhancements = {
  'engraved-necklace-gift-guide': {
    heroImage: {
      url: 'https://cdn.shopify.com/s/files/1/0969/9331/2952/files/H980f3daf9cc740c2ab4e31d74b65785b3.jpg?v=1784856006',
      altText: 'North & Pearl nameplate necklace shown as a meaningful ready-to-order gift idea',
    },
    visualIntro: {
      kicker: 'Ready-to-order necklace edit',
      heading: 'Start with one detail that carries the story.',
      text:
        'Names, initials, hearts, and message-led shapes work best when the necklace feels intentional at first glance. These shopping paths keep the choice focused without requiring a custom order.',
      image:
        'https://cdn.shopify.com/s/files/1/0969/9331/2952/files/H88b485e0f127458a911563100a11ef5dS.jpg?v=1785198222',
      alt: 'North & Pearl charm nameplate necklace for meaningful gifting',
    },
    products: [
      {
        title: 'Nameplate Charm Necklace',
        reason: 'A clear name-led path when the word-inspired shape should be the design.',
        url: '/products/north-pearl-name-necklace-8213',
        image:
          'https://cdn.shopify.com/s/files/1/0969/9331/2952/files/H980f3daf9cc740c2ab4e31d74b65785b3.jpg?v=1784856006',
        price: '$79.00',
      },
      {
        title: 'Charm Nameplate Necklace',
        reason: 'A giftable option for a name or word with a softer keepsake feel.',
        url: '/products/north-pearl-charm-nameplate-necklace',
        image:
          'https://cdn.shopify.com/s/files/1/0969/9331/2952/files/H88b485e0f127458a911563100a11ef5dS.jpg?v=1785198222',
        price: '$69.00',
      },
      {
        title: 'Initial Shell Pendant Necklace',
        reason: 'A letter-forward choice when one initial says enough.',
        url: '/products/north-pearl-initial-shell-necklace',
        image:
          'https://cdn.shopify.com/s/files/1/0969/9331/2952/files/H9ffd038b1cdb4132b0c618e4fa1bb3a8i.jpg_960x960q80.jpg?v=1786645692',
        price: '$59.00',
      },
    ],
    cta: { label: 'Shop Ready-to-Order Gifts', url: '/collections/gifts' },
  },
  'initial-bracelet-gift-guide': {
    heroImage: {
      url: 'https://cdn.shopify.com/s/files/1/0969/9331/2952/files/Hed9397d625da48dcbd2ded7b702b11aci.webp?v=1786499400',
      altText: 'North & Pearl initial and keepsake bracelet gift ideas',
    },
    visualIntro: {
      kicker: 'Bracelet gift edit',
      heading: 'Choose the letter first, then choose how she wears it.',
      text:
        'A bracelet can feel personal without becoming too visible or formal. The strongest ready-to-order options feel easy to wear, easy to gift, and clear enough that the meaning does not need a long explanation.',
      image:
        'https://cdn.shopify.com/s/files/1/0969/9331/2952/files/H0eb0d0933f3744d3b8b41d302f732affP.webp?v=1786499336',
      alt: 'North & Pearl birthstone bead bracelet for meaningful bracelet gifting',
    },
    products: [
      {
        title: 'Birth Flower Accent Bracelet',
        reason: 'A ready-to-order bracelet path for floral-inspired gifting.',
        url: '/products/north-pearl-birth-flower-accent-bracelet',
        image:
          'https://cdn.shopify.com/s/files/1/0969/9331/2952/files/H72ce4c380813427e84120eeaa89b78cbv.jpg?v=1786722547',
        price: '$69.00',
      },
      {
        title: 'Family Heart Charm Bracelet',
        reason: 'A keepsake-style bracelet direction for family-centered gifts.',
        url: '/products/north-pearl-family-heart-charm-bracelet',
        image:
          'https://cdn.shopify.com/s/files/1/0969/9331/2952/files/Hed9397d625da48dcbd2ded7b702b11aci.webp?v=1786499400',
        price: '$69.00',
      },
      {
        title: 'Dainty Birthstone Bead Bracelet',
        reason: 'A color-accent option when the gift should feel birth-month inspired.',
        url: '/products/north-pearl-dainty-birthstone-bead-bracelet',
        image:
          'https://cdn.shopify.com/s/files/1/0969/9331/2952/files/H0eb0d0933f3744d3b8b41d302f732affP.webp?v=1786499336',
        price: '$39.00',
      },
    ],
    cta: { label: 'Shop Bracelets', url: '/collections/bracelets' },
  },
  'birth-flower-necklace-guide': {
    heroImage: {
      url: 'https://cdn.shopify.com/s/files/1/0969/9331/2952/files/Hc5eb24e11ab9499e9d3a67987f2c0993N.webp?v=1786499149',
      altText: 'North & Pearl birth flower and birthstone necklace gift idea',
    },
    visualIntro: {
      kicker: 'Birth month jewelry',
      heading: 'A softer way to make the month feel meaningful.',
      text:
        'Birth flower jewelry works best when the floral detail feels beautiful before it needs explaining. Use the month as the reason, then choose a ready-to-order piece by the recipient’s everyday style.',
      image:
        'https://cdn.shopify.com/s/files/1/0969/9331/2952/files/Hfc6c08c98c6449b4be6dc5692af1eef6Y.webp?v=1786499149',
      alt: 'North & Pearl birth flower necklace detail for birthday jewelry gifting',
    },
    products: [
      {
        title: 'Birth Flower & Birthstone Necklace',
        reason: 'The closest shopping path for a floral and birth-month inspired necklace.',
        url: '/products/north-pearl-birth-flower-birthstone-necklace',
        image:
          'https://cdn.shopify.com/s/files/1/0969/9331/2952/files/Hc5eb24e11ab9499e9d3a67987f2c0993N.webp?v=1786499149',
        price: '$59.00',
      },
      {
        title: 'Baguette Birthstone Necklace',
        reason: 'A clean color-led birth-month necklace for shoppers who want a stone-inspired focal point.',
        url: '/products/north-pearl-baguette-birthstone-necklace',
        image:
          'https://cdn.shopify.com/s/files/1/0969/9331/2952/files/H0cb6ba1be16f47bdb1acad10a78442914.webp?v=1786484656',
        price: '$69.00',
      },
      {
        title: 'Heart Birthstone Pendant Necklace',
        reason: 'A softer heart-shaped option for birthday, mom, or keepsake gifting.',
        url: '/products/north-pearl-heart-birthstone-pendant-necklace',
        image:
          'https://cdn.shopify.com/s/files/1/0969/9331/2952/files/H819cdeb4f8df475197741874653d3c05k.webp?v=1786484761',
        price: '$49.00',
      },
      {
        title: 'Birth Flower Accent Bracelet',
        reason: 'A floral-inspired ready-to-order alternative when she prefers bracelets.',
        url: '/products/north-pearl-birth-flower-accent-bracelet',
        image:
          'https://cdn.shopify.com/s/files/1/0969/9331/2952/files/H72ce4c380813427e84120eeaa89b78cbv.jpg?v=1786722547',
        price: '$69.00',
      },
    ],
    cta: { label: 'Shop Birthday Jewelry Gifts', url: '/collections/birthday-jewelry-gifts' },
  },
};

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

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function inlineMarkdown(value) {
  let text = escapeHtml(value);
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, href) => {
    return `<a href="${escapeHtml(href)}">${label}</a>`;
  });
  return text;
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&amp;/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function parseFrontmatter(markdown, filePath) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`Missing frontmatter in ${filePath}`);
  const data = {};
  for (const line of match[1].split('\n')) {
    const item = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!item) continue;
    let value = item[2].trim();
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    data[item[1]] = value;
  }
  return { data, body: match[2] };
}

function tableToHtml(lines) {
  const rows = lines
    .filter((line) => !/^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line))
    .map((line) =>
      line
        .trim()
        .replace(/^\|/, '')
        .replace(/\|$/, '')
        .split('|')
        .map((cell) => inlineMarkdown(cell.trim())),
    );

  if (!rows.length) return '';
  const [head, ...body] = rows;
  return [
    '<div class="np-editorial-table-wrap"><table>',
    `<thead><tr>${head.map((cell) => `<th>${cell}</th>`).join('')}</tr></thead>`,
    `<tbody>${body
      .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`)
      .join('')}</tbody>`,
    '</table></div>',
  ].join('');
}

function markdownToHtml(markdown) {
  const lines = markdown.split('\n');
  const html = [];
  let paragraph = [];
  let list = [];
  let table = [];
  let skippedFirstH1 = false;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push(`<p>${inlineMarkdown(paragraph.join(' '))}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (!list.length) return;
    html.push(`<ul>${list.map((item) => `<li>${inlineMarkdown(item)}</li>`).join('')}</ul>`);
    list = [];
  };

  const flushTable = () => {
    if (!table.length) return;
    html.push(tableToHtml(table));
    table = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (!line.trim()) {
      flushParagraph();
      flushList();
      flushTable();
      continue;
    }

    if (line.startsWith('|')) {
      flushParagraph();
      flushList();
      table.push(line);
      continue;
    }

    flushTable();

    if (line.startsWith('# ')) {
      flushParagraph();
      flushList();
      if (!skippedFirstH1) {
        skippedFirstH1 = true;
        continue;
      }
      const title = line.replace(/^#\s+/, '');
      html.push(`<h2 id="${slugify(title)}">${inlineMarkdown(title)}</h2>`);
      continue;
    }

    if (line.startsWith('## ')) {
      flushParagraph();
      flushList();
      const title = line.replace(/^##\s+/, '');
      html.push(`<h2 id="${slugify(title)}">${inlineMarkdown(title)}</h2>`);
      continue;
    }

    if (line.startsWith('### ')) {
      flushParagraph();
      flushList();
      const title = line.replace(/^###\s+/, '');
      html.push(`<h3 id="${slugify(title)}">${inlineMarkdown(title)}</h3>`);
      continue;
    }

    if (line.startsWith('- ')) {
      flushParagraph();
      list.push(line.replace(/^-\s+/, ''));
      continue;
    }

    paragraph.push(line.trim());
  }

  flushParagraph();
  flushList();
  flushTable();

  return html.join('\n');
}

function productCards(products) {
  return `<section class="np-shop-story np-shop-story--products" aria-labelledby="np-shop-story-title">
  <p class="np-shop-story__eyebrow">Shop the Story</p>
  <h2 id="np-shop-story-title">Pieces to compare while you choose</h2>
  <div class="np-shop-story__grid">
    ${products
      .map(
        (product) => `<a class="np-shop-story__item" href="${escapeHtml(product.url)}">
      <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.title)}" loading="lazy" width="720" height="720">
      <strong>${escapeHtml(product.title)}</strong>
      <span>${escapeHtml(product.reason)}</span>
      <small>${escapeHtml(product.price)}</small>
      <em class="np-shop-story__cta">View piece</em>
    </a>`,
      )
      .join('')}
  </div>
</section>`;
}

function birthFlowerEditorialModules() {
  return `<section class="np-guide-snapshot" aria-label="Birth flower necklace shopping snapshot">
  <div>
    <span>01</span>
    <strong>Choose the month</strong>
    <p>Start with the birth month or the month connected to the memory.</p>
  </div>
  <div>
    <span>02</span>
    <strong>Pick the mood</strong>
    <p>Floral for soft symbolism, birthstone-inspired for color, heart for keepsake gifting.</p>
  </div>
  <div>
    <span>03</span>
    <strong>Check the product page</strong>
    <p>Use the current product page for exact variants, materials, images, and return details.</p>
  </div>
</section>
<section class="np-jewelry-collage" aria-label="Birth month jewelry inspiration">
  <figure>
    <img src="https://cdn.shopify.com/s/files/1/0969/9331/2952/files/Hc5eb24e11ab9499e9d3a67987f2c0993N.webp?v=1786499149" alt="Birth flower and birthstone necklace in gold tone" loading="lazy" width="900" height="900">
  </figure>
  <div>
    <p class="np-editorial-visual__kicker">Gift note</p>
    <h2>Make the month feel wearable.</h2>
    <p>Birth flower jewelry should not feel like a chart turned into a pendant. The best pieces look like jewelry first, then carry the month as a quieter layer of meaning.</p>
    <a href="/collections/birthday-jewelry-gifts">Shop birthday jewelry gifts</a>
  </div>
  <figure>
    <img src="https://cdn.shopify.com/s/files/1/0969/9331/2952/files/H819cdeb4f8df475197741874653d3c05k.webp?v=1786484761" alt="Heart birthstone pendant necklace gift idea" loading="lazy" width="900" height="900">
  </figure>
</section>
<section class="np-month-edit" aria-labelledby="np-month-edit-title">
  <p class="np-shop-story__eyebrow">Month-by-month guide</p>
  <h2 id="np-month-edit-title">Birth flowers at a glance</h2>
  <div class="np-month-edit__grid">
    <span><strong>Jan</strong>Carnation</span>
    <span><strong>Feb</strong>Violet</span>
    <span><strong>Mar</strong>Daffodil</span>
    <span><strong>Apr</strong>Daisy</span>
    <span><strong>May</strong>Lily of the Valley</span>
    <span><strong>Jun</strong>Rose</span>
    <span><strong>Jul</strong>Larkspur</span>
    <span><strong>Aug</strong>Gladiolus</span>
    <span><strong>Sep</strong>Aster</span>
    <span><strong>Oct</strong>Marigold</span>
    <span><strong>Nov</strong>Chrysanthemum</span>
    <span><strong>Dec</strong>Narcissus</span>
  </div>
  <p>Flower meanings are symbolic traditions, not scientific facts. Use them as a gift story, then choose the piece by style and wearability.</p>
</section>`;
}

function visualIntro(enhancement) {
  return `<section class="np-editorial-visual">
  <div class="np-editorial-visual__copy">
    <p class="np-editorial-visual__kicker">${escapeHtml(enhancement.visualIntro.kicker)}</p>
    <h2>${escapeHtml(enhancement.visualIntro.heading)}</h2>
    <p>${escapeHtml(enhancement.visualIntro.text)}</p>
  </div>
  <figure>
    <img src="${escapeHtml(enhancement.visualIntro.image)}" alt="${escapeHtml(enhancement.visualIntro.alt)}" loading="eager" width="900" height="900">
  </figure>
</section>`;
}

function articleCta(cta) {
  return `<section class="np-article-cta">
  <p>Ready to shop the pieces behind this guide?</p>
  <a href="${escapeHtml(cta.url)}">${escapeHtml(cta.label)}</a>
</section>`;
}

function setArticleSeoMetafields(ownerId, seo) {
  if (!ownerId || !seo?.title || !seo?.description) return;
  const result = gql(
    `mutation SetArticleSeo($metafields: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $metafields) {
        metafields { id namespace key value }
        userErrors { field message }
      }
    }`,
    {
      metafields: [
        {
          ownerId,
          namespace: 'global',
          key: 'title_tag',
          type: 'single_line_text_field',
          value: seo.title,
        },
        {
          ownerId,
          namespace: 'global',
          key: 'description_tag',
          type: 'single_line_text_field',
          value: seo.description,
        },
      ],
    },
    true,
  ).metafieldsSet;
  if (result.userErrors.length) throw new Error(`metafieldsSet SEO: ${JSON.stringify(result.userErrors)}`);
}

function enhanceArticleHtml(handle, html) {
  const enhancement = articleEnhancements[handle];
  if (!enhancement) return html;
  let enhanced = `${visualIntro(enhancement)}\n${html}`;
  if (handle === 'birth-flower-necklace-guide') {
    enhanced = enhanced.replace('<h2 id="key-takeaways">Key Takeaways</h2>', `${birthFlowerEditorialModules()}\n<h2 id="key-takeaways">Key Takeaways</h2>`);
    enhanced = enhanced.replace(/<h2 id="shop-the-story">Shop the Story<\/h2>[\s\S]*?(?=<h2 id="related-guides">Related Guides<\/h2>)/, productCards(enhancement.products));
  } else {
    enhanced = enhanced.replace('<h2 id="shop-the-story">Shop the Story</h2>', productCards(enhancement.products));
  }
  enhanced = enhanced.replace('<h2 id="final-buying-note">Final Buying Note</h2>', `${articleCta(enhancement.cta)}\n<h2 id="final-buying-note">Final Buying Note</h2>`);
  return enhanced;
}

function firstParagraph(markdown) {
  const withoutHeading = markdown.replace(/^# .*\n+/, '').trim();
  const paragraph = withoutHeading
    .split(/\n\s*\n/)
    .find((block) => block.trim() && !block.trim().startsWith('**') && !block.trim().startsWith('##'));
  return paragraph ? inlineMarkdown(paragraph.replace(/\n/g, ' ').trim()) : '';
}

const articles = markdownFiles
  .map((filePath) => {
    const markdown = readFileSync(filePath, 'utf8');
    const { data, body } = parseFrontmatter(markdown, filePath);
    if (!data.title || !data.handle) throw new Error(`Missing title or handle in ${filePath}`);
    return {
      filePath,
      title: data.title,
      handle: data.handle,
      body: enhanceArticleHtml(data.handle, markdownToHtml(body)),
      image: articleEnhancements[data.handle]?.heroImage,
      summary: data.meta_description || firstParagraph(body),
      seo: {
        title: data.seo_title || data.title,
        description: data.meta_description || firstParagraph(body).replace(/<[^>]+>/g, ''),
      },
      tags: [
        'gift guide',
        'Maxwell',
        'North & Pearl Journal',
        data.primary_keyword,
        ...(data.secondary_keywords || '').split(',').map((item) => item.trim()).filter(Boolean),
      ].filter(Boolean),
    };
  })
  .filter((article) => !onlyHandles.length || onlyHandles.includes(article.handle));

if (!articles.length) {
  throw new Error(`No articles matched ONLY_HANDLES=${process.env.ONLY_HANDLES || ''}`);
}

let blog = gql(
  `query GiftGuideBlog {
    blogs(first: 50) {
      nodes {
        id
        handle
        title
        articles(first: 250) { nodes { id handle title } }
      }
    }
  }`,
).blogs.nodes.find((item) => item.handle === 'gift-guide');

if (!blog) {
  const result = gql(
    `mutation CreateBlog($blog: BlogCreateInput!) {
      blogCreate(blog: $blog) {
        blog { id handle title articles(first: 250) { nodes { id handle title } } }
        userErrors { field message }
      }
    }`,
    { blog: { title: 'Gift Guide', handle: 'gift-guide' } },
    true,
  ).blogCreate;
  if (result.userErrors.length) throw new Error(`blogCreate: ${JSON.stringify(result.userErrors)}`);
  blog = result.blog;
}

const existingByHandle = new Map((blog.articles?.nodes || []).map((article) => [article.handle, article]));
const changed = [];

for (const article of articles) {
  const articleInput = {
    title: article.title,
    handle: article.handle,
    body: article.body,
    summary: `<p>${article.summary}</p>`,
    tags: article.tags,
    isPublished: true,
    author: { name: 'North & Pearl Editorial' },
  };
  if (article.image) articleInput.image = article.image;
  const existing = existingByHandle.get(article.handle);

  if (existing) {
    const result = gql(
      `mutation UpdateArticle($id: ID!, $article: ArticleUpdateInput!) {
        articleUpdate(id: $id, article: $article) {
          article { id handle title }
          userErrors { field message }
        }
      }`,
      { id: existing.id, article: articleInput },
      true,
    ).articleUpdate;
    if (result.userErrors.length) {
      throw new Error(`articleUpdate ${article.handle}: ${JSON.stringify(result.userErrors)}`);
    }
    setArticleSeoMetafields(result.article.id, article.seo);
    changed.push({ action: 'updated', file: basename(article.filePath), ...result.article });
  } else {
    const result = gql(
      `mutation CreateArticle($article: ArticleCreateInput!) {
        articleCreate(article: $article) {
          article { id handle title }
          userErrors { field message }
        }
      }`,
      { article: { ...articleInput, blogId: blog.id } },
      true,
    ).articleCreate;
    if (result.userErrors.length) {
      throw new Error(`articleCreate ${article.handle}: ${JSON.stringify(result.userErrors)}`);
    }
    setArticleSeoMetafields(result.article.id, article.seo);
    changed.push({ action: 'created', file: basename(article.filePath), ...result.article });
  }
}

console.log(JSON.stringify({ blog: { id: blog.id, handle: blog.handle, title: blog.title }, changed }, null, 2));
