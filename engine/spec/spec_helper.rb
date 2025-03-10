# frozen_string_literal: true

ENV["RAILS_ENV"] ||= "test"

require File.expand_path("./test_app/config/environment", __dir__)

abort("The Rails environment is running in production mode!") if Rails.env.production?

require "capybara/rspec"
require "rspec/rails"
require "view_component/test_helpers"

Dir[File.join("./spec", "support", "**", "*.rb")].each { |file| require file }

module TestHelpers
  # For components using fetch_or_fallback,
  # we want to ensure that the correct
  # fallback behavior works in production.
  # The helper enables us to easily test
  # this production-only behavior.
  def without_fetch_or_fallback_raises
    CitizensAdviceComponents::FetchOrFallbackHelper.fallback_raises = false
    yield
  ensure
    CitizensAdviceComponents::FetchOrFallbackHelper.fallback_raises = true
  end
end

# enable [aria-label] support for field finders
Capybara.enable_aria_label = true

RSpec.configure do |config|
  config.include ActiveSupport::Testing::TimeHelpers
  config.include ViewComponent::TestHelpers, type: :component
  config.include Capybara::RSpecMatchers, type: :component
  config.include TestHelpers

  # Explicitly set locale before each component spec,
  # to avoid leaking locale state between test runs.
  config.around(type: :component) do |example|
    I18n.with_locale(:en) { example.run }
  end

  config.expect_with :rspec do |expectations|
    expectations.syntax = :expect
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end

  config.shared_context_metadata_behavior = :apply_to_host_groups

  config.infer_spec_type_from_file_location!
  config.filter_rails_from_backtrace!
end
