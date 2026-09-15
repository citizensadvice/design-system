const sass = require("sass");

test("grid styles match snapshot", () => {
  const output = sass.compile(`scss/5-objects/_grid.scss`);
  expect(output.css.toString({ logger: sass.Logger.silent })).toMatchSnapshot();
});

test("prose supports heading utility classes", () => {
  const output = sass.compile("scss/lib.scss", {
    logger: sass.Logger.silent,
  });

  for (const level of [1, 2, 3, 4]) {
    expect(output.css.toString()).toContain(`.cads-prose .cads-h${level}`);
  }
});
