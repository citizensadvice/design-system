# frozen_string_literal: true

require_relative "boot"

require "rails"
require "active_model/railtie"
require "action_controller/railtie"
require "action_view/railtie"

Bundler.require(*Rails.groups)

module Demo
  class Application < Rails::Application
    config.load_defaults 6.0
    config.generators.system_tests = nil
    config.view_component.preview_paths << DesignSystem::Engine.root.join("previews")
  end
end
