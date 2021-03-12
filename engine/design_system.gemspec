# frozen_string_literal: true

lib = File.expand_path("lib", __dir__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require "design_system/version"

Gem::Specification.new do |spec|
  spec.name = "design_system"
  spec.version = DesignSystem::VERSION
  spec.authors = ["Citizens Advice"]

  spec.summary = "Citizens Advice design system engine"
  spec.required_ruby_version = Gem::Requirement.new(">= 2.7")

  # Prevent pushing this gem to RubyGems.org. To allow pushes either set the 'allowed_push_host'
  # to allow pushing to a single host or delete this section to allow pushing to any host.
  if spec.respond_to?(:metadata)
    # spec.metadata["allowed_push_host"] = "https://rubygems.org"
  else
    raise "RubyGems 2.0 or newer is required to protect against " \
      "public gem pushes."
  end

  spec.files = Dir["{app,config,lib}/**/*", "README.md"]

  spec.add_runtime_dependency     "haml", [">= 5.1.0", "< 6.0"]
  spec.add_runtime_dependency     "rails", [">= 6.0.0", "< 7.0"]
  spec.add_runtime_dependency     "view_component", [">= 2.0.0", "< 3.0"]

  spec.add_development_dependency "rspec"
  spec.add_development_dependency "rspec-rails"
end
