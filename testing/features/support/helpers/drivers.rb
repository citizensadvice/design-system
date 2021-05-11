# frozen_string_literal: true

module Helpers
  module Drivers
    include Helpers::EnvVariables

    private

    def options
      send("#{browser}_options").tap { |opts| opts.headless! if headless? }
    end

    def chrome_options
      Selenium::WebDriver::Chrome::Options.new
    end

    # Constantly fire mouseOver events on click actions (Should help mitigate flaky clicks)
    def internet_explorer_options
      Selenium::WebDriver::IE::Options.new(persistent_hover: true).tap do |opts|
        # This is needed to mitigate a Selenium4/Browserstack issue, which has now been fixed in
        # Selenium to use a space separated browserName key.
        #
        # Once we use Selenium4 proper this hack can be removed.
        # LH - May 2021
        AutomationLogger.warn("Removing `browser_name` key from options payload.")
        opts.options.delete(:browser_name)
      end
    end

    def firefox_options
      Selenium::WebDriver::Firefox::Options.new(log_level: "info")
    end

    def edge_options
      Selenium::WebDriver::Edge::Options.new
    end

    # Preload Web Inspector and JavaScript debugger
    def safari_options
      Selenium::WebDriver::Safari::Options.new(automatic_inspection: true)
    end

    def android_options
      {}
    end

    def ios_options
      {}
    end
  end
end
