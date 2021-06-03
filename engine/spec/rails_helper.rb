# frozen_string_literal: true

require "bundler/setup"

require "spec_helper"

ENV["RAILS_ENV"] ||= "test"
require File.expand_path("../../demo/config/environment", __dir__)

abort("The Rails environment is running in production mode!") if Rails.env.production?
require "rspec/rails"

require "view_component/test_helpers"

RSpec.configure do |config|
  config.include ViewComponent::TestHelpers, type: :component

  # Explicitly set locale before each component spec,
  # to avoid leaking locale state between test runs.
  config.before(type: :component) do
    I18n.locale = :en
  end

  config.infer_spec_type_from_file_location!
  config.filter_rails_from_backtrace!
end
