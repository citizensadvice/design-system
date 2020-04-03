/* eslint-disable import/no-extraneous-dependencies */
const childProcess = require('child_process');
const chalk = require('chalk');

const { log, error } = console;
const ci = process.argv.some(arg => arg === '--ci');

const baseCommand = 'npx backstop test --docker';
const command = ci ? `${baseCommand} --config=backstop-ci.json` : baseCommand;
const errorLog = [
    /compare \| ERROR/,
    /report \| [0-9]+ Failed/,
    /report \| \*\*\* Mismatch errors found \*\*\*/
];
const positiveLog = [/report \| [0-9]+ Passed/];
const neutralLog = [/SCENARIO/, /compare \| OK/, /report \|/];

let started = false;

const storyBook = childProcess.exec(
    'npm run styleguide -- --ci',
    [],
    (err, _, stderr) => {
        if (err) {
            error(chalk.red(err));
        }

        if (stderr) {
            error(chalk.red(stderr));
        }
    }
);

log(chalk.black('Starting Storybook, this may take a little while...'));

storyBook.stdout.on('data', data => {
    if (!started && /^webpack built/.test(data)) {
        started = true;
        log(chalk.green('Storybook started'));
        log(chalk.black('Running BackstopJS visual regression tests'));

        const backstop = childProcess.exec(`cd testing; ${command}`);

        backstop.stdout.on('data', backstopLogLine => {
            /* eslint-disable no-restricted-syntax */
            for (const test of errorLog) {
                if (test.test(backstopLogLine)) {
                    process.stderr.write(chalk.red(backstopLogLine));
                    return;
                }
            }

            for (const test of positiveLog) {
                if (test.test(backstopLogLine)) {
                    process.stdout.write(chalk.green(backstopLogLine));
                    return;
                }
            }

            for (const test of neutralLog) {
                if (test.test(backstopLogLine)) {
                    // output already has new line at end
                    process.stdout.write(chalk.black(backstopLogLine));
                    return;
                }
            }
            /* eslint-enable no-restricted-syntax  */
        });

        backstop.stderr.on('data', backstopError => {
            error(chalk.red(backstopError));
        });

        backstop.on('exit', code => {
            log(chalk.green(`BackstopJS completed with exit code ${code}`));
            storyBook.kill('SIGINT');
            process.exit(code);
        });
    }
});
