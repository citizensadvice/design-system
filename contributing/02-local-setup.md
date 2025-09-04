# Local setup

This guide runs through how to set up the design system project locally as a contributor.

## Prerequisites

Running the project locally requires a few dependencies to be installed.

- **Ruby version 3.3+**. We include a `.ruby-version` file in each sub-directory that needs it so if you are using a version manager like [rvm](https://rvm.io/) or [rbenv](https://github.com/rbenv/rbenv) it should pick this up.
- **Node version 22**. We include a `.nvmrc` file in the root of the project so if you are using [nvm](https://github.com/nvm-sh/nvm) it should pick this up.

## Setting up the project

We provide a top-level setup script which handles the following:

1. Setting up and building the top-level npm package
2. Installing the Rails engine gem dependencies
3. Setting up the Rails demo app used for integration testing and component previews
4. Setting up the documentation website

You can run this from the top-level of the repository by running:

```sh
./setup
```

## Read next

[Testing →](./03-testing.md)
