# frozen_string_literal: true

module Drivers
  class Browserstack
    class Chrome < Base
      def specific_browser_capabilities
        {
          "goog:loggingPrefs" => {
            browser: "ALL",
            driver: "ALL"
          }
        }
      end
    end
  end
end
