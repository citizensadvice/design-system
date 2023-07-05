/* eslint-env jest */
const glob = require('glob');
const sass = require('sass');

test.each(glob.sync('scss/7-utilities/_*.scss'))(
  '%p can be imported standalone',
  (file) => {
    expect(() =>
      sass.renderSync({
        includePaths: ['scss/'],
        file,
      }),
    ).not.toThrow();
  },
);

test('visibility styles match snapshot', () => {
  const output = sass.renderSync({
    file: 'scss/7-utilities/_visibility.scss',
  });
  expect(output.css.toString()).toMatchSnapshot();
});
