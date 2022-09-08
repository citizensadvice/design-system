# Citizens Advice Design System documentation website

This is the documentation website for the Citizens Advice Design System. The site is build using [Bridgetown](https://www.bridgetownrb.com/)

## Prerequisites

- [Ruby 2.7](https://www.ruby-lang.org/en/downloads/)
- [Node 14](https://nodejs.org)
- [yarn](https://yarnpkg.com/getting-started/install)

## Setup

All commands should be run within this directory, `design-system-docs/`, from within your terminal of choice.

To set up the project run:

```sh
./bin/setup
```

To start your site in development mode run:

```sh
./bin/bridgetown start
```

The docs should now be running on [localhost:4000](https://localhost:4000/)

## Generating component docs

We provide a small Rake task to generate scaffolding for new component docs pages. You can run this via the `bridgetown` command using:

```sh
./bin/bridgetown generate_component_docs
```

This will then ask you for you component name:

```
❯ ./bin/bridgetown generate_component_docs
Component name Callout
```

And then ask you to confirm an ID, with a reasonable default:

```
❯ ./bin/bridgetown generate_component_docs
Component name Callout
Component ID (callout)
```

The task will then:

1. Create a new markdown file
2. Create scaffolding for your component examples
3. Append some sample data to the component arguments file

```
❯ ./bin/bridgetown generate_component_docs
Component name Callout
Component ID (callout)
      create  src/_component_examples/_callout/_defaults.yml
      create  src/_component_examples/_callout/default.erb
      append  src/_data/component_arguments.yml
      create  src/_component_docs/callout.md
```
