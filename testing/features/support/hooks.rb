# frozen_string_literal: true

AfterConfiguration do
  CucumberResults.instance.set_session_id
end

Before do |test_case|
  I18n.locale = :en
  resize_window unless device?
  AutomationLogger.info("Running Scenario: #{test_case.name}")
  AutomationLogger.debug("BROWSERSTACK_CONFIGURATION_OPTIONS = #{ENV['BROWSERSTACK_CONFIGURATION_OPTIONS']}")
  AutomationLogger.debug("DOCKER_TAG = #{ENV['DOCKER_TAG']}")
end

After do |test_case|
  if test_case.failed?
    save_full_page_screenshot(test_case)
    save_full_page_html(test_case)

    CucumberResults.instance.status = "failed"
  end
end
