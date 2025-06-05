const stylelintConfig = require('./stylelint.config');

function testCadsPattern(pattern) {
  const regex = new RegExp(pattern);

  const validNames = ['cads-prefixed'];
  validNames.forEach((name) => {
    expect(regex.test(name)).toBeTruthy();
  });

  const invalidNames = [
    'no-prefix',
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

test('scss/dollar-variable-pattern', () => {
  testCadsPattern(stylelintConfig.rules['scss/dollar-variable-pattern'][0]);
});

test('scss/percent-placeholder-pattern', () => {
  testCadsPattern(stylelintConfig.rules['scss/percent-placeholder-pattern'][0]);
});

test('selector-class-pattern', () => {
  const regex = new RegExp(stylelintConfig.rules['selector-class-pattern'][0]);

  const validNames = [
    'cads-prefixed',
    'cads-prefixed__child',
    'cads-prefixed--modifier',
    'cads-prefixed-number-1',
    // No JavaScript class is special cased
    'no-js',
  ];
  validNames.forEach((name) => {
    expect(regex.test(name)).toBeTruthy();
  });

  const invalidNames = [
    'no-prefix',
    'cadsButIncorrectCase',
    'just__dOwNrIGht--Odd',
  ];
  invalidNames.forEach((name) => {
    expect(regex.test(name)).toBeFalsy();
  });
});
