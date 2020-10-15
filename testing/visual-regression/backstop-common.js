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
        label: 'Components/OISC Warning/With title and description',
        url: storyUrlFor('components-oisc-warning--with-title-and-description'),
        selectors: ['.cads-oisc-warning'],
      },
      {
        label: 'Components/OISC Warning/Title only',
        url: storyUrlFor('components-oisc-warning--title-only'),
        selectors: ['.cads-oisc-warning'],
      },
      {
        label: 'Components/OISC Warning/Sticky (scrolled)',
        url: storyUrlFor('components-oisc-warning--sticky'),
        selectors: ['viewport'],
        clickSelector: '#heading-anchor',
        postInteractionWait: 500,
        viewports: [{ label: 'sticky', width: 1000, height: 600 }],
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
        label: 'Components/Breadcrumbs/Default',
        url: storyUrlFor('components-breadcrumbs--breadcrumbs-default'),
        selectors: ['.cads-breadcrumbs'],
      },
      {
        label: 'Components/Breadcrumbs/No Collapse',
        url: storyUrlFor('components-breadcrumbs--breadcrumbs-no-collapse'),
        selectors: ['.cads-breadcrumbs'],
      },

      // Old format component tests below here
      {
        label: '2_Design_Foundations_COLOUR_LANGUAGE',
        url: `${baseUrl}/iframe.html?id=2-design-foundations--colour-language`,
        removeSelectors: ['h1', '.cads-styleguide__language-label'],
      },
      {
        label: '2_Design_Foundations_COLOUR_PALETTE',
        url: `${baseUrl}/iframe.html?id=2-design-foundations--colour-palette`,
        removeSelectors: ['h1', '.cads-styleguide__language-label'],
      },
      {
        label: '3_Components_ASSET_HYPERLINK',
        url: `${baseUrl}/iframe.html?id=3-components--asset-hyperlink`,
        readySelector: '#a11yComponentToTest',
        removeSelectors: ['.cads-styleguide__language-label'],
        selectors: ['#a11yComponentToTest'],
      },
      {
        label: '3_Components_CONTACT_DETAILS',
        url: `${baseUrl}/iframe.html?id=3-components--contact-details`,
        readySelector: '#a11yComponentToTest',
        removeSelectors: ['.cads-styleguide__language-label'],
        hoverSelector: '#a11yComponentToTest',
        selectors: ['#a11yComponentToTest'],
      },
      {
        label: '3_Components_ERROR_SUMMARY',
        url: `${baseUrl}/iframe.html?id=3-components--error-summary`,
        readySelector: '#a11yComponentToTest',
        removeSelectors: ['.cads-styleguide__language-label'],
        hoverSelector: '#a11yComponentToTest',
        selectors: ['#a11yComponentToTest'],
      },
      {
        label: '3_Components_FOOTER',
        url: `${baseUrl}/iframe.html?id=3-components--footer`,
        readySelector: '#a11yComponentToTest',
        removeSelectors: ['.cads-styleguide__language-label'],
        hoverSelector: '#a11yComponentToTest',
        selectors: ['#a11yComponentToTest'],
      },
      {
        label: '3_Components_HEADER',
        url: `${baseUrl}/iframe.html?id=3-components--header`,
        readySelector: '#a11yComponentToTest',
        removeSelectors: ['.cads-styleguide__language-label'],
        hoverSelector: '#a11yComponentToTest',
        selectors: ['#a11yComponentToTest'],
      },
      {
        label: '3_Components_HEADER_EXPANDED',
        cookiePath: 'backstop_data/engine_scripts/cookies.json',
        url: `${baseUrl}/iframe.html?id=3-components--header`,
        referenceUrl: `${baseUrl}/iframe.html?id=3-components--header`,
        readyEvent: '',
        readySelector: '#a11yComponentToTest',
        delay: 0,
        hideSelectors: [],
        removeSelectors: ['.cads-styleguide__language-label'],
        clickSelector: '.cads-search-reveal',
        postInteractionWait: 0,
        selectors: ['#a11yComponentToTest'],
        expect: 0,
        misMatchThreshold: 0.1,
        requireSameDimensions: true,
        viewports: [
          {
            label: 'phone',
            width: 320,
            height: 480,
          },
        ],
      },
      {
        label: '3_Components_INPUT',
        url: `${baseUrl}/iframe.html?id=3-components--input`,
        readySelector: '#a11yComponentToTest',
        removeSelectors: ['.cads-styleguide__language-label'],
        hoverSelector: '#a11yComponentToTest',
        selectors: ['#a11yComponentToTest'],
      },
      {
        label: '3_Components_LOGO',
        url: `${baseUrl}/iframe.html?id=3-components--logo`,
        readySelector: '#a11yComponentToTest',
        removeSelectors: ['.cads-styleguide__language-label'],
        hoverSelector: '#a11yComponentToTest',
        selectors: ['#a11yComponentToTest'],
      },
      {
        label: '3_Components_NAVIGATION',
        url: `${baseUrl}/iframe.html?id=3-components--navigation`,
        readySelector: '.js-CadsGreedyNav',
        delay: 750,
        removeSelectors: [
          '.cads-styleguide__language-label',
          '.cads-styleguide-max-content-width',
          'h1',
        ],
        hoverSelector: '#a11yComponentToTest',
        clickSelector: '.cads-greedy-nav__dropdown-toggle',
        postInteractionWait: 1000,
        selectors: [],
        viewports: [
          {
            label: 'phone',
            width: 320,
            height: 400,
          },
          {
            label: 'Small',
            width: 641,
            height: 300,
          },
          {
            label: 'Medium',
            width: 800,
            height: 200,
          },
          {
            label: 'Large',
            width: 1024,
            height: 100,
          },
        ],
      },
      {
        label: '3_Components_NAVIGATION_BUTTONS',
        url: `${baseUrl}/iframe.html?id=3-components--navigation`,
        readySelector: '.js-CadsGreedyNav',
        delay: 750,
        removeSelectors: [
          '.cads-styleguide__language-label',
          '.cads-styleguide-max-content-width',
          'h1',
        ],
        keyPressSelectors: [{ selector: '.cads-nav-link', keyPress: 'Tab' }],
        postInteractionWait: 1000,
        selectors: [],
        viewports: [
          {
            label: 'phone',
            width: 320,
            height: 400,
          },
          {
            label: 'Small',
            width: 641,
            height: 300,
          },
          {
            label: 'Medium',
            width: 800,
            height: 200,
          },
          {
            label: 'Large',
            width: 1024,
            height: 100,
          },
        ],
      },
      {
        label: '3_Components_NOTICE_BANNER',
        url: `${baseUrl}/iframe.html?id=3-components--notice-banner`,
        readySelector: '#a11yComponentToTest',
        removeSelectors: ['.cads-styleguide__language-label'],
        hoverSelector: '#a11yComponentToTest',
        selectors: ['#a11yComponentToTest'],
      },
      {
        label: '3_Components_PAGE_REVIEW',
        url: `${baseUrl}/iframe.html?id=3-components--page-review`,
        readySelector: '#a11yComponentToTest',
        removeSelectors: ['.cads-styleguide__language-label'],
        hoverSelector: '#a11yComponentToTest',
        selectors: ['#a11yComponentToTest'],
      },
      {
        label: '3_Components_PAGINATION',
        url: `${baseUrl}/iframe.html?id=3-components--pagination`,
        readySelector: '#a11yComponentToTest',
        removeSelectors: ['.cads-styleguide__language-label'],
        hoverSelector: '#a11yComponentToTest',
        selectors: ['#a11yComponentToTest'],
      },
      {
        label: '3_Components_PAGING_INFO',
        url: `${baseUrl}/iframe.html?id=3-components--paging-info`,
        readySelector: '#a11yComponentToTest',
        delay: 100,
        removeSelectors: ['.cads-styleguide__language-label'],
        hoverSelector: '#a11yComponentToTest',
        selectors: ['#a11yComponentToTest'],
      },
      {
        label: '3_Components_RADIO_GROUP',
        url: `${baseUrl}/iframe.html?id=3-components--radio-group`,
        readySelector: '#a11yComponentToTest',
        removeSelectors: ['.cads-styleguide__language-label'],
        hoverSelector: '#a11yComponentToTest',
        clickSelector: '.cads-radio-button-checkmark',
        selectors: ['#a11yComponentToTest'],
      },
      {
        label: '3_Components_RADIO_GROUP_small',
        url: `${baseUrl}/iframe.html?id=3-components--radio-group-small`,
        readySelector: '#a11yComponentToTest',
        removeSelectors: ['.cads-styleguide__language-label'],
        hoverSelector: '#a11yComponentToTest',
        clickSelector: '.cads-radio-button-checkmark',
        selectors: ['#a11yComponentToTest'],
      },
      {
        label: '3_Components_SUCCESS_MESSAGE',
        url: `${baseUrl}/iframe.html?id=3-components--success-message`,
        readySelector: '#a11yComponentToTest',
        removeSelectors: ['.cads-styleguide__language-label'],
        hoverSelector: '#a11yComponentToTest',
        selectors: ['#a11yComponentToTest'],
      },
      {
        label: '3_Components_TARGED_CONTENT',
        url: `${baseUrl}/iframe.html?id=3-components--targeted-content`,
        readySelector: '#a11yComponentToTest',
        removeSelectors: ['.cads-styleguide__language-label'],
        hoverSelector: '#a11yComponentToTest',
        clickSelector: '.cads-targeted-content',
        selectors: ['#a11yComponentToTest'],
      },
      {
        label: '3_Components_TEXTAREA',
        url: `${baseUrl}/iframe.html?id=3-components--textarea`,
        readySelector: '#a11yComponentToTest',
        removeSelectors: ['.cads-styleguide__language-label'],
        hoverSelector: '#a11yComponentToTest',
        selectors: ['#a11yComponentToTest'],
      },
      {
        label: '3_Components_WEBSITE-FEEDBACK',
        url: `${baseUrl}/iframe.html?id=3-components--website-feedback`,
        readySelector: '#a11yComponentToTest',
        removeSelectors: ['.cads-styleguide__language-label'],
        hoverSelector: '#a11yComponentToTest',
        selectors: ['#a11yComponentToTest'],
      },
      {
        label: '3_Components_RELATED-CONTENT',
        url: `${baseUrl}/iframe.html?id=3-components--related-content`,
        readySelector: '#a11yComponentToTest',
        removeSelectors: ['.cads-styleguide__language-label'],
        hoverSelector: '#a11yComponentToTest',
        selectors: ['#a11yComponentToTest'],
      },
      {
        label: '3_Components_TABLES',
        url: `${baseUrl}/iframe.html?id=3-components--tables`,
        readySelector: '#a11yComponentToTest',
        removeSelectors: ['.cads-styleguide__language-label'],
        hoverSelector: '#a11yComponentToTest',
        selectors: ['#a11yComponentToTest'],
      },
      {
        label: '3_Components_RELATED_CONTENT_ADVISERNET',
        cookiePath: 'backstop_data/engine_scripts/cookies.json',
        url: `${baseUrl}/iframe.html?id=3-components--advisernet-related-content`,
        referenceUrl: `${baseUrl}/iframe.html?id=3-components--advisernet-related-content`,
        readyEvent: '',
        readySelector: '#a11yComponentToTest',
        delay: 0,
        hideSelectors: [],
        removeSelectors: ['.cads-styleguide__language-label'],
        hoverSelector: '#a11yComponentToTest',
        clickSelector: '',
        postInteractionWait: 0,
        selectors: ['#a11yComponentToTest'],
        expect: 0,
        misMatchThreshold: 0.1,
        requireSameDimensions: true,
        viewports: [
          {
            label: 'Medium',
            width: 800,
            height: 600,
          },
          {
            label: 'Large',
            width: 1024,
            height: 768,
          },
        ],
      },
      {
        label: '3_Components_RELATED_CONTENT_ADVISERNET_SMALL',
        cookiePath: 'backstop_data/engine_scripts/cookies.json',
        url: `${baseUrl}/iframe.html?id=3-components--advisernet-related-content`,
        referenceUrl: `${baseUrl}/iframe.html?id=3-components--advisernet-related-content`,
        readyEvent: '',
        readySelector: '#a11yComponentToTest',
        delay: 0,
        hideSelectors: [],
        removeSelectors: ['.cads-styleguide__language-label'],
        hoverSelector: '#a11yComponentToTest',
        clickSelector: '.cads-targeted-content',
        postInteractionWait: 0,
        selectors: ['#a11yComponentToTest'],
        expect: 0,
        misMatchThreshold: 0.1,
        requireSameDimensions: true,
        viewports: [
          {
            label: 'phone',
            width: 320,
            height: 480,
          },
          {
            label: 'Small',
            width: 640,
            height: 960,
          },
        ],
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
