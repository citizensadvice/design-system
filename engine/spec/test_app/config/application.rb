# frozen_string_literal: true

require_relative "boot"

require "active_model/railtie"
require "action_controller/railtie"
require "action_view/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Demo
  class Application < Rails::Application
    config.load_defaults (ENV["RAILS_VERSION"] ? ENV["RAILS_VERSION"][0..2] : "6.1").to_s
  end
end
