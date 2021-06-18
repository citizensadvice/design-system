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
        #
        initial_caps = CaTesting::Drivers::V4::Browserstack::Ios.new(browserstack_os_version).capabilities
        # This can be fixed up with v2.0.1 of the gem
        initial_caps["bstack:options"]["deviceName"] = browserstack_os
        initial_caps
      end
    end
  end
end
