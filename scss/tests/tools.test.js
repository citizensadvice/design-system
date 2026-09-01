const { describe, test } = require("node:test");
const sass = require("sass");
const path = require("path");

test("importing tools does not output css", (t) => {
  const output = sass.compile(`scss/2-tools/tools-imports.scss`, {
    logger: sass.Logger.silent,
  });
  t.assert.strictEqual(output.css, "");
});

describe("animations", () => {
  test("cads-transition-animation", (t) => {
    const output = sass
      .compileString(
        `@use 'scss/2-tools/animation';
        .example { @include animation.cads-transition-animation(); }
        .example-custom { @include animation.cads-transition-animation(color); }`,
        {
          loadPaths: [path.resolve(__dirname, "../../")],
          logger: sass.Logger.silent,
        },
      )
      .css.toString();
    t.assert.match(output, /transition-property: background, border;/);
    t.assert.match(output, /transition-property: color;/);
  });
});

describe("grid", () => {
  test("grid mixins output expected widths", (t) => {
    [
      [1, "8.3333333333%"],
      [2, "16.6666666667%"],
      [3, "25%"],
      [4, "33.3333333333%"],
      [5, "41.6666666667%"],
      [6, "50%"],
      [7, "58.3333333333%"],
      [8, "66.6666666667%"],
      [9, "75%"],
      [10, "83.3333333333%"],
      [11, "91.6666666667%"],
      [12, "100%"],
    ].forEach(([cols, expected]) => {
      const data = `
        @use 'scss/2-tools/grid';

        .foo {
          width: grid.cads-grid-col-width(${cols});
        }
      `;

      const result = sass.compileString(data, {
        loadPaths: [path.resolve(__dirname, "../../")],
        logger: sass.Logger.silent,
      });

      t.assert.match(result.css.toString(), new RegExp(`width: ${expected};`));
    });
  });

  test("throws error when an invalid column count is provided", (t) => {
    t.assert.throws(
      () => {
        const data = `
        @use 'scss/2-tools/grid';

        .foo {
          width: grid.cads-grid-col-width(13);
        }
      `;
        sass.compileString(data, {
          loadPaths: [path.resolve(__dirname, "../../")],
          logger: sass.Logger.silent,
        });
      },
      {
        message: /Column count can't be greater than/,
      },
    );
  });
});

describe("typography", () => {
  test("can use typography mixins standalone", (t) => {
    // We don't need to test the output as these are flat mixins,
    // but we do want to know they can be called standalone without errors.
    t.assert.doesNotThrow(() => {
      sass
        .compileString(
          `
          @use 'scss/2-tools/typography';
          .example { @include typography.cads-typographic-scale-text(); }
          .example-small { @include typography.cads-typographic-scale-text-small(); }
          .adjacent { @include typography.cads-adjacent-heading-margin(2em); }`,
          {
            loadPaths: [path.resolve(__dirname, "../../")],
            logger: sass.Logger.silent,
          },
        )
        .css.toString();
    });
  });
});
