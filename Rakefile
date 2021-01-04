# frozen_string_literal: true

require "fileutils"

task default: :check

def collect_task_errors(tasks)
  errors = tasks.each_with_object([]) do |task, memo|
    Rake::Task[task].invoke
  rescue RuntimeError
    memo << task
  end

  errors.count.positive? && raise("The following tasks failed #{errors}")
end

def base_cucumber_path
  "artifacts/#{ENV['BROWSER']}/#{ENV['BROWSERSTACK'] == 'true' ? ENV['BROWSERSTACK_CONFIGURATION_OPTIONS'] : 'other'}"
end

namespace :design_system do
  desc "All Design System Tests"
  task all: :report_folders do
    puts "Running all design system tests"
    system(
      "cd ./testing && bundle exec cucumber -p reports --retry 1 && cd .."
    ) || raise
  end

  desc "Creating report folders"
  task :report_folders do
    puts "Creating folder structure for this test run"
    dirs = %w[html_pages logs reports screenshots]
    dirs.each do |dir|
      FileUtils.mkdir_p("testing/#{base_cucumber_path}/#{dir}")
    end
  end
end

desc "Run all checks in the local context"
task :check do
  collect_task_errors(%w[ruby:lint npm:test])
end

namespace :ruby do
  desc "Lint ruby files"
  task :lint do
    collect_task_errors(%w[ruby:rubocop ruby:haml_lint ruby:i18n_tasks])
  end

  desc "Rubocop Linting"
  task :rubocop do
    puts "Running rubocop linter"
    system("bundle exec rubocop") || raise
  end

  desc "Haml Linting"
  task :haml_lint do
    puts "Running haml-lint"
    system("bundle exec haml-lint haml styleguide") || raise
  end

  desc "i18n-tasks health"
  task :i18n_tasks do
    system("bundle exec i18n-tasks health") || raise
  end
end

namespace :npm do
  desc "Run node test"
  task :test do
    collect_task_errors(%w[npm:lint npm:jest])
  end

  desc "Run jest tests in node"
  task jest: :build do
    puts "Running jest tests"
    system("npm run jest") || raise
  end

  desc "Run linting jobs in node"
  task lint: :build do
    puts "Running Node lint"
    system("npm run lint") || raise
  end

  desc "Build Node files"
  task :build do
    puts "Compiling files"
    system("npm run build") || raise
  end
end
