# Contributing

- [Getting started](./contributing/getting-started.md)
- [Testing](./contributing/testing.md)
- [Release process](./contributing/release-process.md)

## Styleguide

The styleguide is automatically hosted in [Github pages](https://citizensadvice.github.io/design-system-testing/), based on the content of the `docs` folder.

To build and run the styleguide in dev mode locally:

```
npm run styleguide
```

The styleguide runs on http://localhost:6006. The documentation is generated using storybook and the code lives under `styleguide`.

The static version of the styleguide is build into `docs` using `npm run docs:build`, which then gets automatically hosted into Github pages. You can serve the generated files from `docs` by running `npm run docs:serve`.

Currently there is no automated process to rebuild the contents of the `docs` folder, so you need to remember to do that whenever you make a release (currently that is merging into `master`).
