# Contributing

## Contribution process

To do...

## Design

To do...

## The Code

Use node v10 to build the repo. There is a `.nvmrc` file supplied, if you have nvm installed just run `nvm use` to switch to node 10.

### Building

Just run `npm run build` and this will compile all the SCSS into the `dist` folder.

#### Output checks

The `check-size` script will check the current output and compare it to the last released build. It will flag up if the size has changed more than 10% either way. The script exports the functions so that you can run them individually in other node scripts. If you execute the script with the `-r` arg it will run and compare the build. If you supply a `-w` argument it will also store the results into `stats/size.json`. You should **only** do that if you are making a new release.

### Testing

TODO... As this is just a CSS library to test it we use storybook. The concept is that a test version of storybook is built which is then used to do screenshot comparison in browserstack/?.

### Assets

Any icons/etc should be inlined into the class that needs to use them to avoid url issues on deployment. The original assets should  be stored in the `assets` folder for reference.


## Styleguide 

The styleguide is automatically hosted in [Github pages](https://citizensadvice.github.io/design-system-testing/), based on the content of the `docs` folder.

To build and run the styleguide in dev mode locally:

```
npm run styleguide
```

The styleguide runs on http://localhost:6006. The documentation is generated using storybook and the code lives under `styleguide`.

The static version of the styleguide is build into `docs` using `npm run docs:build`, which then gets automatically hosted into Github pages. You can serve the generated files from `docs` by running `npm run docs:serve`.

Currently there is no automated process to rebuild the contents of the `docs` folder, so you need to remember to do that whenever you make a release (currently that is merging into `master`).

## Structure

## IDE setup

If you are using VSCode here is a list of useful plugins that can help with this repo:

* Auto Close Tag
* Bracket Pair Colorizer
* EditorConfig for VS Code
* ESLint
* GitLens
* Node Debug
* npm Intellisense
* Prettier
* stylelint

### ITCSS

What are the different layers?

1. Settings – used with preprocessors and contain font, colors definitions, etc.
2. Tools – globally used mixins and functions. It’s important not to output any CSS in the first 2 layers.
3. Generic – reset and/or normalize styles, box-sizing definition, etc. This is the first layer which generates actual CSS.
4. Elements – styling for bare HTML elements (like H1, A, etc.). These come with default styling from the browser so we can redefine them here.
5. Objects – class-based selectors which define undecorated design patterns, for example media object known from OOCSS
6. Components – specific UI components. This is where the majority of our work takes place and our UI components are often composed of Objects and Components
7. Utilities – utilities and helper classes with ability to override anything which goes before in the triangle, eg. hide helper class

## Useful links

-   [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)
-   [Figma API](https://blog.prototypr.io/design-tokens-with-figma-aef25c42430f)
