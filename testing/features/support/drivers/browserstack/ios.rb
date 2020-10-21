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
            "deviceName" => device_name,
            "realMobile" => "true",
            "appiumVersion" => appium_version
          }
        }
      end

      private

      def device_name
        browserstack_os
      end

      def appium_version
        if ios13? || ios12?
          "1.17.0"
        else
          "1.16.0"
        end
      end

      def ios13?
        browserstack_os_version == "13"
      end

      def ios12?
        browserstack_os_version == "12"
      end
    end
  end
end
