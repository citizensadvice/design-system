# Testing

## Linting

We run `eslint`, `stylelint`, and `prettier` as lint checks.

From the project root run:

```sh
npm run lint
```

## Unit tests

We use Jest for basic unit tests for our JavaScript as well as testing sass output:

From the project root run:

```sh
npm run test
```

## Cypress tests

We use Cypress for behavioural tests, see the [demo app README for instructions on how to run these](../demo/README.md)

## Visual regression testing

We use Backstop for visual regression tests, see the [demo app README for instructions on how to run these](../demo/README.md)

## Accessibility testing

Accessibility testing is performed using `cypress-axe` as part of our Cypress tests.

See the [demo app README for instructions on how to run these](../demo/README.md).
