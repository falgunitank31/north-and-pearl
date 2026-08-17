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

const articleEnhancements = {
  'engraved-necklace-gift-guide': {
    heroImage: {
      url: 'https://cdn.shopify.com/s/files/1/0969/9331/2952/files/H980f3daf9cc740c2ab4e31d74b65785b3.jpg?v=1784856006',
      altText: 'North & Pearl nameplate necklace shown as an engraved necklace gift idea',
    },
    visualIntro: {
      kicker: 'Personalized necklace edit',
      heading: 'Start with one detail that carries the story.',
      text:
        'Names, dates, initials, and coordinates work best when the necklace shape leaves room for the detail to feel intentional. These shopping paths keep the choice focused instead of overwhelming.',
      image:
        'https://cdn.shopify.com/s/files/1/0969/9331/2952/files/H88b485e0f127458a911563100a11ef5dS.jpg?v=1785198222',
      alt: 'North & Pearl charm nameplate necklace for personalized gifting',
    },
    products: [
      {
        title: 'Nameplate Charm Necklace',
        reason: 'A clear name-led path when the personalized word should be the design.',
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
    cta: { label: 'Shop Personalized Jewelry', url: '/collections/personalized-jewelry' },
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
        'A bracelet can be personal without becoming too visible or formal. The strongest options feel easy to wear, easy to gift, and clear enough that the meaning does not need a long explanation.',
      image:
        'https://cdn.shopify.com/s/files/1/0969/9331/2952/files/H0eb0d0933f3744d3b8b41d302f732affP.webp?v=1786499336',
      alt: 'North & Pearl birthstone bead bracelet for meaningful bracelet gifting',
    },
    products: [
      {
        title: 'Personalized Name Birth Flower Bracelet',
        reason: 'A personal bracelet path for name or floral-inspired gifting.',
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
      heading: 'A softer way to make the month feel personal.',
      text:
        'Birth flower jewelry is strongest when the floral detail feels wearable first and symbolic second. Use the month as the reason, then choose the piece by the recipient’s everyday style.',
      image:
        'https://cdn.shopify.com/s/files/1/0969/9331/2952/files/Hc5eb24e11ab9499e9d3a67987f2c0993N.webp?v=1786499149',
      alt: 'North & Pearl birth flower necklace for birthday jewelry gifting',
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
        title: 'Personalized Name Birth Flower Bracelet',
        reason: 'A floral-inspired alternative when she prefers bracelets.',
        url: '/products/north-pearl-birth-flower-accent-bracelet',
        image:
          'https://cdn.shopify.com/s/files/1/0969/9331/2952/files/H72ce4c380813427e84120eeaa89b78cbv.jpg?v=1786722547',
        price: '$69.00',
      },
      {
        title: 'Dainty Birthstone Bead Bracelet',
        reason: 'A color-led birth-month gift path with a softer everyday feel.',
        url: '/products/north-pearl-dainty-birthstone-bead-bracelet',
        image:
          'https://cdn.shopify.com/s/files/1/0969/9331/2952/files/H0eb0d0933f3744d3b8b41d302f732affP.webp?v=1786499336',
        price: '$39.00',
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

function enhanceArticleHtml(handle, html) {
  const enhancement = articleEnhancements[handle];
  if (!enhancement) return html;
  let enhanced = `${visualIntro(enhancement)}\n${html}`;
  enhanced = enhanced.replace('<h2 id="shop-the-story">Shop the Story</h2>', productCards(enhancement.products));
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

const articles = markdownFiles.map((filePath) => {
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
    tags: [
      'gift guide',
      'Maxwell',
      'North & Pearl Journal',
      data.primary_keyword,
      ...(data.secondary_keywords || '').split(',').map((item) => item.trim()).filter(Boolean),
    ].filter(Boolean),
  };
});

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
    changed.push({ action: 'created', file: basename(article.filePath), ...result.article });
  }
}

console.log(JSON.stringify({ blog: { id: blog.id, handle: blog.handle, title: blog.title }, changed }, null, 2));
