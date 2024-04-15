/* eslint-env jest */
const sass = require('sass');
const path = require('path');

test('importing tools does not output css', () => {
  const output = sass.compile(`scss/2-tools/tools-imports.scss`);
  expect(output.css.toString()).toEqual('');
});

describe('animation', () => {
  test('cads-transition-animation', () => {
    const output = sass
      .compileString(
        `@use 'scss/2-tools/animation';
        .example { @include animation.cads-transition-animation(); }
        .example-custom { @include animation.cads-transition-animation(color); }`,
        { loadPaths: [path.resolve(__dirname, '../../')] },
      )
      .css.toString();
    expect(output).toContain('transition-property: background, border;');
    expect(output).toContain('transition-property: color;');
  });
});

describe('grid', () => {
  test.each([
    [1, '8.3333333333%'],
    [2, '16.6666666667%'],
    [3, '25%'],
    [4, '33.3333333333%'],
    [5, '41.6666666667%'],
    [6, '50%'],
    [7, '58.3333333333%'],
    [8, '66.6666666667%'],
    [9, '75%'],
    [10, '83.3333333333%'],
    [11, '91.6666666667%'],
    [12, '100%'],
  ])('outputs width for %i columns', (cols, expected) => {
    const data = `
      @use 'scss/2-tools/grid';

      .foo {
        width: grid.cads-grid-col-width(${cols});
      }
    `;

    const result = sass.compileString(data, {
      loadPaths: [path.resolve(__dirname, '../../')],
    });
    expect(result.css.toString()).toContain(`width: ${expected};`);
  });

  test('throws error when an invalid column count is provided', () => {
    const data = `
      @use 'scss/2-tools/grid';

      .foo {
        width: grid.cads-grid-col-width(13);
      }
    `;

    expect(() =>
      sass.compileString(data, {
        loadPaths: [path.resolve(__dirname, '../../')],
      }),
    ).toThrow(`Column count can't be greater than $cads-grid-columns`);
  });
});

describe('typography', () => {
  test('can use typography mixins standalone', () => {
    // We don't need to test the output as these are flat mixins,
    // but we do want to know they can be called standalone without errors.
    expect(() =>
      sass
        .compileString(
          `
        @use 'scss/2-tools/typography';
        .example { @include typography.cads-typographic-scale-text(); }
        .example-small { @include typography.cads-typographic-scale-text-small(); }
        .adjacent { @include typography.cads-adjacent-heading-margin(2em); }`,
          {
            loadPaths: [path.resolve(__dirname, '../../')],
          },
        )
        .css.toString(),
    ).not.toThrow();
  });
});
