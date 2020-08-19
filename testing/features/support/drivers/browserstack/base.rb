# frozen_string_literal: true

module Drivers
  class Browserstack
    class Base
      include Helpers::Drivers
      include Helpers::EnvVariables

      def register
        Capybara.register_driver :selenium do |app|
          Capybara::Selenium::Driver.new(
            app,
            browser: :remote,
            capabilities: [desired_capabilities, options],
            url: browserstack_hub_url
          )
        end
      end

      private

      def desired_capabilities
        Selenium::WebDriver::Remote::Capabilities.new(
          Faraday::Utils.deep_merge(standard_capabilities, specific_browser_capabilities)
        )
      end

      def standard_capabilities
        standard_browserstack_capabilities.merge(standard_browser_capabilities)
      end

      def specific_browser_capabilities
        {}
      end

      def standard_browser_capabilities
        return {} if device?

        {
          "browserName" => browser,
          "browserVersion" => browser_version
        }
      end

      def standard_browserstack_capabilities
        {
          "bstack:options" => {
            "buildName" => build_name,
            "projectName" => "Public-Website-Cucumber tests",
            "sessionName" => "CI tests called from #{project_location}",
            "os" => os,
            "osVersion" => os_version,
            "local" => "false",
            "seleniumVersion" => selenium_jar_version,
            "debug" => browserstack_debug_mode,
            "consoleLogs" => "verbose",
            "networkLogs" => "false",
            "resolution" => "1920x1080"
          }
        }
      end

      def browserstack_hub_url
        "https://#{browserstack_username}:#{browserstack_api_key}@hub-cloud.browserstack.com/wd/hub"
      end

      def build_name
        if ENV["BRANCH_NAME"]
          "#{ENV['BRANCH_NAME']} running on #{base_url}"
        else
          "Local Machine run - Ignore results!"
        end
      end

      def os
        ENV.fetch("BROWSERSTACK_CONFIGURATION_OPTIONS").split("_")[0]
      end

      def os_version
        ENV.fetch("BROWSERSTACK_CONFIGURATION_OPTIONS").split("_")[1]
      end

      def browser_version
        ENV.fetch("BROWSERSTACK_CONFIGURATION_OPTIONS").split("_")[2]
      end

      def selenium_jar_version
        "4.0.0-alpha-6"
      end
    end
  end
end
