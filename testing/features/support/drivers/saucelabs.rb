# frozen_string_literal: true

module Drivers
  class Saucelabs
    include Helpers::EnvVariables

    def register
      register_browser
      register_exit_handler
    end

    private

    def register_browser
      validate_driver_request

      require "selenium/webdriver/common/platform"

      Capybara.register_driver :selenium do |app|
        SauceWhisk.data_center = :EU_VDC

        options = { browser_name: browser,
                    platform_name: platform_name,
                    browser_version: browser_version,
                    "sauce:options": {
                      name: "Design System tests",
                      build: Saucelabs::PayloadValuesGenerator.build_name,
                      screen_resolution: screen_resolution,
                      username: saucelabs_username,
                      access_key: saucelabs_access_key
                    } }
        caps = Selenium::WebDriver::Remote::Capabilities.send(browser, options)

        Capybara::Selenium::Driver.new(app,
                                       browser: :remote,
                                       url: "https://#{saucelabs_username}:#{saucelabs_access_key}@ondemand.eu-central-1.saucelabs.com:443/wd/hub",
                                       capabilities: caps)
      end
    end

    def validate_driver_request
      raise StandardError, "Not implemented" unless valid_drivers.include?(browser)
    end

    def valid_drivers
      %i[
        chrome
        firefox
        safari
      ]
    end

    def register_exit_handler
      at_exit do
        session_id = ::CucumberInfo.session_id
        status = ::CucumberInfo.scenario_result == "passed"
        SauceWhisk::Jobs.change_status(session_id, status)
      end
    end
  end
end
