# frozen_string_literal: true

module OiscWarning
  class TitleOnly < ::Base
    set_url "/iframe.html?id=components-oisc-warning--title-only"

    element :heading, "h2"

    def validate_initial_state!
      has_heading?(wait: 5)
    end
  end
end
