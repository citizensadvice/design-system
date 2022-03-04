# frozen_string_literal: true

module Callouts
  class Standard < ::Base
    set_url "/iframe.html?id=components-callouts--standard&viewMode=story"

    element :label, ".cads-badge"
    element :heading, "h3"
    element :message, "p"

    def validate_initial_state!
      has_heading?(wait: 5)
    end
  end
end
