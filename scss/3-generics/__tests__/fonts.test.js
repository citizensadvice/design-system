/* eslint-env jest */
const sass = require('sass');

test('icon font is included by default', () => {
  const output = sass
    .renderSync({
      data: `@import 'scss/lib';`,
    })
    .css.toString();
  expect(output).toContain('cads.woff');
});

test('icon font is included by default', () => {
  const output = sass
    .renderSync({
      data: `$cads-enable-icon-font: false;
        @import 'scss/lib';`,
    })
    .css.toString();
  expect(output).not.toContain('cads.woff');
});
