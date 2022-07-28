module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier'],
  plugins: ['stylelint-selector-bem-pattern'],
  ignoreFiles: ['**/_normalize.scss', '**/_cads-iconfont.scss'],
  rules: {
    // Disallow named colours, for colours we use sass variables
    'color-named': 'never',

    // Set a reasonable limit on how many compound selectors we can have
    'selector-max-compound-selectors': 4,

    // Disable unwanted or conflicting selector patterns
    'selector-class-pattern': null,
    'selector-id-pattern': null,

    // Prefer legacy colour function notation
    'color-function-notation': 'legacy',
    'alpha-value-notation': 'number',

    // We provide a cads-transition-animation mixin for handling
    // transitions along with a prefers-reduced-motion fallback,
    // so disallow this property when used without this mixin.
    'property-disallowed-list': ['transition'],

    // Ensure that all font-stacks have a generic fallback,
    // with the exception of the cads icon font.
    'font-family-no-missing-generic-family-keyword': [
      true,
      { ignoreFontFamilies: ['/cads/'] },
    ],

    // Default at-rule conflicts with scss features,
    // replace with stylelint-scss version
    'at-rule-no-unknown': null,
    'at-rule-disallowed-list': ['debug'],
    'scss/at-rule-no-unknown': true,

    // Disable unwanted scss rules
    'scss/comment-no-empty': null,

    // Require that @function and @mixin rules are prefixed with cads-
    'scss/at-function-pattern': '^cads-+([a-z0-9-]+[a-z0-9]+)?$',
    'scss/at-mixin-pattern': '^cads-+([a-z0-9-]+[a-z0-9]+)?$',

    // Additional stylelint-scss rules
    'scss/selector-no-redundant-nesting-selector': true,
    'scss/at-import-no-partial-leading-underscore': true,
    'scss/at-import-partial-extension-blacklist': ['scss'],

    // Warning-only rules
    // These should be enabled as errors once current warnings have been fixed.
    'selector-max-id': [0, { severity: 'warning' }],
    'scss/at-extend-no-missing-placeholder': [true, { severity: 'warning' }],

    // Disable kebab-case preference for variable names
    // Current design system variables names use a more complex format
    // which will eventually be simplified
    // See https://github.com/citizensadvice/design-system/pull/1863
    'scss/dollar-variable-pattern': null,
    'scss/percent-placeholder-pattern': null,

    // Configure BEM pattern
    // Note: requires components to have an explicit @define comment
    // e.g. cads-breadcrumb would use /** @define breadcrumb */
    'plugin/selector-bem-pattern': {
      preset: 'bem',
      presetOptions: { namespace: 'cads' },
    },
  },
};
