# frozen_string_literal: true

require "active_support/core_ext/time"
require "view_component/engine"
require "citizens_advice_components"

require_relative "cads_theme"

# Make sure translation files are loaded
I18n.load_path << Dir[
  "#{CitizensAdviceComponents::Engine.root.join('config/locales')}/*.yml"
]

Time.zone = "London"

# Apply any additional patches to the ViewComponent::Base class
module ViewComponent
  class Base
    # ViewComponent depends on there being a Rails controller present.
    # This causes an issue when run in a Bridgetown context.
    # Define a view context and controller using ActionView::Base
    def controller
      view = ActionView::Base.new(ActionView::LookupContext.new([]), {}, nil)
      view.controller
    end
  end
end

module Builders
  class CadsBuilder < SiteBuilder
    def build
      load_cads
      CadsTheme.register("cads-theme")
    end

    def load_cads
      site.config.loaded_cads ||= begin
        cads_loader = Zeitwerk::Loader.new
        CitizensAdviceComponents::Engine.config.autoload_paths.each do |path|
          cads_loader.push_dir path
        end
        cads_loader.setup
        cads_loader.eager_load
        true
      end
    end
  end
end
