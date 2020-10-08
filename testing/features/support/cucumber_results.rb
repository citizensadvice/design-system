# frozen_string_literal: true

class CucumberResults
  include Singleton
  include Helpers::EnvVariables

  attr_reader :session_id
  attr_writer :status

  def set_session_id
    Retriable.retriable(
      on: Selenium::WebDriver::Error::WebDriverError,
      tries: 5,
      base_interval: 1, # in seconds
      on_retry: method(:log_exception)
    ) do
      # The call to Capybara.page.driver.browser can fail with the exception "no sessionId in returned payload"
      # This is caused by the response to create_session in Selenium's remote WebDriver not returning a payload
      # when being served by the Browserstack Hub infrastructure.

      # This should be retried as it's an intermittent failure from Browserstack
      @session_id = Capybara.page.driver.browser.session_id if browserstack?
    end
  end

  def status
    @status ||= "passed"
  end

  private

  def log_exception(exception, try, elapsed_time, next_interval)
    AutomationLogger.error(
      "#{exception.class}: '#{exception.message}' - #{try} tries in #{elapsed_time} seconds and #{next_interval} seconds until the next "\
      "try.\n#{exception.full_message}}"
    )
  end
end
