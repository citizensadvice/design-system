/* eslint-env jest */
const { globSync } = require('glob');
const sass = require('sass');

test('importing settings does not output css', () => {
  const output = sass.compile('scss/1-settings/settings-imports.scss');
  expect(output.css).toEqual('');
});

test.each(globSync('scss/1-settings/_*.scss'))(
  '%p can be imported standalone',
  (file) => {
    expect(() => sass.compile(file)).not.toThrow();
  },
);
