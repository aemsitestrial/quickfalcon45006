/* eslint-disable */
/* global WebImporter */
/**
 * Parser for variant: columns-contact
 * Base block: columns
 * Source: https://co.my.xcelenergy.com/s/residential/tips (c-xeg-contact-support)
 * Columns block (core/franklin/components/columns): 2 columns x 1 row.
 * Convention: multi-column layout, one content row; column count matches visual grouping (2 here).
 * Per field-hinting rules, Columns blocks get NO field comments — only default content in cells.
 * Column 1: heading + paragraph. Column 2: CTA button.
 * Generated: 2026-07-30
 */
export default function parse(element, { document }) {
  // Column 1: text content (heading + paragraph)
  const heading = element.querySelector('h2, h3, [data-html^="headerText"]');
  const paragraph = element.querySelector('p.subheading-aa-07, p[data-html^="paragraphText"], p');

  const col1 = [];
  if (heading) {
    const h = document.createElement('h2');
    h.textContent = heading.textContent.trim();
    col1.push(h);
  }
  if (paragraph) {
    const p = document.createElement('p');
    p.textContent = paragraph.textContent.trim();
    col1.push(p);
  }

  // Column 2: CTA button
  const cta = element.querySelector('a.xeg-button, c-xeg-button a, a[data-button-variant], a');
  const col2 = [];
  if (cta && cta.getAttribute('href')) {
    const a = document.createElement('a');
    a.setAttribute('href', cta.getAttribute('href'));
    a.textContent = cta.textContent.trim();
    col2.push(a);
  }

  // Empty-block guard
  if (col1.length === 0 && col2.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  // Single row, two column cells. No field hints for columns blocks.
  const cells = [[col1, col2]];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-contact', cells });
  element.replaceWith(block);
}
