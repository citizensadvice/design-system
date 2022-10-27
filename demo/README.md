# Rails engine demo app

This app:

- Is used in CI to run smoke tests against to make sure each part of the design system works together as a whole.
- Acts as a reference implementation showing both how to configure the engine and how to load design system styles.
- Can be ran as a standalone Rails app for viewing component previews and to experiment with components.

## Running the demo app

### Run the setup script:

```sh
./bin/setup
```

### Compile the packs:

Ensure the build is up to date before compiling packs by running:

```sh
npm run build
```

from the project root and then:

```sh
./bin/rails assets:precompile
```

from the `demo` directory.

### Start Rails:

```sh
./bin/dev
```

The engine code bundles a set of component previews which can be seen at `http://localhost:3000/rails/view_components`.

## Running cypress tests

Open the Cypress UI:

```
./bin/rails cypress:open
```

Run all tests in a headless browser:

```
./bin/rails cypress:run
```

## Running visual regression tests

We use BackstopJS to automate visual regression testing of components by comparing DOM screenshots over time.

### Usage

The tests are run inside of Docker to ensure consistency across different environments (mac, windows and linux). You can install Docker by following the instructions at [docker.com](https://www.docker.com/products/docker-desktop).

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
