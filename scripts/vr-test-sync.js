/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const assert = require('assert').strict;
const chalk = require('chalk');
const fs = require('fs');

const localScenarios = require('../testing/backstop.json').scenarios;
const ciConfig = require('../testing/backstop-ci.json');

const onlyCheck = process.argv.some(arg => arg === '--check');

const localHost = 'http://host.docker.internal:6006';
const ciHost = 'http://ca-styleguide.test:6006';

const ciScenarios = ciConfig.scenarios;

const stripUrls = scenarios => {
    const acc = [];
    for (const scenario of scenarios) {
        const { url, referenceUrl, ...rest } = scenario;
        acc.push(rest);
    }
    return acc;
};

const fixUrl = url => url.replace(localHost, ciHost);

const checkSync = () => {
    try {
        assert.deepStrictEqual(
            stripUrls(localScenarios),
            stripUrls(ciScenarios)
        );
    } catch (e) {
        console.error(
            chalk.red(
                './testing/backstop.json and ./testing/backstop-ci.json are out of sync'
            )
        );
        console.debug(e.message);

        return false;
    }

    console.info(
        chalk.green(
            './testing/backstop.json and ./testing/backstop-ci.json are in sync'
        )
    );
    return true;
};

const syncScenarios = () => {
    const scenarios = [];

    for (const scenario of localScenarios) {
        const { url, referenceUrl, label, ...rest } = scenario;
        scenarios.push({
            label,
            url: fixUrl(url),
            referenceUrl: fixUrl(url),
            ...rest
        });
    }

    ciConfig.scenarios = scenarios;
    console.info('Writing backstop.json scenarios to backstop-ci.json');
    fs.writeFileSync(
        './testing/backstop-ci.json',
        JSON.stringify(ciConfig, null, 4)
    );
    console.info(chalk.green('Scenarios updated successfully.'));

    process.exit(0);
};

if (!onlyCheck) {
    if (checkSync()) {
        process.exit(0);
    } else {
        process.exit(1);
    }
} else if (!checkSync()) {
    syncScenarios();
}
