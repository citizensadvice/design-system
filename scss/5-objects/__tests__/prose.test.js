/* eslint-env jest */
const sass = require('sass');

test('external link styles are included by default', () => {
  const output = sass
    .renderSync({
      data: `@import 'scss/lib';`,
    })
    .css.toString();
  expect(output).toContain('a[rel~=external]::after');
});

test('external link styles are included by default', () => {
  const output = sass
    .renderSync({
      data: `$cads-enable-external-link-icon: false;
        @import 'scss/lib';`,
    })
    .css.toString();
  expect(output).not.toContain('a[rel~=external]::after');
});
