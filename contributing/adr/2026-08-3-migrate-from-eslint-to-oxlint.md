# Migrate from ESLint to Oxlint

Date: 2026-08-03

## Status

Accepted

## Context

In a previous ADR we made the decision to [move from jest to vitest](./2025-06-17-migrate-to-vitest-for-unit-tests.md). There is a similar replacement for eslint in the wider vite-ecosystem in [Oxlint](https://oxc.rs/docs/guide/usage/linter).

Oxlint by comparison is a single binary with a number of common eslint rules implemented as core plugins.

## Decision

Migrate to Oxlint for JavaScript linting. This is largely a drop-in replacement.

## Consequences

Reduces the number of dependencies for JavaScript linting from 5 to 1. For larger projects the performance benefits would also be significant, here they are marginal (although still significantly faster in relative terms), so the primary reason here is reducing the number of dependencies.

Due to the small number of files being checked in this project it's possible to quickly swap out linting tools so we can easily reverse this migration if we choose to.

There is also a companion `oxfmt` tool which is a drop-in replacement for `prettier`, however it is still in alpha and doesn't fundamentally change the number of dependencies.
