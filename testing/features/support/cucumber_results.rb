# frozen_string_literal: true

require "retriable"

class CucumberResults
  include Singleton
  include Helpers::EnvVariables

  attr_reader :session_id
  attr_writer :status

  def set_session_id
    log_exception = proc do |exception, try, elapsed_time, next_interval|
      AutomationLogger.error(
        "#{exception.class}: '#{exception.message}' - #{try} tries in #{elapsed_time} seconds and #{next_interval} seconds until the next "\
        "try.\n#{exception.full_message}}"
      )
    end

    Retriable.retriable tries: 3, on_retry: log_exception do
      # The call to Capybara.page.driver.browser can fail with the exception "no sessionId in returned payload"
      # when the remote end of the Selenium driver fails to provide a session_id. This should be retried as it is
      # likely to be an intermittent failure
      @session_id = Capybara.page.driver.browser.session_id if browserstack?
    end
  end

  def status
    @status ||= "passed"
  end
end
