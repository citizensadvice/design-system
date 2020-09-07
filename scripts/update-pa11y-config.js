/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
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
const fs = require('fs');
const localScenarios = require('../testing/visual-regression/backstop.json');

const dockerHost = 'ca-styleguide:6006';
const baseConfig = {
  defaults: {
    chromeLaunchConfig: {
      args: ['--no-sandbox'],
    },
  },
};
const basePath = './testing/wcag/';

// TODO: Upgrade storybook to 6 and use JSON export

// Extracts urls from backstop testing scenarios, replaces host as directed
const getComponentUrls = (host) =>
  localScenarios.scenarios.map((scenario) => {
    if (host) {
      return scenario.url.replace('http://host.docker.internal:6006', host);
    }
    return scenario.url;
  });

const createLocalPa11yConfigs = () => {
  const localUrls = getComponentUrls('http://localhost:6006');

  const localConfig = {
    ...baseConfig,
    urls: localUrls,
  };

  fs.writeFile(
    `${basePath}.pa11yci.local.json`,
    JSON.stringify(localConfig, null, 2),
    (err) => {
      if (err) {
        console.log(chalk.red(err));
      } else {
        console.log(chalk.green('Local pa11y config updated successfully.'));
      }
    }
  );
};

const createCiPa11yConfigs = () => {
  const ciUrls = getComponentUrls(dockerHost);

  const ciConfig = {
    ...baseConfig,
    urls: ciUrls,
  };

  fs.writeFile(
    `${basePath}.pa11yci.ci.json`,
    JSON.stringify(ciConfig, null, 2),
    (err) => {
      if (err) {
        console.log(chalk.red(console.log(err)));
      } else {
        console.log(chalk.green('CI pa11y config updated successfully.'));
      }
    }
  );
};

module.exports = {
  createCiPa11yConfigs,
  createLocalPa11yConfigs,
};
