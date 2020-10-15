# frozen_string_literal: true

module DesignSystem
  class ErrorSummary < SitePrism::Page
    set_url "/iframe.html?id=3-components--error-summary&viewMode=story"

    section :initial_form, "#a11yComponentToTest" do
      element :heading, "#error-summary-title"
      element :error_quantity_label, ".cads-error-summary__field_count"
      elements :errors, ".cads-error-summary__list > li"

      def error_quantity
        error_quantity_label.text.to_i
      end
    end

    load_validation do
      AutomationLogger.debug("Waiting for Error Summary component.")
      [has_initial_form?(wait: 5), "Initial Error Summary component didn't load correctly!"]
    end
  end
end
