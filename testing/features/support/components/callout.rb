# frozen_string_literal: true

module DesignSystem
  class Callout < ::Base
    set_url "/iframe.html?id=3-components--callout&viewMode=story"

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
  end
end
