module.exports = function (baseUrl) {
  return {
    id: 'backstop_default',
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
    onBeforeScript: 'puppet/onBefore.js',
    onReadyScript: 'puppet/onReady.js',
    scenarios: [
      {
        label: '2_Design_Foundations_COLOUR_LANGUAGE',
        cookiePath: 'backstop_data/engine_scripts/cookies.json',
        url: `${baseUrl}/iframe.html?id=2-design-foundations--colour-language`,
        referenceUrl: `${baseUrl}/iframe.html?id=2-design-foundations--colour-language`,
        readyEvent: '',
        readySelector: '.cads-styleguide__wrapper',
        delay: 0,
        hideSelectors: [],
        removeSelectors: [
          '.cads-styleguide__breakpoint-label',
          'h1',
          '.cads-styleguide__language-label',
        ],
        hoverSelector: '',
        clickSelector: '',
        postInteractionWait: 0,
        selectors: ['.cads-styleguide__wrapper'],
        selectorExpansion: true,
        expect: 0,
        misMatchThreshold: 0.1,
        requireSameDimensions: true,
      },
      {
        label: '2_Design_Foundations_COLOUR_PALETTE',
        cookiePath: 'backstop_data/engine_scripts/cookies.json',
        url: `${baseUrl}/iframe.html?id=2-design-foundations--colour-palette`,
        referenceUrl: `${baseUrl}/iframe.html?id=2-design-foundations--colour-palette`,
        readyEvent: '',
        readySelector: '.cads-styleguide__wrapper',
        delay: 0,
        hideSelectors: [],
        removeSelectors: [
          '.cads-styleguide__breakpoint-label',
          'h1',
          '.cads-styleguide__language-label',
        ],
        hoverSelector: '',
        clickSelector: '',
        postInteractionWait: 0,
        selectors: ['.cads-styleguide__wrapper'],
        selectorExpansion: true,
        expect: 0,
        misMatchThreshold: 0.1,
        requireSameDimensions: true,
      },
      {
        label: '3_Components_ADVICE_FEEDBACK_question',
        cookiePath: 'backstop_data/engine_scripts/cookies.json',
        url: `${baseUrl}/iframe.html?id=3-components--advice-feedback`,
        referenceUrl: `${baseUrl}/iframe.html?id=3-components--advice-feedback`,
        readyEvent: '',
        readySelector: '#a11yComponentToTest',
        delay: 500,
        hideSelectors: [],
        removeSelectors: [
          '.cads-styleguide__breakpoint-label',
          '.cads-styleguide__language-label',
        ],
        hoverSelector: '#a11yComponentToTest',
        clickSelector: '',
        postInteractionWait: 0,
        selectors: ['#a11yComponentToTest'],
        selectorExpansion: true,
        expect: 0,
        misMatchThreshold: 0.1,
        requireSameDimensions: true,
      },
      {
        label: '3_Components_ADVICE_FEEDBACK_thank_you',
        cookiePath: 'backstop_data/engine_scripts/cookies.json',
        url: `${baseUrl}/iframe.html?id=3-components--advice-feedback`,
        referenceUrl: `${baseUrl}/iframe.html?id=3-components--advice-feedback`,
        readyEvent: '',
        readySelector: '#a11yComponentToTest',
        delay: 500,
        hideSelectors: [],
        removeSelectors: [
          '.cads-styleguide__breakpoint-label',
          '.cads-styleguide__language-label',
        ],
        hoverSelector: '#a11yComponentToTest',
        clickSelector: '#cads-advice-feedback__yes',
        postInteractionWait: 100,
        selectors: ['#a11yComponentToTest'],
        selectorExpansion: true,
        expect: 0,
        misMatchThreshold: 0.1,
        requireSameDimensions: true,
      },
      {
        label: '3_Components_ASSET_HYPERLINK',
        cookiePath: 'backstop_data/engine_scripts/cookies.json',
        url: `${baseUrl}/iframe.html?id=3-components--asset-hyperlink`,
        referenceUrl: `${baseUrl}/iframe.html?id=3-components--asset-hyperlink`,
        readyEvent: '',
        readySelector: '#a11yComponentToTest',
        delay: 0,
        hideSelectors: [],
        removeSelectors: [
          '.cads-styleguide__breakpoint-label',
          '.cads-styleguide__language-label',
        ],
        hoverSelector: '',
        clickSelector: '',
        postInteractionWait: 0,
        selectors: ['#a11yComponentToTest'],
        selectorExpansion: true,
        expect: 0,
        misMatchThreshold: 0.1,
        requireSameDimensions: true,
      },
      {
        label: '3_Components_BREADCRUMBS',
        cookiePath: 'backstop_data/engine_scripts/cookies.json',
        url: `${baseUrl}/iframe.html?id=3-components--breadcrumb`,
        referenceUrl: `${baseUrl}/iframe.html?id=3-components--breadcrumb`,
        readyEvent: '',
        readySelector: '#a11yComponentToTest',
        delay: 0,
        hideSelectors: [],
        removeSelectors: [
          '.cads-styleguide__breakpoint-label',
          '.cads-styleguide__language-label',
        ],
        hoverSelector: '#a11yComponentToTest',
        clickSelector: '',
        postInteractionWait: 0,
        selectors: ['#a11yComponentToTest'],
        selectorExpansion: true,
        expect: 0,
        misMatchThreshold: 0.1,
        requireSameDimensions: true,
      },
      {
        label: '3_Components_BUTTONS',
        cookiePath: 'backstop_data/engine_scripts/cookies.json',
        url: `${baseUrl}/iframe.html?id=3-components--buttons`,
        referenceUrl: `${baseUrl}/iframe.html?id=3-components--buttons`,
        readyEvent: '',
        readySelector: '#a11yComponentToTest',
        delay: 0,
        hideSelectors: [],
        removeSelectors: [
          '.cads-styleguide__breakpoint-label',
          '.cads-styleguide__language-label',
        ],
        hoverSelector: '#a11yComponentToTest',
        clickSelector: '.cads-button',
        postInteractionWait: 0,
        selectors: ['#a11yComponentToTest'],
        selectorExpansion: true,
        expect: 0,
        misMatchThreshold: 0.1,
        requireSameDimensions: true,
      },
      {
        label: '3_Components_CALLOUTS',
        cookiePath: 'backstop_data/engine_scripts/cookies.json',
        url: `${baseUrl}/iframe.html?id=3-components--callout`,
        referenceUrl: `${baseUrl}/iframe.html?id=3-components--callout`,
        readyEvent: '',
        readySelector: '#a11yComponentToTest',
        delay: 0,
        hideSelectors: [],
        removeSelectors: [
          '.cads-styleguide__breakpoint-label',
          '.cads-styleguide__language-label',
        ],
        hoverSelector: '#a11yComponentToTest',
        clickSelector: '',
        postInteractionWait: 0,
        selectors: ['#a11yComponentToTest'],
        selectorExpansion: true,
        expect: 0,
        misMatchThreshold: 0.1,
        requireSameDimensions: true,
      },
      {
        label: '3_Components_CONTACT_DETAILS',
        cookiePath: 'backstop_data/engine_scripts/cookies.json',
        url: `${baseUrl}/iframe.html?id=3-components--contact-details`,
        referenceUrl: `${baseUrl}/iframe.html?id=3-components--contact-details`,
        readyEvent: '',
        readySelector: '#a11yComponentToTest',
        delay: 0,
        hideSelectors: [],
        removeSelectors: [
          '.cads-styleguide__breakpoint-label',
          '.cads-styleguide__language-label',
        ],
        hoverSelector: '#a11yComponentToTest',
        clickSelector: '',
        postInteractionWait: 0,
        selectors: ['#a11yComponentToTest'],
        selectorExpansion: true,
        expect: 0,
        misMatchThreshold: 0.1,
        requireSameDimensions: true,
      },
      {
        label: '3_Components_ERROR_SUMMARY',
        cookiePath: 'backstop_data/engine_scripts/cookies.json',
        url: `${baseUrl}/iframe.html?id=3-components--error-summary`,
        referenceUrl: `${baseUrl}/iframe.html?id=3-components--error-summary`,
        readyEvent: '',
        readySelector: '#a11yComponentToTest',
        delay: 0,
        hideSelectors: [],
        removeSelectors: [
          '.cads-styleguide__breakpoint-label',
          '.cads-styleguide__language-label',
        ],
        hoverSelector: '#a11yComponentToTest',
        clickSelector: '',
        postInteractionWait: 0,
        selectors: ['#a11yComponentToTest'],
        selectorExpansion: true,
        expect: 0,
        misMatchThreshold: 0.1,
        requireSameDimensions: true,
      },
      {
        label: '3_Components_FOOTER',
        cookiePath: 'backstop_data/engine_scripts/cookies.json',
        url: `${baseUrl}/iframe.html?id=3-components--footer`,
        referenceUrl: `${baseUrl}/iframe.html?id=3-components--footer`,
        readyEvent: '',
        readySelector: '#a11yComponentToTest',
        delay: 0,
        hideSelectors: [],
        removeSelectors: [
          '.cads-styleguide__breakpoint-label',
          '.cads-styleguide__language-label',
        ],
        hoverSelector: '#a11yComponentToTest',
        clickSelector: '',
        postInteractionWait: 0,
        selectors: ['#a11yComponentToTest'],
        selectorExpansion: true,
        expect: 0,
        misMatchThreshold: 0.1,
        requireSameDimensions: true,
      },
      {
        label: '3_Components_HEADER',
        cookiePath: 'backstop_data/engine_scripts/cookies.json',
        url: `${baseUrl}/iframe.html?id=3-components--header`,
        referenceUrl: `${baseUrl}/iframe.html?id=3-components--header`,
        readyEvent: '',
        readySelector: '#a11yComponentToTest',
        delay: 0,
        hideSelectors: [],
        removeSelectors: [
          '.cads-styleguide__breakpoint-label',
          '.cads-styleguide__language-label',
        ],
        hoverSelector: '#a11yComponentToTest',
        clickSelector: '',
        postInteractionWait: 0,
        selectors: ['#a11yComponentToTest'],
        selectorExpansion: true,
        expect: 0,
        misMatchThreshold: 0.1,
        requireSameDimensions: true,
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
        removeSelectors: [
          '.cads-styleguide__breakpoint-label',
          '.cads-styleguide__language-label',
        ],
        clickSelector: '.cads-search-reveal',
        postInteractionWait: 0,
        selectors: ['#a11yComponentToTest'],
        selectorExpansion: true,
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
        cookiePath: 'backstop_data/engine_scripts/cookies.json',
        url: `${baseUrl}/iframe.html?id=3-components--input`,
        referenceUrl: `${baseUrl}/iframe.html?id=3-components--input`,
        readyEvent: '',
        readySelector: '#a11yComponentToTest',
        delay: 0,
        hideSelectors: [],
        removeSelectors: [
          '.cads-styleguide__breakpoint-label',
          '.cads-styleguide__language-label',
        ],
        hoverSelector: '#a11yComponentToTest',
        clickSelector: '',
        postInteractionWait: 0,
        selectors: ['#a11yComponentToTest'],
        selectorExpansion: true,
        expect: 0,
        misMatchThreshold: 0.1,
        requireSameDimensions: true,
      },
      {
        label: '3_Components_LOGO',
        cookiePath: 'backstop_data/engine_scripts/cookies.json',
        url: `${baseUrl}/iframe.html?id=3-components--logo`,
        referenceUrl: `${baseUrl}/iframe.html?id=3-components--logo`,
        readyEvent: '',
        readySelector: '#a11yComponentToTest',
        delay: 0,
        hideSelectors: [],
        removeSelectors: [
          '.cads-styleguide__breakpoint-label',
          '.cads-styleguide__language-label',
        ],
        hoverSelector: '#a11yComponentToTest',
        clickSelector: '',
        postInteractionWait: 0,
        selectors: ['#a11yComponentToTest'],
        selectorExpansion: true,
        expect: 0,
        misMatchThreshold: 0.1,
        requireSameDimensions: true,
      },
      {
        label: '3_Components_NAVIGATION',
        cookiePath: 'backstop_data/engine_scripts/cookies.json',
        url: `${baseUrl}/iframe.html?id=3-components--navigation`,
        referenceUrl: `${baseUrl}/iframe.html?id=3-components--navigation`,
        readyEvent: '',
        readySelector: '.js-CadsGreedyNav',
        delay: 750,
        hideSelectors: [],
        removeSelectors: [
          '.cads-styleguide__breakpoint-label',
          '.cads-styleguide__language-label',
          '.cads-styleguide-max-content-width',
          'h1',
        ],
        hoverSelector: '#a11yComponentToTest',
        clickSelector: '.cads-greedy-nav__dropdown-toggle',
        postInteractionWait: 1000,
        selectors: [],
        selectorExpansion: true,
        expect: 0,
        misMatchThreshold: 0.1,
        requireSameDimensions: true,
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
        cookiePath: 'backstop_data/engine_scripts/cookies.json',
        url: `${baseUrl}/iframe.html?id=3-components--navigation`,
        referenceUrl: `${baseUrl}/iframe.html?id=3-components--navigation`,
        readyEvent: '',
        readySelector: '.js-CadsGreedyNav',
        delay: 750,
        hideSelectors: [],
        removeSelectors: [
          '.cads-styleguide__breakpoint-label',
          '.cads-styleguide__language-label',
          '.cads-styleguide-max-content-width',
          'h1',
        ],
        keyPressSelectors: [{ selector: '.cads-nav-link', keyPress: 'Tab' }],
        clickSelector: '',
        postInteractionWait: 1000,
        selectors: [],
        selectorExpansion: true,
        expect: 0,
        misMatchThreshold: 0.1,
        requireSameDimensions: true,
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
        cookiePath: 'backstop_data/engine_scripts/cookies.json',
        url: `${baseUrl}/iframe.html?id=3-components--notice-banner`,
        referenceUrl: `${baseUrl}/iframe.html?id=3-components--notice-banner`,
        readyEvent: '',
        readySelector: '#a11yComponentToTest',
        delay: 0,
        hideSelectors: [],
        removeSelectors: [
          '.cads-styleguide__breakpoint-label',
          '.cads-styleguide__language-label',
        ],
        hoverSelector: '#a11yComponentToTest',
        clickSelector: '',
        postInteractionWait: 0,
        selectors: ['#a11yComponentToTest'],
        selectorExpansion: true,
        expect: 0,
        misMatchThreshold: 0.1,
        requireSameDimensions: true,
      },
      {
        label: '3_Components_PAGE_REVIEW',
        cookiePath: 'backstop_data/engine_scripts/cookies.json',
        url: `${baseUrl}/iframe.html?id=3-components--page-review`,
        referenceUrl: `${baseUrl}/iframe.html?id=3-components--page-review`,
        readyEvent: '',
        readySelector: '#a11yComponentToTest',
        delay: 0,
        hideSelectors: [],
        removeSelectors: [
          '.cads-styleguide__breakpoint-label',
          '.cads-styleguide__language-label',
        ],
        hoverSelector: '#a11yComponentToTest',
        clickSelector: '',
        postInteractionWait: 0,
        selectors: ['#a11yComponentToTest'],
        selectorExpansion: true,
        expect: 0,
        misMatchThreshold: 0.1,
        requireSameDimensions: true,
      },
      {
        label: '3_Components_PAGINATION',
        cookiePath: 'backstop_data/engine_scripts/cookies.json',
        url: `${baseUrl}/iframe.html?id=3-components--pagination`,
        referenceUrl: `${baseUrl}/iframe.html?id=3-components--pagination`,
        readyEvent: '',
        readySelector: '#a11yComponentToTest',
        delay: 0,
        hideSelectors: [],
        removeSelectors: [
          '.cads-styleguide__breakpoint-label',
          '.cads-styleguide__language-label',
        ],
        hoverSelector: '#a11yComponentToTest',
        clickSelector: '',
        postInteractionWait: 0,
        selectors: ['#a11yComponentToTest'],
        selectorExpansion: true,
        expect: 0,
        misMatchThreshold: 0.1,
        requireSameDimensions: true,
      },
      {
        label: '3_Components_PAGING_INFO',
        cookiePath: 'backstop_data/engine_scripts/cookies.json',
        url: `${baseUrl}/iframe.html?id=3-components--paging-info`,
        referenceUrl: `${baseUrl}/iframe.html?id=3-components--paging-info`,
        readyEvent: '',
        readySelector: '#a11yComponentToTest',
        delay: 100,
        hideSelectors: [],
        removeSelectors: [
          '.cads-styleguide__breakpoint-label',
          '.cads-styleguide__language-label',
        ],
        hoverSelector: '#a11yComponentToTest',
        clickSelector: '',
        postInteractionWait: 0,
        selectors: ['#a11yComponentToTest'],
        selectorExpansion: true,
        expect: 0,
        misMatchThreshold: 0.1,
        requireSameDimensions: true,
      },
      {
        label: '3_Components_RADIO_GROUP',
        cookiePath: 'backstop_data/engine_scripts/cookies.json',
        url: `${baseUrl}/iframe.html?id=3-components--radio-group`,
        referenceUrl: `${baseUrl}/iframe.html?id=3-components--radio-group`,
        readyEvent: '',
        readySelector: '#a11yComponentToTest',
        delay: 0,
        hideSelectors: [],
        removeSelectors: [
          '.cads-styleguide__breakpoint-label',
          '.cads-styleguide__language-label',
        ],
        hoverSelector: '#a11yComponentToTest',
        clickSelector: '.cads-radio-button-checkmark',
        postInteractionWait: 0,
        selectors: ['#a11yComponentToTest'],
        selectorExpansion: true,
        expect: 0,
        misMatchThreshold: 0.1,
        requireSameDimensions: true,
      },
      {
        label: '3_Components_RADIO_GROUP_small',
        cookiePath: 'backstop_data/engine_scripts/cookies.json',
        url: `${baseUrl}/iframe.html?id=3-components--radio-group-small`,
        referenceUrl: `${baseUrl}/iframe.html?id=3-components--radio-group-small`,
        readyEvent: '',
        readySelector: '#a11yComponentToTest',
        delay: 0,
        hideSelectors: [],
        removeSelectors: [
          '.cads-styleguide__breakpoint-label',
          '.cads-styleguide__language-label',
        ],
        hoverSelector: '#a11yComponentToTest',
        clickSelector: '.cads-radio-button-checkmark',
        postInteractionWait: 0,
        selectors: ['#a11yComponentToTest'],
        selectorExpansion: true,
        expect: 0,
        misMatchThreshold: 0.1,
        requireSameDimensions: true,
      },
      {
        label: '3_Components_SEARCH',
        cookiePath: 'backstop_data/engine_scripts/cookies.json',
        url: `${baseUrl}/iframe.html?id=3-components--search`,
        referenceUrl: `${baseUrl}/iframe.html?id=3-components--search`,
        readyEvent: '',
        readySelector: '#a11yComponentToTest',
        delay: 0,
        hideSelectors: [],
        removeSelectors: [
          '.cads-styleguide__breakpoint-label',
          '.cads-styleguide__language-label',
        ],
        hoverSelector: '#a11yComponentToTest',
        clickSelector: '',
        postInteractionWait: 0,
        selectors: ['#a11yComponentToTest'],
        selectorExpansion: true,
        expect: 0,
        misMatchThreshold: 0.1,
        requireSameDimensions: true,
      },
      {
        label: '3_Components_SUCCESS_MESSAGE',
        cookiePath: 'backstop_data/engine_scripts/cookies.json',
        url: `${baseUrl}/iframe.html?id=3-components--success-message`,
        referenceUrl: `${baseUrl}/iframe.html?id=3-components--success-message`,
        readyEvent: '',
        readySelector: '#a11yComponentToTest',
        delay: 0,
        hideSelectors: [],
        removeSelectors: [
          '.cads-styleguide__breakpoint-label',
          '.cads-styleguide__language-label',
        ],
        hoverSelector: '#a11yComponentToTest',
        clickSelector: '',
        postInteractionWait: 0,
        selectors: ['#a11yComponentToTest'],
        selectorExpansion: true,
        expect: 0,
        misMatchThreshold: 0.1,
        requireSameDimensions: true,
      },
      {
        label: '3_Components_TARGED_CONTENT',
        cookiePath: 'backstop_data/engine_scripts/cookies.json',
        url: `${baseUrl}/iframe.html?id=3-components--targeted-content`,
        referenceUrl: `${baseUrl}/iframe.html?id=3-components--targeted-content`,
        readyEvent: '',
        readySelector: '#a11yComponentToTest',
        delay: 0,
        hideSelectors: [],
        removeSelectors: [
          '.cads-styleguide__breakpoint-label',
          '.cads-styleguide__language-label',
        ],
        hoverSelector: '#a11yComponentToTest',
        clickSelector: '.cads-targeted-content',
        postInteractionWait: 0,
        selectors: ['#a11yComponentToTest'],
        selectorExpansion: true,
        expect: 0,
        misMatchThreshold: 0.1,
        requireSameDimensions: true,
      },
      {
        label: '3_Components_TEXTAREA',
        cookiePath: 'backstop_data/engine_scripts/cookies.json',
        url: `${baseUrl}/iframe.html?id=3-components--textarea`,
        referenceUrl: `${baseUrl}/iframe.html?id=3-components--textarea`,
        readyEvent: '',
        readySelector: '#a11yComponentToTest',
        delay: 0,
        hideSelectors: [],
        removeSelectors: [
          '.cads-styleguide__breakpoint-label',
          '.cads-styleguide__language-label',
        ],
        hoverSelector: '#a11yComponentToTest',
        clickSelector: '',
        postInteractionWait: 0,
        selectors: ['#a11yComponentToTest'],
        selectorExpansion: true,
        expect: 0,
        misMatchThreshold: 0.1,
        requireSameDimensions: true,
      },
      {
        label: '3_Components_WEBSITE-FEEDBACK',
        cookiePath: 'backstop_data/engine_scripts/cookies.json',
        url: `${baseUrl}/iframe.html?id=3-components--website-feedback`,
        referenceUrl: `${baseUrl}/iframe.html?id=3-components--website-feedback`,
        readyEvent: '',
        readySelector: '#a11yComponentToTest',
        delay: 0,
        hideSelectors: [],
        removeSelectors: [
          '.cads-styleguide__breakpoint-label',
          '.cads-styleguide__language-label',
        ],
        hoverSelector: '#a11yComponentToTest',
        clickSelector: '',
        postInteractionWait: 0,
        selectors: ['#a11yComponentToTest'],
        selectorExpansion: true,
        expect: 0,
        misMatchThreshold: 0.1,
        requireSameDimensions: true,
      },
      {
        label: '3_Components_RELATED-CONTENT',
        cookiePath: 'backstop_data/engine_scripts/cookies.json',
        url: `${baseUrl}/iframe.html?id=3-components--related-content`,
        referenceUrl: `${baseUrl}/iframe.html?id=3-components--related-content`,
        readyEvent: '',
        readySelector: '#a11yComponentToTest',
        delay: 0,
        hideSelectors: [],
        removeSelectors: [
          '.cads-styleguide__breakpoint-label',
          '.cads-styleguide__language-label',
        ],
        hoverSelector: '#a11yComponentToTest',
        clickSelector: '',
        postInteractionWait: 0,
        selectors: ['#a11yComponentToTest'],
        selectorExpansion: true,
        expect: 0,
        misMatchThreshold: 0.1,
        requireSameDimensions: true,
      },
      {
        label: '3_Components_TABLES',
        cookiePath: 'backstop_data/engine_scripts/cookies.json',
        url: `${baseUrl}/iframe.html?id=3-components--tables`,
        referenceUrl: `${baseUrl}/iframe.html?id=3-components--tables`,
        readyEvent: '',
        readySelector: '#a11yComponentToTest',
        delay: 0,
        hideSelectors: [],
        removeSelectors: [
          '.cads-styleguide__breakpoint-label',
          '.cads-styleguide__language-label',
        ],
        hoverSelector: '#a11yComponentToTest',
        clickSelector: '',
        postInteractionWait: 0,
        selectors: ['#a11yComponentToTest'],
        selectorExpansion: true,
        expect: 0,
        misMatchThreshold: 0.1,
        requireSameDimensions: true,
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
