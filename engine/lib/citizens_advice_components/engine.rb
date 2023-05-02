# frozen_string_literal: true

require "rails/engine"
require "view_component"

module CitizensAdviceComponents
  class Engine < ::Rails::Engine
    isolate_namespace CitizensAdviceComponents unless defined?(Bridgetown)

    config.autoload_paths = %W[
      #{CitizensAdviceComponents::Engine.root.join('app/components')}
      #{CitizensAdviceComponents::Engine.root.join('app/lib')}
    ]
  end
end
