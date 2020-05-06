/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { prompt } = require('inquirer');
const currentVersion = require('../package.json').version;
const { checkRepoStatus } = require('./releaseHelpers');

const PATH = path.join(__dirname, '..');

checkRepoStatus(PATH);
prompt([
    {
        message: `You are releasing version ${currentVersion}. Is this correct?`,
        type: 'confirm',
        name: 'confirmation',
        default: false
    }
]).then(versionConfirmed => {
    if (!versionConfirmed.confirmation) {
        process.exit(1);
    }
});
