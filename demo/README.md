# Rails engine demo app

Companion demo app for the code in `engine/`.

This is app is used by the engine specs as a test harness. It can also be ran as a standalone Rails app for viewing component previews and to experiment with components.

## Running the demo app

Install dependencies:

```shell
bundle install && npm install
```

Start rails:

```shell
./bin/rails s
```

The engine code bundles a set of component previews which can be seen at `http://localhost:3000/rails/view_components`.
