/* eslint-disable import/prefer-default-export */

const assert = require('assert');
const semver = require('semver');
const fs = require('fs');
const path = require('path');

export const release = (version, changelogPath) => {
  // bail if version is not semver

  if (!changelogPath) {
    // eslint-disable-next-line no-param-reassign
    changelogPath = path.join(process.cwd(), 'CHANGELOG.md');
  }

  assert.ok(
    semver.valid(version),
    `Version must be a valid semver - you entered ${version}`
  );

  assert.ok(fs.existsSync(changelogPath), 'failed to load CHANGELOG.md');
};
