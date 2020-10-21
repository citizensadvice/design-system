# frozen_string_literal: true

module Helpers
  module Scripts
    def before_content(selector)
      <<~JS
        window.getComputedStyle(document.querySelector('#{selector}'), '::before')
          .getPropertyValue('content')
      JS
    end
  end
end
