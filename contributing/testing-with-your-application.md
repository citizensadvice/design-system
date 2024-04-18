# Testing with your application

If you'd like to test design system changes locally with your own Rails application you can configure it to run against local copy of the design system.

You'll first need to check out a copy of this repository locally and follow the [setup instructions](./setup.md).

The rest of the instructions assume that the design system has been checked out in the same parent directory as your project with the directory name `design-system`. If this is different you'll need to adjust the relative paths to suit your application.

## Configuring your application

You'll first need to change the path to the design system in your `package.json` to:

```
"@citizensadvice/design-system": "file:../design-system"
```

Then run `npm install` or `yarn install` depending on your project set up to install the local version of the node package.

You'll also want to change the path to the design system in your `Gemfile` to:

```rb
gem "citizens_advice_components", path: "../design-system/engine"
```

Then run run `bundle install` to install the local version of the Rails engine.

Following this you can run your application as normal to start using a local copy of the design system.

## Making local changes to the design system

If you are making local changes to the design system you'll need to:

1. Run `npm run build` from the design-system project if you've changed any JavaScript files (otherwise you can skip this)
2. Restart your application to pick up any new changes

Once you've finished testing remember to reset the change to your application's `package.json` and `Gemfile` respectively.
