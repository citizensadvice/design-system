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

      private

      def selenium_jar_version
        AutomationLogger.warn("Overriding the standard JAR version")
        # This gives us a slight inconsistency (Compared to gem version)
        # But it is required to 'trick' chrome into working
        # See https://bugs.chromium.org/p/chromedriver/issues/detail?id=3525 for more info
        # LH - July 2020
        "4.0.0-alpha-6"
      end
    end
  end
end
