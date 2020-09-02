const childProcess = require('child_process');
const chalk = require('chalk');
const { SIGINT } = require('constants');

const { log, error } = console;

let started = false;

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

const runWcagTests = (storybook) => {
  const wcag = childProcess.exec('cd testing && npx pa11y https://www.bbc.com');

  wcag.stdout.on('data', (chunk) => {
    console.log(chunk);
  });

  wcag.on('exit', (code) => {
    console.log('wcag exit');
    storyBook.kill(SIGINT);
    process.exit(code);
  });
};

storyBook.stdout.on('data', (data) => {
  if (!started && /^webpack built/.test(data)) {
    started = true;
    log(chalk.green('Storybook started'));
    runWcagTests(storyBook);
  }
});
