# frozen_string_literal: true

module Drivers
  class Browserstack
    include Helpers::EnvVariables
    include Helpers::Faraday

    def register
      register_browser
      register_exit_handler
    end

    private

    def register_browser
      validate_driver_request

      browser_type_class.new.register
    end

    def validate_driver_request
      raise StandardError, "Not implemented" unless valid_browserstack_drivers.include?(browser)
    end

    def valid_browserstack_drivers
      %i[
        android
        chrome
        edge
        firefox
        internet_explorer
        ios
        safari
      ]
    end

    def browser_type_class
      if specialized_driver?
        Module.const_get("Drivers::Browserstack::#{browser.to_s.pascalize}")
      else
        AutomationLogger.debug("Non-specialized driver requested, will use standard Base Driver")
        Drivers::Browserstack::Base
      end
    end

    def specialized_driver?
      %i[
        android
        chrome
        internet_explorer
        ios
      ].include?(browser)
    end

    def register_exit_handler
      at_exit { update_browserstack_status }
    end
  end
end
