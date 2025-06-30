# 11. Migrate to vitest for unit tests

Date: 2025-06-17

## Status

Accepted

## Context

Jest 30 has recently been released. This is the first release in 3 years and it still requires a transpilation step to support ESM modules.

Our needs for unit tests are relatively modest and vitest is a drop-in replacement but has the benefit of supporting ESM out of the box.

## Decision

Migrate from jest to vitest for unit tests.

## Consequences

Vitest is intended as a drop-in replacement with a jest-compatible API so few immediate changes are needed to our tests. We may wish to use more vitest specific functionality over time but this is optional.

Allows us to remove some babel configuration solely used for jest tests.
