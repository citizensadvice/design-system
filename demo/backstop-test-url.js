/**
 * In order to reliably run backstop in CI we need to know a real
 * component preview URL to wait on, ideally the first one in the list.
 * To avoid hardcoding this, output the first URL from the config to use
 * in the backstop:ci npm script.
 * See https://github.com/citizensadvice/design-system/pull/2210
 */
const backstopConfigCommon = require('./backstop-common');
const config = backstopConfigCommon('http://localhost:3001');
const firstUrl = config.scenarios[0].url;

console.log(firstUrl);
