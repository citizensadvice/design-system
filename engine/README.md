# Rails engine

The goal is to provide a set of [view components](https://viewcomponent.org/) for each design system component, distributed as a Rails engine.

## Installing the engine

The Rails engine can be installed as `citizens_advice_components` by adding the following to your project Gemfile:

```
gem "citizens_advice_components", github: "citizensadvice/design-system", glob: "engine/*.gemspec"
```

## Using components

Components are provided as [view components](https://viewcomponent.org/).

Once installed you can call them within your application by passing the component to `render`.

```rb
render(
  CitizensAdviceComponents::Pagination.new(
    current_params: { "q" => "debt and money" },
    num_pages: 100,
    current_page: 1
  )
)
```

For more details see [viewcomponent.org](https://viewcomponent.org/)

## Running tests

Install dependencies

```sh
bundle install
```

Run rspec.

```sh
bundle exec rspec
```
