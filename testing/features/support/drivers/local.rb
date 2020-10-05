# frozen_string_literal: true

module Drivers
  class Local
    include Helpers::Drivers

    def register
      Capybara.register_driver :selenium do |app|
        Capybara::Selenium::Driver.new(
          app,
          browser: browser,
          service: service,
          capabilities: [desired_capabilities, options]
        )
      end
    end

    private

    def service
      return unless safari?

      # Selenium::WebDriver::Safari.technology_preview!
      Selenium::WebDriver::Service.safari({ args: ["--diagnose"] })
    end

    def desired_capabilities
      Selenium::WebDriver::Remote::Capabilities.new.tap do |capabilities|
        if false # rubocop:disable Lint/LiteralAsCondition
          capabilities["browserName"] = "Safari Technology Preview"
          AutomationLogger.debug("Altering Browser Name request to alleviate Capybara failure with STP.")
        end
      end
    end
  end
end
