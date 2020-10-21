# frozen_string_literal: true

module DesignSystem
  class Callout < ::Base
    set_url "/iframe.html?id=components-callouts--standard-callout&viewMode=story"

    element :heading, "h3"
    element :message, "p"

    def warning
      evaluate_script(
        "window.getComputedStyle(
          document.querySelector('h3'), '::before'
        ).getPropertyValue('content')"
      ).delete('\\"')
    end

    def validate_initial_state!
      has_heading?(wait: 5)
    end
  end
end
