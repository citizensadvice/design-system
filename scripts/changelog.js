/* eslint-disable import/prefer-default-export */

const assert = require('assert');
const semver = require('semver');
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const moment = require('moment');

// TODO stronger check for version heading
const getPreviousVersion = (tokens) =>
  tokens.find((t) => /v\d+/.test(t.text)).tokens.find((t) => t.type === 'text')
    .text;

const preReleaseHeading = (version) =>
  `## <sub>${version}</sub>

#### ${moment().format('_MMM. D, YYYY_')}\n\n`;

const preRelease = (version, changelog) =>
  preReleaseHeading(version) + changelog.toString();

export const prereleaseNotes = (changelog) => {
  const tokens = marked.lexer(changelog.toString());

  const previousFullReleaseIndex = tokens.findIndex(
    (t) => t.type === 'heading' && t.depth === 2 && !/alpha/.test(t.text)
  );

  return tokens.slice(0, previousFullReleaseIndex);
};

/**
 * given a list of tokens, find all list items that appear under a heading.
 *
 * Valid headings are 'bugfix', 'new', 'breaking changes'
 */
export const getItemsFor = (heading, tokens) => {
  let items = '';

  let i = 0;

  while (i < tokens.length) {
    const currentToken = tokens[i];
    const regex = new RegExp(heading, 'i');

    if (currentToken.type === 'paragraph' && regex.test(currentToken.text)) {
      // search for list
      let j = i + 1;
      while (j < tokens.length) {
        if (tokens[j].type === 'list') {
          items += `${tokens[j].raw.trim()}\n`;
          i = j + 1;
          break;
        } else {
          j += 1;
        }
      }
    } else {
      i += 1;
    }
  }

  return items.length ? `${items}\n` : '';
};

const fullRelease = (version, tokens) => {
  const breakingItems = getItemsFor('breaking changes', tokens);
  const newItems = getItemsFor('new', tokens);
  const bugfixItems = getItemsFor('bugfixes', tokens);

  let releaseNotes = preReleaseHeading(version);

  if (breakingItems.length) {
    releaseNotes += `${'**Breaking Changes**'}\n\n${breakingItems}`;
  }
  if (newItems.length) {
    releaseNotes += `${'**New**'}\n\n${newItems}`;
  }
  if (bugfixItems.length) {
    releaseNotes += `${'**Bugfixes**'}\n\n${bugfixItems}`;
  }

  return `${releaseNotes}`;
};

export const release = (version, changelogPath) => {
  if (!changelogPath) {
    // eslint-disable-next-line no-param-reassign
    changelogPath = path.join(process.cwd(), 'CHANGELOG.md');
  }

  assert.ok(
    semver.valid(version),
    `Version must be a valid semver - you entered ${version}`
  );

  assert.ok(fs.existsSync(changelogPath), 'failed to load CHANGELOG.md');

  const changelog = fs.readFileSync(changelogPath).toString();
  const tokens = marked.lexer(changelog);

  const previousVersion = getPreviousVersion(tokens);

  assert.ok(
    semver.gt(version, previousVersion),
    `The release version must be greater than previous releases. version: ${version}  previous: ${previousVersion}`
  );

  if (semver.prerelease(version)) {
    return preRelease(version, changelog);
  }
  return fullRelease(version, prereleaseNotes(changelog));
};
