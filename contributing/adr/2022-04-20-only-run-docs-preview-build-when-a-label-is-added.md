# 4. Only run docs preview build when a label is added

Date: 2022-04-20

## Status

Proposed

## Context

We currently run docs preview builds on all pull requests when they are opened or updated. This has a couple of trade-offs:

- Previews are generated for every PR which can add noise if you don't want one, or are not ready for one yet.
- Causes an error on pull requests from forks as the workflow doesn't have access to secrets

## Decision

We will only run the docs preview work flow when a "docs preview" label has been added to the pull request.

## Consequences

**Pros:**

- Avoids noise on pull requests where you might not want, or be ready, for a docs site preview
- Side-steps an issue with pull requests from forks where the workflow doesn't have access to secrets

**Cons:**

- Previews are not automatic, you have to to request one.

We should revisit this decision if the need for automatic previews outweighs the benefits from having them be opt-in.
