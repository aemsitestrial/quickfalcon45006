/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroParser from './parsers/hero.js';
import accordionGuideParser from './parsers/accordion-guide.js';
import cardsPromoParser from './parsers/cards-promo.js';
import columnsContactParser from './parsers/columns-contact.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/xcelenergy-cleanup.js';
import sectionsTransformer from './transformers/xcelenergy-sections.js';

// PARSER REGISTRY - Map parser names to functions
const parsers = {
  'hero': heroParser,
  'accordion-guide': accordionGuideParser,
  'cards-promo': cardsPromoParser,
  'columns-contact': columnsContactParser,
};

// PAGE TEMPLATE CONFIGURATION - Embedded from page-templates.json
const PAGE_TEMPLATE = {
  name: 'residential-tips',
  description: 'Xcel Energy residential informational page with hero, text-block tips, accordion guide, promo cards grid, callout, and contact banner',
  urls: [
    'https://co.my.xcelenergy.com/s/residential/tips'
  ],
  blocks: [
    {
      name: 'hero',
      instances: ['c-xeg-hero-v2']
    },
    {
      name: 'accordion-guide',
      instances: ['c-xeg-expand-collapse-v2']
    },
    {
      name: 'cards-promo',
      instances: ['c-xeg-featured-content-v2']
    },
    {
      name: 'columns-contact',
      instances: ['c-xeg-contact-support']
    }
  ],
  sections: [
    {
      id: 'section-1-hero',
      name: 'Hero',
      selector: 'c-xeg-hero-v2',
      style: null,
      blocks: ['hero'],
      defaultContent: []
    },
    {
      id: 'section-2-quick-tips',
      name: 'Quick Ways to Save',
      selector: 'c-xeg-content-text-block-v2',
      style: null,
      blocks: [],
      defaultContent: ['c-xeg-content-text-block-v2']
    },
    {
      id: 'section-3-next-level',
      name: 'Next-Level Energy Saving',
      selector: 'c-xeg-expand-collapse-v2',
      style: null,
      blocks: ['accordion-guide'],
      defaultContent: ['c-xeg-expand-collapse-v2 h2', 'c-xeg-expand-collapse-v2 p']
    },
    {
      id: 'section-4-more-ways',
      name: 'Even More Ways to Save',
      selector: 'c-xeg-featured-content-v2',
      style: 'highlight',
      blocks: ['cards-promo'],
      defaultContent: ['c-xeg-featured-content-v2 h2']
    },
    {
      id: 'section-5-assistance',
      name: 'Energy Assistance Resources',
      selector: 'c-xeg-call-to-action',
      style: 'highlight',
      blocks: [],
      defaultContent: ['c-xeg-call-to-action']
    },
    {
      id: 'section-6-contact',
      name: 'Contact Customer Service',
      selector: 'c-xeg-contact-support',
      style: 'dark',
      blocks: ['columns-contact'],
      defaultContent: []
    }
  ]
};

// TRANSFORMER REGISTRY - cleanup runs first, section transformer runs after (adds <hr> + section metadata)
const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 * @param {string} hookName - 'beforeTransform' or 'afterTransform'
 * @param {Element} element - The DOM element to transform
 * @param {Object} payload - { document, url, html, params }
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 * @param {Document} document - The DOM document
 * @param {Object} template - The embedded PAGE_TEMPLATE object
 * @returns {Array} Array of block instances found on the page
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      if (!block.element.parentNode) return; // Already replaced by earlier parser
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '')
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
