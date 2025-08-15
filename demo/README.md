# Rails Engine demo app

This app:

- Is used in CI to run smoke tests against to make sure each part of the design system works together as a whole.
- Acts as a reference implementation showing both how to configure the engine and how to load design system styles.
- Can be ran as a standalone Rails app for viewing component previews and to experiment with components.
- Includes sample forms using `CitizensAdviceComponents::FormBuilder`

## Running the demo app

> [!NOTE]
> This guide assumes you have first read [the setup guide](../contributing/02-local-setup.md) for the project as a whole and have run the top-level setup script

Following this you should be able to run the dev server with:

```sh
./bin/dev
```

The engine code bundles a set of component previews which can be seen at `http://localhost:3000/rails/view_components`.

## Running cypress tests

We use [Cypress](https://www.cypress.io/) for two main things:

1. To run accessibility checks against every component example using [`cypress-axe`](https://github.com/component-driven/cypress-axe)
2. For behavioural tests against any interactive components (e.g. targeted content)

You can run both from within the `demo` directory by either running:

```sh
./bin/rails cypress:open
```

Which will open the Cypress UI for interactive testing, or by running:

```sh
./bin/rails cypress:run
```

Which will run all tests in a headless browser.

## Running visual regression tests

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

```
npm run backstop:approve
```

You can run tests for a specific set of scenarios by passing a filter to the backstop command where `Example` is the search term you want to filter by.

```
npm run backstop -- --filter=Example
```

For more advanced details see the [BackstopJS Github's page](https://github.com/garris/BackstopJS)
