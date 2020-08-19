# frozen_string_literal: true

require "browserstack/local"

module Drivers
  class LegacyBrowserstack
    include Helpers::Faraday

    def register_driver
      start_local_browserstack_instance if local?
      create_browserstack_driver
      register_exit_handler
    end

    private

    def start_local_browserstack_instance
      @bs_local = BrowserStack::Local.new
      @bs_local.start(
        "key" => browserstack_api_key,
        "v" => "true",
        "localIdentifier" => "test-#{browser}",
        "forcelocal" => "true"
      )

      AutomationLogger.debug("Browser stack local instance is running: #{@bs_local.isRunning}")
    end

    def create_browserstack_driver
      Capybara.register_driver :selenium do |app|
        Capybara::Selenium::Driver.new(
          app,
          browser: :remote,
          url: "http://#{browserstack_username}:#{browserstack_api_key}@hub-cloud.browserstack.com/wd/hub",
          desired_capabilities: browser_capabilities
        )
      end
    end

    def register_exit_handler
      at_exit do
        # https://www.browserstack.com/automate/rest-api#rest-api-sessions
        cucumber_results_connection.put do |request|
          request.headers["Content-Type"] = "application/json"
          request.body = { status: status }.to_json
        end

        next unless @bs_local

        # bs_local.stop hangs https://github.com/browserstack/browserstack-local-nodejs/issues/43
        AutomationLogger.info("Exiting BrowserStack Local")
        Process.kill("TERM", @bs_local.pid)
      end
    end

    def browser_capabilities
      {
        project: "Public website tests",
        build: (ENV["APP_URL"]).to_s,
        "browserstack.debug": true,
        "browserstack.local": local?,
        "browserstack.tunnel": local?,
        "browserstack.localIdentifier": "test-#{browser}",
        "resolution": "1280x800",
        browser: browser
      }
    end

    def status
      ::CucumberResults.instance.status
    end

    def local?
      ENV["LOCAL"] == "true"
    end
  end
end
