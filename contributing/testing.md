# Testing

## Visual regression testing

We use BackstopJS to automate visual regression testing of components by comparing DOM screenshots over time.

### Usage

The tests are run inside of Docker to ensure consistency accross different environments (mac, windows and linux). You can install Docker by following the instructions at [docker.com](https://www.docker.com/products/docker-desktop).

**Install backstop:**

You can install backstop by running:

```
npm run vr-test:install
```

This will install the visual regression testing tools. These are installed under `/testing` and have a separate package to the main Design System, this is done to keep the install time of the Design System low.

**Run tests:**

With the docs running via `npm start` you can run the visual regression tests with:

```
npm run vr-test:standalone
```

After a test run is complete you can run `vr-test:open-report` to view the report in a browser.

**Approve changes:**

If the test you ran looks good, then go ahead and approve it. Approving changes will update your reference files with the results from your last test. Future tests are compared against your most recent approved test screenshots.

```
npm run vr-test:approve
```

### Low-level Usage

Low-level backstop commands must be run from within the visual-regression directory.

```
cd /testing/visual-regression
```

From here you can run `backstop` commands directly.

**Set up the baseline that you’re testing against:**

```
npx backstop reference --docker --config=backstop-config.js
```

**Set up the baseline for a specific scenario that you’re testing against:**

```
npx backstop reference --docker --config=backstop-config.js --filter=<scenario.label>
```

**Run the test for a specific scenario:**

```
npx backstop reference --docker --config=backstop-config.js --filter=<scenario.label>
```

For more advanced details see the [BackstopJS Github's page](https://github.com/garris/BackstopJS)

## Accessibility testing

Accessibility testing is performed using `cypress-axe` as part of our Cypress tests.

See the [demo app README for instructions on how to run these](../demo/README.md).
