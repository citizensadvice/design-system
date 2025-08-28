/**
 * In order to reliably run backstop in CI we need to know a real
 * component preview URL to wait on, ideally the first one in the list.
 * To avoid hardcoding this, output the first URL from the config to use
 * in the backstop:local npm script.
 */
const backstopConfigCommon = require("./backstop-common");
const backstopConfig = backstopConfigCommon("http://localhost:3000");
const firstUrl = backstopConfig.scenarios[0].url;

console.log(firstUrl);
