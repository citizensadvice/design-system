# frozen_string_literal: true

module CucumberInfo
  class Skipper
    include Helpers::EnvVariables

    attr_reader :tags
    private :tags

    def initialize(tags)
      @tags = tags
    end

    def skip_scenario?
      return AutomationLogger.error("Scenario only works on chrome") if chrome_only_check
      return AutomationLogger.error("Scenario does NOT work on chrome") if not_chrome_check
      return AutomationLogger.error("Scenario does NOT work on safari") if not_safari_check
      return AutomationLogger.error("Scenario does NOT work on browserstack") if not_browserstack_check
      return AutomationLogger.error("Scenario requires a deployed environment") if not_local_check

      false
    end

    private

    def chrome_only_check
      !chrome? && tags.include?("@chrome")
    end

    def not_chrome_check
      chrome? && tags.include?("@not_chrome")
    end

    def not_safari_check
      safari? && tags.include?("@not_safari")
    end

    def not_browserstack_check
      browserstack? && tags.include?("@not_browserstack")
    end

    def not_local_check
      !base_url.include?(".content.citizensadvice.org.uk") && tags.include?("@not_local")
    end
  end
end
