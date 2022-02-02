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

      # This is missing from the selenium repo proper. It has been added to all relevant spots
      # HERE: https://github.com/SeleniumHQ/selenium/pull/9862
      # Remove once we are only supporting Selenium 4
      #
      # LH - Sep '21

      require "selenium/webdriver/common/platform"

      Capybara.register_driver :selenium do |app|
        SauceWhisk.data_center = :EU_VDC

        caps = if device?
                 Selenium::WebDriver::Remote::Capabilities.send(browser, device_capabilities)
               else
                 Selenium::WebDriver::Remote::Capabilities.send(browser, browser_capabilities)
               end

        Capybara::Selenium::Driver.new(app, browser: :remote, url: saucelabs_url, capabilities: caps)
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

    def browser_capabilities
      {
        browser_name: browser,
        platform_name: platform_name,
        browser_version: browser_version,
        "sauce:options": {
          name: Saucelabs::PayloadValuesGenerator.session_name,
          build: Saucelabs::PayloadValuesGenerator.build_name,
          screen_resolution: screen_resolution,
          username: saucelabs_username,
          access_key: saucelabs_access_key
        }
      }
    end

    def device_capabilities
      {
        browser_name: browser,
        platform_name: platform_name,
        browser_version: "",
        "appium:deviceName": device_name,
        "appium:platformVersion": platform_version,
        "sauce:options": {
          name: Saucelabs::PayloadValuesGenerator.session_name,
          build: Saucelabs::PayloadValuesGenerator.build_name,
          screen_resolution: screen_resolution,
          username: saucelabs_username,
          access_key: saucelabs_access_key,
          appium_version: appium_version
        }
      }
    end

    def saucelabs_url
      "https://#{saucelabs_username}:#{saucelabs_access_key}@ondemand.eu-central-1.saucelabs.com:443/wd/hub"
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
