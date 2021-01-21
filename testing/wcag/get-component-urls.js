const backstopConfigCommon = require('../visual-regression/backstop-common');

// Extracts urls from backstop testing scenarios, replaces host as directed
module.exports = function getComponentUrls(baseUrl) {
  const urls = backstopConfigCommon(baseUrl).scenarios.filter(scenario => !scenario.exlcudeFromA11yTest).map(
    (scenario) => scenario.url
  );

  // Use a Set to ensure list of URLs is unique
  // Backstop may use the same URL twice for multiple tests
  return Array.from(new Set(urls));
};
