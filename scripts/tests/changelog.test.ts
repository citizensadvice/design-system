import { release } from '../changelog';
import path from 'path';

const withAlphaPath = path.join(
  __dirname,
  '__fixtures__',
  'with-alpha-releases.md'
);

describe('pre-checks', () => {
  it('accepts a valid semver', () => {
    expect(() => {
      release('v1.1.1-alpha.2', withAlphaPath);
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
