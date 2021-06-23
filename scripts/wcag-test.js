/*
 * Uses pa11y-ci to perform WCAG 2 AA accessibility tests
 */
const chalk = require('chalk');
const { exec } = require('child_process');

const storyBook = exec(
  'npm run styleguide -- --ci',
  { maxBuffer: 1024 * 5000 },
  (err, _, stderr) => {
    if (err) {
      console.error(chalk.red(err));
    }

    if (stderr) {
      console.error(chalk.red(stderr));
    }
  }
);

const runWcagTests = () => {
  const pa11y = exec('cd testing/wcag && npx pa11y-ci --config pa11yci.js');

  pa11y.stdout.on('data', (data) => console.log(data));

  pa11y.stderr.on('data', (backstopError) => {
    console.error(chalk.red(backstopError));
  });

  pa11y.on('exit', (code) => {
    console.log(chalk.green(`Pa11y completed with exit code ${code}`));
    storyBook.kill('SIGINT');
    process.exit(code);
  });
};

let started = false;
storyBook.stdout.on('data', (data) => {
  if (!started && /^webpack built/.test(data)) {
    started = true;
    console.log(chalk.green('Storybook started'));
    runWcagTests(storyBook);
  }
});
