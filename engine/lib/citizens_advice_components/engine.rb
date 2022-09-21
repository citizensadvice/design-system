# frozen_string_literal: true

require "rails/engine"
require "rails-i18n"
require "view_component"

module CitizensAdviceComponents
  class Engine < ::Rails::Engine
    isolate_namespace CitizensAdviceComponents

    config.autoload_paths = %W[
      #{CitizensAdviceComponents::Engine.root.join('app/components')}
      #{CitizensAdviceComponents::Engine.root.join('app/lib')}
    ]
  end
end
