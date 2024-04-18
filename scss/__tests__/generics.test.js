/* eslint-env jest */
const sass = require('sass');
const path = require('path');

test('default font-path', () => {
  // Compile against top-level entrypoint as we're testing settings
  const output = sass.compile('scss/lib.scss').css.toString();

  expect(output).toContain('url("./open-sans');
});

test('with custom font-path', () => {
  // Compile against top-level entrypoint as we're testing settings
  const output = sass
    .compile(
      path.resolve(__dirname, './__fixtures__/with-custom-font-path.scss'),
    )
    .css.toString();

  expect(output).toContain('url("/assets/custom');
});

test('icon font styles are included by default', () => {
  // Compile against top-level entrypoint as we're testing settings
  const output = sass.compile('scss/lib.scss').css.toString();

  expect(output).toContain('font-family: cads');
});

test('icon font styles can be disabled', () => {
  const output = sass
    .compile(
      path.resolve(__dirname, './__fixtures__/with-disabled-icon-font.scss'),
      // Use compressed style to make searching for @font-face easier
      { style: 'compressed' },
    )
    .css.toString();

  expect(output).not.toContain('@font-face{font-family:cads');
});
