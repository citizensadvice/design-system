# Setup

## Prerequisites

Running the project locally requires a few dependencies.

### Ruby

Ruby is required for the engine, demo app, and documentation website code. We include `.ruby-version` files in the appropriate directories project so if you are using a version manager like [rbenv](https://github.com/rbenv/rbenv) it should pick this up.

### Node

Node 20 is required. We include a `.nvmrc` file in the root of the project so if you are using [nvm](https://github.com/nvm-sh/nvm) it should pick this up.

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
