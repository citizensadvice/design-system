# frozen_string_literal: true

module ErrorSummary
  class Example < ::Base
    set_url "/iframe.html?id=forms-error-summary--example&viewMode=story"

    element :error_quantity_label, ".cads-error-summary__field_count"
    element :heading, "#error-summary-title"
    elements :errors, "ul > li"

    def validate_initial_state!
      has_error_quantity_label?(wait: 5)
    end

    def error_quantity
      error_quantity_label.text.to_i
    end
  end
end
