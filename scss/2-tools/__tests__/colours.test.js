/* eslint-env jest */
const sass = require('sass');

describe('animation', () => {
  test('cads-transition-animation', () => {
    const output = sass
      .renderSync({
        data: `@use 'scss/2-tools/animation';
      .example { @include animation.cads-transition-animation(); }
      .example-custom { @include animation.cads-transition-animation(color); }`,
      })
      .css.toString();
    expect(output).toContain('transition-property: background, border;');
    expect(output).toContain('transition-property: color;');
  });
});
