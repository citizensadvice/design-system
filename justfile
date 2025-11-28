# List available recipes
help:
    @just --list

# Generate a new ADR
[working-directory('./contributing/adr')]
adr title:
    #!/usr/bin/env bash
    set -euo pipefail

    date=$(date +%Y-%m-%d)
    # Modified from https://github.com/npryce/adr-tools/blob/master/src/adr-new
    slug=$(echo -n {{ title }} | tr -Ccs [:alnum:] - | tr [:upper:] [:lower:] | sed -e 's/[^[:alnum:]]*$//' -e 's/^[^[:alnum:]]*//')
    output="$date-$slug.md"

    cat 0000-template.md | sed \
        -e "s|TITLE|{{ title }}|" \
        -e "s|DATE|$date|" > $output

    echo "New ADR created at ./contributing/adr/$output"

# Setup project
setup: package-setup engine-setup demo-setup website-setup

# Run all checks
check-all: format-check package-check engine-check demo-check website-check

# Run formatters
format:
    just --fmt --unstable
    npm run format

alias fmt := format

# Check format only
format-check:
    just --fmt --check --unstable
    npm run format:check

# Setup npm package only
[group('package')]
package-setup:
    npm install

# Check npm package only
[group('package')]
package-check:
    npm run lint
    npm test

# Setup engine only
[group('engine')]
[working-directory('./engine')]
engine-setup:
    bundle install
    bundle exec appraisal install

# Check engine only
[group('engine')]
[working-directory('./engine')]
engine-check:
    bundle exec rubocop
    bundle exec erb_lint --lint-all
    bundle exec appraisal rake spec

# Sync fonts between npm source and engine
[group('engine')]
engine-sync:
    cp -av ./assets/fonts/* ./engine/app/assets/fonts/citizens_advice_components

# Setup demo app only
[group('demo')]
[working-directory('./demo')]
demo-setup:
    bundle install
    npm install
    bin/rails log:clear tmp:clear
    bin/rails restart

# Check demo app only
[group('demo')]
[working-directory('./demo')]
demo-check:
    bundle exec rubocop
    bin/rails cypress:run
    npm run backstop:local

# Run a dev server for the demo app
[group('demo')]
[working-directory('./demo')]
demo-dev:
    bin/dev

# Setup website only
[group('website')]
[working-directory('./website')]
website-setup:
    bin/setup
    npm install

# Check website only
[group('website')]
[working-directory('./website')]
website-check:
    bundle exec rubocop
    bundle exec erb_lint --lint-all
    bin/static-build

# Run a dev server for the website
[group('website')]
[working-directory('./website')]
website-dev:
    bin/dev

# Build a static copy of the website
[group('website')]
[working-directory('./website')]
website-build:
    bin/static-build

# Prepare a release
[group('release')]
release:
    npm run release

# Publish the package to npm
[group('release')]
publish:
    npm publish

    @echo "Package published to npm!"
    @echo "Next, create a new release in GitHub: https://github.com/citizensadvice/design-system/releases/new"
