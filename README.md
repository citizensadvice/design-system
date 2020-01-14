# cads2

## How to use this

To see the styleguide:

```
yarn
yarn storybook
```

## ITCSS

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
