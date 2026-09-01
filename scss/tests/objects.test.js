const { test, snapshot } = require("node:test");
const sass = require("sass");
const prettier = require("prettier");

test("grid styles match snapshot", async (t) => {
  const output = sass.compile(`scss/5-objects/_grid.scss`);

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
