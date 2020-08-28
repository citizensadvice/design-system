// const BACKSTOP_TEST_CSS_OVERRIDE = '* {transition: none !important;}';

module.exports = function (page, scenario) {
    // inject arbitrary css to override styles
    // page.evaluate(`window._styleData = '${BACKSTOP_TEST_CSS_OVERRIDE}'`);
    page.evaluate(() => {
        const style = document.createElement('style');
        style.type = 'text/css';
        const styleNode = document.createTextNode(
            '* {transition: none !important;}'
        );
        style.appendChild(styleNode);
        document.head.appendChild(style);
    });

    console.log('BACKSTOP_TEST_CSS_OVERRIDE injected for: ' + scenario.label);
};
