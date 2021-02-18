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

export const pastNotes = (changelog) => {
  const tokens = marked.lexer(changelog.toString());

  const previousFullReleaseIndex = tokens.findIndex(
    (t) => t.type === 'heading' && t.depth === 2 && !/alpha/.test(t.text)
  );

  return tokens.slice(previousFullReleaseIndex);
};

/**
 * given a list of tokens, find all list items that appear under a heading.
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

export const findSubHeadings = (tokens) => {
  const headings = new Set();
  const regex = /\*\*([a-zA-Z ]+)\*\*/;
  // eslint-disable-next-line no-restricted-syntax
  for (const token of tokens) {
    if (regex.test(token.raw)) {
      headings.add(regex.exec(token.raw)[1].toLowerCase());
    }
  }

  return [...headings];
};

const capitalise = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const fullRelease = (version, changelog) => {
  const tokens = prereleaseNotes(changelog);
  const subHeadings = findSubHeadings(tokens);

  const previousChangelog = pastNotes(changelog).reduce(
    (acc, item) => acc + item.raw,
    ''
  );

  return (
    subHeadings.reduce((result, subHeading) => {
      const items = getItemsFor(subHeading, tokens);
      const title = capitalise(subHeading);

      return `${result}**${title}**\n\n${items}`;
    }, preReleaseHeading(version)) + previousChangelog
  );
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
  return fullRelease(version, changelog);
};
