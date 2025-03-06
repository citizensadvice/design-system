# Release process

This document outlines the steps to release the design-system packages.

## Prerequisites

To perform a release you need:

1. To be in the citizensadvice github org and have permissions to create releases for the design-system repo
2. To be part of the citizensadvice npm org and have two-factor authentication enabled on your account.
3. To be signed in to npm on your local machine. You can do this by running `npm login`. You will only need to do this once on the machine you want to release from.

## Prepare the release

We provide a npm run-script to start the process of preparing a release:

```sh
npm run release
```

This will run some checks, prompt you to select a new package version, and prepares a branch with the appropriate version name.

Once this is done you will need to:

- update the `CitizensAdviceComponents::VERSION` engine constant to match. There is a spec which checks the versions match in case you forget to do this.
- update the `Gemfile.lock` files for the `engine`, `demo` and `design-system-docs` apps. The easiest way to do this is run the [setup script](./02-local-setup.md)

From here you should create a new pull request from the release branch and request a review on #design-system-dev in Slack.

## Publish to npm

After the new version branch is merged, switch to `main`, pull the latest changes.

The npm publish command will build the package and publish to npm. A `prePublish` script will ensure you can only run npm publish from a `main` that is in a clean state.

### If you are releasing an alpha or beta version

```sh
npm publish --tag latest
```

This makes sure that the npm package is tagged with a pre-release dist-tag.

### If you releasing a main version

For main releases you can run:

```sh
npm publish
```

## Create a release in GitHub

Once the npm package has been published you need to make a release in GitHub.

1. Go to the ['Releases' section of the design-system repository in GitHub](https://github.com/citizensadvice/design-system/releases)
2. Choose "Draft a new release"
3. Enter your new tag name, e.g. `v5.4.1-alpha.0` and choose to create a new tag
4. Copy the contents of the changelog for the release into the release notes section
5. If you are publishing and alpha or beta version check "This is a pre-release"
6. Publish the release
