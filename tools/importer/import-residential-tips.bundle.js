/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-residential-tips.js
  var import_residential_tips_exports = {};
  __export(import_residential_tips_exports, {
    default: () => import_residential_tips_default
  });

  // tools/importer/parsers/hero.js
  function parse(element, { document }) {
    const section = element.querySelector(".xegc-hero, section") || element;
    const style = section.getAttribute("style") || "";
    const bgMatch = style.match(/url\((?:["']?)([^"')]+)(?:["']?)\)/i);
    let img = element.querySelector("img");
    if (!img && bgMatch && bgMatch[1]) {
      img = document.createElement("img");
      img.src = bgMatch[1];
      img.setAttribute("alt", "");
    }
    const container = element.querySelector(".xeg-content-container") || element;
    const category = container.querySelector("p.category, .category");
    const heading = element.querySelector('h1, h2, [data-html="headerText"]');
    const paragraph = element.querySelector('p.xeg-h4, p[data-html="paragraphText"]');
    const textNodes = [];
    if (category) textNodes.push(category);
    if (heading) textNodes.push(heading);
    if (paragraph) textNodes.push(paragraph);
    if (!img && textNodes.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    if (img) {
      cells.push([[document.createComment(" field:image "), img]]);
    }
    const textCell = [document.createComment(" field:text ")];
    textNodes.forEach((n) => textCell.push(n));
    cells.push([textCell]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/accordion-guide.js
  var BODIES = {
    "Heating and Cooling Your Home": "<h4><strong>Staying Warm</strong></h4><p><strong>Thermostats</strong></p><ul><li>Bundle up before turning the heat up. You can save 1% of your total heating bill for every degree you set back your thermostat.</li><li>Turn down your thermostat when using your fireplace to keep your fireplace from drawing heat out of the room. Also, keep your fireplace flue damper tightly closed when not in use.</li><li>Buy a programmable or smart thermostat. They can help you save up to $180 a year by adjusting the temperature when you're at work, away, or asleep.</li></ul><p><strong>Furnaces, Vents and Heaters</strong></p><ul><li>Replace or clean your furnace filter every three months or when it looks dirty. A clogged filter can cause your system to work less efficiently.</li><li>Some additional maintenance tips: Vacuum vent covers, peel back accumulated layers of paint, dust radiator fins for better heat distribution, get an annual tune-up to check efficiency, and bleed radiators annually for your furnace and boiler.</li><li>Heat a smaller area when you're in one place for a while, either by closing vents in unused rooms or turning down the heat in some areas if you have a zoned home.</li><li>Use space heaters wisely by directing heaters towards people, not spaces, and keeping flammable materials away.</li></ul><p><strong>Bonus Tips</strong></p><ul><li>Keep interior doors open to help air circulate and maintain constant heat levels.</li><li>Plant some trees. Strategically placed on the north side of your property, dense evergreen trees or shrubs can function as a windbreak and reduce annual home heating costs by 10 to 15%.</li></ul><h4><strong>Staying Cool</strong></h4><p><strong>Air Conditioners</strong></p><ul><li>Use AC in your most needed rooms, like your bedroom, to reduce electric use.</li><li>Have your air conditioner coils cleaned to improve efficiency and save energy.</li><li>Position trees and shrubs to shade your AC unit and help it run up to 10% more efficiently.</li></ul><p><strong>Thermostats</strong></p><ul><li>Buy a programmable or smart thermostat. They can help you save up to $180 a year by adjusting the temperature when you're at work, away, or asleep.</li></ul><p><strong>Around the House</strong></p><ul><li>Keep interior doors open to help air circulate more freely and maintain constant cooling levels.</li><li>Open windows to create natural ventilation and airflow throughout your home.</li><li>If your basement is an enjoyable place to be, hang out there when you can. It's naturally cooler, so you can run your AC less.</li></ul><p><strong>Bonus Tips</strong></p><ul><li>Plant more trees. Carefully positioned trees can save up to 25% of cooling energy. Summer temperatures can be three to six degrees cooler in tree-shaded neighborhoods, so you'll help your neighbors too.</li><li>Install ceiling fans to keep cool air circulating, so you can turn down your AC. Ceiling fans can make temperatures feel up to eight degrees cooler. ENERGY STAR\xAE rated ceiling fans offer the best efficiency ratings. Make sure to turn off your fan when you leave the room.</li><li>When it's time to replace your roof, consider installing a white roof or lighter-color shingles to help reflect heat away.</li></ul>",
    "Energy Proofing Your Home": `<p><strong>Windows and Doors</strong></p><ul><li>Use insulating window treatments to slow down heat loss in the winter and heat gain in the summer.</li><li>Install storm windows. They're a great insulator and help seal openings that create drafts.</li><li>When buying new windows, here are a few things to consider:<ul><li>Multiple panes are best. Double-pane, triple-pane, and even quadra-pane windows are available.</li><li>Use gas fillings to fill the space between panes. It's like invisible insulation because it's clear and doesn't conduct heat as quickly as air.</li><li>Get special coatings that reflect infrared heat back into your home, preventing it from escaping via the window.</li></ul></li><li>New exterior doors with insulation will keep energy in. Wood doors with foam filling work best.</li></ul><p><strong>Insulation and Air Leaks</strong></p><ul><li>Invest in high-quality insulation to help keep cool or warm air inside our home. Placing high R-value insulation in the cavities of your home slows the flow of heat through walls, floors, and ceilings.</li><li>Get a home x-ray. Thermal imaging of your exterior can reveal leaks and locations of poor insulation.</li><li>Have a qualified contractor seal air leaks with fire-resistant materials. Foam sealant works best on larger gaps and windows, baseboards, and other places where air may leak.</li><li>Here are some more leak-sealing hacks<ul><li>Seal air leaks where plumbing or electrical wiring comes through walls, floors, ceilings, and soffits over cabinets.</li><li>Find and seal drafts around doors and windows, fireplace dampers, and other places where air might escape.</li><li>Pure silicone works well for caulking seams in ducts and areas exposed to high temperatures.</li><li>Installing foam gaskets behind electric outlets and switch plates on walls will seal leaks.</li></ul></li></ul><p><strong>Bonus Tips</strong></p><ul><li>Your attic works like a hat for your home, helping it keep warm in the winter and cool in the summer. A qualified contractor can help ensure your attic has proper venting and vapor barriers.</li><li>Look into using solar panels for generating electricity or hot water if you live in a sunny area. If rooftop solar isn't right for you, explore the other <a href="https://co.my.xcelenergy.com/s/renewable">renewable options</a> available for you.</li><li>Have you heard of green roofs? They provide great insulation, help soak up rain and are environmentally friendly.</li><li>A ground source heat pump can deliver heating efficiencies 50% to 70% higher than many conventional heating systems and can provide cooling efficiencies 20% to 40% higher than available air conditioners.</li></ul>`,
    "Daily Household Chores": `<p><strong>Food Prep</strong></p><ul><li>Which cooking appliance should you use for dinner tonight? This is the order of appliances from least amount of energy used to most: microwave, toaster oven, stovetop, oven. Note: This is simply a guideline as appliances can vary in energy usage.</li><li>Speaking of ovens, try using convection ovens. They can use up to 40% less electricity than a regular electric oven.</li><li>Glass or ceramic pans heat up faster than metal pans to save on baking time.</li><li>Cover your kitchen exhaust fan when not in use and prevent air leaks.</li><li>Turn off the oven 10 minutes before the end of cooking. The oven will retain the temperature, and you'll avoid over-cooking.</li><li>In the summer, cooking outside can reduce extra heat buildup in your kitchen.</li><li>Putting leftovers in sealed containers helps prevent moisture from escaping and causing your fridge to run less efficiently.</li></ul><p><strong>Washing Dishes</strong></p><ul><li>Newer dishwashers with internal heaters and load sensors can use 25% less energy.</li><li>Not using heat in the drying cycle can save up to 20% of your dishwasher's total electricity use.</li><li>Low-flow water faucets and <a target="_blank" href="https://www.poweredbyefi.org/xcelenergyco/energy-efficient-home/water-products/aerator.html">faucet aerators</a> can help reduce hot water consumption and save energy. Faucet aerators can reduce your water flow from the usual 2.2 to as low as .5 gallons per minute, saving you on hot water use while still providing the water flow you need.</li></ul><p><strong>Doing Laundry</strong></p><ul><li>Using cool settings on your washing machine saves hot water and energy.</li><li>Add tennis balls to your dryer to help clothes dry faster and save energy.</li><li>Save using your dryer by hanging laundry out to dry in nicer weather.</li></ul>`,
    "Using Lights and Water": `<p><strong>Lights</strong></p><ul><li>LED light bulbs are worth the investment\u2014they're energy efficient and can save you money over their lifetime. Before you head to the store, check out our <a href="https://co.my.xcelenergy.com/s/residential/home-rebates/home-lighting">bulb deals</a> for some big discounts.</li><li>When choosing an LED wattage, pick one that's about 1/4 of what you usually buy for an incandescent bulb.</li><li>Recycle your CFLs for free. They contain mercury and need to be disposed of properly. We offer <a href="https://co.my.xcelenergy.com/s/residential/home-rebates/home-lighting">free recycling of CFL bulbs</a> at participating locations. LED bulbs do not need to be recycled.</li><li>Use outdoor motion detection lighting so you only use energy when you need it.</li><li>Always unplug cords from outlets when not in use and use power strips to easily turn power on and off.</li></ul><p><strong>Water</strong></p><ul><li>Lowering your water heater\u2019s temperature by 10 degrees can save you 3% to 5% on heating costs, but be sure to keep it set to at least 120 degrees.</li><li>Low-flow <a target="_blank" href="https://www.poweredbyefi.org/xcelenergyco/energy-efficient-home/water-products/showerhead.html">shower heads and water faucets</a> can help reduce hot water consumption and save energy. Faucet aerators can reduce your water flow from 2.2 to as low as .5 gallons per minute, reducing hot water use while still providing the flow you need.</li><li>Invest in a water heater insulation blanket. It can save you 7% to 16% in water heating costs and pay for itself in about a year.</li><li>When it's time to replace your water heater, go on-demand! Natural gas on-demand or tankless water heaters can save up to 35% for smaller households and 18% for larger households.</li><li>Install a drain-water waste heat recovery system to capture energy from waste hot water to preheat cold water entering the water heater.</li><li>Install an under-the-sink, on-demand water heater in your kitchen to save energy by using it only when you need it.</li></ul>`
  };
  function parse2(element, { document }) {
    let items = element.querySelectorAll("c-xeg-expand-collapse-item");
    if (items.length === 0) {
      items = element.querySelectorAll(":scope > ul > li, li");
    }
    const cells = [];
    items.forEach((item) => {
      const heading2 = item.querySelector('h3, h2, h4, [class*="h5"], [class*="h4"]');
      const span = item.querySelector("a .toggle span, a span, .toggle span, span");
      const labelText = span && span.textContent.trim() || heading2 && heading2.textContent.trim() || "";
      if (!labelText) return;
      const labelCell = [document.createComment(" field:label ")];
      const labelPara = document.createElement("p");
      labelPara.textContent = labelText;
      labelCell.push(labelPara);
      const bodyCell = [document.createComment(" field:body ")];
      const bodyHTML = BODIES[labelText];
      if (bodyHTML) {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = bodyHTML;
        bodyCell.push(...wrapper.childNodes);
      }
      cells.push([labelCell, bodyCell]);
    });
    if (cells.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "accordion-guide", cells });
    const preserved = [];
    const heading = element.querySelector(":scope > .header h2, :scope > h2, h2");
    if (heading && heading.textContent.trim()) {
      const h2 = document.createElement("h2");
      h2.textContent = heading.textContent.trim();
      preserved.push(h2);
    }
    const intro = element.querySelector(":scope > .header p, .paragraph-text");
    if (intro && intro.textContent.trim()) {
      const p = document.createElement("p");
      p.textContent = intro.textContent.trim();
      preserved.push(p);
    }
    if (preserved.length) {
      element.replaceWith(...preserved, block);
    } else {
      element.replaceWith(block);
    }
  }

  // tools/importer/parsers/cards-promo.js
  function parse3(element, { document }) {
    const items = element.querySelectorAll("c-xeg-featured-content-item, .xeg-columns > [data-column]");
    const cells = [];
    items.forEach((item) => {
      const img = item.querySelector("img");
      const heading = item.querySelector('h3, h2, h4, [class*="h4"]');
      const paras = Array.from(item.querySelectorAll("lightning-formatted-rich-text p, .xeg-style-rich-text p, p"));
      const cta = item.querySelector("a.xeg-button, c-xeg-button a, a[data-button-variant], a");
      const textParts = [];
      if (heading) {
        const h = document.createElement("h3");
        h.textContent = heading.textContent.trim();
        textParts.push(h);
      }
      paras.forEach((p) => {
        const text = p.textContent.trim();
        if (text) {
          const np = document.createElement("p");
          np.textContent = text;
          textParts.push(np);
        }
      });
      if (cta && cta.getAttribute("href")) {
        const a = document.createElement("a");
        a.setAttribute("href", cta.getAttribute("href"));
        a.textContent = cta.textContent.trim();
        const p = document.createElement("p");
        p.appendChild(a);
        textParts.push(p);
      }
      if (!img && textParts.length === 0) return;
      const imageCell = img ? [document.createComment(" field:image "), img] : "";
      const textCell = [document.createComment(" field:text "), ...textParts];
      cells.push([imageCell, textCell]);
    });
    if (cells.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-promo", cells });
    const sectionHeading = element.querySelector(":scope > h2, :scope > .header h2, h2.has-decoration");
    if (sectionHeading && sectionHeading.textContent.trim()) {
      const h2 = document.createElement("h2");
      h2.textContent = sectionHeading.textContent.trim();
      element.replaceWith(h2, block);
    } else {
      element.replaceWith(block);
    }
  }

  // tools/importer/parsers/columns-contact.js
  function parse4(element, { document }) {
    const heading = element.querySelector('h2, h3, [data-html^="headerText"]');
    const paragraph = element.querySelector('p.subheading-aa-07, p[data-html^="paragraphText"], p');
    const col1 = [];
    if (heading) {
      const h = document.createElement("h2");
      h.textContent = heading.textContent.trim();
      col1.push(h);
    }
    if (paragraph) {
      const p = document.createElement("p");
      p.textContent = paragraph.textContent.trim();
      col1.push(p);
    }
    const cta = element.querySelector("a.xeg-button, c-xeg-button a, a[data-button-variant], a");
    const col2 = [];
    if (cta && cta.getAttribute("href")) {
      const a = document.createElement("a");
      a.setAttribute("href", cta.getAttribute("href"));
      a.textContent = cta.textContent.trim();
      col2.push(a);
    }
    if (col1.length === 0 && col2.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [[col1, col2]];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-contact", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/xcelenergy-cleanup.js
  var TransformHook = {
    beforeTransform: "beforeTransform",
    afterTransform: "afterTransform"
  };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#auraLoadingBox",
        "#auraErrorMask",
        "experience_messaging-embedded-messaging",
        ".forceCommunityToastManager",
        ".forceHoverPrototype",
        ".siteforceSpinnerManager",
        ".comm-panels-container",
        "#sf-aria-live",
        ".grecaptcha-badge",
        "#embedded-messaging",
        '[id^="httpscomyxcelenergycom"]'
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "siteforce-record-api-refresh-handler",
        "c-ma-billing-reroute",
        "c-xe-maintenance-redirect",
        "c-xeg-site-header-alert",
        "#xegs2c",
        "c-xeg-site-header-desktop",
        "header",
        "c-xeg-breadcrumb",
        "c-xeg-site-footer",
        "footer",
        ".xeg-theme-region",
        ".xeg-footer",
        // Safe leftover / non-authorable embeds:
        "iframe",
        "link",
        "noscript",
        "source"
      ]);
      element.querySelectorAll("[data-di-id], [data-di-res-id], [data-di-rand]").forEach((el) => {
        el.removeAttribute("data-di-id");
        el.removeAttribute("data-di-res-id");
        el.removeAttribute("data-di-rand");
      });
    }
  }

  // tools/importer/transformers/xcelenergy-sections.js
  var TransformHook2 = {
    beforeTransform: "beforeTransform",
    afterTransform: "afterTransform"
  };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const sections = payload && payload.template && payload.template.sections;
      if (!sections || sections.length < 2) {
        return;
      }
      const doc = element.ownerDocument;
      const boundaryFor = (section) => {
        const el = element.querySelector(section.selector);
        if (!el) return null;
        return el.closest(".ui-widget") || el;
      };
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        const boundary = boundaryFor(section);
        if (!boundary) continue;
        if (section.style) {
          const meta = WebImporter.Blocks.createBlock(doc, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          boundary.after(meta);
        }
        if (i > 0) {
          boundary.before(doc.createElement("hr"));
        }
      }
    }
  }

  // tools/importer/import-residential-tips.js
  var parsers = {
    "hero": parse,
    "accordion-guide": parse2,
    "cards-promo": parse3,
    "columns-contact": parse4
  };
  var PAGE_TEMPLATE = {
    name: "residential-tips",
    description: "Xcel Energy residential informational page with hero, text-block tips, accordion guide, promo cards grid, callout, and contact banner",
    urls: [
      "https://co.my.xcelenergy.com/s/residential/tips"
    ],
    blocks: [
      {
        name: "hero",
        instances: ["c-xeg-hero-v2"]
      },
      {
        name: "accordion-guide",
        instances: ["c-xeg-expand-collapse-v2"]
      },
      {
        name: "cards-promo",
        instances: ["c-xeg-featured-content-v2"]
      },
      {
        name: "columns-contact",
        instances: ["c-xeg-contact-support"]
      }
    ],
    sections: [
      {
        id: "section-1-hero",
        name: "Hero",
        selector: "c-xeg-hero-v2",
        style: null,
        blocks: ["hero"],
        defaultContent: []
      },
      {
        id: "section-2-quick-tips",
        name: "Quick Ways to Save",
        selector: "c-xeg-content-text-block-v2",
        style: null,
        blocks: [],
        defaultContent: ["c-xeg-content-text-block-v2"]
      },
      {
        id: "section-3-next-level",
        name: "Next-Level Energy Saving",
        selector: "c-xeg-expand-collapse-v2",
        style: null,
        blocks: ["accordion-guide"],
        defaultContent: ["c-xeg-expand-collapse-v2 h2", "c-xeg-expand-collapse-v2 p"]
      },
      {
        id: "section-4-more-ways",
        name: "Even More Ways to Save",
        selector: "c-xeg-featured-content-v2",
        style: "highlight",
        blocks: ["cards-promo"],
        defaultContent: ["c-xeg-featured-content-v2 h2"]
      },
      {
        id: "section-5-assistance",
        name: "Energy Assistance Resources",
        selector: "c-xeg-call-to-action",
        style: "highlight",
        blocks: [],
        defaultContent: ["c-xeg-call-to-action"]
      },
      {
        id: "section-6-contact",
        name: "Contact Customer Service",
        selector: "c-xeg-contact-support",
        style: "dark",
        blocks: ["columns-contact"],
        defaultContent: []
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_residential_tips_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        if (!block.element.parentNode) return;
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_residential_tips_exports);
})();
