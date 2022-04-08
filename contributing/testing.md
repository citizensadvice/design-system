# Testing

## Visual regression testing

We use BackstopJS to automate visual regression testing of components by comparing DOM screenshots over time.

### Usage

The tests are run inside of Docker to ensure consistency accross different environments (mac, windows and linux). You can install Docker by following the instructions at [docker.com](https://www.docker.com/products/docker-desktop).

Backstop tests are run against the demo app. The following commands should all be run within `demo/`.

#### Set up the demo app

You can install backstop and set up the demo app by running the following from within the `demo/` directory:

```sh
./bin/setup
```

#### Run tests

First, run the demo app using:

```sh
./bin rails server -e test
```

With the demo app running, you can start the backstop tests using:

```sh
npm run backstop
```

#### Open the report

After a test run is complete you can run view the report in a browser using:

```sh
npm run backstop:report
```

#### Approve changes

If the test you ran looks good, then go ahead and approve it. Approving changes will update your reference files with the results from your last test. Future tests are compared against your most recent approved test screenshots.

```
npm run backstop:approve
```

### Run the tests for a specific set of scenarios:

You can run tests for a specific set of scenarios by passing a filter to the backstop command where `Example` is the search term you want to filter by.

```
npm run backstop -- --filter=Example
```

For more advanced details see the [BackstopJS Github's page](https://github.com/garris/BackstopJS)

## Accessibility testing

Accessibility testing is performed using `cypress-axe` as part of our Cypress tests.

See the [demo app README for instructions on how to run these](../demo/README.md).
