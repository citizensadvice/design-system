/*
 * Uses pa11y-ci and pa11y configs to perform WCAG 2 AA accessibility tests
 */

const chalk = require('chalk');
const { log, error } = console;
const childProcess = require('child_process');
const {
  createCiPa11yConfigs,
  createLocalPa11yConfigs,
} = require('./update-pa11y-config.js');

// use correct pa11y config based on args provided
const ci = process.argv.some((arg) => arg === '--ci');
const baseCommand = 'cd wcag && npx pa11y-ci';
const command = ci
  ? `${baseCommand} --config .pa11yci.ci.json`
  : `${baseCommand} --config .pa11yci.local.json`;

// update pa11y configs using data in vr backstop scenarios
if (ci) {
  createCiPa11yConfigs();
} else {
  createLocalPa11yConfigs();
}

// run storybook
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

let started = false;
storyBook.stdout.on('data', (data) => {
  if (!started && /^webpack built/.test(data)) {
    started = true;
    log(chalk.green('Storybook started'));
    runWcagTests(storyBook);
  }
});

// perform WCAG tests
const runWcagTests = (storybook) => {
  log(chalk.green('Running pa11y WCAG tests'));

  const pa11y = childProcess.exec(`cd testing; ${command}`);

  pa11y.stdout.on('data', (data) => console.log(data));

  pa11y.stderr.on('data', (backstopError) => {
    error(chalk.red(backstopError));
  });

  pa11y.on('exit', (code) => {
    log(chalk.green(`pa11y completed with exit code ${code}`));
    storyBook.kill('SIGINT');
    process.exit(code);
  });
};
