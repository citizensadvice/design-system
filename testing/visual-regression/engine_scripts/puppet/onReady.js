module.exports = async (page, scenario) => {
  console.log('SCENARIO > ' + scenario.label);

  // Enable prefers-reduced-motion to disable animations
  await page.emulateMediaFeatures([
    { name: 'prefers-reduced-motion', value: 'reduce' },
  ]);

  await require('./clickAndHoverHelper')(page, scenario);
};
