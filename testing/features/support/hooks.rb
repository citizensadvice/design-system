# frozen_string_literal: true

AfterConfiguration do
  CucumberResults.instance.set_session_id
end

Before do |scenario|
  skip_this_scenario("This needs fixing on mobile") if device? && scenario.source_tag_names.include?("@not_mobile")
  resize_window unless device?
  AutomationLogger.info("Running Scenario: #{scenario.name}")
  AutomationLogger.debug("BROWSERSTACK_CONFIGURATION_OPTIONS = #{ENV['BROWSERSTACK_CONFIGURATION_OPTIONS']}")
  AutomationLogger.debug("DOCKER_TAG = #{ENV['DOCKER_TAG']}")
end

After do |scenario|
  if scenario.failed?
    save_full_page_screenshot(scenario)
    save_full_page_html(scenario)

    CucumberResults.instance.status = "failed"
  end
end
