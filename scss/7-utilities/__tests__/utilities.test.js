/* eslint-env jest */
const { globSync } = require('glob');
const sass = require('sass');

test.each(globSync('scss/7-utilities/_*.scss'))(
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
