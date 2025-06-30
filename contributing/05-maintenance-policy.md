# Maintenance policy

The Citizens Advice Design System defines the following maintenance policy, specifically for the `citizens_advice_components` gem:

1. All active Ruby versions (https://endoflife.date/ruby)
2. All active Rails versions (https://endoflife.date/rails)
3. Last 2 major ViewComponent versions

## Managing supported versions

The remainder of the guide documents the process for contributors when managing supported versions.

### When a new Ruby version is released

- Add the new version to the `ci-workflow.yml` test matrix
- Update the `.ruby-version` to the latest version (we always use the latest version when developing locally)
- Run the tests using the new version and make any required updates whilst ensuring backwards compatibility with the lowest supported version

### When a Ruby version goes end-of-life (EOL)

- Increase the `required_ruby_version` in `citizens_advice_components.gemspec`
- Increase the the `TargetRubyVersion` in `engine/.rubocop.yml` to match the new minimum version in the gemspec.
- Remove the old version from the `ci-workflow.yml` test matrix
- Remove any old compatibility code if required

### When a new Rails version is released

- Add a new group to the `Appraisals` file and run `bundle exec appraisal generate`
- Add the new appraisal to the `ci-workflow.yml` test matrix
- Run the tests using the new version and make any required updates whilst ensuring backwards compatibility with the lowest supported version
- Upgrade the `demo` application to use the newest version (we always aim to test the demo version against the latest version of Rails)
- Update the "Using with Rails guide" if necessary

### When a Rails version goes end-of-life (EOL)

- Increase the dependency range for all Rails libraries in `citizens_advice_components.gemspec`
- Remove the relevant group from the `Appraisals` file and run `bundle exec appraisal generate`
- Remove the old appraisal from the `ci-workflow.yml` test matrix
- Remove any old compatibility code if required

### Supporting multiple ViewComponent versions

When a new ViewComponent version is released that we want to explicitly test against:

- Add a new group to the `Appraisals` file and run `bundle exec appraisal generate`
- Add the new appraisal to the `ci-workflow.yml` test matrix
- Run the tests using the new version and make any required updates whilst ensuring backwards compatibility with the lowest supported version

Once the latest ViewComponent version becomes stable:

- Increase the dependency range for `view_component` in `citizens_advice_components.gemspec`
- Run `bundle update view_component` to update the `engine` lockfile to use the latest version by default in development
- Adjust the `Appraisals` file to define _previous_ version as the exception to test

As of version 4 ViewComponent will move into Long-Term Support, recognizing the feature-completeness of the framework. Once this version is established as the primary supported version we may consider dropping support for all previous versions. Until that point we maintain backwards compatibility with the last 2 major versions.
