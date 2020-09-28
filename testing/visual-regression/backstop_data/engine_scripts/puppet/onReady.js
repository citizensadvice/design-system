module.exports = async (page, scenario) => {
  console.log('SCENARIO > ' + scenario.label);
  await require('./overrideCSS')(page, scenario);
  await require('./clickAndHoverHelper')(page, scenario);

  /**
   * Wait for fonts to be loaded.
   * Ensure that icon fonts are ready to avoid display inconsitencies
   */
  await page.waitFor(() => {
    return document.fonts.ready.then(() => {
      console.log('Fonts loaded');
      return true;
    });
  });
};
