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
bin/dev
```

The engine code bundles a set of component previews which can be seen at `http://localhost:3000/rails/view_components`.

## Authoring Playwright tests

Our playwright tests are structured as follows:

- Isolated accessibility and visual regression tests for individual component in `playwright/components`. Note: this doesn't use [Playwright's component testing mode](https://playwright.dev/docs/test-components) as these are still server-rendered page.
- End-to-end page-based scenarios in `playwright/e2e` e.g. covering the form builder or full sample pages.
- Helpers in `playwright/playwright-helpers.js`

When authoring new tests you should run `playwright` commands directly e.g. to focus on a single test.

When running this way, you'll need to first start the playwright server with:

```sh
npm run start-playwright-server
```

Separately, start the development server with:

```sh
npm run start-test-server
```

Alternatively you can use plain `bin/dev` if you also want to work on component code. Then you can run individual playwright commands.

To open the interactive UI, use:

```sh
npm run playwright:ui
```

To run an individual test:

```sh
npx playwright --ui playwright/sample-form.spec.js
```

To update visual regression test snapshots:

```sh
npm run playwright:update
```
