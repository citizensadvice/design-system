const { globSync } = require('glob');
const sass = require('sass');
const path = require('path');

test.each(globSync('scss/7-utilities/_*.scss'))(
  '%p can be imported standalone',
  (file) => {
    expect(() =>
      sass.compile(file, {
        loadPaths: [path.resolve(__dirname, '../../')],
      }),
    ).not.toThrow();
  },
);

test('visibility styles match snapshot', () => {
  const output = sass.compile('scss/7-utilities/_visibility.scss');
  expect(output.css.toString()).toMatchSnapshot();
});
