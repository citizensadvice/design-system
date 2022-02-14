# frozen_string_literal: true

module Helpers
  module BrowserWindow
    include Helpers::EnvVariables

    def resize_window(desired_width = width, desired_height = height)
      Capybara.current_window.resize_to(desired_width, desired_height)
    end

    def save_window_screenshot(scenario)
      path = image_file_path(scenario)
      AutomationLogger.info("Taking a screenshot to #{path}")
      Capybara.current_session.save_screenshot(path)
      attach(path, "image/png")
    end

    def send_tabs(count)
      count.times do
        if safari?
          send_keys(%i[alt tab])
          # In Safari the modifier key (OPTION, but called :alt), is not
          # released after being used in the alt+tab call. This means that
          # subsequent calls do things like alt+click which downloads a link.
          #
          # See: https://bugs.webkit.org/show_bug.cgi?id=219948
          # LH - Dec 2020
          send_keys(:alt)
        else
          send_keys(:tab)
        end
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
