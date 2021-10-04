/* eslint-env jest */
const glob = require('glob');
const sass = require('sass');

test('importing settings does not output css', () => {
  const output = sass.renderSync({
    file: 'scss/1-settings/settings-imports.scss',
  });
  expect(output.css.toString()).toEqual('');
});

test.each(glob.sync('scss/1-settings/_*.scss'))(
  '%p can be imported standalone',
  (file) => {
    expect(() =>
      sass.renderSync({
        includePaths: ['scss/'],
        file,
      })
    ).not.toThrow();
  }
);
