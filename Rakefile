# frozen_string_literal: true

namespace :design_system do
  desc "All Design System Tests"
  task :all do
    puts "Running all design system tests"
    system(
      "cd ./testing && bundle exec cucumber -p reports && cd .."
    ) || raise
  end
end

desc "Rubocop Linting"
task :rubocop do
  puts "Running rubocop linter"
  system("bundle exec rubocop") || raise
end
