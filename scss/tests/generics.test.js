const { test } = require("node:test");
const sass = require("sass");
const path = require("path");

test("default font-path", (t) => {
  // Compile against top-level entrypoint as we're testing settings
  const output = sass
    .compile("scss/lib.scss", {
      logger: sass.Logger.silent,
    })
    .css.toString();

  t.assert.match(output, /url\("\.\/open-sans/);
});

test("with custom font-path", (t) => {
  // Compile against top-level entrypoint as we're testing settings
  const output = sass
    .compile(path.resolve(__dirname, "./fixtures/with-custom-font-path.scss"), {
      logger: sass.Logger.silent,
    })
    .css.toString();

  t.assert.match(output, /url\("\/assets\/custom/);
});
