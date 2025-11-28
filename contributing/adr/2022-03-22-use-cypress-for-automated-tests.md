# 3. Use Cypress for automated tests

Date: 2022-03-22

## Status

Accepted

## Context

Given the decision in "2. Run automated tests against demo app" we want to explore alternative option for running our automated tests against the demo Rails app.

Our current feature tests are complex to maintain and duplicate a lot of what our rspec and visual regression tests cover.

The Design System is maintained largely by front-end developers so exploring alternate tools that better match the skill sets of the people maintaining components is good for long term maintainability.

## Decision

- We will use Cypress to handle our automated tests. We will only migrate tests that include real user interaction and not migrate any tests that are better covered by lower level unit tests or visual regression tests.
- We will use Cypress Testing Library to allow us to test components using matchers that best reflect how users will interact with components.
- We will use cypress-axe to replace our current pa11y smoke tests.

## Consequences

Future tests will need to be written using Cypress and developers will need to learn a new tool. We have validated that all maintainers are comfortable writing Cypress tests.

Pa11y will be removed as it is covered by cypress-axe and new component previews will automatically get tested for basic accessibility violations avoiding us needing to maintain a second tool to do this.
