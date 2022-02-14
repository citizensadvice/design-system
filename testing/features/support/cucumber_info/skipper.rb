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
      return AutomationLogger.error("Scenario does NOT work on Safari") if not_safari_check

      false
    end

    private

    def not_safari_check
      safari? && tags.include?("@not_safari")
    end
  end
end
