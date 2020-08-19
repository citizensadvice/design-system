# frozen_string_literal: true

module DesignSystem
  class Callout < SitePrism::Page
    set_url "/iframe.html?id=3-components--callout&viewMode=story"

    element :page_title, "h1"

    section :initial_form, ".cads-callout-important" do
      element :heading, "h3"
      element :message, "p"

      def warning
        Capybara.current_session.evaluate_script(
          "window.getComputedStyle(
            document.querySelector('.cads-callout-important h3'), '::before'
          ).getPropertyValue('content')"
        ).delete('\\"')
      end
    end

    load_validation do
      AutomationLogger.debug("Waiting for Callout component.")
      [has_initial_form?(wait: 5), "Initial Callout component didn't load correctly!"]
    end
  end
end
