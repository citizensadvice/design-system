/**
 * @jest-environment node
 */
/* eslint-env jest */
const globby = require('globby');
const renderSass = require('../../scripts/render-sass');

test.each(globby.sync('scss/2-tools/*.scss'))(
  '%p does not output CSS',
  (file) => {
    const output = renderSass({ file });
    expect(output.css.toString()).toEqual('');
  }
);

test('grid styles match snapshot', () => {
  const output = renderSass({ file: 'scss/5-objects/_grid.scss' });
  expect(output.css.toString()).toMatchSnapshot();
});
