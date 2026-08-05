import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Fetches a Content Fragment via the AEM Assets REST API.
 * @param {string} cfPath - DAM path, e.g. /content/dam/quickfalcon/article1
 * @returns {Object|null} CF element values keyed by field name
 */
async function fetchContentFragment(cfPath) {
  // Strip /content/dam to get the Assets API path
  const apiPath = `/api/assets${cfPath.replace('/content/dam', '')}.json`;
  const resp = await fetch(apiPath);
  if (!resp.ok) return null;
  const json = await resp.json();
  return json?.properties?.elements ?? null;
}

export default async function decorate(block) {
  // The block holds the CF path set by the Universal Editor
  const cfPath = block.querySelector(':scope > div > div')?.textContent?.trim();
  if (!cfPath) return;

  // Clear the raw path cell while we load
  block.innerHTML = '';

  const elements = await fetchContentFragment(cfPath);
  if (!elements) return;

  const { title, image, imageAlt, description, publishDate } = elements;

  // Title
  if (title?.value) {
    const h2 = document.createElement('h2');
    h2.className = 'article-title';
    h2.textContent = title.value;
    block.append(h2);
  }

  // Image
  if (image?.value) {
    const wrapper = document.createElement('div');
    wrapper.className = 'article-image';
    const alt = imageAlt?.value ?? '';
    const picture = createOptimizedPicture(image.value, alt, false, [{ width: '750' }]);
    wrapper.append(picture);
    block.append(wrapper);
  }

  // Description
  if (description?.value) {
    const div = document.createElement('div');
    div.className = 'article-description';
    // value may be plain text or HTML depending on the CF field type
    div.innerHTML = description.value;
    block.append(div);
  }

  // Publish date
  if (publishDate?.value) {
    const time = document.createElement('time');
    time.className = 'article-date';
    time.dateTime = publishDate.value;
    time.textContent = new Date(publishDate.value).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    block.append(time);
  }
}
