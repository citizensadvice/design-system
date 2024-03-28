/* eslint-env jest */
/* eslint-disable import/no-extraneous-dependencies */
const sass = require('sass');

test('icon font styles are included by default', () => {
  const output = sass
    .renderSync({
      data: `@import 'scss/lib';`,
    })
    .css.toString();
  expect(output).toContain('font-family: cads');
});

test('icon font styles are included by default', () => {
  const output = sass
    .renderSync({
      data: `$cads-enable-icon-font: false;
        @import 'scss/lib';`,
    })
    .css.toString();
  expect(output).not.toContain('font-family: cads');
});
