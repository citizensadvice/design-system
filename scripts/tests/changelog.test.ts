import { release } from '../changelog';
import path from 'path';

describe('pre-checks', () => {
  it('accepts a valid semver', () => {
    expect(() => {
      release('v1.1.1-alpha.0');
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
      release('v1.1.1');
    }).not.toThrow();
  });

  it('looks for changelog at path', () => {
    expect(() => {
      release(
        'v1.1.1',
        path.join(__dirname, '__fixtures__', 'with-alpha-releases.md')
      );
    });
  });

  it('bails if changelog does not exist', () => {
    expect(() => {
      release('v1.1.1', path.join(__dirname, 'DOES_NOT_EXIST'));
    }).toThrow();
  });
});
