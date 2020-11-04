# frozen_string_literal: true

module Input
  class Basic < ::Base
    set_url "/iframe.html?id=forms-input--basic&viewMode=story"

    element :label, ".cads-form-label"
    element :input, "#example-input-input"


    def validate_initial_state!
      has_input?(wait: 5)
    end
  end
end
