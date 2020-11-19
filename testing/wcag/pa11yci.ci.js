const getComponentUrls = require('./get-component-urls');

module.exports = {
  defaults: { 
    chromeLaunchConfig: { 
      args: ['--no-sandbox'] 
    }, 
    ignore: [
      'WCAG2AA.Principle2.Guideline2_4.2_4_1.G1,G123,G124.NoSuchId'       // ignore missing anchor links in design-sytem
    ] 
  },
  urls: getComponentUrls('http://ca-styleguide:6006'),
};
