# frozen_string_literal: true

require "citizens_advice_components"

require_relative "cads_theme"

# Make sure translation files are loaded
I18n.load_path << Dir[
  "#{CitizensAdviceComponents::Engine.root.join('config/locales')}/*.yml"
]

# https://github.com/bridgetownrb/bridgetown-view-component/issues/3
# https://github.com/ViewComponent/view_component/pull/1659
ViewComponent::Base.config.view_component_path = "src/_components"

module Builders
  class CadsBuilder < SiteBuilder
    def build
      load_cads
      CadsTheme.register('cads-theme')
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
