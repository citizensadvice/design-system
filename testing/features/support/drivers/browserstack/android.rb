# frozen_string_literal: true

module Drivers
  class Browserstack
    class Android < Base
      def specific_browser_capabilities
        {
          "bstack:options" => {
            "osVersion" => "10.0",
            "deviceName" => "Samsung Galaxy S20",
            "realMobile" => "true",
            "appiumVersion" => "1.17.0"
          }
        }
      end
    end
  end
end
