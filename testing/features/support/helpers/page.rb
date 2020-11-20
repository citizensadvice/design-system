# frozen_string_literal: true

module Helpers
  module Page
    include Helpers::Methods
    include Helpers::EnvVariables

    def resize_window(desired_width = width, desired_height = height)
      AutomationLogger.warn("Resizing Windows on Browserstack IE can be flaky!") if browserstack? && internet_explorer?
      Capybara.current_window.resize_to(desired_width, desired_height)
    end

    def save_full_page_screenshot(scenario)
      path = image_file_path(scenario)
      resize_page_to_fullsize
      AutomationLogger.info("Taking a screenshot to #{path}")
      save_image(path)
      attach(path, "image/png")
    end

    def save_full_page_html(scenario)
      file_path = html_file_path(scenario)
      File.write(file_path, full_page_html)
      attach(file_path, "text/html")
    end

    def switch_to_newly_opened_window!(new_page: false)
      wait_for_second_window
      page.switch_to_window(second_window)
      wait_for_new_url if firefox? && new_page
    end

    private

    def resize_page_to_fullsize
      AutomationLogger.info("Resizing page to full page size.")
      AutomationLogger.debug("Note that for HEADED chrome this won't work!") if chrome? && !headless?
      resize_window(width(fallback: 1024), height_of_page + 150)
    end

    def height_of_page
      current_session.execute_script("return document.body.scrollHeight")
    end

    def save_image(path)
      current_session.save_screenshot(path)
    end

    def full_page_html
      current_session.execute_script("return document.documentElement.outerHTML")
    end

    def image_file_path(test_case)
      "#{ENV['BASE_ARTIFACTS_PATH']}/screenshots/#{name_of_file(test_case)}.png"
    end

    def html_file_path(test_case)
      "#{ENV['BASE_ARTIFACTS_PATH']}/html_pages/#{name_of_file(test_case)}.html"
    end

    def name_of_file(test_case)
      "#{timestamp}_#{test_case.feature_file_name}_#{test_case.name}"
    end

    def width(fallback: 1600)
      ENV.fetch("BROWSER_WIDTH", fallback)
    end

    def height(fallback: 800)
      ENV.fetch("BROWSER_HEIGHT", fallback)
    end

    def wait_for_second_window
      Selenium::WebDriver::Wait.new.until { page.windows.length == 2 }
    end

    def second_window
      page.windows.detect { |window| !window.current? }
    end

    def wait_for_new_url
      Selenium::WebDriver::Wait.new.until { page.current_url != "about:blank" }
    end
  end
end
