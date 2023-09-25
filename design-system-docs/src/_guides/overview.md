---
title: Overview
order: 1
---

The Citizens Advice Design System is a set of accessible and reusable foundations, and components used across our digital products.

The design system guidance is broadly split into two main areas:

- [Foundations](/foundations) - Core design foundations including colours, fonts, spacing, grids, and an icon system.
- [Components](/components) — Individual components that make up the bulk of the design system. Includes lower-level components such as buttons and tables up to larger patterns like our global header or footer.

## Using the Design System

The design system is implemented and distributed as a component library made up of two parts:

- An npm package containing styles, JavaScript modules, fonts, and icons.
- A companion ruby gem which provides a way of using design system components in a Rails app.

### NPM package

The central part of the design system is the `@citizensadvice/design-system` package.

At its heart the design system is a set of CSS styles, HTML patterns, and minimal JavaScript behaviour.

The `@citizensadvice/design-system` package bundles the following:

- A set of SCSS files
- A set of JavaScript modules
- Our brand font
- A set of custom icons (as an icon font and SVGs)

This package—alongside companion HTML patterns—is the minimum requirement when using the design system.

### Rails Engine

We also provide a Rails Engine which bundles up our components as a set of view components which is easy to integrate with Ruby on Rails.

This gives us a way of distributing our component templates for use in our main internal applications so that we don't need to copy and paste HTML examples around and can call component using a clear interface.

Think of the Rails Engine as the reference implementation of all our component templates. If you are using Rails then great, you can require this gem and use the provided interfaces. You can still use the design system with other frameworks but you'll need to maintain your own templates.

View Components can contain logic so this allows us to provide richer components like pagination where you would otherwise need to reimplement the logic behind the component each time.

See the [Using with Rails](/guides/using-with-rails) for more information about using the Design System in a Rails application.
