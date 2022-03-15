# frozen_string_literal: true

require "haml-rails"
require "rails-i18n"
require "active_support/core_ext"
require "view_component"

module CitizensAdviceComponents
  class Engine < ::Rails::Engine
    isolate_namespace CitizensAdviceComponents

    config.view_component.preview_paths << CitizensAdviceComponents::Engine.root.join("previews")
    config.autoload_paths = %W[
      #{CitizensAdviceComponents::Engine.root.join('previews')}
      #{CitizensAdviceComponents::Engine.root.join('app/components')}
      #{CitizensAdviceComponents::Engine.root.join('app/lib')}
    ]
  end
end
