# frozen_string_literal: true

module Helpers
  module EnvVariables
    def browser
      ENV.fetch("BROWSER", "chrome").to_sym
    end

    def headless?
      ENV["HEADLESS"] == "true"
    end

    def base_url
      ENV.fetch("TESTING_BASE_URL")
    end

    def log_level
      ENV.fetch("LOG_LEVEL", "INFO")
    end

    def log_location
      ENV["LOG_LOCATION"]
    end
  end
end
