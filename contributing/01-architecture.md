# Architecture overview

This document outlines the key technical components that make up the Citizens Advice Design System.

## NPM package

The central part of the design system is the `@citizensadvice/design-system` package published at https://www.npmjs.com/package/@citizensadvice/design-system

At its heart the design system is a set of CSS styles, HTML patterns, and minimal JavaScript behaviour.

The `@citizensadvice/design-system` package bundles the following:

- A set of SCSS files
- A set of JavaScript modules
- Our brand font
- A set of custom icons (as an icon font and SVGs)

This package—alongside companion HTML patterns—is the minimum requirement when using the design system.

## Rails Engine

We also provide a [Rails Engine](https://guides.rubyonrails.org/engines.html) which bundles up our components as a set of [view components](https://viewcomponent.org/) which is easy to integrate with Ruby on Rails.

This gives us a way of distributing our component templates for use in our main internal applications so that we don't need to copy and paste HTML examples around and can call component using a clear interface.

Think of the Rails Engine as the reference implementation of all our component templates. If you are using Rails then great, you can require this gem and use the provided interfaces. You can still use the design system with other frameworks but you'll need to maintain your own templates.

View components can contain logic so this allows us to provide richer components like pagination where you would otherwise need to reimplement the logic behind the component each time.

## Demo app

The demo app is not distributed beyond this project but acts as an example of how to integrate the design system into a full Rails application.

It is also used as a place to run all of our automated tests in an environment that is specifically designed for testing but still closely resembles our production applications.

## Documentation website

We have also include documentation website under `design-system-docs`. See the [design-system-docs README for instructions on how to run the documentation website locally](../design-system-docs/README.md)

The documentation website is deployed via Netlify which allows us to access previews of work in progress changes. You can request a preview deploy for any pull request by adding the "docs preview" label.

When the preview is ready a comment will be added to your pull request with a link to the preview site.

> [!NOTE]
> Pull requests from forks will not be able to deploy a preview to Netlify as the workflow will not have access to the required secrets.

## Read next

[Local setup →](./02-local-setup.md)
