# frozen_string_literal: true

module Drivers
  class Browserstack
    class Ios < Base
      def specific_browser_capabilities
        # Rough availability list for active BS iOS Devices
        # iOS 13: iPhone 11 Pro / iPhone 11 / iPhone XS / iPhone 8
        # iOS 12: iPhone XS* / iPhone 8
        # iOS 11: iPhone X  / iPhone 8
        #
        # iPhone XS on iOS 12 Has some weird problems. Avoid usage
        # Use this availability list with caution!: LH - October 2020
        {
          "bstack:options" => {
            "deviceName" => browserstack_os,
            "realMobile" => "true",
            "appiumVersion" => appium_version
          }
        }
      end

      private

      def appium_version
        if ios13?
          "1.20.2"
        elsif ios12?
          "1.19.1"
        else
          "1.16.0"
        end
      end
    end
  end
end
