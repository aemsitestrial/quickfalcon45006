/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Xcel Energy section handling.
 *
 * Inserts section breaks (<hr>) and Section Metadata blocks based on the
 * template sections defined in page-templates.json. Runs in afterTransform
 * only (block parsers run between the hooks and need the DOM intact).
 *
 * Section selectors verified against migration-work/cleaned.html:
 *   1. c-xeg-hero-v2            (line 543)  style: none
 *   2. c-xeg-content-text-block-v2 (line 571) style: none
 *   3. c-xeg-expand-collapse-v2 (line 600)  style: none
 *   4. c-xeg-featured-content-v2 (line 698) style: highlight
 *   5. c-xeg-call-to-action     (line 751)  style: highlight
 *   6. c-xeg-contact-support    (line 770)  style: dark
 *
 * Each section element is wrapped in a div.ui-widget; breaks and metadata
 * are placed relative to that wrapper so sections group cleanly.
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform',
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const sections = payload && payload.template && payload.template.sections;
    if (!sections || sections.length < 2) {
      return;
    }

    const doc = element.ownerDocument;

    // Resolve the boundary node for each section: the section element found
    // by its selector, promoted to its enclosing div.ui-widget wrapper when
    // present so breaks/metadata sit between sections rather than inside them.
    const boundaryFor = (section) => {
      const el = element.querySelector(section.selector);
      if (!el) return null;
      return el.closest('.ui-widget') || el;
    };

    // Process in reverse so earlier insertions don't shift later boundaries.
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      const boundary = boundaryFor(section);
      if (!boundary) continue;

      // Section Metadata block for sections that declare a style.
      if (section.style) {
        const meta = WebImporter.Blocks.createBlock(doc, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        boundary.after(meta);
      }

      // Section break before every non-first section.
      if (i > 0) {
        boundary.before(doc.createElement('hr'));
      }
    }
  }
}
