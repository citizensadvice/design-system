# frozen_string_literal: true

module Helpers
  module EnvVariables
    def browser
      ENV.fetch("BROWSER", "chrome").to_sym
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

    def grid?
      ENV["GRID"] == "true"
    end

    def internet_explorer?
      ENV["BROWSER"] == "internet_explorer"
    end

    def firefox?
      ENV["BROWSER"] == "firefox"
    end

    def chrome?
      ENV["BROWSER"] == "chrome"
    end

    def safari?
      ENV["BROWSER"] == "safari"
    end

    def mac?
      ENV["BROWSERSTACK_CONFIGURATION_OPTIONS"].start_with?("OSX")
    end

    def device?
      %w[android ios].include?(ENV["BROWSER"])
    end

    def headless?
      ENV["HEADLESS"] == "true"
    end

    def base_url
      ENV.fetch("APP_URL", "https://citizensadvice.github.io/design-system")
    end
  end
end
