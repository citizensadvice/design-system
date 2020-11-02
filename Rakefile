# frozen_string_literal: true

require "open3"

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

namespace :tests do
  desc "Visual Regression Tests"
  task visual_regression: ["services:up_styleguide"] do
    backstopjs_version = Open3.popen3("npm view backstopjs version") { |_, stdout, _, _| stdout.read.chomp }
    puts("Using BackstopJS #{backstopjs_version}")
    environment = {
      "BACKSTOPJS_VERSION" => backstopjs_version,
      "PRODUCTION" => "true",
      "NODE_ENV" => "test"
    }
    system(environment, "docker-compose run visual-tests")
  end
end

namespace :services do
  desc "Start all services"
  task up: [:up_styleguide, :up_grid]

  desc "Start the styleguide server"
  task :up_styleguide do
    system("docker-compose up -d ca-styleguide")
  end

  desc "Start the Selenium grid servers"
  task :up_grid do
    system("docker-compose up -d hub node-chrome node-firefox && docker-compose run cucumber ./bin/docker/waiter")
  end

  desc "Rebuild Visual Regression References"
  task rebuild_vr_references: :up_styleguide do
    backstopjs_version = Open3.popen3("npm view backstopjs version") { |_, stdout, _, _| stdout.read.chomp }
    puts("Using BackstopJS #{backstopjs_version}")
    environment = {
      "BACKSTOPJS_VERSION" => backstopjs_version
    }
    system(environment, "docker-compose run visual-tests reference --config=backstop-config-ci.js")
  end
end
