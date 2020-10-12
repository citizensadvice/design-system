const getComponentUrls = require('./get-component-urls');

module.exports = {
  defaults: { chromeLaunchConfig: { args: ['--no-sandbox'] } },
  urls: getComponentUrls('http://localhost:6006'),
};
