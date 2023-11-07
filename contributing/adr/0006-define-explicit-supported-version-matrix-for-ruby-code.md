# 6. Define explicit supported version matrix for Ruby code

Date: 2023-11-07

## Status

Accepted

## Context

The CI matrix used to test our Ruby code had grown organically over time. The release of Rails 7.1 and Ruby 2.7 reaching end-of-life provides a good opportunity to revisit this matrix.

## Decision

Define the following support policy for testing our Ruby code in CI:

1. Active Ruby versions (https://endoflife.date/ruby)
2. Last 3 major Rails releases
3. Any supported ViewComponent versions

## Consequences

This ensures we are only testing against supported versions of our dependent language and frameworks and improves the maintainability of our CI workflows.

Over time it will encourage us to take advantage of new language and framework features at an appropriate cadence.
