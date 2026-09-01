# Migrate to Playwright

Date: 2026-09-01

## Status

Accepted

## Context

BackstopJS is no longer maintained and depends on an outdated Puppeteer version with known security vulnerabilities. We currently use a mix of Cypress and BackstopJS for different types of browser tests, we have an opportunity to consolidate.

## Decision

Replace both Cypress and BackstopJS with Playwright, which is actively maintained and provides built-in visual comparison support.

## Consequences

Key consequence is to remove an unmaintained dependency consolidate on a single browser testing tool. Migrating to Playwright also fixes a few pain-points with the previous Cypress tests in the process as Playwright has better native keyboard support allowing us to remove some extra dependencies. Overall test time is greatly reduced as well.
