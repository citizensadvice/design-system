# frozen_string_literal: true

module Helpers
  module Javascript
    def height_of_page
      session.execute_script("return document.body.scrollHeight")
    end

    def full_page_html
      session.execute_script("return document.documentElement.outerHTML")
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
