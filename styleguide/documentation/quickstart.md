# Quickstart

## Usage

To use the design system you first need to install the npm package.

`npm i @citizensadvice/design-system`

If you just need the compiled CSS you only import `lib.base.css`, eg by adding this to the `<head>`:

`<link rel="stylesheet" type="text/css" href="lib.base.css" />`

If you need to use the SCSS variables and mixins then import the top level SCSS file:

<pre><code class="css">
@import 'path/to/cads2/scss/lib.base';
</code></pre>

Do **not** attempt to import any of the other SCSS files as this will most likely cause issues with dependencies, etc.
