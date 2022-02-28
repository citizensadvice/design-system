# frozen_string_literal: true

lib = File.expand_path("lib", __dir__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require "citizens_advice_components/version"

Gem::Specification.new do |spec|
  spec.name = "citizens_advice_components"
  spec.version = CitizensAdviceComponents::VERSION
  spec.authors = ["Citizens Advice"]

  spec.summary = "Citizens Advice Design System components distributed as a Rails engine"
  spec.required_ruby_version = Gem::Requirement.new(">= 2.7")

  # Prevent pushing this gem to RubyGems.org. To allow pushes either set the 'allowed_push_host'
  # to allow pushing to a single host or delete this section to allow pushing to any host.
  if spec.respond_to?(:metadata)
    # spec.metadata["allowed_push_host"] = "https://rubygems.org"
    spec.metadata["rubygems_mfa_required"] = "true"
  else
    raise "RubyGems 2.0 or newer is required to protect against " \
          "public gem pushes."
  end

  spec.files = Dir["{app,config,lib}/**/*", "README.md"]

  spec.add_runtime_dependency     "haml-rails", [">= 2.0.0", "< 3.0"]
  spec.add_runtime_dependency     "rails", [">= 6.0.0", "< 7.0"]
  spec.add_runtime_dependency     "rails-i18n", [">= 6.0.0", "< 7.0"]
  spec.add_runtime_dependency     "view_component", [">= 2.0.0", "< 3.0"]
end
