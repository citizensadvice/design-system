module.exports = function backstopCommon(baseUrl) {
  const commonViewports = {
    phone: { label: 'phone', width: 320, height: 480 },
    small: { label: 'small', width: 640, height: 960 },
    medium: { label: 'medium', width: 800, height: 600 },
    large: { label: 'large', width: 1024, height: 768 },
  };

  function urlFor(componentId) {
    return `${baseUrl}/rails/view_components/citizens_advice_components/${componentId}`;
  }

  return {
    id: 'backstop_demo_app',
    viewports: Object.values(commonViewports),
    onReadyScript: 'onReady.js',
    scenarios: [
      {
        label: 'Components/Targeted content',
        url: urlFor('targeted_content/default'),
      },
      {
        label: 'Components/Targeted content (open)',
        url: urlFor('targeted_content/default'),
        clickSelector: '.cads-targeted-content',
      },
      {
        label: 'Components/Targeted content adviser',
        url: urlFor('targeted_content/adviser'),
      },
      {
        label: 'Components/Targeted content adviser (open)',
        url: urlFor('targeted_content/adviser'),
        clickSelector: '.cads-targeted-content',
      },
      {
        label: 'Components/Targeted content (fallback)',
        url: urlFor('targeted_content/default'),
        onBeforeScript: 'onBeforeDisableJavascript.js',
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
