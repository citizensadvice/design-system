# Rails Engine

We provide an Rails engine within the project. It's currently in experimental status but can be can be installed directly from git by adding the following to your project Gemfile:

```
gem "design_system", github: "citizensadvice/design-system", branch: "master", glob: "engine/*.gemspec"
```

## Running engine tests

The source code for the engine lives under `engine/`.

Change into the `engine/` directory:

```sh
cd engine
```

Install dependencies

```sh
bundle install
```

Run rspec

```sh
bundle exec rspec
```

## Running the demo app

A demo Rails app is included under `demo/` which is used by the engine specs, but can be run as a standalone Rails app.

Change into the `demo/` directory:

```sh
cd demo
```

Install dependencies

```sh
bundle install && npm install
```

Run the app

```sh
./bin/rails s
```

You might also want to run webpack-dev-server to speed up asset compilation.

```sh
./bin/webpack-dev-server
```
