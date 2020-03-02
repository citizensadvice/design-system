/* eslint-disable import/no-extraneous-dependencies */
const simpleGit = require('simple-git');
const gitState = require('git-state');
const fs = require('fs-extra');
const chalk = require('chalk');
const path = require('path');
const { prompt } = require('inquirer');
const { spawnSync } = require('child_process');
const semver = require('semver');
const moment = require('moment');
const { checkBuildOutput } = require('./check-size');

const log = console.log; // eslint-disable-line
const ok = '\u2713'; // The tick
const error = '\u2716'; // The cross
const DO_NOT_RELEASE = 'Do not release';
const PATH = path.join(__dirname, '..');
const ORG_NAME = '@citizensadvice';
const PACKAGE_NAME = 'design-system';
const FULL_PACKAGE_NAME = `${ORG_NAME}/${PACKAGE_NAME}`;

const showError = (err, exit) => {
    log(chalk.red.bold(err));

    if (exit) {
        process.exit(1);
    }
};

function checkRepoStatus(repo, testRun) {
    if (!gitState.isGitSync(repo)) {
        showError(`${error} Could not find git repo info for ${repo}.`, true);
    }

    try {
        const { branch, ahead, dirty, untracked } = gitState.checkSync(repo);

        let err = false;

        if (branch !== 'master') {
            showError(
                `${error} You must be in the master branch to release. Currently you are in ${branch}.`
            );
            err = true;
        }

        if (ahead !== 0) {
            showError(`${error} Your repo has changes not pushed to remote.`);
            err = true;
        }

        if (dirty !== 0) {
            showError(`${error} Your have uncommited changes in you repo.`);
            err = true;
        }

        if (untracked !== 0) {
            showError(
                `${error} There ${
                    untracked === 1 ? 'is' : 'are'
                } ${untracked} untracked file${untracked === 1 ? '' : 's'}.`
            );
            err = true;
        }

        if (err) {
            showError(
                'Please ensure you are in the master branch and the the repo is in a clean state.',
                !testRun
            );
        }

        log(chalk.green.dim(`${ok} Git repo clean.`));

        return branch;
    } catch (err) {
        showError(err, true);
    }

    return null;
}

function updateVersionNumber(newVersion) {
    log(
        chalk.blue.dim(
            `${ok} Updating version number in ${FULL_PACKAGE_NAME}/package.json to ${newVersion}`
        )
    );
    // Update the version number in package.json
    const PACKAGE_JSON = path.join(PATH, 'package.json');
    const packageJson = fs.readJsonSync(PACKAGE_JSON);
    packageJson.version = newVersion;
    // Write the updated file
    fs.writeJsonSync(PACKAGE_JSON, packageJson, {
        spaces: 4,
        EOL: '\n'
    });
    log(
        chalk.green(
            `${ok} Updated version number in ${FULL_PACKAGE_NAME}/package.json to ${newVersion}`
        )
    );
}

function publishToNPM(newVersion) {
    const publishDir = PATH;

    /* eslint-disable prefer-destructuring */
    const status = spawnSync(`npm publish ${publishDir}`, {
        stdio: 'inherit',
        shell: true
    }).status;
    /* eslint-enable */

    if (status === 0) {
        log(
            chalk.green.dim(
                `${ok} npm publish of ${FULL_PACKAGE_NAME}@${newVersion} successful`
            )
        );
    } else {
        showError(
            `${error} npm publish of ${FULL_PACKAGE_NAME}@${newVersion} failed. Check your repo status and permissions and retry.`,
            true
        );
    }
}

/* ///////////////////////////////////////////////////////////////////////// */
/* START HERE ////////////////////////////////////////////////////////////// */
/* ///////////////////////////////////////////////////////////////////////// */

// Check the repo status and get the current branch name
const branchName = checkRepoStatus(PATH);

prompt([
    {
        message: 'Have you updated the Changelog?',
        type: 'confirm',
        name: 'confirmation',
        default: false
    }
]).then(confirmation => {
    if (!confirmation.confirmation) {
        process.exit(1);
    }
});

// Get the last published version from npm, we need to do this as alpha releases are not stored so
// getting the version from package.json won't be reliable
let packageVersions = spawnSync(`yarn info ${FULL_PACKAGE_NAME} versions`, {
    cwd: __dirname,
    shell: true
})
    .stdout.toString()
    .split(',');
packageVersions = packageVersions[packageVersions.length - 1];
packageVersions = packageVersions.substring(packageVersions.indexOf("'") + 1);
packageVersions = packageVersions.substring(0, packageVersions.indexOf("'"));

const packageVersion =
    packageVersions ||
    require(path.join(__dirname, '..', 'package.json')).version; // eslint-disable-line
const packageSemver = semver.parse(packageVersion);
log(
    `The latest published version of ${FULL_PACKAGE_NAME} is currently ${chalk.bold(
        packageVersion
    )}`
);

// Setup the available versions
const choices = [];
if (semver.prerelease(packageSemver)) {
    choices.push(packageSemver.inc('prerelease').toString());
} else {
    choices.push(packageSemver.inc('prepatch', 'alpha').toString());
}
choices.push(
    ...[
        packageSemver.inc('patch').toString(),
        packageSemver.inc('preminor', 'alpha').toString(),
        packageSemver.inc('minor').toString(),
        packageSemver.inc('premajor', 'alpha').toString(),
        packageSemver.inc('patch').toString()
    ]
);
choices.push(DO_NOT_RELEASE);

const currentVersion = packageVersion; // eslint-disable-line

log(chalk.dim('---'));

// Ask what version we want to release these packages as
prompt({
    message: `Do you want to bump ${FULL_PACKAGE_NAME} from v${currentVersion} to`,
    type: 'list',
    name: 'newVersion',
    choices
}).then(answer => {
    // Get confirmation
    log(answer);
    const { newVersion } = answer;
    if (newVersion === DO_NOT_RELEASE) {
        showError('You chose not to release any packaages.', true);
    }

    prompt([
        {
            message: `You chose to release:\n${FULL_PACKAGE_NAME}@${newVersion}\nIs this correct?`,
            type: 'confirm',
            name: 'confirmation',
            default: false
        }
    ]).then(confirmation => {
        if (!confirmation.confirmation) {
            process.exit(1);
        }

        updateVersionNumber(newVersion);
        checkBuildOutput(true);

        const changelogPath = path.join(PATH, 'CHANGELOG.md');
        const changelog = fs.readFileSync(changelogPath, 'utf8');

        // Add the new entry
        const changelogEntry = `## <sub>v${newVersion}</sub>\n\n#### ${moment().format(
            '_MMM. D, YYYY_'
        )}`;
        const newChangelog = `${changelogEntry}\n\n${changelog}`;
        fs.writeFileSync(changelogPath, newChangelog, 'utf8');

        try {
            const git = simpleGit(PATH);
            log(chalk.green.bold('Release prepared.'));

            prompt([
                {
                    message:
                        'Do you want to commit the changes, push and release?',
                    type: 'confirm',
                    name: 'confirmation',
                    default: false
                }
            ]).then(commitChanges => {
                if (commitChanges.confirmation) {
                    let releaseMessage = '';
                    releaseMessage += `v${newVersion}`;

                    git.add('.')
                        .commit(releaseMessage)
                        .push('origin', branchName, gitErr => {
                            if (gitErr) {
                                showError(gitErr, true);
                            }

                            log(
                                chalk.green(`${ok} Changes commited and pushed`)
                            );

                            // publishToNPM(newVersion);
                        });
                } else {
                    log(
                        chalk.bold(
                            'Changes not commited. Check the repo status.'
                        )
                    );
                    process.exit(0);
                }
            });
        } catch (e) {
            showError(e, true);
        }
    });
});
