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
