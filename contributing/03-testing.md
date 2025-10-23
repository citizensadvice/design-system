# Testing

This guide is split into two sections:

1. Running tests locally
2. Testing with your application

## Running tests locally

We have a number of different layers of tests:

- Static analysis (linting, code-formatting)
- Unit tests (jest for client-side code, rspec for ruby components)
- Cypress tests (for behavioural tests as well as accessibility checks)
- Backstop (for visual regression testing)

For development purposes we provide a top-level script to run all checks:

```
just check-all
```

This can take a while to run so is most useful to check your local environment and to run once you've finished developing a new feature. The rest of this guide covers the each type of check in more detail and how to run them individually.

## Formatting

We provide a just command for formatting the codebase:

```sh
just format
```

You can check the formatting without making changes with `just check-format`

### Prettier, Stylelint, ESLint, and Jest

The repository is centred around a node module which is managed by the `package.json` at the top-level of the repository. This provides commands for running prettier against the project as well as linting (eslint) and unit tests (jest) for client-side code.

All top-level package commands can be run using `npm run`:

| Command       | Description                                           |
| ------------- | ----------------------------------------------------- |
| `test`        | Runs all jest tests                                   |
| `lint`        | Runs all linting checks (prettier, eslint, stylelint) |
| `lint:css`    | Runs only `stylelint` on the project code             |
| `lint:js`     | Runs only `eslint` on the project code                |
| `lint:format` | Run `prettier --check` on the project code            |
| `format`      | Auto-format all eligible code with prettier           |

### RuboCop

For ruby code we run `rubocop` checks against our `engine`, `demo`, and `website` directories. From any of these directories run:

```sh
rake rubocop
```

You can also run `rake rubocop:autocorrect` or `rake rubocop:autocorrect_all` to handle auto-corrections.

### ERB Lint

We run `erb_lint` as templating lint check against our `engine` directory. From the `engine` directory run:

```sh
rake erb_lint
```

### RSpec

We run a suite of RSpec tests against our `engine` directory. From the `engine` directory run:

```
rake spec
```

We use Appraisal for managing different gemfiles for older Rails versions as well as for testing new ViewComponent versions. You can run appraisals using:

```sh
bundle exec appraisal install
```

Followed by:

```sh
bundle exec appraisal rake spec
```

See the [Appraisal docs](https://github.com/thoughtbot/appraisal) for a full list of commands.

### Cypress

We use [Cypress](https://www.cypress.io/) for two main things:

1. To run accessibility checks against every component example using [`cypress-axe`](https://github.com/component-driven/cypress-axe)
2. For behavioural tests against any interactive components (e.g. targeted content) as well as end-to-end tests for the design system form builder.

You can run both from within the `demo` directory by either running:

```sh
./bin/rails cypress:open
```

Which will open the Cypress UI for interactive testing, or by running:

```sh
./bin/rails cypress:run
```

Which will run all tests in a headless browser.

### BackstopJS

We use [BackstopJS](https://github.com/garris/BackstopJS) to automate visual regression testing of components by comparing DOM screenshots over time. The tests are run inside of Docker to ensure rendering consistency across different environments.

Firstly, run the demo app using:

```sh
./bin/rails server -e test
```

With the demo app running, you can start the backstop tests using:

```sh
npm run backstop
```

After a test run is complete you can run view the report in a browser using:

```sh
npm run backstop:report
```

If the test you ran looks good, then go ahead and approve it. Approving changes will update your reference files with the results from your last test. Future tests are compared against your most recent approved test screenshots.

```sh
npm run backstop:approve
```

You can run tests for a specific set of scenarios by passing a filter to the backstop command where `Example` is the search term you want to filter by.

```sh
npm run backstop -- --filter=Example
```

For more details see the [BackstopJS Github page](https://github.com/garris/BackstopJS)

## Testing with your application

If you'd like to test design system changes locally with your own Rails application you can configure it to run against local copy of the design system.

You'll first need to check out a copy of this repository locally and follow the [setup instructions](./02-local-setup.md).

The rest of the instructions assume that the design system has been checked out in the same parent directory as your project with the directory name `design-system`. If this is different you'll need to adjust the relative paths to suit your application.

You'll first need to change the path to the design system in your `package.json` to:

```
"@citizensadvice/design-system": "file:../design-system"
```

Then run `npm install` or `yarn install` depending on your project set up to install the local version of the node package.

You'll also want to change the path to the design system in your `Gemfile` to:

```rb
gem "citizens_advice_components", path: "../design-system/engine"
```

Then run run `bundle install` to install the local version of the Rails engine.

Following this you can run your application as normal to start using a local copy of the design system.

If you are making local changes to the design system you may need to restart your application to pick up any new changes.

Once you've finished testing remember to reset the change to your application's `package.json` and `Gemfile` respectively.

## Read next

[Release process →](./04-release-process.md)
