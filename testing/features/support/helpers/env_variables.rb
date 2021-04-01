# frozen_string_literal: true

module Helpers
  module EnvVariables
    def browser
      ENV.fetch("BROWSER", "chrome").to_sym
    end

    def environment
      ENV.fetch("APP_ENVIRONMENT", "master").to_sym
    end

    def hub_url
      ENV["HUB_URL"]
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
      ENV.fetch("BROWSERSTACK_BUILD_NAME")
    end

    def grid?
      ENV["GRID"] == "true"
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

    def mobile_phone?
      %w[android ios].include?(ENV["BROWSER"])
    end

    def headless?
      ENV["HEADLESS"] == "true"
    end

    def base_url
      if environment == :local
        "http://ca-styleguide:6006"
      else
        "https://citizensadvice.github.io/design-system"
      end
    end

    # Example: design-system/master_ad4b223
    # Example: design-system/PR-284_dbbb8b6
    def docker_tag
      ENV["DOCKER_TAG"]
    end

    def browserstack_os
      ENV.fetch("BROWSERSTACK_CONFIGURATION_OPTIONS").split("_")[0]
    end

    def browserstack_os_version
      ENV.fetch("BROWSERSTACK_CONFIGURATION_OPTIONS").split("_")[1]
    end

    def browserstack_browser_version
      ENV.fetch("BROWSERSTACK_CONFIGURATION_OPTIONS").split("_")[2]
    end

    def ios13?
      browserstack? && browserstack_os_version == "13"
    end

    def ios12?
      browserstack? && browserstack_os_version == "12"
    end

    def ios11?
      browserstack? && browserstack_os_version == "11"
    end

    def log_level
      ENV.fetch("LOG_LEVEL", "INFO")
    end

    def log_location
      ENV["LOG_LOCATION"]
    end
  end
end
