# frozen_string_literal: true

AfterConfiguration do
  CucumberResults.instance.set_session_id
end

Before do |test_case|
  I18n.locale = :en
  skip_this_scenario("This does not work on mobile") if device? && test_case.source_tag_names.include?("@not_mobile")
  skip_this_scenario("This does not work on iOS12") if ios12? && test_case.source_tag_names.include?("@not_ios12")
  resize_window unless device?
  resize_window(320) if test_case.source_tag_names.include?("@small_screen") && !device?
  AutomationLogger.info("Running Scenario: #{test_case.name}")
  AutomationLogger.debug("BROWSERSTACK_CONFIGURATION_OPTIONS = #{ENV['BROWSERSTACK_CONFIGURATION_OPTIONS']}")
  AutomationLogger.debug("DOCKER_TAG = #{ENV['DOCKER_TAG']}")
end

After do |test_case|
  if test_case.failed?
    save_window_screenshot(test_case) unless device?
    AutomationLogger.info("Scenario: #{test_case.name} - Status: FAILED")
    AutomationLogger.error("ERROR: #{test_case.exception&.message}")
    AutomationLogger.error("ERROR TYPE: #{test_case.exception.class}")
    test_case.exception&.backtrace&.each&.with_index(1) do |backtrace_line, index|
      AutomationLogger.error("BACKTRACE #{index}) #{backtrace_line}")
    end
    CucumberResults.instance.status = "failed"
  else
    AutomationLogger.info("Scenario: #{test_case.name} - Status: #{test_case.status.upcase}")
  end
end
