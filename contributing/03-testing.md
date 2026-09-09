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

```sh
just check-all
```

This can take a while to run so is most useful to check your local environment and to run once you've finished developing a new feature.

To run just the quick checks use:

```sh
just check-quick
```

The rest of this guide covers the each type of check in more detail and how to run them individually.

## Formatting

We provide a just recipe for formatting the codebase using Prettier:

```sh
just fmt
```

You can check the formatting without making changes with `just lint-fmt`

## Linting

Each component of the design system runs lint checks depending on the environment:

- The top-level package runs lint checks using Stylelint and Oxlint
- The engine and demo apps run lint checks using RuboCop and ERB_Lint

You can run them all with:

```sh
just lint
```

Or on a per-component level with e.g. `just lint-engine`

## Unit tests

Similar to lint checks, each component of the design system runs unit tests depending on the environment:

- The top-level package runs unit tests using Vites
- The engine and demo apps run unit tests using RSpec

You can run them all with:

```sh
just test
```

Or `just t` for short; or on a per-component level with e.g. `just test-engine`.

Specifically for engine checks, we use Appraisal for managing different gemfiles for older Rails versions. The Just recipe will run all versions. For details on working with individual appraisals see the [related engine guide](../demo/README.md).

## Browser tests

We use the `demo` app to run a series of browser tests, specifically:

- Cypress for component and accesibility testing; and
- BackstopJS for visual regression testing

You can run these tests using:

```sh
just test-demo
```

They also form part of the slower `test-all` and `check-all` commands. If you are looking to work directly with the tests themselves as part of development see the [related demo guide](../demo/README.md).

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
