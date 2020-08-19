# frozen_string_literal: true

AfterConfiguration do
  CucumberResults.instance.set_session_id
end

Before do |scenario|
  resize_window
  AutomationLogger.info("Running Scenario: #{scenario.name}")
  @app ||= App.new
end

After do |scenario|
  if scenario.failed?
    save_full_page_screenshot(scenario)
    save_full_page_html(scenario)

    CucumberResults.instance.status = "failed"
  end
end
