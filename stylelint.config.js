module.exports = {
  extends: 'stylelint-config-standard',
  plugins: ['stylelint-scss', 'stylelint-selector-bem-pattern'],
  ignoreFiles: ['**/_normalize.scss', '**/_cads-iconfont.scss'],
  rules: {
    'at-rule-disallowed-list': ['debug'],
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['first-nested', 'blockless-after-blockless'],
        ignore: ['after-comment'],
        ignoreAtRules: ['if', 'else'],
      },
    ],
    'at-rule-no-unknown': null,
    'at-rule-no-vendor-prefix': true,
    'block-closing-brace-newline-after': null,
    'color-named': 'never',
    'declaration-colon-newline-after': null,
    indentation: 2,
    'property-disallowed-list': ['transition'],
    'rule-empty-line-before': [
      'always-multi-line',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
      },
    ],
    'selector-max-compound-selectors': 6,
    'selector-no-vendor-prefix': true,
    'string-quotes': 'single',
    'value-no-vendor-prefix': true,

    /**
     * stylelint-scss plugin settings
     */
    'scss/at-if-closing-brace-newline-after': 'always-last-in-chain',
    'scss/at-function-pattern': '^[a-z]+([a-z0-9-]+[a-z0-9]+)?$',
    'scss/at-import-no-partial-leading-underscore': true,
    'scss/at-import-partial-extension-blacklist': ['scss'],
    'scss/at-mixin-pattern': '^[a-z]+([a-z0-9-]+[a-z0-9]+)?$',
    'scss/dollar-variable-colon-space-after': 'always',
    'scss/dollar-variable-colon-space-before': 'never',
    'scss/selector-no-redundant-nesting-selector': true,

    // Discourage use of @extend without placeholders
    // @see https://csswizardry.com/2014/11/when-to-use-extend-when-to-use-a-mixin/
    'scss/at-extend-no-missing-placeholder': [true, { severity: 'warning' }],

    // Discourage union selectors (e.g. .class { &-union {} }) as they:
    // - can create some unexpected generated CSS
    // - make it hard to see what generated class names are
    // - make it hard to search the scss codebase for class names
    'scss/selector-no-union-class-name': [true, { severity: 'warning' }],

    /**
     * stylelint-selector-bem-pattern settings
     */
    'plugin/selector-bem-pattern': {
      preset: 'bem',
      componentName: 'ds-(([a-z0-9]+(?!-$)-?)+)',
      componentSelectors: {
        initial:
          "\\.{componentName}(((__|--)(([a-z0-9\\[\\]'=]+(?!-$)-?)+))+)?$",
      },
    },
  },
};
