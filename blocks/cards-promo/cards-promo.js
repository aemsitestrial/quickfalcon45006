import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

/**
 * Adobe Dynamic Media / delivery URLs (e.g. /cms/delivery/media/<id>) have no
 * file extension. createOptimizedPicture assumes an extension-based image URL,
 * so it mangles these (bad format param, wrong origin) and the image breaks.
 * Detect them and leave the original <img> untouched.
 */
function isDynamicMediaUrl(src) {
  return /\/cms\/delivery\/media\//.test(src) || /\/is\/image\//.test(src) || /\/adobe\/assets\/urn:/.test(src);
}

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-promo-card-image';
      else div.className = 'cards-promo-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    // Dynamic Media URLs are extension-less; leave them as-is so they don't break.
    if (isDynamicMediaUrl(img.src)) return;
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);
}
