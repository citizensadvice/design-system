/* eslint-disable import/prefer-default-export */

const assert = require('assert');
const semver = require('semver');
const fs = require('fs');
const path = require('path');
const marked = require('marked');

const getPreviousVersion = (tokens) =>
  tokens[0].tokens.find((t) => t.type === 'text').text;

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

  const file = fs.readFileSync(changelogPath).toString();
  const tokens = marked.lexer(file);

  const previousVersion = getPreviousVersion(tokens);
  console.log(previousVersion);

  assert.ok(
    semver.gt(version, previousVersion),
    `The release version must be greater than previous releases. version: ${version}  previous: ${previousVersion}`
  );
};
