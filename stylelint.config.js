module.exports = {
  extends: ["stylelint-config-standard-scss"],
  plugins: ["stylelint-selector-bem-pattern"],
  ignoreFiles: ["**/_normalize.scss"],
  rules: {
    // Disallow ID selectors
    "selector-id-pattern": null,
    "selector-max-id": 0,

    // Set a reasonable limit on how many compound selectors we can have
    "selector-max-compound-selectors": 4,

    // Disallow named colours, for colours we use sass variables
    "color-named": "never",

    // Prefer legacy colour function notation
    "color-function-notation": "legacy",
    "alpha-value-notation": "number",

    // We provide a cads-transition-animation mixin for handling
    // transitions along with a prefers-reduced-motion fallback,
    // so disallow this property when used without this mixin.
    "property-disallowed-list": ["transition"],

    // Ensure that all font-stacks have a generic fallback,
    // with the exception of the cads icon font.
    "font-family-no-missing-generic-family-keyword": [
      true,
      { ignoreFontFamilies: ["/cads/"] },
    ],

    // Default at-rule conflicts with scss features,
    // replace with stylelint-scss version
    "at-rule-no-unknown": null,
    "at-rule-disallowed-list": ["debug"],
    "scss/at-rule-no-unknown": true,

    // Disable unwanted scss rules
    "scss/comment-no-empty": null,

    // Additional stylelint-scss rules
    "scss/at-extend-no-missing-placeholder": true,
    "scss/at-import-partial-extension-disallowed-list": ["scss"],
    "scss/load-no-partial-leading-underscore": true,
    "scss/selector-no-redundant-nesting-selector": true,

    // Require that class names, @function, and @mixin rules
    // are prefixed with cads-
    "scss/at-function-pattern": "^cads-+([a-z0-9-]+[a-z0-9]+)?$",
    "scss/at-mixin-pattern": "^cads-+([a-z0-9-]+[a-z0-9]+)?$",
    "selector-class-pattern": [
      "^(cads-([a-z0-9-_]+)?|no-js)$",
      { resolveNestedSelectors: true },
    ],

    // Require that all variable names and placeholder as
    // prefixed with cads and use simple kebab-case
    // Flag as a warning until known issues are fixed
    // Current design system variables names use a more complex format
    // which will eventually be simplified
    // See https://github.com/citizensadvice/design-system/pull/1863
    // @v6: Set this rule to error once issues have been fixed
    "scss/dollar-variable-pattern": [
      "^cads-+([a-z0-9-]+[a-z0-9]+)?$",
      { severity: "warning", ignore: "local" },
    ],
    "scss/percent-placeholder-pattern": [
      "^cads-+([a-z0-9-]+[a-z0-9]+)?$",
      { severity: "warning" },
    ],

    // Configure BEM pattern
    // Note: requires components to have an explicit @define comment
    // e.g. cads-breadcrumb would use /** @define breadcrumb */
    "plugin/selector-bem-pattern": {
      preset: "bem",
      presetOptions: { namespace: "cads" },
      implicitComponents: [
        "scss/5-components/**/*.scss",
        "scss/6-components/**/*.scss",
      ],
      utilitySelectors: "^cads-([a-z0-9-_]+)?$",
      implicitUtilities: ["scss/7-utilities/**/*.scss"],
    },
  },
};
