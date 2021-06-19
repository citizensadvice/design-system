# frozen_string_literal: true

require "haml"
require "active_support/core_ext"
require "view_component/engine"

module CitizensAdviceComponents
  class Engine < ::Rails::Engine
    isolate_namespace CitizensAdviceComponents

    config.view_component.preview_paths << CitizensAdviceComponents::Engine.root.join("previews")
    config.autoload_paths = %W[
      #{CitizensAdviceComponents::Engine.root.join("previews")}
      #{CitizensAdviceComponents::Engine.root.join("app/components")}
      #{CitizensAdviceComponents::Engine.root.join("app/lib")}
    ]
  end
end
