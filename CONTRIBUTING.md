# Contributing

## Getting started

Use node v14 to build the repo. There is a `.nvmrc` file supplied, if you have nvm installed just run `nvm use` to switch to node 14.

You'll need to have Ruby `2.6.5` and Bundler installed to build the haml templates. There is a `.ruby-version` file supplied,
if you are using rvm it will automatically switch you to `2.6.5` or advise you to install it by doing `rvm install 2.6.5`.
To install Bundler run `gem install bundler -v '2.1.4'`. After you've got those sorted a quick `bundle` will get the required gems (ruby libraries) in place.

Finally run `npm install`.

### Running local tests

Run `bundle exec rake check` to run linting and unit tests using the ruby and node contexts installed directly in your machine. This will also ensure you have the most recent set of node_modules installed and all the compiled files are rebuilt.

### Building

Run `npm run build` and this will compile all the SCSS into the `lib` folder.

#### Output checks

The `check-size` script will check the current output and compare it to the last released build. It will flag up if the size has changed more than 10% either way. The script exports the functions so that you can run them individually in other node scripts. If you execute the script with the `-r` arg it will run and compare the build. If you supply a `-w` argument it will also store the results into `stats/size.json`. You should **only** do that if you are making a new release.

## Testing

### Visual regression testing

We use BackstopJS to automate visual regression testing of components by comparing DOM screenshots over time.

#### Usage

The tests are run inside of Docker to ensure consistency accross different environments (mac, windows and linux). You can install Docker by following the instructions at [docker.com](https://www.docker.com/products/docker-desktop).

**Install backstop:**

You can install backstop by running:

```
npm run vr-test:install
```

This will install the visual regression testing tools. These are installed under `/testing` and have a separate package to the main Design System, this is done to keep the install time of the Design System low.

**Run tests:**

```
npm run vr-test:test
```

If you are running the tests in ci, or prefer not to have a browser showing the results opened at the end of the test-run then you can use `npm run vt-test:ci`. This will run both the design-system and backstop within docker using docker-compose. You may need to install `docker-compose` for this functionality to be available.

You can also choose to run the tests without starting up the design-system server with:

```
npm run vr-test:standalone
```

After a test run is complete you can run `vr-test:open-report` to view the report in a browser.

**Approve changes:**

If the test you ran looks good, then go ahead and approve it. Approving changes will update your reference files with the results from your last test. Future tests are compared against your most recent approved test screenshots.

```
npm run vr-test:approve
```

#### Low-level Usage

Low-level backstop commands must be run from within the visual-regression directory.

```
cd /testing/visual-regression
```

From here you can run `backstop` commands directly.

**Set up the baseline that you’re testing against:**

```
npx backstop reference --docker --config=backstop-config.js
```

**Set up the baseline for a specific scenario that you’re testing against:**

```
npx backstop reference --docker --config=backstop-config.js --filter=<scenario.label>
```

**Run the test for a specific scenario:**

```
npx backstop reference --docker --config=backstop-config.js --filter=<scenario.label>
```

For more advanced details see the [BackstopJS Github's page](https://github.com/garris/BackstopJS)

### Accessibility testing

`pa11y-ci` is used to perform automated accessibility tests. The default configuration is to use htmlsniffer and the urls in the `pa11yci.*.js` config files.

```sh
npm run wcag-test
```

## Working with locale files

English and Welsh locale files can be found under `locales/`.

We use the [i18n-tasks](https://github.com/glebm/i18n-tasks) gem to help manage locale entries.

You can run the following rake task to peform a health check on locale files.

```
bundle exec rake ruby:i18n_tasks
```

To auto-format locale files you can run the following:

```
bundle exec i18n-tasks normalize
```

_Note_: We disable prettier for locale files as it conflicts with `i18n-tasks normalize`.

Run `bundle exec i18n-tasks --help` or [view the usage documentation](https://github.com/glebm/i18n-tasks#usage) for a full list of available tasks.

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

## Assets

Any icons/etc should be inlined into the class that needs to use them to avoid url issues on deployment. The original assets should be stored in the `assets` folder for reference.

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

- Auto Close Tag
- Bracket Pair Colorizer
- EditorConfig for VS Code
- ESLint
- GitLens
- Node Debug
- npm Intellisense
- Prettier
- stylelint

### ITCSS

What are the different layers?

1. Settings – used with preprocessors and contain font, colors definitions, etc.
2. Tools – globally used mixins and functions. It’s important not to output any CSS in the first 2 layers.
3. Generic – reset and/or normalize styles, box-sizing definition, etc. This is the first layer which generates actual CSS.
4. Elements – styling for bare HTML elements (like H1, A, etc.). These come with default styling from the browser so we can redefine them here.
5. Objects – class-based selectors which define undecorated design patterns, for example media object known from OOCSS
6. Components – specific UI components. This is where the majority of our work takes place and our UI components are often composed of Objects and Components
7. Utilities – utilities and helper classes with ability to override anything which goes before in the triangle, eg. hide helper class

### Running the app in Docker

Ensure that you have Docker for Mac installed.

Then simply run:
`./bin/docker/start`

If you update the Gems or node modules run:
`./bin/docker/reset`

To lint:
`./bin/docker/lint`

## Useful links

- [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)
- [Figma API](https://blog.prototypr.io/design-tokens-with-figma-aef25c42430f)
