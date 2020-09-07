/*
 * Builds pa11y config files by extracting URLs from the backstop VR test data located
 * in /testing/visual-regression.
 *
 * One config file for local testing is generated with links to storybook running locally
 * (.pa11yci.local.json)
 *
 * Another is created for CI testing that points to internal docker in the same way as
 * the visual regression tests. (.pa11yci.ci.json)
 *
 * Options for both configs can be added into the baseConfig object.
 */

const chalk = require('chalk');
const localScenarios = require('../testing/visual-regression/backstop.json');
const fs = require('fs');

const baseConfig = {};
const basePath = './testing/wcag/';

// TODO: Upgrade storybook to 6 and use JSON export

// Extracts urls from backstop testing scenarios, replaces host as directed
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
