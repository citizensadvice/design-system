# frozen_string_literal: true

module DesignSystem
  class Breadcrumbs < SitePrism::Page
    set_url "/iframe.html?id=components-breadcrumbs--breadcrumbs-default&viewMode=story"

    section :initial_form, ".cads-breadcrumbs" do
      elements :breadcrumbs, ".cads-breadcrumbs li"

      def all_but_last_breadcrumb
        breadcrumbs[0..-2]
      end
    end

    load_validation do
      AutomationLogger.debug("Waiting for Breadcrumbs component.")
      [has_initial_form?(wait: 5), "Initial Breadcrumbs component didn't load correctly!"]
    end
  end
end
