/* eslint-env jest */
const stylelintConfig = require('./stylelint.config');

function testCadsPattern(pattern) {
  const regex = new RegExp(pattern);

  const validNames = ['cads-prefixed'];
  validNames.forEach((name) => {
    expect(regex.test(name)).toBeTruthy();
  });

  const invalidNames = [
    'no-prefixed',
    'cadsButIncorrectCase',
    'just__dOwNrIGht--Odd',
  ];
  invalidNames.forEach((name) => {
    expect(regex.test(name)).toBeFalsy();
  });
}

test('scss/at-function-pattern', () => {
  testCadsPattern(stylelintConfig.rules['scss/at-function-pattern']);
});

test('scss/at-mixin-pattern', () => {
  testCadsPattern(stylelintConfig.rules['scss/at-mixin-pattern']);
});
