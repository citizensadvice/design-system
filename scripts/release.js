/* eslint-disable import/no-extraneous-dependencies */
const simpleGit = require('simple-git');
const fs = require('fs-extra');
const chalk = require('chalk');
const path = require('path');
const { prompt } = require('inquirer');
const { spawnSync } = require('child_process');
const semver = require('semver');
const moment = require('moment');
const { checkBuildOutput } = require('./check-size');
const { checkRepoStatus, ok, error, showError } = require('./releaseHelpers');

const log = console.log; // eslint-disable-line
const DO_NOT_RELEASE = 'Do not release';
const PATH = path.join(__dirname, '..');
const ORG_NAME = '@citizensadvice';
const PACKAGE_NAME = 'design-system';
const FULL_PACKAGE_NAME = `${ORG_NAME}/${PACKAGE_NAME}`;

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
    spaces: 2,
    EOL: '\n',
  });
  log(
    chalk.green(
      `${ok} Updated version number in ${FULL_PACKAGE_NAME}/package.json to ${newVersion}`
    )
  );
}

/* ///////////////////////////////////////////////////////////////////////// */
/* START HERE ////////////////////////////////////////////////////////////// */
/* ///////////////////////////////////////////////////////////////////////// */

// Check the repo status and get the current branch name
checkRepoStatus(PATH);
chalk.bold(`You are preparing a new release.
This script will create a branch based on your chosen version number and you must then create a
pull request to master.`);
prompt([
  {
    message: 'Have you updated the Changelog?',
    type: 'confirm',
    name: 'confirmation',
    default: false,
  },
]).then((changelogUpdated) => {
  if (!changelogUpdated.confirmation) {
    process.exit(1);
  }

  // Get the last published version from npm, we need to do this
  // as alpha releases are not stored so getting the version from
  // package.json won't be reliable
  let packageVersions = spawnSync(`npm view ${FULL_PACKAGE_NAME} time`, {
    cwd: __dirname,
    shell: true,
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
      packageSemver.inc('patch').toString(),
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
    choices,
  }).then((answer) => {
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
        default: false,
      },
    ]).then((confirmation) => {
      if (!confirmation.confirmation) {
        process.exit(1);
      }

      const newVersionBranch = `v${newVersion}`;
      const git = simpleGit(PATH);

      git.checkoutBranch(newVersionBranch, 'HEAD', (gitErr) => {
        if (gitErr) {
          showError(gitErr, true);
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

        // Rebuild the docs
        const docsBuildStatus = spawnSync('npm run docs:build', {
          cwd: __dirname,
          shell: true,
        }).status;

        if (docsBuildStatus === 0) {
          log(chalk.green.dim(`${ok} Documentation build complete.`));
        } else {
          showError(
            `${error} Documentation build failed, check the repo status.`,
            true
          );
        }

        try {
          log(chalk.green.bold('Release prepared.'));

          prompt([
            {
              message:
                'Do you want to commit the changes and prepare the branch?',
              type: 'confirm',
              name: 'confirmation',
              default: false,
            },
          ]).then((commitChanges) => {
            if (commitChanges.confirmation) {
              let releaseMessage = '';
              releaseMessage += `v${newVersion}`;

              git
                .add('.')
                .commit(releaseMessage)
                .push('origin', newVersionBranch, (gitErr2) => {
                  if (gitErr2) {
                    showError(gitErr2, true);
                  }

                  log(
                    chalk.green(
                      `${ok} Changes committed and pushed. You must now create a pull request for branch v${newVersion}.`
                    )
                  );
                });
            } else {
              log(chalk.bold('Changes not committed. Check the repo status.'));
              process.exit(1);
            }
          });
        } catch (e) {
          showError(e, true);
        }
      });
    });
  });
});
