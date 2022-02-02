# frozen_string_literal: true

module Helpers
  module EnvVariables
    def browser
      ENV.fetch("BROWSER", "chrome").to_sym
    end

    def browser_version
      ENV.fetch("BROWSER_VERSION", "latest").to_sym
    end

    def saucelabs?
      ENV["SAUCELABS"] == "true"
    end

    def platform_name
      ENV.fetch("PLATFORM_NAME", "Windows 10").to_sym
    end

    def platform_version
      ENV.fetch("PLATFORM_VERSION")
    end

    def device_name
      ENV.fetch("DEVICE_NAME")
    end

    def appium_version
      ENV.fetch("APPIUM_VERSION")
    end

    def width(fallback: "1280")
      ENV.fetch("BROWSER_WIDTH", fallback)
    end

    def height(fallback: "800")
      ENV.fetch("BROWSER_HEIGHT", fallback)
    end

    def screen_resolution
      "#{width}x#{height}"
    end

    def saucelabs_username
      ENV.fetch("SAUCE_USERNAME")
    end

    def saucelabs_access_key
      ENV.fetch("SAUCE_ACCESS_KEY")
    end

    def browserstack?
      ENV["BROWSERSTACK"] == "true"
    end

    def browserstack_username
      ENV.fetch("BROWSERSTACK_USERNAME")
    end

    def browserstack_api_key
      ENV.fetch("BROWSERSTACK_ACCESS_KEY")
    end

    def browserstack_debug_mode
      ENV.fetch("BROWSERSTACK_DEBUG_MODE", "false")
    end

    def browserstack_build_name
      ENV["BROWSERSTACK_BUILD_NAME"]
    end

    def internet_explorer?
      ENV["BROWSER"] == "internet_explorer"
    end

    def chrome?
      ENV["BROWSER"] == "chrome"
    end

    def firefox?
      ENV["BROWSER"] == "firefox"
    end

    def safari?
      ENV["BROWSER"] == "safari"
    end

    def device?
      %w[android ios].include?(ENV["BROWSER"]) || %w[android ios].include?(ENV["PLATFORM_NAME"])
    end

    def iphone?
      browserstack? && browserstack_os.start_with?("iPhone")
    end

    def ipad?
      browserstack? && browserstack_os.start_with?("iPad")
    end

    def headless?
      ENV["HEADLESS"] == "true"
    end

    def base_url
      ENV.fetch("TESTING_BASE_URL")
    end

    def browserstack_configuration_options
      ENV.fetch("BROWSERSTACK_CONFIGURATION_OPTIONS")
    end

    def browserstack_os
      browserstack_configuration_options.split("_")[0]
    end

    def browserstack_os_version
      browserstack_configuration_options.split("_")[1]
    end

    def browserstack_browser_version
      browserstack_configuration_options.split("_")[2]
    end

    def ios13?
      (iphone? || ipad?) && browserstack_os_version == "13"
    end

    def ios12?
      (iphone? || ipad?) && browserstack_os_version == "12"
    end

    def ios11?
      (iphone? || ipad?) && browserstack_os_version == "11"
    end

    def log_level
      ENV.fetch("LOG_LEVEL", "INFO")
    end

    def log_location
      ENV["LOG_LOCATION"]
    end
  end
end
