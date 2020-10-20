# frozen_string_literal: true

module OiscWarning
  class TitleDescription < ::Base
    set_url "/iframe.html?id=components-oisc-warning--with-title-and-description"

    element :heading, "h2"
    element :description, "p"

    def validate_initial_state!
      has_heading?(wait: 5)
    end
  end
end
