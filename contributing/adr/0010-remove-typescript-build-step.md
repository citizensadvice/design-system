# 10. Remove TypeScript build step

Date: 2025-02-10

## Status

Proposed

## Context

We've historically bundled our JavaScript using TypeScript.

This presents a couple of trade-offs when developing the design system:

1. It requires an up-front build during development before the demo app and docs website can see changes
2. It prevents directly installing the design system package via git to test pre-release changes like we do with the Rails engine

In practice we make vanishingly little use of a type system for design system code as it consists of small amounts of DOM-scripting. We have no custom types, no meaningful business logic, and our components are configuration-free (or configuration is handled through data-attributes) so there's no typing benefit to consumers.

Removing TypeScript in this case greatly simplifies developing the design system with little meaningful impact to consumers of the project.

## Decision

We will remove the TypeScript build step from the project and directly author our JavaScript as ECMAScript modules.

## Consequences

- Removes a required build step from the project and a substantial number of internal dependencies
- Allows us to directly installing the design system package via git to test pre-release changes
- Removes potential type-hinting for consumers. We believe this to be a non-issue as our components are configuration-free (or configuration is handled through data-attributes) so there's no existing typing benefit

We should revisit this decision if we introduce new components which require substantial business logic benefiting a type system, although these kinds of components are unlikely to be candidates for the design system anyway.
