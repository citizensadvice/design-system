# frozen_string_literal: true

require "haml"
require "rails-i18n"
require "active_support/core_ext"
require "view_component/engine"

module DesignSystem
  class Engine < ::Rails::Engine
    isolate_namespace DesignSystem

    config.view_component.preview_paths << DesignSystem::Engine.root.join("previews")
  end
end
