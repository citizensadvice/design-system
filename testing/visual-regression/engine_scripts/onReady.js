module.exports = async (page, scenario) => {
  console.log('SCENARIO > ' + scenario.label);

  // Enable prefers-reduced-motion to disable animations
  await page.emulateMediaFeatures([
    { name: 'prefers-reduced-motion', value: 'reduce' },
  ]);

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

  const postInteractionWait = scenario.postInteractionWait; // selector [str] | ms [int]
  if (postInteractionWait) {
    await page.waitFor(postInteractionWait);
  }

  const scrollToSelector = scenario.scrollToSelector;
  if (scrollToSelector) {
    await page.waitFor(scrollToSelector);
    await page.evaluate((scrollToSelector) => {
      document.querySelector(scrollToSelector).scrollIntoView();
    }, scrollToSelector);
  }
};
