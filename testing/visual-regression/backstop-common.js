module.exports = function backstopCommon(baseUrl) {
  const commonViewports = {
    phone: { label: 'phone', width: 320, height: 480 },
    small: { label: 'Small', width: 640, height: 960 },
    medium: { label: 'Medium', width: 800, height: 600 },
    large: { label: 'Large', width: 1024, height: 768 },
  };

  function storyUrlFor(componentId) {
    return `${baseUrl}/iframe.html?id=${componentId}&viewMode=story`;
  }

  function buildButtonScenarios(labelPrefix, componentId) {
    const viewport = { label: 'button', width: 200, height: 100 };
    return [
      {
        label: `${labelPrefix}`,
        url: storyUrlFor(componentId),
        viewports: [viewport],
      },
      {
        label: `${labelPrefix} (hover)`,
        url: storyUrlFor(componentId),
        hoverSelector: 'button',
        viewports: [viewport],
      },
      {
        label: `${labelPrefix} (focus)`,
        url: storyUrlFor(componentId),
        focusSelector: 'button',
        viewports: [viewport],
      },
      {
        label: `${labelPrefix} (active)`,
        url: storyUrlFor(componentId),
        onReadyScript: 'onReadyButtonActive.js',
        viewports: [viewport],
      },
    ];
  }

  function buildSamplePageScenarios(labelPrefix, componentId) {
    return [
      {
        label: `${labelPrefix} (Print)`,
        url: storyUrlFor(componentId),
        onReadyScript: 'onReadyEmulatePrint.js',
        viewports: [{ label: 'print', width: 1024, height: 1024 }],
        selectors: ['document'],
        excludeFromA11yTest: true,
      },
      {
        label: `${labelPrefix}`,
        url: storyUrlFor(componentId),
        readySelector: '.cads-greedy-nav-has-dropdown',
        excludeFromA11yTest: true,
      },
    ];
  }

  return {
    id: 'backstop_default',
    viewports: Object.values(commonViewports),
    onReadyScript: 'onReady.js',
    scenarios: [
      ...buildButtonScenarios(
        'Components/Buttons/Primary',
        'components-buttons--primary'
      ),
      ...buildButtonScenarios(
        'Components/Buttons/Secondary',
        'components-buttons--secondary'
      ),
      ...buildButtonScenarios(
        'Components/Buttons/Tertiary',
        'components-buttons--tertiary'
      ),
      {
        label: 'Components/Asset hyperlink',
        url: storyUrlFor('components-asset-hyperlink--example'),
        viewports: [{ label: 'small', width: 300, height: 100 }],
      },
      {
        label: 'Components/Callout (standard)',
        url: storyUrlFor('components-callouts--standard'),
      },
      {
        label: 'Components/Callout (example)',
        url: storyUrlFor('components-callouts--example'),
      },
      {
        label: 'Components/Callout (important)',
        url: storyUrlFor('components-callouts--important'),
      },
      {
        label: 'Components/Callout (adviser)',
        url: storyUrlFor('components-callouts--adviser'),
      },
      {
        label: 'Components/Callout (nested)',
        url: storyUrlFor('components-callouts--nested'),
      },
      {
        label: 'Components/Callout (variable heading level)',
        url: storyUrlFor('components-callouts--variable-heading'),
      },
      {
        label: `Components/Contact details`,
        url: storyUrlFor(`components-contact-details--example`),
      },
      {
        label: 'Components/Header',
        url: storyUrlFor('components-header--default'),
        misMatchThreshold: 0.4,
      },
      {
        label: 'Components/Header (link focus)',
        url: storyUrlFor('components-header--default'),
        misMatchThreshold: 0.4,
        focusSelector: 'ul li:nth-child(2) a',
        viewports: [{ label: 'desktop', width: 800, height: 200 }],
      },
      {
        label: 'Components/Header',
        url: storyUrlFor('components-header--default'),
        clickSelector: '.js-cads-search-reveal',
        viewports: [{ label: 'small', width: 320, height: 480 }],
        misMatchThreshold: 0.4,
      },
      {
        label: 'Components/Footer',
        url: storyUrlFor('components-footer--default'),
        misMatchThreshold: 0.4,
      },
      {
        label: 'Components/Footer (minimal)',
        url: storyUrlFor('components-footer--minimal'),
        misMatchThreshold: 0.4,
      },
      {
        label: 'Components/Targeted content',
        url: storyUrlFor('components-targeted-content--default'),
      },
      {
        label: 'Components/Targeted content (open)',
        url: storyUrlFor('components-targeted-content--default'),
        clickSelector: '.cads-targeted-content',
      },
      {
        label: 'Components/Targeted content adviser',
        url: storyUrlFor('components-targeted-content--adviser'),
      },
      {
        label: 'Components/Targeted content adviser (open)',
        url: storyUrlFor('components-targeted-content--adviser'),
        clickSelector: '.cads-targeted-content',
      },
      {
        label: 'Components/Targeted content (fallback)',
        url: storyUrlFor('components-targeted-content--fallback'),
      },
      {
        label: 'Components/Pagination (example)',
        url: storyUrlFor('components-pagination--example'),
      },
      {
        label: 'Components/Pagination (paging info)',
        url: storyUrlFor('components-pagination--paging-info'),
      },
      {
        label: 'Components/Search',
        url: storyUrlFor('components-search--search'),
        selectors: ['.cads-search'],
      },
      {
        label: 'Components/Search (hover)',
        url: storyUrlFor('components-search--search'),
        hoverSelector: '.cads-search__button',
        selectors: ['.cads-search'],
      },
      {
        label: 'Components/Search (focus)',
        url: storyUrlFor('components-search--search'),
        focusSelector: '.cads-search__button',
        selectors: ['.cads-search'],
      },
      {
        label: 'Components/Sidebar',
        url: storyUrlFor('components-sidebar--example'),
      },
      {
        label: 'Components/Breadcrumbs/Collapsing',
        url: storyUrlFor('components-breadcrumbs--collapsing'),
        selectors: ['.cads-breadcrumbs-wrapper'],
      },
      {
        label: 'Components/Breadcrumbs/Long',
        url: storyUrlFor('components-breadcrumbs--long'),
        selectors: ['.cads-breadcrumbs-wrapper'],
      },
      {
        label: 'Components/Breadcrumbs/No Collapse',
        url: storyUrlFor('components-breadcrumbs--not-collapsing'),
        selectors: ['.cads-breadcrumbs-wrapper'],
      },
      {
        label: 'Components/Breadcrumbs/Not Full Width',
        url: storyUrlFor('components-breadcrumbs--not-full-width'),
        selectors: ['.cads-breadcrumbs'],
      },
      {
        label: 'Components/Notice banner',
        url: storyUrlFor('components-notice-banner--example'),
      },
      {
        label: 'Components/Page review',
        url: storyUrlFor('components-page-review--example'),
        viewports: [{ label: 'page-review', width: 600, height: 100 }],
      },
      {
        label: ' Components/Navigation',
        url: storyUrlFor('components-navigation--default'),
        readySelector: '.cads-greedy-nav-has-dropdown',
        clickSelector: '.cads-greedy-nav__dropdown-toggle',
        viewports: [{ label: 'desktop', width: 800, height: 200 }],
      },
      {
        label: 'Components/Navigation (focus)',
        url: storyUrlFor('components-navigation--default'),
        readySelector: '.cads-greedy-nav-has-dropdown',
        keyPressSelectors: [
          { selector: '.cads-navigation__link', keyPress: 'Tab' },
        ],
        viewports: [{ label: 'desktop', width: 800, height: 200 }],
      },
      {
        label: 'Components/Navigation mobile',
        url: storyUrlFor('components-navigation--default'),
        readySelector: '.cads-greedy-nav-has-dropdown',
        clickSelector: '.cads-greedy-nav__dropdown-toggle',
        viewports: [{ label: 'mobile', width: 320, height: 400 }],
      },
      {
        label: 'Components/Tables',
        url: storyUrlFor('components-tables--example'),
      },
      {
        label: 'Components/Tables',
        url: storyUrlFor('components-tables--long-table'),
      },
      {
        label: 'Components/Tables',
        url: storyUrlFor('components-tables--no-caption'),
      },

      // Forms
      {
        label: 'Forms/Success message',
        url: storyUrlFor('forms-success-message--example'),
        viewports: [{ label: 'success-message', width: 600, height: 100 }],
      },
      {
        label: 'Forms/Error summary',
        url: storyUrlFor('forms-error-summary--example'),
      },
      {
        label: `Forms/Input (basic)`,
        url: storyUrlFor(`forms-input--basic`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Input (with hint)`,
        url: storyUrlFor(`forms-input--with-hint`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Input (optional field)`,
        url: storyUrlFor(`forms-input--optional-field`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Input (with error)`,
        url: storyUrlFor(`forms-input--with-error`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Input (with fixed widths)`,
        url: storyUrlFor(`forms-input--fixed-widths`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Textarea (basic)`,
        url: storyUrlFor(`forms-textarea--basic`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Textarea (with hint)`,
        url: storyUrlFor(`forms-textarea--with-hint`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Textarea (optional field)`,
        url: storyUrlFor(`forms-textarea--optional-field`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Textarea (with error)`,
        url: storyUrlFor(`forms-textarea--with-error`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Textarea (with value)`,
        url: storyUrlFor(`forms-textarea--value`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Radio group (with hint)`,
        url: storyUrlFor(`forms-radio-group--with-hint`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Radio group (optional field)`,
        url: storyUrlFor(`forms-radio-group--optional-field`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Radio group (with error)`,
        url: storyUrlFor(`forms-radio-group--with-error`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Radio group (with long options)`,
        url: storyUrlFor(`forms-radio-group--with-long-options`),
      },
      {
        label: `Forms/Radio group (inline)`,
        url: storyUrlFor(`forms-radio-group--inline`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Checkbox group (basic)`,
        url: storyUrlFor(`forms-checkbox-group`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Checkbox group (hint)`,
        url: storyUrlFor(`forms-checkbox-group--with-hint`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Checkbox group (optional)`,
        url: storyUrlFor(`forms-checkbox-group--optional-field`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Checkbox group (error)`,
        url: storyUrlFor(`forms-checkbox-group--with-error`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Checkbox group (long)`,
        url: storyUrlFor(`forms-checkbox-group--with-long-options`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Checkbox (basic)`,
        url: storyUrlFor(`forms-checkbox--basic`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Checkbox (error)`,
        url: storyUrlFor(`forms-checkbox--with-error`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      ...buildSamplePageScenarios(
        'Sample Page/Content page',
        'sample-pages-examples--content-page'
      ),
      ...buildSamplePageScenarios(
        'Sample Page/Form page',
        'sample-pages-examples--form-page'
      ),
      {
        label: `Foundations/Colours`,
        url: storyUrlFor('foundations-colours--page'),
        viewports: [commonViewports.large],
        selectors: ['document'],
        excludeFromA11yTest: true,
      },
    ],
    dockerCommandTemplate:
      'docker run --rm -i --mount type=bind,source="{cwd}",target=/src backstopjs/backstopjs:{version} {backstopCommand} {args}',
    paths: {
      engine_scripts: 'engine_scripts',
      bitmaps_reference: 'backstop_data/bitmaps_reference',
      bitmaps_test: 'backstop_data/bitmaps_test',
      html_report: 'backstop_data/html_report',
      ci_report: 'backstop_data/ci_report',
    },
    report: ['browser'],
    engine: 'puppeteer',
    engineOptions: {
      args: ['--no-sandbox'],
    },
    asyncCaptureLimit: 5,
    asyncCompareLimit: 50,
    debug: false,
    debugWindow: false,
  };
};
