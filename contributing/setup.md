# Setup

## Prerequisites

You'll need the following tools installed in order to run the project locally:

- Node.js 14
- Ruby 2.7.3 (See `.ruby-version` file)

## Install dependencies

From the root of the project run:

```
./bin/setup
```

## Running local tests

See [Testing guide](./testing.md)

## Building

```
npm run build
```

This will compile all the SCSS into the `lib` folder. The build step also runs `size-limit` and will fail the build if the output exeeds our thresholds.

## Running Storybook

Our storybook docs are hosted on [Github pages](https://citizensadvice.github.io/design-system-testing/).

To build and run storybook in dev mode locally:

```
npm start
```

Storybook will then be running on http://localhost:6006.

The static version of the styleguide is build into `docs` using `npm run docs:build`, which then gets automatically hosted into Github pages. You can serve the generated files from `docs` by running `npm run docs:serve`.
