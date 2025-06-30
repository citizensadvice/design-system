# 12. Use Appraisal for testing against different dependency versions

Date: 2025-06-30

## Status

Accepted

## Context

As new Rails or ViewComponent versions are released or go end-of-life we need to updated and manage a way of testing against all actively supported versions.

Currently this is only repeatable in CI, running version-specific tests locally requires manual management of environment variables and local lock files.

With the [upcoming release of ViewComponent 4](https://github.com/ViewComponent/view_component/releases/tag/4.0.0.rc1) the combinations of versions we need to support will need to expand further still.

## Decision

We will use the [Appraisal gem](https://github.com/thoughtbot/appraisal) to manage testing against different versions of dependencies in repeatable scenarios called "appraisals.".

## Consequences

- Introduces a new development-only dependency on the Appraisal gem
- Avoids manual management of dependencies and local gemfiles when testing different library versions
- Allows us to vary the required gems based on the supported library version (important for managing Rails version compatibility)

We should revisit this decision of the Appraisal gem goes out of support, at which point whe should revert to the previous approach or investigate and alternative way of managing library versions.
