# Rails engine demo app

This app:

- Is used in CI to run smoke tests against to make sure each part of the design system works together as a whole.
- Acts as a reference implementation showing both how to configure the engine and how to load design system styles.
- Can be ran as a standalone Rails app for viewing component previews and to experiment with components.

## Running the demo app

### Run the setup script:

```shell
./bin/setup
```

### Compile the packs:

Ensure the build is up to date before compiling packs by running:

```shell
npm run build
```

from the project root and then:

```shell
RAILS_ENV=test ./bin/rails webpacker:compile
```

from the `demo` directory.

### Start Rails:

```shell
./bin/rails s
```

The engine code bundles a set of component previews which can be seen at `http://localhost:3000/rails/view_components`.

## Running cypress tests

Open the Cypress UI:

```
./bin/rails cypress:open
```

Run all tests in a headless browser:

```
./bin/rails cypress:run
```
