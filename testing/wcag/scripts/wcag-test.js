// /testing is the working dir
const pa11y = require('pa11y');
const chalk = require('chalk');
const { log, error } = console;
const localScenarios = require('../../visual-regression/backstop.json');

const waitOn = require('wait-on');

// ensure design-system is running
waitOn(
  {
    resources: ['http://localhost:6006'],
  },
  () => {
    log('Running accessibility tests...');

    // test urls as documented in backstop data
    const urls = localScenarios.scenarios.map((scenario) => {
      return scenario.url.replace(
        'http://host.docker.internal:6006',
        'http://localhost:6006'
      );
    });

    // prevent potential memory leak warning
    process.setMaxListeners(urls.length);

    // run pa11y tasks
    const pa11yTasks = [];
    let issueCount = 0;
    urls.forEach((url) => {
      pa11yTasks.push(
        pa11y(url).then(async (result) => {
          if (result.issues.length > 0) {
            log(chalk.red(`Error found on ${url}`));
            error(result);
            issueCount++;
          }
        })
      );
    });

    // log results to console
    Promise.all(pa11yTasks).then(() => {
      log('Accessibility tests complete:');
      if (issueCount > 0) {
        log(chalk.red(`  > ${issueCount} issues found`));
      } else {
        log(chalk.green('  > no issues found'));
      }
      process.exit(0);
    });
  }
);
