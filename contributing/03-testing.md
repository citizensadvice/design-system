# Testing

This guide is split into two sections:

1. Running tests locally
2. Testing with your application

## Running tests locally

We have a number of different layers of tests:

- Static analysis (linting, code-formatting)
- Unit tests (jest for client-side code, rspec for ruby components)
- Playwright tests (visual regression testing, behavioural tests as well as accessibility checks)

For development purposes we provide a top-level script to run all checks:

```
just check-all
```

This can take a while to run so is most useful to check your local environment and to run once you've finished developing a new feature. The rest of this guide covers the each type of check in more detail and how to run them individually.

## Formatting

We provide a just command for formatting the codebase:

```sh
just format
```

You can check the formatting without making changes with `just format-check`

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

We use [Playwright](https://playwright.dev) for interactive testing of components and example pages, covering a mix of:

- Visual regression tests for all component states
- Basic accessibility testing with aXe
- Behavioural tests against any interactive components (e.g. targeted content)
- End-to-end tests for form builder examples

You can run these from within the `demo` directory by running:

```sh
npm run playwright
```

If you want to update visual regression test snapshots you can use:

```sh
npm run playwright:update
```

And to open the interactive UI, use:

```sh
npm run playwright:ui
```

When authoring new tests it can be more useful to run `playwright` commands directly e.g. to focus on a single test. When running this way, you'll need to:

1. Start the playwright server with `bin/start-playwright-server`
2. Separately run a local Rails server `bin/dev`
3. You can now run individual playwright commands e.g. `npx playwright --ui playwright/sample-form.spec.js`

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
