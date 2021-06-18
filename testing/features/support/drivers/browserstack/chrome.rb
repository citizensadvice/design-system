# frozen_string_literal: true

module Drivers
  class Browserstack
    class Chrome < Base
      def specific_browser_capabilities
        CaTesting::Drivers::V4::Browserstack::Chrome.new.capabilities
      end
    end
  end
end
