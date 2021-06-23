# frozen_string_literal: true

module Helpers
  module Javascript
    include Helpers::EnvVariables

    def active_element
      session.evaluate_script("document.activeElement")
    end

    def before_content(selector)
      session.evaluate_script(
        <<~JS
          window.getComputedStyle(document.querySelector('#{selector}'), '::before')
            .getPropertyValue('content')
        JS
      )
    end

    private

    def session
      Capybara.current_session
    end
  end
end
