const chalk = require('chalk');
const localScenarios = require('../testing/visual-regression/backstop.json');
const fs = require('fs');

const baseConfig = {};
const basePath = './testing/wcag/';

// build config file from localScenarios
// TODO: Upgrade storybook to 6 and use JSON export

const getComponentUrls = (host) => {
  return localScenarios.scenarios.map((scenario) => {
    if (host) {
      return scenario.url.replace('http://host.docker.internal:6006', host);
    } else {
      return scenario.url;
    }
  });
};

const createLocalPa11yConfigs = () => {
  const localUrls = getComponentUrls('http://localhost:6006');

  const localConfig = {
    ...baseConfig,
    urls: localUrls,
  };

  fs.writeFile(
    `${basePath}.pa11yci.local.json`,
    JSON.stringify(localConfig),
    (err) => {
      err
        ? console.log(chalk.red(err))
        : console.log(chalk.green('Local pa11y config updated successfully.'));
    }
  );
};

const createCiPa11yConfigs = () => {
  const ciUrls = getComponentUrls();

  const ciConfig = {
    ...baseConfig,
    urls: ciUrls,
  };

  fs.writeFile(
    `${basePath}.pa11yci.ci.json`,
    JSON.stringify(ciConfig),
    (err) => {
      err
        ? console.log(chalk.red(console.log(err)))
        : console.log(chalk.green('CI pa11y config updated successfully.'));
    }
  );
};

module.exports = {
  createCiPa11yConfigs,
  createLocalPa11yConfigs,
};
