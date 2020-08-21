# frozen_string_literal: true

module Drivers
  class Browserstack
    class InternetExplorer < Base
      def specific_browser_capabilities
        {
          "browserName" => "IE",
          "bstack:options" => {
            "ie" => {
              # This should be upgraded to a V4 compliant driver as soon as one is released.
              # For now the 3.141.59 `IEDriverServer.exe` is compliant with the 4.0.alpha ruby gem
              # and all selenium standalone server JARs that are 3.14 and above
              # LH - Aug 2019
              "driver" => "3.141.59"
            }
          }
        }
      end
    end
  end
end
