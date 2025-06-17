const sass = require('sass');

test('grid styles match snapshot', () => {
  const output = sass.compile(`scss/5-objects/_grid.scss`);
  expect(output.css.toString({ logger: sass.Logger.silent })).toMatchSnapshot();
});
