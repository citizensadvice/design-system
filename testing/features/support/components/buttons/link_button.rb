# frozen_string_literal: true

module Buttons
  class LinkButton < Primary
    set_url "/iframe.html?id=components-buttons--link-button&viewMode=story"

    elements :buttons, "[class*='cads-linkbutton']"

    def button_types
      buttons.map { |button| button[:type] }
    end

    def validate_initial_state!
      has_buttons?(wait: 5)
    end
  end
end
