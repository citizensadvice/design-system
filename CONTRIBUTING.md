# Contributing

- [Getting started](./contributing/getting-started.md)
- [Testing](./contributing/testing.md)

## Release process

Releasing a new npm package version is a three step process.

### 1. Prepare the release

```sh
npm run release
```

This prepares the release and puts it in a branch with the appropriate version name, which needs a pull request to be merged into master. Once that is merged you can then do the actual release.

### 2. Publish to npm

After the new version branch is merged, switch to `master`, pull the latest changes and run:

```sh
npm publish
```

Followed by

```
git push origin v{your_version_here}
```

To publish the release tag to GitHub.

A `prePublish` script will ensure you can only run npm publish from a `master` that is in a clean state. It will build the package and publish to npm.

**_Note:_** To run this step you need to be part of the npm org and have 2FA enabled.

### 3. Update the release tag in GitHub

Once the release tag has been push to GitHub in step 2, you must:

- go to the design-system repository in GitHub
- navigate to the 'Releases' section
- update the release you pushed to be the latest release
- copy the contents of the changelog comments for the relase into the release notes section
- publish the release

## Styleguide

The styleguide is automatically hosted in [Github pages](https://citizensadvice.github.io/design-system-testing/), based on the content of the `docs` folder.

To build and run the styleguide in dev mode locally:

```
npm run styleguide
```

The styleguide runs on http://localhost:6006. The documentation is generated using storybook and the code lives under `styleguide`.

The static version of the styleguide is build into `docs` using `npm run docs:build`, which then gets automatically hosted into Github pages. You can serve the generated files from `docs` by running `npm run docs:serve`.

Currently there is no automated process to rebuild the contents of the `docs` folder, so you need to remember to do that whenever you make a release (currently that is merging into `master`).

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

- [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)
- [Figma API](https://blog.prototypr.io/design-tokens-with-figma-aef25c42430f)
