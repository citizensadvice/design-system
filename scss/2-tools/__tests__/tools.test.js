/* eslint-env jest */
const sass = require('sass');

test('importing tools does not output css', () => {
  const output = sass.renderSync({
    file: 'scss/2-tools/tools-imports.scss',
  });
  expect(output.css.toString()).toEqual('');
});
