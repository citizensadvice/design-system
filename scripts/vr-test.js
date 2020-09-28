/* eslint-disable import/no-extraneous-dependencies */
const childProcess = require('child_process');
const chalk = require('chalk');

const { log, error } = console;
const ci = process.argv.some((arg) => arg === '--ci');

const baseCommand =
  'cd ../testing/visual-regression && npx backstop test --docker';
const command = ci
  ? `${baseCommand} --config=backstop-config-ci.json`
  : `${baseCommand} --config=backstop-config.js`;

const boldLog = [/report \| \d+/];
const errorLog = [
  /compare \| ERROR/,
  /report \| \*{3} Mismatch errors found \*{3}/,
];
const positiveLog = [/report \| Test completed.../];
const neutralLog = [/SCENARIO/, /compare \| OK/, /report \|/];

/*
 * Prints out white listed log lines with highlighting.
 *
 * New lines are already appended to the end of log lines. `chunk`
 * usually a single line but is sometimes multiline.
 */
const printWhitelistedLogLines = (chunk) => {
  /* eslint-disable no-restricted-syntax */
  for (const regexp of boldLog) {
    if (regexp.test(chunk)) {
      process.stdout.write(chalk.bold(chunk));
      return;
    }
  }
  for (const regexp of errorLog) {
    if (regexp.test(chunk)) {
      process.stderr.write(chalk.red(chunk));
      return;
    }
  }

  for (const regexp of positiveLog) {
    if (regexp.test(chunk)) {
      process.stdout.write(chalk.green(chunk));
      return;
    }
  }

  for (const regexp of neutralLog) {
    if (regexp.test(chunk)) {
      // output already has new line at end
      process.stdout.write(chunk);
      return;
    }
  }
};

let started = false;

const runBackstopTests = (storyBook) => {
  log(chalk.green('Running BackstopJS visual regression tests'));

  const backstop = childProcess.exec(`cd testing; ${command}`);

  backstop.stdout.on('data', printWhitelistedLogLines);

  backstop.stderr.on('data', (backstopError) => {
    error(chalk.red(backstopError));
  });

  backstop.on('exit', (code) => {
    log(chalk.green(`BackstopJS completed with exit code ${code}`));
    storyBook.kill('SIGINT');
    process.exit(code);
  });
};

const storyBook = childProcess.exec(
  'npm run styleguide -- --ci',
  { maxBuffer: 1024 * 5000 },
  (err, _, stderr) => {
    if (err) {
      error(chalk.red(err));
    }

    if (stderr) {
      error(chalk.red(stderr));
    }
  }
);

storyBook.stdout.on('data', (data) => {
  if (!started && /^webpack built/.test(data)) {
    started = true;
    log(chalk.green('Storybook started'));
    runBackstopTests(storyBook);
  }
});
