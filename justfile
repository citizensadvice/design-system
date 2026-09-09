_help:
    @just --list

# Setup the project
setup: _setup-package _setup-engine _setup-demo _setup-website

_setup-package:
    npm install

[working-directory('./engine')]
_setup-engine:
    bundle install
    bundle exec appraisal install

[working-directory('./demo')]
_setup-demo:
    bundle install
    npm install
    bin/rails log:clear tmp:clear
    bin/rails restart

[working-directory('./website')]
_setup-website:
    bin/setup
    npm install

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

# Run all lint checks
[group('lint')]
lint: lint-fmt lint-package lint-engine lint-website lint-demo

# Run formatters
[group('lint')]
format:
    just --fmt --unstable
    npm run format

alias fmt := format

# Check format only
[group('lint')]
lint-fmt:
    just --fmt --check --unstable
    npm run format:check

# Lint package only
[group('lint')]
lint-package:
    npm run lint

# Lint engine only
[group('lint')]
[working-directory('./engine')]
lint-engine:
    bundle exec rubocop
    bundle exec erb_lint --lint-all

# Lint demo app only
[group('lint')]
[working-directory('./demo')]
lint-demo:
    bundle exec rubocop

# Lint website only
[group('lint')]
[working-directory('./website')]
lint-website:
    bundle exec rubocop
    bundle exec erb_lint --lint-all

# Run unit tests (excluding slower browesr checks)
[group('tests')]
test: test-package test-engine

alias t := test

# Run all tests
[group('tests')]
test-all: test-package test-engine test-demo test-website

# Run npm package tests only
[group('tests')]
test-package:
    npm test

# Run engine tests only
[group('tests')]
[working-directory('./engine')]
test-engine:
    bundle exec appraisal rake spec

# Run demo app tests only
[group('tests')]
[working-directory('./demo')]
test-demo:
    bin/rails cypress:run
    npm run backstop:local

# Run website tests only
[group('tests')]
[working-directory('./website')]
test-website:
    # For the website, running a static build is a sufficent test
    bin/static-build

# Run a dev server for the demo app
[group('dev')]
[working-directory('./demo')]
dev:
    bin/dev

# Run a dev server for the website
[group('dev')]
[working-directory('./website')]
dev-website:
    bin/dev

# Run quick checks only
[group('checks')]
check-quick: lint test-package test-engine

# Run all checks
[group('checks')]
check-all: lint test-package test-engine test-demo test-website

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
