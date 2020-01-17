# Design system

New Platform Design System. The styleguide is hosted here: https://citizensadvice.github.io/design-system-testing/

## Environment setup

A node environment is required to build this repo. Current development is with Node v10 as that is what the CI environment is using. An `.nvmrc` file is provided for convenience (if you have nvm in your environment). `yarn` is the recommended package manager.

## Styleguide 

The styleguide is hosted here: https://citizensadvice.github.io/design-system-testing/

To build and run the styleguide in dev mode locally:

```
yarn storybook
```

The styleguide runs on http://localhost:6006. The documentation is generated using storybook and the code lives under `styleguide`. A static version of the styleguide is build into `docs` using `yarn build-docs`. This gets automatically hosted into Github pages. 

You can serve the generated files from `docs` by running `yarn serve-docs`.

## Using the library

The distributed package includes both the compiled CSS in `lib/lib.base.css` and the SCSS under `scss`. If you only need the CSS and do not intend to build custom components and layouts using the SCSS variables and mixins then just add `lib.base.css` to the `<HEAD>` of your page.

If you need the variables and mixins then import the top level SCSS file `scss/lib.base.scss`. Do **not** import individual files as you will very quickly run into dependency problems. The [styleguide](https://citizensadvice.github.io/design-system-testing/) documents that available classes, vars, mixins and functions available.

### Assets

TODO: There are a number of images and other assets under the `assets` folder. These will need to be processed/inlined for things to work, eg logo.

## Building

Just run `yarn build` and this will compile all the SCSS into the `lib` folder.

## Testing

TODO... As this is just a CSS library to test it we use storybook. The concept is that a test version of storybook is built which is then used to do screenshot comparison in browserstack/?.
