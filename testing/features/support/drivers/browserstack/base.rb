# frozen_string_literal: true

module Drivers
  class Browserstack
    class Base
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
        standard_browserstack_capabilities.merge(browser_version)
      end

      def specific_browser_capabilities
        {}
      end

      def browser_version
        if device?
          {}
        else
          { "browserVersion" => browserstack_browser_version }
        end
      end

      def standard_browserstack_capabilities
        {
          "bstack:options" => {
            "buildName" => build_name,
            "projectName" => "Design System tests",
            "sessionName" => session_name,
            "os" => browserstack_os,
            "osVersion" => browserstack_os_version,
            "local" => "false",
            "seleniumVersion" => selenium_jar_version,
            "debug" => browserstack_debug_mode,
            "consoleLogs" => "verbose",
            "networkLogs" => "true",
            "resolution" => "1920x1080"
          }
        }
      end

      def options
        CaTesting::Drivers::V4::Options.for(browser)
      end

      def browserstack_hub_url
        "https://#{browserstack_username}:#{browserstack_api_key}@hub-cloud.browserstack.com/wd/hub"
      end

      def build_name
        "Design System - #{identifier} - #{base_url}"
      end

      def identifier
        browserstack_build_name || "Local machine run #{Time.now.strftime('%Y-%m-%d %H:%M:%S')}"
      end

      def session_name
        "SHA: #{sha} - CALLING_PROJECT: design-system"
      end

      def selenium_jar_version
        "4.0.0-alpha-6"
      end
    end
  end
end
