# frozen_string_literal: true

module Breadcrumbs
  class Default < ::Base
    set_url "/iframe.html?id=components-breadcrumbs--collapsing&viewMode=story"

    elements :breadcrumbs, ".cads-breadcrumbs li"

    def all_but_last_breadcrumb
      breadcrumbs[0..-2]
    end

    def validate_initial_state!
      has_breadcrumbs?(wait: 5)
    end
  end
end
