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
        # This is needed to mitigate a Selenium4/Browserstack issue whereby in Se4
        # we combine Browser options and Capabilities and merge them. But for some
        # reason Browserstack insist on giving `internet_explorer` a non-conformant
        # name `IE`. This then causes huge issues in trying to find a browser that
        # would match using firstMatch in 2 different ways.
        #
        # A Support ticket has been raised with Browserstack to see if they can fix
        # anything at their end, as this is a bug with their matching protocols
        # LH - Aug 2019
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
