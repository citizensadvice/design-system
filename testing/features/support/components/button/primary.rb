# frozen_string_literal: true

module Button
  class Primary < ::Base
    set_url "/iframe.html?id=components-buttons--primary&viewMode=story"

    element :primary, ".cads-button.cads-button__primary"
    element :secondary, ".cads-button.cads-button__secondary"
    element :tertiary, ".cads-button.cads-button__tertiary"

    def validate_initial_state!
      has_primary?(wait: 5)
    end
  end
end
