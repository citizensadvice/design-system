/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
module.exports = async (page, scenario) => {
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

  const keyPressSelector =
    scenario.keyPressSelectors || scenario.keyPressSelector;
  if (keyPressSelector) {
    for (const keyPressSelectorItem of [].concat(keyPressSelector)) {
      await page.waitFor(keyPressSelectorItem.selector);
      await page.type(
        keyPressSelectorItem.selector,
        keyPressSelectorItem.keyPress
      );
    }
  }

  const hoverSelector = scenario.hoverSelectors || scenario.hoverSelector;
  if (hoverSelector) {
    for (const hoverSelectorIndex of [].concat(hoverSelector)) {
      await page.waitFor(hoverSelectorIndex);
      await page.hover(hoverSelectorIndex);
    }
  }

  const clickSelector = scenario.clickSelectors || scenario.clickSelector;
  if (clickSelector) {
    for (const clickSelectorIndex of [].concat(clickSelector)) {
      await page.waitFor(clickSelectorIndex);
      await page.click(clickSelectorIndex);
    }
  }

  const focusSelector = scenario.focusSelectors || scenario.focusSelector;
  if (focusSelector) {
    for (const focusSelectorIndex of [].concat(focusSelector)) {
      await page.waitFor(focusSelectorIndex);
      await page.focus(focusSelectorIndex);
    }
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
