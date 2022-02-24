# frozen_string_literal: true

module CucumberInfo
  class << self
    include Helpers::EnvVariables
    extend Forwardable

    def_delegators :tags, :not_ios12?, :not_mobile?

    attr_reader :session_id, :test_case
    attr_writer :scenario_result

    def skip_scenario?
      Skipper.new(tag_array).skip_scenario?
    end

    def test_case=(test_case)
      # Clear previous tag cache
      remove_instance_variable(:@tags) if instance_variable_defined?(:@tags)
      @test_case = test_case
    end

    def scenario_result
      @scenario_result ||= "passed"
    end

    def tags
      @tags ||= Tags.new(tag_array)
    end

    def log_exception(exception, try, elapsed_time, next_interval)
      AutomationLogger.error(
        "#{exception.class}: '#{exception.message}' - #{try} tries in #{elapsed_time} seconds and #{next_interval} seconds until the next "\
        "try.\n#{exception.full_message}}"
      )
    end

    private

    def tag_array
      test_case.source_tag_names
    end
  end
end
