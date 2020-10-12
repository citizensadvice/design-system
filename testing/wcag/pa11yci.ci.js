const getComponentUrls = require('./get-component-urls');

module.exports = {
  defaults: { chromeLaunchConfig: { args: ['--no-sandbox'] } },
  urls: getComponentUrls('http://ca-styleguide:6006'),
};
