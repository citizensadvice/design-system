const { test, snapshot } = require("node:test");
const { globSync } = require("node:fs");
const sass = require("sass");
const path = require("path");
const prettier = require("prettier");

test("utilities can be imported standalone", (t) => {
  const settingsFiles = globSync("scss/7-utilities/_*.scss");
  settingsFiles.forEach((file) => {
    t.assert.doesNotThrow(() => {
      sass.compile(file, {
        loadPaths: [path.resolve(__dirname, "../../")],
        logger: sass.Logger.silent,
      });
    });
  });
});

test("visibility styles match snapshot", async (t) => {
  const output = sass.compile("scss/7-utilities/_visibility.scss", {
    logger: sass.Logger.silent,
  });

  const prettyCss = await prettier.format(output.css.toString(), {
    parser: "css",
  });

  // Prevents node:test from escaping string newlines into a single JSON line
  snapshot.setDefaultSnapshotSerializers([
    (value) =>
      typeof value === "string" ? value : JSON.stringify(value, null, 2),
  ]);

  // Update snapshots with node --test --test-update-snapshots
  t.assert.snapshot(prettyCss);
});
