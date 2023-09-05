/* eslint-env jest */
const { globSync } = require('glob');
const sass = require('sass');

test('importing settings does not output css', () => {
  const output = sass.renderSync({
    file: 'scss/1-settings/settings-imports.scss',
  });
  expect(output.css.toString()).toEqual('');
});

test.each(globSync('scss/1-settings/_*.scss'))(
  '%p can be imported standalone',
  (file) => {
    expect(() =>
      sass.renderSync({
        includePaths: ['scss/'],
        file,
      }),
    ).not.toThrow();
  },
);
