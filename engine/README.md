# Design System Rails Engine

A Rails Engine packaged as a gem which provides a set of [view components](https://viewcomponent.org/) for each design system component. [See the published guidance on using this with your own Rails application](https://citizens-advice-design-system.netlify.app/guides/using-with-rails/). The rest of this document is about developing the engine code locally.

## Running engine checks

Install gem dependencies

```sh
bundle install
```

Run rake

```sh
rake
```

By default this will run all rspec, rubocop, and erb-lint checks. You can view all available tasks with `rake -T`
