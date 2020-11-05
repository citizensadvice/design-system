# frozen_string_literal: true

module Input
  class Basic < ::Base
    set_url "/iframe.html?id=forms-input--basic&viewMode=story"

    element :input, ".cads-input"
    element :label, "label"
    element :hint, ".cads-form__hint"
    element :optional, ".cads-form-label::after"

    def validate_initial_state!
      has_input?(wait: 5)
    end
  end
end
