const gitState = require('git-state');
const chalk = require('chalk');

const log = console.log; // eslint-disable-line
const ok = '\u2713'; // The tick
const error = '\u2716'; // The cross

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

    if (branch !== 'main') {
      showError(
        `${error} You must be in the main branch to release. Currently you are in ${branch}.`,
      );
      err = true;
    }

    if (ahead !== 0) {
      showError(`${error} Your repo has changes not pushed to remote.`);
      err = true;
    }

    if (dirty !== 0) {
      showError(`${error} Your have uncommitted changes in you repo.`);
      err = true;
    }

    if (untracked !== 0) {
      showError(
        `${error} There ${
          untracked === 1 ? 'is' : 'are'
        } ${untracked} untracked file${untracked === 1 ? '' : 's'}.`,
      );
      err = true;
    }

    if (err) {
      showError(
        'Please ensure you are in the main branch and that the repo is in a clean state.',
        !testRun,
      );
    }

    log(chalk.green.dim(`${ok} Git repo clean.`));

    return branch;
  } catch (err) {
    showError(err, true);
  }

  return null;
}

module.exports = {
  checkRepoStatus,
  showError,
  ok,
  error,
};
