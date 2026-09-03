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
just demo-dev
```

The engine code bundles a set of component previews which can be seen at `http://localhost:3000/rails/view_components`.

## Running Playwright tests

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

1. Run the test server with `npm run start-test-server`
2. Separately run `npm run start-playwright-server`
3. Then you ran run individual playwright commands e.g. `npx playwright --ui playwright/sample-form.spec.js`
