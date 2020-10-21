# frozen_string_literal: true

module Drivers
  class Browserstack
    class Ios < Base
      def specific_browser_capabilities
        {
          "bstack:options" => {
            "osVersion" => "13",
            "deviceName" => "iPhone 8",
            "realMobile" => "true",
            "appiumVersion" => "1.17.0"
          }
        }
      end
    end
  end
end
