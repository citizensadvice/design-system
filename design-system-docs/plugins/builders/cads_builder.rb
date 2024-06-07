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

# ViewComponent 3.9+ introduced a change which depends on there being an active Rails
# request or controller in order to conditionally escape HTML. This causes an issue
# when run in bridgetown as there's no request and we're always rendering static html.
# Monkey patch the relevant method to remove the request format check.
# https://github.com/citizensadvice/design-system/issues/3145
# https://github.com/bridgetownrb/bridgetown-view-component/issues/8
module ViewComponent
  class Base
    def maybe_escape_html(text)
      return text if text.blank?

      if text.html_safe?
        text
      else
        yield
        html_escape(text)
      end
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
