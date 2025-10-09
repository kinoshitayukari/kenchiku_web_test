import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(new URL('.', import.meta.url).pathname, '..');
const indexPath = resolve(root, 'public', 'articles', 'index.html');
const outputPath = resolve(root, 'src', 'data', 'articles.ts');

const decodeHtml = (value) =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&#x60;/gi, '`');

const collapseWhitespace = (value) => value.replace(/\s+/g, ' ').trim();

const escapeForTs = (value) =>
  value
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$')
    .replace(/"/g, '\\"');

const html = await readFile(indexPath, 'utf8');
const listMatch = html.match(/<ul class="article-list">([\s\S]*?)<\/ul>/);
if (!listMatch) {
  throw new Error('記事一覧の<ul class="article-list">が見つかりませんでした');
}

const items = [];
const itemRegex = /<li>([\s\S]*?)<\/li>/g;
let match;
while ((match = itemRegex.exec(listMatch[1])) !== null) {
  items.push(match[1]);
}

if (!items.length) {
  throw new Error('記事一覧に<li>が見つかりませんでした');
}

const articles = items
  .map((markup, index) => {
    const hrefMatch = markup.match(/href="([^"]+)"/);
    if (!hrefMatch) return null;
    const slug = hrefMatch[1].replace(/^\/?articles\//, '').replace(/^\//, '');

    const titleMatch = markup.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/);
    const rawTitle = titleMatch ? titleMatch[1] : slug;

    const paragraphs = [...markup.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map(([, text]) => text);
    const summarySource = paragraphs.reverse().find((text) => !text.includes('<time')) ?? '';

    const timeMatch = markup.match(/<time[^>]*datetime="([^"]+)"/);
    const publishedAt = timeMatch ? timeMatch[1] : '';

    const title = collapseWhitespace(decodeHtml(rawTitle));
    const summary = collapseWhitespace(decodeHtml(summarySource));

    return { slug, title, summary, publishedAt, index };
  })
  .filter(Boolean);

const sorted = articles.sort((a, b) => {
  const timeA = Date.parse(a.publishedAt);
  const timeB = Date.parse(b.publishedAt);
  const hasA = Number.isFinite(timeA);
  const hasB = Number.isFinite(timeB);

  if (hasA && hasB) {
    if (timeA === timeB) return a.index - b.index;
    return timeB - timeA;
  }
  if (hasA) return -1;
  if (hasB) return 1;
  return a.index - b.index;
});

const header = `export type ArticleMeta = {\n  slug: string;\n  title: string;\n  summary: string;\n  publishedAt: string;\n};\n\n`;
const bodyEntries = sorted
  .map(
    ({ slug, title, summary, publishedAt }) =>
      `  {\n    slug: "${escapeForTs(slug)}",\n    title: "${escapeForTs(title)}",\n    summary: "${escapeForTs(summary)}",\n    publishedAt: "${escapeForTs(publishedAt)}",\n  },`,
  )
  .join('\n');

const content = `${header}export const articleMetas: ArticleMeta[] = [\n${bodyEntries}\n];\n`;

await writeFile(outputPath, content);
