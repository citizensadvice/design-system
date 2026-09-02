# Consolidate testing tools

Date: 2026-09-01

## Status

Accepted

## Context

We currently run a mix of different testing tools for component code:

- BackstopJS for visual regression testing
- Cypress for some behavioural tests and end to end testing of forms
- Cypress for basic accessibility smoke testing using aXe
- Vite for minimal component JavaScript testing using Testing Library
- Vite for node-base SCSS library tests

The primary motivation to revisit this test design is that BackstopJS is no longer maintained and depends on an outdated Puppeteer version with known security vulnerabilities.

## Decision

Proposes the following simplifications:

- Consolidate both Cypress and BackstopJS with Playwright, which is actively maintained and provides built-in visual comparison support.
- Include accessibility checks inline within each components Playwright scenarios. The previous Cypress tests had a generic aXe scenario which loaded up each component in turn. This had the benefit of applying when any new component was added but did not allow us to re-check on different states. Forgoes the automatic test in favour of more comprehensive state tests as a trade-off.
- Remove minimal `lib` tests using Vite, Testing Library, and JSDOM, in favour of a consolidated Playwright test suite. There's nothing being tested in here that isn't better tested via a full browser environment
- Rewrite the remaining SCSS library tests using plain `node:test` as we no longer require the features of Vitest.

## Consequences

The primary motivation and consequence of this change is to remove the dependency on BackstopJS in favour of a maintained alternative and to consolidate on a single browser testing tools.

The secondary benefits are a significant rationalisation of the test design for components, removing further dependencies on Vitest, JSDOM, and Testing Library. All client-side tests can be tested against a consistent real browser environment and remaining conformance tests can be written using inbuilt node testing tools.

Migrating to Playwright also fixes a few pain-points with the previous Cypress tests in the process as Playwright has better native keyboard support. Overall test time is greatly reduced as well.
