const forcePseudoState = require('./helpers/forcePseudoState');

module.exports = async (page) => {
  // Enable prefers-reduced-motion to disable animations
  await page.emulateMediaFeatures([
    { name: 'prefers-reduced-motion', value: 'reduce' },
  ]);

  /**
   * Wait for fonts to be loaded.
   * Ensure that icon fonts are ready to avoid display inconsistencies
   */
  await page.waitFor(() =>
    document.fonts.ready.then(() => {
      console.log('Fonts loaded');
      return true;
    })
  );

  await forcePseudoState({ page, selector: 'button', pseudoClass: 'active' });
};
