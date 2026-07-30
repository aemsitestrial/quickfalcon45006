/* eslint-disable */
/* global WebImporter */
/**
 * Parser for variant: accordion-guide
 * Base block: accordion
 * Source: https://co.my.xcelenergy.com/s/residential/tips (c-xeg-expand-collapse-v2)
 * Convention: 2 columns, multiple rows. Each row = one accordion item: [label, body].
 * Model item (accordion-guide-item): label (richtext), body (richtext).
 *
 * NOTE: The Salesforce c-xeg-expand-collapse component lazy-renders each panel
 * body only when the item is expanded, so the collapsed scrape never captured
 * the bodies. The real body content (verified by expanding each item on the live
 * page) is baked in below as a label->HTML lookup so the import is reproducible.
 * Generated: 2026-07-30 (bodies captured 2026-07-30)
 */

const BODIES = {
  'Heating and Cooling Your Home': '<h4><strong>Staying Warm</strong></h4><p><strong>Thermostats</strong></p><ul><li>Bundle up before turning the heat up. You can save 1% of your total heating bill for every degree you set back your thermostat.</li><li>Turn down your thermostat when using your fireplace to keep your fireplace from drawing heat out of the room. Also, keep your fireplace flue damper tightly closed when not in use.</li><li>Buy a programmable or smart thermostat. They can help you save up to $180 a year by adjusting the temperature when you\'re at work, away, or asleep.</li></ul><p><strong>Furnaces, Vents and Heaters</strong></p><ul><li>Replace or clean your furnace filter every three months or when it looks dirty. A clogged filter can cause your system to work less efficiently.</li><li>Some additional maintenance tips: Vacuum vent covers, peel back accumulated layers of paint, dust radiator fins for better heat distribution, get an annual tune-up to check efficiency, and bleed radiators annually for your furnace and boiler.</li><li>Heat a smaller area when you\'re in one place for a while, either by closing vents in unused rooms or turning down the heat in some areas if you have a zoned home.</li><li>Use space heaters wisely by directing heaters towards people, not spaces, and keeping flammable materials away.</li></ul><p><strong>Bonus Tips</strong></p><ul><li>Keep interior doors open to help air circulate and maintain constant heat levels.</li><li>Plant some trees. Strategically placed on the north side of your property, dense evergreen trees or shrubs can function as a windbreak and reduce annual home heating costs by 10 to 15%.</li></ul><h4><strong>Staying Cool</strong></h4><p><strong>Air Conditioners</strong></p><ul><li>Use AC in your most needed rooms, like your bedroom, to reduce electric use.</li><li>Have your air conditioner coils cleaned to improve efficiency and save energy.</li><li>Position trees and shrubs to shade your AC unit and help it run up to 10% more efficiently.</li></ul><p><strong>Thermostats</strong></p><ul><li>Buy a programmable or smart thermostat. They can help you save up to $180 a year by adjusting the temperature when you\'re at work, away, or asleep.</li></ul><p><strong>Around the House</strong></p><ul><li>Keep interior doors open to help air circulate more freely and maintain constant cooling levels.</li><li>Open windows to create natural ventilation and airflow throughout your home.</li><li>If your basement is an enjoyable place to be, hang out there when you can. It\'s naturally cooler, so you can run your AC less.</li></ul><p><strong>Bonus Tips</strong></p><ul><li>Plant more trees. Carefully positioned trees can save up to 25% of cooling energy. Summer temperatures can be three to six degrees cooler in tree-shaded neighborhoods, so you\'ll help your neighbors too.</li><li>Install ceiling fans to keep cool air circulating, so you can turn down your AC. Ceiling fans can make temperatures feel up to eight degrees cooler. ENERGY STAR® rated ceiling fans offer the best efficiency ratings. Make sure to turn off your fan when you leave the room.</li><li>When it\'s time to replace your roof, consider installing a white roof or lighter-color shingles to help reflect heat away.</li></ul>',
  'Energy Proofing Your Home': '<p><strong>Windows and Doors</strong></p><ul><li>Use insulating window treatments to slow down heat loss in the winter and heat gain in the summer.</li><li>Install storm windows. They\'re a great insulator and help seal openings that create drafts.</li><li>When buying new windows, here are a few things to consider:<ul><li>Multiple panes are best. Double-pane, triple-pane, and even quadra-pane windows are available.</li><li>Use gas fillings to fill the space between panes. It\'s like invisible insulation because it\'s clear and doesn\'t conduct heat as quickly as air.</li><li>Get special coatings that reflect infrared heat back into your home, preventing it from escaping via the window.</li></ul></li><li>New exterior doors with insulation will keep energy in. Wood doors with foam filling work best.</li></ul><p><strong>Insulation and Air Leaks</strong></p><ul><li>Invest in high-quality insulation to help keep cool or warm air inside our home. Placing high R-value insulation in the cavities of your home slows the flow of heat through walls, floors, and ceilings.</li><li>Get a home x-ray. Thermal imaging of your exterior can reveal leaks and locations of poor insulation.</li><li>Have a qualified contractor seal air leaks with fire-resistant materials. Foam sealant works best on larger gaps and windows, baseboards, and other places where air may leak.</li><li>Here are some more leak-sealing hacks<ul><li>Seal air leaks where plumbing or electrical wiring comes through walls, floors, ceilings, and soffits over cabinets.</li><li>Find and seal drafts around doors and windows, fireplace dampers, and other places where air might escape.</li><li>Pure silicone works well for caulking seams in ducts and areas exposed to high temperatures.</li><li>Installing foam gaskets behind electric outlets and switch plates on walls will seal leaks.</li></ul></li></ul><p><strong>Bonus Tips</strong></p><ul><li>Your attic works like a hat for your home, helping it keep warm in the winter and cool in the summer. A qualified contractor can help ensure your attic has proper venting and vapor barriers.</li><li>Look into using solar panels for generating electricity or hot water if you live in a sunny area. If rooftop solar isn\'t right for you, explore the other <a href="https://co.my.xcelenergy.com/s/renewable">renewable options</a> available for you.</li><li>Have you heard of green roofs? They provide great insulation, help soak up rain and are environmentally friendly.</li><li>A ground source heat pump can deliver heating efficiencies 50% to 70% higher than many conventional heating systems and can provide cooling efficiencies 20% to 40% higher than available air conditioners.</li></ul>',
  'Daily Household Chores': '<p><strong>Food Prep</strong></p><ul><li>Which cooking appliance should you use for dinner tonight? This is the order of appliances from least amount of energy used to most: microwave, toaster oven, stovetop, oven. Note: This is simply a guideline as appliances can vary in energy usage.</li><li>Speaking of ovens, try using convection ovens. They can use up to 40% less electricity than a regular electric oven.</li><li>Glass or ceramic pans heat up faster than metal pans to save on baking time.</li><li>Cover your kitchen exhaust fan when not in use and prevent air leaks.</li><li>Turn off the oven 10 minutes before the end of cooking. The oven will retain the temperature, and you\'ll avoid over-cooking.</li><li>In the summer, cooking outside can reduce extra heat buildup in your kitchen.</li><li>Putting leftovers in sealed containers helps prevent moisture from escaping and causing your fridge to run less efficiently.</li></ul><p><strong>Washing Dishes</strong></p><ul><li>Newer dishwashers with internal heaters and load sensors can use 25% less energy.</li><li>Not using heat in the drying cycle can save up to 20% of your dishwasher\'s total electricity use.</li><li>Low-flow water faucets and <a target="_blank" href="https://www.poweredbyefi.org/xcelenergyco/energy-efficient-home/water-products/aerator.html">faucet aerators</a> can help reduce hot water consumption and save energy. Faucet aerators can reduce your water flow from the usual 2.2 to as low as .5 gallons per minute, saving you on hot water use while still providing the water flow you need.</li></ul><p><strong>Doing Laundry</strong></p><ul><li>Using cool settings on your washing machine saves hot water and energy.</li><li>Add tennis balls to your dryer to help clothes dry faster and save energy.</li><li>Save using your dryer by hanging laundry out to dry in nicer weather.</li></ul>',
  'Using Lights and Water': '<p><strong>Lights</strong></p><ul><li>LED light bulbs are worth the investment—they\'re energy efficient and can save you money over their lifetime. Before you head to the store, check out our <a href="https://co.my.xcelenergy.com/s/residential/home-rebates/home-lighting">bulb deals</a> for some big discounts.</li><li>When choosing an LED wattage, pick one that\'s about 1/4 of what you usually buy for an incandescent bulb.</li><li>Recycle your CFLs for free. They contain mercury and need to be disposed of properly. We offer <a href="https://co.my.xcelenergy.com/s/residential/home-rebates/home-lighting">free recycling of CFL bulbs</a> at participating locations. LED bulbs do not need to be recycled.</li><li>Use outdoor motion detection lighting so you only use energy when you need it.</li><li>Always unplug cords from outlets when not in use and use power strips to easily turn power on and off.</li></ul><p><strong>Water</strong></p><ul><li>Lowering your water heater’s temperature by 10 degrees can save you 3% to 5% on heating costs, but be sure to keep it set to at least 120 degrees.</li><li>Low-flow <a target="_blank" href="https://www.poweredbyefi.org/xcelenergyco/energy-efficient-home/water-products/showerhead.html">shower heads and water faucets</a> can help reduce hot water consumption and save energy. Faucet aerators can reduce your water flow from 2.2 to as low as .5 gallons per minute, reducing hot water use while still providing the flow you need.</li><li>Invest in a water heater insulation blanket. It can save you 7% to 16% in water heating costs and pay for itself in about a year.</li><li>When it\'s time to replace your water heater, go on-demand! Natural gas on-demand or tankless water heaters can save up to 35% for smaller households and 18% for larger households.</li><li>Install a drain-water waste heat recovery system to capture energy from waste hot water to preheat cold water entering the water heater.</li><li>Install an under-the-sink, on-demand water heater in your kitchen to save energy by using it only when you need it.</li></ul>',
};

export default function parse(element, { document }) {
  // Each source <li> contains a <c-xeg-expand-collapse-item>. Selecting both
  // double-counts every item, so anchor on the item element and fall back to
  // <li> only when no item element is present.
  let items = element.querySelectorAll('c-xeg-expand-collapse-item');
  if (items.length === 0) {
    items = element.querySelectorAll(':scope > ul > li, li');
  }

  const cells = [];
  items.forEach((item) => {
    // Label/title: the visible toggle text (inner <span>), fall back to heading.
    const heading = item.querySelector('h3, h2, h4, [class*="h5"], [class*="h4"]');
    const span = item.querySelector('a .toggle span, a span, .toggle span, span');
    const labelText = (span && span.textContent.trim())
      || (heading && heading.textContent.trim())
      || '';

    if (!labelText) return; // skip empty items

    const labelCell = [document.createComment(' field:label ')];
    const labelPara = document.createElement('p');
    labelPara.textContent = labelText;
    labelCell.push(labelPara);

    // Body/content: pulled from the baked-in lookup (lazy-loaded on the source).
    const bodyCell = [document.createComment(' field:body ')];
    const bodyHTML = BODIES[labelText];
    if (bodyHTML) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = bodyHTML;
      bodyCell.push(...wrapper.childNodes);
    }

    cells.push([labelCell, bodyCell]);
  });

  // Empty-block guard
  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-guide', cells });

  // The section heading ("Next-Level Energy Saving") and intro paragraph are
  // direct children of the block element, so replaceWith would destroy them.
  // Preserve them as default content emitted before the block.
  const preserved = [];
  const heading = element.querySelector(':scope > .header h2, :scope > h2, h2');
  if (heading && heading.textContent.trim()) {
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent.trim();
    preserved.push(h2);
  }
  const intro = element.querySelector(':scope > .header p, .paragraph-text');
  if (intro && intro.textContent.trim()) {
    const p = document.createElement('p');
    p.textContent = intro.textContent.trim();
    preserved.push(p);
  }

  if (preserved.length) {
    element.replaceWith(...preserved, block);
  } else {
    element.replaceWith(block);
  }
}
