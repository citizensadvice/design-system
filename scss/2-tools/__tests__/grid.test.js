/* eslint-env jest */
const sass = require('sass');

describe('cads-grid-col-width', () => {
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

    const result = sass.renderSync({ data });
    expect(result.css.toString()).toContain(`width: ${expected};`);
  });

  test('throws error when an invalid column count is provided', () => {
    const data = `
      @use 'scss/2-tools/grid';

      .foo {
        width: grid.cads-grid-col-width(13);
      }
    `;

    expect(() => sass.renderSync({ data })).toThrow(
      `Column count can't be greater than $cads-grid-columns`,
    );
  });
});
