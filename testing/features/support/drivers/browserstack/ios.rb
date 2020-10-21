# frozen_string_literal: true

module Drivers
  class Browserstack
    class Ios < Base
      def specific_browser_capabilities
        # Rough availability list for active BS iOS Devices
        # iOS 13: iPhone 11 Pro / iPhone 11 / iPhone XS / iPhone 8
        # iOS 12: iPhone XS / iPhone 8
        # iOS 11: iPhone X  / iPhone 8
        # Use this availability list with caution!: LH - October 2020
        {
          "bstack:options" => {
            "osVersion" => "13",
            "deviceName" => "iPhone 8",
            "realMobile" => "true",
            "appiumVersion" => appium_version
          }
        }
      end

      private

      def appium_version
        if ios13? || ios12?
          "1.17.0"
        else
          "1.16.0"
        end
      end

      def ios13?
        "TBC"
      end

      def ios12?
        "TBC"
      end
    end
  end
end
