# frozen_string_literal: true

module Helpers
  module BrowserWindow
    include Helpers::EnvVariables

    def resize_window(desired_width = width, desired_height = height)
      Capybara.current_window.resize_to(desired_width, desired_height)
    end

    def save_window_screenshot(scenario)
      path = image_file_path(scenario)
      Capybara.current_session.save_screenshot(path)
      attach(path, "image/png")
    end

    def send_tabs(count)
      count.times do
        send_keys(:tab)
        sleep 0.1
      end
    end

    private

    def image_file_path(test_case)
      "#{ENV['BASE_ARTIFACTS_PATH']}/screenshots/#{name_of_file(test_case)}.png"
    end

    def name_of_file(test_case)
      "#{timestamp}_#{test_case.feature_file_name}_#{test_case.name.gsub('/', 'or').gsub(' ', '_')}"
    end

    def width(fallback: 1600)
      ENV.fetch("BROWSER_WIDTH", fallback)
    end

    def height(fallback: 800)
      ENV.fetch("BROWSER_HEIGHT", fallback)
    end

    def timestamp
      Time.now.strftime("%Y-%m-%d-%H-%M-%S")
    end
  end
end
