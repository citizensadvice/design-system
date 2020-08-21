# frozen_string_literal: true

class AutomationLogger
  class << self
    extend Forwardable

    def_delegators :logger, :debug, :info, :warn, :error, :fatal, :unknown

    def logger
      @logger ||= create_logger
    end

    private

    def create_logger
      logger = ::Logger.new(log_name, logs_to_keep, size_of_log)
      logger.level = log_level
      logger.formatter = proc do |severity, time, _, msg|
        "#{time.strftime('%F %T')} - #{severity} - #{msg}\n"
      end

      logger
    end

    def log_name
      "artifacts/logs/automation_logs.log"
    end

    def logs_to_keep
      7
    end

    def size_of_log
      1_048_576
    end

    def log_level
      ENV.fetch("LOG_LEVEL", "INFO")
    end
  end
end
