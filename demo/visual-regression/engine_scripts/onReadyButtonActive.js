const forcePseudoState = require("./helpers/forcePseudoState");

module.exports = async (page) => {
  // Enable prefers-reduced-motion to disable animations
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);

  await forcePseudoState({ page, selector: "button", pseudoClass: "active" });
};
