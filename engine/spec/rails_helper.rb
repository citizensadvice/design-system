# frozen_string_literal: true

require "bundler/setup"

require "spec_helper"

ENV["RAILS_ENV"] ||= "test"
require File.expand_path("../../demo/config/environment", __dir__)

abort("The Rails environment is running in production mode!") if Rails.env.production?
require "rspec/rails"

require "view_component/test_helpers"

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

RSpec.configure do |config|
  config.include ViewComponent::TestHelpers, type: :component
  config.include TestHelpers

  # Explicitly set locale before each component spec,
  # to avoid leaking locale state between test runs.
  config.before(type: :component) do
    I18n.locale = :en
  end

  config.infer_spec_type_from_file_location!
  config.filter_rails_from_backtrace!
end
