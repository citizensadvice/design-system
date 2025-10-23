# 9. Migrate rails form builder to design system engine

Date: 2025-03-24

## Status

Accepted

## Context

We've historically maintained a separate [rails-form-builder gem](https://github.com/citizensadvice/rails-form-builder) for using the design system components as a standard Rails form builder.

This was done to allow iterating on the rails form builder concept independently of design system releases.

Whilst this set up was faster to iterate on the internal API changes to components themselves require multiple steps:

- First update the component in the design system
- Release a new version
- Update the form builder library
- Release a new version of the library

Only then can applications upgrade to use updates to form components. This leads to eventual drift as can be seen through the change to introduce a `page_heading` option to form fields ([#3495](https://github.com/citizensadvice/design-system/pull/3495)) which was never implemented in the rails form builder.

As the interface for the library has now stabilised and we've reached the point where we are using the library in multiple public production systems it's a good time to bring the form builder into the main design system engine.

## Decision

We will migrate the rails form builder to design system engine and update our existing applications that use it before archiving the original library.

## Consequences

- Updates to the form builder are tied to design system releases. The positive consequence of this is that changes to form components can be implemented in the form builder in a single change rather than a multi-step process which reduces drift.
- Applications will need to update to a version of the design system including the migrated form builder before we can archive the original library. This has the positive consequence that we can ship both versions alongside each other before stabilising on the official design system version
