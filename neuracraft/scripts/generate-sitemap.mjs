import { writeFileSync } from 'fs';
import globby from 'globby';
import prettier from 'prettier';
import { allPosts } from '../.contentlayer/generated/index.mjs';
import siteMetadata from '../data/siteMetadata.js';

async function generateSitemap() {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');

  const pages = await globby([
    'pages/*.(t|j)sx',
    '!pages/_*.(t|j)sx', // for _app.tsx and _document.tsx
    '!pages/[*.(t|j)sx', // for [...page].tsx and [[...page]].tsx
    '!pages/api',
    '!pages/404.(t|j)sx',
    '!pages/500.(t|j)sx',
  ]);

  const blogPages = allPosts.map((page) => page.slug);

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
      .concat(blogPages)
      .map((page) => {
        const path = page
          .replace('pages/', '/')
          .replace('public/', '/')
          .replace('.tsx', '')
          .replace('.jsx', '')
          .replace('.mdx', '')
          .replace('.md', '')
          .replace('/rss.xml', '');
        const route = path === '/index' ? '' : path;
        return `
                        <url>
                            <loc>${siteMetadata.siteUrl}${route}/</loc>
                        </url>
                    `;
      })
      .join('')}
        </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  });

  writeFileSync('public/sitemap.xml', formatted);
}

// Will call the function whenever the file is run
generateSitemap();