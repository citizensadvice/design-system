# Contributing

## Contribution process

To do...

## Design

To do...

## The Code

Use node v12 to build the repo. There is a `.nvmrc` file supplied, if you have nvm installed just run `nvm use` to switch to node 12.

You'll need to have Ruby and Bundler installed to build the haml templates. Ruby comes preinstalled on Macs. To install Bundler run `gem install bundler`. After you've got those sorted a quick `bundler install` will get the required gems (ruby libraries) in place.

Finally run `npm install`.

### Building

Run `npm run build` and this will compile all the SCSS into the `dist` folder.

#### Output checks

The `check-size` script will check the current output and compare it to the last released build. It will flag up if the size has changed more than 10% either way. The script exports the functions so that you can run them individually in other node scripts. If you execute the script with the `-r` arg it will run and compare the build. If you supply a `-w` argument it will also store the results into `stats/size.json`. You should **only** do that if you are making a new release.

### Testing

As this is just a CSS library to test it we use storybook. The concept is that a test version of storybook is built which is then used to do screenshot comparison in BackstopJS. BackstopJS automates visual regression testing of your responsive web UI by comparing DOM screenshots over time.

You can install backstop by running `npm run vr-test:install`, this will install the visual regression testing tools. These are installed under `/testing` and have a separate package to the main Design System, this is done to keep the install time of the Design System low.

### Releasing

Releasing a new npm package version is a two step process.

#### 1. Prepare the release

Run `npm run release`. This prepares the release and puts it in a branch with the appropriate version name, which needs a PR to be merged into master. Once that is merged you can then do the actual release.

#### 2. Publish to npm 

After the new version branch is merged, switch to `master`, pull the latest and run `npm publish`. The `prePublish` script will ensure you can only run npm publish from a `master` that is in a clean state. It will build the package and publish to npm. 

***Note:*** To run this step you need to be part of the npm org and have 2FA enabled.

#### Usage

The tests are run inside of Docker to ensure consistency accross different environments (mac, windows and linux). You can install Docker by following the instructions at [docker.com](https://www.docker.com/products/docker-desktop).

To start the server, run the tests and then stop the server you can run:

```
npm run vr-test:test
```

If you are running the tests in ci, or prefer not to have a browser showing the results opened at the end of the test-run then you can use `npm run vt-test:ci`. This will run both the design-system and backstop within docker using docker-compose. You may need to install `docker-compose` for this functionality to be available.

You can also choose to run the tests without starting up the design-system server with `npm run vr-test:standalone`.

After a test run is complete you can `npm run vr-test vr-test:open-report` to view the report in a browser.

If you are working in a QA role you can npm run vr-test:approve' the changes.

#### Writing test scenarios

It's important that both backstop config files are kept in sync. Write your test scenarios in `./testing/backstop.json` and run `npm run vr-test:sync` to bring `./testing/backstop-ci.json` up to date. Any differences will be printed to the console.

If you want to check that the files are in sync you can run `npm run vr-test:validate` - this is also run as part of the CI process. If the scenarios do not match or any are missing then the build will fail.

#### Low-level Usage

To run Backstop commands as per the [BackstopJS Github's page](https://github.com/garris/BackstopJS) simply cd into `/testing` and run the commands with `npx ` appended to the front - for example `npx backstop test` or `npx backstop approve`.

- **`npx backstop init`:** Set up a new BackstopJS instance -- specify URLs, cookies, screen sizes, DOM selectors, interactions etc.

- **`npx backstop reference`:**: Set up the baseline that you’re testing against.

- **`npx backstop reference --filter=<scenario.label>`:**: Set up the baseline for a specific scenario that you’re testing against using the label name.

- **`npx backstop test`:** BackstopJS creates a set of test screenshots and compares them with your reference screenshots. Any changes show up in a visual report. (Run this after making CSS changes as many times as needed.)

- **`npx backstop test --filter=<scenario.label>`:** Run the test for a specific scenario using the label name.

-  **`npx backstop approve`:** If the test you ran looks good, then go ahead and approve it. Approving changes will update your reference files with the results from your last test. Future tests are compared against your most recent approved test screenshots.

-  **`npx backstop approve --filter=<scenario.label>`:** Approve a specific scenario using the label name.

For more advanced details see the [BackstopJS Github's page](https://github.com/garris/BackstopJS)


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

### Running the app in Docker

Ensure that you have Docker for Mac installed.

Then simply run:
`./bin/docker/start`

If you update the Gems or node modules run:
`./bin/docker/reset`

To lint:
`./bin/docker/lint`

## Useful links

-   [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)
-   [Figma API](https://blog.prototypr.io/design-tokens-with-figma-aef25c42430f)
