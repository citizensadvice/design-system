# frozen_string_literal: true

module DesignSystem
  class ErrorSummary < ::Base
    set_url "/iframe.html?id=forms-error-summary--example&viewMode=story"

    section :initial_form, ".cads-error-summary" do
      element :heading, "#error-summary-title"
      element :error_quantity_label, ".cads-error-summary__field_count"
      elements :errors, "ul > li"

      def error_quantity
        error_quantity_label.text.to_i
      end
    end
  end
end
