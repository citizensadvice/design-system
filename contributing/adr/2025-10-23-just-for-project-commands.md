# Use just for project commands

Date: 2025-10-23

## Status

Accepted

## Context

The design system is made up of a number of distinct packages. This requires a lot of context switching between tools and directories to run the project as a whole.

We previously provided some basic shell scripts via `./setup` and `./check-all` to automate some of the common setup but for all other commands this requires knowing the individual tool to use. It would be useful to provide a top-level interface to the regular commands needed to run the project, regardless of underlying tooling.

One common way of handling this is to use a `Makefile` however make has idiosyncrasies when using it as a command runner (rather than as a build tool) which require workarounds such as the use of [phony targets](https://www.gnu.org/software/make/manual/html_node/Phony-Targets.html).

An alternative to makefiles is [just](https://just.systems/man/en/introduction.html). We've had success with this in a number of other projects so it makes sense to extend this to the design system.

## Decision

Use [just](https://just.systems/man/en/introduction.html) for project specific commands. We will start with an initial list of recipes and expand over time:

```sh
Available recipes:
    adr title     # Generate a new ADR
    check-all     # Run all checks
    format        # Run formatters [alias: fmt]
    format-check  # Check format only
    help          # List available recipes
    setup         # Setup project

    [demo]
    demo-check    # Check demo app only
    demo-dev      # Run a dev server for the demo app
    demo-setup    # Setup demo app only

    [engine]
    engine-check  # Check engine only
    engine-setup  # Setup engine only
    engine-sync   # Sync fonts between npm source and engine

    [package]
    package-check # Check npm package only
    package-setup # Setup npm package only

    [website]
    website-build # Build a static copy of the website
    website-check # Check website only
    website-dev   # Run a dev server for the website
    website-setup # Setup website only
```

## Consequences

Allows us to provide a single `justfile` for interfacing with the different parts of the project.

This adds a new dependency on `just` for developing the project. This may cause some confusion for people new to the project so should be documented clearly.

We'll start with a single `justfile` at the root of the project. Just supports a [module system](https://just.systems/man/en/modules1190.html) which we should explore if the number of commands becomes hard to manage a single file or to aid with namespacing commands.

Finally, this change removes the soft dependency on `adr-tools` with an internal `just adr` command. To keep this command simple we use a date for the prefix instead of sequential numbers.
