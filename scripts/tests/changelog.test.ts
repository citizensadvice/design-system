import path from 'path';
import fs from 'fs';
import { advanceTo } from 'jest-date-mock';
import {
  findSubHeadings,
  getItemsFor,
  pendingReleaseNotes,
  release,
} from '../changelog';

const feb17 = 1613562880000;

const withAlphaPath = path.join(
  __dirname,
  '__fixtures__',
  'with-alpha-releases.md'
);

const pendingRelease = path.join(
  __dirname,
  '__fixtures__',
  'pending-release.md'
);

const pendingReleaseAlpha = path.join(
  __dirname,
  '__fixtures__',
  'pending-release-after-alpha.md'
);

const pendingReleaseProd = path.join(
  __dirname,
  '__fixtures__',
  'pending-release-after-production.md'
);

describe('pre-checks', () => {
  it('accepts a valid semver', () => {
    expect(() => {
      release('v1.1.1-alpha.2', pendingRelease);
    }).not.toThrow();
  });

  it('bails if version is not a valid semver', () => {
    expect(() => {
      release('not a version');
    }).toThrow();
  });

  it('looks for changelog in current dir', () => {
    // CHANGELOG.md in project root
    expect(() => {
      release('v500.0.0'); // set high as we're reading the real changelog
    }).not.toThrow();
  });

  it('looks for changelog at path', () => {
    expect(() => {
      release('v1.1.1', withAlphaPath);
    }).not.toThrow();
  });

  it('ensures version is greater than previous', () => {
    expect(() => {
      release('v1.0.0', withAlphaPath);
    }).toThrow();
  });

  it('bails if changelog does not exist', () => {
    expect(() => {
      release('v1.1.1', path.join(__dirname, 'DOES_NOT_EXIST'));
    }).toThrow();
  });
});

describe('alpha release', () => {
  it('adds version and date title to start of file', () => {
    advanceTo(feb17);

    const changelog = release(`v1.2.0-alpha.0`, pendingRelease);
    expect(changelog).toEqual(fs.readFileSync(pendingReleaseAlpha).toString());
  });

  it('bails if there is nothing to do', () => {
    advanceTo(feb17);

    expect(() => release(`v1.2.0-alpha.1`, pendingReleaseAlpha)).toThrow();
  });
});

describe('production release', () => {
  beforeEach(() => advanceTo(feb17));

  it('gets prerelease note tokens', () => {
    const changelog = fs.readFileSync(pendingRelease);
    const notes = pendingReleaseNotes(changelog);

    // last expected item
    expect(notes[notes.length - 1].raw).toContain(
      '🥖 Breadcrumbs: Layout adjustments when viewed on small screen'
    );
  });

  it('collects bugfixes from release notes', () => {
    const changelog = fs.readFileSync(pendingRelease);
    const notes = pendingReleaseNotes(changelog);

    expect(getItemsFor('bugfixes', notes)).toEqual(
      '- 🐛: a bugfix\n- 🎯 Targeted content: will now scroll back to targeted content on close\n- 🥖 Breadcrumbs: Layout adjustments when viewed on small screen\n\n'
    );
  });

  it('collects new features from release notes', () => {
    const changelog = fs.readFileSync(pendingRelease);
    const notes = pendingReleaseNotes(changelog);

    expect(getItemsFor('new', notes)).toEqual(
      '- 🐠: Something new\n- 🎯 Targeted content: you can now specifiy the heading level of the title element\n\n'
    );
  });

  it('combines alpha release notes', () => {
    const changelog = release(`v1.1.1`, pendingRelease);
    expect(changelog).toContain(fs.readFileSync(pendingReleaseProd).toString());
  });
});

describe('utility functions', () => {
  it('finds unique sub headings', () => {
    const changelog = fs.readFileSync(pendingRelease);
    const notes = pendingReleaseNotes(changelog);
    const subHeadings = findSubHeadings(notes);

    expect(subHeadings).toEqual(['new', 'bugfixes']);
  });
});
