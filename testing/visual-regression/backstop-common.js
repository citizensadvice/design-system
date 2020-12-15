module.exports = function backstopCommon(baseUrl) {
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

  return {
    id: 'backstop_default',
    viewports: [
      { label: 'phone', width: 320, height: 480 },
      { label: 'Small', width: 640, height: 960 },
      { label: 'Medium', width: 800, height: 600 },
      { label: 'Large', width: 1024, height: 768 },
    ],
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
        url: storyUrlFor('components-callouts--standard-callout'),
      },
      {
        label: 'Components/Callout (example)',
        url: storyUrlFor('components-callouts--example-callout'),
      },
      {
        label: 'Components/Callout (important)',
        url: storyUrlFor('components-callouts--important-callout'),
      },
      {
        label: 'Components/Callout (adviser)',
        url: storyUrlFor('components-callouts--adviser-callout'),
      },
      {
        label: 'Components/Header',
        url: storyUrlFor('components-header--default'),
      },
      {
        label: 'Components/Header',
        url: storyUrlFor('components-header--default'),
        clickSelector: '.js-cads-search-reveal',
        viewports: [{ label: 'small', width: 320, height: 480 }],
      },
      {
        label: 'Components/Footer',
        url: storyUrlFor('components-footer--default'),
      },
      {
        label: 'Components/Footer (minimal)',
        url: storyUrlFor('components-footer--minimal'),
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
        label: 'Components/Breadcrumbs/SiteWide',
        url: storyUrlFor('components-breadcrumbs--breadcrumbs-site-wide'),
        selectors: ['.cads-breadcrumbs-wrapper'],
      },
      {
        label: 'Components/Breadcrumbs/Default',
        url: storyUrlFor('components-breadcrumbs--breadcrumbs-default'),
        selectors: ['.cads-breadcrumbs'],
      },
      {
        label: 'Components/Breadcrumbs/No Collapse',
        url: storyUrlFor('components-breadcrumbs--breadcrumbs-no-collapse'),
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
        label: `Forms/Radio group (small)`,
        url: storyUrlFor(`forms-radio-group--small`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },

      // Old format component tests below here
      {
        label: '3_Components_CONTACT_DETAILS',
        url: `${baseUrl}/iframe.html?id=3-components--contact-details`,
        readySelector: '#a11yComponentToTest',
        hoverSelector: '#a11yComponentToTest',
        selectors: ['#a11yComponentToTest'],
      },
      {
        label: '3_Components_NAVIGATION',
        url: `${baseUrl}/iframe.html?id=3-components--navigation`,
        readySelector: '.cads-greedy-nav-has-dropdown',
        removeSelectors: ['.cads-styleguide-usage', 'h1'],
        clickSelector: '.cads-greedy-nav__dropdown-toggle',
        viewports: [{ label: 'navigation', width: 800, height: 200 }],
      },
      {
        label: '3_Components_NAVIGATION_BUTTONS',
        url: `${baseUrl}/iframe.html?id=3-components--navigation`,
        readySelector: '.cads-greedy-nav-has-dropdown',
        removeSelectors: ['.cads-styleguide-usage', 'h1'],
        keyPressSelectors: [{ selector: '.cads-nav-link', keyPress: 'Tab' }],
        viewports: [{ label: 'navigation', width: 800, height: 200 }],
      },
      {
        label: '3_Components_TABLES',
        url: `${baseUrl}/iframe.html?id=3-components--tables`,
        readySelector: '#a11yComponentToTest',
        hoverSelector: '#a11yComponentToTest',
        selectors: ['#a11yComponentToTest'],
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
