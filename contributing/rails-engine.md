# Rails Engine

We provide a Rails engine within the project. It's currently in experimental status.

## Installing the engine

The Rails engine can be installed as `citizens_advice_components`  by adding the following to your project Gemfile:

```
gem "citizens_advice_components", github: "citizensadvice/design-system", branch: "master", glob: "engine/*.gemspec"
```

## Using components

Components are distributed as [view components](https://viewcomponent.org/).

Once installed you can call them within your application by passing the component to `render`.

```rb
render(
  CitizensAdviceComponents::PaginationComponent.new(
    current_params: { "q" => "debt and money" },
    num_pages: 100,
    current_page: 1
  )
)
```

For more details see [viewcomponent.org](https://viewcomponent.org/)


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
