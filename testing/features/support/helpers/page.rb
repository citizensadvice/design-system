# frozen_string_literal: true

module Helpers
  module Page
    include Helpers::Methods
    include Helpers::EnvVariables

    def resize_window(desired_width = width, desired_height = height)
      if browserstack? && internet_explorer?
        AutomationLogger.warn("Resizing Windows on Browserstack IE can be flaky!")
      end
      Capybara.current_window.resize_to(desired_width, desired_height)
    end

    def save_full_page_screenshot(scenario)
      path = image_file_path(scenario)
      resize_page_to_fullsize
      AutomationLogger.info("Taking a screenshot to #{path}")
      save_image(path)
      embed(path, "image/png", "Screenshot - Won't work on JenkinsBlue!")
    end

    def save_full_page_html(scenario)
      file_path = html_file_path(scenario)
      File.write(file_path, full_page_html)
      embed(file_path, "text/html", "HTML Page - Won't work on JenkinsBlue!")
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

    def image_file_path(scenario)
      "artifacts/screenshots/#{timestamp}_#{scenario.feature.name}_#{scenario.name}.png"
    end

    def html_file_path(scenario)
      "artifacts/html_pages/#{timestamp}_#{scenario.feature.name}_#{scenario.name}.html"
    end

    def width(fallback: 1600)
      ENV.fetch("BROWSER_WIDTH", fallback)
    end

    def height(fallback: 800)
      ENV.fetch("BROWSER_HEIGHT", fallback)
    end
  end
end
