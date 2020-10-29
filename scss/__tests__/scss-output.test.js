/**
 * @jest-environment node
 */
/* eslint-env jest */
const sass = require('sass');

/**
 * @seee https://obyford.com/posts/testing-sass-with-jest/
 */
function renderSass(options) {
  return sass.renderSync({
    includePaths: ['scss/'],
    ...options,
  });
}

test.each([
  'scss/2-tools/tools-imports.scss',
  'scss/1-settings/settings-imports.scss',
])('%p does not output CSS', (file) => {
  const output = renderSass({ file });
  expect(output.css.toString()).toEqual('');
});

test('grid styles match snapshot', () => {
  const output = renderSass({ file: 'scss/5-objects/_grid.scss' });
  expect(output.css.toString()).toMatchSnapshot();
});
