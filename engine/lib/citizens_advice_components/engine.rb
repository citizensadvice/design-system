# frozen_string_literal: true

require "rails/engine"
require "view_component"

module CitizensAdviceComponents
  class Engine < ::Rails::Engine
    isolate_namespace CitizensAdviceComponents

    config.autoload_paths = %W[
      #{CitizensAdviceComponents::Engine.root.join('app/components')}
      #{CitizensAdviceComponents::Engine.root.join('app/helpers')}
      #{CitizensAdviceComponents::Engine.root.join('app/lib')}
    ]

    # Ensure that application level configuration settings apply to
    # library specific deprecation warnings. Introduced in Rails 7.1
    # https://api.rubyonrails.org/classes/ActiveSupport/Deprecation.html
    # https://guides.rubyonrails.org/7_1_release_notes.html#add-rails-application-deprecators
    if Rails.version.to_f >= 7.1
      initializer "citizens_advice_components.deprecator" do |app|
        app.deprecators[:citizens_advice_components] = CitizensAdviceComponents.deprecator
      end
    end
  end
end
