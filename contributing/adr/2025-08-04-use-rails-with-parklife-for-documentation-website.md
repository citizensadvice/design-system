# 13. Use Rails with Parklife for documentation website

Date: 2025-08-04

## Status

Accepted

## Context

Our current documentation website is built using [Bridgetown](https://www.bridgetownrb.com/). When we chose this it was (and continues to be) one of the better ruby static site generators. However, our uses case is a little specific in that we are looking to integrate view components within the static site build.

Over time, maintaining compatibility has become a burden as each change to view component or our engine in more than a trivial way requires additional patches. Bridgetown itself is also [diverging from using Rails components](https://www.bridgetownrb.com/future/road-to-bridgetown-2.0-escaping-burnout/). This is a completely legitimate direction for Bridgetown but it does mean that there is an increasing likelihood of drift.

The introduction of the Rails form builder components introduces another challenge as these can't currently be used in the Bridgetown docs without further compatibility patches.

Ultimately, we'd like to find a way to build the documentation website in Rails for maximum compatibility whilst ideally still publishing as a static website.

Thankfully [Parklife](https://github.com/benpickles/parklife) exists to do just that and along with the companion library [Decant](https://github.com/benpickles/decant) we can replicate everything we need from Bridgetown in a standard Rails environment.

## Decision

Migrates the documentation website to a Rails structure using [Parklife](https://github.com/benpickles/parklife) to continue to output to a static site. Paired with [Decant](https://github.com/benpickles/decant) to provide a familiar markdown with front-matter content structure.

## Consequences

We side step any compatibility issues between Rails and non-Rails environments. Using Rails also hopefully lowers the barrier to entry for contributing to the documentation website as it follows familiar conventions.

The content structure is deliberately kept the same as the previous website with directories of markdown files for the documentation itself along with a front-matter based directory of erb files for documentation examples.

This is done for ease of migration but the move to Rails opens up the possibility of consistently using view component previews for all examples or even merging the demo app and docs website as they are now built around the same structure. This is outside the scope of this decision but we should feel free to explore this.
