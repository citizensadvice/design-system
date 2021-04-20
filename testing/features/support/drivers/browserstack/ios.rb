# frozen_string_literal: true

module Drivers
  class Browserstack
    class Ios < Base
      def specific_browser_capabilities
        # Full device-list matrix is here: https://www.browserstack.com/list-of-browsers-and-platforms/live
        #
        # We have validated the following iPhones
        # iOS 14: 11
        # iOS 13: 11Pro/11/XS/8
        # iOS 12: 8
        # iOS 11: X/8
        #
        # We have validated the following iPads
        # iOS 14: 8th
        # iOS 13: Air2019/Mini2019/7th
        # iOS 12: Mini2019
        #
        # Use this information with caution. It is not designed to be a complete representation
        # of all the devices that work at any time
        #
        # LH - April 2021
        {
          "bstack:options" => {
            "deviceName" => browserstack_os,
            "realMobile" => "true",
            "appiumVersion" => appium_version
          }
        }
      end

      private

      alias ios_version browserstack_os_version

      def appium_version
        case ios_version
        when "14"; then "1.20.3"
        when "13"; then "1.20.2"
        when "12"; then "1.19.1"
        when "11"; then "1.16.0"
        else raise "Your iOS Version is too low. Please don't use lower than iOS11."
        end
      end
    end
  end
end
