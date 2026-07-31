/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Xcel Energy site-wide cleanup.
 *
 * Source is a Salesforce Experience Cloud (Aura/LWC) page using custom
 * c-xeg-* elements. Removes all non-authorable site shell/chrome so the
 * import contains only page-level authorable content.
 *
 * Every selector below was verified against migration-work/cleaned.html.
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform',
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Loaders, overlays, chat/messaging widgets, recaptcha, tracking iframes,
    // and base64 SVG icon-definition containers. These can block or pollute
    // block parsing, so remove them first.
    // Verified in cleaned.html:
    //   #auraLoadingBox (loading spinner overlay)
    //   #auraErrorMask (Aura framework error box: "Sorry to interrupt" /
    //     "CSS Error" — sibling of #auraLoadingBox, hidden on the live page)
    //   experience_messaging-embedded-messaging (line 1036)
    //   .forceCommunityToastManager (line 1054)
    //   .forceHoverPrototype (line 1063)
    //   .siteforceSpinnerManager (line 1070)
    //   .comm-panels-container (line 1084)
    //   #sf-aria-live (line 1091)
    //   .grecaptcha-badge (line 1099)
    //   #embedded-messaging (line 1125)
    //   base64 icon-def divs id^="httpscomyxcelenergycom" (lines 1093, 1112, 1115)
    WebImporter.DOMUtils.remove(element, [
      '#auraLoadingBox',
      '#auraErrorMask',
      'experience_messaging-embedded-messaging',
      '.forceCommunityToastManager',
      '.forceHoverPrototype',
      '.siteforceSpinnerManager',
      '.comm-panels-container',
      '#sf-aria-live',
      '.grecaptcha-badge',
      '#embedded-messaging',
      '[id^="httpscomyxcelenergycom"]',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Non-authorable site chrome: header/nav, breadcrumb, footer, and
    // Aura/Salesforce infrastructure wrappers. Verified in cleaned.html:
    //   siteforce-record-api-refresh-handler (line 39)
    //   c-ma-billing-reroute (line 48)
    //   c-xe-maintenance-redirect (line 51)
    //   c-xeg-site-header-alert (line 55)
    //   #xegs2c skip-to-main link (line 57)
    //   c-xeg-site-header-desktop (line 58, wraps <header>)
    //   c-xeg-breadcrumb (line 554)
    //   c-xeg-site-footer (line 793, wraps <footer>)
    //   .xeg-theme-region (line 1033)
    //   .xeg-footer (line 1041)
    WebImporter.DOMUtils.remove(element, [
      'siteforce-record-api-refresh-handler',
      'c-ma-billing-reroute',
      'c-xe-maintenance-redirect',
      'c-xeg-site-header-alert',
      '#xegs2c',
      'c-xeg-site-header-desktop',
      'header',
      'c-xeg-breadcrumb',
      'c-xeg-site-footer',
      'footer',
      '.xeg-theme-region',
      '.xeg-footer',
      // Safe leftover / non-authorable embeds:
      'iframe',
      'link',
      'noscript',
      'source',
    ]);

    // Strip Decibel Insight tracking attributes (verified: data-di-id on
    // anchors, data-di-res-id/data-di-rand on svg/icons throughout the DOM).
    element.querySelectorAll('[data-di-id], [data-di-res-id], [data-di-rand]').forEach((el) => {
      el.removeAttribute('data-di-id');
      el.removeAttribute('data-di-res-id');
      el.removeAttribute('data-di-rand');
    });

    // Remove trailing runtime-widget artifacts that leak into the page body:
    //   - a stray paragraph containing only backtick(s) (from #sf-aria-live / icon defs)
    //   - the "Feedback" survey-widget button/label
    // These are lazy-injected by JS, so they only appear in the live-rendered
    // DOM (not cleaned.html) and must be pruned here to survive re-imports.
    element.querySelectorAll('p, span, div, button, a').forEach((el) => {
      if (el.children.length > 0) return; // leaf elements only
      const text = (el.textContent || '').trim();
      if (/^`+$/.test(text) || text === 'Feedback') {
        el.remove();
      }
    });

    // Brand rename: "Xcel" -> "X" in visible TEXT ONLY. Walking text nodes means
    // href/src attributes (e.g. xcelenergy.com URLs) are never touched, so links
    // keep working. Also rename the document title, which feeds page metadata.
    const walker = payload.document.createTreeWalker(element, 4 /* SHOW_TEXT */);
    const textNodes = [];
    for (let n = walker.nextNode(); n; n = walker.nextNode()) textNodes.push(n);
    textNodes.forEach((node) => {
      // Drop loose backtick-only text nodes. WebImporter wraps bare text into a
      // <p> later, so at this stage the "``" artifact is still a raw text node
      // that the element-based prune above cannot see.
      if (/^`+$/.test((node.nodeValue || '').trim())) {
        node.remove();
        return;
      }
      if (node.nodeValue && node.nodeValue.includes('Xcel')) {
        node.nodeValue = node.nodeValue.replace(/Xcel/g, 'X');
      }
    });
    if (payload.document.title && payload.document.title.includes('Xcel')) {
      payload.document.title = payload.document.title.replace(/Xcel/g, 'X');
    }
  }
}
