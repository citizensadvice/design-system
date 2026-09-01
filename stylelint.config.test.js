const { test } = require("node:test");
const stylelintConfig = require("./stylelint.config");

test("internal naming matches expected conventions", (t) => {
  [
    stylelintConfig.rules["scss/at-function-pattern"],
    stylelintConfig.rules["scss/at-mixin-pattern"],
    stylelintConfig.rules["scss/dollar-variable-pattern"][0],
    stylelintConfig.rules["scss/percent-placeholder-pattern"][0],
  ].forEach((pattern) => {
    const regex = new RegExp(pattern);

    const validNames = ["cads-prefixed"];
    validNames.forEach((name) => {
      t.assert.strictEqual(regex.test(name), true);
    });

    const invalidNames = [
      "no-prefix",
      "cadsButIncorrectCase",
      "just__dOwNrIGht--Odd",
    ];
    invalidNames.forEach((name) => {
      t.assert.strictEqual(regex.test(name), false);
    });
  });
});

test("css selectors match expected conventions", (t) => {
  const regex = new RegExp(stylelintConfig.rules["selector-class-pattern"][0]);

  const validNames = [
    "cads-prefixed",
    "cads-prefixed__child",
    "cads-prefixed--modifier",
    "cads-prefixed-number-1",
    // No JavaScript class is special cased
    "no-js",
  ];
  validNames.forEach((name) => {
    t.assert.strictEqual(regex.test(name), true);
  });

  const invalidNames = [
    "no-prefix",
    "cadsButIncorrectCase",
    "just__dOwNrIGht--Odd",
  ];
  invalidNames.forEach((name) => {
    t.assert.strictEqual(regex.test(name), false);
  });
});
