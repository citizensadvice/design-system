# frozen_string_literal: true

class CucumberResults
  include Singleton
  include Helpers::EnvVariables

  attr_reader :session_id
  attr_writer :status

  def set_session_id
    @session_id = Capybara.page.driver.browser.session_id if browserstack?
  end

  def status
    @status ||= "passed"
  end
end
