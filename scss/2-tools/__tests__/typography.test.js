/* eslint-env jest */
const sass = require('sass');

test('can use typography mixins standalone', () => {
  // We don't need to test the output as these are flat mixins,
  // but we do want to know they can be called standalone without errors.
  expect(() =>
    sass
      .renderSync({
        data: `@use 'scss/2-tools/typography';
        .example { @include typography.cads-typographic-scale-text(); }
        .example-small { @include typography.cads-typographic-scale-text-small(); }
        .adjacent { @include typography.cads-adjacent-heading-margin(2em); }`,
      })
      .css.toString(),
  ).not.toThrow();
});
