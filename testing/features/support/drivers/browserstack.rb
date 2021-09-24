# frozen_string_literal: true

module Drivers
  class Browserstack
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

      CaTesting::Drivers::Browserstack.new(browser, configurable_capabilities, device_options).register
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

    def configurable_capabilities
      {
        build_name: PayloadValuesGenerator.build_name,
        project_name: "Public-Website tests",
        session_name: PayloadValuesGenerator.session_name,
        browserstack_debug_mode: browserstack_debug_mode,
        username: browserstack_username,
        api_key: browserstack_api_key,
        config: browserstack_configuration_options
      }
    end

    def device_options
      return unless device?

      {
        device_name: browserstack_os,
        os_version: browserstack_os_version
      }
    end

    def register_exit_handler
      at_exit { update_browserstack_status }
    end

    def update_browserstack_status
      cucumber_results_connection.put do |request|
        request.headers["Content-Type"] = "application/json"
        request.body = { status: status }.to_json
      end
    end

    def cucumber_results_connection
      @cucumber_results_connection ||= ::Faraday.new(url: "https://api.browserstack.com/automate/sessions/#{id}.json").tap do |connection|
        connection.basic_auth(browserstack_username, browserstack_api_key)
      end
    end

    def id
      ::CucumberInfo.session_id
    end

    def status
      ::CucumberInfo.scenario_result
    end
  end
end
