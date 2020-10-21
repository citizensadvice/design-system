# frozen_string_literal: true

module Callout
  class Adviser < Standard
    set_url "/iframe.html?id=components-callouts--adviser-callout&viewMode=story"

    def warning
      evaluate_script(
        "window.getComputedStyle(
          document.querySelector('.cads-callout__adviser-label'), '::before'
        ).getPropertyValue('content')"
      ).delete('\\"')
    end
  end
end
