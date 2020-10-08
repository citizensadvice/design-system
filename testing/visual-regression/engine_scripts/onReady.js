/* eslint-disable no-console */
module.exports = async (page, scenario) => {
  console.log(`SCENARIO > ${scenario.label}`);

  // Enable prefers-reduced-motion to disable animations
  await page.emulateMediaFeatures([
    { name: 'prefers-reduced-motion', value: 'reduce' },
  ]);

  /**
   * Wait for fonts to be loaded.
   * Ensure that icon fonts are ready to avoid display inconsitencies
   */
  await page.waitFor(() =>
    document.fonts.ready.then(() => {
      console.log('Fonts loaded');
      return true;
    })
  );

  const keyPressSelector =
    scenario.keyPressSelectors || scenario.keyPressSelector;
  if (keyPressSelector) {
    [].concat(keyPressSelector).forEach(async (keyPressSelectorItem) => {
      await page.waitFor(keyPressSelectorItem.selector);
      await page.type(
        keyPressSelectorItem.selector,
        keyPressSelectorItem.keyPress
      );
    });
  }

  const hoverSelector = scenario.hoverSelectors || scenario.hoverSelector;
  if (hoverSelector) {
    [].concat(hoverSelector).forEach(async (hoverSelectorItem) => {
      await page.waitFor(hoverSelectorItem);
      await page.hover(hoverSelectorItem);
    });
  }

  const clickSelector = scenario.clickSelectors || scenario.clickSelector;
  if (clickSelector) {
    [].concat(clickSelector).forEach(async (clickSelectorItem) => {
      await page.waitFor(clickSelectorItem);
      await page.hover(clickSelectorItem);
    });
  }

  const { postInteractionWait } = scenario; // selector [str] | ms [int]
  if (postInteractionWait) {
    await page.waitFor(postInteractionWait);
  }

  const { scrollToSelector } = scenario;
  if (scrollToSelector) {
    await page.waitFor(scrollToSelector);
    await page.evaluate((_scrollToSelector) => {
      document.querySelector(_scrollToSelector).scrollIntoView();
    }, scrollToSelector);
  }
};
