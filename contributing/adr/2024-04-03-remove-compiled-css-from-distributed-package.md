# 8. Remove compiled CSS from distributed package

Date: 2024-04-03

## Status

Proposed

## Context

We've historically bundled a compiled version of the CSS as `lib.css` in the distributed package. The intent was to provide an option for projects not using SCSS for styles. However the current distributed styles have a number of issues:

1. No projects use this method of distributing the styles
2. Font-loading is broken when using the compiled version of the styles
3. We have no integration tests or mechanism to confirm this is still working

## Decision

We will remove the compiled CSS from distributed package. Should we have a genuine use-case for non-SCSS versions of the design system styles in future we are better off designing a new mechanism to do this rather than building on the previous broken method.

## Consequences

Positive consequences are that we can remove a number of dependencies and no longer bundle a largely broken distribution method. Projects will require SCSS to use the design system styles, as this is true for all existing projects using the design system this is a low risk. If we re-introduces a compiled CSS version in future we should take care to ensure it's a first class distribution method.
