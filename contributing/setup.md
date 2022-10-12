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
