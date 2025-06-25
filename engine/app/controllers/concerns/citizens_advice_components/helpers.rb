# frozen_string_literal: true

# Utility for including shared view and controller helpers
# class ApplicationController < ActionController::Base
#   include CitizensAdviceComponents::Helpers
#   [...]
# end
module CitizensAdviceComponents
  module Helpers
    extend ActiveSupport::Concern

    included do
      # Make view helpers available to the application
      helper CitizensAdviceComponents::Engine.helpers

      helper_method :cads_breadcrumbs
      def cads_breadcrumbs
        @cads_breadcrumbs ||= cads_default_breadcrumbs
      end
    end

    protected

    def cads_add_breadcrumb(crumb)
      cads_breadcrumbs << crumb
    end

    def cads_add_breadcrumbs(crumbs)
      cads_breadcrumbs.concat(crumbs)
    end

    def cads_default_breadcrumbs
      []
    end
  end
end
