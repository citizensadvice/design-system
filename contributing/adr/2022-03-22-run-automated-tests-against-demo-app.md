# 2. Run automated tests against demo app

Date: 2022-03-22

## Status

Accepted

## Context

We currently run all our automated tests against the Storybook documentation site. This is not a good reflection of how components are typically used. We are also in the process of creating a new documentation site which will replace Storybook. We have a demo Rails application that is already used for some tests that could be used for all out automation tests.

## Decision

We will run all our automated tests against the demo Rails app rather than Storybook.

## Consequences

Migration has the following benefits:

- Allows us to decouple tests from Storybook
- Tests will be run against an environment that more closely resembles our production application
- Defines clearer boundaries between parts of the Design System. Tests run against a dedicated demo app rather than against a documentation site.

As a consequence we will need to either migrate tests as is over to the demo app (Backstop tests) or explore alternatives in the process (automation and accessibility tests).
