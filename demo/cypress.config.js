const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: false,
  trashAssetsBeforeRuns: false,
  e2e: {
    setupNodeEvents(on, _config) {
      // https://github.com/component-driven/cypress-axe#using-the-violationcallback-argument
      on("task", {
        log(message) {
          console.log(message);

          return null;
        },
        table(message) {
          console.table(message);

          return null;
        },
      });
    },
  },
});
