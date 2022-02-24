# frozen_string_literal: true

task default: :check

namespace :design_system do
  desc "All Design System Tests"
  task :all do
    puts "Running all design system tests"
    system(
      "cd ./testing && bundle exec cucumber -p reports --retry 1 && cd .."
    ) || raise
  end
end
