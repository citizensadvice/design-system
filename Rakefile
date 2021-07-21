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
