// onBefore example (puppeteer engine)
module.exports = async (page, scenario, vp) => {
    await require('./loadCookies')(page, scenario);
  
    // Example: set user agent
    await page.setUserAgent('some user agent string here');
  
  };
  
  
  // onReady example (puppeteer engine)
  module.exports = async (page, scenario, vp) => {
    console.log('SCENARIO > ' + scenario.label);
    await require('./clickAndHoverHelper')(page, scenario);
  
    // Example: changing behavior based on config values
    if (vp.label === 'phone') {
      console.log( 'doing stuff for just phone viewport here' );
    }
  
    // add more stuff here...
  };