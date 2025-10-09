const SIDEBAR_SELECTOR = '[data-article-sidebar]';
const LIST_SELECTOR = '[data-article-sidebar-list]';

const normalizePath = (path) => {
  try {
    const url = new URL(path, window.location.origin);
    return url.pathname.replace(/index\.html$/, '').replace(/\/+$/, '');
  } catch (_error) {
    return path || '';
  }
};

const currentPath = normalizePath(window.location.pathname);

const fetchArticles = (() => {
  /** @type {Promise<Array<{title: string; href: string; absolutePath: string; datetime: string; index: number}>> | null} */
  let promise = null;

  const sortArticles = (articles) =>
    articles.sort((a, b) => {
      const timeA = Date.parse(a.datetime || '');
      const timeB = Date.parse(b.datetime || '');
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

  return () => {
    if (!promise) {
      promise = (async () => {
        const response = await fetch('/articles/index.html', {
          credentials: 'same-origin',
          cache: 'no-store',
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch article index: ${response.status}`);
        }

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const articleItems = Array.from(doc.querySelectorAll('.article-list li'));

        if (!articleItems.length) {
          throw new Error('No article entries found in index');
        }

        const articles = articleItems
          .map((item, index) => {
            const anchor = item.querySelector('a[href]');
            if (!anchor) return null;

            const heading = anchor.querySelector('h1, h2, h3, h4');
            const title = heading ? heading.textContent.trim() : anchor.textContent.trim();
            const href = anchor.getAttribute('href') || '#';
            const absolutePath = normalizePath(href);
            const datetime = item.querySelector('time')?.getAttribute('datetime') || '';

            return {
              title,
              href,
              absolutePath,
              datetime,
              index,
            };
          })
          .filter(Boolean);

        if (!articles.length) {
          throw new Error('No valid article entries resolved from index');
        }

        return sortArticles(articles);
      })();
    }
    return promise;
  };
})();

const appendIndexLink = (list) => {
  if (list.querySelector('[data-article-sidebar-index]')) return;
  const indexLi = document.createElement('li');
  indexLi.setAttribute('data-article-sidebar-index', '');
  const indexAnchor = document.createElement('a');
  indexAnchor.setAttribute('href', '/articles/index.html');
  indexAnchor.textContent = '記事一覧ページへ';
  indexLi.appendChild(indexAnchor);
  list.appendChild(indexLi);
};

const renderError = (list, statusItem) => {
  if (statusItem) {
    statusItem.textContent = '記事一覧を読み込めませんでした';
    statusItem.setAttribute('role', 'status');
  } else {
    const errorItem = document.createElement('li');
    errorItem.textContent = '記事一覧を読み込めませんでした';
    errorItem.setAttribute('role', 'status');
    list.appendChild(errorItem);
  }
  appendIndexLink(list);
};

const populateSidebar = (sidebar, articles) => {
  const list = sidebar.querySelector(LIST_SELECTOR);
  if (!list) return;

  const limitAttr = sidebar.getAttribute('data-article-sidebar-limit');
  const parsedLimit = Number.parseInt(limitAttr || '', 10);
  const maxItems = Number.isFinite(parsedLimit) ? Math.max(1, parsedLimit) : 5;

  const excludeAttr = sidebar.getAttribute('data-article-sidebar-exclude');
  const excludePaths = new Set(
    (excludeAttr || '')
      .split(',')
      .map((value) => normalizePath(value.trim()))
      .filter(Boolean),
  );

  const filtered = articles.filter(
    (article) => article.absolutePath !== currentPath && !excludePaths.has(article.absolutePath),
  );

  const limited = filtered.slice(0, maxItems);

  list.innerHTML = '';

  if (!limited.length) {
    const emptyItem = document.createElement('li');
    emptyItem.textContent = '他の記事が見つかりませんでした';
    emptyItem.setAttribute('role', 'status');
    list.appendChild(emptyItem);
    appendIndexLink(list);
    return;
  }

  limited.forEach((article) => {
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    anchor.setAttribute('href', article.href);
    anchor.textContent = article.title;
    li.appendChild(anchor);
    list.appendChild(li);
  });

  appendIndexLink(list);
};

async function populateArticleSidebars() {
  const sidebars = Array.from(document.querySelectorAll(SIDEBAR_SELECTOR));
  if (!sidebars.length) return;

  const statusItems = sidebars.map((sidebar) => {
    const list = sidebar.querySelector(LIST_SELECTOR);
    return list?.querySelector('[data-article-sidebar-status]') ?? null;
  });

  try {
    const articles = await fetchArticles();
    sidebars.forEach((sidebar) => populateSidebar(sidebar, articles));
  } catch (error) {
    console.error(error);
    sidebars.forEach((sidebar, index) => {
      const list = sidebar.querySelector(LIST_SELECTOR);
      if (!list) return;
      renderError(list, statusItems[index]);
    });
  }
}

populateArticleSidebars();
