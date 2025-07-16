const sass = require('sass');
const path = require('path');

test('default font-path', () => {
  // Compile against top-level entrypoint as we're testing settings
  const output = sass
    .compile('scss/lib.scss', {
      logger: sass.Logger.silent,
    })
    .css.toString();

  expect(output).toContain('url("./open-sans');
});

test('with custom font-path', () => {
  // Compile against top-level entrypoint as we're testing settings
  const output = sass
    .compile(
      path.resolve(__dirname, './__fixtures__/with-custom-font-path.scss'),
      { logger: sass.Logger.silent },
    )
    .css.toString();

  expect(output).toContain('url("/assets/custom');
});

test('icon font styles are excluded by default', () => {
  // Compile against top-level entrypoint as we're testing settings
  const output = sass
    .compile('scss/lib.scss', {
      logger: sass.Logger.silent,
    })
    .css.toString();

  expect(output).not.toContain('font-family: cads');
});

test('deprecated icon font styles can be enabled', () => {
  const output = sass
    .compile(
      path.resolve(__dirname, './__fixtures__/with-enabled-icon-font.scss'),
      // Use compressed style to make searching for @font-face easier
      { style: 'compressed', logger: sass.Logger.silent },
    )
    .css.toString();

  expect(output).toContain('@font-face{font-family:cads');
});
