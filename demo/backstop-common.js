module.exports = function backstopCommon(baseUrl) {
  const commonViewports = {
    small: { label: 'small', width: 320, height: 480 },
    medium: { label: 'medium', width: 800, height: 600 },
    large: { label: 'large', width: 1024, height: 768 },
  };

  function componentUrlFor(componentId) {
    return `${baseUrl}/rails/view_components/${componentId}`;
  }

  function buildButtonScenarios(labelPrefix, componentId) {
    const viewport = { label: 'button', width: 200, height: 100 };
    return [
      {
        label: `${labelPrefix}`,
        url: componentUrlFor(componentId),
        viewports: [viewport],
      },
      {
        label: `${labelPrefix} (hover)`,
        url: componentUrlFor(componentId),
        hoverSelector: 'button',
        viewports: [viewport],
      },
      {
        label: `${labelPrefix} (focus)`,
        url: componentUrlFor(componentId),
        focusSelector: 'button',
        viewports: [viewport],
      },
      {
        label: `${labelPrefix} (active)`,
        url: componentUrlFor(componentId),
        onReadyScript: 'onReadyButtonActive.js',
        viewports: [viewport],
      },
    ];
  }

  function buildSamplePageScenarios(labelPrefix, url) {
    return [
      {
        label: `${labelPrefix} (Print)`,
        url: `${baseUrl}/${url}`,
        onReadyScript: 'onReadyEmulatePrint.js',
        viewports: [{ label: 'print', width: 1024, height: 1024 }],
        selectors: ['#content'],
      },
      {
        label: `${labelPrefix}`,
        url: `${baseUrl}/${url}`,
        viewports: [{ label: 'desktop', width: 800, height: 1024 }],
        readySelector: '.cads-greedy-nav-has-dropdown',
      },
      {
        label: `${labelPrefix}`,
        url: `${baseUrl}/${url}`,
        viewports: [{ label: 'wide-desktop', width: 1440, height: 1024 }],
      },
    ];
  }

  return {
    id: 'backstop_default',
    viewports: Object.values(commonViewports),
    onReadyScript: 'onReady.js',
    scenarios: [
      ...buildButtonScenarios('Components/Buttons/Primary', 'button/primary'),
      ...buildButtonScenarios(
        'Components/Buttons/Secondary',
        'button/secondary',
      ),
      ...buildButtonScenarios('Components/Buttons/Tertiary', 'button/tertiary'),
      {
        label: 'Components/Asset hyperlink',
        url: componentUrlFor('asset_hyperlink/example'),
        viewports: [{ label: 'small', width: 300, height: 100 }],
      },
      {
        label: 'Components/Callout (standard)',
        url: componentUrlFor('callout/standard'),
      },
      {
        label: 'Components/Callout (example)',
        url: componentUrlFor('callout/example'),
      },
      {
        label: 'Components/Callout (important)',
        url: componentUrlFor('callout/important'),
      },
      {
        label: 'Components/Callout (adviser)',
        url: componentUrlFor('callout/adviser'),
      },
      {
        label: 'Components/Callout (nested)',
        url: componentUrlFor('callout/nested'),
      },
      {
        label: 'Components/Callout (variable heading level)',
        url: componentUrlFor('callout/variable_heading_levels'),
      },
      {
        label: `Components/Contact details`,
        url: componentUrlFor('contact_details/example'),
      },
      {
        label: 'Components/Header',
        url: componentUrlFor('header/full_example'),
        misMatchThreshold: 0.4,
      },
      {
        label: 'Components/Header (link focus)',
        url: componentUrlFor('header/full_example'),
        misMatchThreshold: 0.4,
        focusSelector: 'ul li:nth-child(2) a',
        viewports: [{ label: 'desktop', width: 800, height: 200 }],
      },
      {
        label: 'Components/Header',
        url: componentUrlFor('header/full_example'),
        clickSelector: '.js-cads-search-reveal',
        viewports: [{ label: 'small', width: 320, height: 480 }],
        misMatchThreshold: 0.4,
      },
      {
        label: 'Components/Footer',
        url: componentUrlFor('footer/default'),
        misMatchThreshold: 0.4,
      },
      {
        label: 'Components/Footer (feedback link only)',
        url: componentUrlFor('footer/feedback_link_only'),
        misMatchThreshold: 0.4,
      },
      {
        label: 'Components/Footer (minimal)',
        url: componentUrlFor('footer/minimal'),
        misMatchThreshold: 0.4,
      },
      {
        label: 'Components/On this page (with columns)',
        url: componentUrlFor('on_this_page/with_columns'),
      },
      {
        label: 'Components/On this page (with no columns)',
        url: componentUrlFor('on_this_page/with_no_columns'),
      },
      {
        label: 'Components/On this page (with nested links)',
        url: componentUrlFor('on_this_page/with_nested_links'),
      },
      {
        label: 'Components/On this page (with nested links open)',
        url: componentUrlFor('on_this_page/with_nested_links'),
        readySelector: '.cads-on-this-page--expandable',
        clickSelector: '.js-cads-on-this-page__toggle',
      },
      {
        label: 'Components/Disclosure',
        url: componentUrlFor('disclosure/example'),
      },
      {
        label: 'Components/Disclosure (open)',
        url: componentUrlFor('disclosure/example'),
        clickSelector: '.js-disclosure-summary',
      },
      {
        label: 'Components/Disclosure (without open summary)',
        url: componentUrlFor('disclosure/without_open_summary'),
      },
      {
        label: 'Components/Disclosure (without open summary - open)',
        url: componentUrlFor('disclosure/without_open_summary'),
        clickSelector: '.js-disclosure-summary',
      },
      {
        label: 'Components/Disclosure (fallback)',
        url: componentUrlFor('disclosure/example'),
        onBeforeScript: 'onBeforeNoJs.js',
      },
      {
        label: 'Components/Targeted content',
        url: componentUrlFor('targeted_content/default'),
        viewports: [commonViewports.small, commonViewports.large],
      },
      {
        label: 'Components/Targeted content (open)',
        url: componentUrlFor('targeted_content/default'),
        viewports: [commonViewports.small, commonViewports.large],
        clickSelector: '.cads-targeted-content',
      },
      {
        label: 'Components/Targeted content adviser',
        url: componentUrlFor('targeted_content/adviser'),
        viewports: [commonViewports.small, commonViewports.large],
      },
      {
        label: 'Components/Targeted content adviser (open)',
        url: componentUrlFor('targeted_content/adviser'),
        viewports: [commonViewports.small, commonViewports.large],
        clickSelector: '.cads-targeted-content',
      },
      {
        label: 'Components/Targeted content (fallback)',
        url: componentUrlFor('targeted_content/default'),
        viewports: [commonViewports.small, commonViewports.large],
        onBeforeScript: 'onBeforeNoJs.js',
      },
      {
        label: 'Components/Pagination (example)',
        url: componentUrlFor('pagination/with_fifth_page'),
      },
      {
        label: 'Components/Search',
        url: componentUrlFor('search/example'),
        selectors: ['.cads-search'],
      },
      {
        label: 'Components/Search (hover)',
        url: componentUrlFor('search/example'),
        hoverSelector: '.cads-search__button',
        selectors: ['.cads-search'],
      },
      {
        label: 'Components/Search (focus)',
        url: componentUrlFor('search/example'),
        focusSelector: '.cads-search__button',
        selectors: ['.cads-search'],
      },
      {
        label: 'Components/Section Links',
        url: componentUrlFor('section_links/example'),
      },
      {
        label: 'Components/Breadcrumbs/Collapsing',
        url: componentUrlFor('breadcrumbs/collapsing'),
        selectors: ['.cads-breadcrumbs-wrapper'],
      },
      {
        label: 'Components/Breadcrumbs/Long',
        url: componentUrlFor('breadcrumbs/long'),
        selectors: ['.cads-breadcrumbs-wrapper'],
      },
      {
        label: 'Components/Breadcrumbs/No Collapse',
        url: componentUrlFor('breadcrumbs/not_collapsing'),
        selectors: ['.cads-breadcrumbs-wrapper'],
      },
      {
        label: 'Components/Breadcrumbs/Not Full Width',
        url: componentUrlFor('breadcrumbs/not_full_width'),
        selectors: ['.cads-breadcrumbs'],
      },
      {
        label: 'Components/Notice banner',
        url: componentUrlFor('notice_banner/example'),
      },
      {
        label: 'Components/Page review',
        url: componentUrlFor('page_review/example'),
        viewports: [{ label: 'page-review', width: 600, height: 100 }],
      },
      {
        label: ' Components/Navigation',
        url: componentUrlFor('navigation/example'),
        readySelector: '.cads-greedy-nav-has-dropdown',
        clickSelector: '.cads-greedy-nav__dropdown-toggle',
        viewports: [{ label: 'desktop', width: 800, height: 200 }],
      },
      {
        label: 'Components/Navigation (focus)',
        url: componentUrlFor('navigation/example'),
        readySelector: '.cads-greedy-nav-has-dropdown',
        keyPressSelectors: [
          { selector: '.cads-navigation__link', keyPress: 'Tab' },
        ],
        viewports: [{ label: 'desktop', width: 800, height: 200 }],
      },
      {
        label: 'Components/Navigation mobile',
        url: componentUrlFor('navigation/example'),
        readySelector: '.cads-greedy-nav-has-dropdown',
        clickSelector: '.cads-greedy-nav__dropdown-toggle',
        viewports: [{ label: 'mobile', width: 320, height: 400 }],
      },
      {
        label: 'Components/Tables (default)',
        url: componentUrlFor('table/example'),
      },
      {
        label: 'Components/Tables (long table)',
        url: componentUrlFor('table/long_table'),
      },
      {
        label: 'Components/Tables (no caption)',
        url: componentUrlFor('table/no_caption'),
      },
      {
        label: 'Components/Tables (no responsive headers)',
        url: componentUrlFor('table/no_responsive_headers'),
      },

      // Forms
      {
        label: 'Forms/Success message',
        url: componentUrlFor('success_message/example'),
        viewports: [{ label: 'success-message', width: 600, height: 100 }],
      },
      {
        label: 'Forms/Error summary',
        url: componentUrlFor('error_summary/example'),
      },
      {
        label: `Forms/Input (basic)`,
        url: componentUrlFor(`text_input/basic`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Input (with hint)`,
        url: componentUrlFor(`text_input/hint`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Input (optional field)`,
        url: componentUrlFor(`text_input/optional`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Input (with error)`,
        url: componentUrlFor(`text_input/error`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Input (with fixed widths)`,
        url: componentUrlFor(`text_input/fixed_widths`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Textarea (basic)`,
        url: componentUrlFor(`textarea/basic`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Textarea (with hint)`,
        url: componentUrlFor(`textarea/hint`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Textarea (optional field)`,
        url: componentUrlFor(`textarea/optional`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Textarea (with error)`,
        url: componentUrlFor(`textarea/error`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Textarea (with value)`,
        url: componentUrlFor(`textarea/value`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Radio group (with hint)`,
        url: componentUrlFor(`radio_group/hint`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Radio group (optional field)`,
        url: componentUrlFor(`radio_group/optional`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Radio group (with error)`,
        url: componentUrlFor(`radio_group/error`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Radio group (with long options)`,
        url: componentUrlFor(`radio_group/long`),
      },
      {
        label: `Forms/Radio group (inline)`,
        url: componentUrlFor(`radio_group/inline`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Checkbox group (basic)`,
        url: componentUrlFor(`checkbox_group/basic`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Checkbox group (hint)`,
        url: componentUrlFor(`checkbox_group/hint`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Checkbox group (optional)`,
        url: componentUrlFor(`checkbox_group/optional`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Checkbox group (error)`,
        url: componentUrlFor(`checkbox_group/error`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Checkbox group (long)`,
        url: componentUrlFor(`checkbox_group/long`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Checkbox (basic)`,
        url: componentUrlFor(`checkbox_single/basic`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Checkbox (error)`,
        url: componentUrlFor(`checkbox_single/error`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Date Input (basic)`,
        url: componentUrlFor(`date_input/example`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Date Input (error)`,
        url: componentUrlFor(`date_input/error`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Date Input (hint)`,
        url: componentUrlFor(`date_input/hint`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Date Input (incomplete_error)`,
        url: componentUrlFor(`date_input/incomplete_error`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Date Input (optional)`,
        url: componentUrlFor(`date_input/optional`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Date Input (validation_error)`,
        url: componentUrlFor(`date_input/validation_error`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Date Input (values)`,
        url: componentUrlFor(`date_input/values`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Select (default)`,
        url: componentUrlFor(`select/default`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Select (optional)`,
        url: componentUrlFor(`select/optional`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Select (error)`,
        url: componentUrlFor(`select/error`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Select (hint)`,
        url: componentUrlFor(`select/hint`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Select (value)`,
        url: componentUrlFor(`select/value`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: 'Example links',
        url: componentUrlFor('links/example_links'),
      },
      ...buildSamplePageScenarios('Sample Page/Content page', 'content-sample'),
      ...buildSamplePageScenarios('Sample Page/Form page', 'form-sample'),
    ],
    dockerCommandTemplate:
      'docker run --rm -i --mount type=bind,source="{cwd}",target=/src backstopjs/backstopjs:{version} {backstopCommand} {args}',
    paths: {
      engine_scripts: 'visual-regression/engine_scripts',
      bitmaps_reference: 'visual-regression/backstop_data/bitmaps_reference',
      bitmaps_test: 'visual-regression/backstop_data/bitmaps_test',
      html_report: 'visual-regression/backstop_data/html_report',
      ci_report: 'visual-regression/backstop_data/ci_report',
    },
    report: process.env.CI == 'true' ? ['html'] : ['browser'],
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
