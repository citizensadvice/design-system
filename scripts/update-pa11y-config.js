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
 * @ TODO: Upgrade storybook to 6 and use JSON export
 */
const chalk = require('chalk');
const fs = require('fs');
const backstopConfigCommon = require('../testing/visual-regression/backstop-common');

function writeConfig(fileName, componentUrls) {
  const configToWrite = {
    defaults: {
      chromeLaunchConfig: {
        args: ['--no-sandbox'],
      },
    },
    urls: componentUrls,
  };

  fs.writeFile(
    `./testing/wcag/${fileName}`,
    JSON.stringify(configToWrite, null, 2),
    (err) => {
      if (err) {
        console.log(chalk.red(err));
      } else {
        console.log(chalk.green(`${fileName} updated successfully.`));
      }
    }
  );
}

// Extracts urls from backstop testing scenarios, replaces host as directed
const getComponentUrls = (_backstopConfig) =>
  _backstopConfig.scenarios.map((scenario) => scenario.url);

const createLocalPa11yConfigs = () => {
  writeConfig(
    '.pa11yci.local.json',
    getComponentUrls(backstopConfigCommon('http://localhost:6006'))
  );
};

const createCiPa11yConfigs = () => {
  writeConfig(
    '.pa11yci.ci.json',
    getComponentUrls(backstopConfigCommon('ca-styleguide:6006'))
  );
};

module.exports = {
  createCiPa11yConfigs,
  createLocalPa11yConfigs,
};
