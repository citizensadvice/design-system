const { test } = require("node:test");
const { globSync } = require("node:fs");
const sass = require("sass");

test("importing settings does not output css", (t) => {
  const output = sass.compile("scss/1-settings/settings-imports.scss", {
    logger: sass.Logger.silent,
  });
  t.assert.strictEqual(output.css, "");
});

test("settings can be imported standalone", (t) => {
  const settingsFiles = globSync("scss/1-settings/_*.scss");
  settingsFiles.forEach((file) => {
    t.assert.doesNotThrow(() => {
      sass.compile(file, { logger: sass.Logger.silent });
    });
  });
});
