module.exports = function backstopCommon(baseUrl) {
  const commonViewports = {
    small: { label: 'small', width: 320, height: 480 },
    medium: { label: 'medium', width: 800, height: 600 },
    large: { label: 'large', width: 1024, height: 768 },
  };

  function storyUrlFor(componentId) {
    return `${baseUrl}/rails/view_components/citizens_advice_components/${componentId}`;
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

  function buildSamplePageScenarios(labelPrefix, url) {
    return [
      {
        label: `${labelPrefix} (Print)`,
        url: `${baseUrl}/${url}`,
        onReadyScript: 'onReadyEmulatePrint.js',
        viewports: [{ label: 'print', width: 1024, height: 1024 }],
        selectors: ['document'],
        excludeFromA11yTest: true,
      },
      {
        label: `${labelPrefix}`,
        url: `${baseUrl}/${url}`,
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
      ...buildButtonScenarios('Components/Buttons/Primary', 'button/primary'),
      ...buildButtonScenarios(
        'Components/Buttons/Secondary',
        'button/secondary'
      ),
      ...buildButtonScenarios('Components/Buttons/Tertiary', 'button/tertiary'),
      {
        label: 'Components/Asset hyperlink',
        url: storyUrlFor('asset_hyperlink/example'),
        viewports: [{ label: 'small', width: 300, height: 100 }],
      },
      {
        label: 'Components/Callout (standard)',
        url: storyUrlFor('callout/standard'),
      },
      {
        label: 'Components/Callout (example)',
        url: storyUrlFor('callout/example'),
      },
      {
        label: 'Components/Callout (important)',
        url: storyUrlFor('callout/important'),
      },
      {
        label: 'Components/Callout (adviser)',
        url: storyUrlFor('callout/adviser'),
      },
      {
        label: 'Components/Callout (nested)',
        url: storyUrlFor('callout/nested'),
      },
      {
        label: 'Components/Callout (variable heading level)',
        url: storyUrlFor('callout/variable_heading_levels'),
      },
      {
        label: `Components/Contact details`,
        url: storyUrlFor('contact_details/example'),
      },
      {
        label: 'Components/Header',
        url: storyUrlFor('header/full_example'),
        misMatchThreshold: 0.4,
      },
      {
        label: 'Components/Header (link focus)',
        url: storyUrlFor('header/full_example'),
        misMatchThreshold: 0.4,
        focusSelector: 'ul li:nth-child(2) a',
        viewports: [{ label: 'desktop', width: 800, height: 200 }],
      },
      {
        label: 'Components/Header',
        url: storyUrlFor('header/full_example'),
        clickSelector: '.js-cads-search-reveal',
        viewports: [{ label: 'small', width: 320, height: 480 }],
        misMatchThreshold: 0.4,
      },
      {
        label: 'Components/Footer',
        url: storyUrlFor('footer/default'),
        misMatchThreshold: 0.4,
      },
      {
        label: 'Components/Footer (minimal)',
        url: storyUrlFor('footer/minimal'),
        misMatchThreshold: 0.4,
      },
      {
        label: 'Components/On this page (example)',
        url: storyUrlFor('on_this_page/example'),
      },
      {
        label: 'Components/On this page (with nested links)',
        url: storyUrlFor('on_this_page/with_nested_links'),
      },
      {
        label: 'Components/On this page (with nested links open)',
        url: storyUrlFor('on_this_page/with_nested_links'),
        readySelector: '.cads-on-this-page--expandable',
        clickSelector: '.js-cads-on-this-page__toggle',
      },
      {
        label: 'Components/Disclosure',
        url: storyUrlFor('disclosure/example'),
      },
      {
        label: 'Components/Disclosure (open)',
        url: storyUrlFor('disclosure/example'),
        clickSelector: '.js-disclosure-summary',
      },
      {
        label: 'Components/Disclosure (without open summary)',
        url: storyUrlFor('disclosure/without_open_summary'),
      },
      {
        label: 'Components/Disclosure (without open summary - open)',
        url: storyUrlFor('disclosure/without_open_summary'),
        clickSelector: '.js-disclosure-summary',
      },
      {
        label: 'Components/Disclosure (fallback)',
        url: storyUrlFor('disclosure/example'),
        onBeforeScript: 'onBeforeNoJs.js',
      },
      {
        label: 'Components/Targeted content',
        url: storyUrlFor('targeted_content/default'),
      },
      {
        label: 'Components/Targeted content (open)',
        url: storyUrlFor('targeted_content/default'),
        clickSelector: '.cads-targeted-content',
      },
      {
        label: 'Components/Targeted content adviser',
        url: storyUrlFor('targeted_content/adviser'),
      },
      {
        label: 'Components/Targeted content adviser (open)',
        url: storyUrlFor('targeted_content/adviser'),
        clickSelector: '.cads-targeted-content',
      },
      {
        label: 'Components/Targeted content (fallback)',
        url: storyUrlFor('targeted_content/default'),
        onBeforeScript: 'onBeforeNoJs.js',
      },
      {
        label: 'Components/Pagination (example)',
        url: storyUrlFor('pagination/with_fifth_page'),
      },
      // {
      //   label: 'Components/Pagination (paging info)',
      //   url: storyUrlFor('components-pagination--paging-info'),
      // },
      {
        label: 'Components/Search',
        url: storyUrlFor('search/example'),
        selectors: ['.cads-search'],
      },
      {
        label: 'Components/Search (hover)',
        url: storyUrlFor('search/example'),
        hoverSelector: '.cads-search__button',
        selectors: ['.cads-search'],
      },
      {
        label: 'Components/Search (focus)',
        url: storyUrlFor('search/example'),
        focusSelector: '.cads-search__button',
        selectors: ['.cads-search'],
      },
      {
        label: 'Components/Section Links',
        url: storyUrlFor('section_links/example'),
      },
      {
        label: 'Components/Breadcrumbs/Collapsing',
        url: storyUrlFor('breadcrumbs/collapsing'),
        selectors: ['.cads-breadcrumbs-wrapper'],
      },
      {
        label: 'Components/Breadcrumbs/Long',
        url: storyUrlFor('breadcrumbs/long'),
        selectors: ['.cads-breadcrumbs-wrapper'],
      },
      {
        label: 'Components/Breadcrumbs/No Collapse',
        url: storyUrlFor('breadcrumbs/not_collapsing'),
        selectors: ['.cads-breadcrumbs-wrapper'],
      },
      {
        label: 'Components/Breadcrumbs/Not Full Width',
        url: storyUrlFor('breadcrumbs/not_full_width'),
        selectors: ['.cads-breadcrumbs'],
      },
      {
        label: 'Components/Notice banner',
        url: storyUrlFor('notice_banner/example'),
      },
      {
        label: 'Components/Page review',
        url: storyUrlFor('page_review/example'),
        viewports: [{ label: 'page-review', width: 600, height: 100 }],
      },
      {
        label: ' Components/Navigation',
        url: storyUrlFor('navigation/example'),
        readySelector: '.cads-greedy-nav-has-dropdown',
        clickSelector: '.cads-greedy-nav__dropdown-toggle',
        viewports: [{ label: 'desktop', width: 800, height: 200 }],
      },
      {
        label: 'Components/Navigation (focus)',
        url: storyUrlFor('navigation/example'),
        readySelector: '.cads-greedy-nav-has-dropdown',
        keyPressSelectors: [
          { selector: '.cads-navigation__link', keyPress: 'Tab' },
        ],
        viewports: [{ label: 'desktop', width: 800, height: 200 }],
      },
      {
        label: 'Components/Navigation mobile',
        url: storyUrlFor('navigation/example'),
        readySelector: '.cads-greedy-nav-has-dropdown',
        clickSelector: '.cads-greedy-nav__dropdown-toggle',
        viewports: [{ label: 'mobile', width: 320, height: 400 }],
      },
      {
        label: 'Components/Tables',
        url: storyUrlFor('table/example'),
      },
      {
        label: 'Components/Tables',
        url: storyUrlFor('table/long_table'),
      },
      {
        label: 'Components/Tables',
        url: storyUrlFor('table/no_caption'),
      },

      // Forms
      {
        label: 'Forms/Success message',
        url: storyUrlFor('success_message/example'),
        viewports: [{ label: 'success-message', width: 600, height: 100 }],
      },
      {
        label: 'Forms/Error summary',
        url: storyUrlFor('error_summary/example'),
      },
      {
        label: `Forms/Input (basic)`,
        url: storyUrlFor(`text_input/basic`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Input (with hint)`,
        url: storyUrlFor(`text_input/hint`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Input (optional field)`,
        url: storyUrlFor(`text_input/optional`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Input (with error)`,
        url: storyUrlFor(`text_input/error`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Input (with fixed widths)`,
        url: storyUrlFor(`text_input/fixed_widths`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Textarea (basic)`,
        url: storyUrlFor(`textarea/basic`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Textarea (with hint)`,
        url: storyUrlFor(`textarea/hint`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Textarea (optional field)`,
        url: storyUrlFor(`textarea/optional`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Textarea (with error)`,
        url: storyUrlFor(`textarea/error`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Textarea (with value)`,
        url: storyUrlFor(`textarea/value`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Radio group (with hint)`,
        url: storyUrlFor(`radio_group/hint`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Radio group (optional field)`,
        url: storyUrlFor(`radio_group/optional`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Radio group (with error)`,
        url: storyUrlFor(`radio_group/error`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Radio group (with long options)`,
        url: storyUrlFor(`radio_group/long`),
      },
      {
        label: `Forms/Radio group (inline)`,
        url: storyUrlFor(`radio_group/inline`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Checkbox group (basic)`,
        url: storyUrlFor(`checkbox_group/basic`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Checkbox group (hint)`,
        url: storyUrlFor(`checkbox_group/hint`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Checkbox group (optional)`,
        url: storyUrlFor(`checkbox_group/optional`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Checkbox group (error)`,
        url: storyUrlFor(`checkbox_group/error`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Checkbox group (long)`,
        url: storyUrlFor(`checkbox_group/long`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Checkbox (basic)`,
        url: storyUrlFor(`checkbox_single/basic`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
      },
      {
        label: `Forms/Checkbox (error)`,
        url: storyUrlFor(`checkbox_single/error`),
        viewports: [{ label: 'form-field', width: 800, height: 400 }],
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
