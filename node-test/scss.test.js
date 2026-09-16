const { globSync } = require("node:fs");
const { describe, test, snapshot } = require("node:test");
const path = require("path");
const sass = require("sass");

// Update snapshots with node --test --test-update-snapshots
// Prevents node:test from escaping string newlines into a single JSON line
const stringify = (value) =>
  typeof value === "string" ? value : JSON.stringify(value, null, 2);
snapshot.setDefaultSnapshotSerializers([stringify]);

const compileEntrypoint = (path) => sass.compile(path).css.toString();

const compileString = (source) =>
  sass
    .compileString(source, {
      loadPaths: [path.resolve(__dirname, "../")],
    })
    .css.toString();

describe("generics", () => {
  test("default font-path", (t) => {
    const output = compileEntrypoint("scss/lib.scss");
    t.assert.match(output, /url\("\.\/open-sans/);
  });

  test("with custom font-path", (t) => {
    const output = compileString(
      `$cads-font-path: "/assets/custom";
      @import "scss/lib";`,
    );
    t.assert.match(output, /url\("\/assets\/custom/);
  });
});

describe("objects", () => {
  test("grid styles match snapshot", async (t) => {
    const output = compileEntrypoint(`scss/5-objects/_grid.scss`);
    t.assert.snapshot(output);
  });
});

describe("settings", () => {
  test("importing settings does not output css", (t) => {
    const output = compileEntrypoint("scss/1-settings/settings-imports.scss");
    t.assert.strictEqual(output, "");
  });

  test("settings can be imported standalone", (t) => {
    const settingsFiles = globSync("scss/1-settings/_*.scss");
    settingsFiles.forEach((file) => {
      t.assert.doesNotThrow(() => {
        compileEntrypoint(file);
      });
    });
  });
});

describe("tools", () => {
  test("importing tools does not output css", (t) => {
    const output = compileEntrypoint(`scss/2-tools/tools-imports.scss`);
    t.assert.strictEqual(output, "");
  });

  test("cads-transition-animation", (t) => {
    const output = compileString(
      `@use 'scss/2-tools/animation';
        .example { @include animation.cads-transition-animation(); }
        .example-custom { @include animation.cads-transition-animation(color); }`,
    );
    t.assert.match(output, /transition-property: background, border;/);
    t.assert.match(output, /transition-property: color;/);
  });

  test("grid mixins output expected widths", (t) => {
    const expectColumnWidth = (column, width) => {
      const data = `@use 'scss/2-tools/grid';
        .foo { width: grid.cads-grid-col-width(${column}); }`;
      const result = compileString(data);
      t.assert.match(result, new RegExp(`width: ${width};`));
    };

    expectColumnWidth(1, "8.3333333333%");
    expectColumnWidth(2, "16.6666666667%");
    expectColumnWidth(3, "25%");
    expectColumnWidth(4, "33.3333333333%");
    expectColumnWidth(5, "41.6666666667%");
    expectColumnWidth(6, "50%");
    expectColumnWidth(7, "58.3333333333%");
    expectColumnWidth(8, "66.6666666667%");
    expectColumnWidth(9, "75%");
    expectColumnWidth(10, "83.3333333333%");
    expectColumnWidth(11, "91.6666666667%");
    expectColumnWidth(12, "100%");
  });

  test("throws error when an invalid column count is provided", (t) => {
    t.assert.throws(
      function () {
        const data = `@use 'scss/2-tools/grid';
        .foo { width: grid.cads-grid-col-width(13); }`;
        compileString(data);
      },
      {
        message: /Column count can't be greater than/,
      },
    );
  });

  test("can use typography mixins standalone", (t) => {
    // We don't need to test the output as these are flat mixins,
    // but we do want to know they can be called standalone without errors.
    t.assert.doesNotThrow(() => {
      const data = `@use 'scss/2-tools/typography';
      .example { @include typography.cads-typographic-scale-text(); }
      .example-small { @include typography.cads-typographic-scale-text-small(); }
      .adjacent { @include typography.cads-adjacent-heading-margin(2em); }`;

      compileString(data);
    });
  });
});

describe("utilities", () => {
  test("utilities can be imported standalone", (t) => {
    globSync("scss/7-utilities/_*.scss").forEach((file) => {
      t.assert.doesNotThrow(() => {
        compileEntrypoint(file);
      });
    });
  });

  test("visibility styles match snapshot", async (t) => {
    const output = compileEntrypoint("scss/7-utilities/_visibility.scss");
    t.assert.snapshot(output);
  });
});
