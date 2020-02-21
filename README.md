# Design system

New Platform Design System. The styleguide is hosted here: https://citizensadvice.github.io/design-system-testing/

## Build & contributing

For any dev related information, including contributing and building locally see the [contribution guide](CONTRIBUTING.md).

## Using the library

### CSS

The distributed package includes both the compiled CSS in `dist/lib.css` and the SCSS under `scss`. If you only need the CSS and do not intend to build custom components and layouts using the SCSS variables and mixins then just add `lib.css` to the `<HEAD>` of your page.

If you need the variables and mixins then import the top level SCSS file `scss/lib.scss`. Do **not** import individual files as you will very quickly run into dependency problems. The [styleguide](https://citizensadvice.github.io/design-system-testing/) documents that available classes, vars, mixins and functions available.

### Haml 

Haml partials are also available, import the npm package in your build and reference them as

<pre><code>@citizensadvice/design-system/haml/&lt;partial-name></code></pre>

You will need to add a lookup path for `node_modules`, for example add 

<pre><code>prepend_view_path(Rails.root.join("node_modules"))</code></pre>

to your `ApplicationController`. You can then reference the partials in your haml like this

<pre><code>= render partial: "@citizensadvice/design-system/haml/breadcrumb"</code></pre>
