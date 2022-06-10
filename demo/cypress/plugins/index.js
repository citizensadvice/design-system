/// <reference types="cypress" />

const htmlValidate = require('cypress-html-validate/dist/plugin');

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  htmlValidate.install(on, {
    // We only test against partial components,
    // so only run recommended profile not full document profile.
    extends: ['html-validate:recommended'],
  });

  // https://github.com/component-driven/cypress-axe#using-the-violationcallback-argument
  on('task', {
    log(message) {
      console.log(message);

      return null;
    },
    table(message) {
      console.table(message);

      return null;
    },
  });
};
