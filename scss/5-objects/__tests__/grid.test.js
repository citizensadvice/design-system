/* eslint-env jest */
const sass = require('sass');

test('grid styles match snapshot', () => {
  const output = sass.renderSync({
    file: 'scss/5-objects/_grid.scss',
  });
  expect(output.css.toString()).toMatchSnapshot();
});
