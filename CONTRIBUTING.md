# Contributing

To do...

## Tooling

Use node v10 to build the repo. There is a `.nvmrc` file supplied, if you have nvm installed just run `nvm use` to switch to node 10.

### Building

To compile the SCSS into CSS just ran the `build` script. The output goes into `dist`.

#### Output checks

The `check-size` script will check the current output and compare it to the last released build. It will flag up if the size has changed more than 10% either way. The script exports the functions so that you can run them individually in other node scripts. If you execute the script with the `-r` arg it will run and compare the build. If you supply a `-w` argument it will also store the results into `stats/size.json`. You should **only** do that if you are making a new release.

### Testing

## Structure



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
