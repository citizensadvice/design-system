# 5. Use ERB for component templates

Date: 2022-07-26

## Status

Proposed

## Context

We've seen output buffer issues when using our design system components within our Bridgetown docs. See https://github.com/citizensadvice/design-system/pull/2207 for an example of the issue.

This happens where the component uses a Haml template and where there is any kind of captured content block (e.g. tag helpers or composition of other view components from within the Haml template).

Whilst it's possible to work around some of the issues by adjusting the Haml templates with delicate use of `capture_haml`, by avoiding use of tag helpers and composition, or by additional workarounds on the Bridgetown side this is fraught with pitfalls as there's no guarantee that every issue will be fixable and each workaround further reduces the maintainability of our components.

In testing we validated that switching to ERB bypasses any rendering issues as it is a core part of Ruby and doesn't require custom template handling code to work outside of a full Rails context. This allows us to write our templates without workarounds as long as we stick to ERB for the templating language. See https://github.com/citizensadvice/design-system/pull/2207 for a demonstration that using ERB resolves any rendering issues.

## Decision

We will use ERB for our component templates. Initially we will migrate affected templates over to ERB with the goal of having migrated all Haml templates and to have removed `haml-rails` as a dependency by version 6 of the design system.

This decision only effects the internal templating language used for components. It does not prevent consumers of the design system from using Haml for any templates.

## Consequences

**Pros:**

- Makes it possible to use all components in our docs without trade-offs and simplifies our Bridgetown integration
- ERB is a core part of Ruby so has a higher likelihood of working without caveats
- Allows us to eventually remove `haml-rails` from our dependencies

**Cons:**

- Limits us to only using ERB internally
- Additional work to convert Haml to ERB when migrating components over from consumers into the design system
