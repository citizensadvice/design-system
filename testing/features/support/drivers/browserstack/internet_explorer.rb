# frozen_string_literal: true

module Drivers
  class Browserstack
    class InternetExplorer < Base
      def specific_browser_capabilities
        CaTesting::Drivers::V3::Browserstack::InternetExplorer.new.capabilities
      end
    end
  end
end
