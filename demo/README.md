# Rails engine demo app

This app:

- Is used in CI to run smoke tests against to make sure each part of the design system works together as a whole.
- Acts as a reference implementation showing both how to configure the engine and how to load design system styles.
- Can be ran as a standalone Rails app for viewing component previews and to experiment with components.

## Running the demo app

Run the setup script:

```shell
./bin/setup
```

Start Rails:

```shell
./bin/rails s
```

The engine code bundles a set of component previews which can be seen at `http://localhost:3000/rails/view_components`.
