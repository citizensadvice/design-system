module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  plugins: ['stylelint-scss', 'stylelint-selector-bem-pattern'],
  ignoreFiles: ['**/_normalize.scss', '**/_cads-iconfont.scss'],
  rules: {
    'at-rule-disallowed-list': ['debug'],
    'at-rule-no-unknown': null,
    'at-rule-no-vendor-prefix': true,
    'block-closing-brace-newline-after': null,
    'color-named': 'never',
    'declaration-colon-newline-after': null,
    'property-disallowed-list': ['transition'],
    'scss/at-if-closing-brace-newline-after': 'always-last-in-chain',
    'scss/at-function-pattern': '^[a-z]+([a-z0-9-]+[a-z0-9]+)?$',
    'scss/at-import-no-partial-leading-underscore': true,
    'scss/at-import-partial-extension-blacklist': ['scss'],
    'scss/at-mixin-pattern': '^[a-z]+([a-z0-9-]+[a-z0-9]+)?$',
    'scss/dollar-variable-colon-space-after': 'always',
    'scss/dollar-variable-colon-space-before': 'never',
    'scss/selector-no-redundant-nesting-selector': true,
    'selector-max-compound-selectors': 6,
    'selector-no-vendor-prefix': true,
    'value-no-vendor-prefix': true,
    'plugin/selector-bem-pattern': {
      preset: 'bem',
      componentName: 'ds-(([a-z0-9]+(?!-$)-?)+)',
      componentSelectors: {
        initial:
          "\\.{componentName}(((__|--)(([a-z0-9\\[\\]'=]+(?!-$)-?)+))+)?$",
      },
    },
    'font-family-no-missing-generic-family-keyword': [
      true,
      { ignoreFontFamilies: ['/cads/'] },
    ],
  },
};
