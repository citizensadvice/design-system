# frozen_string_literal: true

module Helpers
  module Javascript
    include Helpers::EnvVariables

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

    def scroll_to_top_of_page
      session.execute_script("window.scrollTo(0, 0)")
      sleep js_delay_time
    end

    def scroll_to_bottom_of_page
      session.execute_script("window.scrollTo(0, 100000)")
      sleep js_delay_time
    end

    private

    def session
      Capybara.current_session
    end

    def js_delay_time
      return 2.5 if ios12?
      return 1 if device? || safari?
      0.5
    end
  end
end
