# frozen_string_literal: true

module DesignSystem
  class AdviceFeedback < SitePrism::Page
    set_url "/iframe.html?id=3-components--advice-feedback&viewMode=story"

    element :page_title, "h1"

    section :initial_form, ".cads-advice-feedback__step1" do
      element :heading, ".cads-heading-small"
      element :yes, "#cads-advice-feedback__yes"
      element :no, "#cads-advice-feedback__no"
    end

    section :negative_response_form, ".cads-advice-feedback__step2" do
      elements :reasons, ".cads-radio-button"
      element :freetext_box, "#advice-feedback-optional-input"
      element :submit, "[aria-label='Submit feedback']"
      element :close, "[aria-label='Close advice feedback form']"
      element :error_header, ".cads-error-summary"
      element :error_message, ".cads-form__error-message"

      def select_random_reason
        AutomationLogger.info("Selecting reason #{random_reason}")
        random_reason.click
      end

      def random_reason
        @random_reason ||= reasons.sample
      end
    end

    section :positive_response_form, ".cads-advice-feedback__step3" do
      element :flash_message, ".paragraph-s.cads-success-message"
    end

    expected_elements :initial_form

    load_validation do
      AutomationLogger.debug("Waiting for AdviceFeedback component delayed 'step sub-form'.")
      [has_initial_form?(wait: 5), "Initial AdviceFeedback component didn't load correctly!"]
    end
  end
end
