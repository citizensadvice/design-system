# frozen_string_literal: true

module Helpers
  module EnvVariables
    def headless?
      ENV.fetch("HEADLESS", "true") == "true"
    end

    def base_url
      ENV.fetch("TESTING_BASE_URL")
    end
  end
end
