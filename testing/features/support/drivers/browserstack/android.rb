# frozen_string_literal: true

module Drivers
  class Browserstack
    class Android < Base
      def specific_browser_capabilities
        CaTesting::Drivers::V4::Browserstack::Android.new.capabilities
      end
    end
  end
end
