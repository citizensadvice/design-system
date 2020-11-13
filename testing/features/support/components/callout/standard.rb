# frozen_string_literal: true

module Callout
  class Standard < ::Base
    include Helpers::Javascript

    set_url "/iframe.html?id=components-callouts--standard-callout&viewMode=story"

    element :label, ".cads-callout-label"
    element :heading, "h3"
    element :message, "p"

    def validate_initial_state!
      has_heading?(wait: 5)
    end
  end
end
