/* eslint-disable */
/* global WebImporter */
/**
 * Parser for variant: cards-promo
 * Base block: cards
 * Source: https://co.my.xcelenergy.com/s/residential/tips (c-xeg-featured-content-v2)
 * Convention: 2 columns, multiple rows. Each row = one card: [image, text].
 *   - Column 1 (image, mandatory): icon/illustration
 *   - Column 2 (text, mandatory): heading + description + CTA (grouped as the `text` richtext field)
 * Model item (card-promo): image (reference), text (richtext), tagline (text).
 *   `tagline` has no source content on any card, so it is left unset (empty optional field ->
 *   no cell/hint per field-hinting rules), keeping the table at the 2-column cards convention.
 *   imageAlt collapses into the <img> (not a separate field here).
 * Generated: 2026-07-30
 */
export default function parse(element, { document }) {
  const items = element.querySelectorAll('c-xeg-featured-content-item, .xeg-columns > [data-column]');

  const cells = [];
  items.forEach((item) => {
    // Image (icon/illustration) - mandatory first cell
    const img = item.querySelector('img');

    // Text: heading + description paragraph(s) + CTA link, in source order.
    const heading = item.querySelector('h3, h2, h4, [class*="h4"]');
    const paras = Array.from(item.querySelectorAll('lightning-formatted-rich-text p, .xeg-style-rich-text p, p'));
    const cta = item.querySelector('a.xeg-button, c-xeg-button a, a[data-button-variant], a');

    const textParts = [];
    if (heading) {
      const h = document.createElement('h3');
      h.textContent = heading.textContent.trim();
      textParts.push(h);
    }
    paras.forEach((p) => {
      const text = p.textContent.trim();
      if (text) {
        const np = document.createElement('p');
        np.textContent = text;
        textParts.push(np);
      }
    });
    if (cta && cta.getAttribute('href')) {
      const a = document.createElement('a');
      a.setAttribute('href', cta.getAttribute('href'));
      a.textContent = cta.textContent.trim();
      const p = document.createElement('p');
      p.appendChild(a);
      textParts.push(p);
    }

    if (!img && textParts.length === 0) return; // skip empty card

    // Column 1: image
    const imageCell = img ? [document.createComment(' field:image '), img] : '';

    // Column 2: text (richtext) - heading + description + CTA
    const textCell = [document.createComment(' field:text '), ...textParts];

    cells.push([imageCell, textCell]);
  });

  // Empty-block guard
  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-promo', cells });

  // The section heading (e.g. "Even More Ways to Save") is a direct child of the
  // block element, so replaceWith would destroy it. Preserve it as default content
  // by emitting a plain <h2> before the block.
  const sectionHeading = element.querySelector(':scope > h2, :scope > .header h2, h2.has-decoration');
  if (sectionHeading && sectionHeading.textContent.trim()) {
    const h2 = document.createElement('h2');
    h2.textContent = sectionHeading.textContent.trim();
    element.replaceWith(h2, block);
  } else {
    element.replaceWith(block);
  }
}
