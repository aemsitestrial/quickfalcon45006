import { createOptimizedPicture } from '../../scripts/aem.js';

const AEM_PUBLISH = 'http://localhost:4502';
// Basic auth credentials for AEM author. Remove for publish (anonymous access).
const AEM_CREDENTIALS = btoa('admin:admin');

/**
 * Fetches a single Content Fragment via a GraphQL persisted query.
 * Requires a persisted query named "articleList" under the "quickfalcon" GraphQL config.
 *
 * @param {string} cfPath - DAM path, e.g. /content/dam/quickfalcon/article1
 * @returns {Object|null} The CF item from the GraphQL response
 */
async function fetchArticle() {
  const url = `${AEM_PUBLISH}/graphql/execute.json/quickfalcon/articleList`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${AEM_CREDENTIALS}`,
    },
  });

  if (!response.ok) {
    // eslint-disable-next-line no-console
    console.warn(`[article] GraphQL fetch failed: ${response.status} — ${url}`);
    return null;
  }

  const { data } = await response.json();
  return data?.articleModelList?.items?.[0] ?? null;
}

export default async function decorate(block) {
  // aem-content fields render as <a href="/content/dam/..."> in the block HTML
  const link = block.querySelector(':scope > div > div > a');
  const cfPath = link
    ? link.getAttribute('href')
    : block.querySelector(':scope > div > div')?.textContent?.trim();

  if (!cfPath) {
    // eslint-disable-next-line no-console
    console.warn('[article] No CF path found in block');
    return;
  }

  block.innerHTML = '';

  const article = await fetchArticle();
  if (!article) return;

  const {
    title, publishDate, description, image,
  } = article;

  if (title) {
    const h2 = document.createElement('h2');
    h2.className = 'article-title';
    h2.textContent = title;
    block.append(h2);
  }

  // image._path is not returned by the current persisted query.
  // Add _path to the image selection in GraphiQL to enable image rendering.
  if (image?._path) {
    const wrapper = document.createElement('div');
    wrapper.className = 'article-image';
    const picture = createOptimizedPicture(image._path, title ?? '', false, [{ width: '750' }]);
    wrapper.append(picture);
    block.append(wrapper);
  }

  if (description) {
    const div = document.createElement('div');
    div.className = 'article-description';
    div.textContent = description;
    block.append(div);
  }

  if (publishDate) {
    const time = document.createElement('time');
    time.className = 'article-date';
    time.dateTime = publishDate;
    time.textContent = new Date(publishDate).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    block.append(time);
  }
}
