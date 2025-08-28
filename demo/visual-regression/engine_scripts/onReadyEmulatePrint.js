module.exports = async (page) => {
  await page.emulateMediaType("print");
};
