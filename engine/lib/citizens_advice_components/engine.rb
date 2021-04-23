# frozen_string_literal: true

require "haml"
require "rails-i18n"
require "active_support/core_ext"
require "view_component/engine"

module CitizensAdviceComponents
  class Engine < ::Rails::Engine
    isolate_namespace CitizensAdviceComponents

    config.view_component.preview_paths << CitizensAdviceComponents::Engine.root.join("previews")
  end
end
