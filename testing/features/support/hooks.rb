# frozen_string_literal: true

AfterConfiguration do
  CucumberResults.instance.set_session_id
end

Before do |test_case|
  I18n.locale = :en
  skip_this_scenario("This does not work on mobile") if device? && test_case.source_tag_names.include?("@not_mobile")
  skip_this_scenario("This does not work on iOS12") if ios12? && test_case.source_tag_names.include?("@not_ios12")
  skip_this_scenario("This does not work on iOS11") if ios11? && test_case.source_tag_names.include?("@not_ios11")
  resize_window unless device?
  AutomationLogger.info("Running Scenario: #{test_case.name}")
  AutomationLogger.debug("BROWSERSTACK_CONFIGURATION_OPTIONS = #{ENV['BROWSERSTACK_CONFIGURATION_OPTIONS']}")
  AutomationLogger.debug("DOCKER_TAG = #{ENV['DOCKER_TAG']}")
end

After do |test_case|
  if test_case.failed?
    save_full_page_screenshot(test_case) unless device?
    save_full_page_html(test_case)

    CucumberResults.instance.status = "failed"
  end
end
