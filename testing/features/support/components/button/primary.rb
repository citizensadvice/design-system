# frozen_string_literal: true

module Button
  class Primary < ::Base
    set_url "/iframe.html?id=components-buttons--primary&viewMode=story"

    element :button, ".cads-button.cads-button__primary"

    def validate_initial_state!
      has_button?(wait: 5)
    end
  end
end
