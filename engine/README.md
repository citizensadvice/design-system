# Design System Rails Engine

A Rails Engine packaged as a gem which provides a set of [view components](https://viewcomponent.org/) for each design system component. [See the published guidance on using this with your own Rails application](https://citizens-advice-design-system.netlify.app/guides/using-with-rails/). The rest of this document is about developing the engine code locally.

## Running engine checks

Run tests with via just or, within the `engine` directory directly via `rake`:

```sh
just engine-check
```

By default this will run all rspec, rubocop, and erb-lint checks. You can view all available tasks with `rake -T`.

We use Appraisal for managing different gemfiles for older Rails versions as well as for testing new ViewComponent versions. By default the just recipe above will run all appraisal specs, you can run appraisals using:

```sh
bundle exec appraisal help
```

See the [Appraisal docs](https://github.com/thoughtbot/appraisal) for a full list of commands and how to work with the `Appraisals` file.

## Utility tasks

We provide some additional utility tasks for developing the engine.

Font files can be synced between the package and the engine with:

```sh
just engine-sync
```
