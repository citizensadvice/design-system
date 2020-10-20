# frozen_string_literal: true

module DesignSystem
  class Breadcrumbs < ::Base
    set_url "/iframe.html?id=components-breadcrumbs--breadcrumbs-default&viewMode=story"

    section :initial_form, ".cads-breadcrumbs" do
      elements :breadcrumbs, ".cads-breadcrumbs li"

      def all_but_last_breadcrumb
        breadcrumbs[0..-2]
      end
    end
  end
end
