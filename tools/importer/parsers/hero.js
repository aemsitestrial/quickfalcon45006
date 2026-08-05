/* eslint-disable */
/* global WebImporter */
/**
 * Parser for variant: hero
 * Base block: hero
 * Source: https://co.my.xcelenergy.com/s/residential/tips (c-xeg-hero-v2)
 * Convention: 1 column, 3 rows -> [block name] / [background image (optional)] / [title + subheading + CTA]
 * Model (blocks/hero/_hero.json): image (reference), imageAlt (collapsed -> img alt), text (richtext)
 * imageAlt collapses into the img element (no separate row/hint).
 * Generated: 2026-07-30
 */
export default function parse(element, { document }) {
  // --- image: hero uses a CSS background-image on the section, not an <img> ---
  const section = element.querySelector('.xegc-hero, section') || element;
  const style = section.getAttribute('style') || '';
  const bgMatch = style.match(/url\((?:["']?)([^"')]+)(?:["']?)\)/i);
  let img = element.querySelector('img'); // fallback if an inline <img> exists on other pages
  if (!img && bgMatch && bgMatch[1]) {
    img = document.createElement('img');
    img.src = bgMatch[1];
    img.setAttribute('alt', ''); // imageAlt collapses into this attribute (no separate row)
  }

  // --- text: category eyebrow + heading + paragraph (richtext) ---
  const container = element.querySelector('.xeg-content-container') || element;
  const category = container.querySelector('p.category, .category');
  const heading = element.querySelector('h1, h2, [data-html="headerText"]');
  const paragraph = element.querySelector('p.xeg-h4, p[data-html="paragraphText"]');

  const textNodes = [];
  if (category) textNodes.push(category);
  if (heading) textNodes.push(heading);
  if (paragraph) textNodes.push(paragraph);

  // Empty-block guard
  if (!img && textNodes.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];

  // Row: background image (only add if present)
  if (img) {
    cells.push([[document.createComment(' field:image '), img]]);
  }

  // Row: text (richtext) - title + subheading + CTA
  const textCell = [document.createComment(' field:text ')];
  textNodes.forEach((n) => textCell.push(n));
  cells.push([textCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero', cells });
  element.replaceWith(block);
}
