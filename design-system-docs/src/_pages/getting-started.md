---
title: Getting started
layout: basic
---

👋🏼 Hi there! Let's get you started.

The design system component library is made up of two packages:

- `@citizensadvice/design-system` — An npm package containing styles, JavaScript modules, fonts, and icons.
- `citizens_advice_components` — A companion ruby gem which provides a way of using design system components in a Rails app.

## Installing the npm package

You can install the core package from npm:

```sh
npm install @citizensadvice/design-system
```

### CSS

The recommended way of using CSS from the design system is through SCSS.

If you are using Webpacker for your assets you can load the design-system SCSS files by adding the following to your stylesheet:

```scss
@import '~@citizensadvice/design-system/scss/lib.scss';
```

The design system uses [Dart Sass](https://sass-lang.com/dart-sass). If you're using webpacker, please use v5.2.2+ as previous versions use `node-sass`.

The distributed package includes compiled CSS in `lib/lib.css` if you are not using SCSS.

### Fonts

The design system uses distributes two sets of fonts. Open Sans, our brand font, and a custom icon font. These are included with the npm package and can be found under the `fonts` directory.

If you are using SCSS files through Webpacker with Rails then place the following in `config/webpack/environment.js`:

```js
// resolve-url-loader must be used before sass-loader
environment.loaders.get('sass').use.splice(-1, 0, {
  loader: 'resolve-url-loader',
});
```

This requires that you have `resolve-url-loader` installed:

```sh
npm install -D resolve-url-loader
```

### Javascript components

JavaScript components can be included as part of your application bundle.

Components which require JavaScript include the expected usage in their documentation. Typical usage is as follows:

```js
import header from '@citizensadvice/design-system/lib/header';
import greedyNav from '@citizensadvice/design-system/lib/greedy-nav/index';
import targetedContent from '@citizensadvice/design-system/lib/targeted-content';
window.addEventListener('load', () => {
  header();
  greedyNav.init();
  targetedContent();
});
```

### Polyfills

Some components require polyfills for older browsers. Components which require polyfills note this in their documentation. The full list is:

#### Targeted content:

- [Element.prototype.closest polyfill](https://www.npmjs.com/package/element-closest)
- [Scroll behaviour (Element.prototype.scrollIntoView) polyfill](https://github.com/wessberg/scroll-behavior-polyfill)

#### Navigation (specifically the greedynav behaviour):

- [ResizeObserver polyfill](https://www.npmjs.com/package/resize-observer-polyfill)
- Note: this polyfill is not a global polyfill, you will need to assign it to window.ResizeObserver.

We don't include the polyfills by default in order to avoid double bundling if you have your own.

If you are not using either of these components then you may not need any polyfills.

## Using with Rails

Along side the core npm package we also provide a ruby gem which distributes component templates as part of a Rails engine. This can be installed by adding the following to your `Gemfile`

```
gem "citizens_advice_components",
    github: "citizensadvice/design-system",
    tag: "v4.2.0",
    glob: "engine/*.gemspec"
```

### Using components

Components are provided as [view components](https://viewcomponent.org/).

Once installed you can call them within your application by passing the component to `render`.

```erb
<%%= raw render(
  CitizensAdviceComponents::Pagination.new(
    current_params: { "q" => "debt and money" },
    num_pages: 100,
    current_page: 1
  )
) %>
```

## Changelog

- Release notes for each version (starting with v2.0.0) can be seen at [https://github.com/citizensadvice/design-system/releases](https://github.com/citizensadvice/design-system/releases)
- The full changelog can be found at [https://github.com/citizensadvice/design-system/blob/main/CHANGELOG.md](https://github.com/citizensadvice/design-system/blob/main/CHANGELOG.md)
