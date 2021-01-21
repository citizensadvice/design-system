// onBefore example (puppeteer engine)
module.exports = async (page) => {
  // Example: set user agent
  await page.emulateMediaType('print');
};
