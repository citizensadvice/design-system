# Design system

New Platform Design System. The styleguide is hosted here: https://citizensadvice.github.io/design-system/

## Build & contributing

For any dev related information, including contributing and building locally see the [contribution guide](CONTRIBUTING.md).

## Using the library

### Fonts

The design system uses a custom font to distribute it's icons (for reference, it was created using [Glyphter](https://glyphter.com/)) - these are distributed with the npm packages and can be found under the `fonts` directory.

If you are using the plain CSS package as described below these files should be made available on your public server in `yourdoamin.com/fonts`. If you wish to change this then consider using a post process like postcss and the postcss-url plugin.

If you are using SCSS files through webpack then you should ensure that you are using the `resolve-url-loader` in your plugin chain. It should be included before the scss loader. If you are using Webpacker with rails then place the following in your environment.js file:

```
// resolve-url-loader must be used before sass-loader
environment.loaders.get("sass").use.splice(-1, 0, {
  loader: "resolve-url-loader"
});
```

### CSS

The distributed package includes both the compiled CSS in `lib/lib.css` and the SCSS under `scss`. If you only need the CSS and do not intend to build custom components and layouts using the SCSS variables and mixins then just add `lib.css` to the `<HEAD>` of your page.

If you need the variables and mixins then import the top level SCSS file `scss/lib.scss`. Do **not** import individual files as you will very quickly run into dependency problems. The [styleguide](https://citizensadvice.github.io/design-system/) documents that available classes, vars, mixins and functions available.

### Haml

Haml partials are also available, import the npm package in your build and reference them as

<pre class="html"><code>@citizensadvice/design-system/haml/&lt;partial-name></code></pre>

You will need to add a lookup path for `node_modules`, for example add

<pre class="html"><code>prepend_view_path(Rails.root.join("node_modules"))</code></pre>

to your `ApplicationController`. You can then reference the partials in your haml like this

<pre class="html"><code>= render partial: "@citizensadvice/design-system/haml/breadcrumb"</code></pre>

### Javascript components

Most simple Design System Javascript components can be used by simply including them as part of your main bundle.

For the more complex components we are providing them as a systemjs bundle - this allows us to package each component as a single file. We *also* provide a commonjs compilation for use with bundlers such as webpack.

Instructions for using System-JS can be found here: https://github.com/systemjs/systemjs

You will require a promise polyfill along with the system-js executable.



