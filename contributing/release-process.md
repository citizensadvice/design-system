# Release process

Releasing a new npm package version is a three step process.

## 1. Prepare the release

```sh
npm run release
```

This prepares the release and puts it in a branch with the appropriate version name, which needs a pull request to be merged into main. Once that is merged you can then do the actual release.

## 2. Publish to npm

**_Note:_**

To run this step you need to be part of the npm org and have 2FA enabled on your account.

You also need an auth token in your `~/.npmrc` file. You can do this by running the following command:

```sh
npm login
```

You will only need to do this once on the machine you want to release from.

After the new version branch is merged, switch to `main`, pull the latest changes and run:

```sh
npm publish
```

Followed by

```
git push origin v{your_version_here}
```

To publish the release tag to GitHub.

A `prePublish` script will ensure you can only run npm publish from a `main` that is in a clean state. It will build the package and publish to npm.

## 3. Update the release tag in GitHub

Once the release tag has been push to GitHub in step 2, you must:

- go to the design-system repository in GitHub
- navigate to the 'Releases' section
- update the release you pushed to be the latest release
- copy the contents of the changelog comments for the relase into the release notes section
- publish the release
