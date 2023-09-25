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

You can install the core package from npm. We recommend pinning to an exact version. If you are also using the Rails components these versions need to match.

```sh
npm install --save-exact @citizensadvice/design-system@5.5.0
```

This package—alongside companion HTML patterns—is the minimum requirement when using the design system.

#### CSS

The recommended way of using CSS from the design system is through SCSS.

The styles can be loaded by adding the following to your SCSS stylesheet:

```scss
@import '@citizensadvice/design-system/scss/lib.scss';
```

The design system requires the use of [Dart Sass](https://sass-lang.com/dart-sass).

The distributed package includes compiled CSS in `lib/lib.css` if you are not using SCSS.

#### Web fonts

The design system distributes two sets of fonts. Open Sans, our brand font, and a custom icon font. These are included with the npm package.

You may need to configure your build tool to resolve `@citizensadvice/design-system/assets/fonts` using something like [resolve-url-loader](https://www.npmjs.com/package/resolve-url-loader).

### Rails Engine

We also provide a Rails Engine which bundles up our components as a set of view components which is easy to integrate with Ruby on Rails.

This gives us a way of distributing our component templates for use in our main internal applications so that we don't need to copy and paste HTML examples around and can call component using a clear interface.

Think of the Rails Engine as the reference implementation of all our component templates. If you are using Rails then great, you can require this gem and use the provided interfaces. You can still use the design system with other frameworks but you'll need to maintain your own templates.

These components contain logic so this allows us to provide richer components like pagination where you would otherwise need to reimplement the logic behind the component each time.

The Rails components can be installed by adding the following to your `Gemfile`:

```
# Use the Citizens Advice Design System
# Pin to the same version as the npm package
gem "citizens_advice_components",
    github: "citizensadvice/design-system",
    tag: "v5.5.0",
    glob: "engine/*.gemspec"

# This line is optional. The citizens_advice_components gem is built
# on top of view_component and bundles this as a dependency but it
# is encouraged that you also use this for writing your own application
# components so it can be helpful to explicitly name this as a dependency.
gem "view_component", "~> 3"
```

See the [Using with Rails](/guides/using-with-rails) for more information about using the Design System in a Rails application.
