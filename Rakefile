# frozen_string_literal: true

task default: :check

namespace :design_system do
  desc "All Design System Tests"
  task :all do
    puts "Running all design system tests"
    system(
      "cd ./testing && bundle exec cucumber -p reports && cd .."
    ) || raise
  end
end

desc "Run all checks in the local context"
task check: ["ruby:lint", "npm:test"]

namespace :ruby do
  desc "Lint ruby files"
  task lint: [:rubocop, :haml_lint]

  desc "Rubocop Linting"
  task :rubocop do
    puts "Running rubocop linter"
    system("bundle exec rubocop")
  end

  desc "Haml Linting"
  task :haml_lint do
    puts "Running haml-lint"
    system("bundle exec haml-lint haml styleguide")
  end
end

namespace :npm do
  desc "Run node test"
  task test: [:lint, :jest]

  desc "Run jest tests in node"
  task jest: :build do
    puts "Running jest tests"
    system("npm run jest")
  end

  desc "Run linting jobs in node"
  task lint: :build do
    puts "Running Node lint"
    system("npm run lint")
  end

  desc "Build Node files"
  task build: :install do
    puts "Compiling files"
    system("npm run build") || raise
  end

  desc "Install Node modules"
  task :install do
    puts "Installing modules"
    system("npm ci") || raise
  end
end
